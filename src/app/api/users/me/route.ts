import { NextRequest, NextResponse } from "next/server";

import { dbConnect } from "@/db/db-config";
import User from "@/db/models/user-model";
import { currentProfile } from "@/utils/current-profile";

dbConnect();

export async function GET(req: NextRequest) {
  try {
    // Get the current user's profile
    const currentUserId = await currentProfile(req);
    const currentUser = await User.findById({ _id: currentUserId }).select(
      "-password"
    );
    if (!currentUser) {
      return NextResponse.json("User does not exist", { status: 400 });
    }

    // Return the response
    return NextResponse.json({
      success: true,
      status: 200,
      message: "User data fetched successfully",
      data: currentUser,
    });
  } catch (error: any) {
    console.log("[USERDATA ERROR]:---", error);
    return NextResponse.json(`Something went wrong:--- ${error}`, {
      status: 500,
    });
  }
}
