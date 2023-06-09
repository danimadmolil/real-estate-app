import { Fragment, ReactNode, useEffect, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

interface Item {
  id: number;
  name: string;
  avatar?: () => ReactNode | string;
}
interface SelectProps {
  label?: string;
  initialIndex?: number;
  items?: Item[];
  className?: string;
  onChange?: (value: string) => void;
}
function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Select({
  label,
  initialIndex = 0,
  items = [],
  className,
  onChange,
}: SelectProps) {
  const [selected, setSelected] = useState(items[initialIndex]);
  useEffect(() => {
    console.log(selected);
    if (typeof onChange === "function") {
      onChange(selected.name);
    }
  }, [selected]);
  return (
    <Listbox value={selected} onChange={setSelected}>
      {({ open }) => (
        <>
          <Listbox.Label className="block text-sm font-medium leading-6  text-gray-900 dark:text-white">
            {label && label}
          </Listbox.Label>
          <div className={`relative mt-2 ${className}`}>
            <Listbox.Button className="relative w-full cursor-default rounded-md dark:text-white focus:ring-gray-800 dark:bg-gray-800 bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6">
              <span className="flex items-center">
                {(selected?.avatar && typeof selected.avatar === "string" && (
                  <img
                    src={selected.avatar}
                    alt=""
                    className="h-5 w-5 flex-shrink-0 rounded-full"
                  />
                )) ||
                  (selected.avatar && selected.avatar())}
                <span className="ml-3 block truncate">{selected.name}</span>
              </span>
              <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                <ChevronUpDownIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0">
              <Listbox.Options className="absolute dark:bg-gray-800  z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {items.map((item) => (
                  <Listbox.Option
                    key={item.id}
                    className={({ active }) =>
                      classNames(
                        active ? "bg-indigo-600 text-white" : "text-gray-900",
                        "relative cursor-default select-none py-2 pl-3 pr-9 dark:text-white"
                      )
                    }
                    value={item}>
                    {({ selected, active }) => (
                      <>
                        <div className="flex items-center">
                          {(item?.avatar && typeof item.avatar === "string" && (
                            <img
                              src={item.avatar}
                              alt=""
                              className="h-5 w-5 flex-shrink-0 rounded-full"
                            />
                          )) ||
                            (item?.avatar && item.avatar())}
                          <span
                            className={classNames(
                              selected ? "font-semibold" : "font-normal",
                              "ml-3 block truncate"
                            )}>
                            {item.name}
                          </span>
                        </div>

                        {selected ? (
                          <span
                            className={classNames(
                              active ? "text-white" : "text-indigo-600",
                              "absolute inset-y-0 right-0 flex items-center pr-4"
                            )}>
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  );
}
