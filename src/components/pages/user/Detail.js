import React, { useState, useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ThemeProvider,
  StyledEngineProvider,
  createTheme,
} from "@mui/material/styles";

import makeStyles from "@mui/styles/makeStyles";
import {
  Container,
  Divider,
  Paper,
  Typography,
  Grid,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
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
import imageService from "../../../services/image.service";
import familyService from "../../../services/family.service";
import genusService from "../../../services/genus.service";
import speciesService from "../../../services/species.service";
import locationService from "../../../services/location.service";
import addressService from "../../../services/address.service";
import paperService from "../../../services/paper.service";
import { Box } from "@mui/system";

const theme = createTheme();

const useStyles = makeStyles(() => ({
  root: {
    padding: "20px",
    width: "100%",
    boxShadow: "none",
    border: "1px solid #B3B6B7",
  },
}));

const Detail = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { result: province } = useSelector((state) => state.province);
  const { result: district } = useSelector((state) => state.district);

  const [detail, setDetail] = useState();

  useEffect(async () => {
    const detailId = props.match.params.id;

    if (detail == null && detailId) {
      const tmpDetail = detailId
        ? await detailService.getDetail(detailId)
        : false;

      if (tmpDetail) {
        const image_ = await imageService.getImage(detailId);
        tmpDetail.image = image_;

        const family_ = await familyService.getFamily(tmpDetail.family_id);
        tmpDetail.family = family_[0].name;
        const genus_ = await genusService.getGenus(tmpDetail.genus_id);
        tmpDetail.genus = genus_[0].name;
        const species_ = await speciesService.getSpecies(tmpDetail.species_id);
        tmpDetail.species = species_[0].name;

        const location_ = await locationService.getLocation(detailId);
        for (let i = 0; i < location_.length; i++) {
          location_[i].address = await addressService.getAddress(
            location_[i].id
          );
        }
        tmpDetail.location = location_;

        const paper_ = await paperService.getPaper(detailId);
        tmpDetail.paper = paper_;

        console.log("tmp", tmpDetail);
        setDetail(tmpDetail);
      }
    }
    dispatch(getAllProvinces());
    dispatch(getAllDistrict());
  }, [detail]);
  return (
    <div className={`page`}>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          {detail && (
            <Container maxWidth="lg">
              <Paper className={classes.root}>
                <Typography variant="h4" component="div" gutterBottom>
                  Document detail
                </Typography>
                <br />
                <br />
                <Typography variant="h5" component="div" gutterBottom>
                  Type
                </Typography>
                <Box sx={{ paddingLeft: "20px" }}>
                  <Typography variant="h6" component="div">
                    <b>Family:</b> {detail.family}
                  </Typography>
                  <Typography variant="h6" component="div">
                    <b>Genus:</b> <i>{detail.genus}</i>
                  </Typography>
                  <Typography variant="h6" component="div">
                    <b>Species:</b> <i>{`${detail.genus} ${detail.species}`}</i>
                  </Typography>
                  <Box sx={{ marginLeft: "20px" }}></Box>
                </Box>
                <br />
                <Divider />
                <br />
                <Typography variant="h5" gutterBottom>
                  Detail
                </Typography>
                <Grid container spacing={2} sx={{ paddingLeft: "20px" }}>
                  <Grid item xs={12} md={4}>
                    <Typography variant="subtitle1" component="div">
                      <b>Author:</b> {detail.author}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={8}>
                    <Typography variant="subtitle1" component="div">
                      <b>Publish year:</b> {detail.publish_year}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Typography variant="subtitle1" component="div">
                      <b>Country:</b> {detail.country}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={8}>
                    <Typography variant="subtitle1" component="div">
                      <b>Other country:</b> {detail.country_other}
                    </Typography>
                  </Grid>
                </Grid>
                <br />
                <Box sx={{ paddingLeft: "20px" }}>
                  <Typography variant="subtitle1" component="div">
                    <b>Altitude: </b> {detail.altitude}
                  </Typography>
                  <Typography variant="subtitle1" component="div">
                    <b>Method: </b> {detail.method}
                  </Typography>
                  <Typography variant="subtitle1" component="div">
                    <b>Habitat: </b> {detail.habitat}
                  </Typography>
                  <Typography variant="subtitle1" component="div">
                    <b>Microhabitat: </b> {detail.microhabitat}
                  </Typography>
                  <Typography variant="subtitle1" component="div">
                    <b>Designate: </b> {detail.designate}
                  </Typography>
                </Box>
                <br />
                <Divider />
                <br />
                <Typography variant="h5" gutterBottom>
                  Place to meet
                </Typography>
                <List>
                  {detail.location.map((val2, index2) => (
                    <ListItem
                      key={index2}
                      disablePadding
                      sx={{ paddingLeft: "20px" }}
                    >
                      <ListItemText
                        primary={
                          <Grid container justifyContent="space-between">
                            <Grid item xs={12} md={6} lg={3}>
                              <Typography variant="subtitle1" component="div">
                                <b>Province: </b>{" "}
                                {province &&
                                  province.find(
                                    (item) => item.id == parseInt(val2.province)
                                  ).name_en}
                              </Typography>
                            </Grid>
                            <Grid item xs={12} md={6} lg={3}>
                              <Typography variant="subtitle1" component="div">
                                <b>District: </b>{" "}
                                {district &&
                                  district.find(
                                    (item) => item.id == parseInt(val2.district)
                                  ).name_en}
                              </Typography>
                            </Grid>
                            <Grid item xs={12} md={6} lg={3}>
                              <Typography variant="subtitle1" component="div">
                                <b>Locality: </b> {val2.locality}
                              </Typography>
                              <br />
                            </Grid>
                            <Grid item xs={12} md={6} lg={3}>
                              <Typography variant="subtitle1" component="div">
                                <b>Position: </b>{" "}
                                {val2.address.map((item) => {
                                  return item.name + ", ";
                                })}
                              </Typography>
                            </Grid>
                          </Grid>
                        }
                      />
                    </ListItem>
                  ))}
                </List>
                <Divider />
                <br />
                <Typography variant="h5" gutterBottom>
                  Reference
                </Typography>
                <Box sx={{ paddingLeft: "20px" }}>
                  <Typography variant="subtitle1" component="div">
                    <b>Paper referance: </b>{" "}
                    {detail.paper.map((item) => {
                      return item.name + ", ";
                    })}
                  </Typography>
                </Box>
                <br />
                <br />
                <Divider />
                <br />
                <Typography variant="h5" gutterBottom>
                  Picture
                </Typography>
                {detail.image.map((image, index) => (
                  <img
                    key={index}
                    src={`/${image.path}`}
                    // width="100%"
                    style={{
                      maxHeight: "420px",
                      width: "auto",
                      margin: "5px",
                      padding: "5px",
                      border: "1px solid #b8b8b8",
                    }}
                  />
                ))}
                <br />
              </Paper>
            </Container>
          )}
        </ThemeProvider>
      </StyledEngineProvider>
    </div>
  );
};

export default Detail;
