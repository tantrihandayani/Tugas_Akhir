"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { getToken } from "@/lib/auth/auth";
import ProfileHeader from "@/component/profileCustomer/ProfileHeader";
import ActiveBooking from "@/component/profileCustomer/ActiveBooking";
import {
    FiCalendar,
    FiClock,
    FiImage,
    FiArrowRight,
    FiCheckCircle,
    FiLoader,
    FiArchive,
    FiCamera,
    FiHeart,
    FiStar,
    FiZap,
    FiDollarSign,
    FiTrendingUp
} from "react-icons/fi";

interface BookingHistory {
    id: number;
    customer_id: number;
    nama: string;
    nomor_hp: string;
    package_name: string;
    kategori: string;
    date: string;
    time: string;
    payment_method: string;
    payment_status: string;
    booking_status: string;
    harga: number;
    deskripsi: string;
    drive_link?: string | null;
    bukti_pembayaran: string | null;
    created_at: string;
}

export default function ProfilePage() {

  const [isEdit, setIsEdit] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [nomorHp, setNomorHp] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editNomorHp, setEditNomorHp] = useState("");
  const [isPassword, setIsPassword] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [history, setHistory] = useState<BookingHistory[]>([]);
  const [statistic, setStatistic] = useState({
    total_booking: 0,
    total_pengeluaran: 0,
    booking_selesai: 0,
    booking_waiting: 0,
    booking_progress: 0,
    favorite_service: "-",
    favorite_count: 0,
  });

  const getStatistic = async () => {
    try {
      const token = getToken();
      const res = await fetch(
        "https://web-production-71d3b8.up.railway.app/api/profile/statistic/",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();
      setStatistic(data);
    } catch (error) {
      console.error(error);
    }
  };

const handleUpdateProfile = async () => {
  try {
    if (!/^08\d{8,11}$/.test(editNomorHp)) {
      alert("Nomor HP harus diawali 08 dan terdiri dari 10-13 digit.");
      return;
    }
    const token = getToken();

    const res = await fetch("https://web-production-71d3b8.up.railway.app/api/profile/", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        email: editEmail,
        nomor_hp: editNomorHp,
      }),
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || "Gagal mengupdate profile");
    }
    // Update state utama setelah backend berhasil
    setEmail(editEmail);
    setNomorHp(editNomorHp);

    alert(data.message);

    setIsEdit(false);
  } catch (error) {
    console.error(error);
    alert("Terjadi kesalahan saat mengupdate profile.");
  }
};

const handleChangePassword = async () => {
  if (!oldPassword || !newPassword || !confirmPassword) {
    alert("Semua field harus diisi.");
    return;
  }

  if (newPassword.length < 8) {
    alert("Password minimal 8 karakter.");
    return;
  }

  if (newPassword !== confirmPassword) {
    alert("Konfirmasi password tidak sama.");
    return;
  }

  try {
    const token = getToken();

    const res = await fetch(
      "https://web-production-71d3b8.up.railway.app/api/profile/password/",
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          old_password: oldPassword,
          new_password: newPassword,
        }),
      }
    );

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || "Gagal mengubah password.");
      return;
    }

    alert(data.message);

    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");

    setIsPassword(false);

  } catch (error) {
    console.error(error);
    alert("Terjadi kesalahan.");
  }
};

