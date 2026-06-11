// Proxy route protection configuration and helpers
// Define which routes are considered private and public for proxy logic
import { NextResponse, type NextRequest } from "next/server";
import { cookies } from "next/headers";
import { checkSession } from "./lib/api/serverApi";

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

function isPrivatePath(path: string) {
  return privateRoutes.some(
    (route) => path === route || path.startsWith(`${route}/`)
  );
}

function isPublicPath(path: string) {
  return publicRoutes.includes(path);
}

export async function proxy(request: NextRequest) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;

  const url = new URL(request.url);

  // If accessToken is missing but refreshToken exists — try to refresh the session
  if (!accessToken && refreshToken) {
    try {
      const result = await checkSession();

      if (result?.accessToken) {
        const response = isPublicPath(url.pathname)
          ? NextResponse.redirect(new URL("/profile", request.url))
          : NextResponse.next();

        // Update cookies with new tokens
        response.cookies.set("accessToken", result.accessToken, {
          httpOnly: true,
          path: "/",
        });

        if (result.refreshToken) {
          response.cookies.set("refreshToken", result.refreshToken, {
            httpOnly: true,
            path: "/",
          });
        }

        return response;
      }
    } catch {
      // Session refresh failed — treat as unauthenticated
    }
  }

  const authenticated = Boolean(accessToken);

  if (isPrivatePath(url.pathname) && !authenticated) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  if (isPublicPath(url.pathname) && authenticated) {
    return NextResponse.redirect(new URL("/profile", request.url));
  }

  return NextResponse.next();
}
