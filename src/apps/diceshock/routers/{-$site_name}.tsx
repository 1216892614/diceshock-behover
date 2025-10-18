import Footer from "@/client/components/diceshock/Footer";
import Header from "@/client/components/diceshock/Header";
import Msg from "@/client/components/diceshock/Msg";
import { createFileRoute, Outlet, Link } from "@tanstack/react-router";
import trpcClient from "@/shared/utils/trpc";

export const Route = createFileRoute("/{-$site_name}")({
    component: _Home,
    notFoundComponent: NotFound,
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

function NotFound() {
    const seed = () => trpcClient.owned.seed.mutate().then(console.log);

    return (
        <main className="w-full h-screen relative">
            <div className="absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center">
                <h1 className="font-bold text-[20vw] md:text-[15vw] lg:text-[10rem] text-primary text-nowrap">
                    Oops!
                </h1>

                <h2 className="font-bold text-xl md:text-2xl lg:text-4xl text-nowrap">
                    404 - 你访问的页面未找到!
                </h2>

                <div className="mt-11 w-full flex justify-center items-center flex-col md:flex-row">
                    <Link
                        to="/"
                        className="btn btn-primary mr-0 mb-5 md:mr-5 md:mb-0"
                    >
                        返回主页
                    </Link>

                    <Link to="/" className="btn btn-ghost">
                        联系我们
                    </Link>

                    <button onClick={seed} className="btn btn-xl">
                        Seed
                    </button>
                </div>
            </div>
        </main>
    );
}
