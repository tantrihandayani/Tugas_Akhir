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
    <div
      className="
        w-full
        bg-[#FFD2EC]
        border-t-[5px]
        border-black
        px-5
        md:px-10
        py-12
      "
    >

      {/* TITLE */}
      <div className="mb-10">

        <div
          className="
            w-fit
            px-4
            py-2
            bg-[#C7F0E9]
            border-[4px]
            border-black
            rounded-full
            rotate-[-2deg]
            shadow-[4px_4px_0px_0px_#000]
            mb-5
          "
        >
          <div className="flex flex-row items-center gap-2 ">
            <Image
                src= "/assets/image/kamera.png"
                alt="logo"
                width={30}
                height={30}
              />
          <p className="font-black text-black text-sm">
             ABOUT STUDIO
          </p>
          </div>
        </div>

        <h1
          className="
            text-4xl
            md:text-5xl
            font-black
            leading-tight
            text-black
          "
        >
          KENAPA PILIH <br />
          STUDIO IBU? ✨
        </h1>

        <p
          className="
            mt-4
            max-w-2xl
            text-base
            md:text-lg
            font-semibold
            text-gray-700
          "
        >
          Studio Ibu hadir sebagai studio foto modern dengan konsep
          self photo yang nyaman, aesthetic, dan terjangkau untuk
          semua kalangan.
        </p>

      </div>

      {/* CARD */}
      <div
        className="
          grid
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-4
          gap-5
        "
      >

        {dataStudio.map((item, index) => (

          <div
            key={index}
            className={`
              ${item.bg}
              border-[5px]
              border-black
              rounded-2xl
              p-5
              shadow-[6px_6px_0px_0px_#000]
              hover:-translate-y-1
              transition-all
              duration-200
            `}
          >

            {/* ICON */}
            <div className="mb-4 flex flex-col items-center">
              <Image
                src={item.icon}
                alt={item.title}
                width={70}
                height={70}
              />
            </div>

            {/* TITLE */}
            <h1 className="text-2xl font-black text-black mb-3">
              {item.title}
            </h1>

            {/* DESC */}
            <p className="text-sm font-semibold text-gray-700 leading-6">
              {item.desc}
            </p>

          </div>
        ))}

      </div>
    </div>
  );
}