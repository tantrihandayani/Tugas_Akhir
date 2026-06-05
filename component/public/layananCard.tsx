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

      const res = await fetch("http://127.0.0.1:8000/api/layanan/");
      const data = await res.json();

      setLayanan(data);

    } catch (error) {

      console.error(error);
    }
  };

  const handleBooking = () => {

    const token = getToken();

    if (!token) {

      setOpenModal(true);

    } else {

      router.push("/booking");
    }
  };

  useEffect(() => {
    getLayanan();
  }, []);

  return (
    <div className="w-full bg-[#FFF9F0] px-6 md:px-10 py-20">

      {/* TITLE */}
      <div className="mb-14">

        <div
          className="
            w-fit
            px-5
            py-2
            bg-[#FFB8E0]
            border-4
            border-black
            rounded-full
            shadow-[5px_5px_0px_0px_#000]
            rotate-[-2deg]
            mb-6
          "
        >
          <p className="font-black text-black">
            ✨ OUR SERVICES
          </p>
        </div>
        
          
          <h1
            className="
              text-5xl
              md:text-7xl
              font-black
              leading-none
              text-black
            "
          >
            LAYANAN <br />
            STUDIO 
          </h1>
          
        

      </div>

      {/* CARD */}
      <div className="flex flex-wrap gap-10 justify-center">

        {layanan.map((item, index) => (

          <div
            key={item.id}
            className={`
              w-full
              sm:w-[320px]
              border-[5px]
              border-black
              rounded-[35px]
              overflow-hidden
              shadow-[10px_10px_0px_0px_#000]
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
                h-14
                border-b-[5px]
                border-black
                flex
                items-center
                px-4
                gap-3
                bg-white
              "
            >

              <div className="w-5 h-5 rounded-full bg-red-400 border-2 border-black" />
              <div className="w-5 h-5 rounded-full bg-yellow-300 border-2 border-black" />
              <div className="w-5 h-5 rounded-full bg-green-400 border-2 border-black" />

            </div>

            {/* IMAGE */}
            <div className="p-5">

              <img
                src={
                  item.image
                    ? `http://127.0.0.1:8000${item.image}`
                    : "/assets/image/default.png"
                }
                className="
                  w-full
                  h-64
                  object-cover
                  rounded-[25px]
                  border-[4px]
                  border-black
                "
                alt="img"
              />

            </div>

            {/* CONTENT */}
            <div className="px-5 pb-6 flex flex-col gap-4">

              <div className="flex justify-between items-start gap-3">

                <h1
                  className="
                    text-3xl
                    font-black
                    text-black
                    uppercase
                    leading-none
                  "
                >
                  {item.title}
                </h1>

                <div
                  className="
                    px-3
                    py-1
                    bg-white
                    border-[3px]
                    border-black
                    rounded-full
                    text-sm
                    font-black
                    whitespace-nowrap
                  "
                >
                  {item.duration} Menit
                </div>

              </div>

              {/* PRICE */}
              <div
                className="
                  w-fit
                  px-4
                  py-2
                  bg-[#002381]
                  border-[3px]
                  border-black
                  rounded-full
                  text-white
                  font-black
                  text-lg
                "
              >
                Rp. {Number(item.price).toLocaleString("id-ID")}
              </div>

              {/* DESC */}
              <p
                className="
                  text-black
                  font-semibold
                  text-sm
                  leading-relaxed
                "
              >
                {item.description || "Tidak ada deskripsi"}
              </p>

              {/* BUTTON */}
              <button
                onClick={handleBooking}
                className="
                  mt-2
                  w-full
                  py-4
                  bg-white
                  border-[4px]
                  border-black
                  rounded-[20px]
                  text-black
                  text-lg
                  font-black
                  shadow-[5px_5px_0px_0px_#000]
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