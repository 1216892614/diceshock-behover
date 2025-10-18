import Logo from "@/client/assets/svg/black-simplify-with-text-logo.svg?react";
import Gradient from "./Gradient";
import { ArrowUpIcon } from "@phosphor-icons/react/dist/ssr";
import { Link } from "@tanstack/react-router";

const Footer = () => {
    return (
        <>
            <Gradient
                direction="col"
                className={{
                    main: "w-full h-[5rem]",
                    a: "bg-neutral",
                    b: "bg-base-100",
                }}
            />

            <footer className="footer sm:footer-horizontal bg-neutral text-neutral-content p-10">
                <aside>
                    <Logo className="w-32" />

                    <p>
                        武汉奇兵文化有限公司
                        <br />
                        Wuhan DiceShock Culture Co., Ltd.
                        <br />
                        位于光谷总部国际2栋 203 室
                        <br />
                        This page is powered by Vercel.
                    </p>
                </aside>
                <nav>
                    <h6 className="footer-title">服务</h6>
                    <Link to="/" className="link link-hover">
                        库存
                    </Link>
                    <Link to="/" className="link link-hover">
                        DiceShock Agents
                    </Link>
                    <Link to="/" className="link link-hover">
                        活动&比赛
                    </Link>
                    <Link to="/" className="link link-hover">
                        美团商家
                    </Link>
                </nav>
                <nav>
                    <h6 className="footer-title">关于我们</h6>
                    <Link to="/contact-us" className="link link-hover">
                        联系我们
                    </Link>
                    <Link to="/" className="link link-hover">
                        加入我们
                    </Link>
                    <Link to="/" className="link link-hover">
                        服务条款
                    </Link>
                    <Link to="/" className="link link-hover">
                        Cookie policy
                    </Link>
                </nav>
                <nav>
                    <h6 className="footer-title">友情连接</h6>
                    <Link
                        to="https://goddessfantasy.net"
                        className="link link-hover"
                    >
                        纯美苹果园
                    </Link>
                    <Link to="https://trow.cc/" className="link link-hover">
                        The Ring of Wonder
                    </Link>
                    <Link
                        to="https://www.gstonegames.com/"
                        className="link link-hover"
                    >
                        集石桌游
                    </Link>
                </nav>
            </footer>

            <button
                onClick={() =>
                    document.scrollingElement?.scrollTo?.({
                        top: 0,
                        behavior: "smooth",
                    })
                }
                className="w-full h-[4rem] bg-primary hover:bg-base-100 hover:[&>h5]:text-base-content flex justify-between items-center"
            >
                <h5 className="mx-auto text-base-200 text-xl">返回顶部</h5>
                <div className="w-[4rem] h-full bg-base-100 flex justify-center items-center">
                    <ArrowUpIcon className="size-10" />
                </div>
            </button>
        </>
    );
};

export default Footer;
