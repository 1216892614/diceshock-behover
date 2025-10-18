import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/{-$site_name}/__not-found")({
    component: RouteComponent,
});

function RouteComponent() {
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
                </div>
            </div>
        </main>
    );
}
