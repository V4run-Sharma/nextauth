import { NextRequest } from "next/server";

import jwt from "jsonwebtoken";

export const currentProfile = async (req: NextRequest) => {
  try {
    // Get the sign-in token from the request
    const signInToken = req.cookies.get("signInToken")?.value || "";
    const decodedSignInToken: any = jwt.verify(
      signInToken,
      process.env.JWT_SECRET!
    );
    return decodedSignInToken.user.id;
  } catch (error: any) {
    throw new Error(`Couldn't get current profile:--- ${error}`);
  }
};
