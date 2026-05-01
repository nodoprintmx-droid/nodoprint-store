// ═══════════════════════════════════════════
// PRECIOS NODOPRINT 2027 — Fuente: CALCULADORA_NODOPRINT_2027.html
// Todos los valores en MXN
// ═══════════════════════════════════════════

// ─── LONAS ───────────────────────────────
// Precio por m² · cobro por ancho de rollo más cercano
export const LONA_PX: Record<string, number> = {
  c1: 60, c2: 75,
  c3f: 96, c3m: 120, c3b: 120,
  "1200f": 120, "1200m": 160, "1200b": 160,
  "1440f": 130, "1440m": 180, "1440b": 190,
  uvf: 240, uvm: 270, uvb: 270,
};

// Calidades con rollos base [1,1.5,2,2.5,3.2]
// Calidades HI (1200, 1440, UV) solo rollos [1, 1.5]
export const LONA_ROLLS_BASE = [1, 1.5, 2, 2.5, 3.2];
export const LONA_ROLLS_HI   = [1, 1.5];
export const LONA_HI_KEYS    = ["1200f","1200m","1200b","1440f","1440m","1440b","uvf","uvm","uvb"];

export const LONA_CALIDADES = [
  { id: "c1",    label: "C1 — Económica",    desc: "Interiores y eventos cortos",          tipo: "front" },
  { id: "c2",    label: "C2 — Estándar",     desc: "Uso general exterior e interior",      tipo: "front" },
  { id: "c3f",   label: "C3 Front — Premium",desc: "Mayor resolución y durabilidad",       tipo: "front" },
  { id: "c3m",   label: "C3 Mesh",           desc: "Microperforado exterior",              tipo: "mesh"  },
  { id: "c3b",   label: "C3 Backlight",      desc: "Iluminación interior",                 tipo: "bl"    },
  { id: "1200f", label: "1200 Front",         desc: "Alta calidad fotográfica",             tipo: "front" },
  { id: "1200m", label: "1200 Mesh",          desc: "Alta calidad microperforado",          tipo: "mesh"  },
  { id: "1200b", label: "1200 Backlight",     desc: "Alta calidad con luz",                 tipo: "bl"    },
  { id: "1440f", label: "1440 Front",         desc: "Ultra HD — la mejor resolución",       tipo: "front" },
  { id: "1440m", label: "1440 Mesh",          desc: "Ultra HD microperforado",              tipo: "mesh"  },
  { id: "1440b", label: "1440 Backlight",     desc: "Ultra HD con luz",                     tipo: "bl"    },
  { id: "uvf",   label: "UV Front",           desc: "Tintas UV de larga duración",          tipo: "front" },
  { id: "uvm",   label: "UV Mesh",            desc: "UV microperforado",                    tipo: "mesh"  },
  { id: "uvb",   label: "UV Backlight",       desc: "UV con luz",                           tipo: "bl"    },
];

export const LONA_OJILLOS = {
  cada50cm:  50 / 100,  // separación en metros
  cada30cm:  30 / 100,
  costoExtra: 3,         // $ por ojillo adicional sobre los normales
};

