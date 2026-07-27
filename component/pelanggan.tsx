import { PelangganType } from "@/type/pelangganType";
import Image from "next/image";

type Props = PelangganType & {
  onClick: () => void;
};

export default function Pelanggan({
  username,
  nomor_hp,
  total_booking,
  status,
  onClick,
}: Props) {
  return (
    <button
      onClick={onClick}
      className="
      w-full
      bg-white
      rounded-2xl
      border
      border-blue-100
      hover:border-blue-500
      hover:shadow-xl
      transition-all
      duration-300
      p-5
      flex
      justify-between
      items-center"
    >
      <div>
        <h2 className="text-lg font-bold text-[#1E3A8A]">
          {username}
        </h2>

        <p className="text-gray-500">
          {nomor_hp}
        </p>
      </div>

      <div className="text-center">
        <p className="font-bold text-blue-700">
          {total_booking}
        </p>

        <small>Total Booking</small>
      </div>

      <div className="flex items-center gap-2">

        <span
          className="
          px-3
          py-1
          rounded-full
          bg-green-100
          text-green-700
          text-sm
          font-semibold"
        >
          {status}
        </span>

        <Image
          src="/assets/image/approve.png"
          width={25}
          height={25}
          alt=""
        />

      </div>
    </button>
  );
}