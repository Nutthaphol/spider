import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const MapView = ({ listEx, listNormal, zoom }) => {
  const [position_, setPosition_] = useState([]);
  useEffect(() => {
    if (listEx) {
      let data = [];
      for (let i = 0; i < listEx.length; i++) {
        for (let j = 0; j < listEx[i].address.length; j++) {
          data.push(listEx[i].address[j]);
        }
      }
      setPosition_(data);
    }
  }, [listEx]);
  return (
    <MapContainer className="map-view" center={[13, 100]} zoom={zoom || 5}>
      {/* {console.log("listEx", listEx)} */}

      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {position_ &&
        position_
          .filter((item) => {
            console.log("parseFloat(item.lat)", parseFloat(item.lat));
            console.log("parseFloat(item.long)", parseFloat(item.long));
            console.log(
              !isNaN(parseFloat(item.lat)) && !isNaN(parseFloat(item.long))
            );
            if (!isNaN(parseFloat(item.lat)) && !isNaN(parseFloat(item.long))) {
              return true;
            } else {
              return false;
            }
          })
          .map((val, index) => (
            <Marker
              key={index}
              position={[parseFloat(val.lat), parseFloat(val.long)]}
            >
              <Popup>{val.name}</Popup>
            </Marker>
          ))}
    </MapContainer>
  );
};

export default MapView;
