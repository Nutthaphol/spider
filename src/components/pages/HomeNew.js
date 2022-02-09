import React, { useState, useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import makeStyles from "@mui/styles/makeStyles";
import {
  ThemeProvider,
  StyledEngineProvider,
  createTheme,
} from "@mui/material/styles";

import {
  Box,
  Container,
  Grid,
  TextField,
  Autocomplete,
  Button,
  IconButton,
} from "@mui/material";

import { getAllFamily } from "../../actions/family";
import { getAllGenus } from "../../actions/genus";
import { getAllProvinces } from "../../actions/province";
import { getAllDistrict } from "../../actions/district";
import { getAllDetail } from "../../actions/detail";
import { getAllLocation } from "../../actions/location";
import { getAllAddress } from "../../actions/address";
import { getAllSpecies } from "../../actions/species";

import "./index.css";
import themplates from "./shared/theme";

const theme = createTheme(themplates);

const useStyles = makeStyles(() => ({}));

const logoScale = {
  desktop: `url(${process.env.PUBLIC_URL}/assets/logo/desktop_logo.png)`,
  tablet: `url(${process.env.PUBLIC_URL}/assets/logo/tablet_logo.png)`,
  mobile: `url(${process.env.PUBLIC_URL}/assets/logo/mobile_logo.png)`,
};

const Home = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { result: dbprovince } = useSelector((state) => state.province);
  const { result: dbdistrict } = useSelector((state) => state.district);
  const { result: dbspecies } = useSelector((state) => state.species);
  const { result: dbfamily } = useSelector((state) => state.family);
  const { result: dbgenus } = useSelector((state) => state.genus);
  const { result: dbdetail } = useSelector((state) => state.detail);
  const { result: dblocation } = useSelector((state) => state.location);
  const { result: dbaddress } = useSelector((state) => state.address);

  const [atProvince, setAtProvince] = useState(null);
  const [atDistrict, setAtDistrict] = useState(null);

  useEffect(async () => {
    const loadData = () => {
      dispatch(getAllFamily());
      dispatch(getAllGenus());
      dispatch(getAllSpecies());
      dispatch(getAllDetail());
      dispatch(getAllDistrict());
      dispatch(getAllProvinces());
      dispatch(getAllLocation());
      dispatch(getAllAddress());
    };

    const waitData = await loadData();
    console.log("waitData", JSON.stringify(waitData));
  }, []);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <Box className={`home`}>
          <Box
            sx={{
              bgcolor: "rgba(244, 203, 73 ,0.4)",
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
            {dbprovince && dbdistrict && (
              <Grid container spacing={4}>
                <Grid item xs={12} md={4}>
                  <Autocomplete
                    disablePortal
                    size="small"
                    onChange={(e, value) => {
                      value ? setAtProvince(value.id) : setAtProvince(null);
                    }}
                    classes={{
                      root: classes.textLabel,
                      inputRoot: classes.autocomplete,
                    }}
                    options={dbprovince
                      .sort((a, b) => (a.name_en > b.name_en ? 1 : -1))
                      .map((item) => item)}
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
                              atProvince == ""
                                ? "calc(100% - 260px)"
                                : "calc(100% - 290px)",
                          },
                          "& .MuiInputLabel-outlined": {
                            color: "#000",
                            borderRadius: "4px",
                            width: "100%",
                            textAlign: "center",
                            maxWidth:
                              atProvince == ""
                                ? "calc(100% - 14px)"
                                : "calc(100% - 290px)",
                          },
                        }}
                        label={atProvince == "" ? "Province (All)" : "Province"}
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
                      value ? setAtDistrict(value.id) : setAtDistrict(null);
                    }}
                    options={
                      atProvince
                        ? dbdistrict
                            .filter((item) => item.province_id == atProvince)
                            .sort((a, b) => (a.name_en > b.name_en ? 1 : -1))
                            .map((item) => item)
                        : dbdistrict

                            .sort((a, b) => (a.name_en > b.name_en ? 1 : -1))
                            .map((item) => item)
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
                              atDistrict == ""
                                ? "calc(100% - 274px)"
                                : "calc(100% - 298px)",
                          },
                          "& .MuiInputLabel-outlined": {
                            color: "#000",
                            borderRadius: "4px",
                            width: "100%",
                            textAlign: "center",
                            maxWidth:
                              atDistrict == ""
                                ? "calc(100% - 14px)"
                                : "calc(100% - 298px)",
                          },
                        }}
                        label={atDistrict == "" ? "District (All)" : "District"}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <Button
                    fullWidth
                    variant="contained"
                    // onClick={() => handleOnChangeAddress()}
                    color="secondary"
                    fullWidth
                  >
                    CLICK "HERE" FOR SEARCH
                  </Button>
                </Grid>
              </Grid>
            )}
          </Container>
        </Box>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default Home;