// ─── VINILES ──────────────────────────────
// Precio por m² · cobro por rollo de 1.5m (ceil(ancho/1.5)*1.5)
export const VINIL_MATERIALES = [
  { value: "130",   label: "Brillante 720 dpi",      precio: 130 },
  { value: "170",   label: "Brillante 1200 dpi",     precio: 170 },
  { value: "185",   label: "Brillante 1400 dpi",     precio: 185 },
  { value: "270",   label: "Brillante UV",            precio: 270 },
  { value: "135",   label: "Mate 720 dpi",            precio: 135 },
  { value: "175",   label: "Mate 1200 dpi",           precio: 175 },
  { value: "190",   label: "Mate 1400 dpi",           precio: 190 },
  { value: "275",   label: "Mate UV",                 precio: 275 },
  { value: "1350",  label: "Transparente 720 dpi",    precio: 135 },
  { value: "1750",  label: "Transparente 1200 dpi",   precio: 175 },
  { value: "1900",  label: "Transparente 1400 dpi",   precio: 190 },
  { value: "2750",  label: "Transparente UV",         precio: 275 },
  { value: "1700",  label: "Microperforado 720 dpi",  precio: 170 },
  { value: "1950",  label: "Microperforado 1200 dpi", precio: 195 },
  { value: "2150",  label: "Microperforado 1400 dpi", precio: 215 },
  { value: "2600",  label: "Microperforado UV",       precio: 260 },
  { value: "2250",  label: "Electroestático 1200 dpi",precio: 225 },
  { value: "2500",  label: "Electroestático 1400 dpi",precio: 250 },
  { value: "2950",  label: "Electroestático UV",      precio: 295 },
  { value: "2350",  label: "Automotriz 1200 dpi",     precio: 235 },
  { value: "2600b", label: "Automotriz 1400 dpi",     precio: 260 },
  { value: "2950b", label: "Automotriz UV",           precio: 295 },
  { value: "4800",  label: "Holográfico 1400 dpi",    precio: 480 },
  { value: "5800",  label: "Holográfico UV",          precio: 580 },
  { value: "2000",  label: "Floorgraphic",            precio: 200 },
  // Telas
  { value: "160",   label: "Tela Banner 720 D",       precio: 160, grupo: "Telas" },
  { value: "180",   label: "Tela Banner 1200 P",      precio: 180, grupo: "Telas" },
  { value: "195",   label: "Tela Banner 1440 I",      precio: 195, grupo: "Telas" },
  { value: "260",   label: "Tela Banner UV",           precio: 260, grupo: "Telas" },
  { value: "260c",  label: "Tela Canvas 720 D",        precio: 260, grupo: "Telas" },
  { value: "280",   label: "Tela Canvas 1200 P",       precio: 280, grupo: "Telas" },
  { value: "295",   label: "Tela Canvas 1440 I",       precio: 295, grupo: "Telas" },
  { value: "320",   label: "Tela Canvas UV",            precio: 320, grupo: "Telas" },
  { value: "140",   label: "Citylight 720 D",           precio: 140, grupo: "Telas" },
  { value: "160c",  label: "Citylight 1200 P",          precio: 160, grupo: "Telas" },
  { value: "180c",  label: "Citylight 1440 I",          precio: 180, grupo: "Telas" },
  { value: "220",   label: "Citylight UV",              precio: 220, grupo: "Telas" },
  { value: "190",   label: "Foto 720 D",                precio: 190, grupo: "Telas" },
  { value: "220f",  label: "Foto 1200 P",               precio: 220, grupo: "Telas" },
  { value: "240",   label: "Foto 1440 I",               precio: 240, grupo: "Telas" },
  { value: "270f",  label: "Foto UV",                   precio: 270, grupo: "Telas" },
];

export function getVinilPrecio(val: string): number {
  const m = VINIL_MATERIALES.find(x => x.value === val);
  return m ? m.precio : parseInt(val) || 130;
}

// ─── CREDENCIALES PVC ─────────────────────
// pf=Premium frente, pfv=Premium frente+vuelta, ef=Estándar frente, efv=Estándar frente+vuelta
export const CRED: Record<string, number[]> = {
  pf:  [45,44,43,42,41,40],
  pfv: [69,68,67,66,65,64],
  ef:  [39,38,37,36,35,34],
  efv: [60,59,58,57,56,55],
};
export const CRED_RANGOS = [[1,10],[11,50],[51,100],[101,300],[301,500],[600,99999]];
export const CRED_NOMBRES: Record<string,string> = {
  pf: "Premium — Solo frente",
  pfv: "Premium — Frente y vuelta",
  ef: "Estándar — Solo frente",
  efv: "Estándar — Frente y vuelta",
};
export function getCredPrecio(tipo: string, qty: number): number {
  for (let i = 0; i < CRED_RANGOS.length; i++) {
    if (qty >= CRED_RANGOS[i][0] && qty <= CRED_RANGOS[i][1]) return CRED[tipo][i];
  }
  return CRED[tipo][5];
}

// ─── IMPRESIÓN DIGITAL ────────────────────
export const DIG_BASE: Record<string, Record<number, number[][]>> = {
  carta:  { 1: [[1,40,7],[41,100,6.5],[101,300,6],[301,500,5.5],[501,99999,5]],
             2: [[1,40,11],[41,100,10.5],[101,300,10],[301,500,9.5],[501,99999,9]] },
  tabreb: { 1: [[1,40,11],[41,100,10.5],[101,300,10],[301,500,9.5],[501,99999,9]],
             2: [[1,40,18],[41,100,17.5],[101,300,17],[301,500,16.5],[501,99999,16]] },
  super:  { 1: [[1,40,12],[41,100,11.5],[101,300,11],[301,500,10.5],[501,99999,10]],
             2: [[1,40,19],[41,100,18.5],[101,300,18],[301,500,17.5],[501,99999,17]] },
};
export const DIG_TAMANOS = { carta: "Carta", tabreb: "Tab Reb", super: "Supertab" };
export const DIG_PAPELES = [
  { value: "90|0",    label: "Bond 90g",           extra: 0 },
  { value: "135|0",   label: "Couche 135g",         extra: 0 },
  { value: "200|1",   label: "Couche 200g",         extra: 1 },
  { value: "300|1",   label: "Couche 300g",         extra: 1 },
  { value: "12pts|1", label: "Sulfatada 12 pts",    extra: 1 },
  { value: "220op|1", label: "Cartulina Opalina 220g", extra: 1 },
  { value: "adh|2",   label: "Couche Adhesivo",     extra: 2 },
];
export function getDigPrecio(tam: string, lados: number, qty: number): number {
  const tbl = DIG_BASE[tam]?.[lados] || [];
  for (const [min, max, px] of tbl) { if (qty >= min && qty <= max) return px; }
  return tbl[tbl.length - 1]?.[2] ?? 7;
}

