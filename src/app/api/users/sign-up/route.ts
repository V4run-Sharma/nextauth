import { NextRequest, NextResponse } from "next/server";

import bcryptjs from "bcryptjs";

import { sendEmail } from "@/utils/mailer";

import { dbConnect } from "@/db/db-config";
import User from "@/db/models/user-model";

dbConnect();

export async function POST(req: NextRequest) {
  try {
    // Get the request body
    const reqBody = await req.json();
    const { userName, email, password } = reqBody;
    console.log(reqBody);

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json("User already exists", { status: 400 });
    }

    // Hash the password
    const salt = await bcryptjs.genSalt(12);
    const hashedPassword = await bcryptjs.hash(password, salt);

    // Create a new User instance
    const newUser = new User({
      userName,
      email,
      password: hashedPassword,
    });

    // Save the user to the database
    const savedUser = await newUser.save();
    console.log(savedUser);

    // Send verification email
    await sendEmail({
      email,
      emailType: "VERIFY",
      userId: savedUser._id,
    });

    // Return the response
    return NextResponse.json({
      success: true,
      status: 201,
      message: "User created successfully",
      savedUser,
    });
  } catch (error) {
    console.log("[SIGNUP ERROR]:---", error);
    return NextResponse.json(`Something went wrong:--- ${error}`, {
      status: 500,
    });
  }
}
