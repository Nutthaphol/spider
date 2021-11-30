import {
  Box,
  Card,
  Container,
  Divider,
  Grid,
  IconButton,
  Link,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  TextField,
  Autocomplete,
  Button,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import React, { useState, useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import MapView from "./shared/MapView";
import {
  ThemeProvider,
  StyledEngineProvider,
  createTheme,
} from "@mui/material/styles";

import "./index.css";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

import makeStyles from "@mui/styles/makeStyles";

import { ArrowBackIosNew, ArrowForwardIos, Search } from "@mui/icons-material";
import { getAllFamily } from "../../actions/family";
import { getAllGenus } from "../../actions/genus";
import { getAllProvinces } from "../../actions/province";
import { getAllDistrict } from "../../actions/district";
import { getAllDetail } from "../../actions/detail";
import { getAllLocation } from "../../actions/location";
import { getAllAddress } from "../../actions/address";
import { getAllSpecies } from "../../actions/species";
import FamilyTable from "./shared/FamilyTable";
import GenusTable from "./shared/GenusTable";
import SpeciesTable from "./shared/SpeciesTable";

const theme = createTheme();

const useStyles = makeStyles(() => ({
  divider: {
    margin: theme.spacing(2, 0),
  },
}));

const position_ = [
  {
    position_id: 1,
    location_id: 1,
    position_name: "Doi Inthaonon",
    lat_: 18.588,
    long_: 98.4871,
  },
];

const Home = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { result: dbfamily } = useSelector((state) => state.family);
  const { result: dbgenus } = useSelector((state) => state.genus);
  const { result: dbspecies } = useSelector((state) => state.species);
  const { result: dbprovince } = useSelector((state) => state.province);
  const { result: dbdistrict } = useSelector((state) => state.district);
  const { result: dbdetail } = useSelector((state) => state.detail);
  const { result: dblocation } = useSelector((state) => state.location);
  const { result: dbaddress } = useSelector((state) => state.address);
  const { user: currentUser } = useSelector((state) => state.auth);
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [address, setAddress] = useState();
  const [location, setLocation] = useState();
  const [detail, setDetail] = useState([]);
  const [family, setFamily] = useState([]);
  const [genus, setGenus] = useState([]);
  const [species, setSpecies] = useState([]);
  const [map, setMap] = useState();
  const [table, setTable] = useState();
  const [show, setShow] = useState([
    {
      id: -1,
    },
  ]);
  const [stack, setStack] = useState(1);

  useEffect(() => {
    dispatch(getAllFamily());
    dispatch(getAllGenus());
    dispatch(getAllSpecies());
    dispatch(getAllDetail());
    dispatch(getAllDistrict());
    dispatch(getAllProvinces());
    dispatch(getAllLocation());
    dispatch(getAllAddress());
    if (currentUser) {
      console.log(`id = ${currentUser.username}`);
    }

    setAddress(dbaddress);
  }, []);

  const markAddress = (location_) => {
    let address_ = [];
    location_.map((item) => {
      const tmp = dbaddress.filter((item2) => item2.location_id == item.id);
      tmp.map((val) => {
        address_.push(val);
      });
    });
    return address_;
  };

  const mapMarker = (location_) => {
    const address_ = markAddress(location_);

    let data = [];

    let tmpFamily = [];
    let tmpGenus = [];
    let tmpSpecies = [];
    let tmpDetail = [];

    address_.map((item, index) => {
      const loc_ = location_.find((val) => val.id === item.location_id);

      const detail_ = dbdetail.find((val) => val.id == loc_.detail_id);
      if (
        tmpDetail
          .map((e) => {
            return e.id;
          })
          .indexOf(detail_.id) == -1
      ) {
        tmpDetail.push(detail_);
      }

      const provinceName = dbprovince.find((val) => val.id == loc_.province);

      const family_ = dbfamily.find((val) => val.id == detail_.family_id);

      if (
        tmpFamily
          .map((e) => {
            return e.id;
          })
          .indexOf(family_.id) == -1
      ) {
        tmpFamily.push(family_);
      }

      const genus_ = dbgenus.find((val) => val.id == detail_.genus_id);

      if (
        tmpGenus
          .map((e) => {
            return e.id;
          })
          .indexOf(genus_.id) == -1
      ) {
        tmpGenus.push(genus_);
      }

      const species_ = dbspecies.find((val) => val.id == detail_.species_id);
      if (
        tmpSpecies
          .map((e) => {
            return e.id;
          })
          .indexOf(species_.id) == -1
      ) {
        tmpSpecies.push(species_);
      }

      const mock = {
        positionName: item.name,
        latitude: item.latitude,
        longitude: item.longitude,
        province: provinceName.name_en,
        family: family_.name,
        genus: genus_.name,
        species: species_.name,
      };

      data.push(mock);
    });

    const reduceAddress = () => {
      let newAddress = [];

      address_.map((item) => {
        const lat = newAddress.map((e) => {
          return e.latitude;
        });
        const long = newAddress.map((e) => {
          return e.longitude;
        });

        if (
          lat.indexOf(item.latitude) == -1 &&
          long.indexOf(item.longitude) == -1
        ) {
          newAddress.push({
            latitude: item.latitude,
            longitude: item.longitude,
          });
        }
      });

      return newAddress;
    };

    const newData = reduceAddress();

    console.log("data", data);
    console.log("tmpFamily", tmpFamily);
    console.log("tmpGenus", tmpGenus);
    console.log("tmpSpecies", tmpSpecies);
    console.log("tmpDetail", tmpDetail);

    const strucTmp = {
      latitude: "",
      longitude: "",
      data: [],
    };

    for (let i = 0; i < newData.length; i++) {
      const lat = newData[i].latitude;
      const long = newData[i].longitude;

      newData[i].data = data.filter(
        (item) => item.latitude == lat && item.longitude == long
      );
    }
    console.log("newData", newData);

    setFamily(tmpFamily);
    setGenus(tmpGenus);
    setSpecies(tmpSpecies);
    setDetail(tmpDetail);

    setMap(newData);
  };

  const tableShow = (location_) => {
    let detail_ = [];
    location_.map((item) => {
      const tmp = dbdetail.find((val) => val.id == item.detail_id);
      if (
        detail_
          .map((e) => {
            return e.id;
          })
          .indexOf(tmp.id) === -1
      ) {
        tmp.family = dbfamily.find((val) => val.id == tmp.family_id).name;
        tmp.genus = dbgenus.find((val) => val.id == tmp.genus_id).name;
        tmp.species = dbspecies.find((val) => val.id == tmp.species_id).name;
        detail_.push(tmp);
      }
    });

    return detail_;
    console.log("data", detail_);
  };

  const handleOnChangeAddress = () => {
    // ONLY PROVICE
    const map = [];
    let location_ = "";

    setShow([
      {
        id: -1,
      },
    ]);
    setStack(1);

    if (province && district) {
      location_ = dblocation.filter(
        (item) => item.province == province && item.district == district
      );
    } else if (province) {
      location_ = dblocation.filter((item) => item.province == province);
    } else if (district) {
      location_ = dblocation.filter((item) => item.district == district);
    } else {
      location_ = dblocation;
    }
    mapMarker(location_);
    const detail_ = tableShow(location_);
  };

  const ToNext = (type, id) => {
    let tmpShow = [...show];
    if (type == "genus") {
      tmpShow[1] ? (tmpShow[1].id = id) : tmpShow.push({ id: id });
    } else if (type == "species") {
      tmpShow[2] ? (tmpShow[2].id = id) : tmpShow.push({ id: id });
    }
    // tmpShow.id = id;
    console.log("tmp show", tmpShow);
    setStack(stack + 1);
    setShow(tmpShow);
  };

  const handleOnClickBackward = () => {
    setStack(stack - 1);
  };

  const handleOnClickForward = () => {
    setStack(stack + 1);
  };

  const ButtonStack = () => {
    return (
      <Fragment>
        <IconButton
          sx={{ border: "1px solid #808080", borderRadius: "4px" }}
          size="small"
          disabled={stack == 1 ? true : false}
          onClick={() => handleOnClickBackward()}
        >
          <ArrowBackIosNew fontSize="small" />
        </IconButton>
        <IconButton
          sx={{
            marginLeft: "5px",
            border: "1px solid #808080",
            borderRadius: "4px",
          }}
          size="small"
          disabled={stack >= show.length ? true : false}
          onClick={() => handleOnClickForward()}
        >
          <ArrowForwardIos fontSize="small" />
        </IconButton>
      </Fragment>
    );
  };

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <Box className={`page`}>
          <Container sx={{ maxWidth: "lg" }}>
            <Grid container spacing={4}>
              <Grid
                item
                sx={{
                  width: "100%",
                  display: "flex",
                  alignItem: "center",
                }}
              >
                <Typography variant="h5" sx={{ flexGrow: 0.05 }}>
                  Filter location
                </Typography>
                <Box sx={{ flexGrow: 0.05 }}>
                  <Autocomplete
                    disablePortal
                    size="small"
                    onChange={(e, value) => {
                      value ? setProvince(value.id) : setProvince("");
                    }}
                    sx={{ width: 240 }}
                    options={
                      dbprovince
                        ? dbprovince
                            .sort((a, b) => (a.name_en > b.name_en ? 1 : -1))
                            .map((item) => item)
                        : [""]
                    }
                    getOptionLabel={(options) => {
                      return options.name_en + " (" + options.name_th + ")";
                    }}
                    renderInput={(params) => (
                      <TextField {...params} label="Province (All)" />
                    )}
                  />
                </Box>
                <Box sx={{ flexGrow: 0.05 }}>
                  <Autocomplete
                    disablePortal
                    size="small"
                    onChange={(e, value) => {
                      value ? setDistrict(value.id) : setDistrict("");
                    }}
                    sx={{ width: 240 }}
                    options={
                      province
                        ? dbdistrict
                            .filter((item) => item.province_id == province)
                            .sort((a, b) => (a.name_en > b.name_en ? 1 : -1))
                            .map((item) => item)
                        : dbdistrict
                        ? dbdistrict
                            .sort((a, b) => (a.name_en > b.name_en ? 1 : -1))
                            .map((item) => item)
                        : [""]
                    }
                    getOptionLabel={(options) => {
                      return options.name_en + " (" + options.name_th + ")";
                    }}
                    renderInput={(params) => (
                      <TextField {...params} label="district (All)" />
                    )}
                  />
                </Box>
                <Button
                  size="small"
                  variant="outlined"
                  sx={{ minWidth: "100px" }}
                  onClick={() => handleOnChangeAddress()}
                >
                  select
                </Button>
              </Grid>
              {/* <Grid
                item
                sx={{
                  height: "600px",
                  width: "100%",
                }}
              >
                <Box
                  sx={{
                    height: "100%",
                    border: "1px solid #040404",
                  }}
                >
                  <MapContainer
                    className="map-view"
                    center={[13, 100]}
                    zoom={5}
                  >
                    <TileLayer
                      attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    {map
                      ? map.map((item, index) => (
                          <Marker
                            key={index}
                            position={[item.latitude, item.longitude]}
                          >
                            <Popup>
                              {" "}
                              <List disablePadding>
                                <ListItem disablePadding>
                                  <ListItemText
                                    primary={
                                      <Typography
                                        variant="body1"
                                        component="span"
                                      >
                                        {<b>Position name: </b>}
                                        {item.positionName}
                                      </Typography>
                                    }
                                  />
                                </ListItem>
                                <ListItem disablePadding>
                                  <ListItemText
                                    primary={
                                      <Typography
                                        variant="body1"
                                        component="span"
                                      >
                                        {<b>Province:</b>} {item.province}
                                      </Typography>
                                    }
                                  />
                                </ListItem>
                                <ListItem disablePadding>
                                  <ListItemText
                                    primary={
                                      <Typography
                                        variant="body1"
                                        component="span"
                                      >
                                        {<b>Family:</b>} {item.family}
                                      </Typography>
                                    }
                                  />
                                </ListItem>
                                <ListItem disablePadding>
                                  <ListItemText
                                    primary={
                                      <Typography
                                        variant="body1"
                                        component="span"
                                      >
                                        {<b>Genus:</b>} {<i>{item.genus}</i>}
                                      </Typography>
                                    }
                                  />
                                </ListItem>
                                <ListItem disablePadding>
                                  <ListItemText
                                    primary={
                                      <Typography
                                        variant="body1"
                                        component="span"
                                      >
                                        {<b>Species:</b>}{" "}
                                        {
                                          <i>
                                            {item.genus} {item.species}
                                          </i>
                                        }
                                      </Typography>
                                    }
                                  />
                                </ListItem>
                              </List>
                            </Popup>
                          </Marker>
                        ))
                      : ""}
                  </MapContainer>
                </Box>
              </Grid>*/}
            </Grid>
            <br />
            <br />
            {/* <div>
              {stack == 1 ? (
                <div>
                  <Box
                    display="flex"
                    alignItems="center"
                    sx={{ marginBottom: "10px" }}
                  >
                    <Typography variant="h5">Family : List</Typography>
                    <Box sx={{ flexGrow: 1 }} />
                    <ButtonStack />
                  </Box>
                  <FamilyTable
                    family={family}
                    genus={genus}
                    detail={detail}
                    ToNext={ToNext}
                  />
                </div>
              ) : stack == 2 ? (
                <div>
                  <Box
                    display="flex"
                    alignItems="center"
                    sx={{ marginBottom: "10px" }}
                  >
                    <Typography variant="h5">
                      Family:{" "}
                      {family &&
                        family.find((item) => item.id == show[1].id).name}
                    </Typography>
                    <Box sx={{ flexGrow: 1 }} />
                    <ButtonStack />
                  </Box>
                  <GenusTable
                    genus={genus}
                    species={species}
                    detail={detail}
                    id={show[1].id}
                    family={family}
                    ToNext={ToNext}
                  />
                </div>
              ) : (
                stack == 3 && (
                  <div>
                    <Box
                      display="flex"
                      alignItems="center"
                      sx={{ marginBottom: "10px" }}
                    >
                      <Typography variant="h5">
                        Genus:{" "}
                        {genus &&
                          genus.find((item) => item.id == show[2].id).name}
                      </Typography>
                      <Box sx={{ flexGrow: 1 }} />
                      <ButtonStack />
                    </Box>
                    <SpeciesTable
                      genus={genus}
                      species={species}
                      detail={detail}
                      id={show[2].id}
                      family={family}
                    />
                  </div>
                )
              )}
            </div> */}
            <Box sx={{ marginBottom: "25vh" }} />
          </Container>
        </Box>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default Home;