// ─── STICKERS ─────────────────────────────
// Precio por planilla 26×42cm
export const STICKER_MATERIALES = [
  { value: "39",     label: "Vinil Blanco — Solo impresión",       precio: 39  },
  { value: "49",     label: "Vinil Blanco — C/Blanco",             precio: 49  },
  { value: "59",     label: "Vinil Blanco — C/Corte",              precio: 59  },
  { value: "390",    label: "Vinil Transparente — Solo impresión",  precio: 39  },
  { value: "490",    label: "Vinil Transparente — C/Blanco",        precio: 49  },
  { value: "590",    label: "Vinil Transparente — C/Corte",         precio: 59  },
  { value: "65",     label: "Adhe Oro/Plata/Cromo — Imp",           precio: 65  },
  { value: "75",     label: "Adhe Oro/Plata/Cromo — C/Blanco",      precio: 75  },
  { value: "85",     label: "Adhe Oro/Plata/Cromo — C/Corte",       precio: 85  },
  { value: "14",     label: "Adhe-Couche — Imp",                    precio: 14  },
  { value: "38",     label: "Adhe-Couche — C/Corte",                precio: 38  },
  { value: "490uv",  label: "UV Mate/Brillante/Transparente",       precio: 490 },
  { value: "560uv",  label: "UV Tinta Blanca/Barniz",               precio: 560 },
  { value: "680uv",  label: "UV Holográfico",                       precio: 680 },
];
export const ST_MAP: Record<string,number> = {
  "39":39,"49":49,"59":59,"390":39,"490":49,"590":59,
  "65":65,"75":75,"85":85,"14":14,"38":38,
  "490uv":490,"560uv":560,"680uv":680
};

// ─── CORTE DE VINIL ───────────────────────
export const CV_PX: Record<string, Record<string,number>> = {
  rot: {"sm-b":60,"sm-s":140,"cm-b":140,"cm-s":210,"dep-b":60,"dep-s":150},
  esm: {"sm-b":75,"sm-s":155,"cm-b":185,"cm-s":225,"dep-b":70,"dep-s":170},
  ref: {"sm-b":70,"sm-s":145,"cm-b":170,"cm-s":210,"dep-b":60,"dep-s":150},
  tex: {"sm-b":90,"sm-s":165,"cm-b":185,"cm-s":225,"dep-b":90,"dep-s":175},
  mas: {"sm-b":12,"sm-s":12,"cm-b":12,"cm-s":12,"dep-b":12,"dep-s":12},
  tra: {"sm-b":60,"sm-s":60,"cm-b":60,"cm-s":60,"dep-b":60,"dep-s":60},
};
export const CV_MAT_N: Record<string,string> = {
  rot:"Rotulación", esm:"Esmerilado", ref:"Reflejante",
  tex:"Textil", mas:"Mascarilla (x pieza 8×14cm)", tra:"Transfer (metro lineal)"
};
export const CV_MODO_N: Record<string,string> = {
  "sm-b":"Sin material básico","sm-s":"Sin material saturado",
  "cm-b":"Con material básico","cm-s":"Con material saturado",
  "dep-b":"Depilado básico","dep-s":"Depilado saturado"
};

// ─── RÍGIDOS ──────────────────────────────
// Precio por hoja completa 62×90cm
export const RIGIDOS = [
  { value: "1050",  label: "Coroplast C/Vinil",   precio: 1050 },
  { value: "1290",  label: "Coroplast Directo",    precio: 1290 },
  { value: "1050b", label: "Estireno C/Vinil",     precio: 1050 },
  { value: "1290b", label: "Estireno Directo",     precio: 1290 },
  { value: "1250",  label: "Trovicel C/Vinil",     precio: 1250 },
  { value: "1490",  label: "Trovicel Directo",     precio: 1490 },
  { value: "1250b", label: "Foamboard C/Vinil",    precio: 1250 },
  { value: "1490b", label: "Foamboard Directo",    precio: 1490 },
  { value: "1750",  label: "Acrílico C/Vinil",     precio: 1750 },
  { value: "1950",  label: "Acrílico Directo",     precio: 1950 },
];

