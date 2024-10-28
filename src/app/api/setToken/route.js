import { NextResponse } from "next/server";
import { generateVideoSdkApiJwt } from "../../../../utils/sdkJWT";

export async function POST() {
  const token = generateVideoSdkApiJwt();

  const response = NextResponse.json({ message: "Token set in cookie" });
  response.cookies.set("zoom-sdk-auth", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 90 * 60, // 90 minutes in seconds
  });
  return NextResponse.json({token});
}
