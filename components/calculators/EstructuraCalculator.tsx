"use client";
import { useState, useMemo } from "react";
import { ESTRUCTURAS, getEstPrecio, formatMXN, IVA, ANTICIPO } from "@/lib/precios";
import { AlertCircle, ArrowRight, CheckCircle2 } from "lucide-react";

const GRUPOS = [...new Set(ESTRUCTURAS.map(e => e.grupo))];

export default function EstructuraCalculator() {
  const [grupo, setGrupo] = useState(GRUPOS[0]);
  const [sel,   setSel]   = useState(ESTRUCTURAS.find(e=>e.grupo===GRUPOS[0])?.value||"");
  const [qty,   setQty]   = useState("1");

  const items = ESTRUCTURAS.filter(e => e.grupo === grupo);

  const cal = useMemo(() => {
    const q  = parseInt(qty) || 1;
    const px = getEstPrecio(sel);
    if (!px) return null;
    const sub   = px * q;
    const iva   = sub * IVA;
    const total = sub + iva;
    const label = ESTRUCTURAS.find(e=>e.value===sel)?.label||"";
    return { q, px, sub, iva, total, anticipo: total * ANTICIPO, label };
  }, [sel, qty]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-0.5 bg-[#E0E0E0] max-w-6xl">
      <div className="lg:col-span-3 bg-white p-8 md:p-10 flex flex-col gap-8">

        {/* Categoría */}
        <div>
          <h3 className="text-[10px] font-medium tracking-[0.15em] uppercase text-[#6B6B6B] mb-4">1. Categoría</h3>
          <div className="flex gap-2 flex-wrap">
            {GRUPOS.map(g => (
              <button key={g} onClick={()=>{ setGrupo(g); setSel(ESTRUCTURAS.find(e=>e.grupo===g)?.value||""); }}
                className={`px-4 py-2.5 text-sm rounded border transition-all ${grupo===g?"bg-[#CC0055] text-white border-[#CC0055] font-medium":"border-[#E0E0E0] text-[#3A3A3A] font-light hover:border-[#CC0055]"}`}>
                {g}
              </button>
            ))}
          </div>
        </div>

        {/* Producto */}
        <div>
          <h3 className="text-[10px] font-medium tracking-[0.15em] uppercase text-[#6B6B6B] mb-4">2. Producto</h3>
          <div className="flex flex-col gap-2">
            {items.map(e => (
              <button key={e.value} onClick={()=>setSel(e.value)}
                className={`flex items-center justify-between px-5 py-4 rounded border text-left transition-all ${sel===e.value?"border-[#CC0055] bg-[#FFF0F5]":"border-[#E0E0E0] hover:border-[#CC0055]/50"}`}>
                <p className="text-sm font-medium text-[#111]">{e.label}</p>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-[#CC0055]">{formatMXN(e.precio)}</span>
                  {sel===e.value && <CheckCircle2 size={16} className="text-[#CC0055]"/>}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Cantidad */}
        <div>
          <h3 className="text-[10px] font-medium tracking-[0.15em] uppercase text-[#6B6B6B] mb-4">3. Cantidad</h3>
          <div className="max-w-[200px]">
            <div className="flex items-center border border-[#E0E0E0] rounded focus-within:border-[#CC0055] transition-colors">
              <input type="number" value={qty} onChange={e=>setQty(e.target.value)} min="1" step="1"
                className="flex-1 px-4 py-3 text-base font-light outline-none bg-transparent"/>
              <span className="pr-4 text-sm text-[#6B6B6B]">pzas</span>
            </div>
          </div>
        </div>
      </div>

      {/* Resumen */}
      <div className="lg:col-span-2 bg-[#111] p-8 md:p-10 flex flex-col justify-between">
        <div>
          <h3 className="text-[10px] font-medium tracking-[0.15em] uppercase text-white/40 mb-8">Resumen</h3>
          {!cal ? (
            <div className="flex flex-col items-center text-center py-12">
              <AlertCircle size={28} className="text-white/20"/>
              <p className="text-sm font-light text-white/25 mt-3">Selecciona un producto.</p>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2.5 pb-5 border-b border-white/10">
                <div className="flex justify-between text-sm">
                  <span className="text-white/40 font-light">Producto</span>
                  <span className="text-white font-light text-xs text-right max-w-[160px]">{cal.label}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/40 font-light">Cantidad</span>
                  <span className="text-white font-light">{cal.q} pza{cal.q!==1?"s":""}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/40 font-light">Precio unitario</span>
                  <span className="text-[#CC0055] font-medium">{formatMXN(cal.px)}</span>
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
          <div className="mt-8">
            <button className="w-full flex items-center justify-center gap-2.5 bg-[#CC0055] text-white font-medium text-base py-4 rounded hover:bg-[#990040] transition-colors">
              Continuar pedido <ArrowRight size={17}/>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
