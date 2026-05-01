"use client";
import { useState, useMemo } from "react";
import { RIGIDOS, formatMXN, IVA, ANTICIPO } from "@/lib/precios";
import { Info, AlertCircle, ArrowRight, CheckCircle2 } from "lucide-react";

const HOJA_W = 0.62;
const HOJA_H = 0.90;

export default function RigidoCalculator() {
  const [mat,   setMat]   = useState(RIGIDOS[0].value);
  const [ancho, setAncho] = useState("0.60");
  const [alto,  setAlto]  = useState("0.90");
  const [qty,   setQty]   = useState("1");

  const cal = useMemo(() => {
    const w  = parseFloat(ancho) || 0;
    const h  = parseFloat(alto)  || 0;
    const q  = parseInt(qty)     || 1;
    const m  = RIGIDOS.find(r => r.value === mat);
    if (!w || !h || !m) return null;

    // Piezas por hoja
    const pph = Math.floor(HOJA_W/w) * Math.floor(HOJA_H/h) || 1;
    const hojas = Math.ceil(q / pph);
    const sub   = hojas * m.precio;
    const iva   = sub * IVA;
    const total = sub + iva;
    return { w, h, q, pph, hojas, px: m.precio, sub, iva, total, anticipo: total*ANTICIPO, label: m.label };
  }, [mat, ancho, alto, qty]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-0.5 bg-[#E0E0E0] max-w-6xl">
      <div className="lg:col-span-3 bg-white p-8 md:p-10 flex flex-col gap-8">

        {/* Medidas */}
        <div>
          <h3 className="text-[10px] font-medium tracking-[0.15em] uppercase text-[#6B6B6B] mb-5">1. Medidas</h3>
          <div className="grid grid-cols-3 gap-4">
            {([["Ancho",ancho,setAncho],["Alto",alto,setAlto],["Cantidad",qty,setQty]] as [string,string,(s:string)=>void][]).map(([l,v,fn],i)=>(
              <div key={l}>
                <label className="text-sm font-medium text-[#111] block mb-2">{l}</label>
                <div className="flex items-center border border-[#E0E0E0] rounded focus-within:border-[#CC0055] transition-colors">
                  <input type="number" value={v} onChange={e=>fn(e.target.value)} min="0.01" step={i===2?"1":"0.01"}
                    className="flex-1 px-4 py-3 text-base font-light outline-none bg-transparent w-20"/>
                  <span className="pr-3 text-sm text-[#6B6B6B]">{i===2?"pzas":"m"}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-3 flex items-start gap-2 bg-[#F5F5F5] px-3 py-2.5 rounded">
            <Info size={13} className="text-[#CC0055] mt-0.5 shrink-0"/>
            <p className="text-xs font-light text-[#6B6B6B]">
              Hoja estándar: {HOJA_W*100}×{HOJA_H*100}cm.
              {cal && ` Caben ${cal.pph} pza${cal.pph!==1?"s":""} por hoja → ${cal.hojas} hoja${cal.hojas!==1?"s":""} para ${cal.q} piezas.`}
            </p>
          </div>
        </div>

        {/* Material */}
        <div>
          <h3 className="text-[10px] font-medium tracking-[0.15em] uppercase text-[#6B6B6B] mb-4">2. Material</h3>
          <div className="flex flex-col gap-2">
            {RIGIDOS.map(r => (
              <button key={r.value} onClick={()=>setMat(r.value)}
                className={`flex items-center justify-between px-5 py-3.5 rounded border text-left transition-all ${mat===r.value?"border-[#CC0055] bg-[#FFF0F5]":"border-[#E0E0E0] hover:border-[#CC0055]/50"}`}>
                <p className="text-sm font-light text-[#111]">{r.label}</p>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-[#CC0055]">{formatMXN(r.precio)}/hoja</span>
                  {mat===r.value && <CheckCircle2 size={14} className="text-[#CC0055]"/>}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Resumen */}
      <div className="lg:col-span-2 bg-[#111] p-8 md:p-10 flex flex-col justify-between">
        <div>
          <h3 className="text-[10px] font-medium tracking-[0.15em] uppercase text-white/40 mb-8">Resumen</h3>
          {!cal ? (
            <div className="flex flex-col items-center text-center py-12"><AlertCircle size={28} className="text-white/20"/></div>
          ) : (
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2.5 pb-5 border-b border-white/10">
                <div className="flex justify-between text-sm">
                  <span className="text-white/40 font-light">Material</span>
                  <span className="text-white font-light text-xs text-right max-w-[160px]">{cal.label}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/40 font-light">Medida</span>
                  <span className="text-white font-light">{cal.w}m × {cal.h}m</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/40 font-light">Cantidad</span>
                  <span className="text-white font-light">{cal.q} pzas</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/40 font-light">Hojas necesarias</span>
                  <span className="text-[#CC0055] font-medium">{cal.hojas}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/40 font-light">Precio por hoja</span>
                  <span className="text-white font-light">{formatMXN(cal.px)}</span>
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
