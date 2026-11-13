export function isSecureCookie(): boolean {
  const value = process.env.COOKIE_SECURE?.trim().toLowerCase();

  if (value === "true" || value === "1") return true;
  if (value === "false" || value === "0") return false;

  return process.env.NODE_ENV === "production";
}
