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
} from "@mui/material";
import {
  ThemeProvider,
  StyledEngineProvider,
  createTheme,
} from "@mui/material/styles";
import makeStyles from "@mui/styles/makeStyles";
import { Field, Formik, Form, FieldArray } from "formik";
import React, { useState, useEffect, Fragment, useCallback } from "react";
import MapView from "../shared/MapView";
import { useDispatch } from "react-redux";
import "./index.css";

import { postFamily, getAllFamily } from "../../../actions/family";
import { getAllGenus, postGenus } from "../../../actions/genus";
import { getAllSpecies } from "../../../actions/species";
import { useSelector } from "react-redux";
import { Select, SimpleFileUpload, Switch, TextField } from "formik-mui";
import { Box, margin } from "@mui/system";
import {
  AddAPhoto,
  Backspace,
  Delete,
  DeleteOutline,
} from "@material-ui/icons";
import { useDropzone } from "react-dropzone";
import familyService from "../../../services/family.service";
import genusService from "../../../services/genus.service";
import speciesService from "../../../services/species.service";
import detailService from "../../../services/detail.service";
import locationService from "../../../services/location.service";
import addressService from "../../../services/address.service";
import paperService from "../../../services/paper.service";
import imageService from "../../../services/image.service";

const theme = createTheme();

