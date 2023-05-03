"use client";
import Image from "next/image";
import { Inter } from "next/font/google";
import Header from "@/components/Header";
import SideBar from "@/components/SideBar";
import OverLay from "@/components/OverLay";
import { Suspense } from "react";
import { useEffect, useState, useRef } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
const inter = Inter({ subsets: ["latin"] });

const IndexPage = () => {
  const [isThereWindow, setIsThereWindow] = useState(false);

  useEffect(() => {
    setIsThereWindow(true);
  }, []);
  return (
    <div className="relative w-full h-full overflow-hidden ">
      <img
        className="z-10 pointer-events-none select-none  w-full h-full absolute left-0 top-0 object-cover"
        src="https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/751797166329585.6416aa756b4ad.png"
      />
      {/** overlay */}
      <div className="absolute left-0 top-0 z-20 w-full h-full ">
        {/* <motion.div
            transition={{ duration: 1 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-28 h-24 bg-gray-900"></motion.div> */}
        <div className="flex justify-center  content-center relative left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          {[
            "R",
            "E",
            "A",
            "L",
            "",
            "E",
            "S",
            "T",
            "A",
            "T",
            "",
            "A",
            "P",
            "P",
          ].map(
            (letter, index) =>
              isThereWindow && (
                <motion.div
                  key={index}
                  transition={{ duration: 0.35, delay: 0.1 * (index / 3) }}
                  initial={{ opacity: 0, y: "200px" }}
                  animate={{ opacity: 1, y: "0px", scale: 1 }}>
                  <p
                    className={`text-7xl font-bold text-black ${
                      letter === "" ? "mr-7" : "mr-2"
                    }`}>
                    {letter}
                  </p>
                </motion.div>
              )
          )}
        </div>
      </div>
    </div>
  );
};
export default IndexPage;
