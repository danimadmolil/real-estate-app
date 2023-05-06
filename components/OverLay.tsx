"use client";
import { useState } from "react";

const houseImages = [
  "https://mir-s3-cdn-cf.behance.net/project_modules/1400/f91cf8167512561.642aa42bc51f4.jpg",
  "https://mir-s3-cdn-cf.behance.net/project_modules/1400/bd9996168085059.643498594801b.jpg",
  "https://mir-s3-cdn-cf.behance.net/project_modules/1400/d5c78a169038929.6446383dc6e0b.jpg",
  "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/5bb19d160898491.63bcadb1164ef.jpg",
  "https://mir-s3-cdn-cf.behance.net/project_modules/1400/c472aa151661891.630fc8f207221.jpg",
  "https://mir-s3-cdn-cf.behance.net/project_modules/1400/d71650161025899.63be84437cb60.jpg",
];
const OverLay = () => {
  const [open, setOpen] = useState(false);

  return (
    <div
      style={{
        transition: open
          ? "clip-path 500ms 0.25s, transform 0.5s"
          : "transform 650ms 150ms , clip-path  0.6s",
        clipPath: open
          ? " circle(100% at 50% 50%)"
          : " circle(2rem at 50% 50%)",
      }}
      className={`
       will-change-[all]
      ${open ? "" : "origin-center -translate-x-1/3 translate-y-1/3  "} 
      shadow-lg  overflow-hidden px-4 md:px-8 py-5 z-50 rounded-lg h-[calc(88%)] bg-white fixed md:left-24 top-20 w-full md:w-[calc(60%)] lg:w-[60%]  xl:w-2/4`}>
      <div onClick={() => setOpen(false)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 text-gray-900 cursor-pointer">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
      <div
        onClick={() => {
          setOpen(true);
        }}
        className={`${
          open
            ? "opacity-0 transition-all duration-75 delay-[0.25s]"
            : "opacity-1 transition-all duration-0 delay-[0.6s]"
        }  left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 absolute z-[9999999] w-16 h-16 bg-blue-400 rounded-full flex items-center justify-center cursor-pointer `}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
      </div>
      {/** search bar container row */}
      <div className="w-full gap-3 flex flex-col  xl:grid xl:grid-cols-[2fr,1fr] xl:h-14 h-20 mb-8">
        {/** search input */}
        <div className="flex  h-full items-center p-1 rounded-lg bg-gray-100 search">
          <div className="flex h-full items-center w-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="px-3 box-content w-6 h-6 cursor-pointer text-blue-600">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
            <input
              placeholder="global search ..."
              className="w-full text-gray-800 placeholder:text-gray-700  bg-gray-100 h-full border-none pl-4 focus:border-none focus:outline-none"
            />
          </div>
        </div>
        {/** buy & rent buttons */}
        <div className="flex shrink px-2 box-content bg-gray-100 p-2 rounded-md   items-center  justify-between">
          <div className="cursor-pointer  text-gray-900 w-[80px] h-[40px] rounded-md bg-white flex items-center justify-center">
            Buy
          </div>
          <div className="cursor-pointer w-[80px] h-[40px] rounded-md bg-blue-600 flex items-center justify-center">
            Rent
          </div>
        </div>
      </div>
      {/** filters  */}
      <div className="items-center h-20 w-full bg-gray-100 flex justify-around rounded-md">
        {/** filter buttons */}
        <div className="text-gray-900 cursor-pointer w-10 md:w-[120px] xl:w-[145px] h-[50px] rounded-md bg-white border border-gray-300 shadow-sm flex items-center justify-center">
          All Price
        </div>
        <div className="cursor-pointer w-10 md:w-[120px] xl:w-[145px] h-[50px] rounded-md bg-blue-600 flex items-center justify-center">
          3-2 Bed
        </div>
        <div className="text-gray-900 cursor-pointer w-10 md:w-[120px] xl:w-[145px] h-[50px] rounded-md bg-white border border-gray-300 shadow-sm flex items-center justify-center">
          All Types
        </div>
        <div className="text-gray-900 cursor-pointer w-10 md:w-[120px] xl:w-[145px] h-[50px] rounded-md bg-white border border-gray-300 shadow-sm flex items-center justify-center">
          More Filters
        </div>
      </div>
      {/** result header */}
      <div className="flex items-center mt-8 h-20 w-full justify-between">
        <div className="flex items-center">
          <p className="text-5xl pr-4 text-gray-900">455</p>
          <p className="text-2xl text-gray-500 self-end">Result Found</p>
        </div>
        <a href="#" className="text-blue-500">
          Newest
        </a>
      </div>
      {/** result  */}
      <div className="h-[70%] overflow-y-scroll scroll-smooth pb-6 pr-4">
        <div className="grid gap-x-4 gap-y-7 grid-cols-1 lg:grid-cols-2 ">
          {houseImages.map((result, index) => {
            return (
              <div
                key={index}
                className="h-auto flex-col flex border-2 p-2 rounded-lg shadow-md ">
                <img
                  src={result}
                  className="object-cover h-52 w-full rounded-lg mb-4 shadow-lg"
                />
                <div className="flex  flex-col pl-4">
                  {/** name */}
                  <p className="text-gray-800 font-semibold text-lg">
                    Name Of The House
                  </p>
                  {/** price/period */}
                  <div className="flex">
                    <span className="text-blue-500">488$</span>
                    <span className="text-gray-600">/mon</span>
                  </div>
                  {/** divider */}
                  <div className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></div>
                  {/** attributes */}
                  <div className="flex justify-between">
                    <div className="w-8 box-content p-1 h-8 flex items-center justify-center rounded-full bg-blue-100">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        enableBackground="new 0 0 24 24"
                        height="24"
                        viewBox="0 0 24 24"
                        width="24">
                        <g>
                          <path d="M0,0h24v24H0V0z" fill="none" />
                        </g>
                        <g>
                          <g>
                            <path d="M16.5,12h-9c-0.55,0-1,0.45-1,1v1h11v-1C17.5,12.45,17.05,12,16.5,12z" />
                            <rect height="2" width="4" x="7.25" y="8.5" />
                            <rect height="2" width="4" x="12.75" y="8.5" />
                            <path d="M20,2H4C2.9,2,2,2.9,2,4v16c0,1.1,0.9,2,2,2h16c1.1,0,2-0.9,2-2V4C22,2.9,21.1,2,20,2z M19,17h-1.5v-1.5h-11V17H5v-3.83 c0-0.66,0.25-1.26,0.65-1.72V9c0-1.1,0.9-2,2-2H11c0.37,0,0.72,0.12,1,0.32C12.28,7.12,12.63,7,13,7h3.35c1.1,0,2,0.9,2,2v2.45 c0.4,0.46,0.65,1.06,0.65,1.72V17z" />
                          </g>
                        </g>
                      </svg>
                    </div>
                    <div className="w-8 box-content p-1 h-8 flex items-center justify-center rounded-full bg-blue-100">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        enableBackground="new 0 0 24 24"
                        height="24"
                        viewBox="0 0 24 24"
                        width="24">
                        <g>
                          <rect fill="none" height="24" width="24" />
                        </g>
                        <g>
                          <g>
                            <g>
                              <circle cx="7" cy="7" r="2" />
                            </g>
                            <g>
                              <path d="M20,13V4.83C20,3.27,18.73,2,17.17,2c-0.75,0-1.47,0.3-2,0.83l-1.25,1.25C13.76,4.03,13.59,4,13.41,4 c-0.4,0-0.77,0.12-1.08,0.32l2.76,2.76c0.2-0.31,0.32-0.68,0.32-1.08c0-0.18-0.03-0.34-0.07-0.51l1.25-1.25 C16.74,4.09,16.95,4,17.17,4C17.63,4,18,4.37,18,4.83V13h-6.85c-0.3-0.21-0.57-0.45-0.82-0.72l-1.4-1.55 c-0.19-0.21-0.43-0.38-0.69-0.5C7.93,10.08,7.59,10,7.24,10C6,10.01,5,11.01,5,12.25V13H2v6c0,1.1,0.9,2,2,2c0,0.55,0.45,1,1,1 h14c0.55,0,1-0.45,1-1c1.1,0,2-0.9,2-2v-6H20z" />
                            </g>
                          </g>
                        </g>
                      </svg>
                    </div>
                    <div className="w-8 box-content p-1 h-8 flex items-center justify-center rounded-full bg-blue-100">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        enableBackground="new 0 0 24 24"
                        height="24"
                        viewBox="0 0 24 24"
                        width="24">
                        <g>
                          <rect fill="none" height="24" width="24" />
                        </g>
                        <g>
                          <path d="M17,11V3H7v4H3v14h8v-4h2v4h8V11H17z M7,19H5v-2h2V19z M7,15H5v-2h2V15z M7,11H5V9h2V11z M11,15H9v-2h2V15z M11,11H9V9h2 V11z M11,7H9V5h2V7z M15,15h-2v-2h2V15z M15,11h-2V9h2V11z M15,7h-2V5h2V7z M19,19h-2v-2h2V19z M19,15h-2v-2h2V15z" />
                        </g>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
//fallback component
OverLay.FallBack = function FallBack() {
  return (
    <div className="shadow-lg overflow-hidden  px-8 py-5 z-50 rounded-lg h-[calc(88%)] bg-white fixed left-24 top-20 w-[calc(40%)] ">
      {/** overlay header */}
      <div className="w-full gap-3 flex flex-col  xl:grid xl:grid-cols-[2fr,1fr] xl:h-14 h-20 mb-8">
        {/** search input */}
        <div className="animate-pulse flex  h-full items-center p-1 rounded-lg bg-gray-300 search">
          <div className="animate-pulse px-3 ml-2  w-6 h-6 rounded-full cursor-pointer  bg-gray-500"></div>
        </div>
        {/** buy and rent button container */}
        <div className="animate-pulse flex shrink px-2 box-content bg-gray-300 p-2 rounded-md   items-center  justify-between">
          <div className="animate-pulse cursor-pointer  text-gray-900 w-[80px] h-[40px] rounded-md bg-gray-400 flex items-center justify-center"></div>
          <div className="animate-pulse cursor-pointer w-[80px] h-[40px] rounded-md bg-gray-400 flex items-center justify-center"></div>
        </div>
      </div>
      {/** filter */}
      <div className="animate-pulse h-20 w-full bg-gray-300 flex justify-around rounded-md"></div>
    </div>
  );
};

export default OverLay;
