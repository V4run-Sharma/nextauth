import { NextRequest, NextResponse } from "next/server";

import { dbConnect } from "@/db/db-config";

dbConnect();

export async function GET(req: NextRequest) {
  try {
    // Return the response
    const res = NextResponse.json({
      success: true,
      status: 200,
      message: "User signed out successfully",
    });
    res.cookies.set("signInToken", "", {
      httpOnly: true,
      expires: new Date(0),
    });
    return res;
  } catch (error: any) {
    console.log("[SIGNOUT ERROR]:---", error);
    return NextResponse.json(`Something went wrong:--- ${error}`, {
      status: 500,
    });
  }
}
