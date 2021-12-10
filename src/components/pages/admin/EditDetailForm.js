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
  FormControl,
  List,
  ListItem,
  ListItemIcon,
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
import { updateDetailFn, updateDetailTypeFn } from "./insertFn";

const theme = createTheme({});

const useStyles = makeStyles(() => ({
  root: {},
  paper: {
    padding: "10px",
    boxShadow: "none",
    border: "1px solid #B3B6B7",
  },
}));
const EditDetailForm = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const formRef = useRef();
  const { result: dbProvince } = useSelector((state) => state.province);
  const { result: dbDistrict } = useSelector((state) => state.district);
  const { result: dbFamily } = useSelector((state) => state.family);
  const { result: dbGenus } = useSelector((state) => state.genus);
  const { result: dbSpecies } = useSelector((state) => state.species);

  const [oldDetail, setOldDetail] = useState();
  const [currentDetail, setCurrentDetail] = useState();
  const [detail, setDetail] = useState();
  const [years, setYears] = useState([]);
  const [type, setType] = useState();
  const [general, setGeneral] = useState();
  const [location, setLocation] = useState();
  const [paper, setPaper] = useState();
  const [image, setImage] = useState();
  const [final, setFinal] = useState();

  useEffect(async () => {
    const detailId = props.match.params.id;

    if (detail == null && detailId) {
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

        console.log("tmp", tmpDetail);

        dispatch(getAllProvinces());
        dispatch(getAllDistrict());
        dispatch(getAllFamily());
        dispatch(getAllGenus());
        dispatch(getAllSpecies());

        // setOldDetail(tmpDetail);
        // setCurrentDetail(tmpDetail);
        setDetail(tmpDetail);
        setFinal(tmpDetail);
      }
    }

    const createListYear = () => {
      const date = new Date();
      const tmpYesrs = [];
      let nowYear = date.getFullYear();
      console.log(`now year : ${nowYear}`);
      for (let i = nowYear; i > nowYear - 100; i--) {
        tmpYesrs.push(i);
      }
      setYears([...tmpYesrs]);
    };

    createListYear();
  }, [detail]);

  const onKeyDown = (keyEvent) => {
    if ((keyEvent.charCode || keyEvent.keyCode) === 13) {
      keyEvent.preventDefault();
    }
  };

  const handleTypeSubmit = async (values) => {
    const type_ = {
      id: detail.id,
      family_id: parseInt(values.family_id),
      genus_id: parseInt(values.genus_id),
      species_id: parseInt(values.species_id),
    };
    setType(type_);
    const res = updateDetailTypeFn(type_);
    console.log("res update type", res);
  };

  const handleGeneralSubmit = (values) => {
    const general_ = values;
    general_.id = detail.id;
    setGeneral(general_);
    const res = updateDetailFn(general_);
  };

  const handleLocationSubmit = (values) => {
    let location_ = values.location;
    // for (let i = 0; i < location_.length; i++) {
    //   location_[i].id = parseInt(location_[i].id);
    //   location_[i].detail_id = parseInt(location_[i].detail_id);
    //   location_[i].province = parseInt(location_[i].province);
    //   location_[i].district = parseInt(location_[i].district);
    //   for (let j = 0; j < location_[i].address.length; j++) {
    //     location_[i].address[j].id = parseInt(location_[i].address[j].id);
    //     location_[i].address[j].location_id = parseInt(
    //       location_[i].address[j].location_id
    //     );
    //   }
    // }

    setLocation(location_);
  };

  const handlePaperSubmit = (values) => {
    let paper_ = values.paper;
    for (let i = 0; i < paper_.length; i++) {
      paper_[i].id = parseInt(paper_[i].id);
      paper_[i].detail_id = parseInt(paper_[i].detail_id);
    }
    setPaper(paper_);
  };

  const handleImageSubmit = (values) => {
    let image_ = values.image;
    // for (let i = 0; i < image_.length; i++) {
    //   image_[i].id = parseInt(image_[i].id);
    //   image_[i].detail_id = parseInt(image_[i].detail_id);
    // }
    setImage(image_);
  };

  // const handleUpdateAll = () => {
  //   const finalData = { ...final };

  //   if (type) {
  //     finalData.family_id = type.family_id;
  //     finalData.genus_id = type.genus_id;
  //     finalData.species_id = type.species_id;
  //   }

  //   if (detail) {
  //     finalData.author = detail.author;
  //     finalData.publish_year = detail.publish_year;
  //     finalData.country = detail.country;
  //     finalData.country_other = detail.country_other;
  //     finalData.altitude = detail.altitude;
  //     finalData.method = detail.method;
  //     finalData.habita = detail.habita;
  //     finalData.microhabitat = detail.microhabitat;
  //     finalData.designate = detail.designate;
  //   }

  //   if (location) {
  //     finalData.location = location;
  //   }

  //   if (paper) {
  //     finalData.paper = paper;
  //   }

  //   setFinal(finalData);
  // };

  return (
    <div className={`page`}>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <Container maxWidth="lg">
            {detail != null && (
              <Paper className={classes.paper}>
                <Typography
                  variant="h5"
                  component="div"
                  sx={{ fontWeight: 600 }}
                  gutterBottom
                >
                  Edit from ID #{oldDetail && oldDetail.id}
                </Typography>
                <Divider />
                <br />
                <Typography
                  variant="h6"
                  component="div"
                  sx={{ fontWeight: 600 }}
                >
                  Family Action
                </Typography>
                <Collapse in={type ? true : false}>
                  <Alert>Save type</Alert>
                </Collapse>
                <Formik
                  initialValues={{
                    family_id: detail.family_id,
                    genus_id: detail.genus_id,
                    species_id: detail.species_id,
                  }}
                  enableReinitialize
                  innerRef={formRef}
                  onSubmit={(values, setSubmitting) => {
                    try {
                      handleTypeSubmit(values);
                    } catch (err) {
                      console.log("error", err);
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
                      <Grid container spacing={2}>
                        <Grid item xs={12} lg={4}>
                          <Typography variant="subtitle1" component="div">
                            Family
                          </Typography>
                          <Field
                            component={Select}
                            formControl={{
                              sx: { width: "100%", size: "small" },
                            }}
                            size="small"
                            id="family_id"
                            name="family_id"
                          >
                            {dbFamily &&
                              dbFamily.map((val, index) => (
                                <MenuItem key={index} value={val.id}>
                                  {val.name}
                                </MenuItem>
                              ))}
                          </Field>
                        </Grid>
                        <Grid item xs={12} lg={4}>
                          <Typography variant="subtitle1" component="div">
                            Genus
                          </Typography>
                          <Field
                            component={Select}
                            formControl={{
                              sx: { width: "100%", size: "small" },
                            }}
                            size="small"
                            id="genus_id"
                            name="genus_id"
                          >
                            {dbGenus &&
                              dbGenus
                                .filter(
                                  (item) =>
                                    item.family_id === Number(values.family_id)
                                )
                                .map((val, index) => (
                                  <MenuItem key={index} value={val.id}>
                                    {val.name}
                                  </MenuItem>
                                ))}
                          </Field>
                        </Grid>
                        <Grid item xs={12} lg={4}>
                          <Typography variant="subtitle1" component="div">
                            Species
                          </Typography>
                          <Field
                            component={Select}
                            formControl={{
                              sx: { width: "100%", size: "small" },
                            }}
                            size="small"
                            id="species_id"
                            name="species_id"
                          >
                            {dbSpecies &&
                              dbSpecies
                                .filter(
                                  (item) =>
                                    item.genus_id === Number(values.genus_id)
                                )
                                .map((val, index) => (
                                  <MenuItem key={index} value={val.id}>
                                    {val.name}
                                  </MenuItem>
                                ))}
                          </Field>
                        </Grid>
                      </Grid>
                      <br />
                      <Button type="submit" variant="contained" size="small">
                        save
                      </Button>
                    </Form>
                  )}
                </Formik>
                <br />
                <Divider />
                <br />
                <Typography
                  variant="h6"
                  component="div"
                  sx={{ fontWeight: 600 }}
                >
                  Detail
                </Typography>
                <Collapse in={general ? true : false}>
                  <Alert>Save Detail</Alert>
                </Collapse>
                <Formik
                  initialValues={{
                    author: detail.author,
                    publish_year: detail.publish_year,
                    country: detail.country,
                    country_other: detail.country_other,
                    altitude: detail.altitude,
                    method: detail.method,
                    habitat: detail.habitat,
                    microhabitat: detail.microhabitat,
                    designate: detail.designate,
                  }}
                  onSubmit={(values, setSubmitting) => {
                    try {
                      handleGeneralSubmit(values);
                    } catch (err) {
                      console.log("general err", err);
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
                      <Grid container spacing={2}>
                        <Grid item xs={9} className={`author`}>
                          <Typography varaint="subtitle1">Author</Typography>
                          <Field
                            name="author"
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
                            name="publish_year"
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
                            name="country"
                            component={TextField}
                            disabled
                            fullWidth
                            value={values.country}
                            size="small"
                          />
                        </Grid>
                        <Grid item xs={9}>
                          <Typography variant="subtitle1">
                            Other country
                          </Typography>
                          <Field
                            name="country_other"
                            component={TextField}
                            fullWidth
                            size="small"
                            placeholder="if any"
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <Typography variant="subtitle1">Altitude</Typography>
                          <Field
                            name="altitude"
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
                            name="method"
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
                            name="habitat"
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
                            name="microhabitat"
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
                            name="designate"
                            component={TextField}
                            fullWidth
                            multiline
                            rows={2}
                            size="small"
                          ></Field>
                        </Grid>
                      </Grid>
                      <br />
                      <Button type="submit" variant="contained" size="small">
                        save
                      </Button>
                    </Form>
                  )}
                </Formik>
                <br />
                <Divider />
                <br />
                <Typography
                  variant="h6"
                  component="div"
                  sx={{ fontWeight: 600 }}
                >
                  Location
                </Typography>
                <Collapse in={location ? true : false}>
                  <Alert>Save Locations</Alert>
                </Collapse>
                <Formik
                  initialValues={{ location: detail.location }}
                  onSubmit={(values, setSubmitting) => {
                    try {
                      handleLocationSubmit(values);
                    } catch (err) {}
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
                      <FieldArray name="location">
                        {({ push, pop, remove }) => (
                          <Fragment>
                            <Grid container spacing={2}>
                              <Grid item xs={12} style={{ display: "flex" }}>
                                <Button
                                  variant="contained"
                                  size="small"
                                  color="warning"
                                  onClick={() =>
                                    push({
                                      id: "newLocation",
                                      detail_id: values.location[0].detail_id,
                                      province: "",
                                      district: "",
                                      locality: "",
                                      address: [
                                        {
                                          id: "newLocation",
                                          location_id: "newLocation",
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
                              </Grid>
                              {values.location &&
                                values.location.map((val, index) => (
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
                                            id={`location[${index}].province`}
                                            name={`location[${index}].province`}
                                          >
                                            {dbProvince &&
                                              dbProvince
                                                .sort((a, b) =>
                                                  a.name_en > b.name_en ? 1 : -1
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
                                            id={`location[${index}].district`}
                                            name={`location[${index}].district`}
                                          >
                                            {dbDistrict &&
                                              dbDistrict
                                                .filter(
                                                  (item) =>
                                                    item.province_id ==
                                                    values.location[index]
                                                      .province
                                                )
                                                .sort((a, b) =>
                                                  a.name_en > b.name_en ? 1 : -1
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
                                              name={`location[${index}].locality`}
                                              component={TextField}
                                              size="small"
                                              fullWidth
                                            />
                                            <div style={{ flexGrow: 1 }} />
                                            <IconButton
                                              color="error"
                                              sx={{ marginLeft: "1rem" }}
                                              onClick={() => {
                                                values.location.length > 1 &&
                                                  remove(index);
                                              }}
                                            >
                                              <DeleteOutline />
                                            </IconButton>
                                          </Box>
                                        </Grid>
                                        <Grid item xs={12}>
                                          <FieldArray
                                            name={`location[${index}].address`}
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
                                                    color="warning"
                                                    variant="contained"
                                                    size="small"
                                                    onClick={() => {
                                                      push({
                                                        id: "newAddress",
                                                        location_id:
                                                          values.location[index]
                                                            .id,
                                                        name: "",
                                                        latitude: "",
                                                        longitude: "",
                                                      });
                                                    }}
                                                  >
                                                    Add
                                                  </Button>
                                                </Grid>
                                                {values.location[index]
                                                  .address &&
                                                  values.location[
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
                                                              name={`location[${index}].address[${subIndex}].name`}
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
                                                              name={`location[${index}].address[${subIndex}].latitude`}
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
                                                              name={`location[${index}].address[${subIndex}].longitude`}
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
                                                                values.location[
                                                                  index
                                                                ].address
                                                                  .length > 1 &&
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
                                  </Grid>
                                ))}
                            </Grid>
                          </Fragment>
                        )}
                      </FieldArray>
                      <br />
                      <Button type="submit" variant="contained" size="small">
                        save
                      </Button>
                    </Form>
                  )}
                </Formik>
                <br />
                <Divider />
                <br />
                <Typography
                  variant="h6"
                  component="div"
                  sx={{ fontWeight: 600 }}
                >
                  Referance
                </Typography>
                <Collapse in={paper ? true : false}>
                  <Alert>Save Referance</Alert>
                </Collapse>
                <Formik
                  initialValues={{ paper: detail.paper }}
                  onSubmit={(values, setSubmitting) => {
                    try {
                      handlePaperSubmit(values);
                    } catch (err) {
                      console.log("error", err);
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
                      <FieldArray name="paper">
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
                                color="warning"
                                variant="contained"
                                size="small"
                                onClick={() =>
                                  push({
                                    id: "newPaper",
                                    detail_id: values.paper[0].detail_id,
                                    name: "",
                                  })
                                }
                              >
                                Add
                              </Button>
                            </Grid>
                            {values.paper &&
                              values.paper.map((val, index) => (
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
                                    name={`paper[${index}].name`}
                                    component={TextField}
                                    size="small"
                                    fullWidth
                                    placeholder="Paper name"
                                  />
                                  <IconButton
                                    color="error"
                                    onClick={() => {
                                      values.paper.length > 1 && remove(index);
                                    }}
                                  >
                                    <Backspace />
                                  </IconButton>
                                </Grid>
                              ))}
                          </Grid>
                        )}
                      </FieldArray>
                      <br />
                      <Button type="submit" variant="contained" size="small">
                        save
                      </Button>
                    </Form>
                  )}
                </Formik>
                <br />
                <Divider />
                <br />
                <Typography
                  variant="h6"
                  component="div"
                  sx={{ fontWeight: 600 }}
                >
                  Image
                </Typography>
                <Collapse in={image ? true : false}>
                  <Alert>Save Image</Alert>
                </Collapse>
                <Formik
                  // enableReinitialize
                  initialValues={{ image: detail.image }}
                  onSubmit={(values, setSubmitting) => {
                    try {
                      handleImageSubmit(values);
                    } catch (err) {}
                  }}
                >
                  {({
                    values,
                    errors,
                    isSubmitting,
                    touched,
                    handleBlur,
                    setFieldValue,
                    // handleImagePreview,
                  }) => (
                    <Form
                      autoComplete="off"
                      className={classes.form}
                      onKeyDown={onKeyDown}
                    >
                      <FieldArray name={`image`}>
                        {({ push, remove }) => (
                          <Box>
                            <label htmlFor="button-file">
                              <input
                                type="file"
                                id="button-file"
                                accept="image/*"
                                multiple
                                hidden
                                onChange={(e) => {
                                  const tmp = e.currentTarget.files;
                                  for (let i = 0; i < tmp.length; i++) {
                                    let reader = new FileReader();
                                    const file = e.currentTarget.files[i];
                                    reader.onloadend = () => {
                                      push({
                                        id: "newImage",
                                        detail_id: detail.id,
                                        name: file,
                                        path: reader.result,
                                        active: 1,
                                      });
                                    };
                                    console.log("loop", i, "file", file);
                                    reader.readAsDataURL(file);
                                  }
                                }}
                                // onChange={(event) => {
                                //   setFieldValue(
                                //     "file",
                                //     event.currentTarget.files[0]
                                //   );
                                // }}
                              />

                              <Button
                                size="small"
                                variant="contained"
                                // sx={{ textTransform: "none" }}
                                component="span"
                                color="warning"
                              >
                                Add image
                              </Button>
                            </label>
                            <Box>
                              <br />
                            </Box>
                            <Grid container spacing={2}>
                              {values.image.map((val, index) => (
                                <Grid item key={index}>
                                  {val.active == 1 ? (
                                    <Box sx={{ textAlign: "center" }}>
                                      <Box>
                                        <img
                                          src={
                                            val.id != "newImage"
                                              ? `/${val.path}`
                                              : val.path
                                          }
                                          // width="100%"
                                          style={{
                                            maxHeight: "245px",
                                            width: "auto",
                                            margin: "5px",
                                            padding: "5px",
                                            border: "2px solid #b8b8b8",
                                          }}
                                        />
                                      </Box>
                                      <Button
                                        variant="contained"
                                        size="small"
                                        sx={{ textTransform: "none" }}
                                        color="error"
                                        onClick={() => {
                                          setFieldValue(
                                            `image[${index}].active`,
                                            0
                                          );
                                        }}
                                      >
                                        Delete
                                      </Button>
                                    </Box>
                                  ) : (
                                    <Box sx={{ textAlign: "center" }}>
                                      <Box>
                                        <img
                                          src={`/${val.path}`}
                                          // width="100%"
                                          style={{
                                            maxHeight: "245px",
                                            width: "auto",
                                            margin: "5px",
                                            padding: "5px",
                                            border: "2px solid red",
                                          }}
                                        />
                                      </Box>
                                      <Button
                                        variant="contained"
                                        size="small"
                                        sx={{ textTransform: "none" }}
                                        color="success"
                                        onClick={() => {
                                          setFieldValue(
                                            `image[${index}].active`,
                                            1
                                          );
                                        }}
                                      >
                                        Revers
                                      </Button>
                                    </Box>
                                  )}
                                </Grid>
                              ))}
                            </Grid>
                          </Box>
                        )}
                      </FieldArray>
                      <br />
                      <Box sx={{ display: "flex" }}>
                        <Button variant="contained" type="submit" size="small">
                          Save
                        </Button>
                      </Box>
                      {/* <Box style={{ display: "flex" }}>
                        <pre>{JSON.stringify({ values, errors }, null, 4)}</pre>
                      </Box> */}
                    </Form>
                  )}
                </Formik>
                <br />
                <Divider />
                <br />
                {/* <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                  <Button
                    size="small"
                    variant="contained"
                    color="success"
                    onClick={() => handleUpdateAll()}
                  >
                    Update All
                  </Button>
                </Box> */}
              </Paper>
            )}
          </Container>
        </ThemeProvider>
      </StyledEngineProvider>
      {/* <Box style={{ display: "flex" }}>
<pre>{JSON.stringify({ values, errors }, null, 4)}</pre>
</Box>  */}
    </div>
  );
};

export default EditDetailForm;
