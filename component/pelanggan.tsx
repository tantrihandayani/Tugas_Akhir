import { pelangganData } from "@/lib/data/data_pelanggan";
import { PelangganType } from "@/type/pelangganType";
import Image from "next/image";

export default function Pelanggan({id, name, phone, totalBooking, status,}: PelangganType) {
  return (
    <button className='flex flex-row items-center justify-between w-120 h-15 shadow-md shadow-[#3DCBFF] bg-white rounded-lg px-3 text-start'>
    <div className='flex flex-col w-1/2'>
        <p className='text-[#002381] font-bold text-[20px]'>{name}</p>
        <p className='text-[#002381] text-[13px]'>{phone}</p>
    </div>
    <div className='w-1/2 text-center'>
        <p className='text-[#002381] text-[15px] font-bold'>{totalBooking} Booking</p>
    </div>
    <div className='flex flex-row items-center justify-end w-1/3 text-[#3DCBFF] font-bold gap-2 text-[15px]'>
        <p>{status}</p>
        <Image
        src="/assets/image/approve.png"
        className='w-7 h-7'
        width={25}
        height={25}
        alt='logo'
        />
    </div>
    </button>
  );
}