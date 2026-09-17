import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const BACKEND_API_URL = process.env.BACKEND_API_URL;

export async function POST(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
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

  const { id } = await params;

  try {
    const response = await fetch(
      `${BACKEND_API_URL}/admin/orders/${id}/confirm/`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      },
    );

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
