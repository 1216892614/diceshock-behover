import { z } from "zod";

const browserZ = z.enum([
    "chrome",
    "edge",
    "firefox",
    "safari",
    "opera",
    "other",
    "unknown",
]);

const osZ = z.enum([
    "windows",
    "mac",
    "linux",
    "android",
    "ios",
    "other",
    "unknown",
]);

export const userAgentMetaZ = z.object({
    os: osZ,
    browser: browserZ,
    language: z.string(),
    userAgent: z.string(),
    ip: z.string(),
    timestamp: z.number(),
});

export type Browser = z.infer<typeof browserZ>;
export type OperatingSystem = z.infer<typeof osZ>;
export type UserAgentMeta = z.infer<typeof userAgentMetaZ>;

export function parseBrowserFromUserAgent(userAgent: string): Browser {
    if (!userAgent) return "unknown";

    const ua = userAgent.toLowerCase();

    if (ua.includes("edg/")) return "edge";
    if (ua.includes("chrome/") && !ua.includes("edg/")) return "chrome";
    if (ua.includes("firefox/")) return "firefox";
    if (ua.includes("safari/") && !ua.includes("chrome/")) return "safari";
    if (ua.includes("opera/") || ua.includes("opr/")) return "opera";

    return "other";
}

export function parseOSFromUserAgent(userAgent: string): OperatingSystem {
    if (!userAgent) return "unknown";

    const ua = userAgent.toLowerCase();

    if (ua.includes("windows nt")) return "windows";
    if (ua.includes("mac os x") || ua.includes("macintosh")) return "mac";
    if (ua.includes("linux")) return "linux";
    if (ua.includes("android")) return "android";
    if (ua.includes("iphone") || ua.includes("ipad")) return "ios";

    return "other";
}

export function parseLanguage(acceptLanguage: string): string {
    if (!acceptLanguage) return "zh-CN";

    const languages = acceptLanguage
        .split(",")
        .map((lang) => lang.split(";").at(0)?.trim() ?? "")
        .filter((lang) => lang.length > 0);

    return languages.at(0) || "zh-CN";
}

export function parseUserAgentMeta(
    userAgent: string,
    acceptLanguage: string,
    ip?: string
): UserAgentMeta {
    const meta = {
        os: parseOSFromUserAgent(userAgent),
        browser: parseBrowserFromUserAgent(userAgent),
        language: parseLanguage(acceptLanguage),
        userAgent: userAgent,
        ip: ip || "unknown",
        timestamp: Date.now(),
    };

    return userAgentMetaZ.parse(meta);
}

export function safeParseUserAgentMeta(
    userAgent: string,
    acceptLanguage: string,
    ip?: string
):
    | { success: true; data: UserAgentMeta }
    | { success: false; error: z.ZodError } {
    try {
        const meta = {
            os: parseOSFromUserAgent(userAgent),
            browser: parseBrowserFromUserAgent(userAgent),
            language: parseLanguage(acceptLanguage),
            userAgent: userAgent,
            ip: ip || "unknown",
            timestamp: Date.now(),
        };

        const result = userAgentMetaZ.safeParse(meta);
        if (result.success) {
            return { success: true, data: result.data };
        } else {
            return { success: false, error: result.error };
        }
    } catch (error) {
        return {
            success: false,
            error: new z.ZodError([
                {
                    code: "custom",
                    message: "Unexpected error during parsing",
                    path: [],
                },
            ]),
        };
    }
}
