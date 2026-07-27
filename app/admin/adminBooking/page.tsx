"use client"

import React from 'react'
import Navbar from '@/component/navbar'
import Booking from '@/component/booking'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { BookingType } from "@/type/bookingType";
import AddBooking from '@/component/addBooking'
import { BookingStatus } from "@/type/bookingType";


const AdminBooking = () => {

const [openTambah, setOpenTambah] = useState(false)
const [showSucces, setShowSucces] = useState(false);
const [searchTanggal, setSearchTanggal] = useState('');
const [bookingList, setBookingList] = useState<BookingType[]>([]);
const [selectedBooking, setSelectedBooking] = useState<BookingType | null>(null);
const [driveLink, setDriveLink] = useState("");
const [savingDrive, setSavingDrive] = useState(false);

  const handleUpdateStatus = async (
      newStatus: BookingStatus
  ) => {
      await updateBooking({
          booking_status: newStatus,
      });
      setSelectedBooking(null);
  };

  const updateBooking = async (data: Partial<BookingType>) => {
    if (!selectedBooking) return;

    try {
        const res = await fetch(
            `http://127.0.0.1:8000/api/booking/${selectedBooking.id}/`,
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            }
        );

        if (!res.ok) {
            throw new Error("Gagal memperbarui booking.");
        }

        await refreshBooking();
    } catch (err) {
        console.error(err);
    }
  };
  
  
  const formatTimeRange = (jam?: string) => {
  if (!jam) return "-";

  const clean = jam.slice(0, 5); // 
  const [h, m] = clean.split(":").map(Number);

  const end = new Date();
  end.setHours(h);
  end.setMinutes(m + 30);

  const endH = String(end.getHours()).padStart(2, "0");
  const endM = String(end.getMinutes()).padStart(2, "0");

  return `${clean.replace(":", ".")} - ${endH}.${endM}`;
}; 

useEffect(() => {
  fetch("http://127.0.0.1:8000/api/booking/")
    .then((res) => res.json())
    .then((data) => {

      const normalized = data.map((item: any) => ({
        id: item.id,
        nama: item.nama,
        nomor_hp: item.nomor_hp,
        date: item.date,
        time: item.time,
        package_name: item.package_name,
        kategori: item.kategori,
        payment_method: item.payment_method,
        deskripsi: item.deskripsi,
        harga: item.harga,
        drive_link: item.drive_link,
        booking_status: item.booking_status,
      }));

      setBookingList(normalized);
    })
    .catch((err) => console.error(err));
}, []);

const getTodayLocal = () => {
  const now = new Date();
  const offset = now.getTimezoneOffset();
  const local = new Date(now.getTime() - offset * 60000);
  return local.toISOString().split("T")[0];
};

const today = getTodayLocal();


const uniqueDates = [
  ...new Set(bookingList.map(item => item.date))
  ].sort((a, b) => {
    if (a === today) return -1;
    if (b === today) return 1;
    return new Date(b).getTime() - new Date(a).getTime();
  });

const refreshBooking = async () => {
  try {
    const refresh = await fetch(
      "http://127.0.0.1:8000/api/booking/"
    );

    const updated = await refresh.json();

      const normalized = updated.map((item: any) => ({
          id: item.id,
          customer_name: item.nama,
          nomor_hp: item.nomor_hp,
          date: item.date,
          time: item.time,
          package_name: item.package_name,
          kategori: item.kategori,
          payment_method: item.payment_method,
          deskripsi: item.deskripsi,
          harga: item.harga,
          drive_link: item.drive_link,
          booking_status: item.booking_status,
      }));

      setBookingList(normalized);
    } catch (err) {
      console.error(err);
    }
  };

