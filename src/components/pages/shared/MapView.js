import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const MapView = ({ listEx, listNormal, zoom }) => {
  const [position_, setPosition_] = useState();
  const [center, setCenter] = useState();
  useEffect(() => {
    if (listEx) {
      let data = [];
      for (let i = 0; i < listEx.length; i++) {
        for (let j = 0; j < listEx[i].address.length; j++) {
          data.push(listEx[i].address[j]);
        }
      }
      setPosition_(data);
      setCenter([parseFloat(data[0].latitude), parseFloat(data[0].longitude)]);
    }
  }, [listEx]);
  return (
    <div style={{ height: "100%" }}>
      {position_ ? (
        <MapContainer
          className="map-view"
          center={[
            parseFloat(position_[0].latitude),
            parseFloat(position_[0].longitude),
          ]}
          zoom={zoom || 2}
        >
          {/* {console.log("listEx", listEx)} */}

          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {position_
            .filter((item) => {
              if (
                !isNaN(parseFloat(item.latitude)) &&
                !isNaN(parseFloat(item.longitude))
              ) {
                return true;
              } else {
                return false;
              }
            })
            .map((val, index) => (
              <Marker
                key={index}
                position={[parseFloat(val.latitude), parseFloat(val.longitude)]}
              >
                <Popup>{val.name}</Popup>
              </Marker>
            ))}
        </MapContainer>
      ) : (
        <MapContainer className="map-view" center={[13, 100]} zoom={zoom || 5}>
          {/* {console.log("listEx", listEx)} */}

          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        </MapContainer>
      )}
    </div>
  );
};

export default MapView;
