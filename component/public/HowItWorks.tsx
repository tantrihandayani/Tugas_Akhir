"use client";

import {
  FiCalendar,
  FiCreditCard,
  FiCamera,
  FiDownloadCloud,
  FiArrowRight,
} from "react-icons/fi";

const steps = [
  {
    number: "01",
    title: "Booking",
    icon: FiCalendar,
    color: "bg-[#FFB8E0]",
    items: [
      "Pilih paket foto",
      "Login atau daftar akun",
      "Pilih tanggal & jam",
    ],
  },
  {
    number: "02",
    title: "Pembayaran",
    icon: FiCreditCard,
    color: "bg-[#F7F48B]",
    items: [
      "Pilih metode pembayaran",
      "Upload bukti pembayaran",
      "Tunggu verifikasi admin",
    ],
  },
  {
    number: "03",
    title: "Datang Studio",
    icon: FiCamera,
    color: "bg-[#C6B6FF]",
    items: [
      "Datang sesuai jadwal",
      "Nikmati sesi foto",
      "Pilih hasil terbaik",
    ],
  },
  {
    number: "04",
    title: "Download",
    icon: FiDownloadCloud,
    color: "bg-[#C7F0E9]",
    items: [
      "Admin mengirim Google Drive",
      "Download hasil foto",
      "Bagikan momenmu ✨",
    ],
  },
];

export default function HowItWorks() {
  return (
    <section className="w-full border-b-[6px] border-black bg-[#FFF9F0] py-16">
      <div className="mx-auto max-w-7xl px-5">
        {/* TITLE */}
        <div className="mb-8 text-center">
        <div className="mx-auto mb-3 w-fit rotate-[-2deg] rounded-full border-4 border-black bg-[#F7F48B] px-4 py-1.5 shadow-[4px_4px_0px_0px_#000]">
            <p className="text-xs font-black tracking-wide text-black md:text-sm">
            ✨ HOW IT WORKS
            </p>
        </div>

        <h2 className="text-2xl font-black leading-none text-black md:text-4xl">
            BOOKING CUMA
            <br />
            4 LANGKAH
        </h2>

        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-black/70 md:text-base">
            Booking studio jadi lebih praktis, mulai dari pilih paket hingga
            download hasil foto.
        </p>

        </div>

        {/* DESKTOP */}
<div className="hidden items-center justify-center gap-3 lg:flex">

  {steps.map((step, index) => {
    const Icon = step.icon;

    return (
      <div key={step.number} className="flex items-center">

        {/* CARD */}
        <div className="group relative w-[185px] rounded-[22px] border-4 border-black bg-white p-4 shadow-[5px_5px_0px_0px_#000] transition-all duration-300 hover:-translate-y-1 hover:shadow-[7px_7px_0px_0px_#000]">

          {/* NUMBER */}
          <span className="absolute right-4 top-2 text-4xl font-black text-black/10">
            {step.number}
          </span>

          {/* ICON */}
          <div
            className={`${step.color} flex h-12 w-12 items-center justify-center rounded-xl border-[3px] border-black transition-transform duration-300 group-hover:rotate-6`}
          >
            <Icon size={20} />
          </div>

          {/* TITLE */}
          <h3 className="mt-4 text-lg font-black text-black">
            {step.title}
          </h3>

          {/* LIST */}
          <ul className="mt-3 space-y-1.5">
            {step.items.map((item) => (
              <li
                key={item}
                className="flex items-start gap-2 text-xs leading-relaxed text-black/70"
              >
                <span className="mt-[6px] h-1.5 w-1.5 rounded-full bg-black"></span>
                <span>{item}</span>
              </li>
            ))}
          </ul>

        </div>

        {/* CONNECTOR */}
        {index !== steps.length - 1 && (
          <div className="mx-2 h-1 w-8 rounded-full bg-black" />
        )}

      </div>
    );
  })}

</div>

{/* MOBILE */}
<div className="space-y-4 lg:hidden">

  {steps.map((step) => {
    const Icon = step.icon;

    return (
      <div key={step.number} className="flex items-start gap-3">

        {/* ICON */}
        <div
          className={`${step.color} flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border-[3px] border-black`}
        >
          <Icon size={18} />
        </div>

        {/* CARD */}
        <div className="flex-1 rounded-[20px] border-4 border-black bg-white p-4 shadow-[5px_5px_0px_0px_#000]">

          {/* HEADER */}
          <div className="flex items-center justify-between">

            <h3 className="text-lg font-black text-black">
              {step.title}
            </h3>

            <span className="text-3xl font-black text-black/10">
              {step.number}
            </span>

          </div>

          {/* LIST */}
          <ul className="mt-2 space-y-1.5">
            {step.items.map((item) => (
              <li
                key={item}
                className="flex items-start gap-2 text-xs leading-relaxed text-black/70"
              >
                <span className="mt-[6px] h-1.5 w-1.5 rounded-full bg-black"></span>
                <span>{item}</span>
              </li>
            ))}
          </ul>

        </div>

      </div>
    );
  })}

</div>

{/* FOOT NOTE */}
<div className="mx-auto mt-8 max-w-2xl rounded-[22px] border-4 border-black bg-[#C7F0E9] p-4 text-center shadow-[5px_5px_0px_0px_#000]">

  <h3 className="text-lg font-black text-black md:text-xl">
    🎉 Siap Buat Momen Terbaikmu?
  </h3>

  <p className="mx-auto mt-2 max-w-lg text-sm leading-relaxed text-black/70">
    Setelah pembayaran diverifikasi, kamu tinggal datang sesuai jadwal.
    Hasil foto akan dikirim melalui Google Drive dan siap diunduh kapan saja.
  </p>

</div>

</div>
</section>
  );
}