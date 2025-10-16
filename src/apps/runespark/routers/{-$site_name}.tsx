import NavBar from "@/client/components/NavBar";
import { createFileRoute, Link, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/{-$site_name}")({
    component: _Home,
});

function _Home() {
    return (
        <>
            <Outlet />
        </>
    );
}
