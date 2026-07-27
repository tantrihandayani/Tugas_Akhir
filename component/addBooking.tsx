"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

type AddBookingProps = {
open: boolean;
onClose: () => void;
onSuccess: () => void;
};

const AddBooking: React.FC<AddBookingProps> = ({
open,
onClose,
onSuccess,
}) => {
const [nama, setNama] = useState("");
const [nomorHp, setNomorHp] = useState("");
const [deskripsi, setDeskripsi] = useState("");
const [hari, setHari] = useState("");
const [jam, setJam] = useState("");
const [paket, setPaket] = useState("");
const [selectedLayanan, setSelectedLayanan] = useState<any>(null);
const [metodeBayar, setMetodeBayar] = useState("");
const [layananList, setLayananList] = useState([]);
const [harga, setHarga] = useState(0);
const [kategori, setKategori] = useState("");

const resetForm = () => {
setNama("");
setNomorHp("");
setDeskripsi("");
setHari("");
setJam("");
setPaket("");
setKategori("");
setMetodeBayar("");
};

const handleClose = () => {
resetForm();
onClose();
};

const getNextDays = () => {
const days = [];
const namaHari = [
"Minggu",
"Senin",
"Selasa",
"Rabu",
"Kamis",
"Jumat",
"Sabtu",
];


for (let i = 0; i < 7; i++) {
  const date = new Date();
  date.setDate(date.getDate() + i);

  days.push({
    label: `${namaHari[date.getDay()]} (${date.getDate()}/${date.getMonth() + 1})`,
    value: date.toISOString().split("T")[0],
  });
}

return days;


};

const hariList = React.useMemo(() => getNextDays(), []);

const jamList = [
"10:00",
"10:30",
"11:00",
"11:30",
"13:00",
"13:30",
"14:00",
"14:30",
"15:00",
"15:30",
"16:00",
"16:30",
"17:00",
"17:30",
"18:00",
"18:30",
"19:00",
"19:30",
"20:00",
"20:30",
];

const getLayanan = async () => {
    try {
        const res = await fetch(
            "http://127.0.0.1:8000/api/layanan/"
        );

        const data = await res.json();

        setLayananList(data);

    } catch (err) {
        console.error(err);
    }
};

useEffect(() => {
    getLayanan();
}, []);

useEffect(() => {
    if (!selectedLayanan || !kategori) {
        setHarga(0);
        return;
    }
    switch (kategori) {
        case "self":
            setHarga(Number(selectedLayanan.price_self));
            break;
        case "couple":
            setHarga(Number(selectedLayanan.price_couple));
            break;
        case "group":
            setHarga(Number(selectedLayanan.price_group));
            break;
        case "family":
            setHarga(Number(selectedLayanan.price_family));
            break;
        default:
            setHarga(0);
    }
}, [selectedLayanan, kategori]);

const metodePembayaranList = [
  {
        label: "QRIS",
        value: "qris",
    },
    {
        label: "Tunai",
        value: "tunai",
  },
  ];

const getAvailableJam = () => {
if (!hari) return jamList;

const today = new Date().toISOString().split("T")[0];

if (hari !== today) return jamList;

const now = new Date();
const currentHour = now.getHours();
const currentMinute = now.getMinutes();

return jamList.filter((jamItem) => {
  const [hour, minute] = jamItem.split(":").map(Number);

  return (
    hour > currentHour ||
    (hour === currentHour && minute > currentMinute)
  );
});


};

useEffect(() => {
const available = getAvailableJam();

if (!available.includes(jam)) {
  setJam("");
}




}, [hari]);

const handleSimpan = async () => {
if (
    !nama ||
    !nomorHp ||
    !hari ||
    !jam ||
    !paket ||
    !kategori ||
    !metodeBayar
) {
    alert("Lengkapi semua data dulu!");
    return;
}
if (!/^08\d{8,11}$/.test(nomorHp)) {
  alert("Nomor HP harus diawali 08 dan terdiri dari 10-13 digit.");
  return;
}

const newBooking = {
  nama,
  nomor_hp: nomorHp,
  package_name: paket,
  kategori,
  payment_method: metodeBayar,
  deskripsi,
  date: hari,
  time: jam,
};

console.log("DATA DIKIRIM:", newBooking);
try {
  const res = await fetch(
    "http://127.0.0.1:8000/api/booking/",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newBooking),
    }
  );

  const text = await res.text();

  console.log("STATUS:", res.status);
  console.log("RESPONSE:", text);

  if (!res.ok) {
    alert(text);
    return;
  }

  resetForm();
  onClose();
  onSuccess();

} catch (err) {
  console.error(err);
}

};

if (!open) return null;



