import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const BACKEND_API_URL = process.env.BACKEND_API_URL;

export async function GET(request: NextRequest) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;

  if (!accessToken) {
    return NextResponse.json(
      {
        code: "UNAUTHORIZED",
        message: "احراز هویت انجام نشده است.",
      },
      { status: 401 },
    );
  }

  const searchParams = request.nextUrl.searchParams.toString();

  const url = `${BACKEND_API_URL}/admin/orders/${
    searchParams ? `?${searchParams}` : ""
  }`;

  try {
    const response = await fetch(url, {
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
  } catch {
    return NextResponse.json(
      {
        code: "BACKEND_UNAVAILABLE",
        message: "ارتباط با سرور برقرار نشد.",
      },
      { status: 503 },
    );
  }
}