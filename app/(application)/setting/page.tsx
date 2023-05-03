import React from "react";

const SettingPage = () => {
  const agentDetail = [
    { title: "Agency", value: "All American Real Estate" },
    { title: "Agent License", value: "1342 7946 0097 324" },
    { title: "Tax Number", value: "TN 34C0 675R PQ34" },
    {
      title: "Service area",
      value: "Chicago, Los Angeles,Miami beach, New York",
    },
  ];
  return (
    <div className=" w-full gap-5 h-full bg-gray-50 p-2 grid sm:grid-cols-[1fr]   1400:grid-cols-[3fr,1fr]">
      {/** col1 */}
      <div className="grow-0 h-full gap-5 shrink-0  rounded-lg w-full grid 1600:grid-rows-[3fr,1.8fr]">
        {/** col1 row1 (user , Agent Detail) */}
        <div className="grid gap-5  900:grid-cols-[1fr,3fr]">
          {/** col1 row1 col1  (agent personal info)*/}
          <div className="flex flex-col p-5 bg-white  h-full rounded-lg relative text-gray-800">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 absolute right-2 top-2 cursor-pointer ">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
              />
            </svg>
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKkENwiLRgpBs8-E5WDx0sdgTntxqBfz05YCmaRy1GiFIOxFggCYAohhuzUwcGy5RbwDs&usqp=CAU"
              className="object-cover rounded-full w-28 h-28 mt-14 self-center "
            />
            <p className="1700:text-3xl 1800:text-4xl lg:text-2xl font-mono font-bold  self-center mt-4">
              Robin Williams
            </p>
            {/** divider */}
            <div className="border-t-[1px] border-t-gray-300 w-[100%] relative left-1/2 -translate-x-1/2 mt-4 "></div>
            {/** info container */}
            <div className="flex md:justify-center mt-5">
              <div className="flex flex-col w-1/3">
                <p>Age:</p>
                <p>City:</p>
                <p>State:</p>
                <p>Country:</p>
                <p>zip Code:</p>
                <p>Phone:</p>
                <p>Email:</p>
              </div>
              <div className="flex flex-col w-2/3">
                <p>26</p>
                <p>New york city</p>
                <p>New york</p>
                <p>USA</p>
                <p>1001</p>
                <p>+021 236 546 8890</p>
                <p>robin_williams@aar.com</p>
              </div>
            </div>
            <div className="border-t-[1px] border-t-gray-300 w-[100%] relative left-1/2 -translate-x-1/2 mt-4 "></div>
          </div>
          {/** col1 row1 col2 (agent detail)*/}
          <div className="p-4 bg-white h-full rounded-lg text-gray-800">
            <p>Agent detail</p>
            <div className="rounded-full border-t-[1px] border-t-gray-300 w-[100%] relative left-1/2 -translate-x-1/2 mt-4 "></div>
            <p className="text-justify mt-8">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Vel
              pretium lectus quam id leo in vitae turpis. Varius sit amet mattis
              vulputate. Sem nulla pharetra diam sit. Rutrum tellus pellentesque
              eu tincidunt tortor aliquam nulla facilisi cras.
            </p>
            {/** detail container */}
            {agentDetail.map((item, index) => (
              <div key={index} className="flex mt-4 text-sm items-center">
                <div className=" flex flex-col w-1/3">
                  <div className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6 text-blue-600">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <p className="ml-4 text-inherit">{item.title}</p>
                  </div>
                </div>
                <div className="flex flex-col w-2/3">{item.value}</div>
              </div>
            ))}
            <div className="border-t-[1px] border-t-gray-300 w-[100%] relative left-1/2 -translate-x-1/2 mt-4 "></div>
            <p className="mt-2">Property Status</p>
            <div className="flex mt-2 items-center justify-between">
              {[{ title: "Total Sell", value: "55" }].map((item, index) => (
                <div
                  key={index}
                  className="border-gray-100 shadow-sm p-4 border bg-white rounded-md h-20 w-[30%] flex  items-center">
                  <p>{item && item.title}</p>
                  <p>{item && item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/** col1 row2 (active listings) */}
        <div className="h-full grid grid-rows-[1fr,6fr] bg-white rounded-md p-4 text-gray-900">
          <p className="text-xl ">Active Listings</p>
          {/** listings container */}
          <div className="flex py-2 w-full h-full overflow-x-scroll">
            {new Array(20).fill(undefined).map((item, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-40 h-full flex bg-gray-300 rounded-md ml-4"></div>
            ))}
          </div>
        </div>
      </div>
      {/** col2 */}
      <div className="p-5 h-full w-full shrink-0 bg-white rounded-lg text-gray-900">
        {/** header */}
        <div className="flex items-center justify-between">
          <h2 className="text-2xl">My Files</h2>
          <div className="rounded-md w-36 h-[40px] cursor-pointer bg-blue-500 text-white hover:bg-blue-400 flex items-center justify-center">
            Add New
          </div>
        </div>
        {/** divider */}
        <div className="border-t-[1px] border-t-gray-300 w-[100%] relative left-1/2 -translate-x-1/2 mt-4 "></div>
        {[
          { title: "My Folder", sub: "Created on January 01,2021", badge: 4 },
          { title: "My Videos", sub: "Created on January 01,2021", badge: 2 },
          { title: "My Sounds", sub: "Created on January 01,2021", badge: 5 },
          { title: "My Pictures", sub: "Created on January 01,2021", badge: 7 },
          { title: "My Saves", sub: "Created on January 01,2021", badge: 1 },
        ].map((item, index) => (
          <div
            key={index}
            className="p-3 mt-4 shadow-sm rounded-xl hover:bg-gray-100 cursor-pointer bg-white border-gray-100 border flex items-center">
            {/** icon */}
            <div className="rounded-full shrink-0 flex items-center justify-center w-11 h-11 900:w-12 900:h-12 1600:w-16 1600:h-16 border-purple-500 bg-purple-200 text-purple-500">
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
                  d="M15 13.5H9m4.06-7.19l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z"
                />
              </svg>
            </div>
            {/** title and subtitle */}
            <div className=" ml-4 flex flex-col">
              <p className="text-black text-xl 1600:text-2xl">{item.title}</p>
              <p className="text-gray-600 text-lg 1600:text-xl">{item.sub}</p>
            </div>
            <div className="shrink-0 flex ml-auto items-center justify-center rounded-full bg-green-600 w-7 h-7">
              {item.badge}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default SettingPage;
