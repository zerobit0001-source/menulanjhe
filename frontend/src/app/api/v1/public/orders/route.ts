import { NextResponse } from "next/server";

const BACKEND_API_URL = process.env.BACKEND_API_URL;

if (!BACKEND_API_URL) {
  throw new Error("BACKEND_API_URL is not defined");
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const response = await fetch(
      `${BACKEND_API_URL}/public/orders/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
        cache: "no-store",
      },
    );

    const data = await response.json();

    return NextResponse.json(data, {
      status: response.status,
    });
  } catch {
    return NextResponse.json(
      {
        code: "PUBLIC_ORDER_CREATE_FAILED",
        message: "ثبت سفارش با خطا مواجه شد.",
      },
      {
        status: 500,
      },
    );
  }
}
