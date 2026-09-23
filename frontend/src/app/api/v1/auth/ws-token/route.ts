import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const accessToken = req.cookies.get("access_token")?.value;

  if (!accessToken) {
    return NextResponse.json(
      {
        code: "UNAUTHORIZED",
        message: "احراز هویت انجام نشده است.",
      },
      { status: 401 },
    );
  }

  return NextResponse.json({
    access_token: accessToken,
  });
}
