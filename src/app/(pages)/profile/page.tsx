"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { useState } from "react";

import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Profile = () => {
  const router = useRouter();
  const [userData, setUserData] = useState("");

  const getUserData = async () => {
    try {
      const res = await axios.get("/api/users/me");
      console.log("User Data: ", res.data.data);
      setUserData(res.data.data._id);
    } catch (error: any) {
      console.log("Error: ", error.message);
      toast.error(error.message);
    }
  };

  const signOut = async () => {
    try {
      await axios.get("/api/users/sign-out");
      router.push("/sign-in");
    } catch (error: any) {
      console.log("Error signing out: ", error.message);
      toast.error(error.message);
    }
  };

  return (
    <main className="flex flex-col min-h-screen items-center gap-y-8 p-24">
      <h1 className="text-3xl font-bold">Profile</h1>
      <button
        onClick={getUserData}
        className="bg-neutral-700 text-white px-4 py-2 rounded-md">
        Get User Data
      </button>
      <h2>
        {userData ? (
          <div>
            <p className="text-center">
              User ID:
              <Link href={`/profile/${userData}`}>
                {" "}
                {JSON.stringify(userData)}
              </Link>
            </p>
          </div>
        ) : (
          "No user data available"
        )}
      </h2>
      <button
        onClick={signOut}
        className="bg-red-500 text-white px-4 py-2 rounded-md">
        Sign Out
      </button>
      <ToastContainer position="top-center" />
    </main>
  );
};

export default Profile;