// ─── ESTRUCTURAS ──────────────────────────
export const ESTRUCTURAS = [
  // Banners
  { grupo: "Banner estructura", value: "250",   label: "Banner .50×1.20m Impreso",    precio: 250  },
  { grupo: "Banner estructura", value: "180",   label: "Banner .50×1.20m Sin imp",    precio: 180  },
  { grupo: "Banner estructura", value: "295",   label: "Banner .60×1.60m Impreso",    precio: 295  },
  { grupo: "Banner estructura", value: "195",   label: "Banner .60×1.60m Sin imp",    precio: 195  },
  { grupo: "Banner estructura", value: "310",   label: "Banner .80×1.80m Impreso",    precio: 310  },
  { grupo: "Banner estructura", value: "210",   label: "Banner .80×1.80m Sin imp",    precio: 210  },
  { grupo: "Banner estructura", value: "420",   label: "Banner .80×2.00m Impreso",    precio: 420  },
  { grupo: "Banner estructura", value: "250b",  label: "Banner .80×2.00m Sin imp",    precio: 250  },
  // Rollup
  { grupo: "Rollup", value: "860",   label: "Rollup Lona 720 dpi",   precio: 860  },
  { grupo: "Rollup", value: "950",   label: "Rollup Lona 1200 dpi",  precio: 950  },
  { grupo: "Rollup", value: "990",   label: "Rollup Lona 1440 dpi",  precio: 990  },
  { grupo: "Rollup", value: "1150",  label: "Rollup Tela Banner",    precio: 1150 },
  { grupo: "Rollup", value: "1250",  label: "Rollup Tela Canvas",    precio: 1250 },
  // Demo Stand
  { grupo: "Demo Stand", value: "1090", label: "Demo Stand Sin impresión", precio: 1090 },
  { grupo: "Demo Stand", value: "1490", label: "Demo Stand Con impresión", precio: 1490 },
  // Banderas
  { grupo: "Banderas", value: "1600", label: "Bandera 2.80m",          precio: 1600 },
  { grupo: "Banderas", value: "1800", label: "Bandera 3.40m",          precio: 1800 },
  { grupo: "Banderas", value: "2200", label: "Bandera 4.50m",          precio: 2200 },
  // Muro Expandible
  { grupo: "Muro Expandible", value: "3500", label: "Muro 2.29×2.29 Lona", precio: 3500 },
  { grupo: "Muro Expandible", value: "4200", label: "Muro 2.29×2.29 Tela", precio: 4200 },
  { grupo: "Muro Expandible", value: "3800", label: "Muro 3.04×2.29 Lona", precio: 3800 },
  { grupo: "Muro Expandible", value: "4500", label: "Muro 3.04×2.29 Tela", precio: 4500 },
];
export function getEstPrecio(val: string): number {
  const e = ESTRUCTURAS.find(x => x.value === val);
  return e ? e.precio : parseInt(val) || 0;
}

// ─── TEXTIL & DTF ─────────────────────────
export const TEXTIL = [
  { grupo: "Textil", value: "220",  label: "Playera Algodón Sencilla"  },
  { grupo: "Textil", value: "270",  label: "Playera Algodón Peinado"   },
  { grupo: "Textil", value: "350",  label: "Playera Polo/Oversize"     },
  { grupo: "Textil", value: "360",  label: "Sudadera Ch/Med/Gde"       },
  { grupo: "Textil", value: "460",  label: "Sudadera ExGde/2XL"        },
  { grupo: "Textil", value: "45",   label: "Bolsa Termosellada"        },
  { grupo: "Textil", value: "80",   label: "Bolsa Cocida Manta"        },
  { grupo: "Textil", value: "95",   label: "Gorra Básica"              },
  { grupo: "Textil", value: "260",  label: "Gorra Premium"             },
  { grupo: "DTF Textil", value: "180", label: "DTF Normal (por metro)" },
  { grupo: "DTF Textil", value: "290", label: "DTF Premium (por metro)"},
  { grupo: "DTF UV", value: "600",  label: "DTF UV Primer metro"       },
  { grupo: "DTF UV", value: "300",  label: "DTF UV Medio metro"        },
  { grupo: "Planchado", value: "20", label: "Planchado Grande"         },
  { grupo: "Planchado", value: "15", label: "Planchado Chico"          },
  { grupo: "Planchado", value: "10", label: "Planchado Gorra"          },
  { grupo: "Planchado", value: "5",  label: "Planchado Etiqueta"       },
];
export const TEXTIL_NINO_EXTRA = 100;

// ─── TARJETAS X CIENTO ────────────────────
// Couche 300g / Sulfatada 12pts / Opalina 250g — precio por 100 piezas
export const TARJETAS_XC = [
  { value: "160", label: "4×0 — Solo frente",               precio: 160 },
  { value: "195", label: "4×1 — Frente + 1 color reverso",  precio: 195 },
  { value: "220", label: "4×4 — Full color ambos lados",     precio: 220 },
  { value: "290", label: "Encapsuladas calibre 1.7",         precio: 290 },
  { value: "390", label: "Encapsuladas calibre 3",           precio: 390 },
];
export const TARJETAS_XC_ESQ_EXTRA = 30; // extra por 100 pzas con esquinas redondeadas