return ( 
  <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[2px] z-50"> <div className="flex flex-col bg-white w-[95%] md:w-[700px] max-h-[90vh] overflow-y-auto rounded-xl shadow-xl">
    <div className="flex flex-row justify-between items-center px-6 py-4">
      <h1 className="text-xl font-extrabold text-[#2A4AA1]">
        Tambah Booking
      </h1>

      <button onClick={handleClose}>
        <Image
          src="/assets/image/close.png"
          width={24}
          height={24}
          alt="Close"
          className="rounded-full bg-[#2A4AA1]"
        />
      </button>
    </div>

    <div className="flex flex-col gap-3 px-4 md:px-6">

      <input
        type="text"
        value={nama}
        onChange={(e) => setNama(e.target.value)}
        placeholder="Nama Pelanggan"
        className="w-full h-10 bg-[#B0C5FF] border border-[#2A4AA1] rounded-[20px] pl-5 placeholder-[#2A4AA1]"
      />

      <input
        type="tel"
        value={nomorHp}
        maxLength={13}
        onChange={(e) => {
          const value = e.target.value.replace(/\D/g, "");
          setNomorHp(value);
        }}
        placeholder="Nomor Hp"
        className="w-full h-10 bg-[#B0C5FF] border border-[#2A4AA1] rounded-[20px] pl-5 placeholder-[#2A4AA1]"
      />

      <div className="flex flex-col md:flex-row gap-4">
        <select
          value={paket}
          onChange={(e) => {
            const value = e.target.value;

            setPaket(value);

            const layanan = layananList.find(
              (item: any) => item.title === value
            );

            setSelectedLayanan(layanan);
          }}
          className="h-10 w-full bg-[#B0C5FF] border border-[#2A4AA1] rounded-[20px] px-4 text-[#2A4AA1]"
        >
          <option value="" disabled>
            Pilih Layanan
          </option>

          {layananList.map((item: any) => (
            <option
              key={item.id}
              value={item.title}
            >
              {item.title} - {item.duration}
            </option>
          ))}
        </select>

        <select
            value={kategori}
            onChange={(e)=>setKategori(e.target.value)}
            className="h-10 w-full bg-[#B0C5FF] border border-[#2A4AA1] rounded-[20px] px-4 text-[#2A4AA1]"
        >

            <option value="">
                Pilih Kategori
            </option>

            <option value="self">
                Self
            </option>

            <option value="couple">
                Couple
            </option>

            <option value="group">
                Group
            </option>

            <option value="family">
                Family
            </option>

        </select>

        <select
          value={metodeBayar}
          onChange={(e) => setMetodeBayar(e.target.value)}
          className="h-10 w-full bg-[#B0C5FF] border border-[#2A4AA1] rounded-[20px] px-4 text-[#2A4AA1]"
        >
          <option value="" disabled>
            Pilih Pembayaran
          </option>
        {metodePembayaranList.map((item) => (
            <option
                key={item.value}
                value={item.value}
            >
                {item.label}
            </option>
        ))}
        </select>
      </div>

      <div className="flex items-center justify-between rounded-[20px] border border-[#2A4AA1] bg-[#EAF0FF] px-5 py-3">
        <span className="font-semibold text-[#2A4AA1]">
          Total Pembayaran
        </span>

        <span className="text-xl font-black text-[#2A4AA1]">
          Rp {harga.toLocaleString("id-ID")}
        </span>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <select
          value={hari}
          onChange={(e) => setHari(e.target.value)}
          className="w-full h-10 bg-[#B0C5FF] border border-[#2A4AA1] rounded-[20px] px-4 text-[#2A4AA1]"
        >
          <option value="" disabled>
            Pilih Hari
          </option>

          {hariList.map((item, i) => (
            <option key={i} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>

        <select
          value={jam}
          onChange={(e) => setJam(e.target.value)}
          className="w-full h-10 bg-[#B0C5FF] border border-[#2A4AA1] rounded-[20px] px-4 text-[#2A4AA1]"
        >
          <option value="">Pilih Jam</option>

          {jamList.map((item, index) => {
            const isDisabled =
              !getAvailableJam().includes(item);

            return (
              <option
                key={index}
                value={item}
                disabled={isDisabled}
              >
                {item} {isDisabled ? "(Lewat)" : ""}
              </option>
            );
          })}
        </select>
      </div>

      <textarea
  value={deskripsi}
  onChange={(e) => setDeskripsi(e.target.value)}
  placeholder="Catatan (Opsional)"
  rows={2}
  className="w-full rounded-[16px] border border-[#2A4AA1] bg-[#B0C5FF] px-4 py-3 text-sm placeholder-[#2A4AA1] resize-none"
/>
    </div>

    <div className="w-full flex justify-between gap-3 mt-5 px-4 md:px-6 pb-4">
      <button
        onClick={handleClose}
        className="w-30 h-8 rounded-[20px] border border-[#2A4AA1] text-[#2A4AA1]"
      >
        Batal
      </button>

      <button
        onClick={handleSimpan}
        disabled={
          !nama ||
          !nomorHp ||
          !hari ||
          !jam ||
          !paket ||
          !kategori ||
          !metodeBayar
        }
        className={`w-30 h-8 rounded-[20px] text-white font-semibold
        ${
          !hari || !jam || !paket || !metodeBayar
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-[#2A4AA1] hover:bg-[#1f3a87]"
        }`}
      >
        Simpan
      </button>
    </div>

  </div>
</div>


);
};

export default AddBooking;
