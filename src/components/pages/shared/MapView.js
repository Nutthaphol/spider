import { makeStyles } from "@material-ui/core";
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

const MapView = ({ listPosition }) => {
  const classes = useStyles();
  return (
    <div className={classes.mapStyle}>
      <MapContainer className="map-view" center={[13, 100]} zoom={5}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {listPosition.map((val) => (
          <Marker key={val.position_id} position={[val.lat_, val.long_]}>
            <Popup>{val.position_name}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapView;
