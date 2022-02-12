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
  Icon,
  Modal,
  Fade,
  Dialog,
  DialogContent,
  Collapse,
  Alert,
  Tooltip,
  DialogContentText,
  DialogTitle,
  DialogActions,
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

import {
  ArrowBackIosNew,
  ArrowForwardIos,
  KeyboardArrowRight,
  Search,
  KeyboardArrowLeft,
  ChatBubbleOutline,
} from "@mui/icons-material";
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
import Slider from "react-slick";
import SlideArrow from "./shared/slideArrow";
import PaperPopup from "./shared/PaperPopup";
import locationService from "../../services/location.service";
import { runLogoutTimer } from "../../actions/auth";
import themplates from "./shared/theme";

const theme = createTheme(themplates);

const useStyles = makeStyles(() => ({
  root: {
    paddingTop: "24px",
    position: "relative",
  },
  divider: {
    margin: theme.spacing(2, 0),
  },
  dialog: {
    backgroundColor: "rgba(78, 255, 61, 0.5)",
  },
  firstBox: {
    minHeight: "180px",
    backgroundColor: "#8B0000",
    paddingTop: "32px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  flocation: {
    fontWeight: "600",
    color: "#fff",
  },
  autocomplete: {
    color: "#000",
    // backgroundColor: "#fff",
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      // borderColor: "#FDD835",
      borderColor: "#000",
    },
  },
  textLabel: {
    backgroundColor: "#fff",
    "& .MuiInputLabel-outlined.Mui-focused": {
      borderRadius: "4px",
    },
    "& .MuiInputLabel-outlined": {
      color: "#000",
      borderRadius: "4px",
      width: "100%",
      textAlign: "center",
    },
    "& .MuiOutlinedInput-notchedOutline": {
      borderWidth: "2px",
      borderColor: "#000",
      boxShadow:
        "0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)",
    },
    "& MuiFormLabel-root.MuiInputLabel-root": {
      // transform: "translate(0px, -9px) scale(0.75)",
    },
  },
  dispalyButton: {
    height: "40px",
    textTransform: "none",
    backgroundColor: "#ED7044",
    color: "#fff",
    "&:hover": {
      background: "#fff",
      backgroundColor: "#ED7044",
      color: "#fff",
    },
    border: "2px solid #000",
  },
  braner: {
    height: "320px",
    width: "100%",
    marginBottom: "20px",
  },
}));

