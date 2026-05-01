"use client";
import { useState, useMemo } from "react";
import { VINIL_MATERIALES, formatMXN, IVA, ANTICIPO } from "@/lib/precios";
import { Info, AlertCircle, ArrowRight, RotateCcw, AlertTriangle } from "lucide-react";

const ROLLO = 1.52;
const TRASLAPE = 0.03;

function calcVinilPaneles(w: number, h: number) {
  // Intenta orientación normal y rotada, elige la que genere menos paneles
  function paneles(dim: number) {
    const n = Math.ceil(dim / ROLLO);
    return { n, tw: n * ROLLO };
  }

  const normal = paneles(w);
  const rotada = paneles(h);

  if (rotada.n < normal.n) {
    // Rotar conviene — paneles van sobre el alto original
    return {
      paneles: Array(rotada.n).fill(ROLLO),
      tw: rotada.tw,   // ancho cobrado (era el alto)
      th: w,           // largo cobrado (era el ancho)
      numPaneles: rotada.n,
      rotada: true,
    };
  }
  return {
    paneles: Array(normal.n).fill(ROLLO),
    tw: normal.tw,
    th: h,
    numPaneles: normal.n,
    rotada: false,
  };
}

const GRUPOS = [...new Set(VINIL_MATERIALES.map(m => m.grupo || "Viniles"))];

