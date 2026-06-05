"use client"

import React from 'react'
import Navbar from '@/component/navbar'
import Booking from '@/component/booking'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { BookingType } from "@/type/bookingType";
import AddBooking from '@/component/addBooking'


const AdminBooking = () => {

const [openTambah, setOpenTambah] = useState(false)
const [showSucces, setShowSucces] = useState(false);
const [searchTanggal, setSearchTanggal] = useState('');
const [bookingList, setBookingList] = useState<BookingType[]>([]);
const [selectedBooking, setSelectedBooking] = useState<BookingType | null>(null);

  const handleUpdateStatus = async (newStatus: string) => {
    if (!selectedBooking) return;
    await fetch(
      `http://127.0.0.1:8000/api/booking/${selectedBooking.id}/`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          booking_status: newStatus,
        }),
      }
    );
    const updated = bookingList.map((item) =>
      item.id === selectedBooking.id
        ? { ...item, status: newStatus }
        : item
    );
    setBookingList(updated);
    setSelectedBooking({
      ...selectedBooking,
      status: newStatus,
    });
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
        customer_name: item.nama,
        nomor_hp: item.nomor_hp,
        date: item.date,
        time: item.time,
        package_name: item.package_name,
        payment_method: item.payment_method,
        deskripsi: item.deskripsi,
        status: item.booking_status,
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
        payment_method: item.payment_method,
        deskripsi: item.deskripsi,
        status: item.booking_status,
      }));

      setBookingList(normalized);
      setShowSucces(true);
    } catch (err) {
      console.error(err);
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

                <div className='flex flex-col gap-4 w-full'>
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
                        }}
                      >
                      <Booking
                        
                        date={item.date}
                        customer_name={item.customer_name}
                        id={item.id}
                        package_name={item.package_name}
                        payment_method={item.payment_method} 
                        status={item.status}
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
            className="fixed inset-0 bg-black/40 flex items-center justify-center z-[60]"
            onClick={() => setSelectedBooking(null)}
          >
            <div 
              onClick={(e) => e.stopPropagation()}
              className="bg-white w-[95%] max-w-2xl rounded-2xl p-4 md:p-6 relative shadow-xl"
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

              {/* KANAN */}
              <div className="flex flex-col justify-between">

                {/* HEADER */}
                <div>
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-xl font-bold text-[#2A4AA1]">
                        {selectedBooking.customer_name}
                      </h2>
                      <p className="text-[#2A4AA1] text-sm">
                        {selectedBooking.payment_method}
                      </p>
                    </div>

                    {/* STATUS */}
                    <div className={`px-3 py-1 mr-4 rounded-lg text-white text-sm
                     ${selectedBooking.status === 'waiting' ? 'bg-yellow-500' : ''}
                     ${selectedBooking.status === 'progress' ? 'bg-orange-500' : ''}
                     ${selectedBooking.status === 'finished' ? 'bg-green-500' : ''}
                    `}>
                      {selectedBooking.status}
                    </div>
                  </div>

                  <hr className="my-4 border-dashed border-[#2A4AA1]" />

                  {/* DETAIL */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 text-[#2A4AA1] text-sm mt-4">

                    <p className="font-semibold">ID Booking :</p>
                    <p>#{selectedBooking.id}</p>

                    <p className="font-semibold">Nama :</p>
                    <p>{selectedBooking.customer_name}</p>

                    <p className="font-semibold">Nomor HP :</p>
                    <p>{selectedBooking.nomor_hp || '-'}</p>

                    <p className="font-semibold">Tanggal :</p>
                    <p>{selectedBooking.date}</p>

                    <p className="font-semibold">Jam :</p>
                    <p>{formatTimeRange(selectedBooking.time)}</p>

                    <p className="font-semibold">Paket :</p>
                    <p>{selectedBooking.package_name}</p>

                    <p className="font-semibold">Pembayaran :</p>
                    <p>{selectedBooking.payment_method}</p>

                    <p className="font-semibold">Deskripsi :</p>
                    <p className="break-words whitespace-pre-wrap">
                      {selectedBooking.deskripsi || '-'}
                    </p>
                  </div>

                {/* BUTTON */}
                <div className="flex flex-col sm:flex-row justify-end gap-3 mt-6">
                  <button
                    onClick={() => handleUpdateStatus("progress")}
                    className="px-4 py-2 bg-yellow-500 text-white rounded-lg"
                  >
                    Start
                  </button>

                  <button
                    onClick={() => handleUpdateStatus("finished")}
                    className="px-4 py-2 bg-green-500 text-white rounded-lg"
                  >
                    Finish
                  </button>
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