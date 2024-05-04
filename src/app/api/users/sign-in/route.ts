import { NextRequest, NextResponse } from "next/server";

import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

import { dbConnect } from "@/db/db-config";
import User from "@/db/models/user-model";

dbConnect();

export async function POST(req: NextRequest) {
  try {
    // Get the request body
    const reqBody = await req.json();
    const { email, password } = reqBody;
    console.log(reqBody);

    // Check if the user exists
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return NextResponse.json("User does not exist", { status: 400 });
    }
    console.log("User exists");

    // Check if the password is correct
    const isMatch = await bcryptjs.compare(password, existingUser.password);
    if (!isMatch) {
      return NextResponse.json("Invalid credentials", { status: 400 });
    }

    // Create a JWT token
    const signInTokenPayload = {
      user: {
        id: existingUser._id,
        userName: existingUser.userName,
        email: existingUser.email,
      },
    };
    const signInToken = jwt.sign(signInTokenPayload, process.env.JWT_SECRET!);

    // Return the response
    const res = NextResponse.json({
      success: true,
      status: 200,
      message: "User signed in successfully",
    });
    res.cookies.set("signInToken", signInToken, {
      httpOnly: true,
    });
    return res;
  } catch (error: any) {
    console.log("[SIGNIN ERROR]:---", error);
    return NextResponse.json(`Something went wrong:--- ${error}`, {
      status: 500,
    });
  }
}
