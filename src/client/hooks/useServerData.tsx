import { UserAgentMeta, userAgentMetaZ } from "@/shared/utils/platform";
import { atom, useAtomValue, WritableAtom } from "jotai";
import { useHydrateAtoms } from "jotai/utils";
import React, { createContext, useContext, useMemo } from "react";

const INJECTION_OBJ = "__SERVER_CTX_DATA__";
const ServerDataA = atom<UserAgentMeta | null>(null);

const ServerContext = createContext<UserAgentMeta | null>(null);

export const ServerDataProvider: React.FC<{
    data: UserAgentMeta;
    children: React.ReactNode;
}> = ({ data, children }) => {
    return (
        <>
            <script
                dangerouslySetInnerHTML={{
                    __html: `window.${INJECTION_OBJ} = ${JSON.stringify(data)}`,
                }}
            />
            <ServerContext.Provider value={data}>
                {children}
            </ServerContext.Provider>
        </>
    );
};

const useServerData = () => {
    const hydrateArr: [WritableAtom<any, any, any>, any][] = [];

    const init = (globalThis as any)[INJECTION_OBJ];
    const parsedData = userAgentMetaZ.safeParse(init);
    if (parsedData.success) hydrateArr.push([ServerDataA, parsedData.data]);
    useHydrateAtoms(hydrateArr);

    const serverDataFromAtom = useAtomValue(ServerDataA);
    const serverDataFromContext = useContext(ServerContext);

    return useMemo(
        () => serverDataFromAtom ?? serverDataFromContext,
        [serverDataFromAtom, serverDataFromContext]
    );
};

export default useServerData;
