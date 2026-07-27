"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { FiMenu, FiX, FiLogOut } from "react-icons/fi";

import { adminMenus } from "@/lib/data/adminMenu";
import { getUser, logout } from "@/lib/auth/auth";

const NotificationBadge = ({ count }: { count: number }) => {
    if (count <= 0) return null;

    return (
        <span className="absolute -top-2 -right-2 flex min-w-5 h-5 items-center justify-center rounded-full border-2 border-[#2A4AA1] bg-red-500 px-1 text-[9px] font-bold leading-none text-white shadow-md">
            {count > 9 ? "9+" : count}
        </span>
    );
};

export default function Navbar() {

    const pathname = usePathname();
    const router = useRouter();
    const [user, setUser] = useState<{username: string;role: string;} | null>(null);
    const [mounted, setMounted] = useState(false);
    const [open, setOpen] = useState(false);
    const [summary, setSummary] = useState({
        booking_waiting: 0,
        transaksi_pending: 0,
    });

    const handleLogout = () => {
        logout();
        router.push("/admin/login");
    };

    useEffect(() => {
      setUser(getUser());
    }, []);

    useEffect(() => {
    const fetchSummary = async () => {
        try {
            const res = await fetch("http://127.0.0.1:8000/api/dashboard/");
            const data = await res.json();
            console.log("booking_waiting:", data.booking_waiting);
            console.log("transaksi_pending:", data.transaksi_pending);
            console.log("Dashboard:", data);

            setSummary({
                booking_waiting: data.booking_waiting ?? 0,
                transaksi_pending: data.transaksi_pending ?? 0,
            });
        } catch (err) {
            console.error(err);
        }
    };

    fetchSummary();
}, []);

    return (
        <>
            {/* Mobile Hamburger */}
            <button
                onClick={() => setOpen(true)}
                className="fixed left-4 top-4 z-50 flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white shadow-lg transition hover:scale-105 md:hidden"
            >
                <FiMenu size={22} />
            </button>

            {/* Backdrop */}
            {open && (
                <div
                    onClick={() => setOpen(false)}
                    className="fixed inset-0 z-40 bg-black/40 backdrop-blur-[2px] md:hidden"
                />
            )}

            {/* Sidebar */}
            <aside
                className={`
                    fixed left-0 top-0 z-50
                    h-screen
                    w-72
                    bg-gradient-to-b from-[#2A4AA1] to-[#16357F]
                    text-white
                    shadow-2xl
                    transition-all duration-300

                    ${
                        open ? "translate-x-0" : "-translate-x-full"
                    }

                    md:sticky md:translate-x-0
                    md:w-20
                    lg:w-72

                    flex flex-col
                `}
            >
                {/* Mobile Close */}
                <div className="flex justify-end p-4 md:hidden">
                    <button
                        onClick={() => setOpen(false)}
                        className="rounded-lg p-2 transition hover:bg-white/10"
                    >
                        <FiX size={22} />
                    </button>
                </div>

                {/* Profile */}
                <div className="border-b border-white/10 px-4 py-6 lg:px-6">
                    <div className="flex items-center justify-center gap-3 lg:justify-start">
                        <Image
                            src="/assets/image/profile.png"
                            width={52}
                            height={52}
                            alt="Profile"
                            className="rounded-full border-2 border-white"
                        />

                        <div className="hidden lg:block">
                            <h2 className="text-base font-semibold">
                                {mounted ? user?.username || "Administrator" : "Administrator"}
                            </h2>

                            <p className="text-xs capitalize text-blue-200">
                                {mounted ? user?.role || "Admin" : "Admin"}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Menu */}
                <div className="flex-1 space-y-2 px-3 py-5">
                    {adminMenus.map((menu) => {
                        const Icon = menu.icon;
                        const active = pathname === menu.href;

                        return (
                            <Link
                                key={menu.href}
                                href={menu.href}
                                onClick={() => setOpen(false)}
                                className={`
                                    group
                                    flex
                                    items-center
                                    justify-center
                                    gap-3
                                    rounded-xl
                                    px-3
                                    py-3
                                    transition-all
                                    duration-200

                                    lg:justify-start

                                    ${
                                        active
                                            ? "bg-white text-[#2A4AA1] shadow-lg"
                                            : "hover:bg-white/10"
                                    }
                                `}
                            >
        <div className="relative">
            <Icon
                size={22}
                className="shrink-0 transition group-hover:scale-110"
            />

            {menu.href === "/admin/adminBooking" && (
                <NotificationBadge count={summary.booking_waiting} />
            )}

            {menu.href === "/admin/adminTransaksi" && (
                <NotificationBadge count={summary.transaksi_pending} />
            )}
        </div>

                                <span className="hidden text-sm font-medium lg:block">
                                    {menu.name}
                                </span>
                            </Link>
                        );
                    })}
                </div>

                {/* Logout */}
                <div className="border-t border-white/10 p-3">
                    <button
                        onClick={handleLogout}
                        className="flex w-full items-center justify-center gap-3 rounded-xl border border-red-400 py-3 text-red-300 transition-all duration-200 hover:bg-red-500 hover:text-white lg:justify-start lg:px-3"
                    >
                        <FiLogOut size={20} />

                        <span className="hidden font-medium lg:block">
                            Logout
                        </span>
                    </button>
                </div>
            </aside>
        </>
    );
}