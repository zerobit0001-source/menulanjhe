import { NextRequest, NextResponse } from "next/server";

const BACKEND_API_URL = process.env.BACKEND_API_URL;

if (!BACKEND_API_URL) {
  throw new Error("BACKEND_API_URL is not defined");
}

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(req: NextRequest, { params }: RouteContext) {
  try {
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

    const { id } = await params;

    const response = await fetch(`${BACKEND_API_URL}/admin/tables/${id}/`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
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
        code: "TABLE_FETCH_FAILED",
        message: "دریافت اطلاعات میز با خطا مواجه شد.",
      },
      { status: 500 },
    );
  }
}

export async function PATCH(req: NextRequest, { params }: RouteContext) {
  try {
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

    const { id } = await params;
    const body = await req.json();

    const response = await fetch(`${BACKEND_API_URL}/admin/tables/${id}/`, {
      method: "PATCH",
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
        code: "TABLE_UPDATE_FAILED",
        message: "ویرایش میز با خطا مواجه شد.",
      },
      { status: 500 },
    );
  }
}
