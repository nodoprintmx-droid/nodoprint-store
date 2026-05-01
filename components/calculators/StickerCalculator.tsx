"use client";
import { useState, useMemo } from "react";
import { STICKER_MATERIALES, ST_MAP, formatMXN, IVA, ANTICIPO } from "@/lib/precios";
import { Info, AlertCircle, ArrowRight } from "lucide-react";

const PLANILLA_W = 0.26;
const PLANILLA_H = 0.42;

export default function StickerCalculator() {
  const [qty,  setQty]  = useState("100");
  const [mat,  setMat]  = useState("39");
  const [anchoStk, setAnchoStk] = useState("10");
  const [altoStk,  setAltoStk]  = useState("10");

  const cal = useMemo(() => {
    const q    = parseInt(qty)        || 1;
    const aw   = parseFloat(anchoStk) / 100 || 0.1;
    const ah   = parseFloat(altoStk)  / 100 || 0.1;
    const px   = ST_MAP[mat];
    if (!px) return null;

    // Piezas por planilla
    const pxPlan = Math.floor(PLANILLA_W / aw) * Math.floor(PLANILLA_H / ah);
    const piezasPorPlanilla = Math.max(1, pxPlan);
    const planillas = Math.ceil(q / piezasPorPlanilla);

    const unit  = px;
    const sub   = planillas * unit;
    const iva   = sub * IVA;
    const total = sub + iva;
    const label = STICKER_MATERIALES.find(m => m.value === mat)?.label || "";

    return { q, aw, ah, piezasPorPlanilla, planillas, unit, sub, iva, total, anticipo: total * ANTICIPO, label };
  }, [qty, mat, anchoStk, altoStk]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-0.5 bg-[#E0E0E0] max-w-6xl">
      <div className="lg:col-span-3 bg-white p-8 md:p-10 flex flex-col gap-8">

        {/* Medidas del sticker */}
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
              Planilla estándar: {PLANILLA_W*100}×{PLANILLA_H*100}cm.
              {cal && ` Caben ${cal.piezasPorPlanilla} stickers por planilla → ${cal.planillas} planilla${cal.planillas!==1?"s":""} para ${cal.q} piezas.`}
            </p>
          </div>
        </div>

        {/* Material */}
        <div>
          <h3 className="text-[10px] font-medium tracking-[0.15em] uppercase text-[#6B6B6B] mb-4">2. Material y acabado</h3>
          <div className="flex flex-col gap-2">
            {STICKER_MATERIALES.map(m => (
              <button key={m.value} onClick={()=>setMat(m.value)}
                className={`flex items-center justify-between px-5 py-3.5 rounded border text-left transition-all ${mat===m.value?"border-[#CC0055] bg-[#FFF0F5]":"border-[#E0E0E0] hover:border-[#CC0055]/50"}`}>
                <p className="text-sm font-light text-[#111]">{m.label}</p>
                <span className="text-sm font-medium text-[#CC0055] shrink-0 ml-4">{formatMXN(m.precio)}/planilla</span>
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
            <div className="flex flex-col items-center text-center py-12 gap-4">
              <AlertCircle size={28} className="text-white/20"/>
              <p className="text-sm font-light text-white/25 max-w-[180px]">Ingresa los datos para ver el precio.</p>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2.5 pb-5 border-b border-white/10">
                <div className="flex justify-between text-sm">
                  <span className="text-white/40 font-light">Material</span>
                  <span className="text-white font-light text-right max-w-[160px] text-xs leading-tight">{cal.label}</span>
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
                  <span className="text-white font-light">{cal.piezasPorPlanilla} pzas</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/40 font-light">Planillas necesarias</span>
                  <span className="text-[#CC0055] font-medium">{cal.planillas}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/40 font-light">Precio por planilla</span>
                  <span className="text-white font-light">{formatMXN(cal.unit)}</span>
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
