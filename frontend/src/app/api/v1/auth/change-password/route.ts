import { NextRequest, NextResponse } from "next/server";

const BACKEND_API_URL = process.env.BACKEND_API_URL;

type ChangePasswordResponse = {
  ok?: boolean;
  code?: string;
  message?: string;
};

export async function POST(req: NextRequest) {
  try {
    if (!BACKEND_API_URL) {
      return NextResponse.json(
        {
          code: "BACKEND_API_URL_MISSING",
          message: "آدرس Backend تنظیم نشده است.",
        },
        { status: 500 },
      );
    }

    const accessToken = req.cookies.get("access_token")?.value;

    if (!accessToken) {
      return NextResponse.json(
        {
          code: "UNAUTHENTICATED",
          message: "احراز هویت انجام نشده است.",
        },
        { status: 401 },
      );
    }

    const body = await req.json();

    if (!body.old_password || !body.new_password) {
      return NextResponse.json(
        {
          code: "PASSWORD_REQUIRED",
          message: "رمز عبور فعلی و رمز عبور جدید الزامی هستند.",
        },
        { status: 400 },
      );
    }

    const response = await fetch(`${BACKEND_API_URL}/auth/change_password/`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        old_password: body.old_password,
        new_password: body.new_password,
      }),
      cache: "no-store",
    });

    const data = (await response.json()) as ChangePasswordResponse;

    if (!response.ok) {
      return NextResponse.json(data, {
        status: response.status,
      });
    }

    return NextResponse.json(data, {
      status: 200,
    });
  } catch (error) {
    console.error("Change password route error:", error);

    return NextResponse.json(
      {
        code: "SERVER_ERROR",
        message: "خطا در ارتباط با سرور.",
      },
      { status: 500 },
    );
  }
}
