import { useRef, useState } from "react";
import { motion, useScroll, transform, useTransform } from "motion/react";
import LightingLogoIcon from "../icons/LightingLogoIcon";
import LensFlare from "./LensFlare";

const content = [
    [
        <span>多个</span>,
        <span>位面</span>,
        <span>的居民声称遭遇了来自其他世界的</span>,
        <span className="underline">异能人士</span>,
        <span>.</span>,
    ],
    [
        <span>传闻这些</span>,
        <span>异能人士</span>,
        <span>通过一间名为 </span>,
        <span className="underline">DiceShock©</span>,
        <span> 的店铺往返</span>,
        <span>多元位面</span>,
        <span>.</span>,
    ],
    [
        <span>经调查, 这间名为 </span>,
        <span>DiceShock©</span>,
        <span> 的店铺是一个连接</span>,
        <span>多元位面</span>,
        <span>的</span>,
        <span>实体</span>,
        <span>.</span>,
    ],
    [
        <span>而遭遇者们将这些传闻中的</span>,
        <span>异能人士</span>,
        <span>称为</span>,
    ],
    [
        <span className="text-primary text-3xl pl-4">
            The Shock
            <LightingLogoIcon className="inline size-5" />
        </span>,
    ],
];

export default function TheShockScreen() {
    const trackRef = useRef<HTMLDivElement>(null);
    const screenRef = useRef<HTMLDivElement>(null);

    const [count, setCount] = useState(0);

    const { scrollY } = useScroll();
    const progress = useTransform(scrollY, (y) => {
        const trackEl = trackRef.current;
        const screenEl = screenRef.current;

        if (!trackEl || !screenEl) return 0;

        const height = screenEl.offsetHeight;
        const trackHeight = trackEl.scrollHeight;
        const top = trackEl.offsetTop;

        return transform(
            y - top,
            [0 - height / 2, trackHeight - height * 1.2],
            [0, 1]
        );
    });

    return (
        <div
            onClick={() => setCount(count + 1)}
            ref={trackRef}
            className="w-full h-[200vh]"
        >
            <div
                ref={screenRef}
                className="sticky top-0 left-0 w-full h-screen"
            >
                <div className="relative size-full">
                    <motion.div style={{ opacity: progress, scale: progress }}>
                        <LensFlare className="absolute right-0 top-0 translate-x-1/2 -translate-y-1/2 opacity-30 dark:opacity-50" />
                    </motion.div>

                    <div className="font-[DinkieBitmap-7px] text-xl flex flex-col gap-4 absolute top-1/3 left-7">
                        {content.map((p, y) => {
                            const segmentStart = y / content.length;
                            const segmentEnd = (y + 1) / content.length;

                            return (
                                <p key={y}>
                                    {p.map((span, x) => {
                                        const innerStart =
                                            segmentStart +
                                            (x / p.length) *
                                                (segmentEnd - segmentStart);
                                        const innerEnd =
                                            innerStart +
                                            (segmentEnd - segmentStart) /
                                                p.length;

                                        // 用 useTransform 生成派生的 MotionValue（可随 progress 变化）
                                        const itemProgress = useTransform(
                                            progress,
                                            [innerStart, innerEnd],
                                            [0, 1]
                                        );
                                        const itemY = useTransform(
                                            itemProgress,
                                            [0, 1],
                                            [12, 0]
                                        );

                                        return (
                                            <motion.span
                                                key={x}
                                                style={{
                                                    opacity: itemProgress,
                                                    y: itemY,
                                                }}
                                            >
                                                {span}
                                            </motion.span>
                                        );
                                    })}
                                </p>
                            );
                        })}
                    </div>

                    <div
                        className="size-[300%] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                        style={{
                            backgroundImage: `linear-gradient(var(--color-base-100) 1px, transparent 1px)`,
                            backgroundSize: "3px 3px",
                        }}
                    />
                </div>
            </div>
        </div>
    );
}
