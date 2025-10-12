import { MoonIcon, SunIcon } from "@phosphor-icons/react/dist/ssr";
import { atom, useAtom } from "jotai";
import { useEffect } from "react";
import Cookie from "js-cookie";

export const themeA = atom(null as "light" | "dark" | null);

export default function ThemeSwap() {
    const [theme, setTheme] = useAtom(themeA);

    useEffect(() => {
        if (typeof window === "undefined" || theme !== null) return;

        const input = document.getElementById(
            "syft-theme-controller"
        ) as HTMLInputElement;

        if (!input) return;

        setTheme(input.checked ? "light" : "dark");
    }, [theme]);

    useEffect(() => {
        if (typeof window === "undefined" || theme === null) return;

        const input = document.getElementById(
            "syft-theme-controller"
        ) as HTMLInputElement;

        if (!input) return;

        if (theme === "dark") {
            document.documentElement.classList.toggle("dark", true);
            input.checked = false;
        }

        if (theme === "light") {
            document.documentElement.classList.toggle("dark", false);
            input.checked = true;
        }

        Cookie.set("syft-theme", theme);
        input.dispatchEvent(new Event("input", { bubbles: true }));
    }, [theme]);

    return (
        <label className="swap swap-rotate">
            <input
                type="checkbox"
                value="light"
                checked={theme === "light"}
                onChange={(evt) => {
                    setTheme(evt.target.checked ? "light" : "dark");
                }}
            />

            <SunIcon className="swap-off" weight="fill" />

            <MoonIcon className="swap-on" weight="fill" />
        </label>
    );
}
