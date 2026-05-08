import Navbar from '@/component/navbar'
import React from 'react'
import Image from 'next/image'
import { dataTransaksi } from '@/lib/data/data_transaksi'
import CardTransaksi from '@/component/transaksi'

const page = () => {
  return (
    <div className='w-full h-screen flex flex-row bg-white'>
       <Navbar/>
       <div className=' bg-[#D4E0FF] flex flex-col ' >
       <div className='w-full h-15 flex flex-row  justify-between px-5 mt-5 '>
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
            className='flex items-center justify-center w-45 h-10 bg-[#2A4AA1] rounded-lg'>
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
      <div className='w-full  bg-[#D4E0FF] flex flex-col h-full'>
       
        {/* KATEGORI (tidak ikut scroll) */}
        <div className='w-full h-25 flex flex-row gap-2  mt-3 ml-3 mb-5  '>
          <button className='w-75 h-20 bg-white rounded-lg py-2'>
            <p className='font-bold text-[15px] -mt-3 text-[#002381]'>Total Hari Ini</p>
            <p className='font-extrabold text-xl text-[#FFA550]'>Rp. 700.000</p>
          </button>
          <button className='w-75 h-20 bg-white rounded-lg py-2'>
            <p className='font-bold text-[15px] -mt-3 text-[#002381]'>Menunggu Validasi</p>
            <p className='font-extrabold text-xl text-[#FFA550]'>3 Transaksi</p>
          </button>
          <button className='w-75 h-20 bg-white rounded-lg py-2'>
            <p className='font-bold text-[15px] -mt-3 text-[#002381]'>Berhasil</p>
            <p className='font-extrabold text-xl text-[#FFA550]'>21 Transaksi</p>
          </button>
        </div>

        {/* Data Transaksi */}
        <div className='w-full flex flex-col gap-5 pt-5 pb-5 overflow-y-auto  '>
          {dataTransaksi.map((item) => (
            <CardTransaksi key={item.id} data={item} />
          ))}
        </div>

        {/* <div className='flex flex-col px-3 py-5 '>
          <div className='flex flex-row gap-10 w-228 h-20 pl-3 bg-white/80 rounded-lg shadow-lg shadow-[#2A4AA1] border border-[#2A4AA1]'>
            <div className='flex flex-col  px-5 py-3'>
              <p className='font-bold text-[#002381] text-xl'>Tantri Handayani</p>
              <p className='text-[#002381]'>Paket Bestie</p>
            </div>
            <div className='flex flex-col  px-5 py-3'>
              <p className='font-bold text-[#002381] text-xl'>9 Maret 2026</p>
              <p className='text-[#002381]'>13:00-13:30</p>
            </div>
            <div className='flex flex-col  px-10 py-3'>
              <p className='font-bold text-[#002381] text-xl'>Rp. 15.000</p>
              <p className='text-[#002381]'>Tunai/Qris</p>
            </div>
            <div className='flex flex-col gap-2 px-2 py-2 ml-10'>
              <button 
              className='flex flex-row px-5 gap-2 w-40 font-bold text-[#002381] text-xl bg-[#3DCBFF]/30 rounded-lg '
              > 
                <Image
                  src="/assets/image/tick.png"
                  className='w-5 h-5 mt-1'
                  width={25}
                  height={25}
                  alt='logo'
                />
                <p>Validasi</p>
              </button>
              <button 
              className='flex flex-row px-5 gap-2 w-40 font-bold text-[#002381] text-xl bg-[#FF5454] rounded-lg '
              > 
                <Image
                  src="/assets/image/close.png"
                  className='w-5 h-5 mt-1'
                  width={25}
                  height={25}
                  alt='logo'
                />
                <p>Validasi</p>
              </button>
            </div>
          </div>
        </div> */}

      </div>
    </div>
    </div>
  )
}

export default page