// ─── IMANES ───────────────────────────────
export const IMANES = [
  { grupo: "Estándar 5×9cm Cal.20", value: "490",  label: "100 imanes estándar",       precio: 490  },
  { grupo: "Estándar 5×9cm Cal.20", value: "2200", label: "500 imanes estándar",        precio: 2200 },
  { grupo: "Estándar 5×9cm Cal.20", value: "4100", label: "1,000 imanes estándar",      precio: 4100 },
  { grupo: "Con suaje 9×5cm",       value: "1550", label: "100 imanes con suaje",       precio: 1550 },
  { grupo: "Con suaje 9×5cm",       value: "3500", label: "540 imanes con suaje",        precio: 3500 },
  { grupo: "Con suaje 9×5cm",       value: "4800", label: "1,000 imanes con suaje",     precio: 4800 },
  { grupo: "Grande 50×95cm",        value: "440",  label: "Imán grande Cal.30",         precio: 440  },
  { grupo: "Grande 50×95cm",        value: "640",  label: "Imán grande Cal.40 alta adherencia", precio: 640 },
];

// ─── LAMINADO ─────────────────────────────
// Formato: [precioCarta, precioTab12x18, precioTab13x19, precioPorCm2]
export const LAMINADO = [
  { value: "5|10|11|0.007",   label: "Brillante 3 — 1 lado",      grupo: "Laminado" },
  { value: "10|20|22|0.014",  label: "Brillante 3 — Frente y Vuelta", grupo: "Laminado" },
  { value: "6|12|13|0.008",   label: "Brillante 5 — 1 lado",      grupo: "Laminado" },
  { value: "12|24|26|0.016",  label: "Brillante 5 — Frente y Vuelta", grupo: "Laminado" },
  { value: "5|10|11|0.007",   label: "Mate 3 — 1 lado",           grupo: "Laminado" },
  { value: "10|20|22|0.014",  label: "Mate 3 — Frente y Vuelta",  grupo: "Laminado" },
  { value: "9|18|19|0.013",   label: "Mate 5 — 1 lado",           grupo: "Laminado" },
  { value: "18|36|38|0.026",  label: "Mate 5 — Frente y Vuelta",  grupo: "Laminado" },
];
export const LAMINADO_REBASE_EXTRA = 5;  // por hoja
export const LAMINADO_CORTE_EXTRA  = 1;  // por hoja

