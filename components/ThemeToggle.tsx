"use client";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
type Theme = "dark" | "light" | undefined;
function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(
    localStorage.getItem("theme") as Theme
  );
  useEffect(() => {
    if (theme && typeof window !== undefined) {
      if (theme === "light") {
        console.log("html", document.getElementsByTagName("html"));
        document.getElementsByTagName("html")[0].classList?.add("dark");
        document.getElementsByTagName("html")[0].classList?.remove("light");
      } else {
        document.getElementsByTagName("html")[0].classList?.remove("dark");
        document.getElementsByTagName("html")[0].classList?.add("light");
      }
      localStorage.setItem("theme", theme);
    } else {
      document.getElementsByTagName("html")[0].classList?.add("light");

      setTheme("light");
    }
  }, [theme]);
  return theme === "dark" ? (
    <svg
      onClick={() => setTheme("light")}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6 text-gray-950 ml-3 mr-3 cursor-pointer">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
      />
    </svg>
  ) : (
    <svg
      onClick={() => setTheme("dark")}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6 text-white cursor-pointer ml-3 mr-3">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
      />
    </svg>
  );
}

export default dynamic(() => Promise.resolve(ThemeToggle), {
  ssr: false,
});
