"use client";

import { ReactNode, useState, useRef, ChangeEvent, DragEvent } from "react";

type ImageUploaderPropTypes = {
  children?: (files) => void;
  muli: boolean;
  label?: string;
};
export default function ImageUploader({
  children,
  muli = false,
  label,
}: ImageUploaderPropTypes) {
  const [files, setFiles] = useState<FileList | []>([]);
  const [dataUrls, setDataUrls] = useState<string[] | []>([]);
  const inputRef = useRef(null);
  const formData = useRef(new FormData());

  function handleFileChange(
    e: ChangeEvent<HTMLInputElement> | DragEvent<HTMLDivElement>
  ) {
    console.log(e);
    if (e.target.files) {
      setFiles([]);
      setDataUrls([]);
      formData.current.delete("files");
      setFiles(() => Array.from(e.target.files));
      Array.from(e.target.files).forEach((file, index) => {
        formData.current.append("files", file);
        let reader = new FileReader();
        reader.addEventListener("load", () => {
          console.log("result" + index, reader.result);
          setDataUrls((prev) => [...prev, reader.result]);
        });
        if (file) {
          reader.readAsDataURL(file);
        }
      });
    } else if (e.dataTransfer.files) {
      setFiles([]);
      setDataUrls([]);
      formData.current.delete("files");
      setFiles(() => Array.from(e.dataTransfer.files));
      Array.from(e.dataTransfer.files).forEach((file, index) => {
        formData.current.append("files", file);
        let reader = new FileReader();
        reader.addEventListener("load", () => {
          console.log("result" + index, reader.result);
          setDataUrls((prev) => [...prev, reader.result]);
        });
        if (file) {
          reader.readAsDataURL(file);
        }
      });
    }
  }

  return (
    <div className="mt-4 text-gray-950">
      <label className="block text-sm font-medium leading-6 text-gray-900">
        {label && label}
      </label>
      <input
        onChange={handleFileChange}
        ref={inputRef}
        multiple={muli}
        className="hidden"
        type="file"
      />

      <div
        onDragOver={(e) => {
          e.preventDefault();
        }}
        onDrop={(e) => {
          e.preventDefault();
          handleFileChange(e);
        }}
        className=" focus:animate-pulse w-full mt-3 py-8 min-h-[80px] border-dashed border-[2px] border-gray-700 cursor-pointer rounded-lg flex justify-center items-center"
        onClick={() => {
          if (inputRef.current) {
            (inputRef.current as HTMLInputElement).click();
          }
        }}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-20 h-20 text-gray-400">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
          />
        </svg>
      </div>
      {typeof children === "function" && children({ files, formData })}
      <div className="mt-4 grid grid-cols-2 gap-2">
        {dataUrls.map((imageUrl, index) => (
          <img key={index} src={imageUrl} className="w-full h-36 rounded-md " />
        ))}
      </div>
    </div>
  );
}
