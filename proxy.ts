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
  matcher: [
    "/profile/:path*",
    "/notes/:path*",
    "/sign-in",
    "/sign-up",
  ],
};

function isAuthenticated(cookieHeader: string | null) {
  if (!cookieHeader) return false;
  return /accessToken=|refreshToken=/.test(cookieHeader);
}

function isPrivatePath(path: string) {
  return privateRoutes.some((route) => path === route || path.startsWith(`${route}/`));
}

function isPublicPath(path: string) {
  return publicRoutes.includes(path);
}

export function proxy(request: Request) {
  const url = new URL(request.url);
  const cookieHeader = request.headers.get("cookie");
  const authenticated = isAuthenticated(cookieHeader);

  if (isPrivatePath(url.pathname) && !authenticated) {
    const signInUrl = new URL("/sign-in", request.url);
    return NextResponse.redirect(signInUrl);
  }

  if (isPublicPath(url.pathname) && authenticated) {
    const profileUrl = new URL("/profile", request.url);
    return NextResponse.redirect(profileUrl);
  }

  return NextResponse.next();
}
