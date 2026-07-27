"use client";

import Navbar from "@/component/navbar";
import { FiSave, FiClock, FiUser, FiHome } from "react-icons/fi";
import { useState } from "react";

export default function AdminPengaturan() {

    const [studio, setStudio] = useState({
        nama: "Studio IBU",
        email: "studioibu@gmail.com",
        phone: "081234567890",
        alamat: "Desa Gadel, Tukdana, Indramayu",
        deskripsi: "Studio Self Photo & Photo Box"
    });

    const [jam, setJam] = useState({
        buka: "08:00",
        tutup: "21:00"
    });

    return (
        <div className="flex min-h-screen bg-slate-100">

            <Navbar />

            <main className="flex-1 p-8 overflow-y-auto">

                <div className="mb-8">

                    <h1 className="text-4xl font-black text-[#2A4AA1]">
                        Pengaturan
                    </h1>

                    <p className="text-slate-500 mt-2">
                        Kelola informasi studio dan akun administrator.
                    </p>

                </div>

                <div className="grid gap-6">

                    {/* Studio */}

                    <div className="bg-white rounded-2xl shadow-sm border border-slate-200">

                        <div className="flex items-center gap-3 p-6 border-b">

                            <FiHome className="text-2xl text-[#2A4AA1]" />

                            <h2 className="font-bold text-xl">
                                Informasi Studio
                            </h2>

                        </div>

                        <div className="grid grid-cols-2 gap-5 p-6">

                            <div>

                                <label className="text-sm font-semibold">
                                    Nama Studio
                                </label>

                                <input
                                    value={studio.nama}
                                    onChange={(e)=>setStudio({...studio,nama:e.target.value})}
                                    className="mt-2 w-full rounded-xl border p-3 outline-none focus:border-[#2A4AA1]"
                                />

                            </div>

                            <div>

                                <label className="text-sm font-semibold">
                                    Email
                                </label>

                                <input
                                    value={studio.email}
                                    onChange={(e)=>setStudio({...studio,email:e.target.value})}
                                    className="mt-2 w-full rounded-xl border p-3 outline-none focus:border-[#2A4AA1]"
                                />

                            </div>

                            <div>

                                <label className="text-sm font-semibold">
                                    Nomor HP
                                </label>

                                <input
                                    value={studio.phone}
                                    onChange={(e)=>setStudio({...studio,phone:e.target.value})}
                                    className="mt-2 w-full rounded-xl border p-3 outline-none focus:border-[#2A4AA1]"
                                />

                            </div>

                            <div>

                                <label className="text-sm font-semibold">
                                    Alamat
                                </label>

                                <input
                                    value={studio.alamat}
                                    onChange={(e)=>setStudio({...studio,alamat:e.target.value})}
                                    className="mt-2 w-full rounded-xl border p-3 outline-none focus:border-[#2A4AA1]"
                                />

                            </div>

                            <div className="col-span-2">

                                <label className="text-sm font-semibold">
                                    Deskripsi
                                </label>

                                <textarea
                                    rows={4}
                                    value={studio.deskripsi}
                                    onChange={(e)=>setStudio({...studio,deskripsi:e.target.value})}
                                    className="mt-2 w-full rounded-xl border p-3 outline-none focus:border-[#2A4AA1]"
                                />

                            </div>

                        </div>

                    </div>

                    {/* Jam Operasional */}

                    <div className="bg-white rounded-2xl shadow-sm border border-slate-200">

                        <div className="flex items-center gap-3 p-6 border-b">

                            <FiClock className="text-2xl text-[#2A4AA1]" />

                            <h2 className="font-bold text-xl">
                                Jam Operasional
                            </h2>

                        </div>

                        <div className="grid grid-cols-2 gap-5 p-6">

                            <div>

                                <label>Jam Buka</label>

                                <input
                                    type="time"
                                    value={jam.buka}
                                    onChange={(e)=>setJam({...jam,buka:e.target.value})}
                                    className="mt-2 w-full rounded-xl border p-3"
                                />

                            </div>

                            <div>

                                <label>Jam Tutup</label>

                                <input
                                    type="time"
                                    value={jam.tutup}
                                    onChange={(e)=>setJam({...jam,tutup:e.target.value})}
                                    className="mt-2 w-full rounded-xl border p-3"
                                />

                            </div>

                        </div>

                    </div>

                    {/* Admin */}

                    <div className="bg-white rounded-2xl shadow-sm border border-slate-200">

                        <div className="flex items-center gap-3 p-6 border-b">

                            <FiUser className="text-2xl text-[#2A4AA1]" />

                            <h2 className="font-bold text-xl">
                                Administrator
                            </h2>

                        </div>

                        <div className="p-6 space-y-3">

                            <p>
                                Username :
                                <span className="font-semibold ml-2">
                                    admin
                                </span>
                            </p>

                            <p>
                                Role :
                                <span className="font-semibold ml-2">
                                    Administrator
                                </span>
                            </p>

                            <button className="mt-4 px-6 py-3 rounded-xl bg-[#2A4AA1] text-white font-semibold hover:bg-[#1F3B88]">

                                Ubah Password

                            </button>

                        </div>

                    </div>

                    <div className="flex justify-end">

                        <button className="flex items-center gap-2 bg-[#2A4AA1] text-white px-8 py-3 rounded-xl hover:bg-[#1F3B88]">

                            <FiSave />

                            Simpan Perubahan

                        </button>

                    </div>

                </div>

            </main>

        </div>
    );

}