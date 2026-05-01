"use client";
import { useState, useMemo } from "react";
import { DIG_BASE, DIG_TAMANOS, DIG_PAPELES, getDigPrecio, formatMXN, IVA, ANTICIPO } from "@/lib/precios";
import { Info, AlertCircle, ArrowRight } from "lucide-react";

export default function DigitalCalculator() {
  const [tam,    setTam]   = useState("carta");
  const [lados,  setLados] = useState(1);
  const [papel,  setPapel] = useState("90|0");
  const [qty,    setQty]   = useState("100");

  const cal = useMemo(() => {
    const q   = parseInt(qty) || 1;
    const pap = DIG_PAPELES.find(p => p.value === papel);
    const extra = pap?.extra || 0;
    const base  = getDigPrecio(tam, lados, q);
    const unit  = base + extra;
    const sub   = unit * q;
    const iva   = sub * IVA;
    const total = sub + iva;
    return { q, base, extra, unit, sub, iva, total, anticipo: total * ANTICIPO, papLabel: pap?.label || "" };
  }, [tam, lados, papel, qty]);

  // Tabla de precios para el tamaño seleccionado
  const tbl = DIG_BASE[tam]?.[lados] || [];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-0.5 bg-[#E0E0E0] max-w-6xl">
      <div className="lg:col-span-3 bg-white p-8 md:p-10 flex flex-col gap-8">

        {/* Tamaño */}
        <div>
          <h3 className="text-[10px] font-medium tracking-[0.15em] uppercase text-[#6B6B6B] mb-4">1. Tamaño</h3>
          <div className="flex gap-2 flex-wrap">
            {Object.entries(DIG_TAMANOS).map(([id, label]) => (
              <button key={id} onClick={()=>setTam(id)}
                className={`px-5 py-2.5 text-sm rounded border transition-all ${tam===id?"bg-[#CC0055] text-white border-[#CC0055] font-medium":"border-[#E0E0E0] text-[#3A3A3A] font-light hover:border-[#CC0055]"}`}>
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Lados */}
        <div>
          <h3 className="text-[10px] font-medium tracking-[0.15em] uppercase text-[#6B6B6B] mb-4">2. Impresión</h3>
          <div className="flex gap-2">
            {[{v:1,l:"Solo frente (1×0)"},{v:2,l:"Frente y vuelta (1×1)"}].map(o=>(
              <button key={o.v} onClick={()=>setLados(o.v)}
                className={`px-5 py-2.5 text-sm rounded border transition-all ${lados===o.v?"bg-[#CC0055] text-white border-[#CC0055] font-medium":"border-[#E0E0E0] text-[#3A3A3A] font-light hover:border-[#CC0055]"}`}>
                {o.l}
              </button>
            ))}
          </div>
        </div>

        {/* Papel */}
        <div>
          <h3 className="text-[10px] font-medium tracking-[0.15em] uppercase text-[#6B6B6B] mb-4">3. Papel</h3>
          <div className="flex flex-col gap-2">
            {DIG_PAPELES.map(p => (
              <button key={p.value} onClick={()=>setPapel(p.value)}
                className={`flex items-center justify-between px-5 py-3.5 rounded border text-left transition-all ${papel===p.value?"border-[#CC0055] bg-[#FFF0F5]":"border-[#E0E0E0] hover:border-[#CC0055]/50"}`}>
                <p className="text-sm font-light text-[#111]">{p.label}</p>
                {p.extra > 0 && <span className="text-xs text-amber-600 font-medium">+${p.extra}/pza</span>}
              </button>
            ))}
          </div>
        </div>

        {/* Cantidad */}
        <div>
          <h3 className="text-[10px] font-medium tracking-[0.15em] uppercase text-[#6B6B6B] mb-4">4. Cantidad</h3>
          <div className="max-w-[200px]">
            <div className="flex items-center border border-[#E0E0E0] rounded focus-within:border-[#CC0055] transition-colors">
              <input type="number" value={qty} onChange={e=>setQty(e.target.value)} min="1" step="1"
                className="flex-1 px-4 py-3 text-base font-light outline-none bg-transparent"/>
              <span className="pr-4 text-sm text-[#6B6B6B]">pzas</span>
            </div>
          </div>

          {/* Tabla de rangos */}
          <div className="mt-5">
            <p className="text-xs font-medium text-[#6B6B6B] uppercase tracking-wider mb-3">Precios por volumen</p>
            <div className="flex flex-col gap-1">
              {tbl.map(([min,max,px],i) => {
                const q = parseInt(qty)||0;
                const active = q>=min && q<=max;
                return (
                  <div key={i} className={`flex justify-between px-4 py-2 rounded text-sm ${active?"bg-[#FFF0F5] border border-[#CC0055]":"bg-[#F5F5F5]"}`}>
                    <span className={`font-light ${active?"text-[#CC0055] font-medium":""}`}>
                      {min}{max===99999?"+":` – ${max}`} pzas
                    </span>
                    <span className={`font-medium ${active?"text-[#CC0055]":"text-[#3A3A3A]"}`}>{formatMXN(px)}/pza</span>
                  </div>
                );
              })}
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
                  <span className="text-white/40 font-light">Tamaño</span>
                  <span className="text-white font-light">{DIG_TAMANOS[tam as keyof typeof DIG_TAMANOS]}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/40 font-light">Impresión</span>
                  <span className="text-white font-light">{lados===1?"Solo frente":"Frente y vuelta"}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/40 font-light">Papel</span>
                  <span className="text-white font-light text-xs">{cal.papLabel}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/40 font-light">Cantidad</span>
                  <span className="text-white font-light">{cal.q} pzas</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/40 font-light">Precio base/pza</span>
                  <span className="text-white font-light">{formatMXN(cal.base)}</span>
                </div>
                {cal.extra > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-white/40 font-light">Extra papel</span>
                    <span className="text-white font-light">+{formatMXN(cal.extra)}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span className="text-white/40 font-light">Precio por pieza</span>
                  <span className="text-[#CC0055] font-medium">{formatMXN(cal.unit)}</span>
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
