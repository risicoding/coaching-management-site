export const authRoutes = ["/login", "/signup"];
export const passwordRoutes = ["/reset-password", "/forgot-password"];
export const protectedRoutes = ["/dashboard", "/profile", "/settings"];
export const adminRoutes = ["/admin", "/api/invoice"];

export const matchRoute = (
  pathname: string,
  routes: string[],
  options: { matchChild?: boolean } = { matchChild: true },
): boolean => {
  return routes.some(
    (route) =>
      pathname === route ||
      (options.matchChild && pathname.startsWith(route + "/")),
  );
};
