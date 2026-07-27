"use client";

import Image from "next/image";
import { PelangganType } from "@/type/pelangganType";

type Props = {
    customer: PelangganType | null;
};

export default function CustomerDetail({ customer }: Props) {

    if (!customer) {
        return (
            <div className="flex h-[420px] items-center justify-center rounded-3xl border border-white/30 bg-white/60 backdrop-blur-xl">
                <div className="text-center">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-xl font-bold text-slate-500">
                        ?
                    </div>

                    <h2 className="mt-5 text-lg font-semibold text-slate-800">
                        Belum Ada Pelanggan
                    </h2>

                    <p className="mt-2 text-sm text-slate-500">
                        Pilih pelanggan pada panel kiri.
                    </p>
                </div>
            </div>
        );
    }

    const initials = customer.username
        ?.split(" ")
        .map((v) => v[0])
        .join("")
        .substring(0, 2)
        .toUpperCase();

    return (
        <div className="overflow-hidden rounded-3xl border border-white/30 bg-white/60 shadow-sm backdrop-blur-xl">

            {/* Header */}

            <div className="flex flex-col gap-5 border-b border-slate-200 px-6 py-6 lg:flex-row lg:items-center lg:justify-between">

                <div className="flex items-center gap-4">

                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#2563EB] to-[#1D4ED8] text-xl font-bold text-white">
                        {initials}
                    </div>

                    <div>

                        <h2 className="text-xl font-bold text-slate-900">
                            {customer.username}
                        </h2>

                        <p className="mt-1 text-sm text-slate-500">
                            {customer.email}
                        </p>

                        <p className="text-sm text-slate-500">
                            {customer.nomor_hp}
                        </p>

                    </div>

                </div>

                <div className="flex flex-col items-start gap-2 lg:items-end">

                    <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                        {customer.status}
                    </span>

                    <div className="flex gap-1">
                        {[1,2,3,4,5].map((item)=>(
                            <Image
                                key={item}
                                src="/assets/image/star.png"
                                width={16}
                                height={16}
                                alt=""
                            />
                        ))}
                    </div>

                </div>

            </div>

            {/* Information */}

            <div className="p-6">

                <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">

                    <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
                        <span className="text-sm text-slate-500">Total Booking</span>
                        <span className="text-lg font-bold text-slate-900">
                            {customer.total_booking}
                        </span>
                    </div>

                    <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
                        <span className="text-sm text-slate-500">Total Transaksi</span>
                        <span className="font-semibold text-emerald-600">
                            Rp {Number(customer.total_transaksi).toLocaleString("id-ID")}
                        </span>
                    </div>

                    <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
                        <span className="text-sm text-slate-500">Booking Terakhir</span>
                        <span className="font-medium text-slate-800">
                            {customer.last_booking}
                        </span>
                    </div>

                    <div className="flex items-center justify-between px-5 py-4">
                        <span className="text-sm text-slate-500">Status</span>

                        <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                            {customer.status}
                        </span>

                    </div>

                </div>

            </div>

        </div>
    );
}