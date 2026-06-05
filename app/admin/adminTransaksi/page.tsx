"use client";

import Navbar from '@/component/navbar'
import React from 'react'
import Image from 'next/image'
import CardTransaksi from '@/component/transaksi'
import { useState, useEffect } from 'react'
import BarTransaksi from '@/component/barTransaksi';
import { Transaksi } from "@/type/transaksiType";

const page = () => {

  const [transaksiList, setTransaksiList] = useState<Transaksi[]>([]);
  const [selectedData, setSelectedData] = useState(null);
  const [openDetail, setOpenDetail] = useState(false);
  const [catatan, setCatatan] = useState("");
  const [search, setSearch] = useState("");
  const [statusAction, setStatusAction] = useState({
  type: "",
  time: 0
  });

  const filteredData = transaksiList.filter((item: any) =>
    item.nama?.toLowerCase().includes(search.toLowerCase()) ||
    item.id?.toString().includes(search) ||
    item.nomor_hp?.toString().includes(search)
  );

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/transaksi/")
      .then((res) => res.json())
      .then((data) => {
        const normalized = data.map((item: any) => ({
          id: item.id,
          nama: item.nama,
          paket: item.package_name,
          tanggal: item.date,
          waktu: item.time,
          metode: item.payment_method,
          harga: "-",
          nomor_hp: item.nomor_hp,
          payment_status: item.payment_status,
          booking_status: item.booking_status,
        }));

        setTransaksiList(normalized);
      });
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

  const cards = [
    { title: "Total Hari Ini", value: "Rp. 700.000" },
    { title: "Menunggu Validasi", value: "3 Transaksi" },
    { title: "Berhasil", value: "21 Transaksi" },
  ];

  const handleValidasi = async () => {
  if (!selectedData) return;

  try {
    await fetch(
      `http://127.0.0.1:8000/api/booking/${selectedData.id}/`,
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
    setTransaksiList((prev: any[]) =>
      prev.filter((item) => item.id !== selectedData.id)
    );
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
      `http://127.0.0.1:8000/api/booking/${selectedData.id}/`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          payment_status: "rejected",
        }),
      }
    );
    setTransaksiList((prev: any[]) =>
      prev.filter((item) => item.id !== selectedData.id)
    );
    setOpenDetail(false);
    alert("Transaksi berhasil ditolak");
  } catch (err) {
    console.error(err);
  }
};

  return (
    <div className='w-full  flex flex-row bg-white'>
       <Navbar/>
       <div className='w-full bg-white flex flex-col ' >
       <div className='w-full h-15 flex flex-row  justify-between px-5 mt-5 '>
          <h1 className='font-extrabold text-2xl text-[#2A4AA1]'>
            Menu Transaksi
            </h1>
            <div className='flex h-13 flex-row gap-2 text-white'>
            <button className='flex items-center px-2 gap-2 w-40 h-10 bg-[#2A4AA1] rounded-lg ml-80'>
            <Image
              src="/assets/image/search.png"
              width={20}
              height={20}
              alt="search"
            />

            <input
              type="text"
              placeholder="Cari transaksi..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="placeholder:text-white/30 text-white outline-none bg-transparent text-[#2A4AA1] w-full"
            />
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
            <p className='font-bold text-[15px]'>Tambah Transaksi</p>
            </button>
           </div> 
        </div>
       
        {/* CONTAINER BIRU */}
      <div className='w-full  bg-[#D4E0FF] flex flex-col pl-5 '>
       
        {/* KATEGORI (tidak ikut scroll) */}
        <div className="w-full flex flex-wrap gap-2 py-3 px-3">
          {cards.map((item, index) => (
            <BarTransaksi
              key={index}
              title={item.title}
              value={item.value}
            />
          ))}
        </div>

        {/* Data Transaksi */}
        <div className='w-full flex h-102 flex-col gap-5   pb-10 overflow-y-auto   '>
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
                <div className="bg-gray-100 rounded-xl p-3 shadow">
                  {selectedData?.bukti && (
                    <Image
                      src={selectedData?.bukti}
                      width={250}
                      height={400}
                      alt="bukti"
                      className="rounded-lg"
                    />
                  )}
                </div>
                <p className="text-sm text-[#2A4AA1] mt-2">
                  Upload: {selectedData?.tanggalUpload
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
                      <p className="text-[#2A4AA1]">{selectedData?.nohp}</p>
                      <p className="text-[#2A4AA1]">{selectedData?.email}</p>
                    </div>

                    <div className="bg-[#2A4AA1] text-white px-4 py-2 mr-5 rounded-lg">
                      Menunggu Validasi
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
                    <p>{selectedData?.harga}</p>

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
                  <button 
                    onClick={handleValidasi}
                    className="flex items-center gap-2 px-6 py-3 bg-[#3DCBFF]/40 rounded-lg text-[#002381] font-bold"
                  >
                    ✔ Validasi
                  </button>

                  <button 
                  onClick={handleTolak}
                  className="flex items-center gap-2 px-6 py-3 bg-red-500 text-white rounded-lg font-bold">
                    ✖ Tolak
                  </button>
                </div>

              </div>
            </div>
          </div>
        )}
    </div>
  )
}

export default page