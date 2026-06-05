import Image from "next/image";
import { Transaksi } from "@/type/transaksiType";


export default function CardTransaksi({ data, onClick }: { data: Transaksi, onClick?: () => void  }) {
  return (
    <div className='flex flex-col  px-3  '>
      <div 
      onClick={onClick}
      className='flex flex-row justify-between w-228 h-20 bg-white/80 rounded-lg shadow-lg shadow-[#2A4AA1] border border-[#2A4AA1] cursor-pointer'>
        <div className='flex flex-col  px-5 py-3'>
          <p className='font-bold text-[#002381] text-xl'>{data.nama}</p>
          <p className='text-[#002381]'>{data.paket}</p>
        </div>
        <div className='flex flex-col  px-5 py-3'>
          <p className='font-bold text-[#002381] text-xl'>{data.tanggal}</p>
          <p className='text-[#002381]'>{data.waktu}</p>
        </div>
        <div className='flex flex-col  px-10 py-3'>
          <p className='font-bold text-[#002381] text-xl'>{data.harga}</p>
          <p className='text-[#002381]'>{data.metode}</p>
        </div>
        <div className='flex flex-col gap-2 px-2 py-2 ml-10'>
          <button 
          onClick={(e) => e.stopPropagation()}
          className='flex flex-row px-5 gap-2 w-40 font-bold text-[#002381] text-xl bg-[#3DCBFF]/30 rounded-lg '
          > 
            <Image
              src="/assets/image/tick.png"
              className='w-5 h-5 mt-1'
              width={25}
              height={25}
              alt='logo'
            />
            <p>Validasi</p>
          </button>
          <button 
          onClick={(e) => e.stopPropagation()}
          className='flex flex-row px-5 gap-2 w-40 font-bold text-[#002381] text-xl bg-[#FF5454] rounded-lg '
          > 
            <Image
              src="/assets/image/close.png"
              className='w-5 h-5 mt-1'
              width={25}
              height={25}
              alt='logo'
            />
            <p>Tolak</p>
          </button>
        </div>
      </div>

    </div>
  );
}