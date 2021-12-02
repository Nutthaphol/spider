import React, { useState, useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ThemeProvider,
  StyledEngineProvider,
  createTheme,
} from "@mui/material/styles";

import makeStyles from "@mui/styles/makeStyles";
import { Container, Typography } from "@mui/material";
import { getAllSpecies } from "../../../actions/species";
import detailService from "../../../services/detail.service";
import { getDetail } from "../../../actions/detail";
import { getLocation } from "../../../actions/location";
import { getImage } from "../../../actions/image";
import { getPaper } from "../../../actions/paper";
import { getAllFamily } from "../../../actions/family";
import { getAllGenus } from "../../../actions/genus";
import { getAllProvinces } from "../../../actions/province";
import { getAllDistrict } from "../../../actions/district";

const theme = createTheme();

const useStyles = makeStyles(() => ({
  root: {},
}));

const Detail = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { result: detail } = useSelector((state) => state.detail);
  const { result: location } = useSelector((state) => state.location);
  const { result: image } = useSelector((state) => state.image);
  const { result: paper } = useSelector((state) => state.paper);
  const { result: family } = useSelector((state) => state.family);
  const { result: genus } = useSelector((state) => state.genus);
  const { result: species } = useSelector((state) => state.species);
  const { result: province } = useSelector((state) => state.province);
  const { result: district } = useSelector((state) => state.district);

  useEffect(() => {
    const detailId = props.match.params.id;
    if (detailId) {
      dispatch(getDetail(detailId));
      dispatch(getLocation(detailId));
      dispatch(getImage(detailId));
      dispatch(getPaper(detailId));
      dispatch(getAllFamily());
      dispatch(getAllGenus());
      dispatch(getAllSpecies());
      dispatch(getAllProvinces());
      dispatch(getAllDistrict());
    }
  }, []);
  return (
    <div className={`page`}>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <Container maxWidth="lg">
            <Typography variant="h5" component="span" gutterBottom></Typography>
          </Container>
        </ThemeProvider>
      </StyledEngineProvider>
    </div>
  );
};

export default Detail;
