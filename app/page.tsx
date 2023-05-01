//@ts-nocheck

import Image from "next/image";
import { Inter } from "next/font/google";
import Header from "@/components/Header";
import SideBar from "@/components/SideBar";
import OverLay from "@/components/OverLay";
import Map from "@/components/Map";
import { Suspense } from "react";
import "leaflet/dist/leaflet.css";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Header
        renderBrand={() => (
          <div className="flex">
            <h1 className="dark:text-white text-gray-950">Real Estate App</h1>
          </div>
        )}
        renderMen={() => (
          <nav
            className="ml-auto h-full w-full flex max-w-7xl items-center justify-between "
            aria-label="Global">
            <div className="flex w-1/2 items-center p-1 rounded-lg bg-gray-300 search">
              <div className="flex w-2/3 m-auto">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 cursor-pointer text-gray-700">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                  />
                </svg>
                <input
                  placeholder="global search ..."
                  className="w-full text-gray-800 placeholder:text-gray-700  bg-gray-300 border-none pl-4 focus:border-none focus:outline-none"
                />
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 ml-auto cursor-pointer p-1 text-gray-700">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"
                />
              </svg>
            </div>
            <div className="items-center justify-between flex ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 pl-4 text-gray-900 box-content cursor-pointer">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 pl-4 text-gray-900 box-content cursor-pointer">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5A3.375 3.375 0 006.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0015 2.25h-1.5a2.251 2.251 0 00-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 00-9-9z"
                />
              </svg>
            </div>
          </nav>
        )}
      />
      <SideBar />
      <Suspense fallback={<OverLay.FallBack />}>
        <OverLay key={"map-overlay"} />
      </Suspense>
      <div className="relative z-[5] h-screen w-screen  overflow-hidden pt-14 pl-20">
        <Map />
      </div>
    </>
  );
}
