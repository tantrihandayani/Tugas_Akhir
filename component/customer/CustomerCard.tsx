"use client";

import Image from "next/image";
import { PelangganType } from "@/type/pelangganType";

type Props = {
    customer: PelangganType;
    active: boolean;
    onClick: () => void;
};

export default function CustomerCard({
    customer,
    active,
    onClick,
}: Props) {

    const initials = customer.username
        ?.split(" ")
        .map((item) => item[0])
        .join("")
        .substring(0, 2)
        .toUpperCase();

    return (
    <button
        onClick={onClick}
        className={`group relative w-full overflow-hidden rounded-2xl border p-4 text-left transition-all duration-300 ${
            active
                ? "border-blue-300 bg-white/80 shadow-lg shadow-blue-100 backdrop-blur-xl"
                : "border-white/40 bg-white/50 backdrop-blur-xl hover:-translate-y-0.5 hover:border-blue-200 hover:bg-white/70"
        }`}
    >

        {active && (
            <div className="absolute left-0 top-0 h-full w-1 rounded-full bg-gradient-to-b from-[#2563EB] to-[#60A5FA]" />
        )}

        <div className="flex items-center justify-between">

            <div className="flex items-center gap-3 min-w-0">

                <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-sm font-bold text-white ${
                    active
                        ? "bg-gradient-to-br from-[#2563EB] to-[#1D4ED8]"
                        : "bg-gradient-to-br from-slate-500 to-slate-700"
                }`}>
                    {initials}
                </div>

                <div className="min-w-0">

                    <h2 className="truncate text-[15px] font-semibold text-slate-900">
                        {customer.username}
                    </h2>

                    <p className="truncate text-xs text-slate-500">
                        {customer.nomor_hp}
                    </p>

                </div>

            </div>

            <Image
                src="/assets/image/approve.png"
                width={16}
                height={16}
                alt=""
                className={`${active ? "opacity-100" : "opacity-40"} transition-all`}
            />

        </div>

        <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">

            <span className="rounded-lg bg-slate-100 px-2 py-1 font-medium text-slate-600">
                {customer.total_booking} Booking
            </span>

            <span className="rounded-lg bg-blue-50 px-2 py-1 font-medium text-blue-700">
                Rp {Number(customer.total_transaksi).toLocaleString("id-ID")}
            </span>

            <span className={`ml-auto rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                customer.status?.toLowerCase() === "finished"
                    ? "bg-emerald-100 text-emerald-700"
                    : "bg-amber-100 text-amber-700"
            }`}>
                {customer.status}
            </span>

        </div>

    </button>
);
}