// Proxy route protection configuration and helpers
// Define which routes are considered private and public for proxy logic

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
