"use client";
import { useState, useMemo } from "react";
import { LONA_PX, LONA_CALIDADES, LONA_ROLLS_BASE, LONA_ROLLS_HI, LONA_HI_KEYS, calcPaneles, calcOjillos, formatMXN, IVA, ANTICIPO } from "@/lib/precios";
import { Info, CheckCircle2, AlertCircle, ArrowRight } from "lucide-react";

type Tipo = "front" | "mesh" | "bl";

const TIPOS = [
  { id: "front" as Tipo, label: "Frontlit" },
  { id: "mesh"  as Tipo, label: "Mesh" },
  { id: "bl"    as Tipo, label: "Backlight" },
];

export default function LonaCalculator() {
  const [ancho, setAncho] = useState("1");
  const [alto,  setAlto]  = useState("2");
  const [qty,   setQty]   = useState("1");
  const [tipo,  setTipo]  = useState<Tipo>("front");
  const [calidad, setCalidad] = useState("c2");
  const [ojMode, setOjMode]   = useState("0");
  const [ojCm,   setOjCm]    = useState("20");

  const cals = useMemo(() => LONA_CALIDADES.filter(c => c.tipo === tipo), [tipo]);

  const cal = useMemo(() => {
    const w = parseFloat(ancho) || 0;
    const h = parseFloat(alto)  || 0;
    const q = parseInt(qty)     || 1;
    if (!w || !h) return null;
    const isHi = LONA_HI_KEYS.includes(calidad);
    const rolls = isHi ? LONA_ROLLS_HI : LONA_ROLLS_BASE;
    const plan  = calcPaneles(w, rolls);
    const ppsm  = LONA_PX[calidad] ?? null;
    if (!ppsm) return null;
    const area  = plan.tw * h;
    const print = area * ppsm;
    let ojExtra = 0, ojCost = 0;
    if (ojMode !== "0") {
      const sep = ojMode === "custom" ? (parseFloat(ojCm) || 20) / 100 : parseInt(ojMode) / 100;
      const base = calcOjillos(w, h, 1);
      ojExtra = Math.max(0, calcOjillos(w, h, sep) - base);
      ojCost  = ojExtra * 3;
    }
    const unit = print + ojCost;
    const sub  = unit * q;
    const iva  = sub * IVA;
    const total = sub + iva;
    return { w, h, plan, area, ppsm, print, ojExtra, ojCost, unit, sub, iva, total, anticipo: total * ANTICIPO };
  }, [ancho, alto, qty, tipo, calidad, ojMode, ojCm]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-0.5 bg-[#E0E0E0] max-w-6xl">

      {/* Configuración */}
      <div className="lg:col-span-3 bg-white p-8 md:p-10 flex flex-col gap-8">

        {/* Medidas */}
        <div>
          <h3 className="text-[10px] font-medium tracking-[0.15em] uppercase text-[#6B6B6B] mb-5">1. Medidas</h3>
          <div className="grid grid-cols-3 gap-4">
            {[["Ancho","ancho",ancho,setAncho],["Alto","alto",alto,setAlto],["Cantidad","qty",qty,setQty]].map(([l,id,v,fn])=>(
              <div key={id as string}>
                <label className="text-sm font-medium text-[#111] block mb-2">{l as string}</label>
                <div className="flex items-center border border-[#E0E0E0] rounded focus-within:border-[#CC0055] transition-colors">
                  <input type="number" value={v as string} onChange={e=>(fn as (s:string)=>void)(e.target.value)}
                    min="0.1" step={id==="qty"?"1":"0.01"}
                    className="flex-1 px-4 py-3 text-base font-light outline-none bg-transparent w-20"/>
                  <span className="pr-3 text-sm text-[#6B6B6B]">{id==="qty"?"pzas":"m"}</span>
                </div>
              </div>
            ))}
          </div>
          {cal && cal.plan.tw !== cal.w && (
            <div className="mt-3 flex items-start gap-2 text-xs font-light text-[#6B6B6B] bg-[#F5F5F5] px-3 py-2.5 rounded">
              <Info size={13} className="text-[#CC0055] mt-0.5 shrink-0"/>
              Ancho {cal.w}m → se cobra al rollo más cercano:{" "}
              <strong className="text-[#CC0055] ml-1">{cal.plan.paneles.map(p=>p+"m").join(" + ")} = {cal.plan.tw.toFixed(2)}m</strong>
            </div>
          )}
        </div>

        {/* Tipo */}
        <div>
          <h3 className="text-[10px] font-medium tracking-[0.15em] uppercase text-[#6B6B6B] mb-4">2. Tipo de material</h3>
          <div className="flex gap-2 flex-wrap">
            {TIPOS.map(t=>(
              <button key={t.id} onClick={()=>{setTipo(t.id);setCalidad(LONA_CALIDADES.find(c=>c.tipo===t.id)?.id||"c2");}}
                className={`px-5 py-2.5 text-sm rounded border transition-all ${tipo===t.id?"bg-[#CC0055] text-white border-[#CC0055] font-medium":"border-[#E0E0E0] text-[#3A3A3A] font-light hover:border-[#CC0055]"}`}>
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Calidad */}
        <div>
          <h3 className="text-[10px] font-medium tracking-[0.15em] uppercase text-[#6B6B6B] mb-4">3. Calidad</h3>
          <div className="flex flex-col gap-2">
            {cals.map(c=>{
              const px = LONA_PX[c.id];
              const sel = calidad === c.id;
              return (
                <button key={c.id} onClick={()=>setCalidad(c.id)}
                  className={`flex items-center justify-between px-5 py-4 rounded border text-left transition-all ${sel?"border-[#CC0055] bg-[#FFF0F5]":"border-[#E0E0E0] hover:border-[#CC0055]/50"}`}>
                  <div>
                    <p className="text-sm font-medium text-[#111]">{c.label}</p>
                    <p className="text-xs font-light text-[#6B6B6B] mt-0.5">{c.desc}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-[#CC0055]">{formatMXN(px)}/m²</span>
                    {sel && <CheckCircle2 size={16} className="text-[#CC0055]"/>}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Ojillos */}
        <div>
          <h3 className="text-[10px] font-medium tracking-[0.15em] uppercase text-[#6B6B6B] mb-4">4. Ojillos</h3>
          <div className="flex flex-col gap-3">
            <select value={ojMode} onChange={e=>setOjMode(e.target.value)}
              className="w-full px-4 py-3 border border-[#E0E0E0] rounded text-sm font-light outline-none focus:border-[#CC0055]">
              <option value="0">Normales — incluidos sin costo</option>
              <option value="50">Cada 50 cm (+$3 por ojillo extra)</option>
              <option value="30">Cada 30 cm (+$3 por ojillo extra)</option>
              <option value="custom">Personalizado</option>
            </select>
            {ojMode==="custom" && (
              <div className="flex items-center gap-3">
                <label className="text-sm text-[#6B6B6B]">Separación:</label>
                <input type="number" value={ojCm} onChange={e=>setOjCm(e.target.value)} min="5" step="5"
                  className="w-24 px-3 py-2 border border-[#E0E0E0] rounded text-sm focus:border-[#CC0055] outline-none"/>
                <span className="text-sm text-[#6B6B6B]">cm</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Resumen */}
      <div className="lg:col-span-2 bg-[#111] p-8 md:p-10 flex flex-col justify-between">
        <div>
          <h3 className="text-[10px] font-medium tracking-[0.15em] uppercase text-white/40 mb-8">Resumen del pedido</h3>

          {!cal ? (
            <div className="flex flex-col items-center text-center py-12 gap-4">
              <AlertCircle size={28} className="text-white/20"/>
              <p className="text-sm font-light text-white/25 max-w-[180px]">Ingresa tus medidas para ver el precio.</p>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2.5 pb-5 border-b border-white/10">
                <div className="flex justify-between text-sm">
                  <span className="text-white/40 font-light">Medida solicitada</span>
                  <span className="text-white font-light">{cal.w}m × {cal.h}m</span>
                </div>
                {cal.plan.tw !== cal.w && (
                  <div className="flex justify-between text-sm">
                    <span className="text-white/40 font-light">Cobrado</span>
                    <span className="text-[#CC0055] font-medium">{cal.plan.tw.toFixed(2)}m × {cal.h}m</span>
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
                {cal.ojExtra > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-white/40 font-light">Ojillos extra ({cal.ojExtra} × $3)</span>
                    <span className="text-white font-light">+{formatMXN(cal.ojCost)}</span>
                  </div>
                )}
                {parseInt(qty)>1 && (
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
