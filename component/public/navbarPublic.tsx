"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { getToken, logout } from "@/lib/auth/auth";
import { useEffect, useState } from "react";
import LoginRequiredModal from "@/component/modal/loginRequiredModal";

export default function NavbarPublic() {

  const router = useRouter();

  const [isLogin, setIsLogin] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const [username, setUsername] = useState("");
  const [openLoginModal, setOpenLoginModal] = useState(false);

  useEffect(() => {
    const token = getToken();
    if (token) {
      setIsLogin(true);
      fetch(
        "https://web-production-71d3b8.up.railway.app/api//profile/",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          setUsername(data.username || "Customer");
        })
        .catch(console.error);
    }
  }, []);

  const handleBookingClick = () => {
    const token = getToken();

    if (!token) {
      setOpenLoginModal(true);
      return;
    }

    router.push("/booking");
  };
  

  return (
    <div className="w-full h-24 bg-[#FFF9F0] border-b-[5px] border-black px-6 md:px-10 flex items-center justify-between sticky top-0 z-50">

  {/* LEFT */}
  <div className="flex items-center gap-4">

    <div className="w-16 h-16 bg-[#C6B6FF] border-[4px] border-black rounded-2xl shadow-[4px_4px_0px_0px_#000] flex items-center justify-center rotate-[-4deg]">

      <Image
        src="/assets/image/logo.png"
        width={45}
        height={45}
        alt="Logo"
      />

    </div>
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-black">
            STUDIO IBU
          </h1>

          <p className="font-bold text-sm text-gray-700">
            Self Photo Studio ✨
          </p>
        </div>
      </div>

      {/* MENU */}
      <div className="hidden lg:flex items-center gap-6">

        <button
          className="px-5 py-2 bg-[#F7F48B] border-[3px] border-black rounded-full font-black text-[#002381] shadow-[3px_3px_0px_0px_#000] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
        >
          BERANDA
        </button>

        <button
          onClick={() => router.push("/layanan")}
          className="px-5 py-2 bg-[#C7F0E9] border-[3px] border-black rounded-full font-black text-[#002381] shadow-[3px_3px_0px_0px_#000] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
        >
          LAYANAN
        </button>

        <button
          onClick={handleBookingClick}
          className="px-5 py-2 bg-[#FFB8E0] border-[3px] border-black rounded-full font-black text-[#002381] shadow-[3px_3px_0px_0px_#000] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
        >
          BOOKING
        </button>

      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-4">
        <div className="relative">
          {!isLogin ? (
            <button
              onClick={() => router.push("/login")}
              className="px-6 py-3 bg-[#002381] text-white font-black rounded-2xl border-[4px] border-black shadow-[5px_5px_0px_0px_#000] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
            >
              SIGN IN ✨
            </button>

          ) : (

            <>
              <button
                onClick={() => setOpenProfile(!openProfile)}
                className="flex items-center gap-3 px-4 py-2 bg-[#C6B6FF] border-[4px] border-black rounded-2xl shadow-[5px_5px_0px_0px_#000] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
              >
                <div className="w-10 h-10 rounded-full bg-white border-[2px] border-black flex items-center justify-center font-black text-lg">
                  {username?.charAt(0).toUpperCase()}
                </div>

                <div className="text-left">
                  <p className="font-black text-black">
                    {username}
                  </p>

                  <p className="text-xs font-bold text-[#002381]">
                    Customer
                  </p>
                </div>
              </button>

              {openProfile && (
                <div className="absolute right-0 top-20 w-60 bg-white border-[4px] border-black rounded-3xl shadow-[6px_6px_0px_0px_#000] overflow-hidden">
                  <div className="flex items-center gap-3 px-5 py-4 bg-[#FFF9F0] border-b-[3px] border-black">
                    <div className="w-12 h-12 rounded-full bg-[#C6B6FF] border-[3px] border-black flex items-center justify-center font-black text-xl">
                      {username?.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-black">
                        {username}
                      </p>
                      <p className="text-xs font-bold text-gray-500">
                        Customer
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setOpenProfile(false);
                      router.push("/profile");
                    }}
                    className="w-full text-left px-5 py-4 font-bold hover:bg-pink-100 transition"
                  >
                    🎀 My Profile
                  </button>
                  <button
                    onClick={() => {
                      setOpenProfile(false);
                      router.push("/booking");
                    }}
                    className="w-full text-left px-5 py-4 font-bold hover:bg-yellow-100 transition"
                  >
                    📸 Booking
                  </button>
                  <button
                    onClick={() => {
                      logout();
                      window.location.href = "/";
                    }}
                    className="w-full text-left px-5 py-4 font-bold text-red-500 hover:bg-red-100 transition"
                  >
                    🚪 Logout
                  </button>
                </div>
              )}
            </>
          )}
        </div>

      </div>
      <LoginRequiredModal
        isOpen={openLoginModal}
        onClose={() => setOpenLoginModal(false)}
      />
    </div>
  );
}