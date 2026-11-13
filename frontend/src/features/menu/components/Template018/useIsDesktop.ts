"use client";

import { useSyncExternalStore } from "react";

const QUERY = "(min-width: 1024px)";

const subscribe = (callback: () => void) => {
  const media = window.matchMedia(QUERY);
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
};

/** Used only to pick the cart drawer's slide axis (side on desktop, bottom on mobile). */
export function useIsDesktop() {
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(QUERY).matches,
    () => false,
  );
}
