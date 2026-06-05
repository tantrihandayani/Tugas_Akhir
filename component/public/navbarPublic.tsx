"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function NavbarPublic() {

  const router = useRouter();

  return (
    <div
      className="
        w-full
        h-24
        bg-[#FFF9F0]
        border-b-[5px]
        border-black
        px-6
        md:px-10
        flex
        items-center
        justify-between
        sticky
        top-0
        z-50
      "
    >

      {/* LEFT */}
      <div className="flex items-center gap-4">

        <div
          className="
            w-16
            h-16
            bg-[#C6B6FF]
            border-[4px]
            border-black
            rounded-2xl
            shadow-[4px_4px_0px_0px_#000]
            flex
            items-center
            justify-center
            rotate-[-4deg]
          "
        >

          <Image
            src="/assets/image/logo.png"
            width={45}
            height={45}
            alt="Logo"
          />

        </div>

        <div>

          <h1 className="text-2xl md:text-3xl font-black text-black">
            STUDIO IBU
          </h1>

          <p className="font-bold text-sm text-gray-700">
            Self Photo Studio ✨
          </p>

        </div>

      </div>

      {/* MENU */}
      <div className="hidden lg:flex items-center gap-6">

        <button
        
          className="
            px-5
            py-2
            bg-[#F7F48B]
            border-[3px]
            border-black
            rounded-full
            font-black
            text-[#002381]
            shadow-[3px_3px_0px_0px_#000]
            hover:translate-x-1
            hover:translate-y-1
            hover:shadow-none
            transition-all
          "
        >
          BERANDA
        </button>

        <button
          className="
            px-5
            py-2
            bg-[#C7F0E9]
            border-[3px]
            border-black
            rounded-full
            font-black
            text-[#002381]
            shadow-[3px_3px_0px_0px_#000]
            hover:translate-x-1
            hover:translate-y-1
            hover:shadow-none
            transition-all
          "
        >
          LAYANAN
        </button>

        <button
          onClick={() => router.push("/booking")}
          className="
            px-5
            py-2
            bg-[#FFB8E0]
            border-[3px]
            border-black
            rounded-full
            font-black
            text-[#002381]
            shadow-[3px_3px_0px_0px_#000]
            hover:translate-x-1
            hover:translate-y-1
            hover:shadow-none
            transition-all
          "
        >
          BOOKING
        </button>

      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-4">

        <button
          onClick={() => router.push("/login")}
          className="
            px-6
            py-3
            bg-[#002381]
            text-white
            font-black
            rounded-2xl
            border-[4px]
            border-black
            shadow-[5px_5px_0px_0px_#000]
            hover:translate-x-1
            hover:translate-y-1
            hover:shadow-none
            transition-all
          "
        >
          SIGN IN ✨
        </button>

      </div>

    </div>
  );
}