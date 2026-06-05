import Image from "next/image";
import Link from "next/link";
export default function Navbar() {
    return (
        <div className='w-64 md:w-70 min-h-screen bg-[#2A4AA1] rounded-r-lg text-white flex flex-col'>
                <div className='flex items-center justify-between px-4 pt-5'>
                  <Image 
                  src="/assets/image/profile.png"
                  width={50}
                  height={50}
                  alt='Logo Profile'
                  />
        
                  <div className='ml-2 mt-1  '>
                    <p className='font-bold'>Tantri Handayani</p>
                    <p className='text-[10px]'>Admin 1</p>
                  </div>
                  <button className='ml-10 mb-3'>
                  <Image
                  src="/assets/image/edit.png"
                  width={20}
                  height={20}
                  alt='edit' />
                  </button>
                  <div>
        
                  </div>
                  
                </div>
                <div className='border-t-2 mt-5 flex flex-col gap-4 items-center justify-center'>
                  <Link href="/admin/adminHome">
                  <button className='mt-10 w-45 h-8 border border-black rounded-md  shadow-md shadow-blue-950  hover:shadow-lg hover:scale-105 transition duration-300'>
                    Dashboard
                  </button>
                  </Link>

                  <Link href="/admin/adminBooking">
                  <button className='w-45 h-8 border border-black rounded-md  shadow-md shadow-blue-950 hover:shadow-lg hover:scale-105 transition duration-300'>
                    Menu Booking
                  </button>
                  </Link>

                  <Link href="/admin/adminPelanggan">
                  <button className='w-45 h-8 border border-black rounded-md  shadow-md shadow-blue-950 hover:shadow-lg hover:scale-105 transition duration-300'>
                    Menu Pelanggan
                  </button>
                  </Link>

                  <Link href="/admin/adminLayanan">
                  <button className='w-45 h-8 border border-black rounded-md  shadow-md shadow-blue-950 hover:shadow-lg hover:scale-105 transition duration-300'>
                    Menu Layanan
                  </button>
                  </Link>

                  <Link href="/admin/adminTransaksi">
                  <button className='w-45 h-8 border border-black rounded-md  shadow-md shadow-blue-950 hover:shadow-lg hover:scale-105 transition duration-300'>
                    Menu Transaksi
                  </button>
                  </Link>

                  <Link href="/admin/laporanPendapatan">
                  <button className='w-45 h-8 border border-black rounded-md  shadow-md shadow-blue-950 hover:shadow-lg hover:scale-105 transition duration-300'>
                    Laporan Pendapatan
                  </button>
                  </Link>

                  <Link href="/admin/adminPengaturan">
                  <button className='w-45 h-8 border border-black rounded-md  shadow-md shadow-blue-950 hover:shadow-lg hover:scale-105 transition duration-300'>
                    Pengaturan
                  </button>
                  </Link>

                  <Link href="/admin/login">
                  <button className='w-45 h-8 border-2 border-white font-bold rounded-md  shadow-md  hover:scale-105 transition duration-300 mt-15'>
                    Logout
                  </button>
                  </Link>
                </div>
              </div>
    );
}