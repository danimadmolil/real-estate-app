"use client";
import React, { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  ZoomControl,
  Polyline,
  Tooltip,
  Polygon,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

function LocationUtil({ setLocation }) {
  const map = useMapEvents({
    click: (e) => {
      setLocation(e.latlng);
    },
    locationfound: (location) => {
      console.log("location found:", location);
    },
  });
  return null;
}

export default function LocationPicker({
  style = {},
  setFormData,
  label = "",
  onLocationSelected,
}) {
  const [geoData, setGeoData] = useState({ lat: 30.555, lng: 49.1879 });
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(
    null
  );
  useEffect(() => {
    //info : quick fix for  miss loading images of leaf let map when use it in a dialog container box
    window.dispatchEvent(new Event("resize"));
  }, []);
  useEffect(() => {
    if (location) {
      (async () => {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${location.lat}&lon=${location.lng}`
        );
        const data = await response.json();
        
        if (typeof onLocationSelected === "function") {
          onLocationSelected(data,location);
        }
        console.log({ data });
      })();
    }
  }, [location]);
  return (
    <MapContainer
      center={[geoData.lat, geoData.lng]}
      zoom={18}
      zoomControl={false}
      style={{ height: "100%", width: "100%", ...style }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <LocationUtil setLocation={setLocation} />
      {location && <Marker position={location} icon={CustomIcon()}></Marker>}

      <ZoomControl position="bottomright" />
    </MapContainer>
  );
}
function CustomIcon() {
  const icon = L.icon({
    iconUrl: "https://img.icons8.com/3d-fluency/188/marker.png",
    iconSize: [40, 40],
    iconAnchor: [15, 15],
  });

  return icon;
}
