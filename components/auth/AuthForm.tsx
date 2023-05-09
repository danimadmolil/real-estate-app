"use client";
import { register, signin } from "@/lib/api";
import { useCallback, useContext, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Context, { AppContext } from "../context/Context";
// import Card from "./Card";
// import Button from "./Button";
// import Input from "./Input";

const registerContent = {
  linkUrl: "/signin",
  linkText: "Already have an account?",
  header: "Create Your New Account",
  subheader: "",
  buttonText: "Register",
};

const signinContent = {
  linkUrl: "/signup",
  linkText: "Don't have an account?",
  header: "Welcome Back",
  subheader: "Enter your email and password to get started",
  buttonText: "Sign In",
};

const initial = { email: "", password: "", firstName: "", lastName: "" };

export default function AuthForm({ mode }: { mode: "register" | "signin" }) {
  const [formState, setFormState] = useState({ ...initial });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { user, dispatch } = useContext(AppContext);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setLoading(true);
      try {
        if (mode === "register") {
          const { message } = await register(formState);
          if (message === "success") {
            window.location.href = "/signin";
          } else {
            throw new Error();
          }
        } else {
          const { user } = await signin(formState);
          dispatch({ type: "SET_USER", payload: user });
          console.log("user context", user);
          console.log("user signin", user);
        }

        router.replace("/");
      } catch (e) {
        setError(`Could not ${mode}`);
      } finally {
        setLoading(false);
        // setFormState({ ...initial });
      }
    },
    [
      formState.email,
      formState.password,
      formState.firstName,
      formState.lastName,
    ]
  );

  const content = mode === "register" ? registerContent : signinContent;

  return (
    <div className="w-full text-gray-800 p-2 overflow-y-scroll md:p-6 lg:p-8 h-full flex flex-col justify-around rounded-lg shadow-md">
      <div className="text-center">
        <h2 className="text-3xl mb-2 ">{content.header}</h2>
        <p className="tex-lg text-black/25">{content.subheader}</p>
      </div>
      {mode === "register" && (
        <div className="flex mb-8 justify-between">
          <div className="pr-2">
            <div className="text-lg mb-4 ml-2 text-black/50">First Name</div>
            <input
              required
              placeholder="First Name"
              value={formState.firstName}
              className="text-gray-800 border-solid border-gray border-2 px-6 py-2 text-lg rounded-3xl w-full"
              onChange={(e) =>
                setFormState((s) => ({ ...s, firstName: e.target.value }))
              }
            />
          </div>
          <div className="pl-2">
            <div className="text-lg mb-4 ml-2 text-black/50">Last Name</div>
            <input
              required
              placeholder="Last Name"
              value={formState.lastName}
              className="text-gray-800 border-solid border-gray border-2 px-6 py-2 text-lg rounded-3xl w-full"
              onChange={(e) =>
                setFormState((s) => ({ ...s, lastName: e.target.value }))
              }
            />
          </div>
        </div>
      )}
      <div className="mb-8">
        <div className="text-lg mb-4 ml-2 text-black/50">Email</div>
        <input
          required
          type="email"
          placeholder="Email"
          value={formState.email}
          className="text-gray-800 border-solid border-gray border-2 px-6 py-2 text-lg rounded-3xl w-full"
          onChange={(e) =>
            setFormState((s) => ({ ...s, email: e.target.value }))
          }
        />
      </div>
      <div className="mb-8">
        <div className="text-lg mb-4 ml-2 text-black/50">Password</div>
        <input
          required
          value={formState.password}
          type="password"
          placeholder="Password"
          className="text-gray-800 border-solid border-gray border-2 px-6 py-2 text-lg rounded-3xl w-full"
          onChange={(e) =>
            setFormState((s) => ({ ...s, password: e.target.value }))
          }
        />
      </div>
      {error && (
        <div className="flex items-center p-3 rounded-lg bg-red-100">
          <>
            <svg
              onClick={() => setError(false)}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 text-red-600 cursor-pointer">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>

            <p className="ml-5 text-red-600">{error}</p>
          </>
        </div>
      )}
      <div className="flex flex-col lg:flex-row items-center justify-between">
        <Link
          href={content.linkUrl}
          className="w-full mt-4 lg:mt-0 lg:w-36 order-2 lg:order-1 text-blue-600 font-bold">
          {content.linkText}
        </Link>

        <button
          onClick={handleSubmit}
          className="text-white rounded-md w-full order-1 lg:order-2 lg:w-36 h-14 bg-blue-600 flex items-center justify-around relative hover:bg-blue-400">
          {loading && (
            <div
              className="absolute top-4 left-2 animate-spin inline-block w-6 h-6 border-[3px] border-current border-t-transparent text-white rounded-full"
              role="status"
              aria-label="loading"></div>
          )}
          {content.buttonText}
        </button>
      </div>
    </div>
  );
}
