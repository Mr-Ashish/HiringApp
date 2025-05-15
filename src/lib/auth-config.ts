// Authentication related constants and configurations
export const PROTECTED_ROUTES = [
  "/dashboard",
  "/clients",
  "/requirements",
  "/candidates",
] as const;

export const PUBLIC_ROUTES = ["/", "/login", "/register"] as const;

export type ProtectedRoute = (typeof PROTECTED_ROUTES)[number];
export type PublicRoute = (typeof PUBLIC_ROUTES)[number];

// Helper function to check if a route is protected
export function isProtectedRoute(path: string): boolean {
  return PROTECTED_ROUTES.some((route) => path.startsWith(route));
}

// Helper function to check if a route is public
export function isPublicRoute(path: string): boolean {
  return PUBLIC_ROUTES.some((route) => path === route);
}

// Helper function to get the next route after login
export function getNextRoute(path: string): string {
  if (isProtectedRoute(path)) {
    return path;
  }
  return "/dashboard";
}