const useStyles = makeStyles(() => ({
  paper: {
    paddingf: "50px",
  },
  divider: {
    marginTop: "10px",
  },
  placeholder: {
    width: "100%",
    height: "100%",
    display: "flex",
    position: "absolute",
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
}));

const InsertForm = () => {
  const [years, setYears] = useState([]);
  const classes = useStyles();
  const dispatch = useDispatch();
  const { result: dbFamily } = useSelector((state) => state.family);
  const { result: dbGenus } = useSelector((state) => state.genus);
  const { result: dbSpecies } = useSelector((state) => state.species);
  const [status, setStatus] = useState({
    showFamily: true,
    showGenus: true,
    showSpecies: true,
  });
  const [data, setData] = useState({
    family: undefined,
    genus: undefined,
    species: undefined,
    author: undefined,
    publish_year: undefined,
    country: "Thailand",
    country_other: undefined,
    altitude: undefined,
    method: undefined,
    habtat: undefined,
    microhabtat: undefined,
    designate: undefined,
    location: [
      {
        province: undefined,
        district: undefined,
        locality: undefined,
        position: [
          {
            name: undefined,
            lat: undefined,
            long: undefined,
          },
        ],
      },
    ],
    paper: [
      {
        name: undefined,
      },
    ],
  });

  const [files, setFiles] = useState([]);
  const [uploads, setUploads] = useState();

  useEffect(() => {
    dispatch(getAllFamily());
    dispatch(getAllGenus());
    dispatch(getAllSpecies());

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
  }, []);

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

  // set react Drop zone
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: "image/jpeg, image/png",
    onDrop,
    maxFiles: 20,
  });

  // preview image input
  const thumbs = files.map((file) => (
    <img key={file.name} src={file.preview} className={classes.uploadImage} />
  ));

  // function post data
  const postFamilyFn = (name) => {
    return familyService.postFamily(name).then((res) => {
      return res.insertId;
    });
  };

  const postGenusFn = async (family_id, name) => {
    return genusService.postGenus({ family_id, name }).then((res) => {
      return res.insertId;
    });
  };

  const postSpeciesFn = async (genus_id, name) => {
    return speciesService.postSpecies({ genus_id, name }).then((res) => {
      return res.insertId;
    });
  };

  const postDetailFn = async (detail) => {
    return detailService.postDetail(detail).then((res) => {
      return res.insertId;
    });
  };

  const postLocationFn = async (location, detail_id) => {
    location["detail_id"] = detail_id;
    return locationService.postLocation(location).then((res) => {
      return res.insertId;
    });
  };

  const postAddressFn = async (address, locationId) => {
    address["location_id"] = locationId;
    address.lat = parseFloat(address.lat);
    address.long = parseFloat(address.long);
    return addressService.postAddress(address).then((res) => {
      return res.insertId;
    });
  };

  const postPaperFn = async (paper, detail_id) => {
    paper.detail_id = detail_id;
    console.log("check paper", paper);
    return paperService.postPaper(paper).then((res) => {
      return res.insertId;
    });
  };

  const postImageFn = async (files) => {
    return imageService.postImage(files).then((res) => {
      return res.insertId;
    });
  };

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
      habtat: data_.habtat,
      microhabtat: data_.microhabtat,
      designate: data_.designate,
    };

    const detail_id = await postDetailFn(detail_);

    const location = data_.location;

    console.log("location ", location);
    location.map(async (item) => {
      const position = item.position;
      delete item.position;
      const locationId = await postLocationFn(item, detail_id);
      position.map(async (item2) => {
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
  };

  // render form component
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <div className={`page`}>
          <Container maxWidth="lg">
            <Paper className={classes.paper}>
              <Formik
                initialValues={{ data, status }}
                onSubmit={(values, setSubmitting) => {
                  handleSubmit(values.data);
                }}
              >
                {({
                  values,
                  errors,
                  isSubmitting,
                  touched,
                  handleBlur,
                  setFieldValue,
                  setStatus,
                }) => (
                  <Form autoComplete="off">
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
                        <MapView
                          styles={{ borderRadius: "10px", height: "40vh" }}
                        />
                      </Grid>
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
                        <Typography variant="subtitle1">Habtat</Typography>
                        <Field
                          name="data.habtat"
                          component={TextField}
                          fullWidth
                          multiline
                          rows={2}
                          size="small"
                        ></Field>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography variant="subtitle1">Microhabtat</Typography>
                        <Field
                          name="data.microhabtat"
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
                      <Grid item xs={12}>
                        <FieldArray name="data.location">
                          {({ push, pop, remove }) => (
                            <Fragment>
                              <Grid container spacing={2}>
                                <Grid item xs={12} style={{ display: "flex" }}>
                                  <Button
                                    variant="outlined"
                                    size="small"
                                    color="success"
                                    onClick={() =>
                                      push({
                                        province: "",
                                        district: "",
                                        locality: "",
                                        position: [
                                          {
                                            name: "",
                                            lat: "",
                                            long: "",
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
                                            <Field
                                              name={`data.location[${index}].province`}
                                              component={TextField}
                                              size="small"
                                              fullWidth
                                            />
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
                                              name={`data.location[${index}].district`}
                                              component={TextField}
                                              size="small"
                                              fullWidth
                                            />
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
                                              name={`data.location[${index}].position`}
                                            >
                                              {({ push, remove }) => (
                                                <Grid container spacing={2}>
                                                  <Grid
                                                    item
                                                    xs={12}
                                                    style={{ display: "flex" }}
                                                  >
                                                    <Typography
                                                      variant="subtitle1"
                                                      gutterBottom
                                                    >
                                                      Position
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
                                                          lat: "",
                                                          long: "",
                                                        })
                                                      }
                                                    >
                                                      Add
                                                    </Button>
                                                  </Grid>
                                                  {values.data.location[index]
                                                    .position &&
                                                    values.data.location[
                                                      index
                                                    ].position.map(
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
                                                                name={`data.location[${index}].position[${subIndex}].name`}
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
                                                                name={`data.location[${index}].position[${subIndex}].lat`}
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
                                                                name={`data.location[${index}].position[${subIndex}].long`}
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
                                                                  ].position
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
                                      lat: "",
                                      long: "",
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

                      {/* main grid */}
                      <Grid item xs={12}>
                        <Divider style={{ marginTop: "1rem" }} />
                      </Grid>
                      <Grid item xs={12}>
                        <Button
                          type="submit"
                          variant="outlined"
                          color="primary"
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
