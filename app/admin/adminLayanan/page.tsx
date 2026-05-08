"use client";

import React from 'react'
import Image from 'next/image'
import { useState } from 'react';
import Navbar from '@/component/navbar'
import Card from '@/component/layanan';
import { layanan } from '@/lib/data/data_layanan'
import AddKategori from "@/component/addKategori";

const page = () => {

  const [dataLayanan, setDataLayanan] = useState(layanan);
  const [openTambah, setOpenTambah] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedData, setSelectedData] = useState(null);

  return (
    <div className='h-150 flex flex-row bg-white overflow-hidden'> 
      
      <Navbar />

      <div className='w-full flex flex-col'>

        {/* HEADER */}
        <div className='w-full h-15 flex flex-row mt-5 justify-between px-5'>
          <h1 className='font-extrabold text-2xl text-[#2A4AA1]'>
            Menu Layanan
          </h1>
          <div className='flex h-13 flex-row gap-2'>
            <button className='flex items-center justify-center gap-2 w-40 h-10 bg-[#2A4AA1] rounded-lg ml-80'>
              <Image
                src="/assets/image/pipel.png"
                className='w-7 h-7'
                width={25}
                height={25}
                alt='logo'
              />
              <p className='font-bold text-[15px]'>Cari Kategori</p>
            </button>

            <button 
              onClick={() => setOpenTambah(true)}
              className='flex items-center justify-center w-45 h-10 bg-[#2A4AA1] rounded-lg'
            >
              <Image
                src="/assets/image/add.png"
                className='w-7 h-7'
                width={25}
                height={25}
                alt='logo'
              />
              <p className='font-bold text-[15px]'>Tambah Kategori</p>
            </button>
          </div> 
        </div>

        {/* CONTAINER BIRU */}
        <div className='w-full bg-[#D4E0FF] flex flex-col h-full'>

          {/* KATEGORI (tidak ikut scroll) */}
          <div className='w-full flex flex-row gap-3 px-2 py-3  text-center justify-between overflow-x-auto'>
            <button className='w-55 h-10 bg-white rounded-lg py-2'>
              <p className='font-bold text-xl text-[#FFA550]'>Self Photo</p>
            </button>
            <button className='w-55 h-10 bg-white rounded-lg py-2'>
              <p className='font-bold text-xl text-[#FFA550]'>Photo Box</p>
            </button>
            <button className='w-55 h-10 bg-white rounded-lg py-2'>
              <p className='font-bold text-xl text-[#FFA550]'>Theater Studio</p>
            </button>
            <button className='w-55 h-10 bg-white rounded-lg py-2'>
              <p className='font-bold text-xl text-[#FFA600]'>Photo Session</p>
            </button>
          </div>

          {/* CARD (INI YANG SCROLL) */}
          <div className='flex-1 overflow-y-auto '>
            <div className='grid grid-cols-4 gap-5 px-5 py-5 mb-20'>
              {dataLayanan.map((item) => (
                <Card
                  key={item.id}
                  {...item}
                  onEdit={(item) => {
                    setSelectedData(item);
                    setOpenEdit(true);
                  }}
                />
              ))}
            </div>
          </div>

        </div>
      </div>
      <AddKategori 
        isOpen={openTambah} 
        onClose={() => setOpenTambah(false)} 
        mode="tambah" 
      />
      <AddKategori 
        isOpen={openEdit} 
        onClose={() => setOpenEdit(false)} 
        mode="edit" 
      />
    </div>
  )
}

export default page