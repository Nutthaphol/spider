import React, {
  useRef,
  useState,
  useEffect,
  Fragment,
  useCallback,
} from "react";
import {
  ThemeProvider,
  StyledEngineProvider,
  createTheme,
} from "@mui/material/styles";
import makeStyles from "@mui/styles/makeStyles";
import { Field, Formik, Form, FieldArray, ErrorMessage } from "formik";
import { Select, SimpleFileUpload, Switch, TextField } from "formik-mui";

import {
  Container,
  Paper,
  Grid,
  Typography,
  Button,
  Link,
  Divider,
  Autocomplete,
  MenuItem,
  IconButton,
  Snackbar,
  Collapse,
  Alert,
  Dialog,
  DialogTitle,
} from "@mui/material";
import {
  Close,
  WindowSharp,
  AddAPhoto,
  Backspace,
  Delete,
  DeleteOutline,
} from "@mui/icons-material";
import MapView from "../shared/MapView";
import { useDispatch, useSelector } from "react-redux";
import "./index.css";
import { useDropzone } from "react-dropzone";

import { getAllFamily } from "../../../actions/family";
import { getAllGenus } from "../../../actions/genus";
import { getAllSpecies } from "../../../actions/species";
import { getAllDetail } from "../../../actions/detail";
import { Box } from "@mui/system";

import familyService from "../../../services/family.service";
import genusService from "../../../services/genus.service";
import speciesService from "../../../services/species.service";
import locationService from "../../../services/location.service";
import addressService from "../../../services/address.service";
import paperService from "../../../services/paper.service";
import imageService from "../../../services/image.service";
import { getAllProvinces } from "../../../actions/province";
import { getAllDistrict } from "../../../actions/district";
import detailService from "../../../services/detail.service";

const theme = createTheme({});

const useStyles = makeStyles(() => ({
  paper: {
    padding: "10px",
    boxShadow: "none",
    border: "1px solid #B3B6B7",
  },
  divider: {
    marginTop: "10px",
  },
  placeholder: {
    width: "100%",
    height: "100%",
    display: "flex",
    address: "absolute",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
    color: "rgb(99, 115, 129)",
    backgroundColor: "rgb(244, 246, 248)",
    transition: "opacity 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
  },
  placeholderImageProfile: {
    color: "rgb(255, 255, 255)",
    backgroundColor: "rgba(22, 28, 36, .50)",
  },
  placeholderLabel: {
    color: "rgb(255, 255, 255)",
  },
  form: {
    // "& div": {
    //   position: "absolute",
    // },
  },
}));

