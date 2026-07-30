"use client";

import React from 'react'
import Image from 'next/image'
import Navbar from '@/component/navbar'
import Booking from '@/component/booking'
import ChartPendapatan from '@/component/chartPendapatan'
import Link from 'next/link';
import { BookingType } from "@/type/bookingType";
import {
    FiTrendingUp,
    FiTrendingDown,
    FiMinus,
    FiActivity,
    FiBarChart2,
    FiCalendar,
    FiClock,
    FiDollarSign,
    FiUsers,
} from "react-icons/fi";


type ChartData = {
    bulan: string;
    pendapatan: number;
    movingAverage: number;
};

type Prediksi = {
    nominal: number;
    trend: string;
    persentase: number;
    bulanPrediksi: string;
    metode: string;
    insight: string;
};

type Dashboard = {
    booking_hari_ini: number;
    antrian: number;
    pelanggan_hari_ini: number;
    pendapatan_hari_ini: number;
    total_booking: number;
    waiting: number;
    progress: number;
    finished: number;
};


export default function AdminHome() {

  
  const [bookingList, setBookingList] = React.useState<BookingType[]>([]);
  const [chartData, setChartData] = React.useState<ChartData[]>([]);
  const [prediksi, setPrediksi] = React.useState<Prediksi>({
    nominal: 0,
    trend: "belum tersedia",
    persentase: 0,
    bulanPrediksi: "-",
    metode: "",
    insight: "",
});

const [dashboard, setDashboard] = React.useState<Dashboard>({
    booking_hari_ini: 0,
    antrian: 0,
    pelanggan_hari_ini: 0,
    pendapatan_hari_ini: 0,
    total_booking: 0,
    waiting: 0,
    progress: 0,
    finished: 0,
});


  React.useEffect(() => {
    fetch("https://web-production-71d3b8.up.railway.app/api/dashboard/")
      .then((res) => res.json())
      .then((data) => setDashboard(data));
  }, []);

  React.useEffect(() => {
    fetch("https://web-production-71d3b8.up.railway.app/api/laporan/")
      .then((res) => res.json())
      .then((data) => {

        setPrediksi(data.prediksi);
        setChartData(data.chart);

      });
  }, []);


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


React.useEffect(() => {
  fetch("https://web-production-71d3b8.up.railway.app/api/booking/")
    .then(res => res.json())
    .then(data => setBookingList(data))
    .catch(err => console.error(err));
}, []);

  return (
    <div className="flex h-screen bg-[#F4F7FE]">

      <Navbar />

      <div className="flex-1 flex flex-col -mt-3 overflow-hidden">
        <div className='flex flex-row items-center '>
          <Image
            src="/assets/image/logo.png"
            className=" "
            width={130}
            height={130}
            alt='logo'
          />
          <h1 className='font-bold text-4xl text-shadow-md text-[#2A4AA1]'>Dahsboard Admin</h1>
        </div>
        <div className="flex-1 m-3 -mt-3 rounded-2xl border border-blue-900 bg-[#E0E9FF] shadow-lg shadow-blue-300 overflow-y-auto">

          {/* CARD STATISTIK */}
          <div className="grid grid-cols-2 gap-3 px-7 py-7 lg:grid-cols-4">
              {[
                  {
                      title: "Booking Hari Ini",
                      value: `${dashboard.booking_hari_ini}`,
                      suffix: "Booking",
                      icon: <FiCalendar size={17} />,
                  },
                  {
                      title: "Antrian Hari Ini",
                      value: `${dashboard.antrian}`,
                      suffix: "Antrian",
                      icon: <FiClock size={17} />,
                  },
                  {
                      title: "Pendapatan Hari Ini",
                      value: `Rp ${dashboard.pendapatan_hari_ini.toLocaleString("id-ID")}`,
                      suffix: "",
                      icon: <FiDollarSign size={17} />,
                  },
                  {
                      title: "Pelanggan Hari Ini",
                      value: `${dashboard.pelanggan_hari_ini}`,
                      suffix: "Orang",
                      icon: <FiUsers size={17} />,
                  },
              ].map((item) => (
                  <div
                      key={item.title}
                      className="group overflow-hidden rounded-xl border border-[#D8E3FF] bg-white shadow-[0_10px_28px_rgba(42,74,161,0.12)] transition-all duration-300 hover:-translate-y-1 hover:border-[#2A4AA1] hover:shadow-[0_18px_40px_rgba(42,74,161,0.20)]"
                  >
                      <div className="h-1 bg-gradient-to-r from-[#2A4AA1] via-[#4F73E8] to-[#6B8BFF]" />
                      <div className="flex items-center justify-between px-4 py-3">
                          <div>
                              <p className="text-[11px] font-semibold text-slate-500">
                                  {item.title}
                              </p>
                              <h2 className="mt-1 text-lg font-black leading-none text-slate-900">
                                  {item.value}
                                  <span className="ml-1 text-xs font-semibold text-slate-500">
                                      {item.suffix}
                                  </span>
                              </h2>
                          </div>
                          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#2A4AA1] to-[#5B7DF3] text-white shadow-md transition-all duration-300 group-hover:rotate-6 group-hover:scale-110">
                              {item.icon}
                          </div>
                      </div>
                  </div>
              ))}
          </div>

          {/* HERO PREDIKSI */}
    <div className="mx-7 mb-7 overflow-hidden rounded-2xl border border-[#D8E3FF] bg-gradient-to-r from-[#2A4AA1] via-[#3A5FC2] to-[#5B7DF3] shadow-[0_12px_35px_rgba(42,74,161,0.25)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(42,74,161,0.35)]">
      <div className="relative flex flex-col gap-6 p-6 lg:flex-row lg:items-center lg:justify-between">
        {/* Background Decoration */}
        <div className="absolute -right-16 -top-16 h-52 w-52 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-24 left-16 h-44 w-44 rounded-full bg-white/10 blur-2xl" />

        {/* LEFT */}
        <div className="relative z-10">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
                <FiActivity />
                Prediksi Pendapatan
            </div>
            <h2 className="text-4xl font-black tracking-tight text-white">
                Rp{" "}
                {Number(prediksi.nominal).toLocaleString("id-ID")}
            </h2>
            <p className="mt-2 max-w-lg text-sm text-blue-100">
                Prediksi pendapatan bulan berikutnya berdasarkan metode
                <span className="font-semibold text-white">
                    {" "}Single Moving Average (3 Bulan)
                </span>
            </p>
            
        </div>

        {/* RIGHT */}
        <div className="relative z-10 flex flex-wrap items-center gap-3">
            <div
                className={`flex items-center gap-2 rounded-xl border px-4 py-3 backdrop-blur transition-all duration-300 ${
                    prediksi.trend === "naik"
                        ? "border-green-300/30 bg-green-400/15 text-green-100"
                        : prediksi.trend === "turun"
                        ? "border-red-300/30 bg-red-400/15 text-red-100"
                        : "border-yellow-300/30 bg-yellow-400/15 text-yellow-100"
                }`}
            >
                {prediksi.trend === "naik" ? (
                    <FiTrendingUp size={20} />
                ) : prediksi.trend === "turun" ? (
                    <FiTrendingDown size={20} />
                ) : (
                    <FiMinus size={20} />
                )}
                <div>
                    <p className="text-xs opacity-80">
                        Trend
                    </p>
                    <p className="font-bold capitalize">
                        {prediksi.trend}
                    </p>
                </div>
            </div>
            <div className="rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white backdrop-blur">
                <p className="text-xs text-blue-100">
                    Perubahan
                </p>
                <p className="text-lg font-black">
                    {prediksi.persentase > 0 ? "+" : ""}
                    {prediksi.persentase}%
                </p>
            </div>
            <div className="rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white backdrop-blur">
                <p className="text-xs text-blue-100">
                    Metode
                </p>
                <div className="mt-1 flex items-center gap-2">
                    <FiBarChart2 />
                    <span className="font-bold">
                        SMA (3)
                    </span>
                </div>
            </div>
            <div className="rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white backdrop-blur">
                <p className="text-xs text-blue-100">
                    Bulan Prediksi
                </p>

                <p className="mt-1 font-bold">
                    {prediksi.bulanPrediksi}
                </p>
            </div>
            <p className="mt-4 max-w-xl text-sm leading-7 text-blue-100">
                {prediksi.insight}
            </p>
        </div>
      </div>
    </div>

          {/* GRAFIK MOVING AVERAGE */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
  
            <div className="xl:col-span-2 px-10 ">
              <ChartPendapatan data={chartData}/>
            </div>
          </div>

          {/* BOOKING */}
          <div className="w-full flex flex-col items-center px-6 pb-6">

            <Link href="/admin/adminBooking">
              <h1 className='underline py-5 font-bold text-2xl text-[#2A4AA1] cursor-pointer hover:text-blue-600'>
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
                nama={item.nama}
                package_name={item.package_name}
                payment_method={item.payment_method}
                booking_status={item.booking_status}
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