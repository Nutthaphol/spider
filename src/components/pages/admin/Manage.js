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
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Link,
  Typography,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  List,
  ListItem,
  ListItemText,
  Grid,
} from "@mui/material";
import { ClassNames } from "@emotion/react";
import { getAllFamily } from "../../../actions/family";
import { getAllGenus } from "../../../actions/genus";
import { getAllSpecies } from "../../../actions/species";
import { getAllDetail } from "../../../actions/detail";
import { Box } from "@mui/system";

import locationService from "../../../services/location.service";
import addressService from "../../../services/address.service";
import paperService from "../../../services/paper.service";
import imageService from "../../../services/image.service";
import { getAllProvinces } from "../../../actions/province";
import { getAllDistrict } from "../../../actions/district";

const theme = createTheme();

const useStyles = makeStyles(() => ({
  root: {
    padding: "20px",
    boxShadow: "none",
    border: "1px solid #B3B6B7",
  },
}));

const Manage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { result: detail } = useSelector((state) => state.detail);
  const { result: family } = useSelector((state) => state.family);
  const { result: genus } = useSelector((state) => state.genus);
  const { result: species } = useSelector((state) => state.species);
  const { result: province } = useSelector((state) => state.province);
  const { result: district } = useSelector((state) => state.district);

  const [openDetail, setOpenDetail] = useState(false);
  const [logDetail, setLogDetail] = useState(-1);

  useEffect(() => {
    dispatch(getAllFamily());
    dispatch(getAllGenus());
    dispatch(getAllSpecies());
    dispatch(getAllDetail());
    dispatch(getAllProvinces());
    dispatch(getAllDistrict());
  }, []);

  const preDetail = async (id) => {
    const selectDetail = detail.find((item) => item.id == id);

    selectDetail.family = family.find(
      (item) => item.id == selectDetail.family_id
    ).name;
    selectDetail.genus = genus.find(
      (item) => item.id == selectDetail.genus_id
    ).name;
    selectDetail.species = species.find(
      (item) => item.id == selectDetail.species_id
    ).name;

    const location_ = await locationService.getLocation(selectDetail.id);
    for (let i = 0; i < location_.length; i++) {
      location_[i].address = await addressService.getAddress(location_[i].id);
    }

    selectDetail.location = location_;

    selectDetail.image = await imageService.getImage(selectDetail.id);
    selectDetail.paper = await paperService.getPaper(selectDetail.id);

    return selectDetail;
  };

  const handleOnClickDetailId = async (id) => {
    const selectDetail = await preDetail(id);
    setLogDetail(selectDetail);
    setOpenDetail(true);
  };

  const handelOnClose = () => {
    setOpenDetail(false);
  };

  return (
    <div className={`page`}>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <Container maxWidth="xl">
            <Paper className={classes.root}>
              <TableContainer>
                <Table stickyHeader>
                  <TableHead>
                    <TableRow>
                      <TableCell align="left">
                        <Typography
                          varaint="subtitle1"
                          gutterBottom
                          component="div"
                        >
                          # id
                        </Typography>
                      </TableCell>
                      <TableCell align="left">
                        <Typography
                          varaint="subtitle1"
                          gutterBottom
                          component="div"
                        >
                          Family
                        </Typography>
                      </TableCell>
                      <TableCell align="left">
                        <Typography
                          varaint="subtitle1"
                          gutterBottom
                          component="div"
                        >
                          Genus
                        </Typography>
                      </TableCell>
                      <TableCell align="left">
                        <Typography
                          varaint="subtitle1"
                          gutterBottom
                          component="div"
                        >
                          Species
                        </Typography>
                      </TableCell>
                      <TableCell align="left">
                        <Typography
                          varaint="subtitle1"
                          gutterBottom
                          component="div"
                        >
                          Author
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Typography
                          varaint="subtitle1"
                          gutterBottom
                          component="div"
                        >
                          Action
                        </Typography>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {detail &&
                      detail.map((val, index) => (
                        <TableRow key={index}>
                          <TableCell align="left">
                            <Link
                              underline="hover"
                              sx={{ cursor: "pointer" }}
                              onClick={() => {
                                handleOnClickDetailId(val.id);
                              }}
                            >
                              {val.id}
                            </Link>
                          </TableCell>
                          <TableCell align="left">
                            <Typography variant="subtitle1" component="div">
                              {family &&
                                family.find((item) => item.id == val.family_id)
                                  .name}
                            </Typography>
                          </TableCell>
                          <TableCell align="left">
                            <Typography variant="subtitle1" component="div">
                              {genus &&
                                genus.find((item) => item.id == val.genus_id)
                                  .name}
                            </Typography>
                          </TableCell>
                          <TableCell align="left">
                            <Typography variant="subtitle1" component="div">
                              {species &&
                                species.find(
                                  (item) => item.id == val.species_id
                                ).name}
                            </Typography>
                          </TableCell>
                          <TableCell align="left">
                            <Typography variant="subtitle1" component="div">
                              {val.author}
                            </Typography>
                          </TableCell>
                          <TableCell align="center">
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-around",
                              }}
                            >
                              <Button
                                size="small"
                                variant="contained"
                                color="warning"
                                onClick={() => handleOnClickDetailId(val.id)}
                                href={`/editDetailForm/${val.id}`}
                              >
                                Edit
                              </Button>
                              <Button
                                size="small"
                                variant="contained"
                                color="error"
                              >
                                Delete
                              </Button>
                            </Box>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
            {logDetail != -1 && (
              <Dialog open={openDetail} onClose={handelOnClose}>
                <DialogTitle sx={{ minWidth: "1000px" }}>
                  Log Detail
                </DialogTitle>
                <DialogContent>
                  <Typography variant="subtitle1" component="div">
                    <b>id: </b>#{logDetail.id}
                  </Typography>
                  <Typography variant="subtitle1" component="div">
                    <b>Family: </b> {logDetail.family}
                  </Typography>
                  <Typography variant="subtitle1" component="div">
                    <b>Genus: </b> <i>{logDetail.genus}</i>
                  </Typography>
                  <Typography variant="subtitle1" component="div">
                    <b>Species: </b>{" "}
                    <i>{`${logDetail.genus} ${logDetail.species}`}</i>
                  </Typography>
                  <Typography variant="subtitle1" component="div">
                    <b>Author: </b> {logDetail.author}
                  </Typography>
                  <Typography variant="subtitle1" component="div">
                    <b>Publish year:</b> {logDetail.publish_year}
                  </Typography>
                  <Typography variant="subtitle1" component="div">
                    <b>Country:</b> {logDetail.country}
                  </Typography>
                  <Typography variant="subtitle1" component="div">
                    <b>Other country:</b> {logDetail.country_other}
                  </Typography>
                  <Typography variant="subtitle1" component="div">
                    <b>Altitude: </b> {logDetail.altitude}
                  </Typography>
                  <Typography variant="subtitle1" component="div">
                    <b>Method: </b> {logDetail.method}
                  </Typography>
                  <Typography variant="subtitle1" component="div">
                    <b>Habitat: </b> {logDetail.habitat}
                  </Typography>
                  <Typography variant="subtitle1" component="div">
                    <b>Microhabitat: </b> {logDetail.microhabitat}
                  </Typography>
                  <Typography variant="subtitle1" component="div">
                    <b>Designate: </b> {logDetail.designate}
                  </Typography>
                  <List>
                    {logDetail.location &&
                      logDetail.location.map((val2, index2) => (
                        <ListItem
                          key={index2}
                          disablePadding
                          sx={{ paddingLeft: "20px" }}
                        >
                          <ListItemText
                            primary={
                              <Grid container justifyContent="space-between">
                                <Grid item xs={12} md={6} lg={3}>
                                  <Typography
                                    variant="subtitle1"
                                    component="div"
                                  >
                                    <b>Province: </b>
                                    <br />
                                    {province &&
                                      province.find(
                                        (item) =>
                                          item.id == parseInt(val2.province)
                                      ).name_en}
                                  </Typography>
                                </Grid>
                                <Grid item xs={12} md={6} lg={3}>
                                  <Typography
                                    variant="subtitle1"
                                    component="div"
                                  >
                                    <b>District: </b>
                                    <br />
                                    {district &&
                                      district.find(
                                        (item) =>
                                          item.id == parseInt(val2.district)
                                      ).name_en}
                                  </Typography>
                                </Grid>
                                <Grid item xs={12} md={6} lg={3}>
                                  <Typography
                                    variant="subtitle1"
                                    component="div"
                                  >
                                    <b>Locality: </b> <br />
                                    {val2.locality}
                                  </Typography>
                                  <br />
                                </Grid>
                                <Grid item xs={12} md={6} lg={3}>
                                  <Typography
                                    variant="subtitle1"
                                    component="div"
                                  >
                                    <b>Position: </b>
                                    <br />
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
                  <Typography variant="subtitle1" component="div">
                    <b>Paper referance: </b>{" "}
                    {logDetail.paper.map((item) => {
                      return item.name + ", ";
                    })}
                  </Typography>
                  {logDetail.image &&
                    logDetail.image.map((image, index) => (
                      <img
                        key={index}
                        src={`/${image.path}`}
                        // width="100%"
                        style={{
                          maxHeight: "360px",
                          width: "auto",
                          margin: "5px",
                          padding: "5px",
                          border: "1px solid #b8b8b8",
                        }}
                      />
                    ))}
                </DialogContent>
              </Dialog>
            )}
          </Container>
        </ThemeProvider>
      </StyledEngineProvider>
    </div>
  );
};

export default Manage;
