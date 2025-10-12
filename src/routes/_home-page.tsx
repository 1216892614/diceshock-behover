import NavBar from "@/client/components/NavBar";
import { createFileRoute, Link, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_home-page")({
    component: _Home,
});

function _Home() {
    return (
        <>
            <Outlet />
        </>
    );
}
