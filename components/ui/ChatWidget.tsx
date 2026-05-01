"use client";
import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, ArrowRight } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const CHIPS = [
  { label: "Cotizar lona", msg: "¿Cuánto cuesta una lona 3×2m calidad C2?" },
  { label: "Precios DTF", msg: "¿Cuáles son los precios de DTF?" },
  { label: "Tiempos de entrega", msg: "¿Cuánto tardan en producir?" },
  { label: "Sucursales", msg: "¿Dónde están ubicados?" },
];

export default function ChatWidget() {
  const [open,     setOpen]     = useState(false);
  const [msgs,     setMsgs]     = useState<Message[]>([]);
  const [input,    setInput]    = useState("");
  const [loading,  setLoading]  = useState(false);
  const [started,  setStarted]  = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef  = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs, loading]);

  useEffect(() => {
    if (open && !started) {
      setStarted(true);
      setMsgs([{
        role: "assistant",
        content: "Hola 👋 Soy **Nodo**, el asistente de Nodoprint. ¿En qué te puedo ayudar? Puedo cotizarte lonas, viniles, DTF, stickers y más.",
      }]);
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
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMsgs }),
      });
      const data = await res.json();
      if (data.reply) {
        setMsgs([...newMsgs, { role: "assistant", content: data.reply }]);
      }
    } catch {
      setMsgs([...newMsgs, { role: "assistant", content: "Error de conexión. Intenta de nuevo." }]);
    }
    setLoading(false);
  }

  function formatMsg(text: string) {
    return text
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/(\$[\d,]+\.?\d*)/g, '<span style="color:#CC0055;font-weight:500">$1</span>')
      .replace(/\n/g, "<br/>");
  }

  return (
    <>
      {/* Botón flotante */}
      <button onClick={() => setOpen(!open)}
        className="fixed bottom-24 right-6 z-50 w-14 h-14 bg-[#CC0055] text-white rounded-full flex items-center justify-center shadow-lg hover:bg-[#990040] transition-all hover:scale-110"
        title="Chat con Nodo">
        {open ? <X size={22} /> : <MessageCircle size={22} />}
      </button>

      {/* Ventana del chat */}
      {open && (
        <div className="fixed bottom-44 right-6 z-50 w-[360px] max-h-[520px] bg-white rounded-xl shadow-2xl flex flex-col overflow-hidden border border-[#E0E0E0]"
          style={{ boxShadow: "0 20px 60px rgba(0,0,0,0.15)" }}>

          {/* Header */}
          <div className="bg-[#111] px-5 py-4 flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#CC0055] flex items-center justify-center text-white text-sm font-semibold">N</div>
            <div>
              <p className="text-sm font-medium text-white">Nodo</p>
              <p className="text-xs text-white/40">Asistente Nodoprint</p>
            </div>
            <div className="ml-auto flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-green-400" />
              <span className="text-xs text-white/40">en línea</span>
            </div>
          </div>

          {/* Mensajes */}
          <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3 bg-[#FAFAFA]">
            {msgs.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[80%] px-4 py-2.5 rounded-xl text-sm font-light leading-relaxed ${
                  m.role === "user"
                    ? "bg-[#CC0055] text-white rounded-br-sm"
                    : "bg-white text-[#111] rounded-bl-sm border border-[#E8E8E8] shadow-sm"
                }`}
                  dangerouslySetInnerHTML={{ __html: formatMsg(m.content) }} />
              </div>
            ))}

            {/* Chips de acceso rápido — solo al inicio */}
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

            {/* Typing indicator */}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-white border border-[#E8E8E8] shadow-sm px-4 py-3 rounded-xl rounded-bl-sm flex gap-1.5 items-center">
                  {[0,1,2].map(i => (
                    <div key={i} className="w-1.5 h-1.5 rounded-full bg-[#CCCCCC] animate-bounce"
                      style={{ animationDelay: `${i * 0.15}s` }} />
                  ))}
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Link al cotizador */}
          <div className="px-4 py-2 bg-[#FFF0F5] border-t border-[#FFD6E7]">
            <a href="/cotizar" className="flex items-center justify-between text-xs font-medium text-[#CC0055] hover:opacity-80 transition-opacity">
              <span>Ir al cotizador en línea</span>
              <ArrowRight size={12} />
            </a>
          </div>

          {/* Input */}
          <div className="px-4 py-3 bg-white border-t border-[#F0F0F0] flex items-center gap-2">
            <input ref={inputRef} value={input} onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && send()}
              placeholder="Escribe tu pregunta..."
              className="flex-1 text-sm font-light text-[#111] outline-none placeholder:text-[#CCCCCC]" />
            <button onClick={() => send()} disabled={!input.trim() || loading}
              className="w-8 h-8 rounded-full bg-[#CC0055] flex items-center justify-center disabled:opacity-30 hover:bg-[#990040] transition-colors">
              <Send size={14} className="text-white" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
