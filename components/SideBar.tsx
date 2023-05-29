"use client";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const SideBar = ({}) => {
  const [activeTab, setActiveTab] = useState<
    "home" | "map" | "setting" | string
  >("");
  useEffect(() => {
    setActiveTab(window.location.pathname.replace("/", ""));
  }, []);
  return (
    <div className="fixed dark:bg-black dark:text-white bottom-0 justify-around z-40 w-full h-20 md:pt-14 bg-white md:h-full flex md:flex-col items-center md:left-0 md:top-0 md:w-20">
      <Link
        href={"/"}
        onClick={() => setActiveTab("home")}
        className={`cursor-pointer rounded-full w-7 h-7 p-2  flex justify-center items-center  box-content ${
          activeTab === "home" && "bg-blue-500 transition-all duration-200"
        }`}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className={`mb-0.5 w-6 h-6 text-gray-900 dark:text-white  ${
            activeTab === "home" && "text-white"
          }`}>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
          />
        </svg>
      </Link>
      <Link
        href={"map"}
        onClick={() => setActiveTab("map")}
        className={`cursor-pointer text-gray-800 dark:text-white rounded-full w-7 h-7 p-2  flex justify-center items-center  box-content ${
          activeTab === "map" &&
          "bg-blue-500 text-white  dark:text-white transition-all duration-200"
        }`}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className={` w-6 h-6 `}>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
          />
        </svg>
      </Link>
    </div>
  );
};
export default SideBar;
