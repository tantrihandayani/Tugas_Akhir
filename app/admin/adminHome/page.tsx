"use client";

import React from 'react'
import Image from 'next/image'
import Navbar from '@/component/navbar'
import Booking from '@/component/booking'
import ChartPendapatan from '@/component/chartPendapatan'
import Link from 'next/link';


export default function AdminHome() {

  
  const [bookingList, setBookingList] = React.useState<any[]>([]);
  const [laporanData, setLaporanData] = React.useState<any[]>([]);
  const namaBulan = [
      "Januari",
      "Februari",
      "Maret",
      "April",
      "Mei",
      "Juni",
      "Juli",
      "Agustus",
      "September",
      "Oktober",
      "November",
      "Desember",
    ];


  React.useEffect(() => {
    fetch("http://127.0.0.1:8000/api/dashboard/")
      .then((res) => res.json())
      .then((data) => setDashboard(data));
  }, []);

  React.useEffect(() => {
  fetch("http://127.0.0.1:8000/api/laporan/")
    .then((res) => res.json())
    .then((data) => setLaporanData(data));
}, []);

const [dashboard, setDashboard] = React.useState({
  booking_hari_ini: 0,
  antrian: 0,
  pelanggan_hari_ini: 0,
  pendapatan_hari_ini: 0,

  total_booking: 0,
  waiting: 0,
  progress: 0,
  finished: 0,
});

const getTodayLocal = () => {
  const now = new Date();
  const offset = now.getTimezoneOffset();
  const local = new Date(now.getTime() - offset * 60000);
  return local.toISOString().split("T")[0];
};

const today = getTodayLocal();

const todayBookings = bookingList.filter(
  (item) => item.date?.split("T")[0] === today
);

const totalTodayBookings = todayBookings.length;
const pendapatanBulanan: { [key: string]: number } = {};

laporanData.forEach((item) => {
  const date = new Date(item.tanggal);
  const bulan = namaBulan[date.getMonth()];
  if (!pendapatanBulanan[bulan]) {
    pendapatanBulanan[bulan] = 0;
  }
  pendapatanBulanan[bulan] += Number(item.harga);
});
const monthlyData = namaBulan.map((bulan) => ({
  bulan,
  pendapatan: pendapatanBulanan[bulan] || 0,
}));

const dataWithMA = monthlyData.map((item, index, arr) => {
  if (index < 2) {
    return {
      ...item,
      movingAverage: item.pendapatan,
    };
  }
  const avg =
    (
      arr[index].pendapatan +
      arr[index - 1].pendapatan +
      arr[index - 2].pendapatan
    ) / 3;
  return {
    ...item,
    movingAverage: avg,
  };
});

React.useEffect(() => {
  fetch("http://127.0.0.1:8000/api/booking/")
    .then(res => res.json())
    .then(data => setBookingList(data))
    .catch(err => console.error(err));
}, []);
console.log("HOME DATA:", bookingList);
  return (
    <div className='w-full h-150 flex flex-row bg-white'>

      <Navbar />

      <div className='flex flex-col'>

        <Image
          src="/assets/image/logo.png"
          className='ml-100 -mt-3'
          width={130}
          height={130}
          alt='logo'
        />

        <div className='w-220 h-200 flex flex-col -mt-3 ml-10 pb-10 rounded-xl border-[1px] shadow-lg shadow-blue-800 overflow-y-auto bg-[#E0E9FF] border-blue-900'>

          {/* CARD STATISTIK */}
          <div className='flex flex-row ml-22 mt-5 mb-5 gap-5'>

            <div className='flex flex-col w-40 h-17 rounded-lg bg-[#2A4AA1]'>
              <div className='flex flex-row mt-1 ml-2 gap-2'>
                <Image
                  src="/assets/image/date.png"
                  width={20}
                  height={20}
                  alt='date'
                />
                <p className='text-[12px] mt-1 text-white'>Booking Hari Ini</p>
              </div>

              <p className='text-lg font-bold text-[#FFA600] flex justify-center'>
                {dashboard.booking_hari_ini} Booking
              </p>
            </div>

            <div className='flex flex-col  w-40 h-17 rounded-lg bg-[#2A4AA1]'>
              <div className='flex flex-row gap-2 mt-1 ml-2'>
                <Image
                  src="/assets/image/antrian.png"
                  className='h-2 mt-2'
                  width={20}
                  height={5}
                  alt='antrian'
                />

                <p className='text-[12px] mt-1 text-white'>
                  Antrian Hari Ini
                </p>
              </div>

              <p className='text-lg font-bold text-[#FFA600] flex justify-center'>
                {dashboard.antrian} Antrian
              </p>
            </div>

            <div className='flex flex-col w-40 h-17 rounded-lg bg-[#2A4AA1]'>
              <div className='flex flex-row gap-2 mt-1 ml-2'>
                <Image
                  src="/assets/image/moneyBag.png"
                  width={20}
                  height={20}
                  alt='money'
                />

                <p className='text-[12px] mt-1 text-white'>
                  Pendapatan Hari Ini
                </p>
              </div>

              <p className='text-lg font-bold text-[#FFA600] flex justify-center'>
                Rp {dashboard.pendapatan_hari_ini.toLocaleString("id-ID")}
              </p>
            </div>

            <div className='flex flex-col w-40 h-17 rounded-lg bg-[#2A4AA1]'>
              <div className='flex flex-row gap-2 mt-1 ml-2'>
                <Image
                  src="/assets/image/pipel.png"
                  width={20}
                  height={20}
                  alt='people'
                />

                <p className='text-[12px] mt-1 text-white'>
                  Pelanggan Hari Ini
                </p>
              </div>

              <p className='text-lg font-bold text-[#FFA600] flex justify-center'>
                {dashboard.pelanggan_hari_ini} Orang
              </p>
            </div>

          </div>

          {/* GRAFIK MOVING AVERAGE */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
  
            <div className="xl:col-span-2 px-10 ">
              <ChartPendapatan data={dataWithMA} />
            </div>
          </div>

          {/* BOOKING */}
          <div className='w-220 flex flex-col gap-3 items-center mt-5'>

            <Link href="/admin/adminBooking">
              <h1 className='underline mb-5 font-bold text-2xl text-[#2A4AA1] cursor-pointer hover:text-blue-600'>
                Booking Hari Ini
              </h1>
            </Link>
          
            {todayBookings.map((item, index) => {
            return (
              <Booking
                key={index}
                id={item.id}
                date={item.date}
                time={item.time}
                customer_name={item.nama}
                package_name={item.package_name}
                payment_method={item.payment_method}
                status={item.booking_status}
                className="w-full scale-90"
              />
            );
          })}
         

          </div>

        </div>

      </div>

    </div>
  )
};