import Image from "next/image";

type CardProps = {
  id: number;
  title: string;
  description: string | null;
  duration: string;
  image: string | null;

  max_person: number;

  price_self: string;
  price_couple: string;
  price_group: string;
  price_family: string;

  onEdit: (item: any) => void;
  onDelete: (id: number) => void;
};

export default function Card({
  id,
  title,
  duration,
  image,
  description,

  max_person,

  price_self,
  price_couple,
  price_group,
  price_family,

  onEdit,
  onDelete,
}: CardProps)
{
  return (
    <div className='relative flex flex-col px-3 bg-white w-55 h-75 rounded-lg'>

      {/* BUTTON */}
      <div className='absolute -top-4 -right-1 flex gap-1'>
        <button onClick={() =>
          onEdit({
            id,
            title,
            duration,
            image,
            description,

            max_person,

            price_self,
            price_couple,
            price_group,
            price_family,
          })
        }>
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
      <div className=" space-y-1 text-[#002381]">
        <div className="flex justify-between text-xs font-bold">
          <span>Maks {max_person} Orang</span>
          <span>{duration} Menit</span>
        </div>

        <div
        className="border-t pt-2 grid grid-cols-2 gap-x-3 gap-y-1 text-[8px] text-[#002381]"
      >
        <div className="w-20 flex justify-between ">
          <span className="font-semibold">Self</span>
          <span>
            Rp {Number(price_self).toLocaleString("id-ID")}
          </span>
        </div>

        <div className="w-20 flex justify-between">
          <span className="font-semibold">Couple</span>
          <span>
            Rp {Number(price_couple).toLocaleString("id-ID")}
          </span>
        </div>

        <div className="w-20 flex justify-between">
          <span className="font-semibold">Group</span>
          <span>
            Rp {Number(price_group).toLocaleString("id-ID")}
          </span>
        </div>

        <div className="w-20 flex justify-between">
          <span className="font-semibold">Family</span>
          <span>
            Rp {Number(price_family).toLocaleString("id-ID")}
          </span>
        </div>
      </div>

      </div>

      {/* DESC */}
      <p className='italic text-[#002381] text-[10px] font-bold mt-1'>Deskripsi</p>
      <p className='text-[#002381] text-[9px] text-justify'>
        {description || "Tidak ada deskripsi"}
      </p>

    </div>
  );
}