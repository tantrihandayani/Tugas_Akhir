import React from 'react'
import Image from 'next/image'
export default function AdminHome() {
  return (
    <div className='min-h-screen flex flex-row bg-white'>
      <div className='fix w-80 h-screen bg-[#2A4AA1] rounded-r-lg'>
        <div className='w-80  flex flex-row pt-5 ml-5  '>
          <Image 
          src="/assets/image/profile.png"
          width={50}
          height={50}
          alt='Logo Profile'
          />

          <div className='ml-2 mt-1  '>
            <p className='font-bold'>Tantri Handayani</p>
            <p className='text-[10px]'>Admin 1</p>
          </div>
          <button className='ml-17 mb-3'>
          <Image
          src="/assets/image/edit.png"
          width={20}
          height={20}
          alt='edit' />
          </button>
          <div>

          </div>
          
        </div>
        <div className='border-t-2 mt-5 flex flex-col gap-4 items-center justify-center'>
          <button className='mt-10 w-45 h-8 border border-black rounded-md  shadow-md shadow-blue-950 hover:shadow-lg hover:scale-105 transition duration-300'>
            Dashboard
          </button>
          <button className='w-45 h-8 border border-black rounded-md  shadow-md shadow-blue-950 hover:shadow-lg hover:scale-105 transition duration-300'>
            Menu Booking
          </button>
          <button className='w-45 h-8 border border-black rounded-md  shadow-md shadow-blue-950 hover:shadow-lg hover:scale-105 transition duration-300'>
            Menu Pelanggan
          </button>
          <button className='w-45 h-8 border border-black rounded-md  shadow-md shadow-blue-950 hover:shadow-lg hover:scale-105 transition duration-300'>
            Menu Layanan
          </button>
          <button className='w-45 h-8 border border-black rounded-md  shadow-md shadow-blue-950 hover:shadow-lg hover:scale-105 transition duration-300'>
            Menu Transaksi
          </button>
          <button className='w-45 h-8 border border-black rounded-md  shadow-md shadow-blue-950 hover:shadow-lg hover:scale-105 transition duration-300'>
            Laporan Pendapatan
          </button>
          <button className='w-45 h-8 border border-black rounded-md  shadow-md shadow-blue-950 hover:shadow-lg hover:scale-105 transition duration-300'>
            Pengaturan
          </button>
          <button className='w-45 h-8 border-2 border-white font-bold rounded-md  shadow-md  hover:scale-105 transition duration-300 mt-15'>
            Logout
          </button>
        </div>
      </div>
      <div className='flex  flex-col'>
        <Image
        src="/assets/image/logo.png"
        className='ml-100 '
        width={130}
        height={130}
        alt='logo'
         />
      
        <div className='w-220 h-114 flex ml-10 rounded-xl border-2 border-blue-900'>
          <p>e</p>
        </div>

      </div>
    </div>
  )
}

