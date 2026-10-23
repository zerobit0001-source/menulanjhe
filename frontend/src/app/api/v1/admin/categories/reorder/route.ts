import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const API_BASE_URL = process.env.BACKEND_API_URL;

type ReorderCategoriesRequest = {
  items: {
    id: string;
    sort_order: number;
  }[];
};

export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("access_token")?.value;

    if (!accessToken) {
      return NextResponse.json(
        {
          code: "UNAUTHORIZED",
          message: "Authentication required.",
        },
        { status: 401 },
      );
    }

    const body = (await request.json()) as ReorderCategoriesRequest;

    if (
      !Array.isArray(body.items) ||
      body.items.length === 0 ||
      !body.items.every(
        (item) =>
          typeof item.id === "string" &&
          item.id.trim().length > 0 &&
          Number.isInteger(item.sort_order) &&
          item.sort_order >= 0,
      )
    ) {
      return NextResponse.json(
        {
          code: "INVALID_REQUEST",
          message: "Invalid category ordering payload.",
        },
        { status: 400 },
      );
    }

    if (!API_BASE_URL) {
      return NextResponse.json(
        {
          code: "SERVER_CONFIGURATION_ERROR",
          message: "Backend API URL is not configured.",
        },
        { status: 500 },
      );
    }

    const response = await fetch(
      `${API_BASE_URL.replace(/\/+$/, "")}/admin/categories/reorder/`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
        cache: "no-store",
      },
    );

    const responseText = await response.text();

    let responseData: unknown = null;

    if (responseText) {
      try {
        responseData = JSON.parse(responseText);
      } catch {
        responseData = { message: responseText };
      }
    }

    return NextResponse.json(responseData, {
      status: response.status,
    });
  } catch {
    return NextResponse.json(
      {
        code: "INTERNAL_SERVER_ERROR",
        message: "An unexpected error occurred.",
      },
      { status: 500 },
    );
  }
}
