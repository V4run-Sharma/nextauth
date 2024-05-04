import { NextRequest, NextResponse } from "next/server";

import { dbConnect } from "@/db/db-config";
import User from "@/db/models/user-model";

dbConnect();

export async function POST(req: NextRequest) {
  try {
    // Get the token from the request body
    const reqBody = await req.json();
    const { verificationToken } = reqBody;
    console.log(verificationToken);

    // Find the user with the token
    const verfiedUser = await User.findOne({
      verificationToken,
      verificationTokenExpiry: { $gt: Date.now() },
    });
    if (!verfiedUser) {
      return NextResponse.json("Invalid or expired token", {
        status: 400,
      });
    }
    console.log(verfiedUser);

    // Update the user
    verfiedUser.isVerified = true;
    verfiedUser.verificationToken = undefined;
    verfiedUser.verificationTokenExpiry = undefined;
    await verfiedUser.save();

    // Return the response
    return NextResponse.json({
      success: true,
      status: 200,
      message: "Email verified successfully",
    });
  } catch (error: any) {
    console.log("[VERIFICATION ERROR]:---", error);
    return NextResponse.json(`Something went wrong:--- ${error}`, {
      status: 500,
    });
  }
}
