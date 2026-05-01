import { MessageCircle } from "lucide-react";
import { CONTACTO } from "@/lib/precios";

export default function WhatsAppButton() {
  return (
    <a href={`https://wa.me/${CONTACTO.whatsapp}?text=Hola, me gustaría hacer un pedido`}
      target="_blank" rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-lg hover:bg-[#1ebe5d] hover:scale-110 transition-all"
      title="Contactar por WhatsApp">
      <MessageCircle size={26} fill="white" strokeWidth={0} />
    </a>
  );
}
