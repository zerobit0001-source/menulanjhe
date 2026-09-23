import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const BACKEND_API_URL = process.env.BACKEND_API_URL;

async function getAccessToken() {
  const cookieStore = await cookies();
  return cookieStore.get("access_token")?.value;
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
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

    const { id } = await params;
    const body = await req.json();

    const response = await fetch(`${BACKEND_API_URL}/admin/products/${id}/`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    return NextResponse.json(data, {
      status: response.status,
    });
  } catch {
    return NextResponse.json(
      {
        code: "PRODUCT_UPDATE_FAILED",
        message: "ویرایش محصول با خطا مواجه شد.",
      },
      { status: 500 },
    );
  }
}

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(req: NextRequest, { params }: RouteContext) {
  try {
    const { id } = await params;

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

    const response = await fetch(`${BACKEND_API_URL}/admin/products/${id}/`, {
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
    console.error("Get product error:", error);

    return NextResponse.json(
      {
        code: "INTERNAL_SERVER_ERROR",
        message: "دریافت اطلاعات محصول با خطا مواجه شد.",
      },
      { status: 500 },
    );
  }
}
