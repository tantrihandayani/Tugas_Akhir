"use client";

import { useRouter } from "next/navigation";
import AdminLogin from "./admin/adminLogin";

export default function Page() {
  const router = useRouter();

  const handleLogin = () => {
    // nanti bisa ditambah validasi
    router.push("/admin");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#eff3ff]">
      <AdminLogin onLogin={handleLogin} />
    </div>
  );
}