import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const BACKEND_API_URL = process.env.BACKEND_API_URL;

async function getAccessToken() {
  const cookieStore = await cookies();
  return cookieStore.get("access_token")?.value;
}

export async function GET(request: NextRequest) {
  try {
    if (!BACKEND_API_URL) {
      throw new Error("BACKEND_API_URL is not defined");
    }

    const accessToken = await getAccessToken();

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

export async function POST(request: NextRequest) {
  try {
    if (!BACKEND_API_URL) {
      throw new Error("BACKEND_API_URL is not defined");
    }

    const accessToken = await getAccessToken();

    if (!accessToken) {
      return NextResponse.json(
        {
          code: "UNAUTHORIZED",
          message: "احراز هویت انجام نشده است.",
        },
        { status: 401 },
      );
    }

    const body = await request.json();

    const response = await fetch(`${BACKEND_API_URL}/admin/orders/`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      cache: "no-store",
    });

    const data = await response.json();

    return NextResponse.json(data, {
      status: response.status,
    });
  } catch {
    return NextResponse.json(
      {
        code: "ORDER_CREATE_FAILED",
        message: "ثبت سفارش با خطا مواجه شد.",
      },
      { status: 500 },
    );
  }
}
