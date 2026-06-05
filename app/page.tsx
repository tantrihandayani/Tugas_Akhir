import Footer from "@/component/public/footer";
import HeroSection from "@/component/public/heroSection";
import InformasiStudio from "@/component/public/informasiStudio";
import JadwalTersedia from "@/component/public/jadwalTersedia";
import LayananCard from "@/component/public/layananCard";
import NavbarPublic from "@/component/public/navbarPublic";


export default function HomePage() {

  return (
    <div className="w-full min-h-screen bg-white">
      <NavbarPublic />

      <HeroSection />
      
      <LayananCard />
      
      <JadwalTersedia />

      <InformasiStudio />

      <Footer />
    </div>
  );
}
