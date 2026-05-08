"use client"

import React from 'react'
import Navbar from '@/component/navbar'
import Booking from '@/component/booking'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { bookingData } from '@/lib/data/data_booking'


const AdminBooking = () => {

const [openTambah, setOpenTambah] = useState(false)
const [jam, setJam] = useState('');
const [hari, setHari] = useState('');
const [showSucces, setShowSucces] = useState(false);
const [paket, setPaket] = useState('');

const resetForm = () => {
  setHari('');
  setJam('');
  setPaket('');
};

const closePopup = () => {
  setOpenTambah(false);
  resetForm();
};

const getNextDays = () => {
  const days = []
  const namaHari = ["Minggu","Senin","Selasa","Rabu","Kamis","Jumat","Sabtu"]

  for (let i = 0; i < 7; i++) {
    const date = new Date()
    date.setDate(date.getDate() + i)

    days.push({
      label: `${namaHari[date.getDay()]} (${date.getDate()}/${date.getMonth()+1})`,
      value: date.toISOString().split("T")[0]
    })
  }
  return days
}

const jamList = [
  "10:00","10:30","11:00","11:30",
  "13:00","13:30","14:00","14:30",
  "15:00","15:30","16:00","16:30",
  "17:00","17:30","18:00","18:30",
  "19:00","19:30","20:00","20:30"
];

const handleSimpan = () => {
  // validasi dulu
  if (!hari || !jam || !paket) {
  alert("Lengkapi semua data dulu!");
  return;
  }

  // simulasi simpan data (nanti bisa ke API / database)
  const dataBooking = {
    hari,
    jam,
    paket,
  };

  console.log("Data tersimpan:", dataBooking);

  // munculin popup sukses
  closePopup();
  setShowSucces(true);  // tampilkan popup sukses
};

useEffect(() => {
  const available = getAvailableJam();
  if (!available.includes(jam)) {
    setJam('');
  }
}, [hari]);

const getAvailableJam = () => {
  if (!hari) return jamList;

  const today = new Date().toISOString().split("T")[0];

  // kalau bukan hari ini → semua jam boleh
  if (hari !== today) return jamList;

  const now = new Date();
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();

  return jamList.filter((jamItem) => {
    const [hour, minute] = jamItem.split(":").map(Number);

    return (
      hour > currentHour ||
      (hour === currentHour && minute > currentMinute)
    );
  });
};

const hariList = getNextDays()

const paketList = [
  { nama: "Basic", durasi: "30 menit" },
  { nama: "Premium", durasi: "1 jam" },
  { nama: "Prewedding", durasi: "2 jam" },
  { nama: "Wisuda", durasi: "45 menit" },
];



  return (
    <div className='w-full flex flex-row  gap-10 bg-white'>
        <Navbar />
        
        <div className='w-full  flex flex-col mt-5'>
          <div className='flex flex-row '>
            <h1 className='font-extrabold text-2xl text-[#2A4AA1]'>Menu Booking</h1>
            <div className='flex flex-row gap-2'>
            <button className='flex flex-row justify-center items-center gap-2 w-40 h-10 bg-[#2A4AA1] rounded-lg ml-80'>
              <Image
              src="/assets/image/date.png"
              className='w-7 h-7 '
              width={25}
              height={25}
              alt='logo'
              />
              <p className='font-bold text-[15px]'>Cari Tanggal</p>
            </button>

            <button 
            onClick={() => {
              setOpenTambah(true);
            }}
            className='flex flex-row justify-center items-center gap-2 w-45 h-10 bg-[#2A4AA1] rounded-lg '>
              
              <Image
              src="/assets/image/add.png"
              className='w-7 h-7 '
              width={25}
              height={25}
              alt='logo'
              />
              <p className='font-bold text-[15px]'>Tambah Booking</p>
            </button>
            </div>

          </div>
      <div className='w-full h-135 overflow-y-auto '>
        <div>
          <h1 className='text-[#2A4AA1] font-bold mb-3 mt-5'>Booking Hari Ini :</h1>
          <div className='flex flex-col gap-4'>
            {bookingData.map((item,index)=>{
              return(
                <Booking 
                  key={index}
                  date={item.date}
                  name={item.name}
                  id={item.id}
                  packageName={item.packageName}
                  status={item.status}
                  time={item.time}
                />
              )
            })}
          </div>
        </div>

        <div className="w-210 h-[2px] rounded-lg  bg-[#2A4AA1]/50 my-4 mt-10  "></div>

        <div>
          <h1 className='text-[#2A4AA1] font-bold mb-3 mt-5'>Booking 17/02/2026 :</h1>
          <div className='flex flex-col gap-4'>
          {bookingData.map((item,index)=>{
              return(
                <Booking 
                  key={index}
                  date={item.date}
                  name={item.name}
                  id={item.id}
                  packageName={item.packageName}
                  status={item.status}
                  time={item.time}
                />
              )
            })}
          </div>
        </div>

        <div className="w-210 h-[2px] rounded-lg  bg-[#2A4AA1]/50 my-4 mt-10  "></div>

        <div className='mb-10'>
          <h1 className='text-[#2A4AA1] font-bold mb-3 mt-5'>Booking 17/02/2026 :</h1>
          <div className='flex flex-col gap-4'>
          {bookingData.map((item,index)=>{
              return(
                <Booking 
                  key={index}
                  date={item.date}
                  name={item.name}
                  id={item.id}
                  packageName={item.packageName}
                  status={item.status}
                  time={item.time}
                />
              )
            })}
          </div>
        </div>
      </div>
        </div>

      {openTambah && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[2px] z-50"> 
         {/* POP UP TAMBAH BOOKING */}
          <div className="flex flex-col bg-white w-150 h-110 rounded-xl shadow-xl">
            <div className='flex flex-row '> 
            <h1 className=" text-xl font-extrabold text-[#2A4AA1] ml-6 mb-3 mt-3">
              Tambah Booking
            </h1>

            <button
              onClick={closePopup}
            >
              <Image
                src="/assets/image/add.png"
                className='w-10 h-10 ml-87 rounded-full bg-[#2A4AA1]' 
                width={20}
                height={20}
                alt='Logo'
              />
            </button>
            </div>
            
            <div className='flex flex-col gap-3 items-center mt-3'>
              <input type="text"
              className='w-130 h-10 bg-[#B0C5FF] border-1 border-[#2A4AA1] rounded-[20px] pl-5 placeholder-[#2A4AA1]  '
              placeholder='Nama Pelanggan' />
              <input type="text"
              className='w-130 h-10 bg-[#B0C5FF] border-1 border-[#2A4AA1] rounded-[20px] pl-5 placeholder-[#2A4AA1]  '
              placeholder='Nomor Hp' />
              <div className="flex flex-col gap-1 w-130">

                <select
                  value={paket}
                  onChange={(e) => setPaket(e.target.value)}
                  className={`h-10 bg-[#B0C5FF] border-1 border-[#2A4AA1] rounded-[20px] px-4 text-[#2A4AA1]`}
                >
                  <option value="" disabled>
                    Pilih Paket Foto
                  </option>

                  {paketList.map((item, i) => (
                    <option key={i} value={item.nama}>
                      {item.nama} - {item.durasi}
                    </option>
                  ))}
                </select>
              </div>
              <div className='flex flex-row gap-4 '> 
                <select
                  value={hari}
                  onChange={(e) => setHari(e.target.value)}
                  className='w-63 h-10 bg-[#B0C5FF] border border-[#2A4AA1] rounded-[20px] px-4 text-[#2A4AA1]'
                >
                  <option value="" disabled >Pilih Hari</option>
                  {hariList.map((item, i) => (
                    <option key={i} value={item.value}>
                      {item.label}
                    </option>
                  ))}
                </select>
                <select
                  value={jam}
                  onChange={(e) => setJam(e.target.value)}
                  className='w-63 h-10 bg-[#B0C5FF] border border-[#2A4AA1] rounded-[20px] px-4 text-[#2A4AA1]'
                >
                  <option value="">Pilih Jam</option>
                  {jamList.map((item, index) => {
                  const isDisabled = !getAvailableJam().includes(item);

                  return (
                    <option key={index} value={item} disabled={isDisabled}>
                      {item} {isDisabled ? "(Lewat)" : ""}
                    </option>
                  );
                })}
                </select>
              </div>
              <input type="text"
              className=' w-130 h-20 bg-[#B0C5FF] border-1 border-[#2A4AA1] rounded-[20px] pl-5 placeholder-[#2A4AA1] placeholder- '
              placeholder='Deskripsi' />
            </div>

           <div className="w-130 flex justify-between ml-10 gap-3 mt-5 mr-5">
              {/* BATAL */}
              <button
                onClick={closePopup}
                className="w-30 h-8  rounded-[20px] border border-[#2A4AA1] text-[#2A4AA1] hover:bg-[#2A4AA1]/10 transition"
              >
                Batal
              </button>
              {/* SIMPAN */}
              <button
                onClick={handleSimpan}
                disabled={!hari || !jam || !paket}
                className={`w-30 h-8 rounded-[20px] text-white font-semibold shadow-md transition
                ${(!hari || !jam || !paket) 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-[#2A4AA1] hover:bg-[#1f3a87]'}`}
              >
                Simpan
              </button>
          </div>
          </div>
        </div>
        )}

        <div
          className={`fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-[2px] z-50 
          transition-opacity duration-300
          ${showSucces ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
          >
          <div
            className={`bg-white w-96 h-70 rounded-2xl border border-blue-500 shadow-md shadow-blue-800 text-center relative 
            transform transition-all duration-300 ease-out
            ${showSucces ? 'scale-100 opacity-100' : 'scale-90 opacity-0'}`}
          >
            <button
              onClick={() => setShowSucces(false)}
              className="absolute top-2 right-3 text-xl text-[#2A4AA1]"
            >
              ✕
            </button>
            <h2 className="font-extrabold text-[#2A4AA1] text-lg mb-4 mt-3 ml-4 text-start">
              Tambah Booking
            </h2>
            <div className='p-5 flex justify-center items-center'>
              <Image
                src="/assets/image/success.png"
                className='w-20 h-20'
                width={20}
                height={20}
                alt='Logo'
              />
            </div>
            <p className="font-semibold text-blue-900">
              Booking Sukses!
            </p>
          </div>
        </div>

    </div>
    
  )
}

export default AdminBooking