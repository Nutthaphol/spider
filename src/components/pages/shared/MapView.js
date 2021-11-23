import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const MapView = ({ listEx, listNormal, zoom }) => {
  const [position_, setPosition_] = useState();
  const [listNormal_, setlistNormal_] = useState(listNormal);
  const [center, setCenter] = useState();
  useEffect(() => {
    console.log("listEx", listEx);
    if (listEx) {
      let data = [];
      for (let i = 0; i < listEx.length; i++) {
        for (let j = 0; j < listEx[i].address.length; j++) {
          data.push(listEx[i].address[j]);
        }
      }
      setPosition_(data);
      setCenter([parseFloat(data[0].latitude), parseFloat(data[0].longitude)]);
    } else if (listNormal_) {
      let data = [];
      for (let i = 0; i < listNormal_.length; i++) {
        data.push(listNormal_[i]);
      }
      setPosition_(data);
      setCenter([parseFloat(data[0].latitude), parseFloat(data[0].longitude)]);
    } else {
      setCenter([13, 108]);
    }
  }, []);
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
              // console.log("parseFloat(item.latitude)", parseFloat(item.latitude));
              // console.log(
              //   "parseFloat(item.longitude)",
              //   parseFloat(item.longitude)
              // );
              // console.log(
              //   !isNaN(parseFloat(item.latitude)) &&
              //     !isNaN(parseFloat(item.longitude))
              // );
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
