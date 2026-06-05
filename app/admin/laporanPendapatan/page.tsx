"use client";

import React from "react";
import Navbar from "@/component/navbar";
import ChartPendapatan from "@/component/chartPendapatan";
import ExportPDFButton from "@/component/exportPDFButton";
import { useEffect, useState } from "react";

const page = () => {


  const [laporanData, setLaporanData] = useState<any[]>([]);

  const namaBulan = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember",
  ];


  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/laporan/")
      .then((res) => res.json())
      .then((data) => {
        const normalized = data.map((item: any) => ({
          id: item.id,
          nama: item.nama,
          paket: item.paket,
          tanggal: item.tanggal,
          metodeBayar: item.metodeBayar,
          harga: item.harga,
        }));

        setLaporanData(normalized);
      });
  }, []);

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
    const validData = arr
      .slice(Math.max(0, index - 2), index + 1)
      .filter((x) => x.pendapatan > 0);

    const avg =
      validData.length > 0
        ? validData.reduce((sum, x) => sum + x.pendapatan, 0) /
          validData.length
        : 0;

    return {
      ...item,
      movingAverage: avg,
    };
  });

  const totalPendapatan = monthlyData.reduce(
    (acc, item) => acc + item.pendapatan,
    0
  );



  const bulanTertinggi =
    monthlyData.length > 0
      ? monthlyData.reduce((prev, current) =>
          prev.pendapatan > current.pendapatan ? prev : current
        )
      : { bulan: "-", pendapatan: 0 };

  const bulanAktif = monthlyData.filter(
    (item) => item.pendapatan > 0
  );

  const rataRata =
  bulanAktif.length > 0
    ? totalPendapatan / bulanAktif.length
    : 0;

  const lastThreeMonths = bulanAktif.slice(-3);

  const prediksiPendapatan =
    lastThreeMonths.length > 0
      ? lastThreeMonths.reduce((acc, item) => acc + item.pendapatan, 0) /
        lastThreeMonths.length
      : 0;

  const bulanTerakhirIndex =
    bulanAktif.length > 0
      ? namaBulan.indexOf(
          bulanAktif[bulanAktif.length - 1].bulan
        )
      : 0;

  const bulanPrediksi = namaBulan[(bulanTerakhirIndex + 1) % 12];

  // ANALISIS KATEGORI LAYANAN
  const kategoriData: {
    [key: string]: {
      jumlahBooking: number;
      totalPendapatan: number;
    };
  } = {};

  laporanData.forEach((item) => {
    const kategori = item.paket || "Tidak diketahui";

    if (!kategoriData[kategori]) {
      kategoriData[kategori] = {
        jumlahBooking: 0,
        totalPendapatan: 0,
      };
    }

    kategoriData[kategori].jumlahBooking += 1;
    kategoriData[kategori].totalPendapatan += item.harga;
  });

