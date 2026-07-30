"use client";

import React from "react";
import Navbar from "@/component/navbar";
import ChartPendapatan from "@/component/chartPendapatan";
import ExportPDFButton from "@/component/exportPDFButton";
import { useEffect, useState } from "react";

type ChartData = {
    bulan: string;
    pendapatan: number;
    movingAverage: number;
};

type Statistik = {
    totalPendapatan:number;
    rataRata:number;
    bulanTertinggi:string;
    pendapatanTertinggi:number;
    kategoriFavorit:string;
    jumlahBookingKategori:number;
    kontribusiKategori:number;
}

type Prediksi={
    nominal:number;
    bulanPrediksi:string;
    trend:string;
    persentase:number;
    metode: string;
    insight: string;  
}

const page = () => {


  const [laporanData, setLaporanData] = useState<any[]>([]);
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [statistik, setStatistik] = useState<Statistik | null>(null);
  const [prediksi, setPrediksi] = useState<Prediksi | null>(null);
  const [loading,setLoading]=useState(true)

const fetchLaporan = async () => {
  setLoading(true);

  let url = "https://web-production-71d3b8.up.railway.app/api/laporan/";

  if (filterType === "day") {
    url += `?type=day&date=${selectedDate}`;
  } else if (filterType === "month") {
    url += `?type=month&month=${selectedMonth}`;
  } else if (filterType === "year") {
    url += `?type=year&year=${selectedYear}`;
  }

  try {
    const res = await fetch(url);
    const data = await res.json();

    console.log(data);

    setLaporanData(data.laporan);
    setChartData(data.chart);
    setStatistik(data.statistik);
    setPrediksi(data.prediksi);
  } catch (err) {
    console.error("Gagal mengambil laporan:", err);
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  fetchLaporan();
}, []);


const [filterType, setFilterType] = useState("month");

const [selectedDate, setSelectedDate] = useState(
  new Date().toISOString().split("T")[0]
);

const [selectedMonth, setSelectedMonth] = useState(
  `${new Date().getFullYear()}-${String(
    new Date().getMonth() + 1
  ).padStart(2, "0")}`
);

const [selectedYear, setSelectedYear] = useState(
  String(new Date().getFullYear())
);

const formatRupiah = (value: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
};

if (loading) {
  return (
    <div className="flex h-screen bg-[#F4F7FE]">
      <Navbar />
      <main className="flex-1 overflow-auto px-5 py-5 animate-pulse">
        {/* HEADER */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <div className="h-10 w-72 rounded-xl bg-slate-200" />
            <div className="mt-3 h-4 w-96 rounded-lg bg-slate-200" />
          </div>
          <div className="h-12 w-40 rounded-2xl bg-slate-200" />
        </div>

        {/* CARD */}
        <div className="mb-8 grid grid-cols-3 gap-5">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="rounded-3xl bg-white p-6 shadow-lg"
            >
              <div className="h-4 w-28 rounded bg-slate-200" />
              <div className="mt-4 h-8 w-40 rounded bg-slate-200" />
            </div>
          ))}
        </div>

        {/* CHART */}
        <div className="h-[380px] rounded-3xl bg-white shadow-lg" />
        {/* PREDIKSI */}
        <div className="mt-8 rounded-3xl bg-white p-6 shadow-lg">
          <div className="mb-5 h-8 w-60 rounded bg-slate-200" />
          <div className="grid grid-cols-4 gap-5">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="rounded-2xl bg-slate-100 p-5"
              >
                <div className="h-3 w-24 rounded bg-slate-200" />
                <div className="mt-4 h-7 w-28 rounded bg-slate-200" />
              </div>
            ))}
          </div>
        </div>
        {/* INSIGHT */}
        <div className="mt-8 rounded-3xl bg-white p-6 shadow-lg">
          <div className="mb-4 h-6 w-48 rounded bg-slate-200" />
          <div className="space-y-3">
            <div className="h-4 rounded bg-slate-200" />
            <div className="h-4 rounded bg-slate-200" />
            <div className="h-4 w-3/4 rounded bg-slate-200" />
          </div>
        </div>
      </main>
    </div>
  );
}

  return (
    <div className="flex h-screen bg-[#F4F7FE]">
      <Navbar />

      <main className="flex-1  overflow-auto px-5 py-5 ">
        <div className="flex flex-row justify-between items-center pb-3 ">
          <div className="flex flex-col">
            <h1 className="text-4xl font-bold text-[#2A4AA1]">
              Laporan Pendapatan
            </h1>

            <p className="text-slate-500 mt-2">
              Analisis pendapatan, Moving Average, dan kategori layanan
            </p>
          </div>
          <div className="">
            <ExportPDFButton
              dataTransaksi={laporanData}
              totalPendapatan={statistik?.totalPendapatan ?? 0}
              prediksiPendapatan={prediksi?.nominal ?? 0}
              kategoriFavorit={{
                kategori: statistik?.kategoriFavorit ?? "-",
                jumlahBooking: statistik?.jumlahBookingKategori ?? 0,
                totalPendapatan: statistik?.kontribusiKategori ?? 0,
              }}
              periode={{
                type: filterType,
                date: selectedDate,
                month: selectedMonth,
                year: selectedYear,
              }}
              formatRupiah={formatRupiah}
            />
          </div>
        </div>
        
{/* //LAPORAN PENDAPATAN// */}

<div className="mb-4 flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-2 shadow-sm">

  <div className="flex items-center gap-5">

    <div className="flex items-center gap-2">
      <span className="text-xs font-medium text-slate-500">
        Periode
      </span>

      <select
        value={filterType}
        onChange={(e) => setFilterType(e.target.value)}
        className="h-8 rounded-lg border border-slate-200 px-3 text-[13px] text-[#2A4AA1] outline-none"
      >
        <option value="day">Harian</option>
        <option value="month">Bulanan</option>
        <option value="year">Tahunan</option>
      </select>
    </div>

    {filterType === "day" && (
      <div className="flex items-center gap-2">
        <span className="text-xs font-medium text-slate-500">
          Tanggal
        </span>

        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="h-8 rounded-lg border border-slate-200 px-3 text-[13px] text-[#2A4AA1] outline-none"
        />
      </div>
    )}

    {filterType === "month" && (
      <div className="flex items-center gap-2">
        <span className="text-xs font-medium text-slate-500">
          Bulan
        </span>

        <input
          type="month"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          className="h-8 rounded-lg border border-slate-200 px-3 text-[13px] text-[#2A4AA1] outline-none"
        />
      </div>
    )}

    {filterType === "year" && (
      <div className="flex items-center gap-2">
        <span className="text-xs font-medium text-slate-500">
          Tahun
        </span>

        <input
          type="number"
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          className="h-8 w-24 rounded-lg border border-slate-200 px-3 text-[13px] text-[#2A4AA1] outline-none"
        />
      </div>
    )}

  </div>

  <button
    onClick={fetchLaporan}
    className="flex h-8 items-center rounded-lg bg-[#2A4AA1] px-4 text-[13px] font-medium text-white transition hover:bg-[#1E3A8A]">
      Terapkan
  </button>

</div>

        <div className="grid grid-cols-3 gap-5 mb-8">
          <div className="bg-white rounded-3xl p-6 shadow-lg">
            <p className="text-slate-500 text-sm">Total Pendapatan</p>
            <h1 className="text-2xl font-bold text-[#2A4AA1] mt-2">
              {formatRupiah(statistik?.totalPendapatan ?? 0)}
            </h1>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-lg">
            <p className="text-slate-500 text-sm">Rata-rata Bulanan</p>
            <h1 className="text-2xl font-bold text-[#2A4AA1] mt-2">
              {formatRupiah(statistik?.rataRata ?? 0)}
            </h1>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-lg">
            <p className="text-slate-500 text-sm">Pendapatan Tertinggi</p>
            <h1 className="text-2xl font-bold text-[#2A4AA1] mt-2">
              {formatRupiah(statistik?.pendapatanTertinggi ?? 0)}
            </h1>
          </div>
        </div>

        {filterType === "year" && (
            <ChartPendapatan data={chartData} />
        )}
      {filterType === "year" && (
        <div className="mt-8 bg-white rounded-3xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h1 className="text-2xl font-bold text-[#2A4AA1]">
                Prediksi Pendapatan
              </h1>

              <p className="text-slate-500 mt-1">
                Menggunakan Moving Average 3 bulan terakhir dan analisis kategori
              </p>
            </div>

            <div className="bg-[#2A4AA1] text-white px-5 py-3 rounded-2xl">
              {prediksi?.bulanPrediksi ?? "-"}
            </div>
          </div>

          <div className="grid grid-cols-4 gap-5">
            <div className="bg-slate-100 rounded-2xl p-5">
              <p className="text-slate-500 text-sm">Bulan Diprediksi</p>
              <h2 className="text-xl font-bold text-[#2A4AA1] mt-2">
                {prediksi?.bulanPrediksi ?? "-"}
              </h2>
            </div>

            <div className="bg-slate-100 rounded-2xl p-5">
              <p className="text-slate-500 text-sm">Prediksi Pendapatan</p>
              <h2 className="text-xl font-bold text-[#2A4AA1] mt-2">
                {formatRupiah(prediksi?.nominal ?? 0)}
              </h2>
            </div>

            <div className="bg-slate-100 rounded-2xl p-5">
              <p className="text-slate-500 text-sm">Kategori Terlaris</p>
              <h2 className="text-xl font-bold text-[#2A4AA1] mt-2">
                {statistik?.kategoriFavorit}
              </h2>
              <p className="text-sm text-slate-500 mt-1">
                {statistik?.jumlahBookingKategori} booking
              </p>
            </div>

            <div className="bg-slate-100 rounded-2xl p-5">
              <p className="text-slate-500 text-sm">Kontribusi Kategori</p>
              <h2 className="text-xl font-bold text-[#2A4AA1] mt-2">
                {formatRupiah(statistik?.kontribusiKategori ?? 0)}
              </h2>
            </div>
          </div>

          <div className="mt-5 bg-blue-50 border border-blue-100 rounded-2xl p-5">
            <p className="text-slate-600 leading-7">
              Prediksi pendapatan bulan {prediksi?.bulanPrediksi ?? "-"} adalah{" "}
              <span className="font-bold text-[#2A4AA1]">
                  {formatRupiah(prediksi?.nominal ?? 0)}
              </span>
              . Kategori layanan yang paling diminati adalah{" "}
              <span className="font-bold text-[#2A4AA1]">
                {statistik?.kategoriFavorit}
              </span>{" "}
              dengan total{" "}
              <span className="font-bold text-[#2A4AA1]">
                {statistik?.jumlahBookingKategori} booking
              </span>{" "}
              dan kontribusi pendapatan sebesar{" "}
              <span className="font-bold text-[#2A4AA1]">
                {formatRupiah(statistik?.kontribusiKategori ?? 0)}
              </span>
              .
            </p>
          </div>
        </div>
      )}

        {filterType === "year" && (
          <div className="mt-8 bg-white rounded-3xl p-6 shadow-lg">

            <h1 className="text-2xl font-bold text-[#2A4AA1] mb-3">
              Insight Pendapatan
            </h1>

            <p className="text-slate-600 leading-8">
              {prediksi?.insight}
            </p>

          </div>
        )}
        <div className="mt-8 rounded-3xl bg-white p-6 shadow-lg">

  <div className="mb-5 flex items-center justify-between">
    <div>
      <h1 className="text-2xl font-bold text-[#2A4AA1]">
        Daftar Transaksi
      </h1>

      <p className="mt-1 text-slate-500">
        Riwayat transaksi sesuai periode yang dipilih
      </p>
    </div>

    <span className="rounded-xl bg-slate-100 px-4 py-2 text-sm font-medium text-slate-600">
      {laporanData.length} Transaksi
    </span>
  </div>

  <div className="overflow-x-auto">
    <table className="min-w-full">
      <thead>
        <tr className="border-b border-slate-200 text-left text-sm text-slate-500">
          <th className="px-4 py-3">Tanggal</th>
          <th className="px-4 py-3">Pelanggan</th>
          <th className="px-4 py-3">Paket</th>
          <th className="px-4 py-3">Metode</th>
          <th className="px-4 py-3 text-right">Harga</th>
        </tr>
      </thead>

      <tbody>
        {laporanData.length > 0 ? (
          laporanData.map((item) => (
            <tr
              key={item.id}
              className="border-b border-slate-100 transition hover:bg-slate-50"
            >
              <td className="px-4 py-4 text-sm">
                {item.tanggal}
              </td>

              <td className="px-4 py-4 font-medium">
                {item.nama}
              </td>

              <td className="px-4 py-4">
                {item.paket}
              </td>

              <td className="px-4 py-4 capitalize">
                {item.metodeBayar}
              </td>

              <td className="px-4 py-4 text-right font-semibold text-[#2A4AA1]">
                {formatRupiah(item.harga)}
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td
              colSpan={5}
              className="py-10 text-center text-slate-400"
            >
              Tidak ada data transaksi.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>

</div>
      </main>
    </div>
  );
};

export default page;