const logoScale = {
  desktop: `url(${process.env.PUBLIC_URL}/assets/logo/desktop_logo.png)`,
  tablet: `url(${process.env.PUBLIC_URL}/assets/logo/tablet_logo.png)`,
  mobile: `url(${process.env.PUBLIC_URL}/assets/logo/mobile_logo.png)`,
};

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
  const [family, setFamily] = useState([]);
  const [genus, setGenus] = useState([]);
  const [species, setSpecies] = useState([]);
  const [table, setTable] = useState();
  const [show, setShow] = useState([
    {
      id: -1,
    },
  ]);
  const [stack, setStack] = useState(1);
  const [guid, setGuid] = useState(true);
  const [notFount, setNotFount] = useState(false);
  const [map, setMap] = useState(false);
  const [detail, setDetail] = useState([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // const fetch = async () => {
    //   !dbfamily && (await dispatch(getAllFamily()));
    //   !dbgenus && (await dispatch(getAllGenus()));
    //   !dbspecies && (await dispatch(getAllSpecies()));
    //   !dbprovince && (await dispatch(getAllProvinces()));
    //   !dbdistrict && (await dispatch(getAllDistrict()));
    //   !dbdetail && (await dispatch(getAllDetail()));
    //   !dblocation && (await dispatch(getAllLocation()));
    //   !dbaddress && (await dispatch(getAllAddress()));
    //   return true;
    // };

    const pree = async (callback_) => {
      !dbfamily && (await dispatch(getAllFamily()));
      !dbgenus && (await dispatch(getAllGenus()));
      !dbspecies && (await dispatch(getAllSpecies()));
      !dbprovince && (await dispatch(getAllProvinces()));
      !dbdistrict && (await dispatch(getAllDistrict()));
      !dbdetail && (await dispatch(getAllDetail()));
      !dblocation && (await dispatch(getAllLocation()));
      !dbaddress && (await dispatch(getAllAddress()));
      callback_();
    };

    pree(() => {
      setReady(true);
      return;
    });

    if (
      dbfamily &&
      dbgenus &&
      dbspecies &&
      dbprovince &&
      dbdistrict &&
      dbdetail &&
      dblocation &&
      dbaddress
    ) {
      setAddress(dbaddress);

      setReady(true);
      // handleOnChangeAddress();
    }
    if (ready) {
      console.log("ready");
      setAddress(dbaddress);
      handleOnChangeAddress();
    }
  }, [
    // dbfamily,
    // dbgenus,
    // dbspecies,
    // dbprovince,
    // dbdistrict,
    // dbdetail,
    // dblocation,
    // dbaddress,
    ready,
  ]);

  const filterAddress = (location_) => {
    let address_ = [];
    if (location_ && dbaddress) {
      address_ = location_.reduce((prov, curr) => {
        let addressFilter = dbaddress
          .filter((item) => curr.id == item.location_id)
          .map((e) => {
            e.location_id = curr.id;
            e.detail_id = curr.detail_id;
            e.address_id = e.id;
            return e;
          });

        return prov.concat(addressFilter);
      }, []);
    }
    return address_;
  };

  const mapMarker = (location_) => {
    // divide the data by the number of address because we need
    const address_ = filterAddress(location_);

    let data = [];
    let skip = false;

    let tmpFamily = [];
    let tmpGenus = [];
    let tmpSpecies = [];
    let tmpDetail = [];

    address_.map((item, index) => {
      const loc_ = location_.find((val) => val.id === item.location_id);

      const detail_ = dbdetail.find((val) => val.id == loc_.detail_id) || false;
      if (
        detail_ ||
        tmpDetail
          .map((e) => {
            return e.id;
          })
          .indexOf(detail_.id) == -1
      ) {
        if (detail_) {
          tmpDetail.push(detail_);
          skip = true;
        }
      }

      if (skip) {
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
      }
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

    dispatch({ type: "setDetail", payload: tmpDetail });
    setFamily(tmpFamily);
    setGenus(tmpGenus);
    setSpecies(tmpSpecies);
    setDetail(tmpDetail);

    return newData;
    // setMap(newData);
  };

  const tableShow = (location_) => {
    let detail_ = [];
    if (location_ && dbdetail) {
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
    }
    return detail_;
  };

  const handleOnChangeAddress = () => {
    // ONLY PROVICE
    const map = [];
    let location_ = "";
    setGuid(false);

    setShow([
      {
        id: -1,
      },
    ]);
    setStack(1);

    // fillter location that match province/district and it has in detail table
    if (province && district) {
      location_ = dblocation.filter(
        (item) =>
          item.province == province &&
          item.district == district &&
          dbdetail.find((val) => val.id == item.detail_id)
      );
    } else if (province) {
      location_ = dblocation.filter(
        (item) =>
          item.province == province &&
          dbdetail.find((val) => val.id == item.detail_id)
      );
    } else if (district) {
      location_ = dblocation.filter(
        (item) =>
          item.district == district &&
          dbdetail.find((val) => val.id == item.detail_id)
      );
    } else {
      location_ = dblocation.filter((item) =>
        dbdetail.find((val) => val.id == item.detail_id)
      );
    }
    const data = mapMarker(location_);

    if (data.length == 0) {
      setNotFount(true);
    }
    setMap(data);
    setLocation(location_);
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

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 1,
    adaptiveHeight: false,
    nextArrow: <SlideArrow Comp={KeyboardArrowRight} />,
    prevArrow: <SlideArrow Comp={KeyboardArrowLeft} />,
  };

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <Box className={`home`}>
          <Box
            // className={classes.braner}
            sx={{
              bgcolor: "rgba(244, 203, 73 ,0.4)",
              // backgroundImage: `url(${process.env.PUBLIC_URL}/assets/logo/brannerLogo.png)`,
              [theme.breakpoints.up("xs")]: {
                backgroundImage: logoScale.mobile,
              },
              [theme.breakpoints.up("sm")]: {
                backgroundImage: logoScale.tablet,
              },
              [theme.breakpoints.up("md")]: {
                backgroundImage: logoScale.desktop,
              },
              backgroundSize: "100% 100%",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              height: "360px",
              mb: 5,
            }}
          />
          <Container maxWidth="lg">
            <Grid container spacing={4}>
              <Grid item xs={12} md={4}>
                <Autocomplete
                  disablePortal
                  size="small"
                  onChange={(e, value) => {
                    value ? setProvince(value.id) : setProvince("");
                  }}
                  classes={{
                    root: classes.textLabel,
                    inputRoot: classes.autocomplete,
                  }}
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
                    <TextField
                      {...params}
                      fullWidth
                      sx={{
                        "& .MuiInputLabel-outlined.Mui-focused": {
                          borderRadius: "4px",
                          maxWidth:
                            province == ""
                              ? "calc(100% - 260px)"
                              : "calc(100% - 290px)",
                        },
                        "& .MuiInputLabel-outlined": {
                          color: "#000",
                          borderRadius: "4px",
                          width: "100%",
                          textAlign: "center",
                          maxWidth:
                            province == ""
                              ? "calc(100% - 14px)"
                              : "calc(100% - 290px)",
                        },
                      }}
                      label={province == "" ? "Province (All)" : "Province"}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <Autocomplete
                  disablePortal
                  size="small"
                  sx={{ textAlign: "left" }}
                  classes={{
                    root: classes.textLabel,
                    inputRoot: classes.autocomplete,
                  }}
                  onChange={(e, value) => {
                    value ? setDistrict(value.id) : setDistrict("");
                  }}
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
                    <TextField
                      {...params}
                      fullWidth
                      sx={{
                        "& .MuiInputLabel-outlined.Mui-focused": {
                          borderRadius: "4px",
                          maxWidth:
                            district == ""
                              ? "calc(100% - 274px)"
                              : "calc(100% - 298px)",
                        },
                        "& .MuiInputLabel-outlined": {
                          color: "#000",
                          borderRadius: "4px",
                          width: "100%",
                          textAlign: "center",
                          maxWidth:
                            district == ""
                              ? "calc(100% - 14px)"
                              : "calc(100% - 298px)",
                        },
                      }}
                      label={district == "" ? "District (All)" : "District"}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <Button
                  fullWidth
                  variant="contained"
                  onClick={() => handleOnChangeAddress()}
                  color="secondary"
                  fullWidth
                >
                  CLICK "HERE" FOR SEARCH
                </Button>
              </Grid>
            </Grid>
            <Box
              sx={{
                height: "450px",
                margin: "50px 0",
              }}
            >
              <Box
                sx={{
                  height: "100%",
                  border: "1px solid #040404",
                  borderRadius: "4px",
                }}
              >
                <MapContainer
                  className="map-view"
                  center={[13, 100]}
                  zoom={5}
                  style={{ borderRadius: "4px" }}
                  scrollWheelZoom={false}
                >
                  <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  {map
                    ? map.map((val, index) => (
                        <Marker
                          key={index}
                          position={[val.latitude, val.longitude]}
                        >
                          {val.data.length > 1 ? (
                            <Popup style={{ width: "480px" }}>
                              <Slider {...settings}>
                                {val.data.map((val2, index2) => (
                                  <PaperPopup
                                    key={index2}
                                    positionName={val2.positionName}
                                    province={val2.province}
                                    family={val2.family}
                                    genus={val2.genus}
                                    species={val2.species}
                                  />
                                ))}
                              </Slider>
                            </Popup>
                          ) : (
                            <Popup>
                              <PaperPopup
                                positionName={val.data[0].positionName}
                                province={val.data[0].province}
                                family={val.data[0].family}
                                genus={val.data[0].genus}
                                species={val.data[0].species}
                              />
                            </Popup>
                          )}
                        </Marker>
                      ))
                    : ""}
                </MapContainer>
              </Box>
            </Box>
            <Box sx={{ mt: "48px" }}>
              {stack == 1 ? (
                <Box sx={{ position: "relative" }}>
                  <FamilyTable
                    family={family}
                    genus={genus}
                    detail={detail}
                    ToNext={ToNext}
                    ButtonStack={ButtonStack}
                  />
                </Box>
              ) : stack == 2 ? (
                <div>
                  <GenusTable
                    genus={genus}
                    species={species}
                    detail={detail}
                    id={show[1].id}
                    family={family}
                    ToNext={ToNext}
                    ButtonStack={ButtonStack}
                  />
                </div>
              ) : (
                stack == 3 && (
                  <div>
                    <SpeciesTable
                      genus={genus}
                      species={species}
                      detail={detail}
                      id={show[2].id}
                      family={family}
                      location={location}
                      ButtonStack={ButtonStack}
                      province={province}
                      district={district}
                    />
                  </div>
                )
              )}
            </Box>
          </Container>
        </Box>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default Home;
