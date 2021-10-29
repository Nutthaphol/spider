import { makeStyles, Box } from "@material-ui/core";
import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const useStyles = makeStyles((theme) => ({
  mapStyle: {
    "& .leaflet-container": {
      width: "100%",
      height: "50vh",
    },
  },
}));

const MapView = ({ listPosition, height, zoom }) => {
  const classes = useStyles();
  return (
    // <div className={classes.mapStyle}>
    <Box
      sx={{
        "& .leaflet-container": {
          width: "100%",
          height: height,
        },
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
  );
};

export default MapView;