// ─── OFFSET ───────────────────────────────
// Precios por millar
export const OFFSET_PRODUCTOS = [
  // Volantes ECO Couche 115g 4x1
  { grupo: "Volantes ECO Couche 115g · 4×1", value: "270a",  label: "Vol. 1/4 ECO · 4×1",     precio: 270   },
  { grupo: "Volantes ECO Couche 115g · 4×1", value: "520a",  label: "Vol. 1/2 ECO · 4×1",     precio: 520   },
  { grupo: "Volantes ECO Couche 115g · 4×1", value: "1040a", label: "Carta ECO · 4×1",         precio: 1040  },
  { grupo: "Volantes ECO Couche 115g · 4×1", value: "1560a", label: "Oficio ECO · 4×1",        precio: 1560  },
  { grupo: "Volantes ECO Couche 115g · 4×1", value: "2080a", label: "Tabloide ECO · 4×1",      precio: 2080  },
  { grupo: "Volantes ECO Couche 115g · 4×1", value: "4160a", label: "4 Cartas ECO · 4×1",      precio: 4160  },
  { grupo: "Volantes ECO Couche 115g · 4×1", value: "8300a", label: "8 Cartas ECO · 4×1",      precio: 8300  },
  { grupo: "Volantes ECO Couche 115g · 4×1", value: "13000a",label: "Full Max ECO · 4×1",      precio: 13000 },
  // Volantes ECO Couche 115g 4x4
  { grupo: "Volantes ECO Couche 115g · 4×4", value: "360a",  label: "Vol. 1/4 ECO · 4×4",     precio: 360   },
  { grupo: "Volantes ECO Couche 115g · 4×4", value: "700a",  label: "Vol. 1/2 ECO · 4×4",     precio: 700   },
  { grupo: "Volantes ECO Couche 115g · 4×4", value: "1410a", label: "Carta ECO · 4×4",         precio: 1410  },
  { grupo: "Volantes ECO Couche 115g · 4×4", value: "2120a", label: "Oficio ECO · 4×4",        precio: 2120  },
  { grupo: "Volantes ECO Couche 115g · 4×4", value: "2810a", label: "Tabloide ECO · 4×4",      precio: 2810  },
  { grupo: "Volantes ECO Couche 115g · 4×4", value: "5650a", label: "4 Cartas ECO · 4×4",      precio: 5650  },
  { grupo: "Volantes ECO Couche 115g · 4×4", value: "11230a",label: "8 Cartas ECO · 4×4",      precio: 11230 },
  { grupo: "Volantes ECO Couche 115g · 4×4", value: "17600a",label: "Full Max ECO · 4×4",      precio: 17600 },
  // Volantes PLUS Couche 150g 4x1
  { grupo: "Volantes PLUS Couche 150g · 4×1",value: "340a",  label: "Vol. 1/4 PLUS · 4×1",    precio: 340   },
  { grupo: "Volantes PLUS Couche 150g · 4×1",value: "680a",  label: "Vol. 1/2 PLUS · 4×1",    precio: 680   },
  { grupo: "Volantes PLUS Couche 150g · 4×1",value: "1360a", label: "Carta PLUS · 4×1",        precio: 1360  },
  { grupo: "Volantes PLUS Couche 150g · 4×1",value: "2040a", label: "Oficio PLUS · 4×1",       precio: 2040  },
  { grupo: "Volantes PLUS Couche 150g · 4×1",value: "2720a", label: "Tabloide PLUS · 4×1",     precio: 2720  },
  { grupo: "Volantes PLUS Couche 150g · 4×1",value: "5440a", label: "4 Cartas PLUS · 4×1",     precio: 5440  },
  { grupo: "Volantes PLUS Couche 150g · 4×1",value: "10880a",label: "8 Cartas PLUS · 4×1",     precio: 10880 },
  { grupo: "Volantes PLUS Couche 150g · 4×1",value: "14900a",label: "Full Max PLUS · 4×1",     precio: 14900 },
  // Volantes PLUS Couche 150g 4x4
  { grupo: "Volantes PLUS Couche 150g · 4×4",value: "420a",  label: "Vol. 1/4 PLUS · 4×4",    precio: 420   },
  { grupo: "Volantes PLUS Couche 150g · 4×4",value: "840a",  label: "Vol. 1/2 PLUS · 4×4",    precio: 840   },
  { grupo: "Volantes PLUS Couche 150g · 4×4",value: "1700a", label: "Carta PLUS · 4×4",        precio: 1700  },
  { grupo: "Volantes PLUS Couche 150g · 4×4",value: "2560a", label: "Oficio PLUS · 4×4",       precio: 2560  },
  { grupo: "Volantes PLUS Couche 150g · 4×4",value: "3400a", label: "Tabloide PLUS · 4×4",     precio: 3400  },
  { grupo: "Volantes PLUS Couche 150g · 4×4",value: "6800a", label: "4 Cartas PLUS · 4×4",     precio: 6800  },
  { grupo: "Volantes PLUS Couche 150g · 4×4",value: "13600a",label: "8 Cartas PLUS · 4×4",     precio: 13600 },
  { grupo: "Volantes PLUS Couche 150g · 4×4",value: "18600a",label: "Full Max PLUS · 4×4",     precio: 18600 },
  // Tarjetas y Postales Barnizadas
  { grupo: "Tarjetas y Postales · Barnizadas",value: "180a", label: "Mini Tarjeta Ajustada",   precio: 180   },
  { grupo: "Tarjetas y Postales · Barnizadas",value: "220a", label: "Tarjeta PLUS",            precio: 220   },
  { grupo: "Tarjetas y Postales · Barnizadas",value: "360b", label: "Mini Postal Ajustada",    precio: 360   },
  { grupo: "Tarjetas y Postales · Barnizadas",value: "430a", label: "Mini Postal PLUS",        precio: 430   },
  { grupo: "Tarjetas y Postales · Barnizadas",value: "360c", label: "Separador Ajustado",      precio: 360   },
  { grupo: "Tarjetas y Postales · Barnizadas",value: "430b", label: "Separador PLUS",          precio: 430   },
  { grupo: "Tarjetas y Postales · Barnizadas",value: "540a", label: "Postal Chica Ajustada",   precio: 540   },
  { grupo: "Tarjetas y Postales · Barnizadas",value: "640a", label: "Postal Chica PLUS",       precio: 640   },
  { grupo: "Tarjetas y Postales · Barnizadas",value: "710a", label: "Postal Grande Ajustada",  precio: 710   },
  { grupo: "Tarjetas y Postales · Barnizadas",value: "850a", label: "Postal Grande PLUS",      precio: 850   },
  { grupo: "Tarjetas y Postales · Barnizadas",value: "1070a",label: "Postal 1/4 PLUS",         precio: 1070  },
  { grupo: "Tarjetas y Postales · Barnizadas",value: "1780a",label: "Postal 1/2 PLUS",         precio: 1780  },
  { grupo: "Tarjetas y Postales · Barnizadas",value: "3560a",label: "Postal Carta PLUS",       precio: 3560  },
  { grupo: "Tarjetas y Postales · Barnizadas",value: "5350a",label: "Tabloide PLUS",           precio: 5350  },
  // Tarjetas y Postales Laminadas
  { grupo: "Tarjetas y Postales · Laminadas", value: "310a", label: "Mini Tarjeta Ajustada",   precio: 310   },
  { grupo: "Tarjetas y Postales · Laminadas", value: "360d", label: "Tarjeta PLUS",            precio: 360   },
  { grupo: "Tarjetas y Postales · Laminadas", value: "610a", label: "Mini Postal Ajustada",    precio: 610   },
  { grupo: "Tarjetas y Postales · Laminadas", value: "730a", label: "Mini Postal PLUS",        precio: 730   },
  { grupo: "Tarjetas y Postales · Laminadas", value: "610b", label: "Separador Ajustado",      precio: 610   },
  { grupo: "Tarjetas y Postales · Laminadas", value: "730b", label: "Separador PLUS",          precio: 730   },
  { grupo: "Tarjetas y Postales · Laminadas", value: "910a", label: "Postal Chica Ajustada",   precio: 910   },
  { grupo: "Tarjetas y Postales · Laminadas", value: "1090a",label: "Postal Chica PLUS",       precio: 1090  },
  { grupo: "Tarjetas y Postales · Laminadas", value: "1230a",label: "Postal Grande Ajustada",  precio: 1230  },
  { grupo: "Tarjetas y Postales · Laminadas", value: "1460a",label: "Postal Grande PLUS",      precio: 1460  },
  { grupo: "Tarjetas y Postales · Laminadas", value: "1840a",label: "Postal 1/4 PLUS",         precio: 1840  },
  { grupo: "Tarjetas y Postales · Laminadas", value: "3070a",label: "Postal 1/2 PLUS",         precio: 3070  },
  { grupo: "Tarjetas y Postales · Laminadas", value: "6140a",label: "Postal Carta PLUS",       precio: 6140  },
  { grupo: "Tarjetas y Postales · Laminadas", value: "9220a",label: "Tabloide PLUS",           precio: 9220  },
  // Tarjetas y Postales Barniz a Registro
  { grupo: "Tarjetas y Postales · Barniz a Registro", value: "600a", label: "Mini Tarjeta Ajustada", precio: 600  },
  { grupo: "Tarjetas y Postales · Barniz a Registro", value: "680a", label: "Tarjeta PLUS",          precio: 680  },
  { grupo: "Tarjetas y Postales · Barniz a Registro", value: "1200a",label: "Mini Postal Ajustada",  precio: 1200 },
  { grupo: "Tarjetas y Postales · Barniz a Registro", value: "1360a",label: "Mini Postal PLUS",      precio: 1360 },
  { grupo: "Tarjetas y Postales · Barniz a Registro", value: "1200b",label: "Separador Ajustado",    precio: 1200 },
  { grupo: "Tarjetas y Postales · Barniz a Registro", value: "1360b",label: "Separador PLUS",        precio: 1360 },
  { grupo: "Tarjetas y Postales · Barniz a Registro", value: "1610a",label: "Postal Chica Ajustada", precio: 1610 },
  { grupo: "Tarjetas y Postales · Barniz a Registro", value: "1930a",label: "Postal Chica PLUS",     precio: 1930 },
  { grupo: "Tarjetas y Postales · Barniz a Registro", value: "2190a",label: "Postal Grande Ajustada",precio: 2190 },
  { grupo: "Tarjetas y Postales · Barniz a Registro", value: "2610a",label: "Postal Grande PLUS",    precio: 2610 },
  { grupo: "Tarjetas y Postales · Barniz a Registro", value: "3290a",label: "Postal 1/4 PLUS",       precio: 3290 },
  { grupo: "Tarjetas y Postales · Barniz a Registro", value: "5520a",label: "Postal 1/2 PLUS",       precio: 5520 },
  { grupo: "Tarjetas y Postales · Barniz a Registro", value: "11050a",label: "Postal Carta PLUS",    precio: 11050},
  { grupo: "Tarjetas y Postales · Barniz a Registro", value: "16630a",label: "Tabloide PLUS",        precio: 16630},
  // Volantes Bond 75g 4x0
  { grupo: "Volantes Bond 75g · 4×0",         value: "240a", label: "Vol. 1/4 Bond · 4×0",    precio: 240   },
  { grupo: "Volantes Bond 75g · 4×0",         value: "480a", label: "Vol. 1/2 Bond · 4×0",    precio: 480   },
  { grupo: "Volantes Bond 75g · 4×0",         value: "950a", label: "Carta Bond · 4×0",        precio: 950   },
  { grupo: "Volantes Bond 75g · 4×0",         value: "1440a",label: "Oficio Bond · 4×0",       precio: 1440  },
  { grupo: "Volantes Bond 75g · 4×0",         value: "1920a",label: "Tabloide Bond · 4×0",     precio: 1920  },
  // Volantes Bond 75g 4x0 PLUS
  { grupo: "Volantes Bond 75g · 4×0 PLUS",    value: "270b", label: "Vol. 1/4 Bond PLUS",      precio: 270   },
  { grupo: "Volantes Bond 75g · 4×0 PLUS",    value: "550a", label: "Vol. 1/2 Bond PLUS",      precio: 550   },
  { grupo: "Volantes Bond 75g · 4×0 PLUS",    value: "1100a",label: "Carta Bond PLUS",         precio: 1100  },
  { grupo: "Volantes Bond 75g · 4×0 PLUS",    value: "1640a",label: "Oficio Bond PLUS",        precio: 1640  },
  { grupo: "Volantes Bond 75g · 4×0 PLUS",    value: "2190a",label: "Tabloide Bond PLUS",      precio: 2190  },
  // Notas Autocopiantes
  { grupo: "Notas Autocopiantes",              value: "1190a",label: "Notas 1/4 · 1 copia",    precio: 1190  },
  { grupo: "Notas Autocopiantes",              value: "1670a",label: "Notas 1/4 · 2 copias",   precio: 1670  },
  { grupo: "Notas Autocopiantes",              value: "2110a",label: "Notas 1/4 · 3 copias",   precio: 2110  },
  { grupo: "Notas Autocopiantes",              value: "1520a",label: "Notas 1/2 · 1 copia",    precio: 1520  },
  { grupo: "Notas Autocopiantes",              value: "2290a",label: "Notas 1/2 · 2 copias",   precio: 2290  },
  { grupo: "Notas Autocopiantes",              value: "2970a",label: "Notas 1/2 · 3 copias",   precio: 2970  },
  { grupo: "Notas Autocopiantes",              value: "2720a",label: "Notas Carta · 1 copia",  precio: 2720  },
  { grupo: "Notas Autocopiantes",              value: "4080a",label: "Notas Carta · 2 copias", precio: 4080  },
  { grupo: "Notas Autocopiantes",              value: "5190a",label: "Notas Carta · 3 copias", precio: 5190  },
  { grupo: "Notas Autocopiantes",              value: "260a", label: "Tinta Extra",             precio: 260   },
];

