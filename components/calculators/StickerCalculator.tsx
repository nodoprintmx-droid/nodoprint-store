"use client";
import { useState, useMemo } from "react";
import { formatMXN, IVA, ANTICIPO } from "@/lib/precios";
import { Info, AlertCircle, ArrowRight, CheckCircle2 } from "lucide-react";

// Materiales con su planilla correspondiente en cm
const MATERIALES = [
  // Vinil estándar — planilla 26×42cm
  { value: "vb-imp",  label: "Vinil Blanco — Solo impresión",         precio: 39,  planW: 26,  planH: 42  },
  { value: "vb-bco",  label: "Vinil Blanco — C/Blanco",               precio: 49,  planW: 26,  planH: 42  },
  { value: "vb-cor",  label: "Vinil Blanco — C/Corte",                precio: 59,  planW: 26,  planH: 42  },
  { value: "vt-imp",  label: "Vinil Transparente — Solo impresión",   precio: 39,  planW: 26,  planH: 42  },
  { value: "vt-bco",  label: "Vinil Transparente — C/Blanco",         precio: 49,  planW: 26,  planH: 42  },
  { value: "vt-cor",  label: "Vinil Transparente — C/Corte",          precio: 59,  planW: 26,  planH: 42  },
  { value: "am-imp",  label: "Adhe Oro/Plata/Cromo — Imp",            precio: 65,  planW: 26,  planH: 42  },
  { value: "am-bco",  label: "Adhe Oro/Plata/Cromo — C/Blanco",       precio: 75,  planW: 26,  planH: 42  },
  { value: "am-cor",  label: "Adhe Oro/Plata/Cromo — C/Corte",        precio: 85,  planW: 26,  planH: 42  },
  { value: "co-imp",  label: "Adhe-Couché — Imp",                     precio: 14,  planW: 26,  planH: 42  },
  { value: "co-cor",  label: "Adhe-Couché — C/Corte",                 precio: 38,  planW: 26,  planH: 42  },
  // UV — planilla 145×50cm
  { value: "uv-mat",  label: "UV Mate",                               precio: 490, planW: 145, planH: 50  },
  { value: "uv-bri",  label: "UV Brillante",                          precio: 490, planW: 145, planH: 50  },
  { value: "uv-tra",  label: "UV Transparente",                       precio: 490, planW: 145, planH: 50  },
  { value: "uv-bco",  label: "UV Tinta Blanca / Barniz",              precio: 560, planW: 145, planH: 50  },
  // UV Holográfico — planilla 120×50cm
  { value: "uv-hol",  label: "UV Holográfico",                        precio: 680, planW: 120, planH: 50  },
];

