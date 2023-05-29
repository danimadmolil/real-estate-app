"use client";
import Link from "next/link";
import { Fragment, useContext, useEffect, useState } from "react";
import {
  Dialog,
  Menu,
  Disclosure,
  Popover,
  Transition,
} from "@headlessui/react";
import {
  ArrowPathIcon,
  Bars3Icon,
  ChartPieIcon,
  CursorArrowRaysIcon,
  FingerPrintIcon,
  SquaresPlusIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { AppContext } from "../context/Context";

interface User {
  id: number;
  email: string;
  name: string;
}
export default function UserMenuDropDown({ className }) {
  const [loading, setLoading] = useState(true);

  const { user, dispatch } = useContext(AppContext);
  console.log("context", user);
  useEffect(() => {
    (async () => {
      const _user: User | null = await fetch("/api/user", {
        method: "post",
      }).then((res) => {
        if (res.ok) {
          return res.json();
        }
        return null;
      });

      if (_user) {
        dispatch({ type: "SET_USER", payload: _user });
        setLoading(false);
      } else {
        dispatch({ type: "REMOVE_USER" });
        setLoading(false);
      }
    })();
  }, []);
  function handleSignOut() {
    setLoading(true);
    fetch("/api/signout", { method: "post", credentials: "include" })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((response) => {
        if (response.message === "Signed out SuccessFully") {
          dispatch({ type: "REMOVE_USER" });
          setLoading(false);
        } else {
          setLoading(false);
          //show error notification
        }
      })
      .catch((err) => {
        setLoading(false);
        //show error notification
      });
  }

  return !!user ? (
    <Menu
      as="div"
      className={` relative inline-block text-left ${className} dark:text-white`}>
      {({ open }) => (
        <>
          <div>
            <Menu.Button className="flex items-center space-x-2 focus:outline-none">
              <img
                className="w-8 h-8 rounded-full"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKkENwiLRgpBs8-E5WDx0sdgTntxqBfz05YCmaRy1GiFIOxFggCYAohhuzUwcGy5RbwDs&usqp=CAU"
                alt="User Avatar"
              />
              <span className="text-gray-800 dark:text-white">{user.name}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className={`w-6 h-6 dark:text-white ${
                  open ? "transform rotate-180" : ""
                } w-5 h-5 text-gray-500`}>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                />
              </svg>
            </Menu.Button>
          </div>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95">
            <Menu.Items className="absolute w-44 right-0 mt-2 origin-top-right dark:bg-black bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black  ring-opacity-5 focus:outline-none">
              <div className="px-1 py-1 ">
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      href="/setting"
                      className={`${
                        active
                          ? "bg-gray-100 text-gray-900 "
                          : "text-gray-700 dark:text-white cursor-pointer"
                      } flex items-center justify-between w-full px-2 py-2 text-sm`}>
                      <span>Account Settings</span>
                    </Link>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <a
                      onClick={handleSignOut}
                      className={`${
                        active
                          ? "bg-gray-100 text-gray-900"
                          : "text-gray-700 dark:text-white "
                      } flex items-center justify-between w-full px-2 py-2 text-sm cursor-pointer`}>
                      <span>Sign out</span>
                    </a>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  ) : loading === false ? (
    <>
      <Link
        href={"/signin"}
        className="w-28 h-8 bg-white rounded-md flex justify-center items-center pb-1 text-gray-800 cursor-pointer">
        SignIn
      </Link>
      <Link
        href={"/signup"}
        className="w-28 h-8 pb-1 bg-blue-600 hover:bg-blue-500 rounded-md flex justify-center items-center text-white cursor-pointer">
        SignUp
      </Link>
    </>
  ) : (
    <div className="w-56 h-8 animate-pulse ml-3  bg-gray-400 rounded-lg"></div>
  );
}
