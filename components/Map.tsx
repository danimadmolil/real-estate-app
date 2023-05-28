"use client";
import React, { useCallback, useEffect, useState } from "react";
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
import L, { LatLngBounds, LeafletEvent, Map } from "leaflet";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/effect-cube";
import "swiper/css/effect-cards";
import "swiper/css/effect-creative";
//@ts-ignore
import { CAF } from "caf";
import { useRef } from "react";
import LoadingAnimation from "./LoadingAnimation";
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
var token = new CAF.cancelToken();
var getReqToken = CAF.tokenCycle();
let controller = new AbortController();

export default function Map() {
  const [loading, setLoading] = useState<boolean>(false);
  const [map, setMap] = useState<Map | undefined>();
  const [currentPosition, setCurrentPosition] = useState({
    lat: 30.555,
    lng: 49.1679,
  });
  const [listings, setListings] = useState<List[] | []>([]);
  const [bounds, setBounds] = useState<LatLngBounds | undefined>();

  const popup = useRef(null);
  const main = useRef<(signal: string, url: string) => {} | undefined>();
  const getListings = useCallback(() => {
    //@ts-ignore
    return function* getListings(signal, url) {
      window.dispatchEvent(new Event("resize"));
      try {
        setLoading(true);
        //@ts-ignore
        const response = yield fetch(url, { signal: controller.signal });

        //@ts-ignore
        const listings = yield response.json();
        console.log("before state change");
        //@ts-ignore
        setListings(listings);
        console.log("set listings");
        setTimeout(() => {
          console.log("loading off");
          setLoading(false);
        }, 1800);
      } catch (e) {
        setTimeout(() => {
          //todo show error notification here
          setLoading(false);
        }, 1800);

        //todo handle error here
      }
    };
  }, []);
  const onMove = useCallback((e: LeafletEvent) => {
    console.log("target", e.target);
    const _bounds = e.target.getBounds();
    setBounds(_bounds as LatLngBounds);
    console.log("map", _bounds);
  }, []);
  useEffect(() => {
    if (typeof window !== undefined) {
      console.log("bounding change", bounds);
      var cancelToken = getReqToken();
      // controller.abort("cancel pending requests!!Q!");

      setTimeout(() => {
        if (main) {
          if (typeof main.current === "function") {
            main.current(
              cancelToken,
              `/api/listing?nLng=${bounds?.getNorthEast().lng}&nLat=${
                bounds?.getNorthEast().lat
              }&sLng=${bounds?.getSouthWest().lng}&sLat=${
                bounds?.getSouthWest().lat
              }`
            );
          }
        }
      }, 500);
    }
  }, [
    bounds?.getNorthEast()?.lat,
    bounds?.getNorthEast()?.lng,
    bounds?.getSouthWest()?.lat,
    bounds?.getSouthWest()?.lng,
  ]);
  useEffect(() => {
    if (map) {
      setBounds(map.getBounds());
      map.locate().on("locationfound", function (e) {
        setCurrentPosition(e.latlng);
        map.flyTo(e.latlng, map.getZoom());
        const radius = e.accuracy;
        const circle = L.circle(e.latlng, radius);
        circle.addTo(map);
        setBounds(map.getBounds());
        // setBbox(e.bounds.toBBoxString().split(","));
      });
      map.on("moveend", onMove);
      return () => {
        map.off("moveend", onMove);
      };
    }
  }, [map]);

  useEffect(() => {
    console.log("popup conteianre", popup.current);
    const _main = CAF(getListings());
    main.current = _main;

    // getListings();
  }, []);
  return (
    <>
      {loading && <LoadingAnimation />}
      <MapContainer
        key={"map"}
        ref={setMap}
        center={[currentPosition.lat, currentPosition.lng]}
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
                html: `<div class="  w-3 h-3 bg-blue-600 rounded-full"> </div>`,
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
    </>
  );
}