const EditDetailForm = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { result: dbProvince } = useSelector((state) => state.province);
  const { result: dbDistrict } = useSelector((state) => state.district);
  const { result: dbFamily } = useSelector((state) => state.family);
  const { result: dbGenus } = useSelector((state) => state.genus);
  const { result: dbSpecies } = useSelector((state) => state.species);

  const [data, setData] = useState();
  const [success, setSuccess] = useState(false);
  const [status, setStatus] = useState({
    showFamily: true,
    showGenus: true,
    showSpecies: true,
  });
  const [years, setYears] = useState([]);

  const [files, setFiles] = useState([]);
  const [uploads, setUploads] = useState();

  useEffect(async () => {
    const detailId = props.match.params.id;

    if (data == null && detailId) {
      const tmpDetail = detailId
        ? await detailService.getDetail(detailId)
        : false;

      if (tmpDetail) {
        const image_ = await imageService.getImage(detailId);
        tmpDetail.image = image_;

        const family_ = await familyService.getFamily(tmpDetail.family_id);
        tmpDetail.family = family_[0].name;
        const genus_ = await genusService.getGenus(tmpDetail.genus_id);
        tmpDetail.genus = genus_[0].name;
        const species_ = await speciesService.getSpecies(tmpDetail.species_id);
        tmpDetail.species = species_[0].name;

        const location_ = await locationService.getLocation(detailId);
        for (let i = 0; i < location_.length; i++) {
          location_[i].address = await addressService.getAddress(
            location_[i].id
          );
        }
        tmpDetail.location = location_;

        const paper_ = await paperService.getPaper(detailId);
        tmpDetail.paper = paper_;

        setData(tmpDetail);
      }
    }
    dispatch(getAllProvinces());
    dispatch(getAllDistrict());
    dispatch(getAllFamily());
    dispatch(getAllGenus());
    dispatch(getAllSpecies());

    const createListYear = () => {
      const date = new Date();
      const tmpYesrs = [];
      let nowYear = date.getFullYear();
      for (let i = nowYear; i > nowYear - 100; i--) {
        tmpYesrs.push(i);
      }
      setYears([...tmpYesrs]);
    };

    createListYear();
  }, [data]);

  // onDrop of react Drop zone
  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files
    let formData = new FormData();
    acceptedFiles.map((file) => formData.append("image", file));
    setFiles(
      acceptedFiles.map((file) =>
        Object.assign(file, { preview: URL.createObjectURL(file) })
      )
    );
    setUploads(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: "image/jpeg, image/png",
    onDrop,
    maxFiles: 20,
  });

  // preview image input
  const thumbs = files.map((file) => (
    <img key={file.name} src={file.preview} className={classes.uploadImage} />
  ));

  const onKeyDown = (keyEvent) => {
    if ((keyEvent.charCode || keyEvent.keyCode) === 13) {
      keyEvent.preventDefault();
    }
  };
  return (
    <div className={`page`}>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <Container maxWidth="lg">
            <Paper className={classes.paper}>
              <Collapse in={success}>
                <Alert
                  action={
                    <IconButton
                      aria-label="close"
                      color="inherit"
                      size="small"
                      onClick={() => {
                        setSuccess(false);
                        window.location.reload();
                      }}
                    >
                      <Close fontSize="inherit" />
                    </IconButton>
                  }
                >
                  success !
                </Alert>
              </Collapse>
              <Typography variant="h5" component="div" sx={{ fontWeight: 600 }}>
                Edit from ID #{data && data.id}
              </Typography>
              <Divider />
              {data != null && (
                <Formik initialValues={{ data, status }}>
                  {({
                    values,
                    errors,
                    isSubmitting,
                    touched,
                    handleBlur,
                    setFieldValue,
                  }) => (
                    <Form
                      autoComplete="off"
                      className={classes.form}
                      onKeyDown={onKeyDown}
                    >
                      <Grid container style={{ padding: "20px" }} spacing={2}>
                        <Grid item xs={6}>
                          <Grid container spacing={2}>
                            <Grid item xs={12}>
                              <Typography variant="h5" gutterBottom>
                                Family action
                              </Typography>
                            </Grid>
                            <Grid item xs={4} className={`family`}>
                              <Box style={{ display: "flex" }}>
                                <Typography variant="subtitle1">
                                  Family
                                </Typography>
                                <div style={{ flexGrow: 1 }} />
                                <Field
                                  component={Switch}
                                  type="checkbox"
                                  name="status.showFamily"
                                />
                              </Box>
                              {values.status.showFamily ? (
                                <Field
                                  component={Select}
                                  formControl={{
                                    sx: { width: "100%", size: "small" },
                                  }}
                                  size="small"
                                  name="data.family_id"
                                >
                                  {dbFamily &&
                                    dbFamily.map((val, index) => (
                                      <MenuItem key={index} value={val.id}>
                                        {val.name}
                                      </MenuItem>
                                    ))}
                                </Field>
                              ) : (
                                <Field
                                  component={TextField}
                                  name="data.family_id"
                                  size="small"
                                ></Field>
                              )}
                            </Grid>
                            <Grid item xs={4} className={`genus`}>
                              <Box style={{ display: "flex" }}>
                                <Typography variant="subtitle1">
                                  Genus
                                </Typography>
                                <div style={{ flexGrow: 1 }} />
                                <Field
                                  component={Switch}
                                  type="checkbox"
                                  name="status.showGenus"
                                />
                              </Box>
                              {values.status.showGenus ? (
                                <Field
                                  component={Select}
                                  formControl={{
                                    sx: { width: "100%", size: "small" },
                                  }}
                                  size="small"
                                  id="data.genus_id"
                                  name="data.genus_id"
                                >
                                  {dbGenus &&
                                    dbGenus
                                      .filter(
                                        (item) =>
                                          item.family_id ===
                                          Number(values.data.family_id)
                                      )
                                      .map((val, index) => (
                                        <MenuItem key={index} value={val.id}>
                                          {val.name}
                                        </MenuItem>
                                      ))}
                                </Field>
                              ) : (
                                <Field
                                  component={TextField}
                                  name="data.genus_id"
                                  size="small"
                                ></Field>
                              )}
                            </Grid>
                            <Grid item xs={4} className={`species`}>
                              <Box style={{ display: "flex" }}>
                                <Typography variant="subtitle1">
                                  Species
                                </Typography>
                                <div style={{ flexGrow: 1 }} />
                                <Field
                                  component={Switch}
                                  type="checkbox"
                                  name="status.showSpecies"
                                />
                              </Box>
                              {values.status.showSpecies ? (
                                <Field
                                  component={Select}
                                  formControl={{
                                    sx: { width: "100%", size: "small" },
                                  }}
                                  size="small"
                                  id="data.species_id"
                                  name="data.species_id"
                                >
                                  {dbSpecies &&
                                    dbSpecies
                                      .filter(
                                        (item) =>
                                          item.genus_id ===
                                          Number(values.data.genus_id)
                                      )
                                      .map((val, index) => (
                                        <MenuItem key={index} value={val.id}>
                                          {val.name}
                                        </MenuItem>
                                      ))}
                                </Field>
                              ) : (
                                <Field
                                  component={TextField}
                                  name="data.species_id"
                                  size="small"
                                ></Field>
                              )}
                            </Grid>
                            <Grid item xs={12}>
                              <Divider />
                            </Grid>
                            <Grid item xs={12}>
                              <Typography variant="h5" gutterBottom>
                                Detail
                              </Typography>
                            </Grid>
                            <Grid item xs={9} className={`author`}>
                              <Typography varaint="subtitle1">
                                Author
                              </Typography>
                              <Field
                                name="data.author"
                                component={TextField}
                                fullWidth
                                size="small"
                              />
                            </Grid>
                            <Grid item xs={3} className={`year`}>
                              <Typography varaint="subtitle1">
                                publish year
                              </Typography>
                              <Field
                                name="data.publish_year"
                                component={Select}
                                formControl={{
                                  sx: { width: "100%", size: "small" },
                                }}
                                size="small"
                                MenuProps={{
                                  PaperProps: { sx: { maxHeight: 300 } },
                                }}
                              >
                                {years &&
                                  years.map((val, index) => (
                                    <MenuItem key={index} value={val}>
                                      {val}
                                    </MenuItem>
                                  ))}
                              </Field>
                            </Grid>
                            <Grid item xs={3}>
                              <Typography variant="subtitle1">
                                Country
                              </Typography>
                              <Field
                                name="data.country"
                                component={TextField}
                                disabled
                                fullWidth
                                value={values.data.country}
                                size="small"
                              />
                            </Grid>
                            <Grid item xs={9}>
                              <Typography variant="subtitle1">
                                Other country
                              </Typography>
                              <Field
                                name="data.country_other"
                                component={TextField}
                                fullWidth
                                size="small"
                                placeholder="if any"
                              />
                            </Grid>
                          </Grid>
                        </Grid>
                        {/* grid for create first half layout */}

                        {/*grid for segment MapView */}
                        <Grid item xs={6}>
                          <Typography variant="subtitle1" gutterBottom>
                            Map monitor
                          </Typography>
                          <div className="map" style={{ height: "100%" }}>
                            <MapView listEx={values.data.location} />
                          </div>
                        </Grid>
                        {/* End map view */}
                        <Grid item xs={12}>
                          <Typography variant="subtitle1">Altitude</Typography>
                          <Field
                            name="data.altitude"
                            component={TextField}
                            fullWidth
                            multiline
                            rows={2}
                            size="small"
                          ></Field>
                        </Grid>
                        <Grid item xs={12}>
                          <Typography variant="subtitle1">Method</Typography>
                          <Field
                            name="data.method"
                            component={TextField}
                            fullWidth
                            multiline
                            rows={2}
                            size="small"
                          ></Field>
                        </Grid>
                        <Grid item xs={12}>
                          <Typography variant="subtitle1">habitat</Typography>
                          <Field
                            name="data.habitat"
                            component={TextField}
                            fullWidth
                            multiline
                            rows={2}
                            size="small"
                          ></Field>
                        </Grid>
                        <Grid item xs={12}>
                          <Typography variant="subtitle1">
                            microhabitat
                          </Typography>
                          <Field
                            name="data.microhabitat"
                            component={TextField}
                            fullWidth
                            multiline
                            rows={2}
                            size="small"
                          ></Field>
                        </Grid>
                        <Grid item xs={12}>
                          <Typography variant="subtitle1">Designate</Typography>
                          <Field
                            name="data.designate"
                            component={TextField}
                            fullWidth
                            multiline
                            rows={2}
                            size="small"
                          ></Field>
                        </Grid>
                        <Grid item xs={12}>
                          <Divider style={{ marginTop: "1rem" }} />
                        </Grid>
                        {/* End Detail */}
                        <Grid item xs={12}>
                          <FieldArray name="data.location">
                            {({ push, pop, remove }) => (
                              <Fragment>
                                <Grid container spacing={2}>
                                  <Grid
                                    item
                                    xs={12}
                                    style={{ display: "flex" }}
                                  >
                                    <Button
                                      variant="outlined"
                                      size="small"
                                      color="success"
                                      onClick={() =>
                                        push({
                                          province: "",
                                          district: "",
                                          locality: "",
                                          address: [
                                            {
                                              name: "",
                                              latitude: "",
                                              longitude: "",
                                            },
                                          ],
                                        })
                                      }
                                    >
                                      Add location
                                    </Button>
                                    <Grid item xs={12}></Grid>
                                  </Grid>
                                  {values.data.location &&
                                    values.data.location.map((val, index) => (
                                      <Grid item xs={12} key={index}>
                                        <Paper
                                          sx={{
                                            padding: "10px",
                                            paddingBottom: "15px",
                                          }}
                                        >
                                          <Grid container spacing={2}>
                                            <Grid item xs={12}>
                                              <Typography varaint="subtitle1">
                                                Location {index + 1}.
                                              </Typography>
                                            </Grid>
                                            <Grid
                                              item
                                              xs={3}
                                              className={`province`}
                                            >
                                              <Typography varaint="subtitle1">
                                                Province
                                              </Typography>
                                              {/* <Field
                                                name={`data.location[${index}].province`}
                                                component={TextField}
                                                size="small"
                                                fullWidth
                                              /> */}
                                              <Field
                                                component={Select}
                                                formControl={{
                                                  sx: {
                                                    width: "100%",
                                                    size: "small",
                                                  },
                                                }}
                                                MenuProps={{
                                                  PaperProps: {
                                                    sx: { maxHeight: 500 },
                                                  },
                                                }}
                                                size="small"
                                                id={`data.location[${index}].province`}
                                                name={`data.location[${index}].province`}
                                              >
                                                {dbProvince &&
                                                  dbProvince
                                                    .sort((a, b) =>
                                                      a.name_en > b.name_en
                                                        ? 1
                                                        : -1
                                                    )
                                                    .map((val, index) => (
                                                      <MenuItem
                                                        key={index}
                                                        value={val.id}
                                                      >
                                                        {val.name_en}
                                                      </MenuItem>
                                                    ))}
                                              </Field>
                                            </Grid>
                                            <Grid
                                              item
                                              xs={3}
                                              className={`district`}
                                            >
                                              <Typography varaint="subtitle1">
                                                District
                                              </Typography>
                                              {/* <Field
                                                name={`data.location[${index}].district`}
                                                component={TextField}
                                                size="small"
                                                fullWidth
                                              /> */}
                                              <Field
                                                component={Select}
                                                formControl={{
                                                  sx: {
                                                    width: "100%",
                                                    size: "small",
                                                  },
                                                }}
                                                MenuProps={{
                                                  PaperProps: {
                                                    sx: { maxHeight: 500 },
                                                  },
                                                }}
                                                size="small"
                                                id={`data.location[${index}].district`}
                                                name={`data.location[${index}].district`}
                                              >
                                                {dbDistrict &&
                                                  dbDistrict
                                                    .filter(
                                                      (item) =>
                                                        item.province_id ==
                                                        values.data.location[
                                                          index
                                                        ].province
                                                    )
                                                    .sort((a, b) =>
                                                      a.name_en > b.name_en
                                                        ? 1
                                                        : -1
                                                    )
                                                    .map((val, index) => (
                                                      <MenuItem
                                                        key={index}
                                                        value={val.id}
                                                      >
                                                        {val.name_en}
                                                      </MenuItem>
                                                    ))}
                                              </Field>
                                            </Grid>
                                            <Grid
                                              item
                                              xs={6}
                                              className={`locality`}
                                            >
                                              <Typography varaint="subtitle1">
                                                Locality
                                              </Typography>
                                              <Box style={{ display: "flex" }}>
                                                <Field
                                                  name={`data.location[${index}].locality`}
                                                  component={TextField}
                                                  size="small"
                                                  fullWidth
                                                />
                                                <div style={{ flexGrow: 1 }} />
                                                <IconButton
                                                  color="error"
                                                  sx={{ marginLeft: "1rem" }}
                                                  onClick={() => {
                                                    values.data.location
                                                      .length > 1 &&
                                                      remove(index);
                                                  }}
                                                >
                                                  <DeleteOutline />
                                                </IconButton>
                                              </Box>
                                            </Grid>
                                            <Grid item xs={12}>
                                              <FieldArray
                                                name={`data.location[${index}].address`}
                                              >
                                                {({ push, remove }) => (
                                                  <Grid container spacing={2}>
                                                    <Grid
                                                      item
                                                      xs={12}
                                                      style={{
                                                        display: "flex",
                                                      }}
                                                    >
                                                      <Typography
                                                        variant="subtitle1"
                                                        gutterBottom
                                                      >
                                                        address
                                                      </Typography>
                                                      <Button
                                                        sx={{
                                                          marginLeft: "2rem",
                                                        }}
                                                        color="success"
                                                        variant="outlined"
                                                        size="small"
                                                        onClick={() => {
                                                          push({
                                                            name: "",
                                                            latitude: "",
                                                            longitude: "",
                                                          });
                                                        }}
                                                      >
                                                        Add
                                                      </Button>
                                                    </Grid>
                                                    {values.data.location[index]
                                                      .address &&
                                                      values.data.location[
                                                        index
                                                      ].address.map(
                                                        (val, subIndex) => (
                                                          <Grid
                                                            item
                                                            xs={12}
                                                            key={subIndex}
                                                          >
                                                            <Grid
                                                              container
                                                              spacing={2}
                                                              alignItems="flex-end"
                                                            >
                                                              <Grid
                                                                item
                                                                xs={4}
                                                                sx={{
                                                                  display:
                                                                    "flex",
                                                                  alignItems:
                                                                    "flex-end",
                                                                }}
                                                              >
                                                                <Typography
                                                                  varaint="subtitle1"
                                                                  gutterBottom
                                                                  sx={{
                                                                    marginRight:
                                                                      "1rem",
                                                                  }}
                                                                >
                                                                  {subIndex + 1}
                                                                  .
                                                                </Typography>
                                                                <Box
                                                                  sx={{
                                                                    flexGrow: 1,
                                                                  }}
                                                                />
                                                                <Field
                                                                  name={`data.location[${index}].address[${subIndex}].name`}
                                                                  component={
                                                                    TextField
                                                                  }
                                                                  size="small"
                                                                  fullWidth
                                                                  placeholder="Name"
                                                                />
                                                              </Grid>
                                                              <Grid item xs={3}>
                                                                <Field
                                                                  name={`data.location[${index}].address[${subIndex}].latitude`}
                                                                  component={
                                                                    TextField
                                                                  }
                                                                  size="small"
                                                                  fullWidth
                                                                  placeholder="Latitude"
                                                                />
                                                              </Grid>
                                                              <Grid item xs={3}>
                                                                <Field
                                                                  name={`data.location[${index}].address[${subIndex}].longitude`}
                                                                  component={
                                                                    TextField
                                                                  }
                                                                  size="small"
                                                                  fullWidth
                                                                  placeholder="Longitude"
                                                                />
                                                              </Grid>
                                                              <Grid item xs={1}>
                                                                <IconButton
                                                                  color="error"
                                                                  onClick={() => {
                                                                    values.data
                                                                      .location[
                                                                      index
                                                                    ].address
                                                                      .length >
                                                                      1 &&
                                                                      remove(
                                                                        subIndex
                                                                      );
                                                                  }}
                                                                >
                                                                  <Backspace />
                                                                </IconButton>
                                                              </Grid>
                                                            </Grid>
                                                          </Grid>
                                                        )
                                                      )}
                                                  </Grid>
                                                )}
                                              </FieldArray>
                                            </Grid>
                                          </Grid>
                                        </Paper>
                                        <Grid item xs={12}>
                                          <Divider
                                            style={{ marginTop: "1rem" }}
                                          />
                                        </Grid>
                                      </Grid>
                                    ))}
                                </Grid>
                              </Fragment>
                            )}
                          </FieldArray>
                        </Grid>
                        <Grid item xs={12}>
                          <FieldArray name="data.paper">
                            {({ push, remove }) => (
                              <Grid container spacing={2}>
                                <Grid item xs={12} sx={{ display: "flex" }}>
                                  <Typography variant="subtitle1">
                                    Paper Ref
                                  </Typography>
                                  <Button
                                    sx={{
                                      marginLeft: "2rem",
                                    }}
                                    color="success"
                                    variant="outlined"
                                    size="small"
                                    onClick={() =>
                                      push({
                                        name: "",
                                        latitude: "",
                                        longitude: "",
                                      })
                                    }
                                  >
                                    Add
                                  </Button>
                                </Grid>
                                {values.data.paper &&
                                  values.data.paper.map((val, index) => (
                                    <Grid
                                      item
                                      key={index}
                                      xs={4}
                                      sx={{
                                        display: "flex",
                                        alignItems: "flex-end",
                                      }}
                                    >
                                      <Typography
                                        varaint="subtitle1"
                                        gutterBottom
                                        sx={{ marginRight: "1rem" }}
                                      >
                                        {index + 1}.
                                      </Typography>
                                      <Field
                                        name={`data.paper[${index}].name`}
                                        component={TextField}
                                        size="small"
                                        fullWidth
                                        placeholder="Paper name"
                                      />
                                      <IconButton
                                        color="error"
                                        onClick={() => {
                                          values.data.paper.length > 1 &&
                                            remove(index);
                                        }}
                                      >
                                        <Backspace />
                                      </IconButton>
                                    </Grid>
                                  ))}
                              </Grid>
                            )}
                          </FieldArray>
                        </Grid>
                        <Grid item xs={12}>
                          <Divider style={{ marginTop: "1rem" }} />
                        </Grid>
                        <Grid item xs={12}>
                          <Typography variant="subtitle1" gutterBottom>
                            Upload image
                          </Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <Box sx={{ margin: "1rem" }}>
                            <Box {...getRootProps({ className: "dropzone" })}>
                              <Box className="inner-dropzone">
                                <input {...getInputProps()} />
                                <Fragment>{thumbs}</Fragment>
                                <div
                                  className={`placeholder ${
                                    classes.placeholder
                                  } ${
                                    files.length != 0 &&
                                    classes.placeholderImageProfile
                                  }`}
                                >
                                  <AddAPhoto />
                                  <Typography
                                    style={{
                                      marginTop: 8,
                                      backgroundColor: "transparent",
                                    }}
                                    className={`${
                                      files != 0 && classes.placeholderLabel
                                    }`}
                                    variant="body2"
                                  >
                                    Upload Photo
                                  </Typography>
                                </div>
                              </Box>
                            </Box>
                          </Box>
                          <Button
                            variant="text"
                            size="small"
                            color="error"
                            onClick={() => setFiles([])}
                          >
                            Clear
                          </Button>
                        </Grid>
                        <Grid item xs={12}>
                          <Divider style={{ marginTop: "1rem" }} />
                        </Grid>
                        {/* <Grid item xs={12}>
                            <Button
                              type="submit"
                              variant="outlined"
                              color="primary"
                            >
                              Submit
                            </Button>
                          </Grid> */}
                      </Grid>

                      <Box style={{ display: "flex" }}>
                        <pre>{JSON.stringify({ values, errors }, null, 4)}</pre>
                      </Box>
                    </Form>
                  )}
                </Formik>
              )}
            </Paper>
          </Container>
        </ThemeProvider>
      </StyledEngineProvider>
    </div>
  );
};

export default EditDetailForm;
