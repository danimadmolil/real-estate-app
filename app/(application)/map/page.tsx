import OverLay from "@/components/OverLay";
import React, { Suspense } from "react";
import dynamic from "next/dynamic";
const Map = dynamic(() => import("../../../components/Map"), {
  ssr: false,
});
const MapPage = () => {
  return (
    <>
      {/* <Suspense fallback={<OverLay.FallBack />}> */}
        <OverLay key={"map-overlay"} />
      {/* </Suspense> */}
      <div className="relative z-[5] h-full w-full  overflow-hidden  ">
        <Map />
      </div>
    </>
  );
};
export default MapPage;