const handleSaveDriveLink = async () => {
    if (!selectedBooking) return;

    setSavingDrive(true);

    try {
        await updateBooking({
            drive_link: driveLink,
        });

        alert("✅ Link Google Drive berhasil disimpan.");
        setSelectedBooking(null);
    } catch (err) {
        alert("❌ Gagal menyimpan link.");
        console.error(err);
    } finally {
        setSavingDrive(false);
    }
};

  return (
    <div className='w-full min-h-screen flex bg-white'>
        <Navbar />
        
        <div className='flex-1 flex-col justify-center'>
          <div className='w-full flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mt-5 px-4 md:px-6'>
            <h1 className='font-extrabold text-2xl text-[#2A4AA1]'>Menu Booking</h1>
            <div className='flex flex-col sm:flex-row gap-3 w-full lg:w-auto'>
            <div className='flex flex-row items-center gap-2 w-full sm:w-44 h-10 bg-[#2A4AA1] rounded-lg px-3'>
              <Image
                src="/assets/image/date.png"
                className='w-6 h-6'
                width={25}
                height={25}
                alt='logo'
              />

              <input
                type="date"
                value={searchTanggal}
                onChange={(e) => setSearchTanggal(e.target.value)}
                className='bg-transparent text-white outline-none text-sm w-25 appearance-none [-webkit-appearance:none]
                [&::-webkit-calendar-picker-indicator]:opacity-0  [&::-webkit-calendar-picker-indicator]:absolute cursor-pointer'
              />       
            </div>

            <button 
            onClick={() => {
              setOpenTambah(true);
            }}
            className='flex flex-row justify-center items-center gap-2 w-full sm:w-52 h-10 shrink-0 bg-[#2A4AA1] rounded-lg'>
              <Image
              src="/assets/image/add.png"
              className='w-7 h-7 '
              width={25}
              height={25}
              alt='logo'
              />
              <p className='text-white font-bold text-[15px]'>Tambah Booking</p>
            </button>
            </div>  
          </div>
      
        <div className='w-full max-h-[90vh] overflow-y-auto pb-10'>
          {uniqueDates.map((date, idx) => {
            if (searchTanggal && date !== searchTanggal) return null;
            return (
              <div key={date}>
                <h1 className='text-[#2A4AA1]  mb-3 mt-8 px-3 md:px-8 font-extrabold underline'>
                  {date === today 
                    ? "Booking Hari Ini :" 
                    : `Booking ${date} :`}
                </h1>

                <div className='flex flex-col gap-4 w-full px-3'>
                  {bookingList
                    .filter(item => item.date === date)
                    .sort((a, b) => {
                      return (
                      new Date(`1970-01-01T${a.time}`).getTime() -
                      new Date(`1970-01-01T${b.time}`).getTime()
                    );
                    })
                    .map((item) => (
                      <div 
                        key={item.id}
                        onClick={() => {
                          console.log(item); 
                          setSelectedBooking(item);
                          setDriveLink(item.drive_link || "");
                        }}
                      >
                      <Booking
                        
                        date={item.date}
                        nama={item.nama}
                        id={item.id}
                        package_name={item.package_name}
                        payment_method={item.payment_method} 
                        booking_status={item.booking_status}
                        time={formatTimeRange(item.time)}
                        className="w-full"
                      />
                      </div>
                    ))}
                </div>
              </div>
            );
          })}
        </div>
     </div>

        <AddBooking
          open={openTambah}
          onClose={() => setOpenTambah(false)}
          onSuccess={refreshBooking}
        />

        <div
          className={`fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-[2px] z-50 
          transition-opacity duration-300
          ${showSucces ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
          >
          <div
            className={`bg-white w-[90%] max-w-md min-h-[280px] rounded-2xl border
              border-blue-500 shadow-md shadow-blue-800 text-center 
              transform transition-all duration-300 ease-out
              ${showSucces ? 'scale-100 opacity-100' : 'scale-90 opacity-0'}`}
          >
            <div className='flex justify-between items-center px-5 py-4'>
            <h2 className="font-extrabold text-[#2A4AA1] text-lg  text-start">
              Tambah Booking
            </h2>
            <button
              onClick={() => setShowSucces(false)}
              className=""
            >
              <Image
                src="/assets/image/close.png"
                width={24}
                height={24}
                alt="Close"
                className="mx-auto"
              />
            </button>
            </div>
            <div className='p-5 flex justify-center items-center'>
              <Image
                src="/assets/image/success.png"
                className='w-20 h-20'
                width={20}
                height={20}
                alt='Logo'
              />
            </div>
            <p className="font-extrabold text-blue-900">
              Booking Sukses!
            </p>
          </div>
        </div>

        {selectedBooking && (
          <div 
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
            onClick={() => setSelectedBooking(null)}
          >
            <div 
              onClick={(e) => e.stopPropagation()}
              className="relative w-[92%] max-w-2xl overflow-hidden rounded-2xl bg-white shadow-xl"
            >
              <button
                onClick={() => setSelectedBooking(null)}
                className="absolute top-3 right-3"
              >
                <Image
                  src="/assets/image/close.png"
                  width={20}
                  height={20}
                  alt="close"
                />
              </button>

              <div className="flex flex-col">

    {/* HEADER */}
<div className="relative flex items-center justify-between bg-gradient-to-r from-[#2A4AA1] to-[#4167d8] px-5 py-3">

    <button
        onClick={() => setSelectedBooking(null)}
        className="absolute right-1 top-1 rounded-full bg-white/20 p-1.5 transition hover:bg-white/30"
    >
        <Image
            src="/assets/image/close.png"
            width={14}
            height={14}
            alt="close"
        />
    </button>

    <div className="pr-12">
        <div className="flex items-center gap-2">

            <h2 className="text-lg font-bold text-white">
                {selectedBooking.nama}
            </h2>

            <span className="rounded-md bg-white/15 px-2 py-0.5 text-[10px] font-semibold text-white">
                #{selectedBooking.id}
            </span>

        </div>

        <p className="mt-0.5 text-[11px] text-blue-100">
            {selectedBooking.package_name}
            {selectedBooking.kategori && ` • ${selectedBooking.kategori}`}
            {" • "}
            {selectedBooking.payment_method.toUpperCase()}
        </p>
    </div>

    <span
        className={`rounded-full  px-3 py-1 text-[10px] font-bold uppercase tracking-wide
        ${
            selectedBooking.booking_status === "waiting"
                ? "bg-yellow-400 text-yellow-900"
                : selectedBooking.booking_status === "progress"
                ? "bg-orange-400 text-white"
                : "bg-green-400 text-white"
        }`}
    >
        {selectedBooking.booking_status}
    </span>

</div>

    {/* CONTENT */}
    <div className="space-y-4 p-5">
        {/* GRID */}
        <div className="grid gap-3 md:grid-cols-2">
            {/* CUSTOMER */}
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                <div className="mb-3 flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#2A4AA1]/10">
                        👤
                    </div>

                    <div>
                        <p className="text-[11px] font-semibold uppercase tracking-wide text-[#2A4AA1]">
                            Customer
                        </p>
                    </div>
                </div>

                <div className="space-y-1">
                    <p className="text-sm font-bold text-slate-800">
                        {selectedBooking.nama}
                    </p>
                    <p className="text-xs text-slate-500">
                        {selectedBooking.nomor_hp || "-"}
                    </p>
                    <span className="inline-flex rounded-md bg-blue-100 px-2 py-1 text-[10px] font-semibold uppercase text-[#2A4AA1]">
                        {selectedBooking.payment_method}
                    </span>
                </div>
            </div>  

        {/* BOOKING */}
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
            <div className="mb-3 flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#2A4AA1]/10">
                    📅
                </div>

                <p className="text-[11px] font-semibold uppercase tracking-wide text-[#2A4AA1]">
                    Booking
                </p>
            </div>
            <div className="space-y-1">
                <p className="text-sm font-bold text-slate-800">
                    {selectedBooking.package_name}
                </p>

                <p className="text-xs text-slate-500">
                    {selectedBooking.date}
                </p>

                <p className="text-xs text-slate-500">
                    {formatTimeRange(selectedBooking.time)}
                </p>
            </div>
        </div>
</div>

        {/* DESKRIPSI */}
        <div className="rounded-xl border border-slate-200 p-3">
            <h3 className="mb-3 font-bold text-[#2A4AA1]">
                📝 Catatan Booking
            </h3>

            <p className="text-xs leading-6 text-slate-600">
                {selectedBooking.deskripsi ||
                    "Tidak ada catatan dari customer."}
            </p>
        </div>

        {/* GOOGLE DRIVE */}
        <div className="rounded-xl border border-slate-200 p-3">
            <h3 className="mb-2 text-sm font-bold text-[#2A4AA1]">
                ☁️ Google Drive Hasil Foto
            </h3>
            {selectedBooking.booking_status === "finished" ? (
                <div className="flex flex-row gap-2 space-y-3">
                    <input
                        type="text"
                        value={driveLink}
                        onChange={(e) => setDriveLink(e.target.value)}
                        placeholder="Tempel link Google Drive..."
                        className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs outline-none transition focus:border-[#2A4AA1]"
                    />

                    <button
                    onClick={handleSaveDriveLink}
                    className="rounded-lg bg-[#2A4AA1] px-4 h-8 text-xs font-semibold text-white transition hover:bg-[#1d3c91]"
                    >
                        Simpan
                    </button>
                </div>
            ) : (
                <div className="rounded-lg bg-slate-50 px-3 py-3 text-xs text-slate-500">
                    Booking harus berstatus
                    <span className="font-semibold text-green-600">
                        {" "}Selesai
                    </span>
                    {" "}agar link Google Drive dapat ditambahkan.
                </div>
            )}
        </div>

                {/* BUTTON */}
                <div className="mt-5 flex flex-wrap justify-end gap-2 border-t border-slate-200 px-5 py-4">
                {selectedBooking.booking_status === "waiting" && (
                    <button
                        onClick={() => handleUpdateStatus("progress")}
                        className="rounded-lg bg-yellow-500 px-4 py-2 text-xs font-semibold text-white transition hover:bg-yellow-600"
                    >
                        ▶ Mulai Sesi
                    </button>
                )}

                {selectedBooking.booking_status === "progress" && (
                    <button
                        onClick={() => handleUpdateStatus("finished")}
                        className="rounded-lg bg-green-600 px-4 py-2 text-xs font-semibold text-white transition hover:bg-green-700"
                    >
                        ✔ Selesaikan Booking
                    </button>
                )}

                {selectedBooking.booking_status === "finished" && (
                    <button
                        onClick={handleSaveDriveLink}
                        disabled={savingDrive}
                        className="rounded-lg bg-[#2A4AA1] px-4 py-2 text-xs font-semibold text-white disabled:opacity-60"
                    >
                        {savingDrive ? "Menyimpan..." : "💾 Simpan Link"}
                    </button>
                )}
                </div>
              </div>
            </div>
          </div>
          </div>
        )}
    </div>    
  )
}

export default AdminBooking