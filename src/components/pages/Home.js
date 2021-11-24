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
import React, { useState, useEffect } from "react";
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

import { Search } from "@mui/icons-material";
import { getAllFamily } from "../../actions/family";
import { getAllGenus } from "../../actions/genus";
import { getAllProvinces } from "../../actions/province";
import { getAllDistrict } from "../../actions/district";
import { getAllDetail } from "../../actions/detail";
import { getAllLocation } from "../../actions/location";
import { getAllAddress } from "../../actions/address";
import { getAllSpecies } from "../../actions/species";

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
  const [detail, setDetail] = useState();
  const [family, setFamily] = useState();
  const [genus, setGenus] = useState();
  const [species, setSpecies] = useState();
  const [map, setMap] = useState();
  const [table, setTable] = useState();

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

    address_.map((item, index) => {
      const loc_ = location_.find((val) => val.id === item.location_id);

      const detail_ = dbdetail.find((val) => val.id == loc_.detail_id);

      const provinceName = dbprovince.find((val) => val.id == loc_.province);

      const family_ = dbfamily.find((val) => val.id == detail_.family_id);
      const genus_ = dbgenus.find((val) => val.id == detail_.genus_id);
      const species_ = dbspecies.find((val) => val.id == detail_.species_id);

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

    setMap(data);
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
        detail_.push(tmp);
      }
    });

    console.log("data", detail_);
  };

  const handleOnChangeAddress = () => {
    // ONLY PROVICE
    const map = [];
    let location_ = "";

    if (province && district) {
      location_ = dblocation.filter(
        (item) => item.province == province && item.district == district
      );
    }
    if (province) {
      location_ = dblocation.filter((item) => item.province == province);
    }
    if (district) {
      location_ = dblocation.filter((item) => item.district == district);
    }

    mapMarker(location_);
    tableShow(location_);
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
                      dbprovince &&
                      dbprovince
                        .sort((a, b) => (a.name_en > b.name_en ? 1 : -1))
                        .map((item) => item)
                      // dbprovince && dbprovince.map((item) => item.name_en)
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
                        : dbdistrict &&
                          dbdistrict
                            .sort((a, b) => (a.name_en > b.name_en ? 1 : -1))
                            .map((item) => item)
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
              <Grid
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
                                      "Position name: " + item.positionName
                                    }
                                  />
                                </ListItem>
                                <ListItem disablePadding>
                                  <ListItemText
                                    primary={"Province: " + item.province}
                                  />
                                </ListItem>
                                <ListItem disablePadding>
                                  <ListItemText
                                    primary={"Family: " + item.family}
                                  />
                                </ListItem>
                                <ListItem disablePadding>
                                  <ListItemText
                                    primary={"Genus: " + item.genus}
                                  />
                                </ListItem>
                                <ListItem disablePadding>
                                  <ListItemText
                                    primary={"Species: " + item.species}
                                  />
                                </ListItem>
                              </List>
                            </Popup>
                          </Marker>
                        ))
                      : dbaddress &&
                        dbaddress.map((item, index) => (
                          <Marker
                            key={index}
                            position={[
                              parseFloat(item.latitude),
                              parseFloat(item.longitude),
                            ]}
                          >
                            <Popup></Popup>
                          </Marker>
                        ))}
                  </MapContainer>
                </Box>
              </Grid>
            </Grid>
            <br />
            <br />
            <Typography variant="h5">Family : Actions</Typography>
            <TableContainer
              component={Paper}
              sx={{
                boxShadow: "none",
                border: "1px solid #B3B6B7",
              }}
            >
              <Table sx={{ minWidth: 650 }}>
                <TableHead>
                  <TableCell>Family</TableCell>
                  <TableCell>Author</TableCell>
                  <TableCell> # genera</TableCell>
                  <TableCell>Action</TableCell>
                </TableHead>
                <TableBody>
                  {family &&
                    family
                      .filter((item) =>
                        detail.find((val) => val.family_id == item.id)
                      )
                      .map((val, index) => (
                        <TableRow key={index}>
                          <TableCell>{val.name}</TableCell>
                          <TableCell>
                            {
                              detail
                                // .slice(0, 1)
                                .find((item) => item.family_id == val.id).author
                            }
                          </TableCell>
                          <TableCell>
                            {
                              genus.filter((item) => item.family_id == val.id)
                                .length
                            }
                          </TableCell>
                          <TableCell>
                            <Link sx={{ cursor: "pointer" }}>genera</Link>
                          </TableCell>
                        </TableRow>
                      ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Container>
        </Box>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default Home;
