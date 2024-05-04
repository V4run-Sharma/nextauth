"use client";

import Link from "next/link";

import React, { useEffect, useState } from "react";

import axios from "axios";

const Verification = () => {
  const [verificationToken, setverificationToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState({
    message: "",
    status: false,
  });

  const verifyUserEmail = async () => {
    try {
      await axios.post("/api/users/verification", { verificationToken });
      setVerified(true);
      setError({ message: "", status: false });
    } catch (error: any) {
      setError({ message: error.response.data, status: true });
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    // Get verification token from URL
    setError({ message: "", status: false });
    const verificationTokenFromURL = window.location.search.split("=")[1];
    setverificationToken(verificationTokenFromURL || "");
  }, []);

  useEffect(() => {
    setError({ message: "", status: false });
    if (verificationToken.length > 0) verifyUserEmail();
  }, [verificationToken]);

  return (
    <main className="flex flex-col min-h-screen items-center gap-y-8 p-24">
      <h1 className="text-3xl font-bold">Verification</h1>
      <h2>
        {verificationToken
          ? `${verificationToken}`
          : "No verification token found"}
      </h2>
      {verified && (
        <>
          <h2 className="text-green-600">Email verified successfully</h2>
          <Link href={"/sign-in"}>
            <button className="w-fit px-4 py-2 rounded-md bg-neutral-600 hover:bg-neutral-900 text-white transition">
              Login
            </button>
          </Link>
        </>
      )}
      {error && (
        <>
          <h2 className="text-red-600">{error.message}</h2>
        </>
      )}
    </main>
  );
};

export default Verification;
