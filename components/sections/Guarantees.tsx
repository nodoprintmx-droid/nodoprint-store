import { ShieldCheck, Clock, FileText, Truck } from "lucide-react";

const items = [
  { icon: ShieldCheck, titulo: "Calidad garantizada", texto: "Si el producto tiene un defecto de fábrica o un error de producción de nuestra parte, lo reimprimimos sin costo adicional." },
  { icon: Clock, titulo: "Tiempos cumplidos", texto: "Producción en 24 a 48 horas hábiles una vez aprobado el archivo. Express disponible para pedidos urgentes." },
  { icon: FileText, titulo: "Factura CFDI", texto: "Emitimos factura fiscal por cada pedido. Solo proporciónanos tu RFC y datos fiscales al momento de la compra." },
  { icon: Truck, titulo: "Envío a toda la república", texto: "Recoges en cualquiera de nuestras dos sucursales en CDMX, o coordinamos envío a cualquier estado del país." },
];

export default function Guarantees() {
  return (
    <section id="garantias" className="px-6 md:px-12 lg:px-20 py-24">
      <div className="text-center mb-16">
        <div className="flex items-center justify-center gap-2 mb-4">
          <span className="block w-5 h-px bg-[#CC0055]" />
          <span className="text-[11px] font-medium tracking-[0.2em] uppercase text-[#CC0055]">Por qué Nodoprint</span>
          <span className="block w-5 h-px bg-[#CC0055]" />
        </div>
        <h2 className="text-[clamp(28px,3.5vw,48px)] font-light tracking-[-0.03em] text-[#111]">
          Tu impresión, <strong className="font-semibold">garantizada.</strong>
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0.5 bg-[#E0E0E0]">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.titulo} className="bg-white p-10">
              <div className="w-12 h-12 rounded border border-[#CC0055] flex items-center justify-center mb-6">
                <Icon size={22} className="text-[#CC0055]" strokeWidth={1.5} />
              </div>
              <h3 className="text-lg font-medium text-[#111] mb-3">{item.titulo}</h3>
              <p className="text-sm font-light text-[#6B6B6B] leading-relaxed">{item.texto}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
