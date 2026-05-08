import React from 'react'
import Image from 'next/image'
import Navbar from '@/component/navbar'
import Booking from '@/component/booking'
import { bookingData } from '@/lib/data/data_booking'
export default function AdminHome() {

  
  return (
    <div className='w-full h-150 flex flex-row bg-white'>
      <Navbar />
      <div className='flex  flex-col'>
        <Image
        src="/assets/image/logo.png"
        className='ml-100 -mt-3 '
        width={130}
        height={130}
        alt='logo'
         />
      
        <div className='w-220 h-200 flex flex-col -mt-3 ml-10 pb-10 rounded-xl border-[1px] shadow-lg shadow-blue-800 overflow-y-auto bg-[#E0E9FF] border-blue-900'>
          <div className='flex flex-row ml-22 mt-5 mb-5 gap-5'>
            <div className='flex flex-col w-40 h-17 rounded-lg bg-[#2A4AA1]'>
              <div className='flex flex-row mt-1 ml-2'>
              <Image
                src="/assets/image/date.png"
                className=' '
                width={20}
                height={20}
                alt='logo'
                />
              <p className='text-[12px] mt-1'>Booking Hari Ini</p>
              </div>
              <p className='text-lg font-bold text-[#FFA600] flex justify-center '>12 Booking</p>
            </div>
            <div className='flex flex-col w-40 h-17 rounded-lg bg-[#2A4AA1]'>
              <div className='flex flex-row gap-1 justify- mt-1 ml-2'>
              <Image
                src="/assets/image/antrian.png"
                className='h-2 mt-2'
                width={20}
                height={5}
                alt='logo'
                />
              <p className='text-[12px] mt-1 '>Antrian Hari Ini</p>
              </div>
              <p className='text-lg font-bold text-[#FFA600] flex justify-center '>5 Antrian</p>
            </div>
            <div className='flex flex-col w-40 h-17 rounded-lg bg-[#2A4AA1]'>
              <div className='flex flex-row mt-1 ml-2'>
              <Image
                src="/assets/image/moneyBag.png"
                className=' '
                width={20}
                height={20}
                alt='logo'
                />
              <p className='text-[12px] mt-1'>Pendapatan Hari Ini</p>
              </div>
              <p className='text-lg font-bold text-[#FFA600] flex justify-center '>Rp. 500.000</p>
            </div>
            <div className='flex flex-col w-40 h-17 rounded-lg bg-[#2A4AA1]'>
              <div className='flex flex-row mt-1 ml-2'>
              <Image
                src="/assets/image/pipel.png"
                className=' '
                width={20}
                height={20}
                alt='logo'
                />
              <p className='text-[12px] mt-1'>Pelanggan Hari Ini</p>
              </div>
              <p className='text-lg font-bold text-[#FFA600] flex justify-center '>12 Orang</p>
            </div>
          </div>

        <div className="w-190 h-[2px] rounded-lg mx-auto bg-[#2A4AA1] my-4 pb-0.5"></div>
        <div className="w-full flex justify-center">
          <svg width="720" height="220" className="mt-2">

            {/* garis bawah (axis halus) */}
            <line x1="40" y1="180" x2="680" y2="180" stroke="#C7D6FF" strokeWidth="1.5"/>

            {/* kurva clean */}
            <path
              d="M40 150 
                C120 100, 200 120, 280 90
                S400 50, 480 80
                S600 60, 680 70"
              fill="none"
              stroke="#2A4AA1"
              strokeWidth="3"
              strokeLinecap="round"
              
            />

            {/* glow halus biar premium */}
            <path
              d="M40 150 
                C120 100, 200 120, 280 90
                S400 50, 480 80
                S600 60, 680 70"
              fill="none"
              stroke="#2A4AA1"
              strokeWidth="8"
              opacity="0.08"
            />

            {/* titik kecil elegan */}
            <circle cx="40" cy="150" r="5" fill="#2A4AA1"/>
            <circle cx="280" cy="90" r="5" fill="#2A4AA1"/>
            <circle cx="480" cy="80" r="5" fill="#2A4AA1"/>
            <circle cx="680" cy="70" r="5" fill="#2A4AA1"/>

          </svg>
        </div>
        <div className="w-190 h-[2px] rounded-lg mx-auto bg-[#2A4AA1] my-4 pb-0.5"></div>

          <div className='w-220  flex flex-col gap-3 items-center'>
            <h1 className='underline mb-5 font-bold text-2xl text-[#2A4AA1]'>Booking Hari Ini</h1>
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
  )
}

