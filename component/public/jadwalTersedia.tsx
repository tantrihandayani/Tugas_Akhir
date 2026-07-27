"use client";

import { useEffect, useState } from "react";

type Booking = {
  id: number;
  date: string;
  time: string;
  booking_status: string;
  payment_status: string;
};


export default function JadwalTersedia() {

  const [booking, setBooking] = useState<Booking[]>([]);

  const getTodaySlots = () => {
    const hari = new Date().getDay();

    if (hari === 0 || hari === 6) {
      return [
        "09:00",
        "09:30",
        "10:00",
        "10:30",
        "11:00",
        "11:30",
        "13:00",
        "13:30",
        "14:00",
        "14:30",
        "15:00",
        "15:30",
        "16:00",
        "16:30",
        "17:00",
        "17:30",
        "18:00",
        "18:30",
        "19:00",
        "19:30",
        "20:00",
        "20:30",
        "21:00",
      ];
    }

    return [
      "10:00",
      "10:30",
      "11:00",
      "11:30",
      "13:00",
      "13:30",
      "14:00",
      "14:30",
      "15:00",
      "15:30",
      "16:00",
      "16:30",
      "17:00",
      "17:30",
      "18:00",
      "18:30",
      "19:00",
      "19:30",
      "20:00",
    ];
  };

const allJam = getTodaySlots();

const getTodayLocal = () => {
    const now = new Date();
    const offset = now.getTimezoneOffset();

    const local = new Date(
      now.getTime() - offset * 60000
    );

    return local.toISOString().split("T")[0];
  };

  const today = getTodayLocal();
  
  

  useEffect(() => {

    fetch("http://127.0.0.1:8000/api/booking/")
      .then((res) => res.json())
      .then((data) => setBooking(data))
      .catch((err) => console.error(err));

  }, []);

  const bookedToday = booking
    .filter(
      (item) => item.date === today
    )
    .map((item) =>
      item.time.slice(0, 5)
    );

  const isPastTime = (jam: string) => {
    const now = new Date();

    const [hour, minute] = jam
      .split(":")
      .map(Number);

    const slot = new Date();

    slot.setHours(hour);
    slot.setMinutes(minute);
    slot.setSeconds(0);

    return slot < now;
  };

  return (
  <div className="w-full border-t-[5px] border-black bg-[#C7F0E9] px-5 py-10 md:px-8 md:py-12">

    {/* TITLE */}
    <div className="mb-6">
      <div className="mb-4 w-fit rotate-[-2deg] rounded-full border-2 border-black bg-[#FFB8E0] px-3 py-1.5 shadow-[3px_3px_0px_0px_#000]">
        <p className="text-xs font-black text-black md:text-sm">
          ⏰ STUDIO SCHEDULE
        </p>
      </div>

      <h1 className="text-2xl font-black leading-none text-black md:text-4xl">
        JADWAL <br />
        TERSEDIA 📅
      </h1>
    </div>

{/* CONTENT */}
<div className="flex flex-col gap-5 lg:flex-row">

  {/* LEFT */}
  <div className="flex-1 rounded-[24px] border-4 border-black bg-[#F7F48B] p-5 shadow-[6px_6px_0px_0px_#000]">

    <h1 className="mb-4 text-xl font-black text-black md:text-2xl">
      JAM OPERASIONAL ✨
    </h1>

    <div className="flex flex-col gap-3">

      <div className="flex items-center justify-between rounded-xl border-[3px] border-black bg-white px-4 py-3 font-bold text-[#002381]">
        <p>Senin - Jumat</p>
        <p>10:00 - 20:00</p>
      </div>

      <div className="flex items-center justify-between rounded-xl border-[3px] border-black bg-white px-4 py-3 font-bold text-[#002381]">
        <p>Sabtu - Minggu</p>
        <p>09:00 - 21:00</p>
      </div>

    </div>

  </div>

        {/* RIGHT */}
<div className="flex-1 rounded-[24px] border-4 border-black bg-[#C6B6FF] p-5 shadow-[6px_6px_0px_0px_#000]">
  <h1 className="text-xl font-black text-black md:text-2xl">
    SLOT HARI INI 🎀
  </h1>
  <p className="mb-4 mt-1 text-sm font-medium text-black/70">
    Slot yang masih tersedia untuk booking hari ini.
  </p>
  <div className="flex flex-wrap gap-2.5">
    {allJam.map((jam) => {
      const booked = bookedToday.includes(jam);
      const passed = isPastTime(jam);

      return (
        <div
          key={jam}
          className={`min-w-[80px] rounded-lg border-[3px] border-black px-2.5 py-1.5 text-center shadow-[2px_2px_0px_0px_#000] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_0px_#000] ${
            booked
              ? "bg-red-400"
              : passed
              ? "bg-gray-300"
              : "bg-green-300"
          }`}
        >
          <p className="text-sm font-black">
            {jam}
          </p>
          <p className="mt-1 text-[10px] font-semibold leading-none">
            {booked
              ? "🔴 Dibooking"
              : passed
              ? "⚫ Lewat"
              : "🟢 Tersedia"}
          </p>
        </div>
      );
    })}
  </div>
</div>
</div>
</div>
);
}
