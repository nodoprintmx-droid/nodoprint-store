"use client";
import { useState, useMemo } from "react";
import { CV_PX, CV_MAT_N, CV_MODO_N, formatMXN, IVA, ANTICIPO } from "@/lib/precios";
import { AlertCircle, ArrowRight, CheckCircle2, Info } from "lucide-react";

const MATERIALES = Object.entries(CV_MAT_N).map(([id, label]) => ({ id, label }));
const MODOS = Object.entries(CV_MODO_N).map(([id, label]) => ({ id, label }));

export default function CorteVinilCalculator() {
  const [mat,  setMat]  = useState("rot");
  const [modo, setModo] = useState("sm-b");
  const [qty,  setQty]  = useState("1");

  const precio = CV_PX[mat]?.[modo] ?? null;

  // Mascarilla y Transfer tienen lógica especial (por pieza / metro lineal)
  const esMascarilla = mat === "mas";
  const esTransfer   = mat === "tra";

  const cal = useMemo(() => {
    if (precio === null) return null;
    const q   = parseInt(qty) || 1;
    const sub = precio * q;
    const iva = sub * IVA;
    const total = sub + iva;
    return { q, precio, sub, iva, total, anticipo: total * ANTICIPO };
  }, [precio, qty]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-0.5 bg-[#E0E0E0] max-w-6xl">
      <div className="lg:col-span-3 bg-white p-8 md:p-10 flex flex-col gap-8">

        {/* Material */}
        <div>
          <h3 className="text-[10px] font-medium tracking-[0.15em] uppercase text-[#6B6B6B] mb-4">1. Material</h3>
          <div className="flex flex-col gap-2">
            {MATERIALES.map(m => (
              <button key={m.id} onClick={()=>setMat(m.id)}
                className={`flex items-center justify-between px-5 py-3.5 rounded border text-left transition-all ${mat===m.id?"border-[#CC0055] bg-[#FFF0F5]":"border-[#E0E0E0] hover:border-[#CC0055]/50"}`}>
                <p className="text-sm font-light text-[#111]">{m.label}</p>
                {mat===m.id && <CheckCircle2 size={15} className="text-[#CC0055] shrink-0"/>}
              </button>
            ))}
          </div>
        </div>

        {/* Modo — solo si no es mascarilla ni transfer */}
        {!esMascarilla && !esTransfer && (
          <div>
            <h3 className="text-[10px] font-medium tracking-[0.15em] uppercase text-[#6B6B6B] mb-4">2. Modalidad</h3>
            <div className="flex flex-col gap-2">
              {MODOS.map(m => {
                const px = CV_PX[mat]?.[m.id];
                if (px === undefined) return null;
                return (
                  <button key={m.id} onClick={()=>setModo(m.id)}
                    className={`flex items-center justify-between px-5 py-3.5 rounded border text-left transition-all ${modo===m.id?"border-[#CC0055] bg-[#FFF0F5]":"border-[#E0E0E0] hover:border-[#CC0055]/50"}`}>
                    <p className="text-sm font-light text-[#111]">{m.label}</p>
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-medium text-[#CC0055]">{formatMXN(px)}</span>
                      {modo===m.id && <CheckCircle2 size={15} className="text-[#CC0055]"/>}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Cantidad */}
        <div>
          <h3 className="text-[10px] font-medium tracking-[0.15em] uppercase text-[#6B6B6B] mb-4">{!esMascarilla && !esTransfer ? "3." : "2."} Cantidad</h3>
          <div className="max-w-[200px]">
            <div className="flex items-center border border-[#E0E0E0] rounded focus-within:border-[#CC0055] transition-colors">
              <input type="number" value={qty} onChange={e=>setQty(e.target.value)} min="1" step="1"
                className="flex-1 px-4 py-3 text-base font-light outline-none bg-transparent"/>
              <span className="pr-4 text-sm text-[#6B6B6B]">{esTransfer?"metros":esMascarilla?"pzas":"diseños"}</span>
            </div>
          </div>
          {(esMascarilla || esTransfer) && (
            <div className="mt-3 flex items-start gap-2 bg-[#F5F5F5] px-3 py-2.5 rounded">
              <Info size={13} className="text-[#CC0055] mt-0.5 shrink-0"/>
              <p className="text-xs font-light text-[#6B6B6B]">
                {esMascarilla ? "Precio por pieza 8×14cm." : "Precio por metro lineal de transfer."}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Resumen */}
      <div className="lg:col-span-2 bg-[#111] p-8 md:p-10 flex flex-col justify-between">
        <div>
          <h3 className="text-[10px] font-medium tracking-[0.15em] uppercase text-white/40 mb-8">Resumen</h3>
          {!cal ? (
            <div className="flex flex-col items-center text-center py-12">
              <AlertCircle size={28} className="text-white/20"/>
              <p className="text-sm font-light text-white/25 mt-3 max-w-[160px]">Selecciona material y modalidad.</p>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2.5 pb-5 border-b border-white/10">
                <div className="flex justify-between text-sm">
                  <span className="text-white/40 font-light">Material</span>
                  <span className="text-white font-light text-xs text-right max-w-[160px]">{CV_MAT_N[mat]}</span>
                </div>
                {!esMascarilla && !esTransfer && (
                  <div className="flex justify-between text-sm">
                    <span className="text-white/40 font-light">Modalidad</span>
                    <span className="text-white font-light text-xs text-right max-w-[160px]">{CV_MODO_N[modo]}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span className="text-white/40 font-light">Cantidad</span>
                  <span className="text-white font-light">{cal.q} {esTransfer?"metros":esMascarilla?"pzas":"diseños"}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/40 font-light">Precio unitario</span>
                  <span className="text-[#CC0055] font-medium">{formatMXN(cal.precio)}</span>
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
