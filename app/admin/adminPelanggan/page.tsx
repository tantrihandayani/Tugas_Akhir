"use client";

import React from 'react'
import Image from 'next/image'
import { useState, useEffect } from 'react';
import Navbar from '@/component/navbar'
import Pelanggan from '@/component/pelanggan'
import { pelangganData } from '@/lib/data/data_pelanggan'

const page = () => {

  const [isOpen, setIsOpen] = useState(false);

  return (
   <div className=' h-150 flex flex-row bg-white'> 
    <Navbar />
    <div className='w-full flex flex-col'>
    <div className='w-full h-15  flex flex-row mt-5 justify-between px-5 '>
       <h1 className='font-extrabold text-2xl text-[#2A4AA1]'>Menu Pelanggan</h1>
       <div className='flex flex-row gap-2'>
        <button className='flex flex-row justify-center items-center gap-2 w-40 h-10 bg-[#2A4AA1] rounded-lg ml-80'>
          <Image
           src="/assets/image/pipel.png"
           className='w-7 h-7 '
           width={25}
           height={25}
           alt='logo'
          />
          <p className='font-bold text-[15px]'>Cari Pelanggan</p>
        </button>
        <button 
        onClick={() => setIsOpen(true)}
        className='flex flex-row justify-center items-center  w-45 h-10 bg-[#2A4AA1] rounded-lg '>
          <Image
           src="/assets/image/add.png"
           className='w-7 h-7 '
           width={25}
           height={25}
           alt='logo'
          />
          <p className='font-bold text-[15px]'>Tambah Pelanggan</p>
        </button>
       </div> 

    </div>
    <div className='w-full h-full bg-[#D4E0FF]'>

      {/* INI 3BAR INFO */}
      <div className='w-full flex flex-row gap-3 px-2 py-3 justify-center text-center'>
        <div className='w-74 h-20 bg-white'>
          <p className='text-[#2A4AA1] font-semibold text-sm mt-2'>Pelanggan Hari Ini :</p>
          <p className='font-extrabold text-2xl text-[#FFA600] '>13 Orang</p>
        </div>
        <div className='w-74 h-20 bg-white'>
          <p className='text-[#2A4AA1] font-semibold text-sm mt-2'>Pelanggan Hari Ini :</p>
          <p className='font-extrabold text-2xl text-[#FFA600] '>13 Orang</p>
        </div>
        <div className='w-74 h-20 bg-white'>
          <p className='text-[#2A4AA1] font-semibold text-sm mt-2'>Pelanggan Hari Ini :</p>
          <p className='font-extrabold text-2xl text-[#FFA600] '>13 Orang</p>
        </div>
      </div>
      
    <div className='flex flex-row px-3 gap-3 '>
      {/* INI DATA PELANGGAN */}
      <div className='w-full flex flex-col gap-3 '>
        {pelangganData.map((item, index) => {
          return (
          <Pelanggan 
            key={index}
            id={item.id}
            name={item.name}
            phone={item.phone}
            status={item.status}
            totalBooking={item.totalBooking}
          />
          )
        })}
      </div>

      {/* INI DETAIL PELANGGAN */}
      <div className='w-full h-100 bg-white  rounded-lg px-7 py-3'>
        <p className='font-extrabold text-[#002381] text-[20px]'>Tantri Handayani</p>
        <p className='font-bold text-[#002381] text-[13px]'>081224566788</p>
        <p className=' text-[#002381] text-[13px]'>tantricantik@gmail.com</p>
      <div className="w-full  rounded-lg mx-auto bg-[#2A4AA1] my-3 pb-0.5 opacity-50"></div>
      <div className='w-full h-70 rounded-lg bg-[#BCEDFF]'>
        <div className='w-full px-3 py-3'>
          <p className='font-bold text-[#002381] text-[13px]'>Total Booking :</p>
          <p className='font-bold text-[#002381] text-[13px]'>Total Transaksi :</p>
        </div>
        <div className="w-full  rounded-lg mx-auto bg-[#2A4AA1]  pb-0.5 opacity-30"></div>
        <div className='w-full px-3 py-3'>
          <p className='font-bold text-[#002381] text-[13px]'>Terakhir Booking :</p>
          <p className='font-bold text-[#002381] text-[13px]'>Status terakhir :</p>
        </div>
        <div className="w-full  rounded-lg  bg-[#2A4AA1]  pb-0.5 opacity-30"></div>
        <div className='w-full px-3 pt-3'>
          <p className='font-bold text-[#002381] text-[13px] italic'>Penilaian Customer</p>
          
          {/* INI BINTANG/PENILAIAN PELANGGAN */}
          <div className='flex flex-row '>
            <Image
            src="/assets/image/stardoff.png"
            className='w-12 h-12 ml-15'
            width={25}
            height={25}
            alt='logo'
            />
            <Image
            src="/assets/image/stardoff.png"
            className='w-12 h-12 '
            width={25}
            height={25}
            alt='logo'
            />
            <Image
            src="/assets/image/stardoff.png"
            className='w-12 h-12 '
            width={25}
            height={25}
            alt='logo'
            />
            <Image
            src="/assets/image/stardoff.png"
            className='w-12 h-12 '
            width={25}
            height={25}
            alt='logo'
            />
            <Image
            src="/assets/image/star.png"
            className='w-12 h-12 '
            width={25}
            height={25}
            alt='logo'
            />
           </div>
        </div>
        <div className='w-full px-3 '>
          <p className='font-bold text-[#002381] text-[13px] italic'>Deskripsi:</p>
          <p className=' text-[#002381] text-[10px] text-justify '>
            Katanya di polindra ada satu gadis
            cantik banget yang bernama tantri handayani
            dia dari prodi teknik informatika semester akhir</p>
        </div>

      </div>
      </div>
    </div>

    </div>
    </div>
    {isOpen && (
        <div 
          className="fixed inset-0 flex items-center justify-center bg-black/40 z-50"
          onClick={() => setIsOpen(false)}
        >
          <div 
            className="bg-white w-[420px] p-5 rounded-xl shadow-lg flex flex-col gap-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <h2 className="text-xl font-extrabold text-[#2A4AA1]">
              Tambah Pelanggan
            </h2>

            {/* Form */}
            <div className="flex flex-col gap-3">
              
              <div className="flex flex-col">
                <label className="text-[#002381] text-sm font-semibold">
                  Nama
                </label>
                <input
                  type="text"
                  placeholder="Masukkan nama pelanggan"
                  className="border border-[#D4E0FF] focus:outline-none focus:ring-2 focus:ring-[#2A4AA1] p-2 rounded-md"
                />
              </div>

              <div className="flex flex-col">
                <label className="text-[#002381] text-sm font-semibold">
                  No HP
                </label>
                <input
                  type="text"
                  placeholder="08xxxxxxxxxx"
                  className="border border-[#D4E0FF] focus:outline-none focus:ring-2 focus:ring-[#2A4AA1] p-2 rounded-md"
                />
              </div>

              <div className="flex flex-col">
                <label className="text-[#002381] text-sm font-semibold">
                  Status
                </label>
                <select className="border border-[#D4E0FF] p-2 rounded-md">
                  <option>Loyal</option>
                  <option>Regular</option>
                  <option>New</option>
                </select>
              </div>

            </div>

            {/* Action */}
            <div className="flex justify-end gap-2 mt-3">
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-1.5 rounded-md bg-gray-300 text-sm"
              >
                Batal
              </button>

              <button className="px-4 py-1.5 rounded-md bg-[#2A4AA1] text-white text-sm font-semibold">
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}
   </div>
  )
}

export default page



