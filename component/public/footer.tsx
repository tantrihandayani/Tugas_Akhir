import Link from "next/link";
import {
  FiMapPin,
  FiPhone,
  FiInstagram,
  FiClock,
  FiArrowRight,
} from "react-icons/fi";




export default function Footer() {
  return (
    <footer className="w-full border-t-[3px] border-black bg-[#C6B6FF] px-4 py-5 md:px-8 md:py-7">

      <div className="mx-auto overflow-hidden rounded-[22px] border-[3px] border-black bg-white shadow-[5px_5px_0px_0px_#000]">

        <div className="grid grid-cols-1 gap-6 p-5 md:grid-cols-2 md:p-6 lg:grid-cols-[1.5fr_.9fr_1fr_1.2fr] lg:gap-8 lg:p-8">

          {/* ================= BRAND ================= */}

          <div className="flex flex-col justify-between">

            <div>

              <div className="inline-flex items-center gap-3 rounded-full border-[3px] border-black bg-[#F7F48B] px-4 py-2">

                <div className="h-3 w-3 rounded-full bg-[#FF4D8D]" />

                <span className="text-xs font-black tracking-wide">
                  SELF PHOTO STUDIO
                </span>

              </div>

              <h1 className="mt-4 text-2xl font-black leading-none text-black lg:text-3xl">
                STUDIO IBU
              </h1>

              <p className="mt-2 text-sm font-bold text-[#FF4D8D]">
                Self Photo Studio 🎀
              </p>

              <div className="mt-4 h-1 w-16 rounded-full bg-black" />

              <p className="mt-4 max-w-sm text-sm leading-6 text-gray-700">
                Studio foto aesthetic untuk mengabadikan momen terbaik bersama
                pasangan, sahabat, keluarga maupun diri sendiri ✨
              </p>

            </div>

            {/* MOBILE CTA */}

            <Link
              href="/booking"
              className="mt-6 inline-flex items-center justify-center gap-2 rounded-2xl border-[3px] border-black bg-[#002381] px-5 py-3 text-sm font-black text-white shadow-[4px_4px_0px_0px_#000] transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-none lg:hidden"
            >
              Booking Sekarang
              <FiArrowRight />
            </Link>

          </div>

          {/* ================= MENU ================= */}

          <div className="hidden lg:block">

            <h2 className="mb-4 text-lg font-black">
              Menu
            </h2>

            <nav className="flex flex-col gap-2">

              <Link
                href="/"
                className="rounded-lg px-2 py-1 text-sm font-bold text-cyan-500 transition hover:translate-x-1"
              >
                Home
              </Link>

              <Link
                href="/layanan"
                className="rounded-lg px-2 py-1 text-sm font-bold text-purple-500 transition hover:translate-x-1"
              >
                Layanan
              </Link>

              <Link
                href="/jadwal"
                className="rounded-lg px-2 py-1 text-sm font-bold text-indigo-500 transition hover:translate-x-1"
              >
                Jadwal
              </Link>

              <Link
                href="/booking"
                className="rounded-lg px-2 py-1 text-sm font-bold text-pink-600 transition hover:translate-x-1"
              >
                Booking
              </Link>

            </nav>

          </div>

          {/* ================= CONTACT ================= */}

          <div>

            <h2 className="mb-4 text-lg font-black">
              Contact
            </h2>

            <div className="space-y-3">

              <div className="flex items-center gap-3 rounded-2xl border-[2px] border-black bg-[#FFD2EC] px-3 py-3">

                <FiMapPin className="text-lg" />

                <span className="text-sm font-bold">
                  Indramayu, Jawa Barat
                </span>

              </div>

              <div className="rounded-2xl border-[2px] border-black bg-[#C7F0E9] px-3 py-3">

                <div className="flex items-center gap-2">

                  <FiPhone />

                  <span className="text-sm font-bold">
                    087749193000
                  </span>

                </div>

                <div className="mt-2 flex items-center gap-2">

                  <FiInstagram />

                  <span className="text-sm font-bold">
                    @studio_ibuu
                  </span>

                </div>

              </div>

              <div className="flex items-center gap-3 rounded-2xl border-[2px] border-black bg-[#FFF3A3] px-3 py-3">

                <FiClock className="text-lg" />

                <span className="text-sm font-bold">
                  10.00 - 21.00 WIB
                </span>

              </div>

            </div>

          </div>
                    {/* ================= LOCATION ================= */}

          <div className="hidden lg:flex lg:flex-col">

            <h2 className="mb-4 text-lg font-black">
              Location
            </h2>

            <div className="overflow-hidden rounded-2xl border-[3px] border-black shadow-[4px_4px_0px_0px_#000]">

              <iframe
                src="https://www.google.com/maps?q=-6.581450,108.273088&z=18&output=embed"
                className="h-[180px] w-full"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
              />

            </div>

          </div>

        </div>

      </div>

      {/* ================= COPYRIGHT ================= */}

      <div className="mx-auto mt-5 flex max-w-6xl flex-col items-center justify-between gap-2 text-center text-[11px] font-bold text-black/60 md:flex-row md:text-sm">

        <p>
          © 2026 Studio Ibuu. All Rights Reserved.
        </p>


      </div>

    </footer>
  );
}