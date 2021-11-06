import {
  Container,
  Grid,
  MenuItem,
  Paper,
  TextField,
  Typography,
  Button,
  FormControl,
  Select,
  InputLabel,
  Divider,
  Link,
  IconButton,
} from "@mui/material";
import { green } from "@mui/material/colors";
import { Add, Delete, Remove } from "@mui/icons-material";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getAllFamily, postNewFamily } from "../../../actions/family";
import { getAllGenus } from "../../../actions/genus";
import { getAllSpecies } from "../../../actions/species";
import MapView from "../shared/MapView";
import { ThemeProvider, StyledEngineProvider, createTheme } from "@mui/material/styles";

import makeStyles from '@mui/styles/makeStyles';

const theme = createTheme();

const useStyles = makeStyles((theme) => ({
  divider: {
    margin: theme.spacing(10, 10, 10, 10),
  },
  submit: {
    color: theme.palette.getContrastText(green[500]),
    backgroundColor: green[500],
    "&:hover": {
      backgroundColor: green[700],
    },
  },
}));

let listYear = [];

const FormInsert = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const formRef = useRef();
  const { result: allFamily } = useSelector((state) => state.family);
  const { result: allGenus } = useSelector((state) => state.genus);
  const { result: allSpecies } = useSelector((state) => state.species);
  const [familyInsert, setFamilyInsert] = useState(false);
  const [genusInsert, setGenusInsert] = useState(false);
  const [speciesInsert, setSpeciesInsert] = useState(false);
  // const { result: allFamily } = useSelector((state) => state.family);

  const [detail, setDetail] = useState({
    family_id: null,
    genus_id: null,
    species_id: null,
    author: "",
    publish_year: listYear[0],
    country: "Thailand",
    country_other: "",
    altitude: "",
    method: "",
    habtat: "",
    microhabtat: "",
    designate: "",
  });
  const [location, setLocation] = useState({
    de_id: null,
    province: "",
    district: "",
    locality: "",
  });
  const [position, setPosition] = useState([
    {
      lo_id: null,
      name: "",
      lat: null,
      long: null,
    },
  ]);

  const [paper, setPaper] = useState({
    de_id: null,
    name: "",
  });

  const [file, setFile] = useState(null);

  useEffect(() => {
    dispatch(getAllFamily());
    dispatch(getAllGenus());
    dispatch(getAllSpecies());

    const addYear = () => {
      const date = new Date();
      let year = date.getFullYear();
      for (let i = year; i > year - 100; i--) {
        listYear.push(i);
      }
      console.log(listYear);
    };

    addYear();
  }, []);

  const handleOnChangeDetail = (e) => {
    setDetail({ ...detail, [e.target.name]: e.target.value });
  };

  const handleOnChangePosition = (e, index) => {
    let newPosition = position;
    newPosition[index][e.target.name] = e.target.value;
    setPosition([...newPosition]);
  };

  const handleOnClickPosition = (action, index) => {
    if (action == "add") {
      let newPosition = position;
      newPosition.push({
        lo_id: null,
        name: "",
        lat: null,
        long: null,
      });
      setPosition([...newPosition]);
    } else if (action == "delete") {
      let newPosition = position;
      newPosition.splice(index, 1);
      setPosition([...newPosition]);
    } else if (action == "pop") {
      let newPosition = position;
      newPosition.pop();
      setPosition([...newPosition]);
    }
  };

  const handleOnChangeImage = (e) => {
    const image = e.target.value;
    console.log(image);
    setFile(image);
  };

  // const handleOnClickSubmit = async () => {
  //   // check family
  //   if (!allFamily.find((item) => detail.family_id === item.id)) {
  //     dispatch(postNewFamily(detail.family_id));
  //   }
  //   console.log(`complet`);
  // };

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <div className={`page`}>
          <Container maxWidth="lg">
            <Paper style={{ padding: "20px", paddingBottom: "40px" }}>
              <Grid container spacing={3}>
                <Grid item md={12}>
                  <Typography variant="h5" component="div">
                    Spider of Thailand
                  </Typography>
                </Grid>
                <Grid item md={6}>
                  <Grid container spacing={2}>
                    <Grid item md={10}>
                      <Typography variant="subtitle1">Author</Typography>
                      <TextField
                        variant="outlined"
                        size="small"
                        fullWidth
                        placeholder="Author"
                        value={detail.author}
                        onChange={(e) =>
                          setDetail({
                            ...detail,
                            author: e.target.value,
                          })
                        }
                      />
                    </Grid>
                    <Grid item md={2}>
                      <FormControl variant="outlined" fullWidth size="small">
                        <Typography variant="subtitle1">Year</Typography>
                        <Select
                          placeholder="Publish year"
                          name="publish_year"
                          value={detail.publish_year || ""}
                          onChange={(e) => handleOnChangeDetail(e)}
                        >
                          {listYear &&
                            listYear.map((val, index) => (
                              <MenuItem key={index} value={val}>
                                {val}
                              </MenuItem>
                            ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item md={5}>
                      <Typography variant="subtitle1">Country</Typography>
                      <TextField
                        variant="outlined"
                        size="small"
                        fullWidth
                        placeholder="Country"
                        value={detail.country}
                        disabled={true}
                      />
                    </Grid>
                    <Grid item md={7}>
                      <Typography variant="subtitle1">Other country</Typography>
                      <TextField
                        variant="outlined"
                        size="small"
                        fullWidth
                        placeholder="Other country"
                        value={detail.country_other}
                        onChange={(e) =>
                          setDetail({
                            ...detail,

                            country_other: e.target.value,
                          })
                        }
                      />
                    </Grid>
                    <Grid item md={4}>
                      <Typography variant="subtitle1">Province</Typography>
                      <TextField
                        variant="outlined"
                        size="small"
                        fullWidth
                        placeholder="Province"
                        value={location.province}
                        onChange={(e) =>
                          setLocation({
                            ...location,
                            province: e.target.value,
                          })
                        }
                      />
                    </Grid>
                    <Grid item md={4}>
                      <Typography variant="subtitle1">District</Typography>
                      <TextField
                        variant="outlined"
                        size="small"
                        fullWidth
                        placeholder="District"
                        value={location.district}
                        onChange={(e) =>
                          setLocation({
                            ...location,

                            district: e.target.value,
                          })
                        }
                      />
                    </Grid>
                    <Grid item md={4}>
                      <Typography variant="subtitle1">Locality</Typography>
                      <TextField
                        variant="outlined"
                        size="small"
                        fullWidth
                        placeholder="Locality"
                        value={location.locality}
                        onChange={(e) =>
                          setLocation({
                            ...location,

                            locality: e.target.value,
                          })
                        }
                      />
                    </Grid>
                  </Grid>
                  {/* <Grid item md={12}>
                  <Divider
                    style={{ marginTop: "30px", marginBottom: "15px" }}
                    spacing={classes.divider}
                  />
                </Grid> */}
                  <Grid item md={12} style={{ marginTop: "50px" }}>
                    <Typography variant="h5" gutterBottom>
                      Family action
                    </Typography>
                    <Divider
                      style={{ marginBottom: "15px" }}
                      spacing={classes.divider}
                    />
                  </Grid>
                  <Grid container spacing={2}>
                    <Grid item md={4}>
                      <Typography variant="subtitle1">Family</Typography>
                      {!familyInsert ? (
                        <FormControl size="small" fullWidth variant="outlined">
                          <Select
                            placeholder="Family"
                            name="family_id"
                            value={detail.family_id || ""}
                            onChange={(e) => handleOnChangeDetail(e)}
                          >
                            {allFamily &&
                              allFamily.map((val, index) => (
                                <MenuItem key={val.id + index} value={val.id}>
                                  {val.name}
                                </MenuItem>
                              ))}
                          </Select>
                        </FormControl>
                      ) : (
                        <TextField
                          name="family_id"
                          value={
                            typeof detail.family_id == "number"
                              ? ""
                              : detail.family_id
                          }
                          fullWidth
                          size="small"
                          placeholder="New family"
                          variant="outlined"
                          onChange={(e) => handleOnChangeDetail(e)}
                        />
                      )}
                      <Link
                        style={{ fontSize: "10px", cursor: "pointer" }}
                        onClick={() => setFamilyInsert(!familyInsert)}
                      >
                        {familyInsert ? "list data" : "add data"}
                      </Link>
                    </Grid>
                    <Grid item md={4}>
                      <Typography variant="subtitle1">Genus</Typography>
                      {!genusInsert ? (
                        <FormControl size="small" fullWidth variant="outlined">
                          <Select
                            placeholder="Genus"
                            name="genus_id"
                            value={detail.genus_id || ""}
                            onChange={(e) => handleOnChangeDetail(e)}
                          >
                            {allGenus &&
                              allGenus
                                .filter(
                                  (item) =>
                                    (detail.family_id != null) &
                                      (typeof detail.family_id == "number") &&
                                    item.family_id === detail.family_id
                                )
                                .map((val, index) => (
                                  <MenuItem key={val.id + index} value={val.id}>
                                    {val.name}
                                  </MenuItem>
                                ))}
                          </Select>
                        </FormControl>
                      ) : (
                        <TextField
                          name="genus_id"
                          value={
                            typeof detail.genus_id == "number"
                              ? ""
                              : detail.genus_id
                          }
                          fullWidth
                          size="small"
                          placeholder="New Genus"
                          variant="outlined"
                          onChange={(e) => handleOnChangeDetail(e)}
                        />
                      )}
                      <Link
                        style={{ fontSize: "10px", cursor: "pointer" }}
                        onClick={() => setGenusInsert(!genusInsert)}
                      >
                        {genusInsert ? "list data" : "add data"}
                      </Link>
                    </Grid>
                    <Grid item md={4}>
                      <Typography variant="subtitle1">Species</Typography>
                      {!speciesInsert ? (
                        <FormControl size="small" fullWidth variant="outlined">
                          <Select
                            placeholder="Species"
                            name="species_id"
                            value={detail.species_id || ""}
                            onChange={(e) => handleOnChangeDetail(e)}
                          >
                            {allSpecies &&
                              allSpecies
                                .filter(
                                  (item) =>
                                    (detail.genus_id != null) &
                                      (typeof detail.genus_id == "number") &&
                                    item.genus_id === detail.genus_id
                                )
                                .map((val, index) => (
                                  <MenuItem key={val.id + index} value={val.id}>
                                    {val.name}
                                  </MenuItem>
                                ))}
                          </Select>
                        </FormControl>
                      ) : (
                        <TextField
                          name="species_id"
                          value={
                            typeof detail.species_id == "number"
                              ? ""
                              : detail.species_id
                          }
                          fullWidth
                          size="small"
                          placeholder="New Species"
                          variant="outlined"
                          onChange={(e) => handleOnChangeDetail(e)}
                        />
                      )}
                      <Link
                        style={{ fontSize: "10px", cursor: "pointer" }}
                        onClick={() => setSpeciesInsert(!speciesInsert)}
                      >
                        {speciesInsert ? "list data" : "add data"}
                      </Link>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item md={6}>
                  <MapView listPosition={null} height="50vh" zoom={5} />
                </Grid>
                <Grid item md={12}>
                  <Grid container spacing={2}>
                    <Grid item md={1}>
                      <Typography variant="subtitle1">Location </Typography>
                    </Grid>
                    <Grid item md={11}>
                      <div style={{ display: "flex" }}>
                        <IconButton
                          aria-label="add-location"
                          component="span"
                          size="small"
                          onClick={() => handleOnClickPosition("add")}
                        >
                          <Add />
                        </IconButton>
                        <IconButton
                          aria-label="remove-location"
                          component="span"
                          size="small"
                          onClick={() => handleOnClickPosition("pop")}
                        >
                          <Remove />
                        </IconButton>
                      </div>
                    </Grid>
                    {position &&
                      position.map((val, index) => (
                        <Grid item md={12} key={index}>
                          <Grid container spacing={2}>
                            <Grid item md={4}>
                              <Typography variant="subtitle1">
                                Location {index + 1}
                              </Typography>
                              <TextField
                                size="small"
                                fullWidth
                                variant="outlined"
                                name="name"
                                value={position[index].name || ""}
                                placeholder="Location"
                                onChange={(e) => handleOnChangePosition(e, index)}
                              />
                            </Grid>
                            <Grid item md={3}>
                              <Typography variant="subtitle1">
                                Latitude
                              </Typography>
                              <TextField
                                size="small"
                                fullWidth
                                variant="outlined"
                                name="lat"
                                value={position[index].lat || ""}
                                placeholder="Latitude"
                                onChange={(e) => handleOnChangePosition(e, index)}
                              />
                            </Grid>
                            <Grid item md={3}>
                              <Typography variant="subtitle1">
                                Longitude
                              </Typography>
                              <TextField
                                size="small"
                                fullWidth
                                variant="outlined"
                                name="long"
                                value={position[index].long || ""}
                                placeholder="Longitude"
                                onChange={(e) => handleOnChangePosition(e, index)}
                              />
                            </Grid>
                            <Grid item md={1}>
                              <Typography>
                                <br />
                              </Typography>
                              <IconButton
                                aria-label="delete"
                                component="span"
                                size="small"
                                onClick={() =>
                                  handleOnClickPosition("delete", index)
                                }
                              >
                                <Delete />
                              </IconButton>
                            </Grid>
                          </Grid>
                        </Grid>
                      ))}
                  </Grid>
                </Grid>
                <Grid item md={12}>
                  <Typography variant="subtitle1">Paper Ref</Typography>
                  <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Paper Ref"
                    style={{ maxWidth: "500px" }}
                    size="small"
                    value={paper.name || ""}
                    onChange={(e) => setPaper({ ...paper, name: e.target.value })}
                  />
                </Grid>
                {/* add image  */}
                <Grid item md={12}>
                  <Button
                    type="submit"
                    size="small"
                    variant="outlined"
                    className={classes.submit}
                    // onClick={() => handleOnClickSubmit()}
                  >
                    submit
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </Container>
        </div>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default FormInsert;
