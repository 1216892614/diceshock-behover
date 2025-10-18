import { pagedZ } from "@/shared/types/kits";
import { publicProcedure } from "./trpc";
import { filterCfgZ } from "@/client/components/diceshock/GameList/Filter";
import db from "@/server/db";
import { boardGamesTable } from "@/server/db/schema";
import { BoardGame } from "@/shared/types/BoardGame";

const get = publicProcedure
    .input(pagedZ(filterCfgZ))
    .query(async ({ input, ctx }) => {
        const { page, pageSize, params } = input;

        const trimmedSearchWords = params.searchWords.trim();

        const player_num = params.isBestNumOfPlayers
            ? undefined
            : params.numOfPlayers ?? undefined;

        const best_player_num = params.isBestNumOfPlayers
            ? params.numOfPlayers ?? undefined
            : undefined;

        const games = db(ctx.env.DB).query.boardGamesTable.findMany({
            where: (game, { like, or, and }) =>
                and(
                    trimmedSearchWords
                        ? or(
                              like(game.sch_name, `%${trimmedSearchWords}%`),
                              like(game.eng_name, `%${trimmedSearchWords}%`)
                          )
                        : undefined,
                    params.tags.includes("PARTY")
                        ? or(
                              like(game.category, "%Party%"),
                              like(game.category, "%Puzzle%")
                          )
                        : undefined,
                    params.tags.includes("RPG")
                        ? or(
                              like(game.category, "%American-style%"),
                              like(game.category, "%Role Playing$")
                          )
                        : undefined,
                    params.tags.includes("SCORE_RACE")
                        ? or(
                              like(game.category, "%Euro-style%"),
                              like(game.category, "%Abstract%")
                          )
                        : undefined,
                    player_num === undefined
                        ? undefined
                        : like(game.player_num, `%${player_num}%`),
                    best_player_num === undefined
                        ? undefined
                        : like(game.player_num, `%${best_player_num}%`)
                ),
            limit: pageSize,
            offset: (page - 1) * pageSize,
            orderBy: (game, { desc }) => desc(game.gstone_rating),
        });

        return games;
    });

export default {
    get,
};
