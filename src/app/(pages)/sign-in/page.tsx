"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignIn = () => {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = React.useState(false);
  const [disableButton, setDisableButton] = React.useState(true);

  useEffect(() => {
    if (
      user.email &&
      user.email.length > 0 &&
      user.password &&
      user.password.length > 0
    ) {
      setDisableButton(false);
    } else {
      setDisableButton(true);
    }
  }, [user]);

  const verifyEmailFormat = (email: string) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  };

  const signIn = async () => {
    try {
      setLoading(true);
      setDisableButton(true);
      if (verifyEmailFormat(user.email)) {
        const res = await axios.post("/api/users/sign-in", user);
        console.log("Sign In Success: ", res.data);
        router.push("/profile");
      } else {
        setLoading(false);
        setDisableButton(false);
        toast.error("Invalid email format");
      }
    } catch (error: any) {
      console.log("Sign In Error: ", error.message);
      toast.error(error.message);
    }
  };

  return (
    <main className="flex flex-col min-h-screen items-center gap-y-8 p-24">
      <h1 className="text-3xl font-bold">
        {loading ? "Signing In..." : "Sign In"}
      </h1>
      <form
        action=""
        className="w-[400px] flex flex-col justify-center items-center gap-y-8">
        <input
          type="email"
          id="email"
          value={user.email}
          placeholder="Email"
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          className="w-full p-2 border-b-2 border-neutral-300 focus:outline-none focus:border-black"
        />
        <input
          type="password"
          id="password"
          value={user.password}
          placeholder="Password"
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          className="w-full p-2 border-b-2 border-neutral-300 focus:outline-none focus:border-black"
        />
        <button
          type="submit"
          id="submitBtn"
          disabled={disableButton || loading}
          onClick={signIn}
          className={`w-fit px-4 py-2 rounded-md bg-neutral-600 disabled:opacity-50 text-white ${
            disableButton ? "" : "hover:bg-neutral-900 transition"
          }`}>
          Sign Up
        </button>
      </form>
      <ToastContainer position="top-center" />
    </main>
  );
};

export default SignIn;
