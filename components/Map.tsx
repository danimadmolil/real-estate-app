"use client";
import React, { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  ZoomControl,
} from "react-leaflet";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, EffectCreative, EffectCube, EffectCards } from "swiper";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/effect-cube";
import "swiper/css/effect-cards";
import "swiper/css/effect-creative";
import { createPortal } from "react-dom";
import { useRef } from "react";
type List = {
  id: number;
  title: string;
  description: string;
  address: string;
  bed: number;
  type: string;
  category: string;
  price: string;
  lat: number;
  lng: number;
  user: { name: string };
};
export default function Map() {
  const [geoData, setGeoData] = useState({ lat: 30.555, lng: 49.1879 });
  const [listings, setListings] = useState<List[] | []>([]);
  const popup = useRef(null);
  useEffect(() => {
    console.log("popup conteianre", popup.current);
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
              html: `<div id="house-overlay-${list.id}" class="bg-black text-white items-center  inline-flex rounded-full relative px-9  py-2 box-content rounded-bl-none  text-xs font-medium  ring-1 ring-inset ring-pink-700/10"><span class="animate-ping  origin-center  w-2 h-2 bg-red-500 rounded-full absolute left-[14px] top-[13px]"> </span><span>${list.price}$</span></div>`,
              className: "custom-div-icon",
              // iconSize: [200, 100],
              iconAnchor: [0, 0],
            })}
            position={[list.lat, list.lng]}>
            <Popup ref={popup}>
              <div className="w-[300px] w-auto p-3 h-auto pt-6 rounded-md bg-white shadow-lg flex">
                <div className="flex flex-col w-[300px]">
                  <div
                    onClick={(e) => e.stopPropagation()}
                    onMouseDown={(e) => e.stopPropagation()}
                    className="h-[200px] w-full flex items-center overflow-y-hidden overflow-hidden whitespace-nowrap">
                    <Swiper
                      grabCursor={true}
                      creativeEffect={{
                        prev: {
                          shadow: true,
                          translate: [0, 0, -400],
                        },
                        next: {
                          translate: ["100%", 0, 0],
                        },
                      }}
                      style={{ height: "100%" }}
                      centeredSlides={true}
                      effect="creative"
                      modules={[EffectCreative]}
                      spaceBetween={20}
                      slidesPerView={1}>
                      {list &&
                        list.images &&
                        Object.keys(JSON.parse(list.images)).map(
                          (key, index) => (
                            <SwiperSlide key={key} style={{ height: "100%" }}>
                              <img
                                className="h-full w-full px-1 rounded-xl overflow-hidden"
                                src={JSON.parse(list.images)[key]}
                              />
                            </SwiperSlide>
                          )
                        )}
                    </Swiper>

                    {/* <img
                      className="inline-block h-6 w-6 rounded-full ring-2 ring-white"
                      src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt=""
                    /> */}
                  </div>
                  <div className="flex h-6 justify-between items-center">
                    <p>Title: </p>
                    <p className="ml-5 ">{`${list.title}`}</p>
                  </div>
                  <div className="flex h-6 justify-between items-center">
                    <p>Address: </p>
                    <p className="ml-5 ">{`${list.address}`}</p>
                  </div>
                  <div className="flex h-6 justify-between items-center">
                    <p>Price: </p>
                    <p className="ml-5 ">{`${list.price} $`}</p>
                  </div>

                  <div className="flex h-6 justify-between items-center">
                    <p>Type: </p>
                    <p className="ml-5 ">{`${list.type} `}</p>
                  </div>

                  {list.bed && (
                    <div className="flex h-6 justify-between items-center">
                      <p>Bed: </p>
                      <p className="ml-5 ">{`${list.bed} `}</p>
                    </div>
                  )}
                </div>
              </div>
            </Popup>
          </Marker>
        ))}

      <ZoomControl position="bottomright" />
    </MapContainer>
  );
}
