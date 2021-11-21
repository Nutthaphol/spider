import React, { useEffect, useState } from "react";
import {
  ThemeProvider,
  StyledEngineProvider,
  createTheme,
} from "@mui/material/styles";
import makeStyles from "@mui/styles/makeStyles";
import { Button, Container, Divider } from "@material-ui/core";
import { TextField, Typography } from "@mui/material";
import { border, Box } from "@mui/system";
import detailService from "../../../services/detail.service";
import { DetailsSharp } from "@mui/icons-material";
import imageService from "../../../services/image.service";
import familyService from "../../../services/family.service";
import genusService from "../../../services/genus.service";
import speciesService from "../../../services/species.service";
import locationService from "../../../services/location.service";
import addressService from "../../../services/address.service";
import paperService from "../../../services/paper.service";
import { useDispatch, useSelector } from "react-redux";
import { getAllProvinces } from "../../../actions/province";
import { getAllDistrict } from "../../../actions/district";

const theme = createTheme();

const CheckData = () => {
  const dispatch = useDispatch();
  const [id, setId] = useState();
  const [detail, setDetail] = useState();
  const { result: dbProvince } = useSelector((state) => state.province);
  const { result: dbDistrict } = useSelector((state) => state.district);

  useEffect(() => {
    dispatch(getAllProvinces());
    dispatch(getAllDistrict());
  }, []);

  const handleOnClick = async () => {
    const tmpDetail = id ? await detailService.getDetail(id) : false;

    if (tmpDetail) {
      const image_ = await imageService.getFromDetail(id);
      tmpDetail.image = image_;

      const family_ = await familyService.getFamily(tmpDetail.family_id);
      tmpDetail.family = family_[0].name;
      const genus_ = await genusService.getGenus(tmpDetail.genus_id);
      tmpDetail.genus = genus_[0].name;
      const species_ = await speciesService.getSpecies(tmpDetail.species_id);
      tmpDetail.species = species_[0].name;

      const location_ = await locationService.getLocation(id);
      for (let i = 0; i < location_.length; i++) {
        location_[i].address = await addressService.getAddress(location_[i].id);
      }
      tmpDetail.location = location_;

      const paper_ = await paperService.getPaper(id);
      tmpDetail.paper = paper_;

      console.log("tmp", tmpDetail);
    }
    setDetail(tmpDetail);
  };
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <div className={`page`}>
          <Container maxWidth="lg">
            <Box sx={{ display: "flex" }}>
              <TextField
                size="small"
                value={id ? id : ""}
                onChange={(e) => setId(parseInt(e.target.value))}
                label="id detail"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleOnClick();
                  }
                }}
              />
              <Box sx={{ flexGrow: 0.01 }} />
              <Button
                variant="contained"
                size="small"
                color="secondary"
                onClick={() => handleOnClick()}
              >
                submit
              </Button>
            </Box>
            <br />
            <Divider sx={{ marginTop: "5px", marginBottom: "5px" }} />
            <br />
            {detail ? (
              <Box>
                <Typography variant="subtitle1">
                  family: {detail.family}
                </Typography>
                <Typography variant="subtitle1">
                  genus: {detail.genus}
                </Typography>
                <Typography variant="subtitle1">
                  species: {detail.species}
                </Typography>
                <Typography variant="subtitle1">
                  author: {detail.author}
                </Typography>
                <Typography variant="subtitle1">
                  year: {detail.publish_year}
                </Typography>
                <Typography variant="subtitle1">
                  country: {detail.country}
                </Typography>
                <Typography variant="subtitle1">
                  other country {detail.country_other}
                </Typography>
                <Typography variant="subtitle1">
                  altitude: {detail.altitude}
                </Typography>
                <Typography variant="subtitle1">
                  method: {detail.method}
                </Typography>
                <Typography variant="subtitle1">
                  habitat: {detail.habitat}
                </Typography>
                <Typography variant="subtitle1">
                  microhabitat: {detail.microhabitat}
                </Typography>
                <Typography variant="subtitle1">
                  designate: {detail.designate}
                </Typography>

                {detail.location.map((val, index) => (
                  <Box key={index}>
                    <Typography variant="subtitle1" sx={{ flexGrow: 0.05 }}>
                      Location {index + 1}:
                    </Typography>
                    <Box sx={{ marginLeft: "2.5rem" }}>
                      <Typography variant="subtitle1">
                        province: {console.log("type of ", typeof val.province)}
                        {
                          dbProvince.find((item) => item.id == val.province)
                            .name_en
                        }
                        <br />
                        district:{" "}
                        {
                          dbDistrict.find((item) => item.id == val.district)
                            .name_en
                        }{" "}
                        <br />
                        locality: {val.locality}
                      </Typography>
                      {val.address.map((val2, index2) => (
                        <Box sx={{ marginLeft: "2.5rem" }} key={index2}>
                          <Typography variant="subtitle1">
                            address{index2 + 1}: {val2.name} <br />
                            latitude: {val2.latitude} <br />
                            longitude: {val2.longitude}
                          </Typography>
                        </Box>
                      ))}
                    </Box>
                  </Box>
                ))}

                {detail.paper.map((val, index) => (
                  <Typography variant="subtitle1" key={index}>
                    paper {index + 1} : {val.name}
                  </Typography>
                ))}

                {detail.image &&
                  detail.image.map((image, index) => (
                    <img
                      key={index}
                      src={image.path}
                      //   width="100%"
                      style={{
                        maxHeight: "360px",
                        width: "auto",
                        margin: "5px",
                        padding: "5px",
                        border: "1px solid #b8b8b8",
                      }}
                    />
                  ))}
              </Box>
            ) : (
              <Typography variant="h6">Not have information</Typography>
            )}
          </Container>
        </div>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default CheckData;
