"use client";

import {
    FiCalendar,
    FiClock,
    FiCreditCard,
    FiCamera,
    FiImage,
    FiArrowRight,
    FiCheckCircle
} from "react-icons/fi";
import { Fragment } from "react";

type Props = {
    booking: {
        package_name: string;
        kategori: string;
        date: string;
        time?: string;
        payment_method?: string;
        booking_status: string;
        drive_link?: string | null;
    } | null;
};

export default function ActiveBooking({ booking }: Props) {
    if (!booking) {
        return (
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
                <h2 className="text-2xl font-bold text-slate-800">
                    Booking Aktif
                </h2>
                <p className="mt-5 text-slate-500">
                    Kamu belum memiliki booking aktif.
                </p>
            </div>
        );
    }

    const statusColor =
        booking.booking_status === "finished"
            ? "bg-green-100 text-green-700"
            : booking.booking_status === "progress"
            ? "bg-blue-100 text-blue-700"
            : "bg-yellow-100 text-yellow-700";

    const paymentStep =
        booking.booking_status === "waiting"
            ? 1
            : booking.booking_status === "progress"
            ? 2
            : 4;

    const statusLabel =
        booking.booking_status === "finished"
            ? "Selesai"
            : booking.booking_status === "progress"
            ? "Sedang Berlangsung"
            : "Menunggu Validasi";

    return (

        <div className="mt-5 group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-500 hover:-translate-y-1.5 hover:border-[#2A4AA1] hover:shadow-2xl md:p-6">
         <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br from-[#2A4AA1]/5 via-transparent to-transparent opacity-0 transition-all duration-500 group-hover:opacity-100" />
            {/* HEADER */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#2A4AA1] via-[#3A5FC2] to-[#5C7BF0] px-4 py-2.5">
    {/* Background */}
    <div className="absolute -right-5 -top-5 h-16 w-16 rounded-full bg-white/10 blur-lg" />
    <div className="absolute -bottom-6 left-4 h-12 w-12 rounded-full bg-white/10 blur-lg" />

    <div className="relative flex items-center justify-between gap-3">

        {/* LEFT */}
        <div className="min-w-0">
            <p className="text-[9px] uppercase tracking-[0.18em] text-blue-100">
                Booking Aktif
            </p>

            <h2 className="mt-0.5 truncate text-base font-bold text-white md:text-lg">
                {booking.package_name}
            </h2>

            <p className="text-[10px] text-blue-100">
                {booking.kategori} • {booking.date}
            </p>
        </div>

        {/* STATUS */}
        <div
            className={`flex shrink-0 items-center gap-2 rounded-full border border-white/20 px-2.5 py-1 text-[11px] backdrop-blur-md transition-all duration-300 hover:scale-105 ${
                booking.booking_status === "finished"
                    ? "bg-green-400/20 text-green-100"
                    : booking.booking_status === "progress"
                    ? "bg-sky-400/20 text-sky-100"
                    : "bg-yellow-400/20 text-yellow-100"
            }`}
        >
            <span className="relative flex h-2.5 w-2.5">

                {/* Ping hanya untuk status aktif */}
                {booking.booking_status !== "finished" && (
                    <span className="absolute inset-0 animate-ping rounded-full bg-current opacity-60" />
                )}

                {/* Dot */}
                <span className="relative h-2.5 w-2.5 rounded-full bg-current shadow-[0_0_8px_currentColor]" />
            </span>

            <span className="font-medium whitespace-nowrap">
                {statusLabel}
            </span>
        </div>
    </div>
</div>
            {/* CONTENT */}
            <div className="mt-4 grid grid-cols-2 gap-2 md:grid-cols-4">

                {[
                    {
                        title: "Tanggal",
                        value: booking.date,
                        icon: <FiCalendar size={14} />,
                    },
                    {
                        title: "Jam",
                        value: booking.time ?? "-",
                        icon: <FiClock size={14} />,
                    },
                    {
                        title: "Pembayaran",
                        value: (booking.payment_method ?? "-").toUpperCase(),
                        icon: <FiCreditCard size={14} />,
                    },
                    {
                        title: "Kategori",
                        value: booking.kategori,
                        icon: <FiImage size={14} />,
                    },
                ].map((item) => (
                    <div
                        key={item.title}
                        className="group rounded-lg bg-slate-50 px-3 py-2 transition-all duration-300 hover:bg-blue-50"
                    >
                        <div className="flex items-center gap-2">
                            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-white text-[#2A4AA1] shadow-sm transition-all duration-300 group-hover:scale-105 group-hover:bg-[#2A4AA1] group-hover:text-white">
                                {item.icon}
                            </div>
                            <div className="min-w-0">
                                <p className="text-[10px] leading-none text-slate-500">
                                    {item.title}
                                </p>

                                <p className="mt-1 truncate text-xs font-semibold text-slate-800">
                                    {item.value}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {/* PROGRESS */}
            <div className="mt-4 rounded-xl bg-slate-50 px-4 py-3">
                <div className="mb-4 flex items-center justify-between">
                    <div>
                        <p className="text-sm font-semibold text-slate-800">
                            Progress Booking
                        </p>

                        <p className="text-[11px] text-slate-500">
                            Ikuti status bookingmu
                        </p>
                    </div>
                    <FiCheckCircle className="text-lg text-[#2A4AA1]" />
                </div>

                <div className="flex items-center">
                    {["Booking", "Validasi", "Sesi", "Selesai"].map((label, index) => {
                        const step = index + 1;
                        const active = paymentStep >= step;
                        const done = paymentStep > step;

                        return (
                            <Fragment key={label}>
                                <div className="flex flex-col items-center">
                                    <div
                                        className={`flex h-7 w-7 items-center justify-center rounded-full border text-[10px] font-semibold transition-all duration-300 ${
                                            active
                                                ? "border-[#2A4AA1] bg-[#2A4AA1] text-white"
                                                : "border-slate-300 bg-white text-slate-400"
                                        }`}
                                    >
                                        {done ? (
                                            <FiCheckCircle size={13} />
                                        ) : (
                                            step
                                        )}
                                    </div>

                                    <span
                                        className={`mt-1 text-[10px] transition-all ${
                                            active
                                                ? "font-medium text-[#2A4AA1]"
                                                : "text-slate-400"
                                        }`}
                                    >
                                        {label}
                                    </span>
                                </div>

                                {index < 3 && (
                                    <div className="mx-2 h-[2px] flex-1 rounded-full bg-slate-200">
                                        <div
                                            className={`h-full rounded-full bg-[#2A4AA1] transition-all duration-500 ${
                                                done ? "w-full" : "w-0"
                                            }`}
                                        />

                                    </div>
                                )}
                            </Fragment>
                        );
                    })}
                </div>
            </div>
            {/* FOOTER */}
<div className="mt-4 border-t border-dashed border-slate-200 pt-3">
  {booking.booking_status === "finished" && booking.drive_link ? (
    <div className="flex items-center justify-between rounded-xl border border-green-200 bg-green-50 px-3 py-2">

      <div className="flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-100 text-green-700">
          <FiImage size={15} />
        </div>

        <div>
          <p className="text-xs font-semibold text-slate-800">
            Hasil Foto Siap
          </p>

          <p className="text-[10px] text-slate-500">
            Buka Google Drive untuk melihat semua foto.
          </p>
        </div>
      </div>

      <a
        href={booking.drive_link}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1 rounded-lg bg-[#2A4AA1] px-3 py-1.5 text-[11px] font-semibold text-white transition hover:bg-[#1F3E93]"
      >
        Drive
        <FiArrowRight size={12} />
      </a>
    </div>
  ) : (
    <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2">

      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-200 text-slate-500">
        <FiImage size={15} />
      </div>

      <div>
        <p className="text-xs font-semibold text-slate-700">
          Hasil Foto Belum Tersedia
        </p>

        <p className="text-[10px] text-slate-500">
          Link Google Drive akan muncul setelah proses selesai.
        </p>
      </div>
    </div>
  )}
</div>
        </div>
    );
}