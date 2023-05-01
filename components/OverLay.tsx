import React, { Suspense } from "react";

async function OverLay() {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  return (
    <div className="shadow-lg px-8 py-5 z-50 rounded-lg h-[calc(88%)] bg-white fixed left-24 top-20 w-[calc(40%)] ">
      {/** search bar container */}
      <div className="px-4 w-full  justify-between flex items-center h-20">
        <div className="pl-4  flex w-2/3 h-[58px] items-center p-1 rounded-lg bg-gray-200 search">
          <div className="flex w-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="animate-pulse w-6 h-6 cursor-pointer text-blue-600">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
            <input
              placeholder="global search ..."
              className="w-full text-gray-800 placeholder:text-gray-700  bg-gray-200 border-none pl-4 focus:border-none focus:outline-none"
            />
          </div>
        </div>
        <div className="flex px-2 box-content bg-gray-200 p-2 rounded-md w-[190px] items-center  justify-between">
          <div className="cursor-pointer  text-gray-900 w-[80px] h-[40px] rounded-md bg-white flex items-center justify-center">
            Buy
          </div>
          <div className="cursor-pointer w-[80px] h-[40px] rounded-md bg-blue-600 flex items-center justify-center">
            Rent
          </div>
        </div>
      </div>
    </div>
  );
}
//fallback component
OverLay.FallBack = () => {
  return (
    <div className="shadow bg-gray-200 px-8 py-5 z-50 rounded-lg h-[calc(88%)] bg-white fixed left-24 top-20 w-[calc(40%)] ">
      <div className="px-4 w-full  justify-between flex items-center h-20">
        <div className="animate-pulse pl-4  flex w-2/3 h-[58px] items-center p-1 rounded-lg bg-gray-300 search">
          <div className="flex w-full"></div>
        </div>
        <div className="animate-pulse flex px-2 box-content bg-gray-300 p-2 rounded-md w-[190px] h-[42px] items-center  justify-between"></div>
      </div>
    </div>
  );
};
export default OverLay;
