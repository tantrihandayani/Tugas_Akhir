import Footer from "@/component/public/footer";
import HeroSection from "@/component/public/heroSection";
import InformasiStudio from "@/component/public/informasiStudio";
import JadwalTersedia from "@/component/public/jadwalTersedia";
import LayananCard from "@/component/public/layananCard";
import StudioMoments from "@/component/public/studioMoments";
import NavbarPublic from "@/component/public/navbarPublic";
import HowItWorks from "@/component/public/HowItWorks";


export default function HomePage() {

  return (
    <div className="w-full min-h-screen bg-white">
      <NavbarPublic />

      <HeroSection />

      <HowItWorks />

      <StudioMoments />
      
      <LayananCard />
      
      <JadwalTersedia />

      <InformasiStudio />

      <Footer />
    </div>
  );
}
