import Hero from "@/client/components/home-page/Hero";
import TheShockScreen from "@/client/components/home-page/TheShockScreen";
import TitleScreen from "@/client/components/home-page/TitleScreen";
import NavBar from "@/client/components/NavBar";
import trpcClient from "@/shared/utils/trpc";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/{-$site_name}/")({
    component: Home,
});

function Home() {
    trpcClient.hello.query("xxx").then((res) => console.log(res));

    return (
        <main className="min-h-screen w-full overflow-x-clip">
            <Hero />

            <NavBar />

            <TheShockScreen />

            <TitleScreen
                title={[
                    <span className="">国王的</span>,
                    <span className="">所有</span>,
                    <span className="">马车</span>,
                ]}
                subTitle={[
                    <span className="text-base-content/70 whitespace-pre">
                        All{" "}
                    </span>,
                    <span className="text-base-content/70 whitespace-pre">
                        carriages{" "}
                    </span>,
                    <span className="text-base-content/70">for the king</span>,
                ]}
            />

            <div className="h-screen w-full" />
        </main>
    );
}