export default function StickerCalculator() {
  const [mat,      setMat]      = useState("vb-imp");
  const [anchoStk, setAnchoStk] = useState("10");
  const [altoStk,  setAltoStk]  = useState("10");
  const [qty,      setQty]      = useState("100");

  const m = MATERIALES.find(x => x.value === mat)!;

  const cal = useMemo(() => {
    const aw = parseFloat(anchoStk) || 0;
    const ah = parseFloat(altoStk)  || 0;
    const q  = parseInt(qty)        || 1;
    if (!aw || !ah) return null;

    const pxPlan   = Math.floor(m.planW / aw) * Math.floor(m.planH / ah);
    const piezasPP = Math.max(1, pxPlan);
    const planillas = Math.ceil(q / piezasPP);
    const sub   = planillas * m.precio;
    const iva   = sub * IVA;
    const total = sub + iva;

    return { aw, ah, q, piezasPP, planillas, sub, iva, total, anticipo: total * ANTICIPO };
  }, [mat, anchoStk, altoStk, qty, m]);

  // Agrupar materiales
  const grupos = [
    { label: "Vinil estándar",   items: MATERIALES.filter(x => x.planW === 26)  },
    { label: "UV — Planilla 145×50cm",  items: MATERIALES.filter(x => x.planW === 145) },
    { label: "UV Holográfico — Planilla 120×50cm", items: MATERIALES.filter(x => x.planW === 120) },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-0.5 bg-[#E0E0E0] max-w-6xl">
      <div className="lg:col-span-3 bg-white p-8 md:p-10 flex flex-col gap-8">

        {/* Medidas sticker */}
        <div>
          <h3 className="text-[10px] font-medium tracking-[0.15em] uppercase text-[#6B6B6B] mb-5">1. Tamaño del sticker</h3>
          <div className="grid grid-cols-3 gap-4">
            {([["Ancho", anchoStk, setAnchoStk],["Alto", altoStk, setAltoStk],["Cantidad", qty, setQty]] as [string,string,(s:string)=>void][]).map(([l,v,fn],i) => (
              <div key={l}>
                <label className="text-sm font-medium text-[#111] block mb-2">{l}</label>
                <div className="flex items-center border border-[#E0E0E0] rounded focus-within:border-[#CC0055] transition-colors">
                  <input type="number" value={v} onChange={e=>fn(e.target.value)} min="1" step="1"
                    className="flex-1 px-4 py-3 text-base font-light outline-none bg-transparent w-20"/>
                  <span className="pr-3 text-sm text-[#6B6B6B]">{i===2?"pzas":"cm"}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-3 flex items-start gap-2 bg-[#F5F5F5] px-3 py-2.5 rounded">
            <Info size={13} className="text-[#CC0055] mt-0.5 shrink-0"/>
            <p className="text-xs font-light text-[#6B6B6B]">
              Planilla <strong className="text-[#111]">{m.planW}×{m.planH}cm</strong>.
              {cal && ` Caben ${cal.piezasPP} sticker${cal.piezasPP!==1?"s":""} por planilla → ${cal.planillas} planilla${cal.planillas!==1?"s":""} para ${cal.q} piezas.`}
            </p>
          </div>
        </div>

        {/* Material */}
        <div>
          <h3 className="text-[10px] font-medium tracking-[0.15em] uppercase text-[#6B6B6B] mb-4">2. Material y acabado</h3>
          <div className="flex flex-col gap-5">
            {grupos.map(g => (
              <div key={g.label}>
                <p className="text-[10px] font-medium tracking-[0.15em] uppercase text-[#CCCCCC] mb-2">{g.label}</p>
                <div className="flex flex-col gap-1.5">
                  {g.items.map(x => (
                    <button key={x.value} onClick={()=>setMat(x.value)}
                      className={`flex items-center justify-between px-5 py-3.5 rounded border text-left transition-all ${mat===x.value?"border-[#CC0055] bg-[#FFF0F5]":"border-[#E0E0E0] hover:border-[#CC0055]/50"}`}>
                      <p className="text-sm font-light text-[#111]">{x.label}</p>
                      <div className="flex items-center gap-2 shrink-0 ml-4">
                        <span className="text-sm font-medium text-[#CC0055]">{formatMXN(x.precio)}/planilla</span>
                        {mat===x.value && <CheckCircle2 size={14} className="text-[#CC0055]"/>}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Resumen */}
      <div className="lg:col-span-2 bg-[#111] p-8 md:p-10 flex flex-col justify-between">
        <div>
          <h3 className="text-[10px] font-medium tracking-[0.15em] uppercase text-white/40 mb-8">Resumen</h3>
          {!cal ? (
            <div className="flex flex-col items-center text-center py-12 gap-4">
              <AlertCircle size={28} className="text-white/20"/>
              <p className="text-sm font-light text-white/25 max-w-[180px]">Ingresa los datos para ver el precio.</p>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2.5 pb-5 border-b border-white/10">
                <div className="flex justify-between text-sm">
                  <span className="text-white/40 font-light">Material</span>
                  <span className="text-white font-light text-xs text-right max-w-[160px] leading-tight">{m.label}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/40 font-light">Planilla</span>
                  <span className="text-white font-light">{m.planW}×{m.planH}cm</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/40 font-light">Tamaño sticker</span>
                  <span className="text-white font-light">{anchoStk}×{altoStk}cm</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/40 font-light">Piezas solicitadas</span>
                  <span className="text-white font-light">{cal.q} pzas</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/40 font-light">Por planilla</span>
                  <span className="text-white font-light">{cal.piezasPP} pzas</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/40 font-light">Planillas necesarias</span>
                  <span className="text-[#CC0055] font-medium">{cal.planillas}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/40 font-light">Precio por planilla</span>
                  <span className="text-white font-light">{formatMXN(m.precio)}</span>
                </div>
              </div>
              <div className="flex flex-col gap-2.5">
                <div className="flex justify-between text-sm">
                  <span className="text-white/40 font-light">Subtotal</span>
                  <span className="text-white font-light">{formatMXN(cal.sub)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/40 font-light">IVA (16%)</span>
                  <span className="text-white font-light">{formatMXN(cal.iva)}</span>
                </div>
                <div className="flex justify-between items-baseline pt-3 border-t border-white/10">
                  <span className="text-sm font-medium text-white">Total</span>
                  <span className="text-3xl font-semibold text-white tracking-[-0.04em]">{formatMXN(cal.total)}</span>
                </div>
                <div className="flex justify-between bg-white/5 px-4 py-3 rounded">
                  <span className="text-sm text-white/40 font-light">Anticipo (75%)</span>
                  <span className="text-sm text-[#CC0055] font-medium">{formatMXN(cal.anticipo)}</span>
                </div>
              </div>
            </div>
          )}
        </div>
        {cal && (
          <div className="mt-8 flex flex-col gap-3">
            <button className="w-full flex items-center justify-center gap-2.5 bg-[#CC0055] text-white font-medium text-base py-4 rounded hover:bg-[#990040] transition-colors">
              Continuar pedido <ArrowRight size={17}/>
            </button>
            <p className="text-xs font-light text-white/20 text-center">Siguiente: subir archivo y datos de entrega</p>
          </div>
        )}
      </div>
    </div>
  );
}
