export default function Footer() {
  return (
    <footer
      className="
        w-full
        bg-[#C6B6FF]
        border-t-[4px]
        border-black
        px-5
        md:px-10
        py-10
      "
    >
      <div
        className="
          max-w-7xl
          mx-auto
          bg-white
          border-[4px]
          border-black
          rounded-[28px]
          shadow-[6px_6px_0px_0px_#000]
          p-8
          grid
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]
          gap-8
        "
      >
        {/* BRAND */}
        
        <div>
          
          <h1 className="text-3xl font-black text-black mb-2">
            STUDIO IBU
          </h1>

          <p className="text-[#FF4D8D] font-bold mb-4">
            Self Photo Studio 🎀
          </p>

          <div className="w-20 h-1 bg-black rounded-full mb-5" />

          <p className="text-gray-700 leading-7 font-medium">
            Studio foto modern dengan konsep aesthetic dan nyaman
            untuk mengabadikan momen terbaik bersama pasangan,
            sahabat, keluarga, maupun diri sendiri ✨
          </p>
        </div>

        {/* MENU */}
        <div>
          <h2 className="text-2xl font-black mb-5">
            Menu
          </h2>

          <div className="flex flex-col gap-3">
            <a
              href="/"
              className="
                inline-flex
                items-center
                font-semibold
                text-cyan-500
                px-3
                py-2
                rounded-xl
                transition-all
                duration-300
                hover:bg-cyan-100
                hover:text-cyan-600
                hover:-translate-y-1
                hover:rotate-1
                hover:shadow-[4px_4px_0px_0px_#06B6D4]
              "
            >
              Home
            </a>

            <a
              href="#services"
              className="
                inline-flex
                items-center
                font-semibold
                text-purple-500
                px-3
                py-2
                rounded-xl
                transition-all
                duration-300
                hover:bg-purple-100
                hover:text-purple-600
                hover:-translate-y-1
                hover:rotate-1
                hover:shadow-[4px_4px_0px_0px_#A855F7]
              "
            >
              Layanan
            </a>

            <a
              href="#schedule"
              className="
                inline-flex
                items-center
                font-semibold
                text-indigo-500
                px-3
                py-2
                rounded-xl
                transition-all
                duration-300
                hover:bg-indigo-100
                hover:text-indigo-600
                hover:-translate-y-1
                hover:rotate-1
                hover:shadow-[4px_4px_0px_0px_#6366F1]
              "
            >
              Jadwal
            </a>

            <a
              href="#booking"
              className="
                inline-flex
                items-center

                font-semibold
                text-pink-600
                px-3
                py-2
                rounded-xl
                transition-all
                duration-300
                hover:bg-pink-100
                hover:text-pink-700
                hover:-translate-y-1
                hover:shadow-[4px_4px_0px_0px_#EC4899]
                active:translate-y-0
                active:shadow-none
              "
            >
              Booking
            </a>
          </div>
        </div>

        {/* CONTACT */}
        <div>
          <h2 className="text-2xl font-black mb-5">
            Contact
          </h2>

          <div className="flex flex-col gap-4">
            <div
              className="
                flex
                items-center
                gap-2
                px-4
                py-3
                bg-[#FFD2EC]
                border-[3px]
                border-black
                rounded-2xl
                font-semibold
              "
            >
              📍 Indramayu, Jawa Barat
            </div>

            <div
              className="
                flex
                items-center
                gap-2
                px-4
                py-3
                bg-[#C7F0E9]
                border-[3px]
                border-black
                rounded-2xl
                font-semibold
                text-[10px]
              "
            >
              Phone: 087749193000
              <br />
              Instagram: @studio_ibuu
            </div>

            <div
              className="
                flex
                items-center
                gap-2
                px-4
                py-3
                bg-[#FFF3A3]
                border-[3px]
                border-black
                rounded-2xl
                font-semibold
              "
            >
              ⏰ 10:00 - 21:00 WIB
            </div>
          </div>
        </div>

        {/* LOCATION */}
        <div>
          <h2 className="text-2xl font-black mb-5">
            Location
          </h2>

          <div
            className="
              overflow-hidden
              rounded-2xl
              border-[4px]
              border-black
              shadow-[4px_4px_0px_0px_#000]
              h-[220px]
            "
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18..."
              loading="lazy"
              className="w-full h-full"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>

      {/* COPYRIGHT */}
      <div className="mt-8 text-center">
        <p className="font-semibold text-black/70 text-sm">
          © 2026 Studio Ibu • Made with ❤️ for capturing memories
        </p>
      </div>
    </footer>
  );
}