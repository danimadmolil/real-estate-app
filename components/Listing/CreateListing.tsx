"use client";
import { Fragment, useRef } from "react";
import { title } from "process";
import React, { ChangeEvent, useEffect, useContext, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  ExclamationTriangleIcon,
  LockClosedIcon,
} from "@heroicons/react/24/outline";
import Input from "../Input";
import Select from "../Select";
import Map from "../Map";
import LocationPicker from "../LocationPicker";
import GeneralInput from "../GeneralInput";
type Listing = {
  id: number;
  title: string;
  createdBy: { name: string };
};
type FormType = {
  title?: string;
  address?: string;
  city?: string;
  country?: string;
  streetAddress?: string;
  county?: string;
  postalCode?: string;
  description?: string;
  price?: string;
  bed?: string;
};
export default function CreateListing() {
  const [openDialog, setOpenDialog] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [formData, setFormData] = useState<FormType>({});
  const [listings, setListings] = useState<Listing[] | []>([]);
  const cancelButtonRef = useRef(null);
  const [submitError, setSubmitError] = useState("");
  const [openMap, setOpenMap] = useState(false);
  useEffect(() => {
    (async () => {
      const response = await fetch("/api/listing");
      const _listings = await response.json();
      if (_listings && _listings.length) {
        setListings(_listings);
      }
    })();
  }, []);
  // console.log(formData);
  async function handleUpload() {
    setSubmitLoading(true);
    try {
      const createdListing = await fetch("/api/listing", {
        method: "post",
        body: JSON.stringify(formData),
      }).then((res) => res.json());
      setOpenDialog(false);
      setListings([createdListing]);
      setSubmitError("");
    } catch (e) {
      setSubmitLoading(false);
      setSubmitError("failed");
    }
  }
  return (
    <>
      <Transition.Root show={openDialog} as={Fragment}>
        <Dialog
          as="div"
          className={`relative z-10 `}
          initialFocus={cancelButtonRef}
          onClose={setOpenDialog}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0">
            <div className="fixed inset-0 bg-gray-700 backdrop-blur-md bg-opacity-40 transition-opacity" />
          </Transition.Child>

          <div className="fixed pt-16 pb-16 md:pb-0 h-full inset-0 z-10 overflow-y-auto">
            <div
              className={`flex min-h-full items-end justify-center transform-gpu p-4 text-center sm:items-center sm:p-0 `}>
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
                <Dialog.Panel className=" relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div
                    className={`absolute w-full flex transform-gpu duration-200  h-full  ${
                      openMap ? "translate-x-0" : "translate-x-full"
                    }`}>
                    <div
                      onClick={(e) => e.stopPropagation()}
                      className="cursor-pointer rounded-full bg-blue-700 w-12 h-12 z-[500] absolute inset-3 flex justify-center items-center text-blue-200">
                      <svg
                        onClick={() => setOpenMap(false)}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className=" w-6 h-6  cursor-pointer">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15.75 19.5L8.25 12l7.5-7.5"
                        />
                      </svg>
                    </div>

                    <div className="relative w-full h-full">
                      <LocationPicker
                        onLocationSelected={(
                          locationInfo: {
                            address: {
                              city: string;
                              road: string;
                              country: string;
                              state: string;
                            };
                            addresstype: string;
                          },
                          location: { lat: string; lng: string }
                        ) => {
                          setFormData((prevState) => ({
                            ...prevState,
                            city: locationInfo.address.town,
                            location,
                            county: locationInfo.address.state,
                            address:
                              locationInfo.address.state +
                                " - " +
                                locationInfo.address.town +
                                " - " +
                                locationInfo?.address[
                                  locationInfo?.addresstype
                                ] || "",
                          }));
                        }}
                        setFormData={setFormData}
                        label="location"
                      />
                    </div>
                  </div>
                  <div
                    className={`bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4 transition-transform transform-gpu duration-200 ${
                      openMap ? "-translate-x-full" : "translate-x-"
                    }`}>
                    <div className="sm:flex sm:items-start">
                      <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                        <ExclamationTriangleIcon
                          className="h-6 w-6 text-green-600"
                          aria-hidden="true"
                        />
                      </div>
                      <div
                        className={`mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left w-full `}>
                        <Dialog.Title
                          as="h3"
                          className="text-base font-semibold leading-6 text-gray-900">
                          Create New Listing
                        </Dialog.Title>
                        <GeneralInput
                          value={(formData && formData.title) || ""}
                          label="title"
                          inputProps={{
                            onChange: (e) =>
                              setFormData((prevState) => ({
                                ...prevState,
                                title: e.target.value,
                              })),
                          }}
                          inputType="text"
                        />
                        <Select
                          onChange={(value) =>
                            setFormData((prevState) => ({
                              ...prevState,
                              type: value,
                            }))
                          }
                          className="pb-3"
                          label={"type"}
                          items={[
                            { id: 1, name: "Rent" },
                            { id: 2, name: "Sell" },
                          ]}
                          initialIndex={0}
                        />
                        <Select
                          onChange={(value) =>
                            setFormData((prevState) => ({
                              ...prevState,
                              category: value,
                            }))
                          }
                          className="pb-3"
                          label={"category"}
                          items={[
                            {
                              id: 1,
                              name: "Apartment",
                              avatar: () => (
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
                                    d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z"
                                  />
                                </svg>
                              ),
                            },
                            {
                              id: 2,
                              name: "House",
                              avatar: () => (
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
                                    d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                                  />
                                </svg>
                              ),
                            },
                            {
                              id: 2,
                              name: "Gust House",
                              avatar: () => (
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
                                    d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1m1.5.5l-1.5-.5M6.75 7.364V3h-3v18m3-13.636l10.5-3.819"
                                  />
                                </svg>
                              ),
                            },
                          ]}
                          initialIndex={0}
                        />
                        <GeneralInput
                          inputType="custom"
                          label="city"
                          renderInput={() => (
                            <div className="flex justify-between items-center">
                              <GeneralInput
                                value={(formData && formData.city) || ""}
                                inputType="text"
                                inputProps={{
                                  onChange: (e) => {
                                    console.log("city", e.target.value);
                                    setFormData((prevState) => ({
                                      ...prevState,
                                      city: e.target.value,
                                    }));
                                  },
                                }}
                              />
                              <svg
                                onClick={() => setOpenMap(true)}
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-6 h-6 text-gray-800 cursor-pointer">
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
                            </div>
                          )}
                        />
                        <GeneralInput
                          value={(formData && formData.county) || ""}
                          inputType="text"
                          label="county"
                          inputProps={{
                            onChange: (e) => {
                              setFormData((prevState) => ({
                                ...prevState,
                                county: e.target.value,
                              }));
                            },
                          }}
                        />
                        <GeneralInput
                          value={(formData && formData.address) || ""}
                          inputType="text"
                          label="address"
                          inputProps={{
                            onChange: (e) => {
                              setFormData((prevState) => ({
                                ...prevState,
                                address: e.target.value,
                              }));
                            },
                          }}
                        />
                        <GeneralInput
                          value={(formData && formData.description) || ""}
                          label="description"
                          inputProps={{
                            onChange: (e) =>
                              setFormData((prevState) => ({
                                ...prevState,
                                description: e.target.value,
                              })),
                          }}
                          inputType="multiLineText"
                        />
                        <GeneralInput
                          value={(formData && formData.price) || ""}
                          label="price"
                          inputProps={{
                            onChange: (e) =>
                              setFormData((prevState) => ({
                                ...prevState,
                                price: e.target.value,
                              })),
                          }}
                          inputType="text"
                        />
                        <GeneralInput
                          value={(formData && formData.bed) || ""}
                          label="bed"
                          inputProps={{
                            onChange: (e) =>
                              setFormData((prevState) => ({
                                ...prevState,
                                bed: e.target.value,
                              })),
                          }}
                          inputType="text"
                        />
                        <GeneralInput
                          value={(formData && formData.postalCode) || ""}
                          label="postalCode"
                          inputProps={{
                            onChange: (e) =>
                              setFormData((prevState) => ({
                                ...prevState,
                                postalCode: e.target.value,
                              })),
                          }}
                          inputType="text"
                        />
                      </div>
                    </div>
                  </div>
                  {
                    /**Error message */
                    !!submitError && (
                      <div className="w-[90%] relative left-1/2 -translate-x-1/2 rounded-sm  bg-red-200 flex justify-center items-center">
                        {submitError}
                      </div>
                    )
                  }
                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 justify-between">
                    <button
                      type="button"
                      className="inline-flex relative px-6 w-full justify-center items-center rounded-md bg-blue-600 cursor-pointer  py-2 text-sm font-semibold text-white shadow-sm  hover:bg-blue-500 sm:ml-3 sm:w-auto"
                      onClick={() => {
                        handleUpload();
                      }}>
                      {
                        /** spinner */
                        submitLoading && (
                          <div
                            className="absolute left-2 animate-spin inline-block w-3 h-3 border-[2px] border-current border-t-transparent text-white rounded-full"
                            role="status"
                            aria-label="submitLoading"></div>
                        )
                      }
                      Publish
                    </button>
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                      onClick={() => {
                        setOpenDialog(false);
                        setFormData({});
                        setSubmitError(false);
                        setSubmitLoading(false);
                      }}
                      ref={cancelButtonRef}>
                      Cancel
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>

      <div>
        <div
          onClick={() => setOpenDialog(true)}
          className="ml-4 rounded-md w-36 h-[40px] cursor-pointer bg-blue-500 text-white hover:bg-blue-400 flex items-center justify-center">
          Create New
        </div>
        <div className="h-full grid grid-rows-[1fr,6fr] bg-white rounded-md p-4 text-gray-900">
          <p className="text-xl ">Active Listings</p>
          {/** listings container */}
          <div className="flex py-2 w-full h-full overflow-x-scroll">
            {listings.map((listing) => (
              <div
                key={listing?.id}
                className="flex-shrink-0 w-40 h-full flex bg-gray-300 rounded-md ml-4"></div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
