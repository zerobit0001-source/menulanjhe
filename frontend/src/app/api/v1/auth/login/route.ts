import { NextResponse } from "next/server";

const BACKEND_API_URL = process.env.BACKEND_API_URL;

type LoginResponse = {
  ok: boolean;
  access: string;
  refresh: string;
};

export async function POST(req: Request) {
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

    const body = await req.json();

    const response = await fetch(`${BACKEND_API_URL}/auth/login/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      cache: "no-store",
    });

    const data = (await response.json()) as LoginResponse;

    if (!response.ok) {
      return NextResponse.json(data, {
        status: response.status,
      });
    }

    if (!data.ok || !data.access || !data.refresh) {
      return NextResponse.json(
        {
          code: "INVALID_LOGIN_RESPONSE",
          message: "پاسخ نامعتبر از سرور دریافت شد.",
        },
        { status: 502 },
      );
    }

    const nextResponse = NextResponse.json(
      {
        ok: true,
      },
      {
        status: 200,
      },
    );

    /**
     * Access Token
     */
    nextResponse.cookies.set("access_token", data.access, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 15,
    });

    /**
     * Refresh Token
     */
    nextResponse.cookies.set("refresh_token", data.refresh, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return nextResponse;
  } catch (error) {
    console.error("Login route error:", error);

    return NextResponse.json(
      {
        code: "SERVER_ERROR",
        message: "خطا در ارتباط با سرور.",
      },
      {
        status: 500,
      },
    );
  }
}
