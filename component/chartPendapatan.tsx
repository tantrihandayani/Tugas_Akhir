"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  LineChart,
  Line,
  ComposedChart,
} from "recharts";

type Props = {
  data: {
    bulan: string;
    pendapatan: number;
    movingAverage: number;
  }[];
};

const formatRupiah = (value: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
};

const ChartPendapatan = ({ data }: Props) => {
  return (
    <div className="w-full h-[500px] bg-white rounded-3xl p-6 shadow-lg"> 
      <h1 className="text-3xl font-bold text-slate-800 mb-2">
        Laporan Pendapatan
      </h1>

      <p className="text-slate-500 mb-8">
        Grafik pendapatan dan Moving Average
      </p>

      <ResponsiveContainer width="100%" height="80%">
        <ComposedChart data={data}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />

          <XAxis dataKey="bulan" />

          <YAxis tickFormatter={(value) => `Rp ${value / 1000}k`} />

          <Tooltip
            formatter={(value) => formatRupiah(Number(value))}
          />

          <Bar
            dataKey="pendapatan"
            fill="#2563eb"
            radius={[10, 10, 0, 0]}
          />

          <Line
            type="monotone"
            dataKey="movingAverage"
            stroke="#ef4444"
            strokeWidth={4}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ChartPendapatan;