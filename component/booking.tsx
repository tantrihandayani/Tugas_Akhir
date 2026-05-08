import { BookingType } from "@/type/bookingType";
import { stat } from "fs";
import Image from "next/image";

export default function Booking ({date,id,name,packageName,status,time}: BookingType) {
    return (
        <div className='flex flex-col gap-3 '>
            <div className='flex items-center gap-10  w-180 h-15 border-[1px] border-[#2A4AA1] shadow-md shadow-blue-900 rounded-lg'>
              <div className='flex items-center  w-40 h-12 ml-3  bg-[#2A4AA1] rounded-lg '>
                <Image
                src="/assets/image/time.png"
                className='ml-1 '
                width={30}
                height={30}
                alt='logo'
                />
                <div className='w-100 flex flex-col '>
                <p className='font-bold'>{time}</p>
                <p className='text-[10px]'>{date}</p>
                </div>
              </div>
              <div className='w-100 flex flex-col'>
                <p className='text-[#2A4AA1]  font-bold text-lg'>{name}</p>
                <p className='text-[#2A4AA1]  text-[12px] '>{packageName}</p>
              </div>
              <button className="w-50 flex items-center justify-between">
                <p className="text-[#FFA600]">{status}</p>
                <Image
                  src="/assets/image/next2.png"
                  width={35}
                  height={15}
                  alt="logo"
                />
              </button>
            </div>
          </div>
    );
}