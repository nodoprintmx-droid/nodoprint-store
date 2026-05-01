import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StickerCalculator from "@/components/calculators/StickerCalculator";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
export default function StickersPage() {
  return (<><Navbar/><main className="pt-16"><div className="px-6 md:px-12 lg:px-20 py-16">
    <div className="flex items-center gap-2 mb-4"><span className="block w-5 h-px bg-[#CC0055]"/><span className="text-[11px] font-medium tracking-[0.2em] uppercase text-[#CC0055]">Cotizador</span></div>
    <h1 className="text-[clamp(32px,4vw,56px)] font-light tracking-[-0.04em] text-[#111] mb-3">Stickers & <strong className="font-semibold">Etiquetas</strong></h1>
    <p className="text-base font-light text-[#6B6B6B] max-w-xl mb-12">Planillas 26×42cm en vinil, adhesivo metálico, couché y UV. El precio se calcula por planillas según el tamaño de tu sticker.</p>
    <StickerCalculator/></div></main><Footer/><WhatsAppButton/></>);
}
