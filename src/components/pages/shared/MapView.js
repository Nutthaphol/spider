import { Box } from "@mui/material";
import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { ThemeProvider, StyledEngineProvider, createTheme } from "@mui/material/styles";

import makeStyles from '@mui/styles/makeStyles';

const theme = createTheme();

const useStyles = makeStyles((theme) => ({
  mapStyle: {
    "& .leaflet-container": {
      width: "100%",
      height: "50vh",
    },
  },
}));

const MapView = ({ listPosition, zoom, styles }) => {
  const classes = useStyles();
  useEffect(() => {
    if (!styles) {
      let styles = {};
    }
  }, []);
  styles["width"] = "100%";
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <Box
          sx={{
            "& .leaflet-container": styles,
          }}
        >
          <MapContainer className="map-view" center={[13, 100]} zoom={zoom || 5}>
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {listPosition &&
              listPosition.map((val) => (
                <Marker key={val.position_id} position={[val.lat_, val.long_]}>
                  <Popup>{val.position_name}</Popup>
                </Marker>
              ))}
          </MapContainer>
        </Box>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default MapView;
