export default function Marquee() {
  const items = ["Lonas","Viniles","Stickers","DTF","DTF UV","Banners","Flag Banner","Expansibles","Demo Stands","Rollup","Offset","Impresión Digital","Credenciales PVC","Impresión en Rígidos"];
  const doubled = [...items, ...items];
  return (
    <div className="bg-[#111] overflow-hidden py-4 border-y border-white/5">
      <div className="flex animate-marquee w-max gap-0">
        {doubled.map((item, i) => (
          <span key={i} className="flex items-center gap-4 px-10 text-[11px] font-medium tracking-[0.2em] uppercase text-white/40 whitespace-nowrap">
            <span className="w-1 h-1 rounded-full bg-[#CC0055] flex-shrink-0" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
