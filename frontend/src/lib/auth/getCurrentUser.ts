import { cookies } from "next/headers";

const BACKEND_API_URL = process.env.BACKEND_API_URL;

export async function getCurrentUser() {
  try {
    const cookieStore = await cookies();

    const accessToken = cookieStore.get("access_token")?.value;

    if (!accessToken) {
      return null;
    }

    const response = await fetch(`${BACKEND_API_URL}/auth/me/`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    const text = await response.text();

    if (!response.ok) {
      return null;
    }

    const data = JSON.parse(text);

    if (!data.ok || !data.user) {
      return null;
    }

    return data;
  } catch (error) {
    return null;
  }
}
