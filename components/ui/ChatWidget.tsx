"use client";
import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, ArrowRight } from "lucide-react";

interface Message { role: "user" | "assistant"; content: string; }

const SYSTEM = `Eres el asistente virtual de Nodoprint, un estudio creativo de impresión de gran formato y DTF en Ciudad de México. Tu nombre es Nodo.

Tu misión es ayudar a los clientes a cotizar, resolver dudas y guiarlos hacia el cotizador en línea o a WhatsApp para cerrar pedidos.

INFORMACIÓN DE NODOPRINT:
- Dos sucursales en CDMX:
  · Algarín: Juan Hernández y Dávalos 79, Col. Algarín, Cuauhtémoc
  · Obrera: José Peón Contreras 122, Col. Obrera, Cuauhtémoc
- WhatsApp: 55 6901 5912
- Horario: Lun–Vie 10am–6pm · Sáb 10am–3pm
- Anticipo: 75% para iniciar producción
- Tiempos: 24–48 horas hábiles una vez aprobado el archivo
- Formatos de archivo: PDF, AI, CDR, JPG alta resolución

PRODUCTOS Y PRECIOS:
LONAS (por m², cobro por ancho de rollo más cercano):
- C1: $60/m² | C2: $75/m² | C3 Front: $96/m² | C3 Mesh: $120/m² | C3 BL: $120/m²
- 1200 Front: $120 | Mesh: $160 | BL: $160 · 1440 Front: $130 | Mesh: $180 | BL: $190
- UV Front: $240 | Mesh: $270 | BL: $270
- Rollos: 1m, 1.5m, 2m, 2.5m, 3.2m. Ojillos: 5cm perimetrales. Paneles: traslape 3cm.

VINILES (por m², rollo 1.52m):
- Brillante: $130–$270 | Mate: $135–$275 | Microperforado: $170–$260
- Holográfico: $480–$580 | Floorgraphic: $200/m²

DTF TEXTIL (metros lineales, rollo 58cm):
- Normal: $180/m (mín 1m) | Premium: $290/m (mín 1m) | UV: $300/0.5m o $600/m

STICKERS (por planilla):
- Vinil 26×42cm: $39–$59 | Metálicos 26×42cm: $65–$85
- UV 145×50cm: $490–$560 | Holográfico 120×50cm: $680

CREDENCIALES PVC: Premium frente $40–$45 | f+v $64–$69 | Estándar frente $34–$39

IMPRESIÓN DIGITAL: Carta $5–$7/pza | Tabloide $9–$11/pza (según volumen)

ESTRUCTURAS: Rollup desde $860 | Banner impreso desde $250 | Demo Stand $1,490 | Banderas desde $1,600

RÍGIDOS (hoja 62×90cm): Coroplast desde $1,050 | Acrílico desde $1,750

OFFSET: Vol 1/4 ECO desde $270/millar | Carta ECO $1,040/millar | Tarjeta PLUS Barniz $220/millar

IMANES: 100 pzas $490 | 500 pzas $2,200 | 1,000 pzas $4,100

Todos los precios + IVA 16%. Anticipo 75%.

COMPORTAMIENTO:
- Responde siempre en español, tono amable y directo
- Máximo 3–4 líneas por respuesta
- Al cotizar: precio sin IVA y total con IVA
- Si quiere hacer pedido: manda al cotizador o WhatsApp 55 6901 5912
- Si no sabes el precio exacto: "te recomiendo cotizar en línea o escribirnos al WhatsApp"`;

const CHIPS = [
  { label: "Cotizar lona",      msg: "¿Cuánto cuesta una lona 3×2m calidad C2?" },
  { label: "Precios DTF",       msg: "¿Cuáles son los precios de DTF?" },
  { label: "Tiempos de entrega",msg: "¿Cuánto tardan en producir?" },
  { label: "Sucursales",        msg: "¿Dónde están ubicados?" },
];

const API_KEY = process.env.NEXT_PUBLIC_ANTHROPIC_API_KEY;

