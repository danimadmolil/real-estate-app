"use client";
import React, { useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Mapcon,
  ZoomControl,
} from "react-leaflet";

export default function Map() {
  const [geoData, setGeoData] = useState({ lat: 64.536634, lng: 16.779852 });

  return (
    <MapContainer
      center={[geoData.lat, geoData.lng]}
      zoom={12}
      zoomControl={false}
      style={{ height: "100%", width: "100%" }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {geoData.lat && geoData.lng && (
        <Marker position={[geoData.lat, geoData.lng]} />
      )}
      <ZoomControl position="bottomright" />
    </MapContainer>
  );
}
