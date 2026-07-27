import Image from "next/image";
export default function InformasiStudio() {

  const dataStudio = [
    {
      icon: "/assets/image/kamera.png",
      title: "Kamera HD",
      desc: "Menggunakan kamera berkualitas tinggi untuk menghasilkan foto yang tajam, aesthetic, dan siap upload ke sosial media.",
      bg: "bg-[#F7F48B]",
    },
    {
      icon: "/assets/image/kamera.png",
      title: "Properti Lucu",
      desc: "Tersedia berbagai properti unik dan background estetik yang membuat hasil foto lebih menarik dan tidak membosankan.",
      bg: "bg-[#C6B6FF]",
    },
    {
      icon: "/assets/image/kamera.png",
      title: "Studio Nyaman",
      desc: "Ruangan studio bersih, dingin, dan private sehingga customer dapat berfoto dengan nyaman dan percaya diri.",
      bg: "bg-[#C7F0E9]",
    },
    {
      icon: "/assets/image/kamera.png",
      title: "Harga Terjangkau",
      desc: "Menyediakan layanan foto berkualitas dengan harga yang ramah di kantong pelajar maupun mahasiswa.",
      bg: "bg-[#FFB8E0]",
    },
  ];

  return (
    <div className="w-full border-t-[5px] border-black bg-[#FFD2EC] px-5 py-10 md:px-8 md:py-12">

      {/* TITLE */}
      <div className="mb-8">
        <div className="mb-4 flex w-fit rotate-[-2deg] items-center gap-2 rounded-full border-[3px] border-black bg-[#C7F0E9] px-3 py-1.5 shadow-[3px_3px_0px_0px_#000]">
          <Image
            src="/assets/image/kamera.png"
            alt="logo"
            width={22}
            height={22}
          />

          <p className="text-xs font-black text-black md:text-sm">
            ABOUT STUDIO
          </p>

        </div>

        <h1 className="text-2xl font-black leading-none text-black md:text-4xl">
          KENAPA PILIH <br />
          STUDIO IBU? ✨
        </h1>

        <p className="mt-3 max-w-lg text-sm font-medium leading-relaxed text-gray-700 md:text-base">
          Studio Ibu menghadirkan pengalaman self photo yang nyaman,
          estetik, dan terjangkau untuk semua kalangan.
        </p>

      </div>

      {/* CARD */}
      <div
        className="grid grid-cols-2 gap-3 lg:grid-cols-4 gap-5"
      >

        {dataStudio.map((item, index) => (

          <div
            key={index}
            className={`${item.bg} rounded-[20px] border-4 border-black p-4 shadow-[5px_5px_0px_0px_#000] transition-all duration-200 hover:-translate-y-1 hover:shadow-[7px_7px_0px_0px_#000]`}
          >

            {/* ICON */}
            <div className="mb-3 flex justify-center">
              <Image
                src={item.icon}
                alt={item.title}
                width={48}
                height={48}
              />
            </div>

            {/* TITLE */}
            <h1 className="mb-2 text-lg font-black text-black">
              {item.title}
            </h1>

            {/* DESC */}
            <p className="text-xs font-medium leading-5 text-gray-700">
              {item.desc}
            </p>

          </div>
        ))}

      </div>
    </div>
  );
}