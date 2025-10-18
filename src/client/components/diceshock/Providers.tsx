import { SessionProvider } from "next-auth/react";

const Providers: React.FC<React.PropsWithChildren> = ({ children }) => {
    return (
        <>
            <SessionProvider>{children}</SessionProvider>
        </>
    );
};

export default Providers;
