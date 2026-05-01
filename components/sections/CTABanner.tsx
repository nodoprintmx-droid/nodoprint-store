import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import { CONTACTO } from "@/lib/precios";

export default function CTABanner() {
  return (
    <section className="bg-[#111] px-6 md:px-12 lg:px-20 py-24">
      <div className="max-w-4xl">
        <div className="flex items-center gap-2 mb-6">
          <span className="block w-5 h-px bg-white/30" />
          <span className="text-[11px] font-medium tracking-[0.2em] uppercase text-white/40">Empieza hoy</span>
        </div>
        <h2 className="text-[clamp(32px,4vw,60px)] font-light tracking-[-0.04em] text-white leading-tight mb-6">
          ¿Listo para cotizar<br />tu <strong className="font-semibold text-[#CC0055]">próximo proyecto</strong>?
        </h2>
        <p className="text-lg font-light text-white/40 max-w-lg mb-12 leading-relaxed">
          Precio en segundos. Sin registro, sin complicaciones. Solo tu diseño y nosotros lo imprimimos.
        </p>
        <div className="flex flex-wrap gap-4">
          <Link href="/cotizar" className="inline-flex items-center gap-2.5 bg-[#CC0055] text-white font-medium text-base px-8 py-4 rounded transition-all hover:bg-[#990040] hover:-translate-y-0.5">
            Cotizar ahora <ArrowRight size={17} />
          </Link>
          <a href={`https://wa.me/${CONTACTO.whatsapp}?text=Hola, me gustaría cotizar un trabajo de impresión`}
            target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 bg-[#25D366] text-white font-medium text-base px-8 py-4 rounded transition-all hover:bg-[#1ebe5d]">
            <MessageCircle size={17} />
            WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
