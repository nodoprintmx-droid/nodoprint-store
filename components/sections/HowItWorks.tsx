import { Grid2X2, Calculator, Upload, Package } from "lucide-react";

const pasos = [
  { n: "01", icon: Grid2X2, titulo: "Elige tu producto", texto: "Selecciona el tipo de impresión que necesitas. Lonas, DTF, stickers, banners, credenciales y más." },
  { n: "02", icon: Calculator, titulo: "Cotiza al instante", texto: "Ingresa tus medidas, material y cantidad. El precio se calcula automáticamente. Sin esperas, sin correos." },
  { n: "03", icon: Upload, titulo: "Sube tu archivo y paga", texto: "Adjunta tu diseño en PDF o JPG y realiza tu pago en línea de forma segura. Recibe tu folio al instante." },
  { n: "04", icon: Package, titulo: "Recibe tu pedido", texto: "Producción en 24–48 horas. Te avisamos cuando esté listo. Recoges en sucursal o enviamos a tu dirección." },
];

export default function HowItWorks() {
  return (
    <section id="como-funciona" className="bg-[#F5F5F5] px-6 md:px-12 lg:px-20 py-24">
      <div className="text-center mb-16">
        <div className="flex items-center justify-center gap-2 mb-4">
          <span className="block w-5 h-px bg-[#CC0055]" />
          <span className="text-[11px] font-medium tracking-[0.2em] uppercase text-[#CC0055]">El proceso</span>
          <span className="block w-5 h-px bg-[#CC0055]" />
        </div>
        <h2 className="text-[clamp(28px,3.5vw,48px)] font-light tracking-[-0.03em] text-[#111]">
          Cotiza, paga y recibe. <strong className="font-semibold">Así de directo.</strong>
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0.5 bg-[#CCCCCC]">
        {pasos.map((p) => {
          const Icon = p.icon;
          return (
            <div key={p.n} className="bg-white p-10 group hover:bg-[#CC0055] transition-colors duration-300">
              <p className="text-[64px] font-semibold tracking-[-0.06em] text-[#F0F0F0] group-hover:text-white/10 leading-none mb-6 transition-colors">{p.n}</p>
              <div className="w-11 h-11 rounded bg-[#CC0055] group-hover:bg-white flex items-center justify-center mb-5 transition-colors">
                <Icon size={20} className="text-white group-hover:text-[#CC0055] transition-colors" />
              </div>
              <h3 className="text-lg font-medium text-[#111] group-hover:text-white mb-3 transition-colors">{p.titulo}</h3>
              <p className="text-sm font-light text-[#6B6B6B] group-hover:text-white/70 leading-relaxed transition-colors">{p.texto}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
