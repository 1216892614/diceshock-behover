import { createRootRoute, Outlet } from "@tanstack/react-router";
import { withSSR } from "react-i18next";

export const Route = createRootRoute({
  component: () => {
    return <Outlet />;
  },
});
