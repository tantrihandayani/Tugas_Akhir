"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function HeroSection() {

  const router = useRouter();

  return (
    <div
      className="
        w-full
        min-h-screen
        bg-[#FFB8E0]
        px-6
        md:px-10
        py-12
        flex
        flex-col-reverse
        lg:flex-row
        items-center
        justify-between
        gap-12
        overflow-hidden
        border-b-[6px]
        border-black
        relative
      "
    >

      {/* FLOATING SHAPES */}
      <div
        className="
          absolute
          top-10
          left-5
          md:left-10
          w-14
          h-14
          md:w-20
          md:h-20
          rounded-full
          bg-[#F7F48B]
          border-4
          border-black
        "
      />

      <div
        className="
          absolute
          bottom-10
          right-5
          md:right-20
          w-20
          h-20
          md:w-32
          md:h-32
          rounded-full
          bg-[#C6B6FF]
          border-4
          border-black
        "
      />

      {/* LEFT */}
      <div className="flex flex-col gap-6 max-w-2xl z-10">

        {/* BADGE */}
        <div
          className="
            w-fit
            px-5
            py-2
            bg-[#F7F48B]
            border-4
            border-black
            rounded-full
            rotate-[-3deg]
            shadow-[5px_5px_0px_0px_#000]
          "
        >
          <p className="font-black text-black text-sm md:text-lg">
            📸 SELF PHOTO STUDIO
          </p>
        </div>

        {/* TITLE */}
        <h1
          className="
            text-5xl
            sm:text-6xl
            lg:text-8xl
            leading-[90%]
            font-black
            text-black
          "
        >
          MOMEN <br />
          LUCU <br />
          BARENG <br />
          ORANG <br />
          TERSAYANG.
        </h1>

        {/* DESC */}
        <div
          className="
            bg-[#C7F0E9]
            border-4
            border-black
            rounded-[30px]
            p-5
            md:p-6
            shadow-[8px_8px_0px_0px_#000]
            rotate-[-2deg]
            max-w-xl
          "
        >
          <p
            className="
              text-black
              font-bold
              text-base
              md:text-lg
            "
          >
            Studio foto aesthetic dengan layanan
            self photo, couple photo, group photo,
            dan theater studio dengan kualitas terbaik ✨
          </p>
        </div>

        {/* BUTTON */}
        <div className="flex flex-wrap gap-4">

          <button
            onClick={() => router.push("/booking")}
            className="
              px-6
              md:px-8
              py-3
              md:py-4
              bg-[#002381]
              text-white
              text-lg
              md:text-xl
              font-black
              rounded-[20px]
              border-4
              border-black
              shadow-[6px_6px_0px_0px_#000]
              hover:translate-x-1
              hover:translate-y-1
              hover:shadow-none
              transition-all
            "
          >
            BOOKING 🎀
          </button>

          <button
            onClick={() => router.push("/login")}
            className="
              px-6
              md:px-8
              py-3
              md:py-4
              bg-white
              text-black
              text-lg
              md:text-xl
              font-black
              rounded-[20px]
              border-4
              border-black
              shadow-[6px_6px_0px_0px_#000]
              hover:translate-x-1
              hover:translate-y-1
              hover:shadow-none
              transition-all
            "
          >
            LOGIN ✨
          </button>

        </div>
      </div>

      {/* RIGHT */}
      <div className="relative z-10">

        {/* BACK CARD */}
        <div
          className="
            absolute
            w-[250px]
            h-[300px]
            sm:w-[320px]
            sm:h-[400px]
            md:w-[380px]
            md:h-[460px]
            bg-[#F7F48B]
            border-[6px]
            border-black
            rounded-[40px]
            rotate-[-6deg]
            top-4
            left-4
          "
        />

        {/* FRONT CARD */}
        <div
          className="
            relative
            w-[250px]
            h-[300px]
            sm:w-[320px]
            sm:h-[400px]
            md:w-[380px]
            md:h-[460px]
            bg-[#C6B6FF]
            border-[6px]
            border-black
            rounded-[40px]
            shadow-[12px_12px_0px_0px_#000]
            rotate-3
            flex
            items-center
            justify-center
            p-6
          "
        >

          <Image
            src="/assets/image/logo.png"
            width={280}
            height={280}
            alt="Studio Ibu"
            className="object-contain"
          />

        </div>
      </div>
    </div>
  );
}