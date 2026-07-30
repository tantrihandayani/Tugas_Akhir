
"use client";

import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import LoginRequiredModal from "@/component/modal/loginRequiredModal";
import { getToken } from "@/lib/auth/auth";
import { FiArrowLeft } from "react-icons/fi";
import { Suspense, useEffect, useState } from "react";

type Layanan = {
  id: number;
  title: string;

  price_self: string;
  price_couple: string;
  price_group: string;
  price_family: string;
};

function BookingContent() {
  const searchParams = useSearchParams();
  const [layanan, setLayanan] = useState<Layanan[]>([]);
  const [showQris, setShowQris] = useState(false);
  const [buktiPembayaran, setBuktiPembayaran] = useState<File | null>(null);
  const [jamTerpakai, setJamTerpakai] = useState<string[]>([]);
  const router = useRouter();
  const [openLoginModal, setOpenLoginModal] = useState(false);

  

  const [form, setForm] = useState({
    name: "",
    nomor_hp: "",
    package_name: "",
    kategori: "",
    payment_method: "QRIS",
    date: "",
    time: "",
    deskripsi: "",
    status: "Waiting",
  });

  const layananDipilih =
    searchParams.get("layanan");

  const layananAktif = layanan.find(
    (item) => item.title === form.package_name
  );

  useEffect(() => {

    fetch("https://web-production-71d3b8.up.railway.app/api/layanan/")
      .then((res) => res.json())
      .then((data) => setLayanan(data));

  }, []);

  useEffect(() => {
    if (layananDipilih) {
      setForm((prev) => ({
        ...prev,
        package_name: layananDipilih,
      }));
    }
  }, [layananDipilih]);

  useEffect(() => {
  if (!form.date) return;

  fetch("https://web-production-71d3b8.up.railway.app/api/booking/")
    .then((res) => res.json())
    .then((data) => {
      const bookedTimes = data
        .filter(
          (item: any) => item.date === form.date
        )
        .map(
          (item: any) => item.time.slice(0, 5)
        );
      setJamTerpakai(bookedTimes);
    });

}, [form.date]);

  const handleSubmit = async () => {
    if (
      !form.name ||
      !form.nomor_hp ||
      !form.package_name ||
      !form.kategori ||
      !form.date ||
      !form.time
    ) {
      alert(
        "Silakan lengkapi seluruh data booking terlebih dahulu."
      );
      return;
    }
    if (!buktiPembayaran) {
      alert(
        "Silakan upload bukti pembayaran terlebih dahulu."
      );
      return;
    }
    try {

      const token = getToken();
        if (!token) {
          setOpenLoginModal(true);
          return;
        }

      const formData = new FormData();

      formData.append("nama", form.name);
      formData.append("kategori", form.kategori);
      formData.append("nomor_hp", form.nomor_hp);
      formData.append("package_name", form.package_name);

      formData.append(
        "payment_method",
        "qris"
      );

      formData.append("date", form.date);
      formData.append("time", form.time);
      formData.append("deskripsi", form.deskripsi);

      formData.append(
        "payment_status",
        "pending"
      );

      formData.append(
        "booking_status",
        "waiting"
      );

      if (buktiPembayaran) {
        formData.append(
          "bukti_pembayaran",
          buktiPembayaran
        );
      }

      console.log(getToken());
      const res = await fetch(
        "https://web-production-71d3b8.up.railway.app/api/booking/",
        {
          method: "POST",

          headers: {
            Authorization: `Bearer ${token}`,
          },

          body: formData,
        }
      );

      const data = await res.json();
      if (res.ok) {
        alert("Booking berhasil! Menunggu validasi admin.");
        router.push("/");
      } else {
        console.log(data);
        alert(JSON.stringify(data));
      }

    } catch (error) {
      console.error(error);
      alert("Server error");
    }
  };

  const jamList = [
    "10:00", "10:30", "11:00", "11:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30",
    "16:00", "16:30", "17:00", "17:30", "18:00", "18:30", "19:00", "19:30", "20:00", "20:30",
  ];

  const getTodayLocal = () => {
    const now = new Date();
    const offset = now.getTimezoneOffset();
    const local = new Date(
      now.getTime() - offset * 60000
    );

    return local.toISOString().split("T")[0];
  };

  const isPastTime = (jam: string) => {
  if (form.date !== getTodayLocal()) return false;
  const now = new Date();
  const [hour, minute] = jam.split(":").map(Number);
  const slotTime = new Date();

  slotTime.setHours(hour);
  slotTime.setMinutes(minute);
  slotTime.setSeconds(0);

  return slotTime <= now;
  
};

  useEffect(() => {
    const token = getToken();
    if (!token) {
      setOpenLoginModal(true);
    }
  }, []);

  return (
    <div className="min-h-screen border-t-[6px] border-black bg-[#FFB8E0] px-5 py-10 md:px-8 md:py-12">
      {/* BACK */}
<button
  onClick={() => router.back()}
  className="fixed left-5 top-5 z-50 flex h-12 w-24 items-center justify-center gap-2 rounded-full border-4 border-black bg-[#F7F48B] font-black text-black shadow-[5px_5px_0px_0px_#000] transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-none md:left-8 md:top-8 md:h-14 md:w-28"
>
  <FiArrowLeft size={18} className="md:text-[20px]" />
  <span className="text-sm md:text-base">
    BACK
  </span>
</button>
  {/* TITLE */}
<div className="mx-auto mb-10 flex max-w-3xl flex-col items-center text-center">

  {/* BADGE */}
  <div className="mb-4 rotate-[-2deg] rounded-full border-[3px] border-black bg-[#F7F48B] px-5 py-2 shadow-[4px_4px_0px_0px_#000]">
    <p className="text-xs font-black tracking-[0.2em] text-black md:text-sm">
      🎀 BOOKING STUDIO
    </p>
  </div>

  {/* TITLE */}
  <h1 className="text-3xl font-black leading-[0.95] text-black md:text-5xl">
    SIAPKAN
    <span className="mx-2 text-[#002381]">MOMEN</span>
    <br />
    TERBAIKMU 📸
  </h1>

  {/* DESC */}
  <p className="mt-4 max-w-xl text-sm font-medium leading-relaxed text-black/70 md:text-base">
    Pilih layanan, tentukan jadwal, lakukan pembayaran,
    dan kami akan menyiapkan pengalaman foto terbaik
    khusus untukmu.
  </p>

</div>

      {/* FORM */}
      <div className="mx-auto flex max-w-5xl flex-col gap-6 rounded-[26px] border-4 border-black bg-white p-5 shadow-[6px_6px_0px_0px_#000] md:p-6">

  {/* INFORMASI PEMESAN */}
  <div>

    <div className="mb-3 flex items-center gap-2">
      <span className="rounded-full border-2 border-black bg-[#F7F48B] px-3 py-1 text-xs font-black">
        👤 INFORMASI PEMESAN
      </span>
    </div>

    <div className="grid gap-3 md:grid-cols-2">

      <input
        type="text"
        placeholder="Nama Lengkap"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        className="w-full rounded-xl border-[3px] border-black p-3 font-semibold outline-none transition-all focus:bg-[#FFF9F0]"
      />

      <input
        type="text"
        placeholder="Nomor WhatsApp"
        value={form.nomor_hp}
        onChange={(e) => setForm({ ...form, nomor_hp: e.target.value })}
        className="w-full rounded-xl border-[3px] border-black p-3 font-semibold outline-none transition-all focus:bg-[#FFF9F0]"
      />

    </div>
  </div>

  {/* DETAIL BOOKING */}
  <div>

        {/* LAYANAN */}
      <div className="grid gap-3 md:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-black text-black">
            Paket Layanan
          </label>

          <select
            value={form.package_name}
            disabled={!!layananDipilih}
            onChange={(e) =>
              setForm({
                ...form,
                package_name: e.target.value,
              })
            }
            className="w-full rounded-xl border-[3px] border-black bg-white p-3 font-semibold outline-none transition-all focus:bg-[#FFF9F0]"
          >
            <option value="">
              Pilih Layanan
            </option>

            {layanan.map((item) => (
              <option key={item.id} value={item.title}>
                {item.title}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-black text-black">
            Kategori Foto
          </label>

          <select
            value={form.kategori}
            onChange={(e) =>
              setForm({
                ...form,
                kategori: e.target.value,
              })
            }
            className="w-full rounded-xl border-[3px] border-black bg-white p-3 font-semibold outline-none transition-all focus:bg-[#FFF9F0]"
          >
            <option value="">
              Pilih Kategori
            </option>

            <option value="self">
              Self (1 Orang)
            </option>

            <option value="couple">
              Couple (2 Orang)
            </option>

            <option value="group">
              Group (3-4 Orang)
            </option>

            <option value="family">
              Family (5-8 Orang)
            </option>

          </select>

        </div>
      </div>
        
        {layananAktif && form.kategori && (
        <div className="mt-2 mb-3 flex items-center justify-between rounded-2xl border-4 border-black bg-[#C7F0E9] p-4 shadow-[4px_4px_0px_0px_#000]">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-black/60">
              Total Pembayaran
            </p>

            <h3 className="mt-1 text-lg font-black text-black">
              💰 Harga Paket
            </h3>
          </div>

          <h2 className="text-2xl font-black text-[#002381]">
            Rp{" "}
            {Number(
              form.kategori === "self"
                ? layananAktif.price_self
                : form.kategori === "couple"
                ? layananAktif.price_couple
                : form.kategori === "group"
                ? layananAktif.price_group
                : layananAktif.price_family
            ).toLocaleString("id-ID")}
          </h2>
        </div>
      )}

{/* JADWAL */}
<div>

  <div className="mb-5 grid gap-3 md:grid-cols-2">
    <div className="flex flex-col gap-2">
      <label className="text-sm font-black text-black">
        Tanggal Booking
      </label>

      <input
        type="date"
        value={form.date}
        onChange={(e) =>
          setForm({ ...form, date: e.target.value })
        }
        className="w-full rounded-xl border-[3px] border-black p-3 font-semibold outline-none transition-all focus:bg-[#FFF9F0]"
      />
    </div>

    <div className="flex  flex-col gap-2">
      <label className="text-sm font-black text-black">
        Jam Booking
      </label>

      <select
        value={form.time}
        onChange={(e) =>
          setForm({
            ...form,
            time: e.target.value,
          })
        }
        className="w-full rounded-xl border-[3px] border-black bg-white p-3 font-semibold outline-none transition-all focus:bg-[#FFF9F0]"
      >
        <option value="">
          Pilih Jam
        </option>

        {jamList.map((jam) => (
          <option
            key={jam}
            value={jam}
            disabled={
              jamTerpakai.includes(jam) ||
              isPastTime(jam)
            }
          >
            {jamTerpakai.includes(jam)
              ? `${jam} - Sudah Dibooking`
              : isPastTime(jam)
              ? `${jam} - Sudah Lewat`
              : jam}
          </option>
        ))}

      </select>
    </div>
  </div>
</div>

        {/* CATATAN */}
<div>
  <div className="mb-3 flex items-center gap-2">
    <span className="rounded-full border-2 border-black bg-[#C6B6FF] px-3 py-1 text-xs font-black">
      📝 CATATAN TAMBAHAN
    </span>
  </div>

  <textarea
    placeholder="Contoh: Membawa bayi, request background tertentu, dll."
    value={form.deskripsi}
    onChange={(e) =>
      setForm({
        ...form,
        deskripsi: e.target.value,
      })
    }
    className="h-28 w-full resize-none rounded-xl border-[3px] border-black p-3 font-semibold outline-none transition-all focus:bg-[#FFF9F0]"
  />
</div>

{/* PEMBAYARAN */}
<div>

  <div className="mb-2 flex flex-col items-center">
    <span className="rounded-full border-2 border-black bg-[#F7F48B] px-3 py-1 text-xs font-black">
      💳 PEMBAYARAN
    </span>
  </div>

  <div className="grid gap-4 mb-5 md:grid-cols-2">

    {/* QRIS */}
    <div className="rounded-2xl border-4 border-black bg-[#F7F48B] p-5 shadow-[4px_4px_0px_0px_#000]">

      <h3 className="text-lg font-black">
        Scan QRIS ✨
      </h3>

      <p className="mt-2 text-sm font-medium text-black/70">
        Gunakan aplikasi e-wallet atau mobile banking
        untuk melakukan pembayaran.
      </p>

      <button
        type="button"
        onClick={() => setShowQris(true)}
        className="mt-5 rounded-xl border-[3px] border-black bg-[#002381] px-4 py-2 font-bold text-white transition-all hover:-translate-y-1"
      >
        Lihat QRIS
      </button>

    </div>

    {/* UPLOAD */}
    <div className="rounded-2xl border-4 border-black bg-white p-5 shadow-[4px_4px_0px_0px_#000]">

      <h3 className="text-lg font-black">
        Bukti Pembayaran
      </h3>

      <p className="mt-2 text-sm font-medium text-black/70">
        Upload screenshot atau foto bukti transfer.
      </p>

      <input
        type="file"
        accept="image/*"
        onChange={(e) =>
          setBuktiPembayaran(
            e.target.files?.[0] || null
          )
        }
        className="mt-5 block w-full rounded-lg border-2 border-dashed border-black p-3 text-sm"
      />

      {buktiPembayaran && (
        <div className="mt-4 rounded-lg border-2 border-green-600 bg-green-100 px-3 py-2 text-sm font-bold text-green-700">
          ✓ {buktiPembayaran.name}
        </div>
      )}

    </div>
  </div>
</div>

        {/* BUTTON */}
<button
  onClick={handleSubmit}
  className="w-full rounded-2xl border-4 border-black bg-[#002381] py-3 text-lg font-black text-white shadow-[6px_6px_0px_0px_#000] transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-none"
>
  BOOKING SEKARANG 🎀
</button>

</div>

{/* MODAL QRIS */}
{showQris && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-5 backdrop-blur-sm">

    <div className="w-full max-w-sm rounded-[28px] border-4 border-black bg-white p-6 shadow-[8px_8px_0px_0px_#000]">

      <div className="mb-5 text-center">

        <div className="mx-auto mb-3 w-fit rounded-full border-2 border-black bg-[#F7F48B] px-4 py-1">
          <p className="text-xs font-black tracking-widest">
            QRIS PAYMENT
          </p>
        </div>

        <h2 className="text-2xl font-black text-black">
          Scan QRIS ✨
        </h2>

        <p className="mt-2 text-sm text-black/70">
          Scan menggunakan e-wallet atau mobile banking
          favoritmu.
        </p>

      </div>

      <img
        src="/assets/image/qris.png"
        alt="QRIS"
        className="mx-auto w-60 rounded-2xl border-4 border-black bg-white p-2"
      />

      <button
        onClick={() => setShowQris(false)}
        className="mt-6 w-full rounded-xl border-[3px] border-black bg-[#002381] py-3 font-black text-white transition-all hover:-translate-y-1"
      >
        Tutup
      </button>

    </div>

  </div>
)}

<LoginRequiredModal
  isOpen={openLoginModal}
  onClose={() => setOpenLoginModal(false)}
/>

  </div>
  </div>

  );
  // pindahkan SEMUA isi BookingPage ke sini
  // mulai dari useState, useEffect, handleSubmit,
  // sampai return JSX
}

export default function BookingPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BookingContent />
    </Suspense>
  );
}

// export default function BookingPage() {

  
// }