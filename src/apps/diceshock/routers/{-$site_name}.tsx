import Footer from "@/client/components/diceshock/Footer";
import Header from "@/client/components/diceshock/Header";
import Msg from "@/client/components/diceshock/Msg";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/{-$site_name}")({
    component: _Home,
});

function _Home() {
    return (
        <>
            <Header />

            <Outlet />

            <Footer />

            <Msg />
        </>
    );
}
