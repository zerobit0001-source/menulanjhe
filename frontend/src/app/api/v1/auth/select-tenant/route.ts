import { NextRequest, NextResponse } from "next/server";

const BACKEND_API_URL = process.env.BACKEND_API_URL;

type SelectTenantResponse = {
  ok: boolean;
  access: string;
  refresh: string;
  tenant_id: string;
  role: string;
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

    if (!body.tenant_id) {
      return NextResponse.json(
        {
          code: "TENANT_ID_REQUIRED",
          message: "شناسه مجموعه الزامی است.",
        },
        { status: 400 },
      );
    }

    const response = await fetch(`${BACKEND_API_URL}/auth/select_tenant/`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tenant_id: body.tenant_id,
      }),
      cache: "no-store",
    });

    const data = (await response.json()) as
      | SelectTenantResponse
      | {
          code: string;
          message: string;
        };

    if (!response.ok) {
      return NextResponse.json(data, {
        status: response.status,
      });
    }

    if (
      !("ok" in data) ||
      !data.ok ||
      !("access" in data) ||
      !data.access ||
      !("refresh" in data) ||
      !data.refresh
    ) {
      return NextResponse.json(
        {
          code: "INVALID_SELECT_TENANT_RESPONSE",
          message: "پاسخ نامعتبر از سرور دریافت شد.",
        },
        { status: 502 },
      );
    }

    const nextResponse = NextResponse.json({
      ok: true,
      tenant_id: data.tenant_id,
      role: data.role,
    });

    nextResponse.cookies.set("access_token", data.access, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 15,
    });

    nextResponse.cookies.set("refresh_token", data.refresh, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return nextResponse;
  } catch (error) {
    console.error("Select tenant route error:", error);

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
