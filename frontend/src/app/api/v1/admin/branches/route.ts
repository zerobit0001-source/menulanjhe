import { NextRequest, NextResponse } from "next/server";

const BACKEND_API_URL = process.env.BACKEND_API_URL;

export async function GET(req: NextRequest) {
  return proxyRequest(req, "GET");
}

export async function POST(req: NextRequest) {
  return proxyRequest(req, "POST");
}

async function proxyRequest(req: NextRequest, method: "GET" | "POST") {
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

    const body = method === "POST" ? await req.json() : undefined;

    const response = await fetch(`${BACKEND_API_URL}/admin/branches/`, {
      method,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: body ? JSON.stringify(body) : undefined,
      cache: "no-store",
    });

    const data = await response.json();

    return NextResponse.json(data, {
      status: response.status,
    });
  } catch (error) {
    console.error("Branches route error:", error);

    return NextResponse.json(
      {
        code: "SERVER_ERROR",
        message: "خطا در ارتباط با سرور.",
      },
      { status: 500 },
    );
  }
}
