import {
    FiHome,
    FiCalendar,
    FiUsers,
    FiImage,
    FiCreditCard,
    FiBarChart2,
    FiSettings,
} from "react-icons/fi";

export const adminMenus = [
    {
        name: "Dashboard",
        href: "/admin/adminHome",
        icon: FiHome,
    },
    {
        name: "Booking",
        href: "/admin/adminBooking",
        icon: FiCalendar,
    },
    {
        name: "Customer",
        href: "/admin/adminPelanggan",
        icon: FiUsers,
    },
    {
        name: "Layanan",
        href: "/admin/adminLayanan",
        icon: FiImage,
    },
    {
        name: "Transaksi",
        href: "/admin/adminTransaksi",
        icon: FiCreditCard,
    },
    {
        name: "Laporan",
        href: "/admin/laporanPendapatan",
        icon: FiBarChart2,
    },
    {
        name: "Pengaturan",
        href: "/admin/adminPengaturan",
        icon: FiSettings,
    },
];