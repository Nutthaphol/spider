import React, { useEffect, useState } from "react";
import {
  ThemeProvider,
  StyledEngineProvider,
  createTheme,
} from "@mui/material/styles";
import makeStyles from "@mui/styles/makeStyles";
import { Button, Container, Divider } from "@material-ui/core";
import { TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import detailService from "../../../services/detail.service";
import { DetailsSharp } from "@mui/icons-material";
import imageService from "../../../services/image.service";
import familyService from "../../../services/family.service";
import genusService from "../../../services/genus.service";
import speciesService from "../../../services/species.service";

const theme = createTheme();

const CheckData = () => {
  const [id, setId] = useState();
  const [detail, setDetail] = useState();
  const [image, setImage] = useState();

  useEffect(() => {}, []);

  const handleOnClick = async () => {
    const tmpDetail = await detailService.getDetail(id);
    const tmpImage = await imageService.getFromDetail(id);

    const family_ = await familyService.getFamily(tmpDetail.family_id);
    tmpDetail.family = family_[0].name;
    const genus_ = await genusService.getGenus(tmpDetail.genus_id);
    tmpDetail.genus = genus_[0].name;
    const species_ = await speciesService.getSpecies(tmpDetail.species_id);
    tmpDetail.species = species_[0].name;
    setDetail(tmpDetail);
    setImage(tmpImage);
  };
  return (
    <div className={`page`}>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <Container maxWidth="lg">
            <Box sx={{ display: "flex" }}>
              <TextField
                size="small"
                onChange={(e) => setId(parseInt(e.target.value))}
                label="id detail"
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
            {detail && (
              <Box>
                <Typography variant="subtitle1">{detail.family}</Typography>
                <Typography variant="subtitle1">{detail.genus}</Typography>
                <Typography variant="subtitle1">{detail.species}</Typography>
                <Typography variant="subtitle1">{detail.author}</Typography>
                <Typography variant="subtitle1">
                  {detail.publish_year}
                </Typography>
                <Typography variant="subtitle1">
                  {detail.country_other}
                </Typography>
                <Typography variant="subtitle1">{detail.altitude}</Typography>
                <Typography variant="subtitle1">{detail.method}</Typography>
                <Typography variant="subtitle1">{detail.habitat}</Typography>
                <Typography variant="subtitle1">
                  {detail.microhabitat}
                </Typography>
                <Typography variant="subtitle1">{detail.designate}</Typography>
              </Box>
            )}
            {image &&
              image.map((image, index) => (
                <img
                  key={index}
                  src={image.path}
                  //   width="100%"
                  style={{ maxHeight: "360px", width: "auto" }}
                />
              ))}
          </Container>
        </ThemeProvider>
      </StyledEngineProvider>
    </div>
  );
};

export default CheckData;
