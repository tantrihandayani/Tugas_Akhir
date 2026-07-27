  "use client";

  import React from 'react'
  import Image from 'next/image'
  import { useState, useEffect } from 'react';
  import Navbar from '@/component/navbar'
  import Card from '@/component/layanan';
  import AddKategori from "@/component/addKategori";
  import type { Layanan } from "@/type/layananType";

  const page = () => {

    const [openTambah, setOpenTambah] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [selectedData, setSelectedData] = useState<Layanan | null>(null);
    const [showConfirm, setShowConfirm] = useState(false);
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const [search, setSearch] = useState("");
    const [dataLayanan, setDataLayanan] = useState<Layanan[]>([]);

    useEffect(() => {
      fetch("http://127.0.0.1:8000/api/layanan/")
        .then((res) => res.json())
        .then((data) => {
          setDataLayanan(data);
        })
        .catch((err) => console.error("Error fetch:", err));
    }, []);

    const handleAdd = async (formData: FormData) => {
      for (let pair of formData.entries()) {
        console.log(pair[0], pair[1]);
      }
      try {
        const res = await fetch("http://127.0.0.1:8000/api/layanan/", {
          method: "POST",
          body: formData,
        });
        const data: Layanan = await res.json();
        console.log(data);
        setDataLayanan((prev) => [...prev, data]);
      } catch (err) {
        console.error(err);
      }
    };

  const handleUpdate = async (formData: FormData) => {
    const id = selectedData?.id;
    const res = await fetch(
      `http://127.0.0.1:8000/api/layanan/${id}/`,
      {
        method: "PUT",
        body: formData,
      }
    );
    const data: Layanan = await res.json();
    setDataLayanan((prev) =>
      prev.map((item) =>
        item.id === data.id ? data : item
      )
    );
  };

  const handleDelete = (id: number) => {
    setSelectedId(id);
    setShowConfirm(true);
  };

  const confirmDelete = async () => {
    await fetch(`http://127.0.0.1:8000/api/layanan/${selectedId}/`, {
      method: "DELETE",
    });

    const filtered = dataLayanan.filter((item) => item.id !== selectedId);
    setDataLayanan(filtered);
    setShowConfirm(false);
  };


  const cancelDelete = () => {
    setShowConfirm(false);
    setSelectedId(null);
  };

    return (
      <div className='h-150 flex flex-row bg-white overflow-hidden'> 
        
        <Navbar />

        <div className='w-full flex flex-col'>

          {/* HEADER */}
          <div className='w-full h-15 flex flex-row mt-5 justify-between px-5'>
            <h1 className='font-extrabold text-2xl text-[#2A4AA1]'>
              Menu Layanan
            </h1>
            <div className='flex h-13 flex-row gap-2 text-white'>
              <button className='flex items-center justify-center gap-2 w-40 h-10 bg-[#2A4AA1] rounded-lg ml-80'>
                <Image
                  src="/assets/image/search.png"
                  className='w-7 h-7'
                  width={25}
                  height={25}
                  alt='logo'
                />
                <input
                  type="text"
                  placeholder="Cari Kategori..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="bg-transparent outline-none text-white placeholder:text-white/70 w-full "
                />
              </button>

              <button 
                onClick={() => setOpenTambah(true)}
                className='flex items-center justify-center w-45 h-10 bg-[#2A4AA1] rounded-lg'
              >
                <Image
                  src="/assets/image/add.png"
                  className='w-7 h-7'
                  width={25}
                  height={25}
                  alt='logo'
                />
                <p className='font-bold text-[15px]'>Tambah Kategori</p>
              </button>
            </div> 
          </div>

          {/* CONTAINER BIRU */}
          <div className='w-full bg-[#D4E0FF] flex flex-col h-full'>

            {/* KATEGORI (tidak ikut scroll) */}
            <div className='w-full flex flex-row gap-3 px-2 py-3  text-center justify-between overflow-x-auto'>
              <button className='w-55 h-10 bg-white rounded-lg py-2'>
                <p className='font-bold text-xl text-[#FFA550]'>Self Photo</p>
              </button>
              <button className='w-55 h-10 bg-white rounded-lg py-2'>
                <p className='font-bold text-xl text-[#FFA550]'>Photo Box</p>
              </button>
              <button className='w-55 h-10 bg-white rounded-lg py-2'>
                <p className='font-bold text-xl text-[#FFA550]'>Theater Studio</p>
              </button>
              <button className='w-55 h-10 bg-white rounded-lg py-2'>
                <p className='font-bold text-xl text-[#FFA600]'>Photo Session</p>
              </button>
            </div>

            {/* CARD (INI YANG SCROLL) */}
            <div className='flex-1 overflow-y-auto '>
              <div className='grid grid-cols-4 gap-5 px-5 py-5 mb-20'>
                {dataLayanan
                  .filter((item) =>
                    item.title.toLowerCase().includes(search.toLowerCase())
                  )
                  .map((item) => (
                    <Card
                      key={item.id}
                      {...item}
                      onEdit={(item) => {
                        setSelectedData(item);
                        setOpenEdit(true);
                      }}
                      onDelete={handleDelete}
                    />
                ))}
              </div>
              {showConfirm && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                  <div className="bg-white p-6 rounded-xl w-80 text-center">
                    
                    <p className="text-[#002381] font-semibold mb-4">
                      Apakah Anda yakin ingin menghapus?
                    </p>

                    <div className="flex justify-center gap-3">
                      <button
                        onClick={cancelDelete}
                        className="px-4 py-2 border border-[#002381] rounded-lg text-[#002381]"
                      >
                        Batal
                      </button>

                      <button
                        onClick={confirmDelete}
                        className="px-4 py-2 bg-red-500 text-white rounded-lg"
                      >
                        Ya, Hapus
                      </button>
                    </div>

                  </div>
                </div>
              )}
            </div>

          </div>
        </div>
        <AddKategori 
          isOpen={openTambah} 
          onClose={() => setOpenTambah(false)} 
          mode="tambah"
          onSubmit={handleAdd}
        />

        <AddKategori 
          isOpen={openEdit} 
          onClose={() => {
            setOpenEdit(false);
            setSelectedData(null);
          }} 
          mode="edit"
          data={selectedData}
          onSubmit={handleUpdate}
        />
      </div>
    )
  }

  export default page