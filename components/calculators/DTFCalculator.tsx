"use client";
import { useState, useMemo } from "react";
import { TEXTIL, formatMXN, IVA, ANTICIPO } from "@/lib/precios";
import { Info, AlertCircle, ArrowRight } from "lucide-react";

const DTF_TIPOS = [
  { id: "dtf-normal",  label: "DTF Normal",         desc: "Transfer estándar para textil", precio: 180, unidad: "m²" },
  { id: "dtf-premium", label: "DTF Premium",         desc: "Transfer de alta definición",   precio: 290, unidad: "m²" },
  { id: "dtf-uv-1",    label: "DTF UV — Primer metro", desc: "Impresión directa UV, primer metro", precio: 600, unidad: "metro" },
  { id: "dtf-uv-05",   label: "DTF UV — Medio metro", desc: "Impresión directa UV, medio metro",   precio: 300, unidad: "metro" },
];

const PLANCHADO = [
  { id: "pl-gde",  label: "Planchado Grande",   precio: 20 },
  { id: "pl-chi",  label: "Planchado Chico",     precio: 15 },
  { id: "pl-gor",  label: "Planchado Gorra",     precio: 10 },
  { id: "pl-eti",  label: "Planchado Etiqueta",  precio: 5  },
];

export default function DTFCalculator() {
  const [tipo,     setTipo]     = useState("dtf-normal");
  const [ancho,    setAncho]    = useState("0.5");
  const [largo,    setLargo]    = useState("1");
  const [qty,      setQty]      = useState("1");
  const [planchado, setPlanchado] = useState("");
  const [qtyPl,    setQtyPl]    = useState("1");

  const t = DTF_TIPOS.find(d => d.id === tipo)!;
  const isUV = tipo.startsWith("dtf-uv");

  const cal = useMemo(() => {
    const q  = parseInt(qty)       || 1;
    const qp = parseInt(qtyPl)     || 0;
    const w  = parseFloat(ancho)   || 0;
    const l  = parseFloat(largo)   || 0;

    let unitDTF = 0;
    if (isUV) {
      unitDTF = t.precio; // precio fijo por metro o medio metro
    } else {
      const area = w * l;
      unitDTF = area * t.precio;
    }

    const subDTF = unitDTF * q;
    const pl     = PLANCHADO.find(p => p.id === planchado);
    const subPl  = pl && qp > 0 ? pl.precio * qp : 0;
    const sub    = subDTF + subPl;
    const iva    = sub * IVA;
    const total  = sub + iva;

    return { q, w, l, unitDTF, subDTF, subPl, sub, iva, total, anticipo: total * ANTICIPO, pl };
  }, [tipo, ancho, largo, qty, planchado, qtyPl, isUV, t]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-0.5 bg-[#E0E0E0] max-w-6xl">
      <div className="lg:col-span-3 bg-white p-8 md:p-10 flex flex-col gap-8">

        {/* Tipo DTF */}
        <div>
          <h3 className="text-[10px] font-medium tracking-[0.15em] uppercase text-[#6B6B6B] mb-4">1. Tipo de DTF</h3>
          <div className="flex flex-col gap-2">
            {DTF_TIPOS.map(d => (
              <button key={d.id} onClick={()=>setTipo(d.id)}
                className={`flex items-center justify-between px-5 py-4 rounded border text-left transition-all ${tipo===d.id?"border-[#CC0055] bg-[#FFF0F5]":"border-[#E0E0E0] hover:border-[#CC0055]/50"}`}>
                <div>
                  <p className="text-sm font-medium text-[#111]">{d.label}</p>
                  <p className="text-xs font-light text-[#6B6B6B] mt-0.5">{d.desc}</p>
                </div>
                <span className="text-sm font-medium text-[#CC0055] shrink-0 ml-4">{formatMXN(d.precio)}/{d.unidad}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Medidas / cantidad */}
        <div>
          <h3 className="text-[10px] font-medium tracking-[0.15em] uppercase text-[#6B6B6B] mb-4">2. {isUV ? "Cantidad de metros" : "Medidas"}</h3>
          {isUV ? (
            <div className="max-w-[200px]">
              <label className="text-sm font-medium text-[#111] block mb-2">Cantidad</label>
              <div className="flex items-center border border-[#E0E0E0] rounded focus-within:border-[#CC0055] transition-colors">
                <input type="number" value={qty} onChange={e=>setQty(e.target.value)} min="1" step="1"
                  className="flex-1 px-4 py-3 text-base font-light outline-none bg-transparent"/>
                <span className="pr-4 text-sm text-[#6B6B6B]">metros</span>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-4">
              {([["Ancho",ancho,setAncho],["Largo",largo,setLargo],["Cantidad",qty,setQty]] as [string,string,(s:string)=>void][]).map(([l,v,fn],i)=>(
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
          )}
        </div>

        {/* Planchado opcional */}
        <div>
          <h3 className="text-[10px] font-medium tracking-[0.15em] uppercase text-[#6B6B6B] mb-4">3. Planchado (opcional)</h3>
          <div className="grid grid-cols-2 gap-2 mb-3">
            {[{id:"",label:"Sin planchado"}, ...PLANCHADO].map(p=>(
              <button key={p.id} onClick={()=>setPlanchado(p.id)}
                className={`px-4 py-2.5 text-sm rounded border transition-all text-left ${planchado===p.id?"bg-[#CC0055] text-white border-[#CC0055] font-medium":"border-[#E0E0E0] text-[#3A3A3A] font-light hover:border-[#CC0055]"}`}>
                {'precio' in p ? `${p.label} — ${formatMXN(p.precio)}` : p.label}
              </button>
            ))}
          </div>
          {planchado && (
            <div className="flex items-center gap-3">
              <label className="text-sm font-light text-[#6B6B6B]">Cantidad a planchar:</label>
              <div className="flex items-center border border-[#E0E0E0] rounded focus-within:border-[#CC0055] w-28">
                <input type="number" value={qtyPl} onChange={e=>setQtyPl(e.target.value)} min="1"
                  className="flex-1 px-3 py-2 text-sm font-light outline-none bg-transparent"/>
                <span className="pr-3 text-xs text-[#6B6B6B]">pzas</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Resumen */}
      <div className="lg:col-span-2 bg-[#111] p-8 md:p-10 flex flex-col justify-between">
        <div>
          <h3 className="text-[10px] font-medium tracking-[0.15em] uppercase text-white/40 mb-8">Resumen</h3>
          {!cal ? (
            <div className="flex flex-col items-center text-center py-12 gap-4">
              <AlertCircle size={28} className="text-white/20"/>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2.5 pb-5 border-b border-white/10">
                <div className="flex justify-between text-sm">
                  <span className="text-white/40 font-light">Tipo</span>
                  <span className="text-white font-light text-xs">{t.label}</span>
                </div>
                {!isUV && (
                  <div className="flex justify-between text-sm">
                    <span className="text-white/40 font-light">Medida</span>
                    <span className="text-white font-light">{ancho}m × {largo}m</span>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span className="text-white/40 font-light">Cantidad</span>
                  <span className="text-white font-light">{cal.q} {isUV?"metros":"pzas"}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/40 font-light">Precio unitario DTF</span>
                  <span className="text-white font-light">{formatMXN(cal.unitDTF)}</span>
                </div>
                {cal.pl && cal.subPl > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-white/40 font-light">Planchado ({qtyPl} pzas)</span>
                    <span className="text-white font-light">+{formatMXN(cal.subPl)}</span>
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
          </div>
        )}
      </div>
    </div>
  );
}
