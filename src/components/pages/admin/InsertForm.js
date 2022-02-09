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
  Icon,
  Stack,
} from "@mui/material";
import {
  ThemeProvider,
  StyledEngineProvider,
  createTheme,
} from "@mui/material/styles";
import makeStyles from "@mui/styles/makeStyles";
import { Field, Formik, Form, FieldArray, ErrorMessage } from "formik";
import React, {
  useRef,
  useState,
  useEffect,
  Fragment,
  useCallback,
} from "react";
import MapView from "../shared/MapView";
import { useDispatch } from "react-redux";
import "./index.css";

import { postFamily, getAllFamily } from "../../../actions/family";
import { getAllGenus, postGenus } from "../../../actions/genus";
import { getAllSpecies } from "../../../actions/species";
import { useSelector } from "react-redux";
import { Select, SimpleFileUpload, Switch, TextField } from "formik-mui";
import { Box, margin } from "@mui/system";
import { useDropzone } from "react-dropzone";

import { SnackbarProvider, useSnackbar } from "notistack";

import {
  postFamilyFn,
  postGenusFn,
  postSpeciesFn,
  postDetailFn,
  postLocationFn,
  postAddressFn,
  postPaperFn,
  postImageFn,
} from "./insertFn";
import validationSchema from "./validate";
import {
  Close,
  WindowSharp,
  AddAPhoto,
  Backspace,
  Delete,
  DeleteOutline,
} from "@mui/icons-material";
import { getAllProvinces } from "../../../actions/province";
import { getAllDistrict } from "../../../actions/district";
import themplates from "../shared/theme";

const theme = createTheme(themplates);

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
  uploadImage: {
    height: "160px",
    width: "auto",
    padding: "8px",
    margin: "8px",
  },
}));

