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
  Stack,
} from "@mui/material";
import {
  Close,
  WindowSharp,
  AddAPhoto,
  Backspace,
  Delete,
  DeleteOutline,
  SettingsBackupRestore,
} from "@mui/icons-material";
import MapView from "../shared/MapView";
import { useDispatch, useSelector } from "react-redux";
import "./index.css";
import { useDropzone } from "react-dropzone";

import { getAllFamily } from "../../../actions/family";
import { getAllGenus } from "../../../actions/genus";
import { getAllSpecies } from "../../../actions/species";
import { alpha, Box } from "@mui/system";

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
import {
  postAddressFn,
  postImageFn,
  postLocationFn,
  postPaperFn,
  updateAddressFn,
  updateDetailFn,
  updateDetailTypeFn,
  updateImage,
  updateLocationFn,
  updatePaperFn,
} from "./insertFn";
import themplates from "../shared/theme";

const theme = createTheme(themplates);

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
        ? await detailService.getDetailAdmin(detailId)
        : false;

      if (tmpDetail) {
        const image_ = await imageService.getImageAdmin(detailId);
        tmpDetail.image = image_;

        const family_ = await familyService.getFamily(tmpDetail.family_id);
        tmpDetail.family = family_[0].name;
        const genus_ = await genusService.getGenus(tmpDetail.genus_id);
        tmpDetail.genus = genus_[0].name;
        const species_ = await speciesService.getSpecies(tmpDetail.species_id);
        tmpDetail.species = species_[0].name;

        const location_ = await locationService.getLocationAdmin(detailId);
        for (let i = 0; i < location_.length; i++) {
          location_[i].address = await addressService.getAddressAdmin(
            location_[i].id
          );
        }
        tmpDetail.location = location_;

        const paper_ = await paperService.getPaperAdmin(detailId);
        tmpDetail.paper = paper_;

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
    let res = false;
    res = await updateDetailTypeFn(type_);
    if (res == type_.id) {
      setType(true);
    }
  };

  const handleGeneralSubmit = (values) => {
    const general_ = values;
    general_.id = detail.id;
    general_.active = 1;
    setGeneral(general_);
    let res = false;
    res = updateDetailFn(general_);
    if (res == general_.id) {
      setGeneral(true);
    }
  };

  const handleLocationSubmit = async (values) => {
    let location_ = values.location;
    let checkError = false;

    for (let i = 0; i < location_.length; i++) {
      let resLocation = false;
      const onLocation = { ...location_[i] };
      delete onLocation.address;

      if (location_[i].id == -1) {
        resLocation = await postLocationFn(onLocation, detail.id);
      } else {
        resLocation = await updateLocationFn(onLocation, detail.id);
      }
      if (resLocation) {
        checkError = true;
      } else {
        checkError = false;
      }
      for (let j = 0; j < location_[i].address.length; j++) {
        const onAddress = { ...location_[i].address[j] };
        let resAddress = false;
        if (onAddress.id == -1) {
          resAddress = await postAddressFn(onAddress, resLocation);
        } else {
          resAddress = await updateAddressFn(onAddress);
        }
        if (resAddress) {
          checkError = true;
        } else {
          checkError = false;
        }
      }
    }

    if (checkError) {
      setLocation(true);
    }
  };

  const handlePaperSubmit = async (values) => {
    let paper_ = values.paper;
    let checkError = false;

    for (let i = 0; i < paper_.length; i++) {
      const onPaper = { ...paper_[i] };
      let res = false;
      if (onPaper.id == -1) {
        res = await postPaperFn(onPaper, detail.id);
      } else {
        res = await updatePaperFn(onPaper);
      }
      if (res) {
        checkError = true;
      } else {
        checkError = false;
      }
    }
    if (checkError) {
      setPaper(paper_);
    }
  };

  const handleImageSubmit = (values) => {
    let image_ = values.image;

    let checkError = true;
    for (let i = 0; i < image_.length; i++) {
      const onImage = { ...image_[i] };
      let res = false;
      if (onImage.id == -1) {
        const formData = new FormData();
        formData.append("image", onImage.name);
        formData.append("detail_id", detail.id);
        res = postImageFn(formData);
      } else {
        if (onImage.active == 0) {
          let detail_ = detail;
          const index = detail_.image
            .map((e) => {
              return e.id;
            })
            .indexOf(onImage.id);
          detail_.image.splice(index, 1);
          setDetail(detail_);
        }
        res = updateImage(onImage);
      }

      if (res) {
        checkError = true;
      } else {
        checkError = false;
      }
    }

    if (checkError) {
      setImage(true);
    }
  };

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
                  Edit ID{" "}
                  <Typography
                    component="span"
                    sx={{ fontWeight: 600 }}
                    variant="h5"
                    color="secondary"
                  >
                    #{detail && detail.id}
                  </Typography>
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
                      <Button
                        type="submit"
                        variant="contained"
                        size="small"
                        color="secondary"
                        sx={{ border: "none" }}
                      >
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
                      <Button
                        type="submit"
                        variant="contained"
                        size="small"
                        color="secondary"
                        sx={{ border: "none" }}
                      >
                        save
                      </Button>
                    </Form>
                  )}
                </Formik>
                <br />
                <Divider />
                <br />
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
                              <Grid item xs={12}>
                                <Stack
                                  sx={{
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    [theme.breakpoints.up("sm")]: {
                                      flexDirection: "column",
                                      justifyContent: "flex-start",
                                      alignItems: "flex-start",
                                    },
                                  }}
                                >
                                  <Typography
                                    variant="h6"
                                    component="div"
                                    sx={{ fontWeight: 600 }}
                                  >
                                    Location
                                  </Typography>
                                  <Button
                                    variant="contained"
                                    size="small"
                                    color="info"
                                    sx={{ border: "none", maxWidth: "120px" }}
                                    onClick={() =>
                                      push({
                                        id: -1,
                                        detail_id: values.location[0].detail_id,
                                        province: "",
                                        district: "",
                                        locality: "",
                                        active: 1,
                                        address: [
                                          {
                                            id: -1,
                                            location_id: "newLocation",
                                            name: "",
                                            latitude: "",
                                            longitude: "",
                                            active: 1,
                                          },
                                        ],
                                      })
                                    }
                                  >
                                    Add location
                                  </Button>
                                </Stack>
                              </Grid>
                              {values.location &&
                                values.location.map((val, index) => (
                                  <Grid item xs={12} key={index}>
                                    <Paper
                                      sx={{
                                        padding: "10px",
                                        paddingBottom: "15px",
                                        color:
                                          values.location[index].active == 0
                                            ? "red"
                                            : "none",
                                      }}
                                    >
                                      <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                          <Stack
                                            direction="row"
                                            spacing={2}
                                            alignItems="center"
                                          >
                                            <Typography varaint="subtitle1">
                                              Location {index + 1}.
                                            </Typography>
                                            {val.active == 1 ? (
                                              <IconButton
                                                color="error"
                                                sx={{ marginLeft: "1rem" }}
                                                onClick={() => {
                                                  values.location.length > 1 &&
                                                  val.id == -1
                                                    ? remove(index)
                                                    : setFieldValue(
                                                        `location[${index}].active`,
                                                        0
                                                      );
                                                }}
                                              >
                                                <DeleteOutline />
                                              </IconButton>
                                            ) : (
                                              <IconButton
                                                color="success"
                                                sx={{ marginLeft: "1rem" }}
                                                onClick={() => {
                                                  values.location.length > 1 &&
                                                  val.id == -1
                                                    ? remove(index)
                                                    : setFieldValue(
                                                        `location[${index}].active`,
                                                        1
                                                      );
                                                }}
                                              >
                                                <SettingsBackupRestore />
                                              </IconButton>
                                            )}
                                          </Stack>
                                        </Grid>
                                        <Grid
                                          item
                                          xs={12}
                                          sm={6}
                                          md={4}
                                          lg={3}
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
                                          xs={12}
                                          sm={6}
                                          md={4}
                                          lg={3}
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
                                          xs={12}
                                          sm={6}
                                          md={4}
                                          lg={3}
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
                                          </Box>
                                        </Grid>
                                        <Grid item xs={12}>
                                          <FieldArray
                                            name={`location[${index}].address`}
                                          >
                                            {({ push, remove }) => (
                                              <Grid container spacing={2}>
                                                <Grid item xs={12}>
                                                  <Stack
                                                    sx={{
                                                      flexDirection: "row",
                                                      justifyContent:
                                                        "space-between",
                                                      alignItems: "center",
                                                      [theme.breakpoints.up(
                                                        "sm"
                                                      )]: {
                                                        flexDirection: "column",
                                                        justifyContent:
                                                          "flex-start",
                                                        alignItems:
                                                          "flex-start",
                                                      },
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
                                                        border: "none",
                                                        maxWidth: "120px",
                                                      }}
                                                      variant="contained"
                                                      size="small"
                                                      color="info"
                                                      onClick={() => {
                                                        push({
                                                          id: -1,
                                                          name: "",
                                                          latitude: "",
                                                          longitude: "",
                                                          active: 1,
                                                        });
                                                      }}
                                                    >
                                                      Add
                                                    </Button>
                                                  </Stack>
                                                </Grid>
                                                {values.location[index]
                                                  .address &&
                                                  values.location[
                                                    index
                                                  ].address.map(
                                                    (val2, subIndex) => (
                                                      <Grid
                                                        item
                                                        xs={12}
                                                        key={subIndex}
                                                      >
                                                        <Stack
                                                          direction="row"
                                                          alignItems="center"
                                                          spacing={2}
                                                          sx={{}}
                                                        >
                                                          <Typography varaint="subtitle1">
                                                            {subIndex + 1}.
                                                          </Typography>
                                                          <Box
                                                            sx={{
                                                              flexGrow: 1,
                                                              [theme.breakpoints.down(
                                                                "sm"
                                                              )]: {
                                                                border: `1px solid ${theme.palette.grey[500]}`,
                                                                borderRadius:
                                                                  "4px",
                                                                p: 1,
                                                              },
                                                            }}
                                                          >
                                                            <Grid
                                                              container
                                                              spacing={1}
                                                              sx={{}}
                                                            >
                                                              <Grid
                                                                item
                                                                xs={12}
                                                                sm={4}
                                                              >
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
                                                              <Grid
                                                                item
                                                                xs={12}
                                                                sm={4}
                                                              >
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
                                                              <Grid
                                                                item
                                                                xs={12}
                                                                sm={4}
                                                              >
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
                                                            </Grid>
                                                          </Box>
                                                          {val2.active == 1 ? (
                                                            <IconButton
                                                              color="error"
                                                              onClick={() => {
                                                                values.location[
                                                                  index
                                                                ].address
                                                                  .length > 1 &&
                                                                val2.id == -1
                                                                  ? remove(
                                                                      subIndex
                                                                    )
                                                                  : setFieldValue(
                                                                      `location[${index}].address[${subIndex}].active`,
                                                                      0
                                                                    );
                                                              }}
                                                            >
                                                              <Backspace />
                                                            </IconButton>
                                                          ) : (
                                                            <IconButton
                                                              color="success"
                                                              onClick={() => {
                                                                setFieldValue(
                                                                  `location[${index}].address[${subIndex}].active`,
                                                                  1
                                                                );
                                                              }}
                                                            >
                                                              <SettingsBackupRestore />
                                                            </IconButton>
                                                          )}
                                                        </Stack>
                                                        {/* <Grid
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
                                                            {val2.active ==
                                                            1 ? (
                                                              <IconButton
                                                                color="error"
                                                                onClick={() => {
                                                                  values
                                                                    .location[
                                                                    index
                                                                  ].address
                                                                    .length >
                                                                    1 &&
                                                                  val2.id == -1
                                                                    ? remove(
                                                                        subIndex
                                                                      )
                                                                    : setFieldValue(
                                                                        `location[${index}].address[${subIndex}].active`,
                                                                        0
                                                                      );
                                                                }}
                                                              >
                                                                <Backspace />
                                                              </IconButton>
                                                            ) : (
                                                              <IconButton
                                                                color="success"
                                                                onClick={() => {
                                                                  setFieldValue(
                                                                    `location[${index}].address[${subIndex}].active`,
                                                                    1
                                                                  );
                                                                }}
                                                              >
                                                                <SettingsBackupRestore />
                                                              </IconButton>
                                                            )}
                                                          </Grid>
                                                        </Grid> */}
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
                      <Button
                        type="submit"
                        variant="contained"
                        size="small"
                        color="secondary"
                        sx={{ border: "none" }}
                      >
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
                                  border: "none",
                                }}
                                color="info"
                                variant="contained"
                                size="small"
                                onClick={() =>
                                  push({
                                    id: -1,
                                    detail_id: detail.id,
                                    name: "",
                                    active: 1,
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
                                  xs={12}
                                  sm={6}
                                  md={4}
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
                                  {val.active == 1 ? (
                                    <IconButton
                                      color="error"
                                      onClick={() => {
                                        values.paper.length > 1 && val.id == -1
                                          ? remove(index)
                                          : setFieldValue(
                                              `paper[${index}].active`,
                                              0
                                            );
                                      }}
                                    >
                                      <Backspace />
                                    </IconButton>
                                  ) : (
                                    <IconButton
                                      color="success"
                                      onClick={() => {
                                        setFieldValue(
                                          `paper[${index}].active`,
                                          1
                                        );
                                      }}
                                    >
                                      <SettingsBackupRestore />
                                    </IconButton>
                                  )}
                                </Grid>
                              ))}
                          </Grid>
                        )}
                      </FieldArray>
                      <br />
                      <Button
                        type="submit"
                        variant="contained"
                        size="small"
                        color="secondary"
                        sx={{ border: "none" }}
                      >
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
                                // reloading same files is not possible in onChange event
                                onChange={(e) => {
                                  const tmp = e.currentTarget.files;
                                  for (let i = 0; i < tmp.length; i++) {
                                    let reader = new FileReader();
                                    const file = e.currentTarget.files[i];
                                    console.log("size", file.size);
                                    if (file.size <= 1256000) {
                                      reader.onloadend = () => {
                                        push({
                                          id: -1,
                                          detail_id: detail.id,
                                          name: file,
                                          path: reader.result,
                                          active: 1,
                                        });
                                      };
                                      reader.readAsDataURL(file);
                                    } else {
                                      alert(
                                        "This file is larger than the specified size."
                                      );
                                    }
                                  }
                                  // reloading same files need to be set event value = null
                                  e.target.value = null;
                                }}
                              />
                              <Stack
                                direction="row"
                                spacing={2}
                                alignItems="center"
                              >
                                <Button
                                  size="small"
                                  variant="contained"
                                  sx={{ textTransform: "none", border: "none" }}
                                  component="span"
                                  color="info"
                                >
                                  Add image
                                </Button>
                                <Typography
                                  variant="body2"
                                  sx={{}}
                                  color="text.secondary"
                                >
                                  Up to 1 MB/file
                                </Typography>
                              </Stack>
                            </label>
                            <Box>
                              <br />
                            </Box>
                            <Grid container spacing={4}>
                              {values.image.map((val, index) => (
                                <Grid item key={index}>
                                  {val.active == 1 ? (
                                    <Box sx={{ textAlign: "center" }}>
                                      <Box
                                        sx={{
                                          position: "relative",
                                          width: "100%",
                                          overflow: "hidden",
                                          margin: "5px",
                                          padding: "5px",
                                          border: "2px solid #b8b8b8",
                                        }}
                                      >
                                        <Box
                                          component="img"
                                          src={
                                            val.id != -1
                                              ? `/${val.path}`
                                              : val.path
                                          }
                                          // width="100%"
                                          sx={{
                                            height: "245px",
                                            width: "100%",
                                            display: "block",
                                          }}
                                        />
                                      </Box>
                                      <Button
                                        variant="contained"
                                        size="small"
                                        sx={{
                                          textTransform: "none",
                                          border: "none",
                                        }}
                                        color="error"
                                        onClick={() => {
                                          values.image.length > 0 &&
                                          val.id == -1
                                            ? remove(index)
                                            : setFieldValue(
                                                `image[${index}].active`,
                                                0
                                              );
                                        }}
                                      >
                                        Delete
                                      </Button>
                                    </Box>
                                  ) : (
                                    <Box
                                      sx={{
                                        textAlign: "center",
                                        // display: "block",
                                        // alignItems: "center",
                                      }}
                                    >
                                      <Box
                                        sx={{
                                          position: "relative",
                                          width: "100%",
                                          overflow: "hidden",
                                          margin: "5px",
                                          padding: "5px",
                                          border: "2px solid red",
                                        }}
                                      >
                                        <Box
                                          component={"img"}
                                          src={
                                            val.id != -1
                                              ? `/${val.path}`
                                              : val.path
                                          }
                                          // width="100%"
                                          sx={{
                                            height: "245px",
                                            width: "100%",
                                            display: "block",
                                          }}
                                        />
                                        <Box
                                          sx={{
                                            height: "245px",
                                            bgcolor: alpha(
                                              theme.palette.error.dark,
                                              0.5
                                            ),
                                            // bgcolor: "rgba(205, 92, 92,0.5)",
                                            position: "absolute",
                                            bottom: 5,
                                            right: 5,
                                            top: 5,
                                            left: 5,
                                            width: "calc(100% - 10px)",
                                            display: "block",
                                          }}
                                        />
                                      </Box>
                                      <Button
                                        variant="contained"
                                        size="small"
                                        sx={{
                                          textTransform: "none",
                                          border: "none",
                                        }}
                                        color="success"
                                        onClick={() => {
                                          setFieldValue(
                                            `image[${index}].active`,
                                            1
                                          );
                                        }}
                                      >
                                        Recall
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
                        <Button
                          variant="contained"
                          type="submit"
                          size="small"
                          color="secondary"
                          sx={{ border: "none" }}
                        >
                          Save
                        </Button>
                      </Box>
                      <Box style={{ display: "flex" }}>
                        {/* <pre>{JSON.stringify({ values, errors }, null, 4)}</pre> */}
                      </Box>
                    </Form>
                  )}
                </Formik>
                <br />
                <Divider />
                <br />
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