const handleOpenEdit = () => {
    setEditEmail(email);
    setEditNomorHp(nomorHp);
    setIsEdit(true);
};

  useEffect(() => {
  }, [history]);

  useEffect(() => {
    const token = getToken();
    if (!token) return;
    getProfile();
    getHistory();
    getStatistic();
  }, []);

  const getProfile = async () => {
    try {
      const token = getToken();
      const res = await fetch(
        "https://web-production-71d3b8.up.railway.app/api/profile/",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.json();
      setUsername(data.username || "");
      setEmail(data.email || "");
      setNomorHp(data.nomor_hp || "");
    } catch (error) {
    }
  };

const getHistory = async () => {
  try {
    const token = getToken();
    const res = await fetch(
      "https://web-production-71d3b8.up.railway.app/api/profile/history/",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await res.json();
    const historyData = Array.isArray(data) ? data : [];
    setHistory(historyData);
  } catch (error) {
    console.error("ERROR:", error);
  }
};

  return (
    <div className="min-h-screen bg-[#FFF9F0] px-6 md:px-10 py-10">
      {/* PROFILE HEADER */}
      <ProfileHeader
          username={username}
          email={email}
          nomorHp={nomorHp}
          onEdit={handleOpenEdit}
      />
      
      <ActiveBooking
        booking={
        history.length > 0
          ? history[0]
          : null
          }
      />

      {/* STATISTIK */}
      <section className="mt-8">
          <div className="mb-4">
              <h2 className="text-lg font-black text-slate-900">
                  Statistik Kamu
              </h2>
              <p className="text-xs text-slate-500">
                  Ringkasan aktivitas booking Studio IBUU
              </p>
          </div>
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
              {[
                  {
                      title: "Booking",
                      value: statistic.total_booking,
                      icon: <FiCamera size={15} />,
                      color: "bg-blue-500",
                  },
                  {
                      title: "Pengeluaran",
                      value: `Rp ${Number(statistic.total_pengeluaran).toLocaleString("id-ID")}`,
                      icon: <FiDollarSign size={15} />,
                      color: "bg-amber-400",
                  },
                  {
                      title: "Finished",
                      value: statistic.booking_selesai,
                      icon: <FiCheckCircle size={15} />,
                      color: "bg-green-500",
                  },
                  {
                      title: "Waiting",
                      value: statistic.booking_waiting,
                      icon: <FiClock size={15} />,
                      color: "bg-orange-500",
                  },
              ].map((item) => (
                  <div
                      key={item.title}
                      className="group relative overflow-hidden rounded-xl border border-slate-200 bg-white p-3 transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-xl"
                  >
                      {/* Accent */}
                      <div
                          className={`${item.color} absolute left-0 top-0 h-full w-1 transition-all duration-300 group-hover:w-2`}
                      />
                      {/* Circle */}
                      <div className="absolute -right-5 -top-5 h-12 w-12 rounded-full bg-slate-100 transition-all duration-300 group-hover:scale-125" />
                      <div className="relative ml-2">
                          {/* Top */}
                          <div className="flex items-center justify-between">
                              <div
                                  className={`flex h-8 w-8 items-center justify-center rounded-lg text-white ${item.color} transition-all duration-300 group-hover:rotate-12`}
                              >
                                  {item.icon}
                              </div>
                          </div>
                          {/* Value */}
                          <h2 className="mt-3 truncate text-lg font-black leading-none text-slate-900">
                              {item.value}
                          </h2>
                          {/* Title */}
                          <p className="mt-1 text-[11px] font-medium text-slate-500">
                              {item.title}
                          </p>
                      </div>
                  </div>
              ))}
          </div>
        </section>

      {/* FAVORITE SERVICE */}
<section className="mt-8">
  <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 transition-all duration-300 hover:shadow-xl">
    {/* Background Decoration */}
      <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-pink-100 opacity-60" />
        <div className="relative flex items-center justify-between gap-4">
          {/* Left */}
            <div>
              <div className="mb-2 flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-pink-100 text-pink-600">
                    <FiHeart size={15} />
                </div>
                  <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Favorite Service
                  </span>
              </div>
                <h2 className="text-xl font-black text-slate-900">
                    {statistic.favorite_service}
                </h2>
                <div className="mt-2 flex items-center gap-2 text-sm font-medium text-slate-500">
                    <FiTrendingUp size={14} />
                    {statistic.favorite_count}x Booking
                </div>
            </div>
            {/* Right */}
            <div className="hidden md:flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-100 to-purple-100 text-pink-600">
                <FiCamera size={24} />
            </div>
          </div>
    </div>
</section>

      {/* RIWAYAT */}
<section className="mt-10">

    {/* HEADER */}
    <div className="mb-5 flex items-center justify-between">

        <div className="flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center border-[3px] border-black bg-[#FFD93D] shadow-[4px_4px_0_#000]">
                <FiArchive size={18} />
            </div>

            <div>

                <h2 className="text-xl font-black uppercase">
                    Riwayat Booking
                </h2>

                <p className="text-[11px] font-medium text-slate-600">
                    Semua booking yang pernah dilakukan
                </p>
            </div>
        </div>
        <div className="border-[3px] border-black bg-[#5B8CFF] px-3 py-1 shadow-[4px_4px_0_#000]">
            <p className="text-[9px] font-black uppercase text-white">
                Total
            </p>
            <p className="text-base font-black text-white">
                {history.length}
            </p>
        </div>
    </div>

    {/* GRID */}
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-3 ">
        {history.map((item) => {
            const config =
                item.booking_status === "finished"
                    ? {
                          card: "bg-[#7DFF8A]/50",
                          badge: "bg-[#22C55E]",
                          accent: "bg-green-700",
                          icon: <FiCheckCircle size={11} />,
                          text: "FINISHED",
                      }
                    : item.booking_status === "progress"
                    ? {
                          card: "bg-[#7CC8FF]/70",
                          badge: "bg-[#2563EB]",
                          accent: "bg-blue-700",
                          icon: <FiLoader size={11} className="animate-spin" />,
                          text: "PROGRESS",
                      }
                    : {
                          card: "bg-[#FFD93D]/50",
                          badge: "bg-[#F59E0B]",
                          accent: "bg-yellow-700",
                          icon: <FiClock size={11} />,
                          text: "WAITING",
                      };

            return (

                <div
                    key={item.id}
                    className={`${config.card} group rounded-xl relative overflow-hidden border-[3px] border-black p-3 shadow-[6px_6px_0_#000] transition-all duration-200 hover:-translate-x-1 hover:-translate-y-1 hover:rotate-[0.5deg] hover:shadow-[10px_10px_0_#000]`}
                >
                    {/* Accent */}
                    <div className={`${config.accent} absolute left-0 top-0 h-full w-2`} />
                    {/* TOP */}
                    <div className="ml-3 flex items-start justify-between gap-2">
                        <div className="min-w-0">
                            <h3 className="truncate text-[13px] font-black uppercase">
                                {item.package_name}
                            </h3>
                            <p className="truncate text-[10px] font-semibold text-slate-800">
                                {item.kategori}
                            </p>
                        </div>
                        <div
                            className={`${config.badge} flex shrink-0 items-center gap-1 border-[2px] border-black px-1.5 py-1 text-[8px] font-black uppercase text-white transition-transform duration-200 group-hover:scale-105`}
                        >
                            {config.icon}
                            {config.text}
                        </div>
                    </div>
                    {/* Divider */}
                    <div className="my-2 ml-3 h-[2px] bg-black/20" />
                    {/* Bottom */}
                    <div className="ml-3 space-y-1">
                        <div className="flex items-center gap-2 text-[10px] font-bold">
                            <FiCalendar
                                size={12}
                                className="transition-transform duration-300 group-hover:rotate-12"
                            />
                            <span>{item.date}</span>
                        </div>
                        <div className="flex items-center gap-2 text-[10px] font-bold">
                            <FiClock
                                size={12}
                                className="transition-transform duration-300 group-hover:rotate-12"
                            />
                            <span>{item.time ?? "-"}</span>
                        </div>
                    </div>
                    {/* Corner Decoration */}
                    <div className="absolute -right-5 -top-5 h-10 w-10 rounded-full border-[3px] border-black bg-white/40 transition-all duration-300 group-hover:scale-125" />
                </div>
            );
        })}
    </div>
</section>

{/* CTA */}
<section className="mt-10">
    <div className="group relative overflow-hidden rounded-2xl border-[3px] border-black bg-gradient-to-r from-[#6D28D9] via-[#8B5CF6] to-[#A855F7] p-5 shadow-[7px_7px_0_#000] transition-all duration-300 hover:-translate-y-1 hover:shadow-[11px_11px_0_#000]">
        {/* Background Decoration */}
        <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full border-[3px] border-white/20 transition-all duration-500 group-hover:rotate-12" />
        <div className="absolute left-1/3 top-4 h-4 w-4 rounded-full bg-white/15 transition-all duration-500 group-hover:scale-150" />
        <div className="absolute bottom-5 right-24 h-6 w-6 rounded-full bg-white/10 transition-all duration-500 group-hover:scale-125" />

        {/* Camera Sticker */}
        <div className="absolute -right-4 -top-4 flex h-16 w-16 items-center justify-center rounded-full border-[3px] border-black bg-[#FFD93D] shadow-[4px_4px_0_#000] transition-all duration-300 group-hover:rotate-12 group-hover:scale-110">

            <FiCamera
                size={28}
                className="transition-transform duration-300 group-hover:rotate-12"
            />

        </div>

        <div className="relative flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

            {/* LEFT */}
            <div className="max-w-xl">
                {/* Badge */}
                <div className="mb-3 flex flex-wrap items-center gap-2">
                    <span className="flex items-center gap-1 rounded-lg border-[2px] border-black bg-[#22C55E] px-2 py-1 text-[10px] font-black uppercase shadow-[2px_2px_0_#000]">
                        <FiZap  size={11} />
                        Trending
                    </span>
                    <span className="flex items-center gap-1 rounded-lg border-[2px] border-black bg-[#FFE066] px-2 py-1 text-[10px] font-black shadow-[2px_2px_0_#000]">
                        <FiStar size={11} />
                        4.9 Rating
                    </span>
                </div>
                {/* Title */}
                <h2 className="text-2xl font-black uppercase leading-none text-white md:text-3xl">
                    Ready For
                    <br />
                    Another Memory?
                </h2>
                {/* Subtitle */}
                <p className="mt-3 max-w-md text-sm leading-relaxed text-purple-100">
                    Every picture tells a story.
                    Let's create your next unforgettable moment together with Studio IBUU.
                </p>
                {/* Stats */}
                <div className="mt-5 flex flex-wrap gap-3">
                    <div className="flex items-center gap-2 rounded-lg border-[2px] border-black bg-white px-3 py-1 text-xs font-black shadow-[2px_2px_0_#000]">
                        <FiHeart size={13} />
                        1.2K+ Happy Clients
                    </div>
                    <div className="flex items-center gap-2 rounded-lg border-[2px] border-black bg-[#BFDBFE] px-3 py-1 text-xs font-black shadow-[2px_2px_0_#000]">
                        <FiCamera size={13} />
                        Premium Studio
                    </div>
                </div>
            </div>
            {/* RIGHT */}
            <div className="flex flex-col items-start gap-3 lg:items-end">
                <Link href="/booking">
                    <button className="group/button flex items-center gap-2 rounded-xl border-[3px] border-black bg-[#FFD93D] px-6 py-3 font-black uppercase shadow-[5px_5px_0_#000] transition-all duration-200 hover:translate-x-1 hover:translate-y-1 hover:shadow-none">
                        LET'S SHOOT
                        <FiArrowRight className="transition-transform duration-300 group-hover/button:translate-x-1" />
                    </button>
                </Link>
                <p className="text-[11px] font-semibold text-purple-100">
                    Booking hanya kurang dari 1 menit 🚀
                </p>
            </div>
        </div>
    </div>
</section>

  {
  isEdit && (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">

      <div className="w-full max-w-sm overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">

        {/* Header */}
        <div className="border-b border-slate-100 px-4 py-3">

          <h2 className="text-lg font-bold text-slate-900">
            Edit Profile
          </h2>

          <p className="mt-0.5 text-xs text-slate-500">
            Kelola informasi akun kamu
          </p>

        </div>

        {/* Body */}
        <div className="space-y-3 p-4">

          {/* Username */}
          <div>

            <label className="mb-1 block text-xs font-semibold text-slate-600">
              Username
            </label>

            <input
              value={username}
              disabled
              className="w-full cursor-not-allowed rounded-lg border border-slate-300 bg-slate-100 px-3 py-2 text-sm text-slate-500"
            />

          </div>

          {/* Email */}
          <div>

            <label className="mb-1 block text-xs font-semibold text-slate-600">
              Email
            </label>

            <input
              value={editEmail}
              onChange={(e)=>setEditEmail(e.target.value)}
              placeholder="Email"
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none transition-all focus:border-[#2A4AA1] focus:ring-2 focus:ring-blue-100"
            />

          </div>

          {/* Nomor HP */}
          <div>

            <label className="mb-1 block text-xs font-semibold text-slate-600">
              Nomor HP
            </label>

            <input
              type="tel"
              value={editNomorHp}
              maxLength={13}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, "");
                setEditNomorHp(value);
              }}
              placeholder="08xxxxxxxxxx"
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none transition-all focus:border-[#2A4AA1] focus:ring-2 focus:ring-blue-100"
            />

          </div>

          {/* Account Actions */}
          <div className="border-t border-slate-100 pt-3">

            <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Pengaturan Akun
            </p>

            <div className="space-y-1.5">

              <button
               onClick={()=>{
                  setIsEdit(false);
                  setIsPassword(true);
              }}
               className="flex w-full items-center justify-between rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium transition-all hover:bg-blue-100"
              >
                <span>🔒 Ganti Password</span>
                <span>→</span>
              </button>

              <button
                className="flex w-full items-center justify-between rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs font-medium text-red-600 transition-all hover:bg-red-100"
              >
                <span>🗑️ Hapus Akun</span>
                <span>→</span>
              </button>

            </div>

          </div>

        </div>

        {/* Footer */}
        <div className="flex justify-end gap-2 border-t border-slate-100 px-4 py-3">

          <button
            onClick={() => setIsEdit(false)}
            className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium transition-all hover:bg-slate-50"
          >
            Batal
          </button>

          <button
            onClick={handleUpdateProfile}
            className="rounded-lg bg-[#2A4AA1] px-4 py-2 text-sm font-medium text-white transition-all hover:bg-[#17357A]"
          >
            Simpan
          </button>

        </div>

      </div>

    </div>
  )
  
}

{isPassword && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">

    <div className="w-full max-w-sm overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">

      {/* Header */}
      <div className="border-b border-slate-100 px-4 py-3">

        <h2 className="text-lg font-bold text-slate-900">
          Ganti Password
        </h2>

        <p className="mt-0.5 text-xs text-slate-500">
          Pastikan password baru mudah diingat dan aman.
        </p>

      </div>

      {/* Body */}
      <div className="space-y-3 p-4">

        <div>

          <label className="mb-1 block text-xs font-semibold text-slate-600">
            Password Lama
          </label>

          <input
            type="password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none transition-all focus:border-[#2A4AA1] focus:ring-2 focus:ring-blue-100"
          />

        </div>

        <div>

          <label className="mb-1 block text-xs font-semibold text-slate-600">
            Password Baru
          </label>

          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none transition-all focus:border-[#2A4AA1] focus:ring-2 focus:ring-blue-100"
          />

        </div>

        <div>

          <label className="mb-1 block text-xs font-semibold text-slate-600">
            Konfirmasi Password
          </label>

          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none transition-all focus:border-[#2A4AA1] focus:ring-2 focus:ring-blue-100"
          />

        </div>

      </div>

      {/* Footer */}
      <div className="flex justify-end gap-2 border-t border-slate-100 px-4 py-3">

        <button
          onClick={() => {
            setIsPassword(false);
            setIsEdit(true);
          }}
          className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium transition-all hover:bg-slate-50"
        >
          Kembali
        </button>

        <button
          onClick={handleChangePassword}
          className="rounded-lg bg-[#2A4AA1] px-4 py-2 text-sm font-medium text-white transition-all hover:bg-[#17357A]"
        >
          Simpan
        </button>

      </div>

    </div>

  </div>
)}
    </div>
  );
}