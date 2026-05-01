"use client";
import { useState, useMemo } from "react";
import { IMANES, formatMXN, IVA, ANTICIPO } from "@/lib/precios";
import { AlertCircle, ArrowRight, CheckCircle2 } from "lucide-react";

const GRUPOS = [...new Set(IMANES.map(i => i.grupo))];

export default function ImanCalculator() {
  const [sel, setSel] = useState(IMANES[0].value);
  const [qty, setQty] = useState("1");

  const item = IMANES.find(i => i.value === sel)!;

  const cal = useMemo(() => {
    const q   = parseInt(qty) || 1;
    const sub = item.precio * q;
    const iva = sub * IVA;
    const total = sub + iva;
    return { q, sub, iva, total, anticipo: total * ANTICIPO };
  }, [sel, qty, item]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-0.5 bg-[#E0E0E0] max-w-6xl">
      <div className="lg:col-span-3 bg-white p-8 md:p-10 flex flex-col gap-8">

        {/* Producto */}
        <div>
          <h3 className="text-[10px] font-medium tracking-[0.15em] uppercase text-[#6B6B6B] mb-4">1. Tipo de imán</h3>
          <div className="flex flex-col gap-5">
            {GRUPOS.map(g => (
              <div key={g}>
                <p className="text-[10px] font-medium tracking-[0.15em] uppercase text-[#CCCCCC] mb-2">{g}</p>
                <div className="flex flex-col gap-1.5">
                  {IMANES.filter(i => i.grupo === g).map(i => (
                    <button key={i.value} onClick={()=>setSel(i.value)}
                      className={`flex items-center justify-between px-5 py-4 rounded border text-left transition-all ${sel===i.value?"border-[#CC0055] bg-[#FFF0F5]":"border-[#E0E0E0] hover:border-[#CC0055]/50"}`}>
                      <p className="text-sm font-medium text-[#111]">{i.label}</p>
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-medium text-[#CC0055]">{formatMXN(i.precio)}</span>
                        {sel===i.value && <CheckCircle2 size={16} className="text-[#CC0055]"/>}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Cantidad de paquetes */}
        <div>
          <h3 className="text-[10px] font-medium tracking-[0.15em] uppercase text-[#6B6B6B] mb-4">2. Cantidad de paquetes</h3>
          <div className="max-w-[200px]">
            <div className="flex items-center border border-[#E0E0E0] rounded focus-within:border-[#CC0055] transition-colors">
              <input type="number" value={qty} onChange={e=>setQty(e.target.value)} min="1" step="1"
                className="flex-1 px-4 py-3 text-base font-light outline-none bg-transparent"/>
              <span className="pr-4 text-sm text-[#6B6B6B]">paq</span>
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
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2.5 pb-5 border-b border-white/10">
                <div className="flex justify-between text-sm">
                  <span className="text-white/40 font-light">Producto</span>
                  <span className="text-white font-light text-xs text-right max-w-[160px] leading-tight">{item.label}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/40 font-light">Cantidad</span>
                  <span className="text-white font-light">{cal.q} paq</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/40 font-light">Precio por paquete</span>
                  <span className="text-[#CC0055] font-medium">{formatMXN(item.precio)}</span>
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
