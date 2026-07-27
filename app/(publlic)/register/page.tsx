"use client";

import React, { useState } from 'react'
import Image from 'next/image'
import { useRouter } from "next/navigation";

export default function RegisterPage() {

  const router = useRouter();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [nomorHp, setNomorHp] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {

    try {

      const res = await fetch("http://127.0.0.1:8000/api/register/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          nomor_hp: nomorHp,
          password,
        }),
      });

      const data = await res.json();

      if (res.ok) {
          alert("Register berhasil");
          router.push("/login");
      } else {
          console.log(data);

          const error =
              Object.values(data)
                  .flat()
                  .join("\n");

          alert(error);
      }
    } catch (error) {
      console.error(error);
      alert("Server error");
    }
  };

  return (
    <div className='w-full h-screen flex flex-col items-center justify-between bg-white'>
      <div className='w-120 flex flex-col gap-4 items-center -mt-5  justify-between'>
        <Image
          src="/assets/image/logo.png"
          width={200}
          height={200}
          alt="Logo"
        />
        <div className='flex flex-col gap-4'>
            <p className='text-blue-900 font-bold h-2 text-sm ml-2 '>
            Username
            </p>
            <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className='w-120 h-13 p-2 pl-3 border-2 text-blue-900 border-blue-900 rounded-2xl'
            placeholder='Masukkan username'
            />
        </div>
        <div className='flex flex-col gap-4'>
            <p className='text-blue-900 font-bold h-2 text-sm ml-2'>
            Email
            </p>

            <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='w-120 h-13 p-2 pl-3 border-2 text-blue-900 border-blue-900 rounded-2xl'
            placeholder='Masukkan email'
            />
        </div>

        <div className='flex flex-col gap-4'>
            <p className='text-blue-900 font-bold h-2 text-sm ml-2'>
                Nomor HP
            </p>
            <input
                type="text"
                value={nomorHp}
                onChange={(e) => setNomorHp(e.target.value)}
                className='w-120 h-13 p-2 pl-3 border-2 text-blue-900 border-blue-900 rounded-2xl'
                placeholder='Masukkan nomor hp'
            />
        </div>
        <div className='flex flex-col gap-4'>
            <p className='text-blue-900 font-bold h-2 text-sm ml-2'>
                Password
            </p>
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className='w-120 h-13 p-2 pl-3 border-2 text-blue-900 border-blue-900 rounded-2xl'
                placeholder='Masukkan password'
            />
        </div>

        <div className='w-120 flex flex-row justify-between items-center'>
        <div className='flex flex-row  w-50 text-left italic text-blue-800 text-[10px]'>
          <p>Sudah punya akun? </p>
          <button
            className='font-extrabold hover:underline'
            onClick={() => router.push("/login")}
          >
              Login
          </button>
        </div>

          <button
            className='w-30 h-10 rounded-lg font-bold bg-blue-900 text-center hover:bg-blue-700 text-white'
            onClick={handleRegister}
          >
            REGISTER
          </button>

        </div>
      </div>
    </div>
  );
}