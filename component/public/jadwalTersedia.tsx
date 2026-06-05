"use client";

import { useEffect, useState } from "react";

type Booking = {
  id: number;
  date: string;
  time: string;
  status: string;
};

export default function JadwalTersedia() {

  const [booking, setBooking] = useState<Booking[]>([]);

  const allJam = [
    "10:00", "10:30", 
    "11:00", "11:30", 
    "13:00", "13:30", 
    "14:00", "14:30", 
    "15:00", "15:30", 
    "16:00", "16:30", 
    "17:00", "17:30", 
    "18:00", "18:30", 
    "19:00", "19:30", 
    "20:00", "20:30",
  ];

  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {

    fetch("http://127.0.0.1:8000/api/booking/")
      .then((res) => res.json())
      .then((data) => setBooking(data))
      .catch((err) => console.error(err));

  }, []);

  const bookedToday = booking
    .filter(
      (item) =>
        item.date === today &&
        item.status !== "Rejected"
    )
    .map((item) => item.time);

  const availableJam = allJam.filter(
    (jam) => !bookedToday.includes(jam)
  );

  return (
    <div
      className="
        w-full
        bg-[#C7F0E9]
        border-t-[5px]
        border-black
        px-6
        md:px-10
        py-20
      "
    >

      {/* TITLE */}
      <div className="mb-14">

        <div
          className="
            w-fit
            px-5
            py-2
            bg-[#FFB8E0]
            border-[4px]
            border-black
            rounded-full
            rotate-[-2deg]
            shadow-[5px_5px_0px_0px_#000]
            mb-6
          "
        >
          <p className="font-black text-black">
            ⏰ STUDIO SCHEDULE
          </p>
        </div>

        <h1
          className="
            text-5xl
            md:text-7xl
            font-black
            text-black
            leading-none
          "
        >
          JADWAL <br />
          TERSEDIA 📅
        </h1>

      </div>

      {/* CONTENT */}
      <div
        className="
          flex
          flex-col
          lg:flex-row
          gap-10
        "
      >

        {/* LEFT */}
        <div
          className="
            flex-1
            bg-[#F7F48B]
            border-[5px]
            border-black
            rounded-[35px]
            p-8
            shadow-[10px_10px_0px_0px_#000]
          "
        >

          <h1 className="text-3xl font-black  mb-6">
            JAM OPERASIONAL ✨
          </h1>

          <div className="flex flex-col gap-4">

            <div
              className="
                text-[#002381]
                bg-white
                border-[4px]
                border-black
                rounded-2xl
                px-5
                py-4
                font-black
                flex
                justify-between
              "
            >
              <p>Senin - Jumat</p>
              <p>10:00 - 20:00</p>
            </div>

            <div
              className="
                text-[#002381]
                bg-white
                border-[4px]
                border-black
                rounded-2xl
                px-5
                py-4
                font-black
                flex
                justify-between
              "
            >
              <p>Sabtu - Minggu</p>
              <p>09:00 - 21:00</p>
            </div>

          </div>

        </div>

        {/* RIGHT */}
        <div
          className="
            flex-1
            bg-[#C6B6FF]
            border-[5px]
            border-black
            rounded-[35px]
            p-8
            shadow-[10px_10px_0px_0px_#000]
          "
        >

          <h1 className="text-3xl font-black  ">
            SLOT HARI INI 🎀
          </h1>

          <p className="font-semibold mb-6 ">
            Slot yang masih tersedia untuk booking hari ini.
          </p>

          <div className="flex flex-wrap gap-4">

            {availableJam.map((item, index) => (

              <div
                key={index}
                className="
                  text-[#002381]
                  px-5
                  py-3
                  bg-white
                  border-[4px]
                  border-black
                  rounded-2xl
                  font-black
                  shadow-[4px_4px_0px_0px_#000]
                "
              >
                {item}
              </div>
            ))}

            {availableJam.length === 0 && (

              <div
                className="
                  px-5
                  py-3
                  bg-red-300
                  border-[4px]
                  border-black
                  rounded-2xl
                  font-black
                "
              >
                Semua slot penuh 😭
              </div>

            )}

          </div>

        </div>

      </div>
    </div>
  );
}
