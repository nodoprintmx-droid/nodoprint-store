"use client";
import { useState, useMemo } from "react";
import { LONA_PX, LONA_CALIDADES, LONA_ROLLS_BASE, LONA_ROLLS_HI, LONA_HI_KEYS, calcPaneles, formatMXN, IVA, ANTICIPO } from "@/lib/precios";
import { Info, CheckCircle2, AlertCircle, ArrowRight, AlertTriangle, RotateCcw } from "lucide-react";

type Tipo = "front" | "mesh" | "bl";
const TIPOS = [
  { id: "front" as Tipo, label: "Frontlit" },
  { id: "mesh"  as Tipo, label: "Mesh" },
  { id: "bl"    as Tipo, label: "Backlight" },
];
const DOBLEZ   = 0.025; // 2.5cm por lado = 5cm total perimetral
const TRASLAPE = 0.03; // 3cm por unión de panel

export default function LonaCalculator() {
  const [ancho,   setAncho]   = useState("1");
  const [alto,    setAlto]    = useState("2");
  const [qty,     setQty]     = useState("1");
  const [tipo,    setTipo]    = useState<Tipo>("front");
  const [calidad, setCalidad] = useState("c2");
  const [conOjillos, setConOjillos] = useState(true);

  const cals = useMemo(() => LONA_CALIDADES.filter(c => c.tipo === tipo), [tipo]);

  const cal = useMemo(() => {
    const w = parseFloat(ancho) || 0;
    const h = parseFloat(alto)  || 0;
    const q = parseInt(qty)     || 1;
    if (!w || !h) return null;

    const isHi  = LONA_HI_KEYS.includes(calidad);
    const rolls = isHi ? LONA_ROLLS_HI : LONA_ROLLS_BASE;
    const plan  = calcPaneles(w, h, rolls);
    const ppsm  = LONA_PX[calidad] ?? null;
    if (!ppsm) return null;

    const numPaneles = plan.paneles.length;
    const numUniones = numPaneles - 1;

    // Dimensiones cobradas según orientación
    // tw = ancho cobrado (dirección de los paneles), th = largo cobrado
    const area  = plan.tw * plan.th;
    const print = area * ppsm;
    const sub   = print * q;
    const iva   = sub * IVA;
    const total = sub + iva;

    // Medida visible final
    // La reducción por traslape va en la dirección de los paneles (tw)
    const reducTraslape = numUniones * TRASLAPE;
    const reducDoblez   = conOjillos ? 2 * DOBLEZ : 0;
    // Dirección de paneles: si rotada, los paneles van en el alto original
    const visibleDir    = parseFloat((plan.tw - reducTraslape - reducDoblez).toFixed(3));
    const visiblePerp   = parseFloat((plan.th - reducDoblez).toFixed(3));
    // Presentar en términos de ancho/alto originales del cliente
    const anchoVisible  = plan.rotada ? visiblePerp : visibleDir;
    const altoVisible   = plan.rotada ? visibleDir  : visiblePerp;

    return {
      w, h, q, plan, numPaneles, numUniones,
      area, ppsm, print, sub, iva, total,
      anticipo: total * ANTICIPO,
      anchoVisible: Math.max(0, anchoVisible),
      altoVisible:  Math.max(0, altoVisible),
    };
  }, [ancho, alto, qty, tipo, calidad, conOjillos]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-0.5 bg-[#E0E0E0] max-w-6xl">

      {/* Configuración */}
      <div className="lg:col-span-3 bg-white p-8 md:p-10 flex flex-col gap-8">

        {/* Medidas */}
        <div>
          <h3 className="text-[10px] font-medium tracking-[0.15em] uppercase text-[#6B6B6B] mb-5">1. Medidas</h3>
          <div className="grid grid-cols-3 gap-4">
            {([["Ancho", ancho, setAncho], ["Alto", alto, setAlto], ["Cantidad", qty, setQty]] as [string, string, (s:string)=>void][]).map(([l, v, fn], i) => (
              <div key={l}>
                <label className="text-sm font-medium text-[#111] block mb-2">{l}</label>
                <div className="flex items-center border border-[#E0E0E0] rounded focus-within:border-[#CC0055] transition-colors">
                  <input type="number" value={v} onChange={e => fn(e.target.value)}
                    min="0.01" step={i === 2 ? "1" : "0.01"}
                    className="flex-1 px-4 py-3 text-base font-light outline-none bg-transparent w-20" />
                  <span className="pr-3 text-sm text-[#6B6B6B]">{i === 2 ? "pzas" : "m"}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Aviso de rotación */}
          {cal && cal.plan.rotada && (
            <div className="mt-3 flex items-start gap-2 bg-blue-50 border border-blue-100 px-3 py-3 rounded">
              <RotateCcw size={13} className="text-blue-500 mt-0.5 shrink-0" />
              <p className="text-xs font-light text-blue-800 leading-relaxed">
                <strong className="font-medium">Lona orientada verticalmente:</strong> se imprime rotada para aprovechar el rollo de {cal.plan.paneles[0]}m sin necesidad de paneles adicionales.
              </p>
            </div>
          )}

          {/* Aviso de paneles */}
          {cal && cal.numPaneles > 1 && (
            <div className="mt-3 flex items-start gap-2 bg-amber-50 border border-amber-200 px-3 py-3 rounded">
              <AlertTriangle size={14} className="text-amber-500 mt-0.5 shrink-0" />
              <div className="text-xs font-light text-amber-800 leading-relaxed">
                <strong className="font-medium">Lona en {cal.numPaneles} paneles:</strong>{" "}
                {cal.plan.paneles.map((p, i) => cal.plan.rotada ? `Panel ${i+1}: ${cal.w}m × ${p}m` : `Panel ${i+1}: ${p}m × ${cal.h}m`).join(" · ")}
                <span className="block mt-1">
                  Cada unión lleva <strong>3cm de traslape</strong> — la medida visible se reduce {(cal.numUniones * TRASLAPE * 100).toFixed(0)}cm.
                </span>
              </div>
            </div>
          )}

          {/* Aviso rollo simple */}
          {cal && cal.numPaneles === 1 && !cal.plan.rotada && cal.plan.tw !== cal.w && (
            <div className="mt-3 flex items-start gap-2 bg-[#F5F5F5] px-3 py-2.5 rounded">
              <Info size={13} className="text-[#CC0055] mt-0.5 shrink-0" />
              <p className="text-xs font-light text-[#6B6B6B]">
                Ancho {cal.w}m → cobrado al rollo más cercano: <strong className="text-[#CC0055]">{cal.plan.tw}m</strong>
              </p>
            </div>
          )}
        </div>

        {/* Tipo */}
        <div>
          <h3 className="text-[10px] font-medium tracking-[0.15em] uppercase text-[#6B6B6B] mb-4">2. Tipo de material</h3>
          <div className="flex gap-2 flex-wrap">
            {TIPOS.map(t => (
              <button key={t.id} onClick={() => { setTipo(t.id); setCalidad(LONA_CALIDADES.find(c => c.tipo === t.id)?.id || "c2"); }}
                className={`px-5 py-2.5 text-sm rounded border transition-all ${tipo === t.id ? "bg-[#CC0055] text-white border-[#CC0055] font-medium" : "border-[#E0E0E0] text-[#3A3A3A] font-light hover:border-[#CC0055]"}`}>
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Calidad */}
        <div>
          <h3 className="text-[10px] font-medium tracking-[0.15em] uppercase text-[#6B6B6B] mb-4">3. Calidad</h3>
          <div className="flex flex-col gap-2">
            {cals.map(c => {
              const px  = LONA_PX[c.id];
              const sel = calidad === c.id;
              return (
                <button key={c.id} onClick={() => setCalidad(c.id)}
                  className={`flex items-center justify-between px-5 py-4 rounded border text-left transition-all ${sel ? "border-[#CC0055] bg-[#FFF0F5]" : "border-[#E0E0E0] hover:border-[#CC0055]/50"}`}>
                  <div>
                    <p className="text-sm font-medium text-[#111]">{c.label}</p>
                    <p className="text-xs font-light text-[#6B6B6B] mt-0.5">{c.desc}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-[#CC0055]">{formatMXN(px)}/m²</span>
                    {sel && <CheckCircle2 size={16} className="text-[#CC0055]" />}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Ojillos */}
        <div>
          <h3 className="text-[10px] font-medium tracking-[0.15em] uppercase text-[#6B6B6B] mb-4">4. Ojillos</h3>
          <label className="flex items-center gap-3 cursor-pointer mb-3">
            <div onClick={() => setConOjillos(!conOjillos)}
              className={`w-11 h-6 rounded-full relative transition-colors ${conOjillos ? "bg-[#CC0055]" : "bg-[#E0E0E0]"}`}>
              <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${conOjillos ? "translate-x-6" : "translate-x-1"}`} />
            </div>
            <span className="text-sm font-light text-[#3A3A3A]">Con ojillos perimetrales</span>
          </label>
          {conOjillos && (
            <div className="flex items-start gap-2 bg-blue-50 border border-blue-100 px-3 py-3 rounded">
              <Info size={13} className="text-blue-500 mt-0.5 shrink-0" />
              <p className="text-xs font-light text-blue-800 leading-relaxed">
                Los ojillos requieren <strong className="font-medium">5cm perimetrales de doblez</strong> en todos los lados.
                {cal && (
                  <span className="block mt-0.5">
                    Medida visible final: <strong className="font-medium text-blue-900">{cal.anchoVisible}m × {cal.altoVisible}m</strong>
                  </span>
                )}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Resumen */}
      <div className="lg:col-span-2 bg-[#111] p-8 md:p-10 flex flex-col justify-between">
        <div>
          <h3 className="text-[10px] font-medium tracking-[0.15em] uppercase text-white/40 mb-8">Resumen del pedido</h3>

          {!cal ? (
            <div className="flex flex-col items-center text-center py-12 gap-4">
              <AlertCircle size={28} className="text-white/20" />
              <p className="text-sm font-light text-white/25 max-w-[180px]">Ingresa tus medidas para ver el precio.</p>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2.5 pb-5 border-b border-white/10">
                <div className="flex justify-between text-sm">
                  <span className="text-white/40 font-light">Medida solicitada</span>
                  <span className="text-white font-light">{cal.w}m × {cal.h}m</span>
                </div>

                {cal.plan.rotada && (
                  <div className="flex justify-between text-sm">
                    <span className="text-white/40 font-light">Orientación</span>
                    <span className="text-blue-400 font-medium">Rotada (1 panel)</span>
                  </div>
                )}

                {cal.numPaneles > 1 && (
                  <>
                    <div className="flex justify-between text-sm">
                      <span className="text-white/40 font-light">Paneles</span>
                      <span className="text-amber-400 font-medium">{cal.numPaneles} paneles</span>
                    </div>
                    {cal.plan.paneles.map((p, i) => (
                      <div key={i} className="flex justify-between text-sm pl-3 border-l border-white/10">
                        <span className="text-white/30 font-light">Panel {i + 1}</span>
                        <span className="text-white/60 font-light">
                          {cal.plan.rotada ? `${cal.w}m × ${p}m` : `${p}m × ${cal.h}m`}
                        </span>
                      </div>
                    ))}
                  </>
                )}

                {cal.numPaneles === 1 && !cal.plan.rotada && cal.plan.tw !== cal.w && (
                  <div className="flex justify-between text-sm">
                    <span className="text-white/40 font-light">Cobrado (rollo)</span>
                    <span className="text-[#CC0055] font-medium">{cal.plan.tw}m × {cal.h}m</span>
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
                {conOjillos && (
                  <div className="flex justify-between text-sm">
                    <span className="text-white/40 font-light">Medida visible final</span>
                    <span className="text-white/60 font-light">{cal.anchoVisible}m × {cal.altoVisible}m</span>
                  </div>
                )}
                {cal.q > 1 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-white/40 font-light">Precio por pieza</span>
                    <span className="text-white font-light">{formatMXN(cal.print)}</span>
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
              Continuar pedido <ArrowRight size={17} />
            </button>
            <p className="text-xs font-light text-white/20 text-center">Siguiente: subir archivo y datos de entrega</p>
          </div>
        )}
      </div>
    </div>
  );
}