console.log("LAPORAN DATA", laporanData);
console.log("KATEGORI DATA", kategoriData);
const kategoriFavorit =
  Object.entries(kategoriData)
    .map(([kategori, data]) => ({
      kategori,
      jumlahBooking: data.jumlahBooking,
      totalPendapatan: data.totalPendapatan,
    }))
    .sort((a, b) => b.totalPendapatan - a.totalPendapatan)[0] || {
    kategori: "-",
    jumlahBooking: 0,
    totalPendapatan: 0,
  };

  const bulanTerakhir =
    bulanAktif[bulanAktif.length - 1];

  const bulanSebelumnya =
    bulanAktif[bulanAktif.length - 2];

  let insightText =
  "Data historis belum mencukupi untuk analisis tren. Sistem membutuhkan minimal dua bulan data pendapatan untuk menghasilkan insight perbandingan.";

  if (bulanTerakhir && bulanSebelumnya) {
    const selisih = bulanTerakhir.pendapatan - bulanSebelumnya.pendapatan;
    const persentase = (selisih / bulanSebelumnya.pendapatan) * 100;

    if (persentase > 10) {
      insightText = `Pendapatan mengalami kenaikan sebesar ${persentase.toFixed(
        1
      )}% dibanding bulan sebelumnya. Kenaikan ini tergolong signifikan dan kategori ${kategoriFavorit.kategori} menjadi layanan yang paling diminati.`;
    } else if (persentase > 0) {
      insightText = `Pendapatan mengalami kenaikan sebesar ${persentase.toFixed(
        1
      )}% dibanding bulan sebelumnya. Tren bisnis menunjukkan perkembangan positif dengan kategori ${kategoriFavorit.kategori} sebagai layanan terlaris.`;
    } else if (persentase < -10) {
      insightText = `Pendapatan mengalami penurunan sebesar ${Math.abs(
        persentase
      ).toFixed(
        1
      )}%. Perlu evaluasi strategi pemasaran, terutama pada kategori layanan yang kurang diminati.`;
    } else if (persentase < 0) {
      insightText = `Pendapatan mengalami penurunan sebesar ${Math.abs(
        persentase
      ).toFixed(
        1
      )}%. Namun Moving Average masih dapat digunakan untuk melihat estimasi pendapatan jangka pendek.`;
    } else {
      insightText =
        "Pendapatan bulan ini cenderung stabil dibanding bulan sebelumnya.";
    }
  }

  const formatRupiah = (value: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="w-full h-150 flex flex-row bg-slate-100">
      <Navbar />

      <div className="flex-1 p-8  overflow-auto">
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
              totalPendapatan={totalPendapatan}
              prediksiPendapatan={prediksiPendapatan}
              kategoriFavorit={kategoriFavorit}
              formatRupiah={formatRupiah}
            />
          </div>
        </div>
        

        <div className="grid grid-cols-3 gap-5 mb-8">
          <div className="bg-white rounded-3xl p-6 shadow-lg">
            <p className="text-slate-500 text-sm">Total Pendapatan</p>
            <h1 className="text-2xl font-bold text-[#2A4AA1] mt-2">
              {formatRupiah(totalPendapatan)}
            </h1>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-lg">
            <p className="text-slate-500 text-sm">Rata-rata Bulanan</p>
            <h1 className="text-2xl font-bold text-[#2A4AA1] mt-2">
              {formatRupiah(rataRata)}
            </h1>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-lg">
            <p className="text-slate-500 text-sm">Pendapatan Tertinggi</p>
            <h1 className="text-2xl font-bold text-[#2A4AA1] mt-2">
              {bulanTertinggi.bulan}
            </h1>
          </div>
        </div>

        <ChartPendapatan data={dataWithMA} />

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
              {bulanPrediksi}
            </div>
          </div>

          <div className="grid grid-cols-4 gap-5">
            <div className="bg-slate-100 rounded-2xl p-5">
              <p className="text-slate-500 text-sm">Bulan Diprediksi</p>
              <h2 className="text-xl font-bold text-[#2A4AA1] mt-2">
                {bulanPrediksi}
              </h2>
            </div>

            <div className="bg-slate-100 rounded-2xl p-5">
              <p className="text-slate-500 text-sm">Prediksi Pendapatan</p>
              <h2 className="text-xl font-bold text-[#2A4AA1] mt-2">
                {formatRupiah(prediksiPendapatan)}
              </h2>
            </div>

            <div className="bg-slate-100 rounded-2xl p-5">
              <p className="text-slate-500 text-sm">Kategori Terlaris</p>
              <h2 className="text-xl font-bold text-[#2A4AA1] mt-2">
                {kategoriFavorit.kategori}
              </h2>
              <p className="text-sm text-slate-500 mt-1">
                {kategoriFavorit.jumlahBooking} booking
              </p>
            </div>

            <div className="bg-slate-100 rounded-2xl p-5">
              <p className="text-slate-500 text-sm">Kontribusi Kategori</p>
              <h2 className="text-xl font-bold text-[#2A4AA1] mt-2">
                {formatRupiah(kategoriFavorit.totalPendapatan)}
              </h2>
            </div>
          </div>

          <div className="mt-5 bg-blue-50 border border-blue-100 rounded-2xl p-5">
            <p className="text-slate-600 leading-7">
              Prediksi pendapatan bulan {bulanPrediksi} adalah{" "}
              <span className="font-bold text-[#2A4AA1]">
                {formatRupiah(prediksiPendapatan)}
              </span>
              . Kategori layanan yang paling diminati adalah{" "}
              <span className="font-bold text-[#2A4AA1]">
                {kategoriFavorit.kategori}
              </span>{" "}
              dengan total{" "}
              <span className="font-bold text-[#2A4AA1]">
                {kategoriFavorit.jumlahBooking} booking
              </span>{" "}
              dan kontribusi pendapatan sebesar{" "}
              <span className="font-bold text-[#2A4AA1]">
                {formatRupiah(kategoriFavorit.totalPendapatan)}
              </span>
              .
            </p>
          </div>
        </div>

        <div className="mt-8 bg-white rounded-3xl p-6 shadow-lg">
          <h1 className="text-2xl font-bold text-[#2A4AA1] mb-3">
            Insight Pendapatan
          </h1>

          <p className="text-slate-600 leading-8">{insightText}</p>
        </div>
      </div>
    </div>
  );
};

export default page;