export default function ChatWidget() {
  const [open,    setOpen]    = useState(false);
  const [msgs,    setMsgs]    = useState<Message[]>([]);
  const [input,   setInput]   = useState("");
  const [loading, setLoading] = useState(false);
  const [started, setStarted] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef  = useRef<HTMLInputElement>(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs, loading]);

  useEffect(() => {
    if (open && !started) {
      setStarted(true);
      setMsgs([{ role: "assistant", content: "Hola 👋 Soy **Nodo**, el asistente de Nodoprint. ¿En qué te puedo ayudar? Puedo cotizarte lonas, viniles, DTF, stickers y más." }]);
    }
    if (open) setTimeout(() => inputRef.current?.focus(), 100);
  }, [open, started]);

  async function send(text?: string) {
    const content = text || input.trim();
    if (!content || loading) return;
    setInput("");
    const newMsgs: Message[] = [...msgs, { role: "user", content }];
    setMsgs(newMsgs);
    setLoading(true);
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": API_KEY || "",
          "anthropic-version": "2023-06-01",
          "anthropic-dangerous-direct-browser-access": "true",
        },
        body: JSON.stringify({ model: "claude-haiku-4-5-20251001", max_tokens: 512, system: SYSTEM, messages: newMsgs }),
      });
      const data = await res.json();
      const reply = data.content?.[0]?.text || "No pude procesar tu mensaje. Intenta de nuevo.";
      setMsgs([...newMsgs, { role: "assistant", content: reply }]);
    } catch {
      setMsgs([...newMsgs, { role: "assistant", content: "Error de conexión. Escríbenos al WhatsApp 55 6901 5912." }]);
    }
    setLoading(false);
  }

  function fmt(t: string) {
    return t
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/(\$[\d,]+\.?\d*)/g, '<span style="color:#CC0055;font-weight:500">$1</span>')
      .replace(/\n/g, "<br/>");
  }

  return (
    <>
      <button onClick={() => setOpen(!open)}
        className="fixed bottom-24 right-6 z-50 w-14 h-14 bg-[#CC0055] text-white rounded-full flex items-center justify-center shadow-lg hover:bg-[#990040] transition-all hover:scale-110"
        title="Hablar con Nodo">
        {open ? <X size={22}/> : <MessageCircle size={22}/>}
      </button>

      {open && (
        <div className="fixed bottom-44 right-6 z-50 w-[360px] max-h-[520px] bg-white rounded-xl shadow-2xl flex flex-col overflow-hidden border border-[#E0E0E0]"
          style={{ boxShadow: "0 20px 60px rgba(0,0,0,0.15)" }}>

          <div className="bg-[#111] px-5 py-4 flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#CC0055] flex items-center justify-center text-white text-sm font-semibold">N</div>
            <div>
              <p className="text-sm font-medium text-white">Nodo</p>
              <p className="text-xs text-white/40">Asistente Nodoprint</p>
            </div>
            <div className="ml-auto flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-green-400"/>
              <span className="text-xs text-white/40">en línea</span>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3 bg-[#FAFAFA]">
            {msgs.map((m, i) => (
              <div key={i} className={`flex ${m.role==="user"?"justify-end":"justify-start"}`}>
                <div className={`max-w-[80%] px-4 py-2.5 rounded-xl text-sm font-light leading-relaxed ${
                  m.role==="user" ? "bg-[#CC0055] text-white rounded-br-sm" : "bg-white text-[#111] rounded-bl-sm border border-[#E8E8E8] shadow-sm"
                }`} dangerouslySetInnerHTML={{ __html: fmt(m.content) }}/>
              </div>
            ))}

            {msgs.length === 1 && (
              <div className="flex flex-wrap gap-2 mt-1">
                {CHIPS.map(c => (
                  <button key={c.label} onClick={() => send(c.msg)}
                    className="text-xs font-light bg-white border border-[#E0E0E0] text-[#3A3A3A] px-3 py-1.5 rounded-full hover:border-[#CC0055] hover:text-[#CC0055] transition-colors">
                    {c.label}
                  </button>
                ))}
              </div>
            )}

            {loading && (
              <div className="flex justify-start">
                <div className="bg-white border border-[#E8E8E8] shadow-sm px-4 py-3 rounded-xl rounded-bl-sm flex gap-1.5 items-center">
                  {[0,1,2].map(i => (
                    <div key={i} className="w-1.5 h-1.5 rounded-full bg-[#CCCCCC] animate-bounce" style={{ animationDelay: `${i*0.15}s` }}/>
                  ))}
                </div>
              </div>
            )}
            <div ref={bottomRef}/>
          </div>

          <div className="px-4 py-2 bg-[#FFF0F5] border-t border-[#FFD6E7]">
            <a href="/cotizar" className="flex items-center justify-between text-xs font-medium text-[#CC0055] hover:opacity-80 transition-opacity">
              <span>Ir al cotizador en línea</span>
              <ArrowRight size={12}/>
            </a>
          </div>

          <div className="px-4 py-3 bg-white border-t border-[#F0F0F0] flex items-center gap-2">
            <input ref={inputRef} value={input} onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key==="Enter" && send()}
              placeholder="Escribe tu pregunta..."
              className="flex-1 text-sm font-light text-[#111] outline-none placeholder:text-[#CCCCCC]"/>
            <button onClick={() => send()} disabled={!input.trim()||loading}
              className="w-8 h-8 rounded-full bg-[#CC0055] flex items-center justify-center disabled:opacity-30 hover:bg-[#990040] transition-colors">
              <Send size={14} className="text-white"/>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