const InsertForm = () => {
  const [years, setYears] = useState([]);
  const classes = useStyles();
  const dispatch = useDispatch();
  const formRef = useRef();
  const [success, setSuccess] = useState(false);
  const [submit, setSubmit] = useState(false);
  const { result: dbFamily } = useSelector((state) => state.family);
  const { result: dbGenus } = useSelector((state) => state.genus);
  const { result: dbSpecies } = useSelector((state) => state.species);
  const { result: dbProvince } = useSelector((state) => state.province);
  const { result: dbDistrict } = useSelector((state) => state.district);
  const [status, setStatus] = useState({
    showFamily: true,
    showGenus: true,
    showSpecies: true,
  });
  const [data] = useState({
    family: "",
    genus: "",
    species: "",
    author: "",
    publish_year: "",
    country: "Thailand",
    country_other: "",
    altitude: "",
    method: "",
    habitat: "",
    microhabitat: "",
    designate: "",
    location: [
      {
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
      },
    ],
    paper: [
      {
        name: "",
      },
    ],
  });

  const [point, setPoint] = useState([
    {
      name: "",
      latitude: "",
      longitude: "",
    },
  ]);
  const [files, setFiles] = useState([]);
  const [uploads, setUploads] = useState([]);

  useEffect(() => {
    dispatch(getAllFamily());
    dispatch(getAllGenus());
    dispatch(getAllSpecies());

    dispatch(getAllProvinces());
    dispatch(getAllDistrict());

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
  }, []);

  // onDrop of react Drop zone
  const onDrop = (acceptedFiles) => {
    // Do something with the files
    let formData = new FormData();
    acceptedFiles.map((file) => formData.append("image", file));
    let files_ = [...files];

    const preFiles = acceptedFiles.map((file) =>
      Object.assign(file, { preview: URL.createObjectURL(file) })
    );

    files_ = files_.concat(preFiles);
    // setFiles(
    //   acceptedFiles.map((file) =>
    //     Object.assign(file, { preview: URL.createObjectURL(file) })
    //   )
    // );

    setFiles(files_);

    let uploads_ = [...uploads];
    uploads_ = uploads_.concat(acceptedFiles);
    setUploads(uploads_);
  };

  // set react Drop zone
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: "image/jpeg, image/png",
    onDrop,
    maxFiles: 20,
    maxSize: 1256000,
  });

  // preview image input
  const thumbs = files.map((file) => (
    <img key={file.name} src={file.preview} className={classes.uploadImage} />
  ));

  // form submit
  const handleSubmit = async (values) => {
    const data_ = values;

    // check type old type spider
    const checkFamily = dbFamily.find(
      (item) => item.id == Number(values.family) || item.name == values.family
    );

    const checkGenus = dbGenus.find(
      (item) => item.id == Number(values.genus) || item.name == values.genus
    );

    const checkSpecies = dbSpecies.find(
      (item) => item.id == Number(values.species) || item.name == values.species
    );

    checkFamily
      ? (data_.family = checkFamily.id)
      : (data_.family = await postFamilyFn(data_.family));

    checkGenus
      ? (data_.genus = checkGenus.id)
      : (data_.genus = await postGenusFn(data_.family, data_.genus));

    checkSpecies
      ? (data_.species = checkSpecies.id)
      : (data_.species = await postSpeciesFn(data_.genus, data_.species));

    const detail_ = {
      family_id: data_.family,
      genus_id: data_.genus,
      species_id: data_.species,
      author: data_.author,
      publish_year: data_.publish_year,
      country: data_.country,
      country_other: data_.country_other,
      altitude: data_.altitude,
      method: data_.method,
      habitat: data_.habitat,
      microhabitat: data_.microhabitat,
      designate: data_.designate,
    };

    const detail_id = await postDetailFn(detail_);

    const location = data_.location;

    location.map(async (item) => {
      const address = item.address;
      delete item.address;
      const locationId = await postLocationFn(item, detail_id);
      address.map(async (item2) => {
        const AddressId = await postAddressFn(item2, locationId);
      });
    });

    const paper = data_.paper;

    paper.map(async (item) => {
      const paperId = await postPaperFn(item, detail_id);
    });

    uploads &&
      uploads.map((item) => {
        const formData = new FormData();
        formData.append("image", item);
        formData.append("detail_id", detail_id);

        const res = postImageFn(formData);
      });

    return detail_id;
  };

  const onKeyDown = (keyEvent) => {
    if ((keyEvent.charCode || keyEvent.keyCode) === 13) {
      keyEvent.preventDefault();
    }
  };

  const handleOnClickDeleteImage = (index) => {
    let files_ = [...files];
    let uploads_ = [...uploads];

    files_.splice(index, 1);
    uploads_.splice(index, 1);

    setFiles(files_);
    setUploads(uploads_);
  };

  // render form component
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <div className={`page`}>
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
              <Formik
                initialValues={{ data, status, submit }}
                enableReinitialize
                innerRef={formRef}
                validationSchema={validationSchema}
                onSubmit={(values, setSubmitting) => {
                  try {
                    handleSubmit(values.data).then((detail_id) => {
                      setSuccess(true);
                      window.scrollTo(0, 0);
                      // setTimeout(() => {
                      //   window.location.reload();
                      // }, 1000);
                    });
                  } catch (error) {
                    console.log(error);
                  }
                }}
              >
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
                                name="data.family"
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
                                name="data.family"
                                size="small"
                              ></Field>
                            )}
                          </Grid>
                          <Grid item xs={4} className={`genus`}>
                            <Box style={{ display: "flex" }}>
                              <Typography variant="subtitle1">Genus</Typography>
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
                                id="data.genus"
                                name="data.genus"
                              >
                                {dbGenus &&
                                  dbGenus
                                    .filter(
                                      (item) =>
                                        item.family_id ===
                                        Number(values.data.family)
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
                                name="data.genus"
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
                                id="data.species"
                                name="data.species"
                              >
                                {dbSpecies &&
                                  dbSpecies
                                    .filter(
                                      (item) =>
                                        item.genus_id ===
                                        Number(values.data.genus)
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
                                name="data.species"
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
                            <Typography varaint="subtitle1">Author</Typography>
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
                            <Typography variant="subtitle1">Country</Typography>
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
                        {/* grid for create first half layout */}

                        {/*grid for segment MapView */}
                      </Grid>
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
                                <Grid item xs={12} style={{ display: "flex" }}>
                                  <Button
                                    variant="contained"
                                    size="small"
                                    color="info"
                                    sx={{
                                      border: "none",
                                      textTransform: "none",
                                    }}
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
                                                  values.data.location.length >
                                                    1 && remove(index);
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
                                                      color="info"
                                                      sx={{
                                                        border: "none",
                                                        textTransform: "none",
                                                        ml: "2rem",
                                                      }}
                                                      variant="contained"
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
                                                                display: "flex",
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
                                                                {subIndex + 1}.
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
                                  color="info"
                                  sx={{
                                    border: "none",
                                    textTransform: "none",
                                    ml: "2rem",
                                  }}
                                  variant="contained"
                                  size="small"
                                  onClick={() =>
                                    push({
                                      name: "",
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
                        <Stack direction="row" spacing={2} alignItems="center">
                          <Typography variant="subtitle1" gutterBottom>
                            Upload image
                          </Typography>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            gutterBottom
                          >
                            (Up to 1 MB/file)
                          </Typography>
                        </Stack>
                      </Grid>
                      <Grid item xs={12}>
                        <Box sx={{ margin: "1rem" }}>
                          <Box {...getRootProps({ className: "dropzone" })}>
                            <Box className="inner-dropzone">
                              <input {...getInputProps()} />
                              {/* <Fragment>{thumbs}</Fragment> */}
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
                        {/* <Button
                          variant="text"
                          size="small"
                          color="error"
                          onClick={() => setFiles([])}
                        >
                          Clear
                        </Button> */}
                      </Grid>
                      <Grid item xs={12}>
                        <Box sx={{ display: "flex", flexWrap: "wrap" }}>
                          {files &&
                            files.map((file, index) => (
                              <Box
                                key={index}
                                sx={{ textAlign: "center", ml: 2 }}
                              >
                                <Box
                                  component="img"
                                  key={file.name}
                                  src={file.preview}
                                  // className={classes.uploadImage}
                                  sx={{
                                    height: "245px",
                                    width: "100%",
                                    display: "block",
                                    border: "2px solid",
                                    borderColor: "darkgray",
                                    mb: 2,
                                  }}
                                />
                                <Button
                                  disableRipple
                                  variant="contained"
                                  color="error"
                                  sx={{ textTransform: "none", border: "none" }}
                                  onClick={() =>
                                    handleOnClickDeleteImage(index)
                                  }
                                >
                                  Delete
                                </Button>
                              </Box>
                            ))}
                        </Box>
                      </Grid>

                      {/* main grid */}
                      <Grid item xs={12}>
                        <Divider style={{ marginTop: "1rem" }} />
                      </Grid>
                      <Grid item xs={12}>
                        <Button
                          type="submit"
                          variant="contained"
                          color="secondary"
                          sx={{ border: "none" }}
                        >
                          Submit
                        </Button>
                      </Grid>
                    </Grid>

                    <Box style={{ display: "flex" }}>
                      <pre>{JSON.stringify({ values, errors }, null, 4)}</pre>
                    </Box>
                  </Form>
                )}
              </Formik>
            </Paper>
          </Container>
        </div>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default InsertForm;
