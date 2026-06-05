import Image from "next/image";

export default function Card({ id, title, price, duration, image, description, onEdit, onDelete }) {
  return (
    <div className='relative flex flex-col px-3 bg-white w-50 h-70 rounded-lg'>

      {/* BUTTON */}
      <div className='absolute -top-4 -right-1 flex gap-1'>
        <button onClick={() => onEdit({ id, title, price, duration, image, description })}>
          <Image src="/assets/image/EDITT.png" className='w-7 h-7 rounded-lg' width={100} height={100} alt='edit'/>
        </button>

        <button onClick={() => onDelete(id)}>
          <Image src="/assets/image/delete.png" className='w-7 h-7 rounded-lg' width={100} height={100} alt='delete'/>
        </button>
      </div>

      {/* IMAGE */}
      <div className='flex flex-col py-3 gap-2 items-center'>
        <img
          src={
            image
              ? `http://127.0.0.1:8000${image}`
              : "/assets/image/default.png"
          }
          className='w-45 h-30 rounded-lg object-cover'
          alt='img'
        />
        <h1 className='font-extrabold text-[13px] text-[#002381] underline'>
          {title}
        </h1>
      </div>

      {/* PRICE */}
      <div className='flex justify-between text-[12px] text-[#002381] font-bold'>
        <p>Rp. {Number(price).toLocaleString("id-ID")}</p>
        <p>{duration} Menit</p>
      </div>

      <div className='w-50 border border-blue-100 mt-3'></div>

      {/* DESC */}
      <p className='italic text-[#002381] text-[10px] font-bold mt-1'>Deskripsi</p>
      <p className='text-[#002381] text-[9px] text-justify'>
        {description || "Tidak ada deskripsi"}
      </p>

    </div>
  );
}