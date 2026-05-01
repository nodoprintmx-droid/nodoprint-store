import Link from "next/link";
import { MapPin, Phone, Mail, MessageCircle, Clock } from "lucide-react";
import { SUCURSALES, CONTACTO } from "@/lib/precios";

const productos = [
  "Lonas","Viniles","Stickers","DTF & DTF UV",
  "Banners & Rollup","Credenciales PVC","Impresión Digital","Rígidos"
];

export default function Footer() {
  return (
    <footer className="bg-[#111] text-white">
      <div className="px-6 md:px-12 lg:px-20 pt-20 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-16 border-b border-white/8">

          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="text-2xl font-semibold tracking-tight mb-4">
              nodo<span className="text-[#CC0055]">print</span>
            </div>
            <p className="text-sm font-light text-white/40 leading-relaxed mb-6 max-w-[240px]">
              Estudio creativo de impresión de gran formato y DTF en Ciudad de México.
              La imaginación también se imprime.
            </p>
            <a href={`https://wa.me/${CONTACTO.whatsapp}`} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] text-white text-sm font-medium px-4 py-2.5 rounded transition-all hover:bg-[#1ebe5d]">
              <MessageCircle size={15} />
              WhatsApp {CONTACTO.whatsappDisplay}
            </a>
          </div>

          {/* Productos */}
          <div>
            <h4 className="text-[11px] font-medium tracking-[0.2em] uppercase text-white/30 mb-5">Productos</h4>
            <ul className="flex flex-col gap-3">
              {productos.map((p) => (
                <li key={p}>
                  <Link href="/productos" className="text-sm font-light text-white/60 hover:text-white transition-colors">
                    {p}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Sucursales */}
          <div>
            <h4 className="text-[11px] font-medium tracking-[0.2em] uppercase text-white/30 mb-5">Sucursales</h4>
            <div className="flex flex-col gap-6">
              {SUCURSALES.map((s) => (
                <div key={s.nombre}>
                  <p className="text-sm font-medium text-white/80 mb-2">{s.nombre}</p>
                  <div className="flex flex-col gap-1.5">
                    <span className="flex items-start gap-2 text-xs font-light text-white/40">
                      <MapPin size={13} className="mt-0.5 shrink-0 text-[#CC0055]" />
                      {s.direccion}
                    </span>
                    <a href={`tel:${s.tel.replace(/\s/g,'')}`} className="flex items-center gap-2 text-xs font-light text-white/40 hover:text-white transition-colors">
                      <Phone size={13} className="text-[#CC0055]" />
                      {s.tel}
                    </a>
                    <a href={`mailto:${s.email}`} className="flex items-center gap-2 text-xs font-light text-white/40 hover:text-white transition-colors">
                      <Mail size={13} className="text-[#CC0055]" />
                      {s.email}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Info */}
          <div>
            <h4 className="text-[11px] font-medium tracking-[0.2em] uppercase text-white/30 mb-5">Información</h4>
            <div className="flex items-center gap-2 text-xs font-light text-white/40 mb-6">
              <Clock size={13} className="text-[#CC0055]" />
              {CONTACTO.horario}
            </div>
            <ul className="flex flex-col gap-3">
              {["Términos y condiciones","Política de privacidad","Política de devoluciones"].map((l) => (
                <li key={l}>
                  <Link href="#" className="text-sm font-light text-white/40 hover:text-white transition-colors">{l}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8">
          <p className="text-xs font-light text-white/25">© {new Date().getFullYear()} Nodoprint. Todos los derechos reservados.</p>
          <p className="text-xs font-light text-white/25">Diseñado con <span className="text-[#CC0055]">♥</span> en Ciudad de México</p>
        </div>
      </div>
    </footer>
  );
}
