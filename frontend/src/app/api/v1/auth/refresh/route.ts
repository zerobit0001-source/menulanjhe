import { NextRequest, NextResponse } from "next/server";

const BACKEND_API_URL = process.env.BACKEND_API_URL;

type RefreshResponse = {
  ok: boolean;
  access: string;
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

    const refreshToken = req.cookies.get("refresh_token")?.value;

    if (!refreshToken) {
      return NextResponse.json(
        {
          code: "UNAUTHENTICATED",
          message: "Refresh token یافت نشد.",
        },
        { status: 401 },
      );
    }

    const response = await fetch(`${BACKEND_API_URL}/auth/refresh/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        refresh: refreshToken,
      }),
      cache: "no-store",
    });

    const data = (await response.json()) as RefreshResponse;

    if (!response.ok) {
      const nextResponse = NextResponse.json(data, {
        status: response.status,
      });

      // اگر refresh token هم معتبر نباشد،
      // session سمت frontend را پاک می‌کنیم.
      if (response.status === 401) {
        nextResponse.cookies.delete("access_token");
        nextResponse.cookies.delete("refresh_token");
      }

      return nextResponse;
    }

    if (!data.ok || !data.access) {
      return NextResponse.json(
        {
          code: "INVALID_REFRESH_RESPONSE",
          message: "پاسخ نامعتبر از سرور دریافت شد.",
        },
        { status: 502 },
      );
    }

    const nextResponse = NextResponse.json({
      ok: true,
    });

    nextResponse.cookies.set("access_token", data.access, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 15,
    });

    return nextResponse;
  } catch (error) {
    console.error("Refresh route error:", error);

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
