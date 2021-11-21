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

import makeStyles from "@mui/styles/makeStyles";

import { Search } from "@mui/icons-material";
import { getAllFamily } from "../../actions/family";
import { getAllGenus } from "../../actions/genus";
import { getAllProvinces } from "../../actions/province";
import { getAllDistrict } from "../../actions/district";

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
  const { result: dbprovince } = useSelector((state) => state.province);
  const { result: dbdistrict } = useSelector((state) => state.district);
  const { user: currentUser } = useSelector((state) => state.auth);
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");

  useEffect(() => {
    // dispatch(getAllFamily());
    // dispatch(getAllGenus());
    dispatch(getAllDistrict());
    dispatch(getAllProvinces());
    if (currentUser) {
      console.log(`id = ${currentUser.username}`);
    }
  }, []);

  // const counterGenus = (id) => {
  //   if (allGenus) {
  //     const number = allGenus.filter((item) => item.family_id === id).length;
  //     return number;
  //   }
  // };

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <Box className={`page`}>
          <Container sx={{ maxWidth: "lg" }}>
            <Grid container spacing={4}>
              <Grid item>
                <Typography variant="h5">Filter location</Typography>
                <br />
                <Autocomplete
                  disablePortal
                  size="small"
                  onChange={(e) => setProvince(e.target.value)}
                  sx={{ width: 240 }}
                  options={dbprovince && dbprovince.map((item) => item.name_en)}
                  renderInput={(params) => (
                    <TextField {...params} label="Province" />
                  )}
                />
              </Grid>
            </Grid>
          </Container>
        </Box>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default Home;
