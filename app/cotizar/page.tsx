import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import WhatsAppButton from "@/components/ui/WhatsAppButton";

const categorias = [
  { nombre: "Lonas", desc: "Frontlit, Mesh, Backlight — precio por m²", href: "/cotizar/lonas", img: "https://images.unsplash.com/photo-1588681664899-f142ff2dc9b1?w=600&q=80&auto=format&fit=crop" },
  { nombre: "Viniles", desc: "Brillante, mate, microperforado, holográfico — por m²", href: "/cotizar/viniles", img: "https://images.unsplash.com/photo-1562259929-b4e1fd3aef09?w=600&q=80&auto=format&fit=crop" },
  { nombre: "DTF & DTF UV", desc: "Transfer textil por metro cuadrado", href: "/cotizar/dtf", img: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=600&q=80&auto=format&fit=crop" },
  { nombre: "Stickers", desc: "Planillas 26×42cm, vinil, couché y adhesivos metálicos", href: "/cotizar/stickers", img: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=600&q=80&auto=format&fit=crop" },
  { nombre: "Credenciales PVC", desc: "Swift Pro, Sin Filos, Data Card — precio por pieza", href: "/cotizar/credenciales", img: "https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=600&q=80&auto=format&fit=crop" },
  { nombre: "Impresión Digital", desc: "Carta, tabloide, rebatible — precio por pieza y volumen", href: "/cotizar/digital", img: "https://images.unsplash.com/photo-1586339949916-3e9457bef6d3?w=600&q=80&auto=format&fit=crop" },
  { nombre: "Estructuras", desc: "Rollup, banners, demo stands, banderas, muros", href: "/cotizar/estructuras", img: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80&auto=format&fit=crop" },
  { nombre: "Textil", desc: "Playeras, sudaderas, gorras, bolsas con sublimación o DTF", href: "/cotizar/textil", img: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=600&q=80&auto=format&fit=crop" },
  { nombre: "Telas de impresión", desc: "Banner, canvas, city, foto — precio por m²", href: "/cotizar/telas", img: "https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=600&q=80&auto=format&fit=crop" },
];

export default function CotizarPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        <div className="px-6 md:px-12 lg:px-20 py-16 border-b border-[#F0F0F0]">
          <div className="flex items-center gap-2 mb-4">
            <span className="block w-5 h-px bg-[#CC0055]" />
            <span className="text-[11px] font-medium tracking-[0.2em] uppercase text-[#CC0055]">Cotizador</span>
          </div>
          <h1 className="text-[clamp(32px,4vw,56px)] font-light tracking-[-0.04em] text-[#111] mb-3">
            ¿Qué vas a <strong className="font-semibold">imprimir?</strong>
          </h1>
          <p className="text-base font-light text-[#6B6B6B] max-w-xl">
            Selecciona el tipo de producto. El precio se calcula al instante con nuestras calculadoras.
          </p>
        </div>
        <div className="px-6 md:px-12 lg:px-20 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0.5 bg-[#E0E0E0]">
            {categorias.map((c) => (
              <Link key={c.nombre} href={c.href}
                className="group bg-white flex items-center gap-5 p-6 hover:bg-[#FFF0F5] transition-colors border-0">
                <div className="w-16 h-16 rounded overflow-hidden shrink-0">
                  <img src={c.img} alt={c.nombre} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-base font-medium text-[#111] group-hover:text-[#CC0055] transition-colors">{c.nombre}</p>
                  <p className="text-xs font-light text-[#6B6B6B] mt-1 leading-relaxed">{c.desc}</p>
                </div>
                <ArrowRight size={16} className="text-[#CCCCCC] group-hover:text-[#CC0055] group-hover:translate-x-1 transition-all shrink-0" />
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
