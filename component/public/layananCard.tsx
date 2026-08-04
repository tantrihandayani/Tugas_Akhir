  "use client";

  import { useEffect, useState } from "react";
  import { Layanan } from "@/type/layananType";
  import LoginRequiredModal from "@/component/modal/loginRequiredModal";
  import { useRouter } from "next/navigation";
  import { getToken } from "@/lib/auth/auth";
  import Image from "next/image";

  export default function LayananCard() {

    const router = useRouter();
    const [layanan, setLayanan] = useState<Layanan[]>([]);
    const [openModal, setOpenModal] = useState(false);

    const colors = [
      "bg-[#C7F0E9]",
      "bg-[#F7F48B]",
      "bg-[#C6B6FF]",
      "bg-[#FFB8E0]",
      "bg-[#FFB38A]",
    ];

    const getLayanan = async () => {

      try {

        const res = await fetch("https://web-production-71d3b8.up.railway.app/api/layanan/");
        const data = await res.json();

        setLayanan(data);

      } catch (error) {

        console.error(error);
      }
    };

    const handleBooking = (namaLayanan: string) => {
        const token = getToken();

        if (!token) {
          setOpenModal(true);
          return;
        }

        router.push(`/booking?layanan=${encodeURIComponent(namaLayanan)}`);
      };

    useEffect(() => {
      getLayanan();
    }, []);

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

    return (
      <div className="w-full bg-[#FFF9F0] px-6 md:px-10 py-10">
  {/* TITLE */}
  <div className="mb-8 flex justify-center">

    <div className="flex flex-col items-center">

      <div className="mb-4 w-fit rotate-[3deg] rounded-full border-4 border-black bg-[#FFB8E0] px-5 py-2 shadow-[5px_5px_0px_0px_#000]">
        <p className="font-black text-black">
          ✨ OUR SERVICES
        </p>
      </div>

      <h1 className="  text-3xl font-black leading-none text-black md:text-5xl text-shadow-lg">
        LAYANAN STUDIO
      </h1>

    </div>

  </div>

  {/* CARD */}
  <div className="flex flex-wrap justify-center gap-4">

    {layanan.map((item, index) => (

      <div
        key={item.id}
        className={`
          w-[47%]
          sm:w-[220px]
          lg:w-[240px]
          xl:w-[250px]
          border-[4px]
          border-black
          rounded-[24px]
          overflow-hidden
          shadow-[6px_6px_0px_0px_#000]
          hover:translate-x-1
          hover:translate-y-1
          hover:shadow-none
          transition-all
          duration-200
          ${colors[index % colors.length]}
        `}
      >

        {/* WINDOW BAR */}
        <div
          className="
            h-8
            border-b-[3px]
            border-black
            flex
            items-center
            px-2
            gap-1
            bg-white
          "
        >
          <div className="w-2.5 h-2.5 rounded-full bg-red-400 border border-black" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-300 border border-black" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-400 border border-black" />
        </div>

        {/* IMAGE */}
        <div className="p-3">

          <img
            src={
              item.image
                ? item.image.startsWith("http")
                  ? item.image
                  : `${API_URL}${item.image}`
                : "/assets/image/default.png"
            }
            className="w-full h-32 lg:h-36 rounded-xl border-2 border-black object-cover"
            alt="img"
          />

        </div>

        {/* CONTENT */}
        <div className="px-3 pb-4 flex flex-col gap-2">

          <div className="flex justify-between items-start gap-1">

            <h1
              className="
                text-lg
                lg:text-xl
                font-black
                text-black
                uppercase
                leading-tight
              "
            >
              {item.title}
            </h1>

            <div
              className="
                px-1.5
                py-0.5
                bg-white
                border
                border-black
                rounded-full
                text-[10px]
                font-black
                whitespace-nowrap
              "
            >
              {item.duration} Menit
            </div>

          </div>

          

          {/* PRICE */}
          <div className="flex flex-row justify-between items-center">
            
          
          <div
            className="
              w-fit
              px-2
              py-1
              bg-[#002381]
              border
              border-black
              rounded-full
              text-white
              font-black
              text-xs
            "
          >
            Mulai Rp{" "}
            {Number(
              Math.min(
                Number(item.price_self),
                Number(item.price_couple),
                Number(item.price_group),
                Number(item.price_family)
              )
            ).toLocaleString("id-ID")}
          </div>

          </div>

          {/* DESC */}
          <p
            className="
              text-black
              text-xs
              font-medium
              leading-relaxed
              line-clamp-2
              min-h-[36px]
            "
          >
            {item.description || "Tidak ada deskripsi"}
          </p>

          {/* BUTTON */}
          <button
            onClick={() => handleBooking(item.title)}
            className="
              mt-1
              w-full
              py-2
              bg-white
              border-[2px]
              border-black
              rounded-xl
              text-sm
              font-black
              shadow-[3px_3px_0px_0px_#000]
              hover:translate-x-1
              hover:translate-y-1
              hover:shadow-none
              transition-all
            "
          >
            BOOKING 🎀
          </button>

        </div>

      </div>

    ))}

  </div>

        <LoginRequiredModal
          isOpen={openModal}
          onClose={() => setOpenModal(false)}
        />

      </div>
    );
  }