import { useEffect, useState } from "react";

import searchGames, { BoardGame } from "@/actions/SearchGame";
import Filter, { filterCfgA } from "@/components/GameList/Filter";
import RawList from "@/components/GameList/RawList";
import { useAtomValue } from "jotai";

const Page = () => {
    const filter = useAtomValue(filterCfgA);

    const [games, setGames] = useState<BoardGame[] | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const ctrler = new AbortController();

        setLoading(true);

        setTimeout(() => {
            if (ctrler.signal.aborted) return;
            searchGames(filter, true).then((gs) => {
                if (!Array.isArray(gs)) return;

                setGames(gs);
                setLoading(false);
            });
        }, 500);

        return () => {
            ctrler.abort();
        };
    }, [filter]);

    return (
        <>
            <Filter className="top-[5rem] px-10" />

            {loading ? (
                <div className="bg-neutral mt-10 rounded-xl shadow-lg w-auto min-h-[calc(100vh-40rem)] mx-2 size-full flex items-center justify-center">
                    <span className="loading loading-spinner" />
                </div>
            ) : (
                <div className="relative bg-neutral mt-10 py-8 rounded-xl shadow-lg grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-y-2 p-2 w-auto min-h-[calc(100vh-40rem)] mx-2">
                    <RawList games={games} />
                </div>
            )}
        </>
    );
};

export default Page;
