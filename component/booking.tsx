import { BookingType } from "@/type/bookingType";
import Image from "next/image";

type Props = BookingType & {
  className?: string;
};

export default function Booking({
  date,
  id,
  customer_name,
  package_name,
  payment_method,
  status,
  time,
  className,
}: Props) {

  const statusLabel = {
    waiting: "Waiting",
    progress: "On Progress",
    finished: "Finished",
  }[status];
  
  return (
    <div className={`w-full ${className}`}>
      <div className="flex flex-col  md:flex-row md:items-center gap-3 md:gap-6 w-full border border-[#2A4AA1] 
      shadow-md shadow-blue-300 rounded-xl p-3 cursor-pointer hover:shadow-lg transition">

        {/* WAKTU */}
        <div className="flex items-center gap-2 bg-[#2A4AA1] rounded-lg px-3 py-2 min-w-fit">
          <Image src="/assets/image/time.png" width={30} height={30} alt="logo" />

          <div>
            <p className="font-bold text-white text-sm">{time}</p>
            <p className="text-[10px] text-white">{date}</p>
          </div>
        </div>
        

        {/* DATA */}
        
          {/* DATA */}
          <div className="flex-1 flex flex-col md:flex-row md:items-center md:justify-between gap-2 px-2">

            {/* Nama & Paket */}
            <div>
              <p className="text-[#2A4AA1] font-bold text-lg">
                {customer_name}
              </p>

              <p className="text-[#2A4AA1] text-sm">
                {package_name}
              </p>
            </div>

            {/* Metode */}
            <p className="text-[#2A4AA1] text-sm md:text-base whitespace-nowrap">
              Metode: {payment_method}
            </p>

          </div>

          {/* STATUS */}
          <div className="flex items-center justify-end gap-2 shrink-0">
            <p
              className={`
                font-semibold text-base md:text-lg
                ${status === "finished" ? "text-green-600" : ""}
                ${status === "progress" ? "text-orange-500" : ""}
                ${status === "waiting" ? "text-yellow-500" : ""}
              `}
            >
              {statusLabel}
            </p>

            <Image
              src="/assets/image/next2.png"
              width={30}
              height={30}
              alt="logo"
            />
          </div>
        </div>
      </div>
  );
}