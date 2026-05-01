"use client";
import { useState, useMemo } from "react";
import { formatMXN, IVA, ANTICIPO } from "@/lib/precios";
import { Info, AlertCircle, ArrowRight, CheckCircle2 } from "lucide-react";

const ANCHO_ROLLO = 0.58; // 58cm fijo

const DTF_TIPOS = [
  { id: "normal",   label: "DTF Normal",   desc: "Transfer estándar para textil",         precio: 180, porMetro: true,  minMetro: 1,   uvMode: false },
  { id: "premium",  label: "DTF Premium",  desc: "Transfer de alta definición",            precio: 290, porMetro: true,  minMetro: 1,   uvMode: false },
  { id: "uv",       label: "DTF UV",       desc: "Impresión directa UV — mínimo 0.5m",    precio: 600, porMetro: false, minMetro: 0.5, uvMode: true  },
];

const PLANCHADO = [
  { id: "gde", label: "Grande",   precio: 20 },
  { id: "chi", label: "Chico",    precio: 15 },
  { id: "gor", label: "Gorra",    precio: 10 },
  { id: "eti", label: "Etiqueta", precio: 5  },
];

function calcMetrosCobrados(metros: number, uvMode: boolean): number {
  if (uvMode) {
    // Mínimo 0.5m, fracciones desde 0.5m
    if (metros <= 0) return 0;
    if (metros <= 0.5) return 0.5;
    return metros; // fracción exacta
  } else {
    // Mínimo 1m, menos de 1m se cobra como 1m
    if (metros <= 0) return 0;
    if (metros < 1) return 1;
    return metros; // fracción exacta
  }
}

