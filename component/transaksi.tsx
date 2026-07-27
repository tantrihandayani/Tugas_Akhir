import Image from "next/image";
import { Transaksi } from "@/type/transaksiType";

export default function CardTransaksi({ data, onClick }: { data: Transaksi; onClick?: () => void }) {
  return (
    <div
      onClick={onClick}
      className="flex items-center w-full bg-white border border-slate-200 rounded-2xl px-6 py-5 cursor-pointer hover:shadow-lg hover:border-slate-300 transition-all duration-200"
    >
      {/* Pelanggan */}
      <div className="flex flex-col flex-[2] pl-0 px-6">
        <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest mb-1">Pelanggan</span>
        <p className="text-[15px] font-bold text-slate-900">{data.nama}</p>
        <span className="mt-1.5 w-fit text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-700">
          {data.paket}
        </span>
      </div>

      <div className="w-px self-stretch bg-slate-100 flex-shrink-0" />

      {/* Tanggal */}
      <div className="flex flex-col flex-[1.3] px-6">
        <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest mb-1">Tanggal</span>
        <p className="text-[15px] font-bold text-slate-900">{data.tanggal}</p>
        <p className="text-[13px] text-slate-500 mt-0.5">{data.waktu}</p>
      </div>

      <div className="w-px self-stretch bg-slate-100 flex-shrink-0" />

      {/* Harga */}
      <div className="flex flex-col flex-[1.5] px-6">
        <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest mb-1">
          Total
        </span>

        <p className="text-[15px] font-bold text-slate-900">
          Rp {Number(data.harga).toLocaleString("id-ID")}
        </p>

        <p className="text-[13px] text-slate-500 mt-0.5">
          {data.metode}
        </p>

      </div>

      <div className="w-px self-stretch bg-slate-100 flex-shrink-0" />

      {/* STATUS */}
      <div className="flex flex-col flex-[1.3] px-6">
        <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest mb-3">
          Status
        </span>

        {data.payment_status === "pending" && (
          <span className="w-fit px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 text-[12px] font-bold">
            🟡 Menunggu
          </span>
        )}

        {data.payment_status === "confirmed" && (
          <span className="w-fit px-3 py-1 rounded-full bg-green-100 text-green-700 text-[12px] font-bold">
            🟢 Berhasil
          </span>
        )}

        {data.payment_status === "rejected" && (
          <span className="w-fit px-3 py-1 rounded-full bg-red-100 text-red-700 text-[12px] font-bold">
            🔴 Ditolak
          </span>
        )}
      </div>
    </div>
  );
}