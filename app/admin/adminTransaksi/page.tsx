"use client";

import Navbar from '@/component/navbar'
import React from 'react'
import Image from 'next/image'
import CardTransaksi from '@/component/transaksi'
import { useState, useEffect } from 'react'
import BarTransaksi from '@/component/barTransaksi';
import { Transaksi } from "@/type/transaksiType";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const page = () => {

  const [transaksiList, setTransaksiList] = useState<Transaksi[]>([]);
  const [selectedData, setSelectedData] = useState<any>(null);
  const [openDetail, setOpenDetail] = useState(false);
  const [catatan, setCatatan] = useState("");
  const [search, setSearch] = useState("");
  const [previewImage, setPreviewImage] = useState(false);
  const [statusAction, setStatusAction] = useState({
  type: "",
  time: 0
  });
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredData = transaksiList.filter((item: any) => {
    const cocokSearch =
      item.nama?.toLowerCase().includes(search.toLowerCase()) ||
      item.id?.toString().includes(search) ||
      item.nomor_hp?.toString().includes(search);

    const cocokStatus =
      statusFilter === "all" ||
      item.payment_status === statusFilter;

    return cocokSearch && cocokStatus;
  });

  const today = new Date().toISOString().split("T")[0];
  const pendapatanHariIni = transaksiList
    .filter(
      (item) =>
        item.payment_status === "confirmed" &&
        item.tanggal?.split("T")[0] === today
    )
    .reduce(
      (total, item) => total + Number(item.harga),
      0
    );

  const menungguValidasi = transaksiList.filter(
    (item) => item.payment_status === "pending"
  ).length;

  const transaksiBerhasil = transaksiList.filter(
    (item) => item.payment_status === "confirmed"
  ).length;

  const transaksiDitolak = transaksiList.filter(
    (item) => item.payment_status === "rejected"
  ).length;

  const fetchTransaksi = async () => {
  try {
    const res = await fetch("https://web-production-71d3b8.up.railway.app/api/transaksi/");
    const data = await res.json();

    const normalized = data.map((item: any) => ({
      id: item.id,
      nama: item.nama,
      paket: item.package_name,
      tanggal: item.date,
      waktu: item.time ? `${item.time.slice(0, 5)} WIB` : "-",
      metode: item.payment_method === "qris" ? "QRIS" : "Tunai",
      bukti: item.bukti_pembayaran
      ? item.bukti_pembayaran.startsWith("http")
        ? item.bukti_pembayaran
        : `${API_URL}${item.bukti_pembayaran}`
      : null,
      harga: item.harga || "-",
      nomor_hp: item.nomor_hp,
      payment_status: item.payment_status,
      tanggalUpload: item.created_at,
      booking_status: item.booking_status,
    }));

    setTransaksiList(normalized);
  } catch (err) {
    console.error("Gagal mengambil data transaksi:", err);
  }
};

useEffect(() => {
  fetchTransaksi();

  const interval = setInterval(() => {
    fetchTransaksi();
  }, 10000); // setiap 10 detik

  return () => clearInterval(interval);
}, []);


  useEffect(() => {
    if (statusAction.type === "validasi") {
      alert("Transaksi berhasil divalidasi");
      setOpenDetail(false);
    }

    if (statusAction.type === "tolak") {
      alert("Transaksi berhasil ditolak");
      setOpenDetail(false);
    }
  }, [statusAction]);

  const handleValidasi = async () => {
  if (!selectedData) return;

  try {
    await fetch(
      `https://web-production-71d3b8.up.railway.app/api/booking/${selectedData.id}/`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          payment_status: "confirmed",
        }),
      }
    );
    await fetchTransaksi();

    setOpenDetail(false);
    alert("Transaksi berhasil divalidasi");
  } catch (err) {
    console.error(err);
  }
};

