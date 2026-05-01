import Navbar from "@/components/Navbar";
import Hero from "@/components/sections/Hero";
import Marquee from "@/components/sections/Marquee";
import Products from "@/components/sections/Products";
import HowItWorks from "@/components/sections/HowItWorks";
import CTABanner from "@/components/sections/CTABanner";
import Guarantees from "@/components/sections/Guarantees";
import Locations from "@/components/sections/Locations";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import ChatWidget from "@/components/ui/ChatWidget";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <Products />
        <HowItWorks />
        <CTABanner />
        <Guarantees />
        <Locations />
      </main>
      <Footer />
      <WhatsAppButton /><ChatWidget />
    </>
  );
}
