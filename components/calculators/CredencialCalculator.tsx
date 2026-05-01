"use client";
import { useState, useMemo } from "react";
import { CRED, CRED_RANGOS, CRED_NOMBRES, getCredPrecio, formatMXN, IVA, ANTICIPO } from "@/lib/precios";
import { AlertCircle, ArrowRight, CheckCircle2 } from "lucide-react";

const TIPOS = Object.entries(CRED_NOMBRES).map(([id, label]) => ({ id, label }));

export default function CredencialCalculator() {
  const [qty,  setQty]  = useState("50");
  const [tipo, setTipo] = useState("pf");

  const cal = useMemo(() => {
    const q  = parseInt(qty) || 1;
    const px = getCredPrecio(tipo, q);
    const sub   = px * q;
    const iva   = sub * IVA;
    const total = sub + iva;
    // Rango activo
    const rango = CRED_RANGOS.find(r => q >= r[0] && q <= r[1]) || CRED_RANGOS[CRED_RANGOS.length-1];
    return { q, px, sub, iva, total, anticipo: total * ANTICIPO, rango };
  }, [qty, tipo]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-0.5 bg-[#E0E0E0] max-w-6xl">
      <div className="lg:col-span-3 bg-white p-8 md:p-10 flex flex-col gap-8">

        {/* Tipo */}
        <div>
          <h3 className="text-[10px] font-medium tracking-[0.15em] uppercase text-[#6B6B6B] mb-4">1. Tipo de credencial</h3>
          <div className="flex flex-col gap-2">
            {TIPOS.map(t => {
              const sel = tipo === t.id;
              return (
                <button key={t.id} onClick={()=>setTipo(t.id)}
                  className={`flex items-center justify-between px-5 py-4 rounded border text-left transition-all ${sel?"border-[#CC0055] bg-[#FFF0F5]":"border-[#E0E0E0] hover:border-[#CC0055]/50"}`}>
                  <p className="text-sm font-medium text-[#111]">{t.label}</p>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-[#CC0055]">desde {formatMXN(CRED[t.id][CRED[t.id].length-1])}/pza</span>
                    {sel && <CheckCircle2 size={16} className="text-[#CC0055]"/>}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Cantidad */}
        <div>
          <h3 className="text-[10px] font-medium tracking-[0.15em] uppercase text-[#6B6B6B] mb-4">2. Cantidad</h3>
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
              {CRED_RANGOS.map((r, i) => {
                const px  = CRED[tipo][i];
                const isActive = cal && cal.q >= r[0] && cal.q <= r[1];
                return (
                  <div key={i} className={`flex justify-between px-4 py-2.5 rounded text-sm transition-colors ${isActive?"bg-[#FFF0F5] border border-[#CC0055]":"bg-[#F5F5F5]"}`}>
                    <span className={`font-light ${isActive?"text-[#CC0055] font-medium":""}`}>
                      {r[0]}{r[1]===99999?"+":` – ${r[1]}`} pzas
                    </span>
                    <span className={`font-medium ${isActive?"text-[#CC0055]":"text-[#3A3A3A]"}`}>{formatMXN(px)}/pza</span>
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
            <div className="flex flex-col items-center text-center py-12 gap-4">
              <AlertCircle size={28} className="text-white/20"/>
              <p className="text-sm font-light text-white/25">Ingresa cantidad para ver el precio.</p>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2.5 pb-5 border-b border-white/10">
                <div className="flex justify-between text-sm">
                  <span className="text-white/40 font-light">Tipo</span>
                  <span className="text-white font-light text-right text-xs max-w-[160px]">{CRED_NOMBRES[tipo]}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/40 font-light">Cantidad</span>
                  <span className="text-white font-light">{cal.q} piezas</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/40 font-light">Precio por pieza</span>
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
          <div className="mt-8 flex flex-col gap-3">
            <button className="w-full flex items-center justify-center gap-2.5 bg-[#CC0055] text-white font-medium text-base py-4 rounded hover:bg-[#990040] transition-colors">
              Continuar pedido <ArrowRight size={17}/>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
