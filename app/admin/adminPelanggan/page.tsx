"use client";

import React from 'react'
import Image from 'next/image'
import { useState, useEffect } from 'react';
import Navbar from '@/component/navbar'
import Pelanggan from '@/component/pelanggan'
import { getToken } from "@/lib/auth/auth";
import { PelangganType } from "@/type/pelangganType";
import CustomerDetail from "@/component/customer/CustomerDetail";
import CustomerCard from "@/component/customer/CustomerCard";
import CustomerHeader from "@/component/customer/CustomerHeader";



const page = () => {

  const [customers, setCustomers] = useState<PelangganType[]>([]);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("az");
  const [selectedCustomer, setSelectedCustomer] = useState<PelangganType | null>(null);


  const getCustomer = async () => {
    try {
        const token = getToken();

        const res = await fetch("http://127.0.0.1:8000/api/customer/", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        const data = await res.json();

        console.log("==================");
        console.log("STATUS", res.status);
        console.log("DATA", data);
        console.log("==================");

        // pastikan yang disimpan selalu array
        const customerData = Array.isArray(data)
            ? data
            : Array.isArray(data.data)
            ? data.data
            : [];

        setCustomers(customerData);

        if (customerData.length > 0) {
            setSelectedCustomer(customerData[0]);
        } else {
            setSelectedCustomer(null);
        }
    } catch (err) {
        console.error(err);
        setCustomers([]);
        setSelectedCustomer(null);
    }
};

useEffect(()=>{
    getCustomer();
},[]);

const filteredCustomers = [...customers]
.filter((customer) =>
    customer.username
        .toLowerCase()
        .includes(search.toLowerCase())
)
.sort((a, b) => {
    switch (sortBy) {
        case "az":
            return a.username.localeCompare(b.username);
        case "za":
            return b.username.localeCompare(a.username);
        case "booking":
            return b.total_booking - a.total_booking;
        case "spending":
            return b.total_transaksi - a.total_transaksi;
        default:
            return 0;
    }
});

  return (
   <div className="flex h-screen overflow-hidden bg-white">

    <Navbar />

    <div className="flex flex-1 flex-col overflow-hidden">
        <CustomerHeader
            search={search}
            setSearch={setSearch}
            sortBy={sortBy}
            setSortBy={setSortBy}
        />
        <div className="flex-1 overflow-y-auto bg-[#F4F7FE] p-6 lg:p-8">

    <div className="flex flex-col lg:flex-row gap-6 items-start">

        {/* Customer List */}

        <div className="w-full lg:basis-[35%] lg:max-w-[420px] lg:min-w-[360px] flex flex-col gap-3 overflow-y-auto lg:max-h-[calc(100vh-180px)] pr-1">

            {filteredCustomers.map((item) => (
                <CustomerCard
                    key={item.id}
                    customer={item}
                    active={selectedCustomer?.id === item.id}
                    onClick={() => setSelectedCustomer(item)}
                />
            ))}

        </div>

        {/* Customer Detail */}

        <div className="flex-1 lg:basis-[65%] min-w-0">

            <CustomerDetail customer={selectedCustomer} />

        </div>

    </div>

</div>
    </div>
   </div>
  )
}

export default page



