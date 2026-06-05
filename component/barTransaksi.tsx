type Props = {
  title: string;
  value: string;
};

export default function BarTransaksi({ title, value }: Props) {
  return (
    <button className="w-75 h-20 bg-white rounded-lg py-2">
      <p className="font-bold text-[15px] -mt-3 text-[#002381]">
        {title}
      </p>
      <p className="font-extrabold text-xl text-[#FFA550]">
        {value}
      </p>
    </button>
  );
}