// ─── SUCURSALES ───────────────────────────
export const SUCURSALES = [
  {
    nombre: "Algarín",
    direccion: "Juan Hernández y Dávalos 79, Col. Algarín, Cuauhtémoc, CDMX",
    tel: "55 5519 6358",
    email: "contacto@nodoprint.com",
  },
  {
    nombre: "Obrera",
    direccion: "José Peón Contreras 122, Col. Obrera, Cuauhtémoc, CDMX",
    tel: "55 7030 4941",
    email: "contacto.eje3@nodoprint.com",
  },
];

export const CONTACTO = {
  whatsapp: "5569015912",
  whatsappDisplay: "55 6901 5912",
  horario: "Lun–Vie 10am–6pm · Sáb 10am–3pm",
};

// ─── UTILIDADES ───────────────────────────
// Calcula la combinación óptima de paneles para una dimensión dada
function _paneles(w: number, rolls: number[]): { paneles: number[]; tw: number; sobrante: number } {
  const sorted = [...rolls].sort((a, b) => a - b);
  const mx = sorted[sorted.length - 1];
  if (w <= mx + 1e-9) {
    for (const r of sorted) {
      if (w <= r + 1e-9) return { paneles: [r], tw: r, sobrante: parseFloat((r - w).toFixed(4)) };
    }
  }
  const desc = [...sorted].reverse();
  let best: { paneles: number[]; tw: number; sobrante: number } | null = null;
  for (const r of desc) {
    const full = Math.floor(w / r);
    const rem  = parseFloat((w - full * r).toFixed(6));
    let pan: number[] = full > 0 ? Array(full).fill(r) : [];
    if (rem > 1e-9) {
      const rr = sorted.find(x => rem <= x + 1e-9);
      if (!rr) continue;
      pan = [...pan, rr];
    }
    const tw = parseFloat(pan.reduce((a, b) => a + b, 0).toFixed(4));
    const ov = parseFloat((tw - w).toFixed(4));
    const better = !best
      || ov < best.sobrante - 1e-9
      || (Math.abs(ov - best.sobrante) < 1e-9 && pan.length < best.paneles.length);
    if (better) best = { paneles: pan, tw, sobrante: ov };
  }
  return best ?? { paneles: [mx], tw: mx, sobrante: mx - w };
}

