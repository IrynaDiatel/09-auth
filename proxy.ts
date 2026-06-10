// Proxy route protection configuration and helpers
// Define which routes are considered private and public for proxy logic

import { NextResponse } from "next/server";

export const privateRoutes = [
  "/profile",
  "/notes",
];

export const publicRoutes = [
  "/",
  "/sign-in",
  "/sign-up",
];

export const config = {
  // example matcher — used by middleware or proxy logic
  matcher: [
    "/profile/:path*",
    "/notes/:path*",
    "/sign-in",
    "/sign-up",
  ],
};

// Minimal proxy handler required by Next.js when a `proxy.ts` file exists.
// This simply forwards requests (no-op). Implement auth checks here if needed.
export function proxy(request: Request) {
  return NextResponse.next();
}
