import { MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react";
import { SUCURSALES, CONTACTO } from "@/lib/precios";

export default function Locations() {
  return (
    <section id="sucursales" className="bg-[#F5F5F5] px-6 md:px-12 lg:px-20 py-24">
      <div className="flex items-center gap-2 mb-4">
        <span className="block w-5 h-px bg-[#CC0055]" />
        <span className="text-[11px] font-medium tracking-[0.2em] uppercase text-[#CC0055]">Sucursales</span>
      </div>
      <h2 className="text-[clamp(28px,3.5vw,48px)] font-light tracking-[-0.03em] text-[#111] mb-12">
        Dos ubicaciones en <strong className="font-semibold">CDMX</strong>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-0.5 bg-[#CCCCCC] mb-8">
        {SUCURSALES.map((s) => (
          <div key={s.nombre} className="bg-white p-10">
            <h3 className="text-2xl font-medium text-[#111] mb-6">Sucursal {s.nombre}</h3>
            <div className="flex flex-col gap-4">
              <div className="flex items-start gap-3">
                <MapPin size={18} className="text-[#CC0055] mt-0.5 shrink-0" strokeWidth={1.5} />
                <p className="text-sm font-light text-[#3A3A3A] leading-relaxed">{s.direccion}</p>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={18} className="text-[#CC0055] shrink-0" strokeWidth={1.5} />
                <a href={`tel:${s.tel.replace(/\s/g,'')}`} className="text-sm font-light text-[#3A3A3A] hover:text-[#CC0055] transition-colors">{s.tel}</a>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={18} className="text-[#CC0055] shrink-0" strokeWidth={1.5} />
                <a href={`mailto:${s.email}`} className="text-sm font-light text-[#3A3A3A] hover:text-[#CC0055] transition-colors">{s.email}</a>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-wrap items-center gap-6">
        <div className="flex items-center gap-2 text-sm font-light text-[#6B6B6B]">
          <Clock size={16} className="text-[#CC0055]" strokeWidth={1.5} />
          {CONTACTO.horario}
        </div>
        <a href={`https://wa.me/${CONTACTO.whatsapp}`} target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-[#25D366] text-white text-sm font-medium px-5 py-2.5 rounded hover:bg-[#1ebe5d] transition-colors">
          <MessageCircle size={15} />
          Pedidos solo por WhatsApp: {CONTACTO.whatsappDisplay}
        </a>
      </div>
    </section>
  );
}
