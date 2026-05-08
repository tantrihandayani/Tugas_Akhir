"use client";

import React from 'react'
import Image from 'next/image'
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const router = useRouter();

  const handleLogin = () => {
    // nanti bisa ditambah validasi login di sini
    router.push("/admin/adminHome");
  };

  return (
    <div className='w-full h-screen flex flex-col items-center justify-between bg-white'>
      
      <div className='w-120 flex flex-col gap-4 items-center mt-10 justify-between'>
        <Image 
          src="/assets/image/logo.png"
          width={200}
          height={200}
          alt="Logo"
        /> 
        
        <p className='text-blue-900 font-bold h-2 text-sm mr-92'>Username/Email</p>
        <input 
          type="text"
          className='w-120 h-13 p-2 pl-3 border-2 text-blue-900 border-blue-900 rounded-2xl placeholder:italic '
          placeholder='Masukkan email atau username'
        />
         
        <p className='text-blue-900 font-bold h-2 text-sm pr-102'>Password</p>
        <input 
          type="password"
          className='w-120 h-13 p-2 pl-3 border-2 text-blue-900 border-blue-900 rounded-2xl placeholder:italic '
          placeholder='Masukkan password'
        />

        <div className='w-120 flex flex-row justify-between '>
          <button className='hover:underline w-50 text-left italic text-blue-800 text-[8px]'>
            Hubungi admin jika lupa akun!
          </button>

          <button 
            className='w-30 rounded-lg font-bold bg-blue-900 text-center hover:bg-blue-700 text-white'
            onClick={handleLogin}
          > 
            LOGIN
          </button>
        </div>
      </div>
    </div>
  )
}