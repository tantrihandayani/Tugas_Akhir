
"use client";

import React, { useState } from 'react'
import Image from 'next/image'
import { useRouter } from "next/navigation";
import {saveToken,saveRefreshToken,saveRole,} from "@/lib/auth/auth";

export default function CustomerLogin() {

  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {

    try {

      const res = await fetch("https://web-production-71d3b8.up.railway.app/api//login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const data = await res.json();
      console.log(data);

      if (res.ok) {

        saveToken(data.access);
        saveRefreshToken(data.refresh);
        saveRole(data.role);

        alert("Login berhasil");

        if (data.role === "admin") {
          router.push("/admin/adminHome");
        } else {
          router.push("/");
        }

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

      <div className='w-120 flex flex-col gap-4 items-center mt-10 justify-between'>

        <Image
          src="/assets/image/logo.png"
          width={200}
          height={200}
          alt="Logo"
        />

        <p className='text-blue-900 font-bold h-2 text-sm mr-92'>
          Username
        </p>

        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className='w-120 h-13 p-2 pl-3 border-2 text-blue-900 border-blue-900 rounded-2xl'
          placeholder='Masukkan username'
        />

        <p className='text-blue-900 font-bold h-2 text-sm pr-102'>
          Password
        </p>

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className='w-120 h-13 p-2 pl-3 border-2 text-blue-900 border-blue-900 rounded-2xl'
          placeholder='Masukkan password'
        />

        <div className='w-120 flex flex-row justify-between items-center'>
        <div className='flex flex-row  w-50 text-left italic text-blue-800 text-[10px]'>
          <p className=''>Belum punya akun? </p>
          <button
            className='font-extrabold hover:underline'
            onClick={() => router.push("/register")}
          >
            Register
          </button>
        </div>
          <button
            className='w-30 h-10 rounded-lg font-bold bg-blue-900 text-center hover:bg-blue-700 text-white'
            onClick={handleLogin}
          >
            LOGIN
          </button>

        </div>
      </div>
    </div>
  );
}

