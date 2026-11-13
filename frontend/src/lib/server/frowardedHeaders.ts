import { headers } from "next/headers";

export async function forwardedHeaders(): Promise<Record<string, string>> {
  const incoming = await headers();
  const forwardedFor =
    incoming.get("x-forwarded-for") ?? incoming.get("x-real-ip");

  return forwardedFor ? { "X-Forwarded-For": forwardedFor } : {};
}
