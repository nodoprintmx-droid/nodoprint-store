import Link from "next/link";
import { ArrowRight } from "lucide-react";

const productos = [
  { nombre: "Lonas", desc: "Frontlit, Mesh, Backlight", href: "/cotizar/lonas", featured: true, img: "https://cdn.midjourney.com/9e48b4b7-ae6b-48fd-a188-d1af1a1c7873/0_2.png" },
  { nombre: "Viniles", desc: "Brillante, mate, microperforado", href: "/cotizar/viniles", img: "https://images.unsplash.com/photo-1562259929-b4e1fd3aef09?w=600&q=80&auto=format&fit=crop" },
  { nombre: "DTF Textil", desc: "Transfer textil por metro", href: "/cotizar/dtf", img: "https://cdn.midjourney.com/b1d3418f-b5c7-4c5a-aa23-7ad7c691c484/0_3.png" },
  { nombre: "DTF UV", desc: "Impresión directa UV", href: "/cotizar/dtf", img: "https://cdn.midjourney.com/8bc41414-d62b-492c-975e-1ce809d6f35d/0_0.png" },
  { nombre: "Offset & Tarjetas", desc: "Tarjetas de presentación y volantes", href: "/cotizar/offset", img: "https://cdn.midjourney.com/88c52645-60ed-4445-9078-66dd54885cfd/0_0.png" },
  { nombre: "Stickers", desc: "Planillas y corte especial", href: "/cotizar/stickers", img: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=600&q=80&auto=format&fit=crop" },
  { nombre: "Rollup & Banner", desc: "Con estructura incluida", href: "/cotizar/estructuras", img: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80&auto=format&fit=crop" },
  { nombre: "Credenciales PVC", desc: "Identificación corporativa", href: "/cotizar/credenciales", img: "https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=600&q=80&auto=format&fit=crop" },
];

export default function Products() {
  return (
    <section id="productos" className="px-6 md:px-12 lg:px-20 py-24">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-14">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <span className="block w-5 h-px bg-[#CC0055]" />
            <span className="text-[11px] font-medium tracking-[0.2em] uppercase text-[#CC0055]">Catálogo</span>
          </div>
          <h2 className="text-[clamp(28px,3.5vw,48px)] font-light tracking-[-0.03em] text-[#111] leading-tight">
            Todo lo que necesitas <strong className="font-semibold">imprimir</strong>
          </h2>
          <p className="text-base font-light text-[#6B6B6B] mt-3 max-w-md">
            Cotiza al instante con nuestras calculadoras de precio. Sin llamadas, sin esperas.
          </p>
        </div>
        <Link href="/productos" className="inline-flex items-center gap-2 text-sm font-medium text-[#CC0055] hover:gap-3 transition-all whitespace-nowrap pb-6 md:pb-0">
          Ver catálogo completo <ArrowRight size={15} />
        </Link>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-0.5 bg-[#E0E0E0]">
        {productos.map((p) => (
          <Link key={p.nombre} href={p.href}
            className={`relative overflow-hidden bg-[#F5F5F5] group cursor-pointer ${p.featured ? "md:col-span-2 md:row-span-2" : ""}`}
            style={{ aspectRatio: p.featured ? "auto" : "3/4", minHeight: p.featured ? "480px" : undefined }}>
            <img src={p.img} alt={p.nombre}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />
            {/* Info siempre visible */}
            <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
              <p className="text-base md:text-lg font-medium text-white mb-1">{p.nombre}</p>
              <p className="text-xs font-light text-white/65">{p.desc}</p>
            </div>
            {/* CTA en hover */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="inline-flex items-center gap-2 bg-[#CC0055] text-white text-sm font-medium px-5 py-3 rounded">
                Cotizar <ArrowRight size={14} />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
