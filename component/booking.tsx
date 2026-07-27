import { BookingType } from "@/type/bookingType";
import {
    FiClock,
    FiChevronRight,
    FiCreditCard,
    FiCheckCircle,
    FiLoader,
    FiCamera,
} from "react-icons/fi";

type Props = BookingType & {
    className?: string;
};

export default function Booking({
    date,
    nama,
    package_name,
    payment_method,
    booking_status,
    time,
    className,
}: Props) {

    const statusConfig =
    {
        waiting: {
            label: "Waiting",
            bg: "bg-amber-50",
            text: "text-amber-600",
            border: "border-amber-200",
            icon: (
                <span className="h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
            ),
        },
        progress: {
            label: "On Progress",
            bg: "bg-sky-50",
            text: "text-sky-600",
            border: "border-sky-200",
            icon: <FiLoader size={12} className="animate-spin" />,
        },
        finished: {
            label: "Finished",
            bg: "bg-emerald-50",
            text: "text-emerald-600",
            border: "border-emerald-200",
            icon: <FiCheckCircle size={12} />,
        },
    }[booking_status] ?? {
        label: "Unknown",
        bg: "bg-slate-100",
        text: "text-slate-600",
        border: "border-slate-200",
        icon: <FiClock size={12} />,
    };

    return (

        <div className={`w-full ${className}`}>
            <div className="group relative overflow-hidden rounded-2xl border border-[#D8E3FF] bg-white shadow-[0_10px_28px_rgba(42,74,161,0.10)] transition-all duration-300 hover:-translate-y-1 hover:border-[#2A4AA1] hover:shadow-[0_18px_42px_rgba(42,74,161,0.18)]">

                {/* Accent */}
                <div className="h-1 bg-gradient-to-r from-[#2A4AA1] via-[#4D74E8] to-[#82A3FF]" />
                <div className="flex flex-col gap-3 p-4 md:flex-row md:items-center md:gap-6">

                    {/* TIME */}
                    <div className="flex min-w-fit items-center gap-3 rounded-xl bg-gradient-to-br from-[#2A4AA1] to-[#5B7DF3] px-4 py-3 text-white shadow-[0_8px_18px_rgba(42,74,161,.35)] transition-all duration-300 group-hover:scale-[1.03]">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/20">
                            <FiClock size={18} />
                        </div>
                        <div>
                            <p className="text-sm font-black">
                                {time}
                            </p>
                            <p className="text-[11px] text-blue-100">
                                {date}
                            </p>
                        </div>
                    </div>

                    {/* DATA */}
                    <div className="flex flex-1 flex-col justify-center gap-2">
                        <div>
                            <h2 className="text-xl font-black tracking-tight text-[#2A4AA1]">
                                {nama}
                            </h2>
                            <div className="mt-2 flex flex-wrap items-center gap-2">
                                <div className="flex items-center gap-1 rounded-full bg-[#EEF4FF] px-3 py-1 text-xs font-semibold text-[#2A4AA1]">
                                    <FiCamera size={12} />
                                    {package_name}
                                </div>
                                <div className="flex items-center gap-1 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-600">
                                    <FiCreditCard size={12} />
                                    {payment_method?.toUpperCase()}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* STATUS */}
                    <div className="flex shrink-0 items-center gap-3">
                        <div
                            className={`flex items-center gap-2 rounded-full border px-3 py-2 text-xs font-bold transition-all duration-300 group-hover:scale-105 ${statusConfig?.bg} ${statusConfig?.text} ${statusConfig?.border}`}
                        >
                            {statusConfig?.icon}
                            <span>
                                {statusConfig?.label}
                            </span>
                        </div>
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EEF4FF] text-[#2A4AA1] transition-all duration-300 group-hover:translate-x-1 group-hover:bg-[#2A4AA1] group-hover:text-white">
                            <FiChevronRight size={18} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}