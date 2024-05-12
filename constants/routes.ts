export const signInNonAccessibleRoutes = ["/auth/login", "/auth/register"];

export const signedInAccessibleRoutes = ["/dashboard", "/design"];

export const dashboardPageTypes: DashboardPageTypeProps[] = [
  { type: "recently-viewed", label: "Recently Viewed" },
  { type: "shared", label: "Shared" },
];
