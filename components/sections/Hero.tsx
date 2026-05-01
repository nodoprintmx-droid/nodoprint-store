"use client";
import Link from "next/link";
import { ArrowRight, Zap } from "lucide-react";

const stats = [
  { number: "+8k", label: "Pedidos entregados" },
  { number: "24h", label: "Producción express" },
  { number: "14", label: "Tipos de impresión" },
];

export default function Hero() {
  return (
    <section className="min-h-screen grid grid-cols-1 lg:grid-cols-2 pt-16">
      <div className="flex flex-col justify-center px-6 md:px-12 lg:px-20 py-20">
        <div className="flex items-center gap-2 mb-7">
          <span className="block w-6 h-px bg-[#CC0055]" />
          <span className="text-[11px] font-medium tracking-[0.2em] uppercase text-[#CC0055]">Publicidad Impresa · CDMX</span>
        </div>
        <h1 className="text-[clamp(40px,5vw,72px)] font-light leading-[1.05] tracking-[-0.04em] text-[#111] mb-6">
          La imaginación<br />
          <strong className="font-semibold text-[#CC0055]">también se imprime.</strong>
        </h1>
        <p className="text-lg font-light text-[#6B6B6B] leading-relaxed max-w-[460px] mb-12">
          Cotiza en línea, sube tu archivo y recibe tu impresión. Gran formato, DTF, stickers, banners y más.
        </p>
        <div className="flex flex-wrap items-center gap-4 mb-16">
          <Link href="/cotizar" className="inline-flex items-center gap-2.5 bg-[#CC0055] text-white font-medium text-base px-8 py-4 rounded transition-all hover:bg-[#990040] hover:-translate-y-0.5 shadow-lg shadow-[#CC0055]/20">
            Cotizar ahora <ArrowRight size={17} />
          </Link>
          <Link href="/#como-funciona" className="inline-flex items-center gap-2 text-[#111] font-light text-base border-b border-[#111] pb-0.5 transition-all hover:text-[#CC0055] hover:border-[#CC0055]">
            ¿Cómo funciona?
          </Link>
        </div>
        <div className="flex gap-10 pt-10 border-t border-[#CCCCCC]">
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col gap-1">
              <span className="text-3xl font-semibold tracking-[-0.04em] text-[#111]">{s.number}</span>
              <span className="text-[11px] font-normal uppercase tracking-[0.1em] text-[#6B6B6B]">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="relative overflow-hidden bg-[#F5F5F5] min-h-[420px] lg:min-h-0">
        <img src="https://cdn.midjourney.com/9e48b4b7-ae6b-48fd-a188-d1af1a1c7873/0_2.png" alt="Impresión gran formato Nodoprint" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        <div className="absolute bottom-8 left-8 bg-[#CC0055] text-white px-5 py-4 rounded-sm">
          <p className="text-[10px] font-medium tracking-[0.15em] uppercase opacity-75 mb-1">Entrega en</p>
          <p className="text-lg font-medium">Ciudad de México</p>
        </div>
        <div className="absolute top-8 right-8 bg-white/90 backdrop-blur-sm text-[#111] px-4 py-3 rounded-sm flex items-center gap-2">
          <Zap size={14} className="text-[#CC0055]" />
          <span className="text-xs font-medium">Producción en 24h</span>
        </div>
      </div>
    </section>
  );
}
