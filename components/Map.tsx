"use client";
import React, { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  ZoomControl,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { createPortal } from "react-dom";
type List = {
  id: number;
  price: string;
  lat: number;
  lng: number;
  user: { name: string };
};
export default function Map() {
  const [geoData, setGeoData] = useState({ lat: 30.555, lng: 49.1879 });
  const [listings, setListings] = useState<List[] | []>([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch("/api/listing");
        const listings = await response.json();
        setListings(listings);
      } catch (e) {
        //todo handle error here
      }
    })();
  }, []);
  return (
    <MapContainer
      center={[geoData.lat, geoData.lng]}
      zoom={16}
      zoomControl={false}
      style={{ height: "100%", width: "100%" }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {listings &&
        listings.map((list: List) => (
          <Marker
            key={list.id}
            icon={L.divIcon({
              html: `<div id="house-overlay-${list.id}" class=" items-center  inline-flex rounded-full relative px-9  py-2 box-content bg-pink-50 text-xs font-medium text-pink-700 ring-1 ring-inset ring-pink-700/10"><span class="animate-ping origin-center  w-2 h-2 bg-green-400 rounded-full absolute left-[14px] top-[13px]"> </span><span>${list.price}$</span></div>`,
              className: "custom-div-icon",
              iconSize: [200, 100],
              iconAnchor: [0, 0],
            })}
            position={[list.lat, list.lng]}>
            <Popup>
              <div className=" w-56 p-3 h-36 pt-6 rounded-md bg-white shadow-lg flex">
                <div className="flex flex-col">
                  <div className="flex items-center">
                    {" "}
                    <img
                      className="inline-block h-6 w-6 rounded-full ring-2 ring-white"
                      src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt=""
                    />
                  </div>
                  <div className="flex justify-between items-center">
                    <p>price: </p>
                    <p className="ml-5 ">{`${list.price} $`}</p>
                  </div>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}

      <ZoomControl position="bottomright" />
    </MapContainer>
  );
}