const handleTolak = async () => {
  if (!selectedData) return;

  try {
    await fetch(
      `https://web-production-71d3b8.up.railway.app/api/booking/${selectedData.id}/`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          payment_status: "rejected",
          booking_status: "cancelled",
        }),
      }
    );
    await fetchTransaksi();

    setOpenDetail(false);
    alert("Transaksi berhasil ditolak");
  } catch (err) {
    console.error(err);
  }
};
console.log(transaksiList);
  return (
    <div className='w-full  flex flex-row bg-white'>
       <Navbar/>
       <div className='w-full bg-white  flex flex-col ' >
       <div className='w-full h-15 flex flex-row justify-between px-5 mt-5 '>
          <h1 className='font-extrabold text-2xl text-[#2A4AA1]'>
            Menu Transaksi
            </h1>
            <div className="flex items-center gap-3">
            <div className="flex h-10 w-72 items-center gap-2 rounded-lg bg-[#2A4AA1] px-3">
              <Image
                src="/assets/image/search.png"
                width={18}
                height={18}
                alt="search"
              />

              <input
                type="text"
                placeholder="Cari transaksi..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-transparent text-white placeholder:text-white/50 outline-none"
              />
            </div>
       
            <div className="flex items-center gap-3">

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="h-10 w-40 rounded-lg border border-[#2A4AA1] px-3 text-sm text-[#2A4AA1]"
            >
              <option value="all">Semua Status</option>
              <option value="pending">Menunggu</option>
              <option value="confirmed">Berhasil</option>
              <option value="rejected">Ditolak</option>
            </select>


          </div>
           </div> 
        </div>
       
        {/* CONTAINER BIRU */}
      <div className='w-full h-full bg-[#D4E0FF] rounded-t-xl flex flex-col pl-5 '>
      
        {/* KATEGORI (tidak ikut scroll) */}
        <div className="flex gap-3 px-3 py-3">
            <BarTransaksi
                title="Pendapatan Hari Ini"
                value={`Rp ${pendapatanHariIni.toLocaleString("id-ID")}`}
            />
            <BarTransaksi
                title="Menunggu Validasi"
                value={`${menungguValidasi}`}
            />
            <BarTransaksi
                title="Berhasil"
                value={`${transaksiBerhasil}`}
            />
            <BarTransaksi
                title="Ditolak"
                value={`${transaksiDitolak}`}
            />
        </div>

        {/* Data Transaksi */}
        <div className='w-full h-110 flex px-5  flex-col gap-5   pb-10 overflow-y-auto   '>
          {filteredData.map((item) => (
            <CardTransaksi 
              key={item.id} 
              data={item}
              onClick={() => {
                setSelectedData(item);
                setOpenDetail(true);
                setCatatan("");
              }}
            />
          ))}
        </div>


      </div>
    </div>
        {openDetail && selectedData && (
          <div 
            className="fixed inset-0 bg-black/50   flex items-center justify-center z-50"
            onClick={() => setOpenDetail(false)}
          >
            <div 
              className="bg-white w-[900px] rounded-2xl p-6 flex gap-6 relative scale-95 animate-in fade-in zoom-in-95"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setOpenDetail(false)}
                className="absolute top-1 right-2 text-2xl font-bold text-[#2A4AA1] hover:scale-110"
              >
                <Image
                    src="/assets/image/close.png"
                    width={25}
                    height={25}
                    alt="close "
                    className="rounded-lg  "
                  />
              </button>

              {/* KIRI - BUKTI */}
              <div className="w-[300px]">
                <div
                  onClick={() => selectedData?.bukti && setPreviewImage(true)}
                  className="bg-gray-100 rounded-xl p-3 shadow h-[420px] cursor-zoom-in overflow-hidden"
                >
                  {selectedData?.bukti ? (
                    <div className="w-full h-full bg-gray-100 rounded-xl overflow-hidden flex items-center justify-center">
                      <img
                        src={selectedData.bukti}
                        alt="bukti"
                        className="w-full h-full object-contain"
                      />
                    </div>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-500">
                      Bukti pembayaran tidak tersedia
                    </div>
                  )}
                </div>

                <p className="text-sm text-[#2A4AA1] mt-2">
                  Upload:{" "}
                  {selectedData?.tanggalUpload
                    ? new Date(selectedData.tanggalUpload).toLocaleString("id-ID", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : selectedData?.tanggal}
                </p>
              </div>

              {/* KANAN - DETAIL */}
              <div className="flex-1 flex flex-col justify-between">

                {/* HEADER */}
                <div>
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-xl font-bold text-[#2A4AA1]">
                        {selectedData?.nama}
                      </h2>
                      <p className="text-[#2A4AA1]">{selectedData?.nomor_hp}</p>
                      
                    </div>

                    <div
                      className={`px-4 py-2 mr-5 rounded-lg text-white font-semibold ${
                        selectedData?.payment_status === "confirmed"
                          ? "bg-green-500"
                          : selectedData?.payment_status === "rejected"
                          ? "bg-red-500"
                          : "bg-yellow-500"
                      }`}
                    >
                      {selectedData?.payment_status === "confirmed"
                        ? "Berhasil"
                        : selectedData?.payment_status === "rejected"
                        ? "Ditolak"
                        : "Menunggu Validasi"}
                    </div>
                  </div>

                  <hr className="my-4 border-dashed border-[#2A4AA1]" />

                  {/* DETAIL */}
                  <div className="grid grid-cols-2 gap-y-2 text-[#2A4AA1]">
                    <p className="font-semibold">Tanggal Transaksi :</p>
                    <p>{selectedData?.tanggal}</p>

                    <p className="font-semibold">Kategori :</p>
                    <p>{selectedData?.paket}</p>

                    <p className="font-semibold">Waktu Booking :</p>
                    <p>{selectedData?.waktu}</p>

                    <p className="font-semibold">Harga :</p>
                    <p>Rp {Number(
                      selectedData?.harga || 0
                    ).toLocaleString("id-ID")}</p>

                    <p className="font-semibold">Metode Pembayaran :</p>
                    <p>{selectedData?.metode}</p>

                    <p className="font-semibold">ID Transaksi :</p>
                    <p className="font-bold underline">
                      {selectedData?.id}
                    </p>
                  </div>

                  <hr className="my-4 border-dashed border-[#2A4AA1]" />

                  <div className="flex flex-col gap-2">
                    <label className="text-[#2A4AA1] font-semibold">
                      Catatan (opsional)
                    </label>

                    <textarea
                      value={catatan}
                      onChange={(e) => setCatatan(e.target.value)}
                      placeholder="Masukkan catatan..."
                      className="w-full h-24 border border-[#2A4AA1] rounded-lg p-2 text-[#002381]"
                    />
                  </div>
                </div>

                {/* BUTTON */}
                <div className="flex justify-between mt-6">

                {selectedData?.payment_status === "pending" ? (
                  <>
                    <button
                      onClick={handleValidasi}
                      className="flex items-center gap-2 px-6 py-3 bg-[#3DCBFF]/40 rounded-lg text-[#002381] font-bold"
                    >
                      ✔ Validasi
                    </button>

                    <button
                      onClick={handleTolak}
                      className="flex items-center gap-2 px-6 py-3 bg-red-500 text-white rounded-lg font-bold"
                    >
                      ✖ Tolak
                    </button>
                  </>
                ) : (
                  <div
                    className={`w-full text-center py-3 rounded-lg font-bold ${
                      selectedData?.payment_status === "confirmed"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {selectedData?.payment_status === "confirmed"
                      ? "✓ Transaksi telah divalidasi"
                      : "✕ Transaksi telah ditolak"}
                  </div>
                )}

              </div>

              </div>
            </div>
          </div>
        )}

        {previewImage && (
        <div
          onClick={() => setPreviewImage(false)}
          className="fixed inset-0 z-[9999] bg-black/80 flex items-center justify-center p-10"
        >
          <img
            src={selectedData?.bukti}
            alt="Preview"
            className="max-w-[90vw] max-h-[90vh] object-contain rounded-xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  )
}

export default page