// Calcula paneles eligiendo la orientación óptima (horizontal o rotada)
// para minimizar paneles y desperdicio
export function calcPaneles(
  w: number,
  h: number,
  rolls: number[]
): { paneles: number[]; tw: number; th: number; sobrante: number; rotada: boolean } {
  // Orientación normal: paneles en el ancho
  const normal  = _paneles(w, rolls);
  // Orientación rotada: paneles en el alto (intercambia w y h)
  const rotada  = _paneles(h, rolls);

  const scoreNormal = normal.paneles.length * 1000 + normal.sobrante;
  const scoreRotada = rotada.paneles.length  * 1000 + rotada.sobrante;

  if (scoreRotada < scoreNormal) {
    // Rotar conviene: el "ancho" cobrado es el alto original, largo es el ancho original
    return { paneles: rotada.paneles, tw: rotada.tw, th: w, sobrante: rotada.sobrante, rotada: true };
  }
  return { paneles: normal.paneles, tw: normal.tw, th: h, sobrante: normal.sobrante, rotada: false };
}

export function calcOjillos(w: number, l: number, sep: number): number {
  const ps = (x: number) => Math.floor(x / sep) + 1;
  return 2 * ps(w) + 2 * ps(l) - 4;
}

export function formatMXN(n: number): string {
  return new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN", minimumFractionDigits: 2 }).format(n);
}

export const IVA = 0.16;
export const ANTICIPO = 0.75;
export const VIGENCIA_COTIZACION = 15; // días
