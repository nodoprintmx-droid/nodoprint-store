"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ShoppingBag } from "lucide-react";

const links = [
  { label: "Productos", href: "/productos" },
  { label: "Cómo funciona", href: "/#como-funciona" },
  { label: "Sucursales", href: "/#sucursales" },
  { label: "Contacto", href: "/#contacto" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 lg:px-20 h-16 bg-white/95 backdrop-blur-md transition-all duration-300 ${scrolled ? "shadow-[0_2px_24px_rgba(0,0,0,0.08)]" : "border-b border-black/5"}`}>
        {/* Logo */}
        <Link href="/" className="text-xl font-semibold tracking-tight text-[#111]">
          nodo<span className="text-[#CC0055]">print</span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8 list-none">
          {links.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="text-sm font-light text-[#3A3A3A] hover:text-[#CC0055] transition-colors">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link href="/cotizar" className="inline-flex items-center gap-2 bg-[#CC0055] text-white text-sm font-medium px-5 py-2.5 rounded transition-all hover:bg-[#990040]">
            <ShoppingBag size={15} />
            Cotizar ahora
          </Link>
        </div>

        {/* Mobile toggle */}
        <button onClick={() => setOpen(!open)} className="md:hidden p-2 text-[#111]">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="fixed inset-0 z-40 bg-white pt-16 px-6 flex flex-col gap-6 md:hidden">
          {links.map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)}
              className="text-2xl font-light text-[#111] border-b border-[#f0f0f0] pb-4">
              {l.label}
            </Link>
          ))}
          <Link href="/cotizar" onClick={() => setOpen(false)}
            className="inline-flex items-center justify-center gap-2 bg-[#CC0055] text-white text-base font-medium px-6 py-4 rounded mt-4">
            <ShoppingBag size={18} />
            Cotizar ahora
          </Link>
        </div>
      )}
    </>
  );
}
