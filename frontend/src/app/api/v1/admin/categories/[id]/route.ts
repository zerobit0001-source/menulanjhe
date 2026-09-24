import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const BACKEND_API_URL = process.env.BACKEND_API_URL;

if (!BACKEND_API_URL) {
  throw new Error("BACKEND_API_URL is not defined");
}

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(_req: Request, { params }: RouteContext) {
  try {
    const cookieStore = await cookies();

    const accessToken = cookieStore.get("access_token")?.value;

    if (!accessToken) {
      return NextResponse.json(
        {
          code: "UNAUTHORIZED",
          message: "احراز هویت انجام نشده است.",
        },
        {
          status: 401,
        },
      );
    }

    const { id } = await params;

    const response = await fetch(`${BACKEND_API_URL}/admin/categories/${id}/`, {
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
        code: "CATEGORY_GET_FAILED",
        message: "دریافت اطلاعات دسته‌بندی با خطا مواجه شد.",
      },
      {
        status: 500,
      },
    );
  }
}

export async function PATCH(req: Request, { params }: RouteContext) {
  try {
    const cookieStore = await cookies();

    const accessToken = cookieStore.get("access_token")?.value;

    if (!accessToken) {
      return NextResponse.json(
        {
          code: "UNAUTHORIZED",
          message: "احراز هویت انجام نشده است.",
        },
        {
          status: 401,
        },
      );
    }

    const { id } = await params;

    const body = await req.json();

    const response = await fetch(`${BACKEND_API_URL}/admin/categories/${id}/`, {
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
        code: "CATEGORY_UPDATE_FAILED",
        message: "ویرایش دسته‌بندی با خطا مواجه شد.",
      },
      {
        status: 500,
      },
    );
  }
}
