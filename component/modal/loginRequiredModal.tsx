"use client";

import { useRouter } from "next/navigation";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginRequiredModal({
  isOpen,
  onClose,
}: Props) {

  const router = useRouter();

  if (!isOpen) return null;

  return (
    <div className="
      fixed
      inset-0
      bg-black/50
      flex
      items-center
      justify-center
      z-50
    ">

      <div className="
        w-[400px]
        bg-white
        border-4
        border-black
        rounded-[30px]
        p-8
        shadow-[8px_8px_0px_0px_#000]
        flex
        flex-col
        gap-6
      ">

        <h1 className="text-3xl font-black text-center">
          LOGIN REQUIRED
        </h1>

        <p className="text-center font-semibold text-gray-700">
          Silahkan login atau register terlebih dahulu
          untuk melakukan booking studio.
        </p>

        <div className="flex gap-4">

          <button
            onClick={() => router.push("/login")}
            className="
              flex-1
              h-12
              bg-[#002381]
              text-white
              font-black
              rounded-2xl
              border-4
              border-black
              shadow-[4px_4px_0px_0px_#000]
              hover:translate-x-1
              hover:translate-y-1
              hover:shadow-none
              transition-all
            "
          >
            LOGIN
          </button>

          <button
            onClick={() => router.push("/register")}
            className="
              flex-1
              h-12
              bg-yellow-300
              text-black
              font-black
              rounded-2xl
              border-4
              border-black
              shadow-[4px_4px_0px_0px_#000]
              hover:translate-x-1
              hover:translate-y-1
              hover:shadow-none
              transition-all
            "
          >
            REGISTER
          </button>

        </div>

        <button
          onClick={onClose}
          className="font-bold underline"
        >
          Tutup
        </button>

      </div>
    </div>
  );
}