"use client";

import React, { useState } from 'react'
import Image from 'next/image'
import { useRouter } from "next/navigation";
import {saveToken, saveRole, saveRefreshToken, saveUser,} from "@/lib/auth/auth";

export default function AdminLogin() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await fetch("https://web-production-71d3b8.up.railway.app/api/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        saveToken(data.access);
        saveRefreshToken(data.refresh);
        saveRole(data.role);
        saveUser({
          username: data.username,
          role: data.role,
        });
        alert("Login berhasil");
        router.push("/admin/adminHome");
      } else {
        alert(data.message);
      }

    } catch (error) {
      console.error(error);
      alert("Server error");
    }
  };

  return (
    <div className='w-full h-screen flex flex-col items-center justify-between bg-white'>
    
      <div className='w-120 flex flex-col gap-5 items-center mt-10 justify-between'>
        <Image 
          src="/assets/image/logo.png"
          width={200}
          height={200}
          alt="Logo"
        /> 
        
          <div className='flex flex-col gap-4  '>
          <p className='text-blue-900 font-bold h-2 text-sm ml-2'>Username</p>
          <input 
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className='w-120 h-13 p-2 pl-3 border-2 text-blue-900 border-blue-900 rounded-2xl'
            placeholder='Masukkan username'
          />
          </div>

          <div className='flex flex-col gap-4  '>
          <p className='text-blue-900 font-bold h-2 text-sm ml-2'>Password</p>
          <input 
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='w-120 h-13 p-2 pl-3 border-2 text-blue-900 border-blue-900 rounded-2xl'
            placeholder='Masukkan password'
          />
          </div>

          <div className='w-120 flex flex-row justify-between '>
            <button className='hover:underline w-50 text-left -mt-5 italic text-blue-800 text-[8px]'>
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