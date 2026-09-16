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
    params: Promise<{ slug: string }>;
  },
) {
  try {
    const { slug } = await params;

    const response = await fetch(
      `${BACKEND_API_URL}/public/menus/${slug}/`,
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
        code: "PUBLIC_MENU_FETCH_FAILED",
        message: "دریافت منو با خطا مواجه شد.",
      },
      {
        status: 500,
      },
    );
  }
}