export default function DTFCalculator() {
  const [tipo,      setTipo]      = useState("normal");
  const [metros,    setMetros]    = useState("1");
  const [qty,       setQty]       = useState("1");
  const [planchado, setPlanchado] = useState("");
  const [qtyPl,     setQtyPl]     = useState("1");

  const t = DTF_TIPOS.find(d => d.id === tipo)!;

  const cal = useMemo(() => {
    const m  = parseFloat(metros) || 0;
    const q  = parseInt(qty)      || 1;
    const qp = parseInt(qtyPl)    || 0;
    if (!m) return null;

    const metrosCobrados = calcMetrosCobrados(m, t.uvMode);
    const precioUnitario = t.uvMode
      ? metrosCobrados <= 0.5 ? 300 : t.precio * metrosCobrados  // medio metro = $300, más = $600/m
      : t.precio * metrosCobrados;

    const subDTF = precioUnitario * q;
    const pl     = PLANCHADO.find(p => p.id === planchado);
    const subPl  = pl && qp > 0 ? pl.precio * qp : 0;
    const sub    = subDTF + subPl;
    const iva    = sub * IVA;
    const total  = sub + iva;

    const redondeo = m !== metrosCobrados;

    return {
      m, metrosCobrados, q, precioUnitario, subDTF, subPl,
      sub, iva, total, anticipo: total * ANTICIPO,
      redondeo, pl,
      areaCm: (ANCHO_ROLLO * metrosCobrados * 100).toFixed(1),
    };
  }, [tipo, metros, qty, planchado, qtyPl, t]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-0.5 bg-[#E0E0E0] max-w-6xl">
      <div className="lg:col-span-3 bg-white p-8 md:p-10 flex flex-col gap-8">

        {/* Tipo */}
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
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-[#CC0055] shrink-0">
                    {d.uvMode ? `${formatMXN(300)}/0.5m · ${formatMXN(d.precio)}/m` : `${formatMXN(d.precio)}/m`}
                  </span>
                  {tipo===d.id && <CheckCircle2 size={16} className="text-[#CC0055]"/>}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Metros */}
        <div>
          <h3 className="text-[10px] font-medium tracking-[0.15em] uppercase text-[#6B6B6B] mb-4">2. Metros lineales</h3>
          <div className="grid grid-cols-2 gap-4 max-w-xs">
            <div>
              <label className="text-sm font-medium text-[#111] block mb-2">Metros</label>
              <div className="flex items-center border border-[#E0E0E0] rounded focus-within:border-[#CC0055] transition-colors">
                <input type="number" value={metros} onChange={e=>setMetros(e.target.value)}
                  min={t.uvMode?"0.5":"0.1"} step="0.1"
                  className="flex-1 px-4 py-3 text-base font-light outline-none bg-transparent w-20"/>
                <span className="pr-3 text-sm text-[#6B6B6B]">m</span>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-[#111] block mb-2">Cantidad</label>
              <div className="flex items-center border border-[#E0E0E0] rounded focus-within:border-[#CC0055] transition-colors">
                <input type="number" value={qty} onChange={e=>setQty(e.target.value)} min="1" step="1"
                  className="flex-1 px-4 py-3 text-base font-light outline-none bg-transparent w-20"/>
                <span className="pr-3 text-sm text-[#6B6B6B]">pzas</span>
              </div>
            </div>
          </div>

          {/* Info rollo */}
          <div className="mt-3 flex items-start gap-2 bg-[#F5F5F5] px-3 py-2.5 rounded">
            <Info size={13} className="text-[#CC0055] mt-0.5 shrink-0"/>
            <p className="text-xs font-light text-[#6B6B6B]">
              Ancho de rollo fijo: <strong className="text-[#111]">{ANCHO_ROLLO*100}cm</strong>.{" "}
              {t.uvMode
                ? "Mínimo medio metro. Fracciones se cobran exactas desde 0.5m."
                : "Mínimo 1 metro. Menos de 1m se cobra como metro completo."}
            </p>
          </div>

          {/* Aviso de redondeo */}
          {cal?.redondeo && (
            <div className="mt-2 flex items-start gap-2 bg-amber-50 border border-amber-200 px-3 py-2.5 rounded">
              <Info size={13} className="text-amber-500 mt-0.5 shrink-0"/>
              <p className="text-xs font-light text-amber-800">
                {cal.m}m solicitado → se cobra <strong className="font-medium">{cal.metrosCobrados}m</strong> (mínimo).
              </p>
            </div>
          )}
        </div>

        {/* Planchado */}
        <div>
          <h3 className="text-[10px] font-medium tracking-[0.15em] uppercase text-[#6B6B6B] mb-4">3. Planchado (opcional)</h3>
          <div className="grid grid-cols-2 gap-2 mb-3">
            {[{id:"",label:"Sin planchado"}, ...PLANCHADO].map(p => (
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
              <p className="text-sm font-light text-white/25 max-w-[180px]">Ingresa los metros para ver el precio.</p>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2.5 pb-5 border-b border-white/10">
                <div className="flex justify-between text-sm">
                  <span className="text-white/40 font-light">Tipo</span>
                  <span className="text-white font-light">{t.label}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/40 font-light">Ancho rollo</span>
                  <span className="text-white font-light">{ANCHO_ROLLO*100}cm</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/40 font-light">Metros solicitados</span>
                  <span className="text-white font-light">{cal.m}m</span>
                </div>
                {cal.redondeo && (
                  <div className="flex justify-between text-sm">
                    <span className="text-white/40 font-light">Metros cobrados</span>
                    <span className="text-[#CC0055] font-medium">{cal.metrosCobrados}m</span>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span className="text-white/40 font-light">Cantidad</span>
                  <span className="text-white font-light">{cal.q} pzas</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/40 font-light">Precio unitario</span>
                  <span className="text-[#CC0055] font-medium">{formatMXN(cal.precioUnitario)}</span>
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
            <p className="text-xs font-light text-white/20 text-center">Siguiente: subir archivo y datos de entrega</p>
          </div>
        )}
      </div>
    </div>
  );
}
