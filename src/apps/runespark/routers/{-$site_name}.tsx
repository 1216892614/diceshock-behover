import NavBar from "@/client/components/NavBar";
import InPixelFilter from "@/client/components/svg-filters/in-pixel";
import NoiseFilter from "@/client/components/svg-filters/noise";
import { createFileRoute, Link, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/{-$site_name}")({
    component: _Home,
});

function _Home() {
    return (
        <>
            <Outlet />

            <NoiseFilter />
            <InPixelFilter />
        </>
    );
}
