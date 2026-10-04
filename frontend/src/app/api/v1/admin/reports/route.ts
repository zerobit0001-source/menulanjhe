import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const BACKEND_API_URL = process.env.BACKEND_API_URL;

export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies();

    const accessToken = cookieStore.get("access_token")?.value;

    if (!accessToken) {
      return NextResponse.json(
        {
          ok: false,
          message: "احراز هویت انجام نشده است.",
        },
        { status: 401 },
      );
    }

    const period = request.nextUrl.searchParams.get("period") ?? "today";

    const backendUrl = new URL(`${BACKEND_API_URL}/admin/reports`);

    backendUrl.searchParams.set("period", period);

    const response = await fetch(backendUrl.toString(), {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    const data = await response.json();

    return NextResponse.json(data, {
      status: response.status,
    });
  } catch (error) {
    console.error("Reports route handler error:", error);

    return NextResponse.json(
      {
        ok: false,
        message: "دریافت گزارش‌ها با خطا مواجه شد.",
      },
      { status: 500 },
    );
  }
}