export default function VinilCalculator() {
  const [ancho, setAncho] = useState("1");
  const [alto,  setAlto]  = useState("1");
  const [qty,   setQty]   = useState("1");
  const [mat,   setMat]   = useState("130");
  const [grupoActivo, setGrupoActivo] = useState("Viniles");

  const materialesFiltrados = VINIL_MATERIALES.filter(m => (m.grupo || "Viniles") === grupoActivo);

  const cal = useMemo(() => {
    const w = parseFloat(ancho) || 0;
    const h = parseFloat(alto)  || 0;
    const q = parseInt(qty)     || 1;
    const material = VINIL_MATERIALES.find(m => m.value === mat);
    if (!w || !h || !material) return null;

    const plan       = calcVinilPaneles(w, h);
    const numUniones = plan.numPaneles - 1;
    const area       = plan.tw * plan.th;
    const unit       = area * material.precio;
    const sub        = unit * q;
    const iva        = sub * IVA;
    const total      = sub + iva;

    // Medida visible final con traslapes
    const reducTraslape = numUniones * TRASLAPE;
    const anchoVisible = plan.rotada
      ? parseFloat((w).toFixed(3))
      : parseFloat((w - reducTraslape).toFixed(3));
    const altoVisible = plan.rotada
      ? parseFloat((h - reducTraslape).toFixed(3))
      : h;

    return {
      w, h, q, plan, numUniones,
      area, ppsm: material.precio, unit, sub, iva, total,
      anticipo: total * ANTICIPO,
      anchoVisible: Math.max(0, anchoVisible),
      altoVisible:  Math.max(0, altoVisible),
      label: material.label,
    };
  }, [ancho, alto, qty, mat]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-0.5 bg-[#E0E0E0] max-w-6xl">
      <div className="lg:col-span-3 bg-white p-8 md:p-10 flex flex-col gap-8">

        {/* Medidas */}
        <div>
          <h3 className="text-[10px] font-medium tracking-[0.15em] uppercase text-[#6B6B6B] mb-5">1. Medidas</h3>
          <div className="grid grid-cols-3 gap-4">
            {([["Ancho", ancho, setAncho],["Alto", alto, setAlto],["Cantidad", qty, setQty]] as [string,string,(s:string)=>void][]).map(([l,v,fn],i) => (
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

          {/* Rotación */}
          {cal?.plan.rotada && (
            <div className="mt-3 flex items-start gap-2 bg-blue-50 border border-blue-100 px-3 py-3 rounded">
              <RotateCcw size={13} className="text-blue-500 mt-0.5 shrink-0"/>
              <p className="text-xs font-light text-blue-800">
                <strong className="font-medium">Material orientado verticalmente</strong> para optimizar el uso del rollo de {ROLLO}m.
              </p>
            </div>
          )}

          {/* Paneles */}
          {cal && cal.plan.numPaneles > 1 && (
            <div className="mt-3 flex items-start gap-2 bg-amber-50 border border-amber-200 px-3 py-3 rounded">
              <AlertTriangle size={14} className="text-amber-500 mt-0.5 shrink-0"/>
              <div className="text-xs font-light text-amber-800 leading-relaxed">
                <strong className="font-medium">Vinil en {cal.plan.numPaneles} lienzos</strong> de {ROLLO}m c/u
                {cal.plan.rotada ? ` × ${cal.w}m` : ` × ${cal.h}m`}.
                {cal.numUniones > 0 && (
                  <span className="block mt-1">
                    Cada unión lleva <strong>3cm de traslape</strong>. Medida visible final: <strong>{cal.anchoVisible}m × {cal.altoVisible}m</strong>
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Rollo simple con cobro mayor */}
          {cal && cal.plan.numPaneles === 1 && !cal.plan.rotada && cal.plan.tw !== cal.w && (
            <div className="mt-3 flex items-start gap-2 bg-[#F5F5F5] px-3 py-2.5 rounded">
              <Info size={13} className="text-[#CC0055] mt-0.5 shrink-0"/>
              <p className="text-xs font-light text-[#6B6B6B]">
                Ancho {cal.w}m → cobrado al ancho del rollo: <strong className="text-[#CC0055]">{cal.plan.tw.toFixed(2)}m</strong>
              </p>
            </div>
          )}

          <div className="mt-3 flex items-start gap-2 bg-[#F5F5F5] px-3 py-2.5 rounded">
            <Info size={13} className="text-[#CC0055] mt-0.5 shrink-0"/>
            <p className="text-xs font-light text-[#6B6B6B]">
              Rollo estándar de vinil: {ROLLO}m de ancho.
            </p>
          </div>
        </div>

        {/* Grupo */}
        <div>
          <h3 className="text-[10px] font-medium tracking-[0.15em] uppercase text-[#6B6B6B] mb-4">2. Tipo de material</h3>
          <div className="flex gap-2 flex-wrap mb-4">
            {GRUPOS.map(g => (
              <button key={g} onClick={()=>{setGrupoActivo(g); setMat(VINIL_MATERIALES.find(m=>(m.grupo||"Viniles")===g)?.value||"");}}
                className={`px-4 py-2 text-sm rounded border transition-all ${grupoActivo===g?"bg-[#CC0055] text-white border-[#CC0055] font-medium":"border-[#E0E0E0] text-[#3A3A3A] font-light hover:border-[#CC0055]"}`}>
                {g}
              </button>
            ))}
          </div>
          <div className="flex flex-col gap-2 max-h-72 overflow-y-auto pr-1">
            {materialesFiltrados.map(m => (
              <button key={m.value} onClick={()=>setMat(m.value)}
                className={`flex items-center justify-between px-5 py-3.5 rounded border text-left transition-all ${mat===m.value?"border-[#CC0055] bg-[#FFF0F5]":"border-[#E0E0E0] hover:border-[#CC0055]/50"}`}>
                <p className="text-sm font-light text-[#111]">{m.label}</p>
                <span className="text-sm font-medium text-[#CC0055] shrink-0 ml-4">{formatMXN(m.precio)}/m²</span>
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
              <p className="text-sm font-light text-white/25 max-w-[180px]">Ingresa tus medidas para ver el precio.</p>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2.5 pb-5 border-b border-white/10">
                <div className="flex justify-between text-sm">
                  <span className="text-white/40 font-light">Material</span>
                  <span className="text-white font-light text-right max-w-[160px] text-xs leading-tight">{cal.label}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/40 font-light">Medida solicitada</span>
                  <span className="text-white font-light">{cal.w}m × {cal.h}m</span>
                </div>

                {cal.plan.numPaneles > 1 ? (
                  <>
                    <div className="flex justify-between text-sm">
                      <span className="text-white/40 font-light">Lienzos</span>
                      <span className="text-amber-400 font-medium">{cal.plan.numPaneles} lienzos de {ROLLO}m</span>
                    </div>
                    {cal.plan.paneles.map((_,i) => (
                      <div key={i} className="flex justify-between text-sm pl-3 border-l border-white/10">
                        <span className="text-white/30 font-light">Lienzo {i+1}</span>
                        <span className="text-white/60 font-light">
                          {cal.plan.rotada ? `${cal.w}m × ${ROLLO}m` : `${ROLLO}m × ${cal.h}m`}
                        </span>
                      </div>
                    ))}
                    <div className="flex justify-between text-sm">
                      <span className="text-white/40 font-light">Medida visible final</span>
                      <span className="text-white/60 font-light">{cal.anchoVisible}m × {cal.altoVisible}m</span>
                    </div>
                  </>
                ) : (
                  <div className="flex justify-between text-sm">
                    <span className="text-white/40 font-light">Cobrado</span>
                    <span className="text-[#CC0055] font-medium">
                      {cal.plan.rotada ? `${cal.plan.tw.toFixed(2)}m × ${cal.w}m` : `${cal.plan.tw.toFixed(2)}m × ${cal.h}m`}
                    </span>
                  </div>
                )}

                <div className="flex justify-between text-sm">
                  <span className="text-white/40 font-light">Área cobrada</span>
                  <span className="text-white font-light">{cal.area.toFixed(2)} m²</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/40 font-light">Precio m²</span>
                  <span className="text-white font-light">{formatMXN(cal.ppsm)}</span>
                </div>
                {cal.q > 1 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-white/40 font-light">Precio por pieza</span>
                    <span className="text-white font-light">{formatMXN(cal.unit)}</span>
                  </div>
                )}
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
