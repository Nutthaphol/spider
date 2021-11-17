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
  const { result: allFamily } = useSelector((state) => state.family);
  const { result: allGenus } = useSelector((state) => state.genus);
  const { user: currentUser } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getAllFamily());
    dispatch(getAllGenus());
    if (currentUser) {
      console.log(`id = ${currentUser.username}`);
    }
  }, []);

  const counterGenus = (id) => {
    if (allGenus) {
      const number = allGenus.filter((item) => item.family_id === id).length;
      return number;
    }
  };

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <Box className={`page`}>
          <Container sx={{ maxWidth: "lg" }}>
            <div className="map" style={{ height: "59vh" }}>
              <MapView listPosition={position_} styles={{ height: "50vh" }} />
            </div>
            <Divider className={classes.divider} />
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Family</TableCell>
                    <TableCell>Author</TableCell>
                    <TableCell align="right"># genera</TableCell>
                    <TableCell align="right">Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {allFamily &&
                    allFamily
                      .filter((val) => counterGenus(val.id) > 0)
                      .map((val) => (
                        <TableRow key={val.id}>
                          <TableCell>{val.name}</TableCell>
                          <TableCell>name author</TableCell>
                          <TableCell align="right">
                            {counterGenus(val.id)}
                          </TableCell>
                          <TableCell align="right">
                            <Link href="#">genera</Link>&nbsp;|&nbsp;
                            <Link href="#">Search</Link>
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
