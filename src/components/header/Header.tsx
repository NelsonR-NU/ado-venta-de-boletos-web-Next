"use client";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import ADOLogo from "@/assets/svg/adoLogo.svg";
import ProfileIcon from "@/assets/svg/profile.svg";
import NotificationIcon from "@/assets/svg/notifications.svg";
import MenuIcon from "@/assets/svg/menu.svg";
import Button from "@/components/button/Button";
import { useTranslations } from "next-intl";
import { useDispatch, useSelector } from "react-redux";
import { logAction } from "./../../redux/features/consoleLogger";

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const { push } = useRouter();
    const isAuthenticated = false;
    const t = useTranslations('header');
    const dispatch = useDispatch();


    const handleProfileClick = () => push("/");
    const handleLoginClick = () => push("/");
    const handleRegisterClick = () => push("/");
    const handleLogoClick = () => push("/");

    const click = dispatch(logAction({ message: "Hello, Redux!" }));

    const menuItems = [
        { label: t('menu_items.travel'), link: "/" },
        { label: t('menu_items.my_trips'), link: "/" },
        { label: t('menu_items.follow_my_journey'), link: "/" },
        { label: t('menu_items.briefcase'), link: "/" }
    ];

    return (
        <header className="bg-ado-background w-full">
            <div className="w-[85%] md:w-[90%] mx-auto flex items-center justify-between py-4">
                <div role="ADO-logo"
                    tabIndex={0}>
                    <Image
                        className="cursor-pointer w-[90px] h-[35px] md:w-[120px] md:h-[44px] md:relative md:left-[-16px]"
                        onClick={handleLogoClick}
                        alt="ADO Logo"
                        src={ADOLogo}
                        height={44}
                        width={120}
                    />
                </div>
                <div className="flex items-center justify-around gap-x-8">
                    <nav className="hidden md:flex items-center gap-6">
                        {menuItems.map((item, index) => (
                            <div key={index} className="flex items-center">
                                <a href={item.link} className="text-black text-sm hover:text-ado-blue mr-4">
                                    {item.label}
                                </a>
                                {index < menuItems.length - 1 && (
                                    <span className="border border-ado-seal-grey h-6 w-[1px]" />
                                )}
                            </div>
                        ))}
                    </nav>


                    <div className="flex items-center gap-6">
                        {isAuthenticated ? (
                            <>
                                <button aria-label="Notifications">
                                    <Image
                                        alt="Notifications"
                                        src={NotificationIcon}
                                        className="cursor-pointer"
                                        height={50}
                                        width={50}
                                    />
                                </button>
                                <button onClick={handleProfileClick} aria-label="Profile">
                                    <Image
                                        alt="Profile"
                                        src={ProfileIcon}
                                        height={40}
                                        width={40}
                                        className="cursor-pointer"
                                    />
                                </button>
                            </>
                        ) : (
                            <>
                                <div className="flex gap-4 xl:hidden">
                                    <button aria-label="Notifications">
                                        <Image
                                            alt="Notifications"
                                            src={NotificationIcon}
                                            className="cursor-pointer"
                                            height={50}
                                            width={50}
                                        />
                                    </button>
                                    <button onClick={handleProfileClick} aria-label="Profile">
                                        <Image
                                            alt="Profile"
                                            src={ProfileIcon}
                                            height={40}
                                            width={40}
                                            className="cursor-pointer"
                                        />
                                    </button>
                                </div>
                                <div className="hidden xl:flex gap-4">
                                    <Button variant="filled" onClick={handleLoginClick}>
                                        {t('button.login')}
                                    </Button>
                                    <Button variant="outlined" onClick={handleRegisterClick}>
                                        {t('button.register')}
                                    </Button>
                                </div>
                            </>
                        )}
                        <button
                            onClick={() => setMenuOpen(!menuOpen)}
                            aria-label={menuOpen ? "Close menu" : "Open menu"}
                            className="p-2 rounded-lg md:hidden"
                        >
                            {menuOpen ? (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            ) : (
                                <Image
                                    alt="Menu"
                                    src={MenuIcon}
                                    height={40}
                                    width={40}
                                    className="cursor-pointer"
                                />
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
