"use client";

import Image from "next/image";

type Props = {
    search: string;
    setSearch: (value: string) => void;
    sortBy: string;
    setSortBy: (value: string) => void;
};

export default function CustomerHeader({
    search,
    setSearch,
    sortBy,
    setSortBy,
}: Props) {

    return (
        <div className="bg-white border-b border-slate-200 px-8 py-5">

            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

                {/* Judul */}

                <div>

                    <h1 className="text-3xl font-extrabold text-[#1E3A8A]">
                        Customer Management
                    </h1>

                    <p className="mt-1 text-sm text-slate-500">
                        Kelola seluruh pelanggan Studio IBU.
                    </p>

                </div>

                {/* Search + Sort */}

                <div className="flex items-center gap-3">

                    <div className="relative">

                        <Image
                            src="/assets/image/pipel.png"
                            width={18}
                            height={18}
                            alt=""
                            className="absolute left-4 top-1/2 -translate-y-1/2 opacity-50"
                        />

                        <input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Cari pelanggan..."
                            className="w-72 h-11 rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm outline-none transition-all focus:border-[#2A4AA1] focus:bg-white"
                        />

                    </div>

                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="w-52 h-11 rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none transition-all focus:border-[#2A4AA1] focus:bg-white"
                    >
                        <option value="az">Nama A-Z</option>
                        <option value="za">Nama Z-A</option>
                        <option value="booking">Booking Terbanyak</option>
                        <option value="spending">Transaksi Terbesar</option>
                    </select>

                </div>

            </div>

        </div>
    );
}