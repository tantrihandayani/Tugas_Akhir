"use client";

import { useState, useEffect } from "react";

export default function AddKategori({ isOpen, onClose, mode = "tambah", data }) {

  const [image, setImage] = useState<string | null>(null);
  const [nama, setNama] = useState("");
  const [harga, setHarga] = useState("");
  const [waktu, setWaktu] = useState("");
  const [desc, setDesc] = useState("");



    const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    setImage(imageUrl);
    };

    useEffect(() => {
    return () => {
        if (image) URL.revokeObjectURL(image);
    };
    }, [image]);

    useEffect(() => {
    if (mode === "edit" && data) {
        setNama(data.title);
        setHarga(data.price);
        setWaktu(data.duration);
        setDesc(data.desc);
        setImage(data.image);
    }
    }, [data, mode]);

    useEffect(() => {
    if (!isOpen) {
        setNama("");
        setHarga("");
        setWaktu("");
        setDesc("");
        setImage(null);
    }
    }, [isOpen]);

  if (!isOpen) return null;

    

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      
      <div className="bg-white w-[500px] rounded-2xl p-6 relative">
        {/* CLOSE */}
        <button 
          onClick={onClose}
          className="absolute top-3 right-3 bg-[#002381] w-8 h-8 rounded-full text-white flex items-center justify-center"
        >
          ✕
        </button>
        {/* UPLOAD */}
        <div className="border-2 border-dashed border-gray-400 rounded-xl h-40 flex items-center justify-center mb-5">
          {image ? (
            <img 
            src={image} 
            alt="preview" 
            className="w-full h-full object-cover rounded-xl"
            />
          ) : (
            <div className="flex flex-col items-center gap-2">
            <input 
                type="file" 
                accept="image/*"
                onChange={handleImageChange}
                className="border w-60 border-[#002381] p-2 rounded-md"
            />
            <p className="text-sm font-semibold text-[#002381]">
                Tambahkan Gambar Kategori
            </p>
            </div>
          )}

</div>

        {/* INPUT */}
        <div className="flex flex-col gap-3">

          <div>
            <p className="text-[#002381] text-sm font-semibold mb-1">Nama Kategori</p>
            <input 
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            placeholder="Masukan Nama Kategori"
            className="w-full p-2 placeholder:text-black/20 placeholder:italic placeholder:text-sm text-[#002381] rounded-lg bg-[#AFCBFF] shadow-md outline-none"
            />
          </div>

          <div className="flex gap-3">
            <input 
            value={harga}
            onChange={(e) => setHarga(e.target.value)}
            placeholder="Harga"
            className="w-full p-2 placeholder:text-black/20 placeholder:italic placeholder:text-sm text-[#002381] rounded-lg bg-[#AFCBFF] shadow-md outline-none"
            />

            <input 
            value={waktu}
            onChange={(e) => setWaktu(e.target.value)}
            placeholder="Waktu"
            className="w-full p-2 placeholder:text-black/20 placeholder:italic placeholder:text-sm text-[#002381] rounded-lg bg-[#AFCBFF] shadow-md outline-none"
            />
          </div>

          <textarea 
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            placeholder="Deskripsi"
            className="w-full p-2 placeholder:text-black/20 placeholder:italic placeholder:text-sm text-[#002381] rounded-lg bg-[#AFCBFF] shadow-md outline-none"
            />

        </div>

        {/* ACTION */}
        <div className="flex justify-between items-center mt-5">

          <div className="flex gap-2">
            <button className="px-4 py-1 bg-green-200 rounded-full text-[#002381] font-semibold">
              ● Aktif
            </button>
            <button className="px-4 py-1 border border-[#002381] rounded-full text-[#002381] font-semibold">
              ● Non Aktif
            </button>
          </div>

          <button className="px-5 py-2 bg-[#002381] text-white rounded-lg">
            {mode === "edit" ? "UPDATE" : "SIMPAN"}
          </button>

        </div>

      </div>

      
    </div>
  );
}