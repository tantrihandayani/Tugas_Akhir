"use client";

import Link from "next/link";
import LayananCard from "@/component/public/layananCard";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { getToken } from "@/lib/auth/auth";
import LoginRequiredModal from "@/component/modal/loginRequiredModal";
import Image from "next/image";
import { 
  FiArrowLeft,
  FiAward,
  FiHeart,
  FiCamera,
  FiUsers,
  FiArrowUpRight,
  FiImage,
  FiZap,
  FiStar,
  FiSmile,
  FiPlus, FiMinus, FiHelpCircle
 } from "react-icons/fi";



export default function LayananPage() {
  const router = useRouter();
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [openLoginModal, setOpenLoginModal] = useState(false);

  const handleBooking = () => {
    if (!getToken()) {
        setOpenLoginModal(true);
        return;
    }

    router.push("/booking");
    };

  return (
    <div className="bg-[#FFF9F0]">
       {/* Header */}
       <div className="relative">

  <button
  onClick={() => router.back()}
  className="fixed left-6 top-10 z-50 flex h-14 w-25 font-bold items-center justify-center rounded-full border-4 border-black bg-[#F7F48B] shadow-[6px_6px_0px_0px_#000] transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-none"
>
  <FiArrowLeft size={24} />
  <p>BACK</p>
</button>
  <LayananCard />

</div>


      {/* TERLARIS */}
      <section className="bg-gradient-to-b from-[#F6FBFF] to-white px-5 py-14 md:px-10">
          {/* Header */}
          <div className="mb-8 flex items-end justify-between">
              <div>
                  <div className="mb-2 flex items-center gap-2">
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#2A4AA1] text-white">
                          <FiAward size={18} />
                      </div>
                      <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#2A4AA1]">
                          Most Popular
                      </span>
                  </div>
                  <h2 className="text-2xl font-black text-slate-900 md:text-4xl">
                      Layanan Terlaris
                  </h2>
                  <p className="mt-2 text-sm text-slate-500">
                      Pilihan favorit pelanggan Studio IBUU.
                  </p>
              </div>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {[
                  {
                      rank: "#1",
                      title: "Couple Photo",
                      desc: "Favorit pasangan untuk mengabadikan momen spesial.",
                      icon: <FiHeart size={18} />,
                      color: "bg-pink-100 text-pink-600",
                  },
                  {
                      rank: "#2",
                      title: "Self Photo",
                      desc: "Bebas berekspresi dengan konsep yang kreatif.",
                      icon: <FiCamera size={18} />,
                      color: "bg-blue-100 text-[#2A4AA1]",
                  },
                  {
                      rank: "#3",
                      title: "Group Photo",
                      desc: "Cocok untuk teman, keluarga dan komunitas.",
                      icon: <FiUsers size={18} />,
                      color: "bg-orange-100 text-orange-600",
                  },
              ].map((item) => (
                  <div
                      key={item.rank}
                      className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#2A4AA1] hover:shadow-xl"
                  >
                      {/* Rank */}
                      <span className="absolute right-4 top-4 text-xs font-black text-slate-300">
                          {item.rank}
                      </span>
                      {/* Icon */}
                      <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${item.color} transition-all duration-300 group-hover:scale-110 group-hover:rotate-6`}>
                          {item.icon}
                      </div>
                      {/* Title */}
                      <h3 className="mt-4 text-lg font-black text-slate-900">
                          {item.title}
                      </h3>
                      {/* Desc */}
                      <p className="mt-2 text-sm leading-relaxed text-slate-500">
                          {item.desc}
                      </p>
                      {/* Footer */}
                      <div className="mt-5 flex items-center justify-between">
                          <div className="flex gap-1 text-yellow-400">
                              ★★★★★
                          </div>
                          <FiArrowUpRight className="text-slate-400 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[#2A4AA1]" />
                      </div>
                  </div>
              ))}
          </div>
      </section>

      {/* KENAPA PILIH */}
      <section className="bg-[#FFF8EF] px-5 py-15 md:px-10">
          {/* Header */}
          <div className="mb-12 text-center">
              <span className="inline-block -rotate-2 rounded-lg border-[3px] border-black bg-[#FFB8E0] px-4 py-1 text-xs font-black uppercase shadow-[4px_4px_0_#000]">
                  Why Choose Us
              </span>
              <h2 className="mt-5 text-3xl font-black leading-none text-black md:text-5xl">
                  Kenapa Pilih
                  <br />
                  Studio IBUU?
              </h2>
              <p className="mt-2 text-sm font-semibold text-slate-600">
                  Tempat terbaik untuk mengabadikan setiap cerita.
              </p>

          </div>

          {/* Grid */}
          <div className="mx-auto grid max-w-4xl  grid-cols-2 justify-items-center gap-x-3 gap-y-8 lg:grid-cols-4">

              {[
                  {
                      title: "Kamera Berkualitas",
                      desc: "Hasil tajam & detail.",
                      icon: <FiCamera size={28} />,
                      bg: "bg-[#FFB8E0]",
                      pin: "bg-[#FF4D8D]",
                      rotate: "-rotate-2",
                  },
                  {
                      title: "Studio Aesthetic",
                      desc: "Instagramable banget.",
                      icon: <FiImage size={28} />,
                      bg: "bg-[#FFE066]",
                      pin: "bg-[#FFC300]",
                      rotate: "rotate-2",
                  },
                  {
                      title: "Hasil Cepat",
                      desc: "Tanpa nunggu lama.",
                      icon: <FiZap size={28} />,
                      bg: "bg-[#B8F2E6]",
                      pin: "bg-[#14B8A6]",
                      rotate: "-rotate-1",
                  },
                  {
                      title: "Semua Momen",
                      desc: "Couple, family & bestie.",
                      icon: <FiHeart size={28} />,
                      bg: "bg-[#D8B4FE]",
                      pin: "bg-[#8B5CF6]",
                      rotate: "rotate-1",
                  },
                  {
                      title: "Tim Ramah",
                      desc: "Siap bantu pose.",
                      icon: <FiUsers size={28} />,
                      bg: "bg-[#BDE0FE]",
                      pin: "bg-[#3B82F6]",
                      rotate: "rotate-2",
                  },
                  {
                      title: "Private Studio",
                      desc: "Nyaman & eksklusif.",
                      icon: <FiAward size={28} />,
                      bg: "bg-[#FFD6A5]",
                      pin: "bg-[#F97316]",
                      rotate: "-rotate-2",
                  },
                  {
                      title: "High Quality",
                      desc: "Edit premium.",
                      icon: <FiStar size={28} />,
                      bg: "bg-[#C7F0E9]",
                      pin: "bg-[#10B981]",
                      rotate: "rotate-1",
                  },
                  {
                      title: "Best Experience",
                      desc: "Bikin nagih balik lagi.",
                      icon: <FiSmile size={28} />,
                      bg: "bg-[#FFC6FF]",
                      pin: "bg-[#EC4899]",
                      rotate: "-rotate-1",
                  },
              ].map((item) => (
                  <div
                      key={item.title}
                      className={`group ${item.rotate} relative transition-all duration-300 hover:z-10 hover:-translate-y-2 hover:rotate-0`}
                  >
                      {/* Push Pin */}
                      <div className={`absolute left-1/2 top-2 z-20 h-5 w-5 -translate-x-1/2 rounded-full border-[2px] border-black ${item.pin} shadow-[2px_2px_0_#000]`} />
                      {/* Polaroid */}
                      <div className="w-[145px] rounded-md border-[4px] border-black bg-white p-3 pt-6 shadow-[6px_6px_0_#000] transition-all duration-300 group-hover:shadow-[10px_10px_0_#000] sm:w-[155px] md:w-[165px]">
                          {/* Photo */}
                          <div className={`flex h-24 items-center justify-center rounded-sm border-[3px] border-black ${item.bg} transition-all duration-300 group-hover:scale-[1.02]`}>
                              <div className="text-black transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                                  {item.icon}
                              </div>
                          </div>
                          {/* Caption */}
                          <div className="mt-3 text-center">
                              <h3 className="text-sm font-black leading-tight">
                                  {item.title}
                              </h3>
                              <p className="mt-1 text-[11px] font-medium text-slate-600">
                                  {item.desc}
                              </p>
                          </div>
                      </div>
                  </div>
              ))}
          </div>
      </section>

      {/* FASILITAS */}
      <section className="bg-[#F7F48B] px-6 md:px-10 py-15">
        <h1 className="text-2xl md:text-4xl font-black mb-10">
          FASILITAS YANG DIDAPAT 🎁
        </h1>
        <div className="grid md:grid-cols-2 gap-5">
          <div className="bg-white border-[4px] border-black rounded-2xl p-5 font-bold">
            ✔ Studio Private
          </div>
          <div className="bg-white border-[4px] border-black rounded-2xl p-5 font-bold">
            ✔ Properti Foto
          </div>
          <div className="bg-white border-[4px] border-black rounded-2xl p-5 font-bold">
            ✔ File Digital HD
          </div>
          <div className="bg-white border-[4px] border-black rounded-2xl p-5 font-bold">
            ✔ Lighting Profesional
          </div>
          <div className="bg-white border-[4px] border-black rounded-2xl p-5 font-bold">
            ✔ Ruangan Ber-AC
          </div>
          <div className="bg-white border-[4px] border-black rounded-2xl p-5 font-bold">
            ✔ Free Pilih Foto Favorit
          </div>
        </div>
      </section>

{/* FAQ */}
<section className="bg-[#CDB4FF] px-5 py-14 md:px-10">
    {/* Header */}
    <div className="mb-8 text-center">
        <span className="inline-block -rotate-2 rounded-lg border-[3px] border-black bg-[#FFE066] px-3 py-1 text-[10px] font-black uppercase shadow-[3px_3px_0_#000]">
            Frequently Asked Questions
        </span>
        <h2 className="mt-4 text-2xl font-black leading-none text-black md:text-4xl">
            Masih Ada yang Ditanyain?
        </h2>
        <p className="mt-2 text-xs font-semibold text-slate-700 md:text-sm">
            Pertanyaan yang paling sering ditanyain sebelum booking.
        </p>
    </div>
    {/* Grid */}
    <div className="mx-auto grid max-w-5xl grid-cols-1 gap-3 md:grid-cols-2 md:gap-4">
        {[
            {
                q: "Harus booking dulu atau bisa langsung datang?",
                a: "Lebih aman booking dulu yaa biar slot kamu nggak keduluan. Tinggal pilih jadwal yang kosong terus datang sesuai jamnya.",
            },
            {
                q: "Kalau belum pernah foto, bakal dibantu pose nggak?",
                a: "Tenang aja. Tim kami bakal bantu arahin pose dari awal sampai hasilnya tetap natural dan estetik.",
            },
            {
                q: "Berapa lama sesi fotonya?",
                a: "Rata-rata sekitar 15–30 menit tergantung paket yang dipilih. Jadi masih santai buat eksplor pose.",
            },
            {
                q: "Boleh bawa properti sendiri?",
                a: "Boleh banget. Mau bawa bunga, boneka, buket wisuda, balon atau properti lainnya juga bebas.",
            },
            {
                q: "Hasil fotonya langsung jadi?",
                a: "Nggak lama kok. Setelah sesi selesai kamu bisa pilih foto terbaik, lalu kami proses sesuai paketnya.",
            },
            {
                q: "Bisa foto rame-rame nggak?",
                a: "Bisa dong! Ada paket Couple, Group sampai Family. Tinggal pilih yang paling cocok aja.",
            },
        ].map((item, index) => {

            const active = openFaq === index;

            const colors = [
                "bg-[#FFB8E0]",
                "bg-[#FFE066]",
                "bg-[#C7F0E9]",
                "bg-[#BDE0FE]",
                "bg-[#FFD6A5]",
                "bg-[#FFC6FF]",
            ];
            return (
                <div
                    key={index}
                    className={`group overflow-hidden rounded-[18px] border-[3px] border-black bg-white shadow-[4px_4px_0_#000] transition-all duration-300 hover:-translate-y-1 hover:shadow-[7px_7px_0_#000] ${active ? "rotate-[0.25deg]" : ""}`}
                >
                    <button
                        onClick={() => setOpenFaq(active ? null : index)}
                        className="flex min-h-[68px] w-full items-center justify-between px-3 py-3 text-left md:min-h-[72px] md:px-4"
                    >
                        <div className="flex items-center gap-2.5">
                            <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border-[2px] border-black ${colors[index]} transition-all duration-300 group-hover:rotate-6 group-hover:scale-110 md:h-9 md:w-9`}>
                                <FiHelpCircle size={15} />
                            </div>
                            <h3 className="pr-2 text-[13px] font-black leading-snug text-black md:text-[14px]">
                                {item.q}
                            </h3>
                        </div>
                        <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border-[2px] border-black bg-[#FFF8CC] transition-all duration-300 ${active ? "rotate-180 bg-[#C7F0E9]" : "group-hover:rotate-90"} md:h-9 md:w-9`}>
                            {active ? (
                                <FiMinus size={15} />
                            ) : (
                                <FiPlus size={15} />
                            )}
                        </div>
                    </button>
                    <div
                        className={`overflow-hidden transition-all duration-500 ease-in-out ${active ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}`}
                    >
                        <div className="border-t-[2px] border-dashed border-black bg-[#FFF9F0] px-3 py-3 md:px-4">
                            <p className="text-xs font-medium leading-6 text-slate-700 md:text-sm">
                                {item.a}
                            </p>
                        </div>
                    </div>
                </div>
            );
        })}
    </div>
</section>

      {/* CTA */}
      <section className="bg-[#FFB8E0] px-6 md:px-10 py-24">

        <div
          className="
            max-w-4xl
            mx-auto
            bg-white
            border-[5px]
            border-black
            rounded-[40px]
            p-8
            md:p-10
            text-center
            shadow-[10px_10px_0px_0px_#000]
          "
        >

          <h1 className="text-4xl md:text-6xl font-black">
            SIAP MENGABADIKAN
            <br />
            MOMENMU? 🎀
          </h1>

          <p className="mt-6 font-semibold text-lg">
            Booking sekarang dan nikmati pengalaman
            foto yang seru bersama Studio Ibu.
          </p>

          <button
            onClick={handleBooking}
            className="mt-8 px-8 py-4 bg-[#002381] text-white font-black rounded-2xl border-[4px] border-black shadow-[6px_6px_0px_0px_#000] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
            >
            BOOKING SEKARANG!!
          </button>

        </div>

      </section>
    <LoginRequiredModal
        isOpen={openLoginModal}
        onClose={() => setOpenLoginModal(false)}
    />
    </div>
  );
}