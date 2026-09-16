import { NextResponse } from "next/server";

const BACKEND_API_URL = process.env.BACKEND_API_URL;

if (!BACKEND_API_URL) {
  throw new Error("BACKEND_API_URL is not defined");
}

export async function GET(
  _req: Request,
  {
    params,
  }: {
    params: Promise<{ qr_token: string }>;
  },
) {
  try {
    const { qr_token } = await params;

    const response = await fetch(
      `${BACKEND_API_URL}/public/tables/resolve/${qr_token}/`,
      {
        method: "GET",
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
        code: "TABLE_RESOLVE_FAILED",
        message: "شناسه میز قابل شناسایی نیست.",
      },
      {
        status: 500,
      },
    );
  }
}
