import Image from "next/image";

export default function Card({ id, title, price, duration, image, desc, onEdit }) {
  return (
    <div className='relative flex flex-col px-3 bg-white w-50 h-70 rounded-lg'>

      {/* BUTTON */}
      <div className='absolute -top-4 -right-1 flex gap-1'>
        <button onClick={() => onEdit({ id, title, price, duration, image, desc })}>
          <Image src="/assets/image/EDITT.png" className='w-7 h-7' width={100} height={100} alt='edit'/>
        </button>

        <button>
          <Image src="/assets/image/delete.png" className='w-7 h-7' width={100} height={100} alt='delete'/>
        </button>
      </div>

      {/* IMAGE */}
      <div className='flex flex-col py-3 gap-2 items-center'>
        <Image src={image} className='w-45 h-30 rounded-lg' width={100} height={100} alt='img'/>
        <h1 className='font-extrabold text-[13px] text-[#002381] underline'>
          {title}
        </h1>
      </div>

      {/* PRICE */}
      <div className='flex justify-between text-[12px] text-[#002381] font-bold'>
        <p>{price}</p>
        <p>{duration}</p>
      </div>

      <div className='w-50 border border-blue-100 mt-3'></div>

      {/* DESC */}
      <p className='italic text-[#002381] text-[13px] font-bold mt-1'>Deskripsi</p>
      <p className='text-[#002381] text-[9px] text-justify'>
        {desc}
      </p>

    </div>
  );
}