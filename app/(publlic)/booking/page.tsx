
"use client";

import { useEffect, useState } from "react";

type Layanan = {
  id: number;
  title: string;
};

export default function BookingPage() {

  const [layanan, setLayanan] = useState<Layanan[]>([]);
  const [jamTerpakai, setJamTerpakai] = useState<string[]>([]);

  const [form, setForm] = useState({
    name: "",
    nomor_hp: "",
    package_name: "",
    payment_method: "QRIS",
    date: "",
    time: "",
    deskripsi: "",
    status: "Waiting",
  });

  useEffect(() => {

    fetch("http://127.0.0.1:8000/api/layanan/")
      .then((res) => res.json())
      .then((data) => setLayanan(data));

  }, []);



  useEffect(() => {
  if (!form.date) return;

  fetch("http://127.0.0.1:8000/api/booking/")
    .then((res) => res.json())
    .then((data) => {
      const bookedTimes = data
        .filter(
          (item: any) => item.date === form.date
        )
        .map(
          (item: any) => item.time.slice(0, 5)
        );
      setJamTerpakai(bookedTimes);
    });

}, [form.date]);

  const handleSubmit = async () => {

    try {

      const res = await fetch(
        "http://127.0.0.1:8000/api/booking/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );

      const data = await res.json();
      if (res.ok) {
        alert("Booking berhasil!");
        console.log(data);
      } else {
        alert(data.message || "Booking gagal");
      }
    } catch (error) {
      console.error(error);
      alert("Server error");
    }
  };

  const jamList = [
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
  ];

  const getTodayLocal = () => {
    const now = new Date();
    const offset = now.getTimezoneOffset();

    const local = new Date(
      now.getTime() - offset * 60000
    );

    return local.toISOString().split("T")[0];
  };

  const isPastTime = (jam: string) => {
  if (form.date !== getTodayLocal()) return false;
  const now = new Date();
  const [hour, minute] = jam.split(":").map(Number);
  const slotTime = new Date();

  slotTime.setHours(hour);
  slotTime.setMinutes(minute);
  slotTime.setSeconds(0);

  return slotTime <= now;
};

  return (
    <div
      className="
        min-h-screen
        bg-[#FFB8E0]
        px-6
        md:px-10
        py-20
      "
    >

      {/* TITLE */}
      <div className="mb-12">

        <h1
          className="
            text-5xl
            md:text-7xl
            font-black
            leading-none
            text-black
          "
        >
          BOOKING <br />
          STUDIO 🎀
        </h1>

      </div>

      {/* FORM */}
      <div
        className="max-w-3xl bg-white border-[5px] border-black rounded-[35px] 
        p-8 shadow-[10px_10px_0px_0px_#000] flex flex-col gap-5 "
      >

        {/* NAMA */}
        <input
          type="text"
          placeholder="Nama"
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
          className="
            w-full
            p-4
            rounded-2xl
            border-[4px]
            border-black
            font-bold
            outline-none
          "
        />

        {/* NOMOR HP */}
        <input
          type="text"
          placeholder="Nomor HP"
          value={form.nomor_hp}
          onChange={(e) =>
            setForm({ ...form, nomor_hp: e.target.value })
          }
          className="
            w-full
            p-4
            rounded-2xl
            border-[4px]
            border-black
            font-bold
            outline-none
          "
        />

        {/* LAYANAN */}
        <select
          value={form.package_name}
          onChange={(e) =>
            setForm({
              ...form,
              package_name: e.target.value,
            })
          }
          className="
            w-full
            p-4
            rounded-2xl
            border-[4px]
            border-black
            font-bold
            outline-none
          "
        >

          <option value="">
            Pilih Layanan
          </option>

          {layanan.map((item) => (

            <option
              key={item.id}
              value={item.title}
            >
              {item.title}
            </option>

          ))}
        </select>

        {/* TANGGAL */}
        <input
          type="date"
          value={form.date}
          onChange={(e) =>
            setForm({ ...form, date: e.target.value })
          }
          className="
            w-full
            p-4
            rounded-2xl
            border-[4px]
            border-black
            font-bold
            outline-none
          "
        />

        <select
          value={form.time}
          onChange={(e) =>
            setForm({
              ...form,
              time: e.target.value,
            })
          }
          className="
            w-full
            p-4
            rounded-2xl
            border-[4px]
            border-black
            font-bold
            outline-none
          "
        >
          <option value="">
            Pilih Jam
          </option>

          {jamList.map((jam) => (
            <option
              key={jam}
              value={jam}
              disabled={
                jamTerpakai.includes(jam) ||
                isPastTime(jam)
              }
            >
              {jamTerpakai.includes(jam)
                ? `${jam} - Sudah Dibooking`
                : isPastTime(jam)
                ? `${jam} - Sudah Lewat`
                : jam}
            </option>
          ))}
        </select>

        {/* DESKRIPSI */}
        <textarea
          placeholder="Deskripsi"
          value={form.deskripsi}
          onChange={(e) =>
            setForm({
              ...form,
              deskripsi: e.target.value,
            })
          }
          className="
            w-full
            h-40
            p-4
            rounded-2xl
            border-[4px]
            border-black
            font-bold
            outline-none
          "
        />

        {/* QRIS */}
        <div
          className="
            p-5
            rounded-2xl
            border-[4px]
            border-black
            bg-[#F7F48B]
          "
        >

          <p className="font-black text-xl mb-3">
            Pembayaran QRIS ✨
          </p>

          <p className="font-semibold">
            Scan QRIS untuk melakukan pembayaran.
          </p>

        </div>

        {/* BUTTON */}
        <button
          onClick={handleSubmit}
          className="
            w-full
            py-4
            bg-[#002381]
            text-white
            text-xl
            font-black
            rounded-2xl
            border-[4px]
            border-black
            shadow-[6px_6px_0px_0px_#000]
            hover:translate-x-1
            hover:translate-y-1
            hover:shadow-none
            transition-all
          "
        >
          BOOKING SEKARANG 🎀
        </button>

      </div>
    </div>
  );
}
