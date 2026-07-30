"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getToken, } from "@/lib/auth/auth";
import { HiSparkles } from "react-icons/hi2";
import { PiHandWavingFill } from "react-icons/pi";
import LoginRequiredModal from "@/component/modal/loginRequiredModal";

export default function HeroSection() {

  const router = useRouter();
  const [isLogin, setIsLogin] = useState(false);
  const [username, setUsername] = useState("");
  const [openLoginModal, setOpenLoginModal] = useState(false);

  useEffect(() => {
    const token = getToken();

    if (token) {
      setIsLogin(true);

      fetch("https://web-production-71d3b8.up.railway.app/api//profile/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setUsername(data.username || "Customer");
        })
        .catch(console.error);
    }
  }, []);

  const handleBooking = () => {
    const token = getToken();

    if (!token) {
      setOpenLoginModal(true);
      return;
    }

    router.push("/booking");
  };
return (
  <div className="relative flex min-h-screen w-full items-start justify-between overflow-hidden border-b-[6px] border-black bg-[#FFB8E0] px-5 pt-8 pb-10 sm:px-8 md:px-10 lg:items-center lg:px-16">

    {/* FLOATING SHAPES */}
    <div className="absolute top-7 left-5 h-14 w-14 rounded-full border-4 border-black bg-[#F7F48B] md:left-10 md:h-20 md:w-20" />

    <div className="absolute top-10 right-5 h-20 w-20 rounded-full border-4 border-black bg-[#C6B6FF] md:right-20 md:h-32 md:w-32" />

    {/* LEFT */}
    <div className="z-10 flex flex-1 flex-col gap-5 pr-2 text-left md:pr-6">

      {/* BADGE */}
      <div className="w-fit rotate-[-3deg] rounded-full border-4 border-black bg-[#F7F48B] px-5 py-2 shadow-[5px_5px_0px_0px_#000]">
        <p className="text-sm font-black text-black md:text-lg">
          📸 SELF PHOTO STUDIO
        </p>
      </div>

      {/* TITLE */}
      <h1 className="text-[2.5rem] sm:text-4xl lg:text-5xl font-black leading-[0.95] text-black ">
        MOMEN 
        LUCU <br />
        BARENG <br />
        ORANG <br />
        TERSAYANG.
      </h1>

      {/* DESC + BUTTON */}
      <div className="flex items-center justify-between gap-3 md:block">
        {/* DESC */}
        <div className="max-w-[340px] rotate-[-2deg] rounded-[12px] border-2 border-black bg-[#C7F0E9] px-4 py-2 shadow-[3px_3px_0px_0px_#000] sm:max-w-[480px] sm:rounded-[16px] sm:border-[3px] sm:px-5 sm:py-2.5 sm:shadow-[4px_4px_0px_0px_#000] md:max-w-[440px] md:rounded-[18px] md:px-6 md:py-3 md:shadow-[5px_5px_0px_0px_#000] lg:max-w-[560px] lg:rounded-[20px] lg:px-7 lg:py-3.5 lg:shadow-[6px_6px_0px_0px_#000]">
  <p className="text-[10px] font-bold leading-relaxed text-black sm:text-xs md:text-sm lg:text-base">
    Studio foto aesthetic dengan layanan self photo, couple photo, group photo,
    dan theater studio dengan kualitas terbaik ✨
  </p>
</div>

        {/* BUTTON */}
<div className="flex flex-col gap-2 md:mt-5 md:flex-row md:items-center md:gap-4">

  {/* BOOKING */}
  <button
    onClick={handleBooking}
    className="rounded-[14px] border-[3px] border-black bg-[#002381] px-4 py-2 text-xs font-black text-white shadow-[4px_4px_0px_0px_#000] transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-none sm:px-5 sm:text-sm md:rounded-[20px] md:border-4 md:px-8 md:py-4 md:text-xl md:shadow-[6px_6px_0px_0px_#000]"
  >
    BOOKING 🎀
  </button>

  {/* LOGIN / GREETING */}
  <div className="relative">
    {!isLogin ? (
      <button
        onClick={() => router.push("/login")}
        className="rounded-[14px] border-[3px] border-black bg-white px-4 py-2 text-xs font-black text-black shadow-[4px_4px_0px_0px_#000] transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-none sm:px-5 sm:text-sm md:rounded-[20px] md:border-4 md:px-8 md:py-4 md:text-xl md:shadow-[6px_6px_0px_0px_#000]"
      >
        LOGIN ✨
      </button>
    ) : (
      <div className="group flex flex-col items-start select-none">
        <h3 className="flex items-center gap-2 text-sm font-black text-black sm:text-base md:text-3xl">
          <PiHandWavingFill className="text-[#FFB800] transition-all duration-300 group-hover:-rotate-12 group-hover:scale-125" />

          <span className="transition-all duration-300 group-hover:translate-x-1">
            Halo, <span className="text-[#002381]">{username}</span>
          </span>
        </h3>

        <p className="mt-1 flex items-center gap-2 text-[10px] font-bold text-black/70 transition-all duration-300 group-hover:translate-x-2 group-hover:text-black sm:text-xs md:text-base">
          <HiSparkles className="text-pink-500 transition-all duration-500 group-hover:rotate-180" />
          Siap bikin foto yang estetik hari ini?
        </p>
      </div>
    )}
  </div>

</div>
        </div>
        </div>
{/* RIGHT */}
<div className="relative z-10 ml-4 flex flex-shrink-0 items-start justify-end lg:ml-0 lg:items-center">

  {/* BACK CARD */}
  <div className="absolute top-2 left-2 h-[150px] w-[130px] rotate-[-6deg] rounded-[24px] border-[4px] border-black bg-[#F7F48B] sm:h-[220px] sm:w-[180px] md:h-[300px] md:w-[250px] lg:top-4 lg:left-4 lg:h-[380px] lg:w-[290px] lg:rounded-[40px] lg:border-[6px]" />
  {/* FRONT CARD */}
  <div className="relative flex h-[150px] w-[130px] rotate-3 items-center justify-center rounded-[24px] border-[4px] border-black bg-[#C6B6FF] p-3 shadow-[6px_6px_0px_0px_#000] sm:h-[220px] sm:w-[180px] md:h-[300px] md:w-[250px] lg:h-[380px] lg:w-[290px] lg:rounded-[40px] lg:border-[6px] lg:p-6 lg:shadow-[12px_12px_0px_0px_#000]">

    <Image
      src="/assets/image/logo.png"
      width={320}
      height={320}
      alt="Studio Ibu"
      className="h-auto w-20 object-contain transition-all duration-300 sm:w-28 md:w-40 lg:w-72"
    />

  </div>

</div>
<LoginRequiredModal
  isOpen={openLoginModal}
  onClose={() => setOpenLoginModal(false)}
/>
</div>
);
}