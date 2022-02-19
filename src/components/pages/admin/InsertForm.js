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

    let preFiles = acceptedFiles.map((file, index) => {
      if (file.size > 1256000) {
        alert(
          `File name "${file.name}" over size. The file size that can be uploaded does not exceed 1 MB.`
        );
        return;
      }
      return Object.assign(file, { preview: URL.createObjectURL(file) });
    });

    preFiles = preFiles.reduce((prev, curr) => {
      if (curr) {
        prev.push(curr);
      }
      return prev;
    }, []);

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
    // maxSize: 1256000,
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
                    <Stack
                      spacing={2}
                      direction={
                        window.innerWidth >= 900 ? "row-reverse" : "column"
                      }
                    >
                      <Box
                        sx={{
                          position: "relative",
                          flexGrow: 1,
                          [theme.breakpoints.down("sm")]: {
                            height: "240px",
                          },
                          [theme.breakpoints.up("sm")]: {
                            height: "360px",
                          },
                          [theme.breakpoints.up("md")]: {
                            minHeight: "360px",
                            flexBasis: 1,
                            flexGrow: 0.6,
                          },
                        }}
                      >
                        <div className="map" style={{ height: "100%" }}>
                          <MapView listEx={values.data.location} />
                        </div>
                      </Box>
                      <Box
                        sx={{
                          flexGrow: 1,
                          [theme.breakpoints.up("md")]: {
                            flexBasis: 1,
                          },
                        }}
                      >
                        <Typography
                          variant="h5"
                          sx={{ fontWeight: 600 }}
                          gutterBottom
                        >
                          Family action
                        </Typography>
                        <Grid container spacing={2} sx={{ mb: 2 }}>
                          <Grid item xs={12} md={4} sm={4}>
                            <Stack spacing={1}>
                              <Stack
                                direction="row"
                                spacing={1}
                                alignItems="center"
                              >
                                <Typography variant="subtitle1">
                                  Family
                                </Typography>
                                <Field
                                  component={Switch}
                                  type="checkbox"
                                  name="status.showFamily"
                                  size="small"
                                />
                              </Stack>
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
                                      <MenuItem
                                        key={index + val.id}
                                        value={val.id}
                                      >
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
                            </Stack>
                          </Grid>
                          <Grid item xs={12} md={4} sm={4}>
                            <Stack spacing={1}>
                              <Stack
                                direction="row"
                                spacing={1}
                                alignItems="center"
                              >
                                <Typography variant="subtitle1">
                                  Genus
                                </Typography>
                                <Field
                                  component={Switch}
                                  type="checkbox"
                                  name="status.showGenus"
                                  size="small"
                                />
                              </Stack>
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
                                        <MenuItem
                                          key={index + val.id}
                                          value={val.id}
                                        >
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
                            </Stack>
                          </Grid>
                          <Grid item xs={12} md={4} sm={4}>
                            <Stack spacing={1}>
                              <Stack
                                direction="row"
                                spacing={1}
                                alignItems="center"
                              >
                                <Typography variant="subtitle1">
                                  Species
                                </Typography>
                                <Field
                                  component={Switch}
                                  type="checkbox"
                                  name="status.showSpecies"
                                  size="small"
                                />
                              </Stack>
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
                                        <MenuItem
                                          key={index + val.id}
                                          value={val.id}
                                        >
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
                            </Stack>
                          </Grid>
                        </Grid>
                        <Typography
                          variant="h5"
                          sx={{ fontWeight: 600 }}
                          gutterBottom
                        >
                          Detail
                        </Typography>
                        <Grid container spacing={2}>
                          <Grid item xs={8}>
                            <Stack spacing={1}>
                              <Typography variant="subtitle1">
                                Author
                              </Typography>
                              <Field
                                name="data.author"
                                component={TextField}
                                fullWidth
                                size="small"
                              />
                            </Stack>
                          </Grid>
                          <Grid item xs={4}>
                            <Stack spacing={1}>
                              <Typography variant="subtitle1">
                                ​ Publish year
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
                                    <MenuItem key={index + val} value={val}>
                                      {val}
                                    </MenuItem>
                                  ))}
                              </Field>
                            </Stack>
                          </Grid>
                          <Grid item xs={4}>
                            <Stack spacing={1}>
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
                            </Stack>
                          </Grid>
                          <Grid item xs={8}>
                            <Stack spacing={1}>
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
                            </Stack>
                          </Grid>
                        </Grid>
                      </Box>
                    </Stack>
                    <Stack spacing={4}>
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <Stack spacing={1}>
                            <Typography variant="subtitle1">
                              Altitude
                            </Typography>
                            <Field
                              name="data.altitude"
                              component={TextField}
                              fullWidth
                              multiline
                              rows={2}
                              size="small"
                            ></Field>
                          </Stack>
                        </Grid>
                        <Grid item xs={12}>
                          <Stack spacing={1}>
                            <Typography variant="subtitle1">Method</Typography>
                            <Field
                              name="data.method"
                              component={TextField}
                              fullWidth
                              multiline
                              rows={2}
                              size="small"
                            ></Field>
                          </Stack>
                        </Grid>
                        <Grid item xs={12}>
                          <Stack spacing={1}>
                            <Typography variant="subtitle1">habitat</Typography>
                            <Field
                              name="data.habitat"
                              component={TextField}
                              fullWidth
                              multiline
                              rows={2}
                              size="small"
                            ></Field>
                          </Stack>
                        </Grid>
                        <Grid item xs={12}>
                          <Stack spacing={1}>
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
                          </Stack>
                        </Grid>
                        <Grid item xs={12}>
                          <Stack spacing={1}>
                            <Typography variant="subtitle1">
                              Designate
                            </Typography>
                            <Field
                              name="data.designate"
                              component={TextField}
                              fullWidth
                              multiline
                              rows={2}
                              size="small"
                            ></Field>
                          </Stack>
                        </Grid>
                      </Grid>
                      <Divider style={{ marginTop: "1rem" }} />
                      <FieldArray name="data.location">
                        {({ push, pop, remove }) => (
                          <Box>
                            <Stack
                              direction="row"
                              spacing={2}
                              alignItems="center"
                              sx={{ mb: 2 }}
                            >
                              <Typography variant="h5" sx={{ fontWeight: 600 }}>
                                Loaction
                              </Typography>
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
                            </Stack>
                            <Grid container>
                              {values.data.location &&
                                values.data.location.map((val, index) => (
                                  <Grid item xs={12} key={index + val.id}>
                                    <Paper
                                      sx={{
                                        p: 2,
                                        mb: 2,
                                        boxShadow: "none",
                                        border: `1px solid ${theme.palette.grey[400]}`,
                                      }}
                                    >
                                      <Stack
                                        direction="row"
                                        spacing={2}
                                        alignItems="center"
                                      >
                                        <Typography variant="subtitle1">
                                          Location {index + 1}.
                                        </Typography>
                                        <IconButton
                                          color="error"
                                          sx={{ marginLeft: "1rem" }}
                                          onClick={() => {
                                            values.data.location.length > 1 &&
                                              remove(index);
                                          }}
                                        >
                                          <Delete />
                                        </IconButton>
                                      </Stack>
                                      <Grid
                                        container
                                        spacing={2}
                                        sx={{ mb: 2 }}
                                      >
                                        <Grid item xs={12} sm={6} md={4}>
                                          <Stack spacing={1}>
                                            <Typography variant="subtitle1">
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
                                                      key={index + val.id}
                                                      value={val.id}
                                                    >
                                                      {val.name_en}
                                                    </MenuItem>
                                                  ))}
                                            </Field>
                                          </Stack>
                                        </Grid>
                                        <Grid item xs={12} sm={6} md={4}>
                                          <Stack spacing={1}>
                                            <Typography variant="subtitle1">
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
                                                      key={index + val.id}
                                                      value={val.id}
                                                    >
                                                      {val.name_en}
                                                    </MenuItem>
                                                  ))}
                                            </Field>
                                          </Stack>
                                        </Grid>
                                        <Grid item xs={12} sm={12} md={4}>
                                          <Stack spacing={1}>
                                            <Typography variant="subtitle1">
                                              Locality
                                            </Typography>
                                            <Field
                                              name={`data.location[${index}].locality`}
                                              component={TextField}
                                              size="small"
                                              fullWidth
                                            />
                                          </Stack>
                                        </Grid>
                                      </Grid>
                                      <FieldArray
                                        name={`data.location[${index}].address`}
                                      >
                                        {({ push, remove }) => (
                                          <Fragment>
                                            <Stack
                                              direction="row"
                                              spacing={2}
                                              alignItems="center"
                                              sx={{ mb: 2 }}
                                            >
                                              <Typography
                                                variant="subtitle1"
                                                sx={{ fontWeight: 600 }}
                                              >
                                                Address
                                              </Typography>
                                              <Button
                                                color="info"
                                                sx={{
                                                  border: "none",
                                                  textTransform: "none",
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
                                            </Stack>
                                            <Stack spacing={1}>
                                              {values.data.location[index]
                                                .address &&
                                                values.data.location[
                                                  index
                                                ].address.map(
                                                  (val2, subIndex) => (
                                                    <Stack
                                                      direction="row"
                                                      spacing={1}
                                                      alignItems="center"
                                                      key={subIndex + val.id}
                                                    >
                                                      <Typography
                                                        varaint="subtitle1"
                                                        gutterBottom
                                                        sx={{
                                                          marginRight: "1rem",
                                                        }}
                                                      >
                                                        {subIndex + 1}.
                                                      </Typography>
                                                      <Box
                                                        sx={{
                                                          [theme.breakpoints.down(
                                                            "sm"
                                                          )]: {
                                                            border: `1px solid ${theme.palette.grey[500]}`,
                                                            borderRadius: "4px",
                                                            p: 1,
                                                          },
                                                        }}
                                                      >
                                                        <Grid
                                                          container
                                                          spacing={2}
                                                          alignItems="center"
                                                        >
                                                          <Grid
                                                            item
                                                            xs={12}
                                                            sm={4}
                                                          >
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
                                                          <Grid
                                                            item
                                                            xs={12}
                                                            sm={4}
                                                          >
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
                                                          <Grid
                                                            item
                                                            xs={12}
                                                            sm={4}
                                                          >
                                                            {" "}
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
                                                        </Grid>
                                                      </Box>{" "}
                                                      <IconButton
                                                        color="error"
                                                        onClick={() => {
                                                          values.data.location[
                                                            index
                                                          ].address.length >
                                                            1 &&
                                                            remove(subIndex);
                                                        }}
                                                      >
                                                        <Backspace />
                                                      </IconButton>
                                                    </Stack>
                                                  )
                                                )}
                                            </Stack>
                                          </Fragment>
                                        )}
                                      </FieldArray>
                                    </Paper>
                                  </Grid>
                                ))}
                            </Grid>
                          </Box>
                        )}
                      </FieldArray>
                      <FieldArray name="data.paper">
                        {({ push, remove }) => (
                          <Box>
                            <Stack
                              direction="row"
                              spacing={2}
                              alignItems="center"
                              sx={{ mb: 2 }}
                            >
                              <Typography variant="h5" sx={{ fontWeight: 600 }}>
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
                            </Stack>
                            <Grid container>
                              {values.data.paper &&
                                values.data.paper.map((val, index) => (
                                  <Grid
                                    item
                                    xs={12}
                                    sm={6}
                                    md={4}
                                    key={index + val.name}
                                  >
                                    <Stack
                                      direction="row"
                                      alignItems="center"
                                      spacing={2}
                                      sx={{ mb: 2 }}
                                    >
                                      <Typography varaint="subtitle1">
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
                                    </Stack>
                                  </Grid>
                                ))}
                            </Grid>
                          </Box>
                        )}
                      </FieldArray>
                      <Divider />
                      <Box sx={{ width: 1 }}>
                        <Stack direction="row" spacing={2} alignItems="center">
                          <Typography variant="h5" sx={{ fontWeight: 600 }}>
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
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          [theme.breakpoints.up("md")]: {
                            flexDirection: "column-reverse",
                          },
                        }}
                      >
                        <Grid container sx={{ mt: 2 }}>
                          {files &&
                            files.map((file, index) => (
                              <Grid
                                item
                                xs={12}
                                sm={6}
                                md={4}
                                key={index + file.name}
                                sx={{ p: 2 }}
                              >
                                <Stack alignItems="center">
                                  <Box
                                    component="img"
                                    key={file.name}
                                    src={file.preview}
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
                                    sx={{
                                      textTransform: "none",
                                      border: "none",
                                    }}
                                    onClick={() =>
                                      handleOnClickDeleteImage(index)
                                    }
                                  >
                                    Delete
                                  </Button>
                                </Stack>
                              </Grid>
                            ))}
                        </Grid>
                        <Box {...getRootProps({ className: "dropzone" })}>
                          <Box className="inner-dropzone">
                            <input {...getInputProps()} />
                            <Box
                              sx={{
                                width: 1,
                                textAlign: "center",
                                pb: 8,
                                pt: 8,
                                bgcolor:
                                  files.length != 0
                                    ? "rgba(22, 28, 36, .50)"
                                    : "none",
                              }}
                            >
                              <AddAPhoto />
                              <Typography
                                style={{
                                  backgroundColor: "transparent",
                                }}
                                className={`${
                                  files != 0 && classes.placeholderLabel
                                }`}
                                variant="body2"
                              >
                                Upload Photo
                              </Typography>
                            </Box>
                          </Box>
                        </Box>
                      </Box>
                      <Divider />
                      <Stack direction="row-reverse">
                        <Button
                          type="submit"
                          variant="contained"
                          color="secondary"
                          sx={{ border: "none", minWidth: "120px" }}
                        >
                          Submit
                        </Button>
                      </Stack>
                    </Stack>
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
