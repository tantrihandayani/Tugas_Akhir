"use client";

import { useState, useEffect } from "react";

export default function AddKategori({ isOpen, onClose, mode = "tambah", data, onSubmit }) {

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [nama, setNama] = useState("");
  const [harga, setHarga] = useState("");
  const [waktu, setWaktu] = useState("");
  const [description, setDescription] = useState("");



    const handleImageChange = (e) => {
      const file = e.target.files?.[0];
      if (!file) return;

      setImageFile(file);

      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    };

    useEffect(() => {
      return () => {
        if (imagePreview?.startsWith("blob:")) {
          URL.revokeObjectURL(imagePreview);
        }
      };
    }, [imagePreview]);

    useEffect(() => {
    if (mode === "edit" && data) {
        setNama(data.title);
        setHarga(data.price);
        setWaktu(data.duration);
        setDescription(data.description);
        setImagePreview(`http://127.0.0.1:8000${data.image}`);
    }
    }, [data, mode]);

    useEffect(() => {
    if (!isOpen) {
        setNama("");
        setHarga("");
        setWaktu("");
        setDescription("");
        setImagePreview(null);
        setImageFile(null);
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
          {imagePreview ? (
            <div className="flex items-center gap-3 w-full h-full">
              <img 
                src={imagePreview} 
                alt="preview" 
                className="w-32 h-32 object-cover rounded-xl"
              />

              <input 
                type="file" 
                accept="image/*"
                onChange={handleImageChange}
                className="border w-40 border-[#002381] p-2 rounded-md"
              />
            </div>
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
            value={harga || ""}
            onChange={(e) => setHarga(e.target.value)}
            placeholder="Harga"
            className="w-full p-2 placeholder:text-black/20 placeholder:italic placeholder:text-sm text-[#002381] rounded-lg bg-[#AFCBFF] shadow-md outline-none"
            />

            <input 
            value={waktu || ""}
            onChange={(e) => setWaktu(e.target.value)}
            placeholder="Waktu"
            className="w-full p-2 placeholder:text-black/20 placeholder:italic placeholder:text-sm text-[#002381] rounded-lg bg-[#AFCBFF] shadow-md outline-none"
            />
          </div>

          <textarea 
            value={description}
            onChange={(e) => setDescription(e.target.value)}
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

          <button
            onClick={() => {

              const formData = new FormData();

              formData.append("title", nama);
              formData.append("description", description);
              formData.append("price", Number(harga).toString());
              formData.append("duration", waktu);

              if (imageFile) {
                formData.append("image", imageFile);
              }

              onSubmit(formData);
              onClose();
            }}
            className="px-5 py-2 bg-[#002381] text-white rounded-lg"
          >
            {mode === "edit" ? "UPDATE" : "SIMPAN"}
          </button>

        </div>

      </div>

      
    </div>
  );
}