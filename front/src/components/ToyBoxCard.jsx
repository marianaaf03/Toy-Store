import React from 'react';

// 10 temas de color pastel vibrantes para que las cajas NUNCA repitan colores contiguos
const BOX_PALETTE = [
  {
    headerBg: 'bg-[#ffb6c1]',      // 1. Rosa Fresa Pastel
    borderColor: 'border-[#ff8da1]',
    textColor: 'text-[#e11d48]',
    ribbonColor: '#f43f5e',
    windowBg: 'from-pink-50 via-rose-50/50 to-white'
  },
  {
    headerBg: 'bg-[#e9d5ff]',      // 2. Lavanda Ensueño
    borderColor: 'border-[#c084fc]',
    textColor: 'text-[#7e22ce]',
    ribbonColor: '#a855f7',
    windowBg: 'from-purple-50 via-fuchsia-50/50 to-white'
  },
  {
    headerBg: 'bg-[#bae6fd]',      // 3. Azul Cielo Pastel
    borderColor: 'border-[#38bdf8]',
    textColor: 'text-[#0369a1]',
    ribbonColor: '#0284c7',
    windowBg: 'from-sky-50 via-blue-50/50 to-white'
  },
  {
    headerBg: 'bg-[#bbf7d0]',      // 4. Menta Juguetero
    borderColor: 'border-[#4ade80]',
    textColor: 'text-[#15803d]',
    ribbonColor: '#22c55e',
    windowBg: 'from-emerald-50 via-teal-50/50 to-white'
  },
  {
    headerBg: 'bg-[#fef08a]',      // 5. Amarillo Sol Pastel
    borderColor: 'border-[#facc15]',
    textColor: 'text-[#b45309]',
    ribbonColor: '#eab308',
    windowBg: 'from-amber-50 via-yellow-50/50 to-white'
  },
  {
    headerBg: 'bg-[#fed7aa]',      // 6. Melocotón Suave
    borderColor: 'border-[#fb923c]',
    textColor: 'text-[#c2410c]',
    ribbonColor: '#f97316',
    windowBg: 'from-orange-50 via-amber-50/50 to-white'
  },
  {
    headerBg: 'bg-[#fbcfe8]',      // 7. Algodón de Azúcar Fucsia
    borderColor: 'border-[#f472b6]',
    textColor: 'text-[#be185d]',
    ribbonColor: '#db2777',
    windowBg: 'from-pink-50 via-rose-50/40 to-white'
  },
  {
    headerBg: 'bg-[#99f6e4]',      // 8. Turquesa Océano
    borderColor: 'border-[#2dd4bf]',
    textColor: 'text-[#0f766e]',
    ribbonColor: '#0d9488',
    windowBg: 'from-teal-50 via-cyan-50/50 to-white'
  },
  {
    headerBg: 'bg-[#ddd6fe]',      // 9. Lila Dulce
    borderColor: 'border-[#a78bfa]',
    textColor: 'text-[#6d28d9]',
    ribbonColor: '#7c3aed',
    windowBg: 'from-indigo-50 via-violet-50/50 to-white'
  },
  {
    headerBg: 'bg-[#ffedd5]',      // 10. Albaricoque Cálido
    borderColor: 'border-[#fdba74]',
    textColor: 'text-[#9a3412]',
    ribbonColor: '#ea580c',
    windowBg: 'from-amber-50 via-orange-50/50 to-white'
  }
];

function getBoxTheme(index = 0) {
  return BOX_PALETTE[Math.abs(index) % BOX_PALETTE.length];
}

// Renderizador del juguete dentro de la ventana del paquete sorpresa con figuras unicas y diversas
function renderToyFigure(producto, index = 0) {
  const nombre = (producto.nombre || '').toLowerCase();
  const cat = (producto.categoria || '').toLowerCase();

  // 1. PRODUCTOS CON IMÁGENES PNG / WEBP OFICIALES
  if (nombre.includes('cowgirl') || nombre.includes('woody') && cat.includes('vibra')) {
    return <img src="/images/vibrador_cowgirl.png" alt={producto.nombre} className="max-h-[115px] w-auto object-contain drop-shadow-md group-hover:scale-110 transition-transform duration-300" />;
  }
  if (nombre.includes('rabbit') || nombre.includes('buzz')) {
    return <img src="/images/rabbitbuzz.webp" alt={producto.nombre} onError={(e) => { e.target.style.display = 'none'; }} className="max-h-[115px] w-auto object-contain drop-shadow-md group-hover:scale-110 transition-transform duration-300" />;
  }
  if (nombre.includes('jessie') || (cat.includes('lence') && nombre.includes('vaquera'))) {
    return <img src="/images/lenceria_andy.png" alt={producto.nombre} className="max-h-[115px] w-auto object-contain drop-shadow-md group-hover:scale-110 transition-transform duration-300" />;
  }
  if (nombre.includes('plug anal gema') || nombre.includes('gema rubí') || nombre.includes('gema rubi')) {
    return <img src="/images/plug_anal.png" alt={producto.nombre} className="max-h-[115px] w-auto object-contain drop-shadow-md group-hover:scale-110 transition-transform duration-300" />;
  }
  if (nombre.includes('caja misteriosa') || (cat.includes('kit') && nombre.includes('toy box'))) {
    return <img src="/images/mystery_box.png" alt={producto.nombre} className="max-h-[115px] w-auto object-contain drop-shadow-md group-hover:scale-110 transition-transform duration-300" />;
  }
  // Cerdito Travieso SOLO para el juguete de Cerdito Travieso
  if (nombre.includes('cerdito') || nombre.includes('jammy')) {
    return <img src="/images/cerdito_travieso.png" alt={producto.nombre} className="max-h-[115px] w-auto object-contain drop-shadow-md group-hover:scale-110 transition-transform duration-300" />;
  }

  // 2. VECTORES ADORABLES, PRECISOS Y PERSONALIZADOS SEGÚN EL TIPO DE JUGUETE
  
  // A) VIBRADOR SUCCIÓN CLITORIANA / SÓNICO
  if (nombre.includes('succión') || nombre.includes('succ') || nombre.includes('toyito')) {
    return (
      <svg className="w-24 h-24 drop-shadow-md transform group-hover:scale-110 transition-transform duration-300" viewBox="0 0 100 100" fill="none">
        <path d="M50 15 C 36 15, 28 28, 28 45 C 28 68, 40 85, 50 88 C 60 85, 72 68, 72 45 C 72 28, 64 15, 50 15 Z" fill="#f43f5e" stroke="#1e293b" strokeWidth="2.5" />
        <ellipse cx="50" cy="38" rx="9" ry="12" fill="#ffe4e6" stroke="#1e293b" strokeWidth="2" />
        <ellipse cx="50" cy="38" rx="4" ry="6" fill="#be123c" />
        <circle cx="50" cy="65" r="5" fill="#fde047" stroke="#1e293b" strokeWidth="1.8" />
        <path d="M50 62 v 6" stroke="#1e293b" strokeWidth="1.5" />
        <path d="M22 35 Q 16 45 22 55" stroke="#f43f5e" strokeWidth="2" strokeLinecap="round" />
        <path d="M78 35 Q 84 45 78 55" stroke="#f43f5e" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }

  // B) VIBRADOR BALA DISCRETO
  if (nombre.includes('bala') || nombre.includes('minimalista') || nombre.includes('bolsillo')) {
    return (
      <svg className="w-24 h-24 drop-shadow-md transform group-hover:scale-110 transition-transform duration-300" viewBox="0 0 100 100" fill="none">
        <path d="M38 42 C 38 20, 62 20, 62 42 V 82 H 38 Z" fill="#bae6fd" stroke="#1e293b" strokeWidth="2.5" />
        <path d="M38 70 H 62" stroke="#0284c7" strokeWidth="3" />
        <rect x="38" y="72" width="24" height="10" fill="#38bdf8" stroke="#1e293b" strokeWidth="2" />
        <circle cx="50" cy="50" r="4.5" fill="#f43f5e" stroke="#1e293b" strokeWidth="1.5" />
        <path d="M44 26 C 47 22, 53 22, 56 26" stroke="white" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }

  // C) VIBRADOR CURVADO PUNTO G / VARITA
  if (nombre.includes('curvado') || nombre.includes('punto g') || (cat.includes('vibra') && nombre.includes('terciopelo'))) {
    return (
      <svg className="w-24 h-24 drop-shadow-md transform group-hover:scale-110 transition-transform duration-300" viewBox="0 0 100 100" fill="none">
        <path d="M46 90 V 46 C 46 26, 68 20, 72 36 C 74 46, 62 52, 56 56 V 90 Z" fill="#d946ef" stroke="#1e293b" strokeWidth="2.5" />
        <circle cx="51" cy="74" r="5" fill="#fde047" stroke="#1e293b" strokeWidth="1.8" />
        <path d="M51 71 v 6" stroke="#1e293b" strokeWidth="1.5" />
        <path d="M58 32 C 64 28, 68 32, 68 36" stroke="white" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }

  // D) VIBRADOR PANTY CON CONTROL REMOTO
  if (nombre.includes('panty') || nombre.includes('remoto')) {
    return (
      <svg className="w-24 h-24 drop-shadow-md transform group-hover:scale-110 transition-transform duration-300" viewBox="0 0 100 100" fill="none">
        <path d="M26 44 C 22 28, 48 34, 50 48 C 52 34, 78 28, 74 44 C 70 62, 54 68, 50 68 C 46 68, 30 62, 26 44 Z" fill="#c084fc" stroke="#1e293b" strokeWidth="2.5" />
        <circle cx="50" cy="50" r="4" fill="#fef08a" />
        <path d="M62 70 C 58 70, 56 76, 62 84 C 68 84, 72 78, 66 70 Z" fill="#f43f5e" stroke="#1e293b" strokeWidth="1.8" />
        <circle cx="63" cy="76" r="1.5" fill="white" />
      </svg>
    );
  }

  // E) VIBRADORES GENÉRICOS
  if (cat.includes('vibra')) {
    return (
      <svg className="w-24 h-24 drop-shadow-md transform group-hover:scale-110 transition-transform duration-300" viewBox="0 0 100 100" fill="none">
        <path d="M40 90V40c0-10 10-18 20-18s20 8 20 18v50c0 5-5 8-10 8H50c-5 0-10-3-10-8z" fill="#ff70a6" stroke="#1e293b" strokeWidth="2.5" />
        <path d="M44 24C40 10 46 4 52 14c4 7 2 12 0 14" fill="#ffd166" stroke="#1e293b" strokeWidth="2.2" strokeLinecap="round" />
        <circle cx="50" cy="46" r="2.5" fill="#1e293b" />
        <circle cx="64" cy="46" r="2.5" fill="#1e293b" />
        <circle cx="57" cy="72" r="5" fill="#ffffff" stroke="#1e293b" strokeWidth="2" />
      </svg>
    );
  }

  // F) BABY DOLL DE SEDA & ENCAJE
  if (nombre.includes('baby doll') || nombre.includes('babydoll') || nombre.includes('seda nocturna')) {
    return (
      <svg className="w-24 h-24 drop-shadow-md transform group-hover:scale-110 transition-transform duration-300" viewBox="0 0 100 100" fill="none">
        <path d="M32 20 L 38 34 M 68 20 L 62 34" stroke="#e11d48" strokeWidth="2" strokeLinecap="round" />
        <path d="M36 34 C 42 30, 58 30, 64 34 L 76 86 C 60 92, 40 92, 24 86 Z" fill="#fecdd3" stroke="#1e293b" strokeWidth="2.5" />
        <path d="M36 34 C 44 42, 56 42, 64 34" fill="#fda4af" stroke="#1e293b" strokeWidth="2" />
        <circle cx="50" cy="44" r="3" fill="#e11d48" />
        <path d="M24 86 C 36 82, 64 82, 76 86" stroke="#be123c" strokeWidth="3" strokeDasharray="3 3" />
      </svg>
    );
  }

  // G) ARNÉS CORPORAL DE TIRAS & CUERO
  if (nombre.includes('arnés') || nombre.includes('arnes') || nombre.includes('tiras')) {
    return (
      <svg className="w-24 h-24 drop-shadow-md transform group-hover:scale-110 transition-transform duration-300" viewBox="0 0 100 100" fill="none">
        <circle cx="50" cy="45" r="7" fill="none" stroke="#eab308" strokeWidth="3" />
        <path d="M50 38 V 18 M 50 52 V 88 M 43 45 H 20 M 57 45 H 80" stroke="#1e293b" strokeWidth="3.5" strokeLinecap="round" />
        <path d="M26 28 L 45 40 M 74 28 L 55 40 M 45 50 L 26 78 M 55 50 L 74 78" stroke="#1e293b" strokeWidth="3" strokeLinecap="round" />
      </svg>
    );
  }

  // H) BODY DE ENCAJE / BATA KIMONO
  if (nombre.includes('body') || nombre.includes('kimono') || cat.includes('lence')) {
    return (
      <svg className="w-24 h-24 drop-shadow-md transform group-hover:scale-110 transition-transform duration-300" viewBox="0 0 100 100" fill="none">
        <path d="M30 22 C 38 28, 44 20, 50 26 C 56 20, 62 28, 70 22 C 68 44, 62 56, 50 60 C 38 56, 32 44, 30 22 Z" fill="#fed7aa" stroke="#1e293b" strokeWidth="2.5" />
        <circle cx="40" cy="34" r="2.5" fill="#ea580c" />
        <circle cx="60" cy="34" r="2.5" fill="#ea580c" />
        <path d="M32 68 H 68 L 56 90 H 44 Z" fill="#fbcfe8" stroke="#1e293b" strokeWidth="2.5" />
        <path d="M38 72 Q 50 78 62 72" stroke="#db2777" strokeWidth="2" fill="none" />
      </svg>
    );
  }

  // I) PLUG ANAL VIBRADOR SILICONA
  if (nombre.includes('vibrador silicona') && cat.includes('anal')) {
    return (
      <svg className="w-24 h-24 drop-shadow-md transform group-hover:scale-110 transition-transform duration-300" viewBox="0 0 100 100" fill="none">
        <path d="M50 14 C 36 14, 28 30, 28 46 C 28 62, 44 76, 44 76 H 56 S 72 62, 72 46 C 72 30, 64 14, 50 14 Z" fill="#c084fc" stroke="#1e293b" strokeWidth="2.5" />
        <rect x="44" y="76" width="12" height="10" rx="2" fill="#a855f7" stroke="#1e293b" strokeWidth="2.5" />
        <ellipse cx="50" cy="90" rx="24" ry="7" fill="#7e22ce" stroke="#1e293b" strokeWidth="2.5" />
        <circle cx="50" cy="46" r="4" fill="#fde047" stroke="#1e293b" strokeWidth="1.5" />
      </svg>
    );
  }

  // J) SET DE 3 PLUGS PROGRESIVOS
  if (nombre.includes('progresivos') || nombre.includes('set de 3') || (cat.includes('anal') && nombre.includes('set'))) {
    return (
      <svg className="w-24 h-24 drop-shadow-md transform group-hover:scale-110 transition-transform duration-300" viewBox="0 0 100 100" fill="none">
        <path d="M26 38 C 20 38, 16 48, 16 58 C 16 68, 24 74, 24 74 H 28 S 36 68, 36 58 C 36 48, 32 38, 26 38 Z" fill="#93c5fd" stroke="#1e293b" strokeWidth="1.8" />
        <ellipse cx="26" cy="80" rx="10" ry="3.5" fill="#3b82f6" stroke="#1e293b" strokeWidth="1.8" />
        <path d="M50 24 C 42 24, 36 36, 36 48 C 36 62, 46 72, 46 72 H 54 S 64 62, 64 48 C 64 36, 58 24, 50 24 Z" fill="#a7f3d0" stroke="#1e293b" strokeWidth="2.2" />
        <ellipse cx="50" cy="78" rx="13" ry="4.5" fill="#10b981" stroke="#1e293b" strokeWidth="2" />
        <path d="M76 16 C 68 16, 62 30, 62 44 C 62 60, 72 72, 72 72 H 80 S 90 60, 90 44 C 90 30, 84 16, 76 16 Z" fill="#fbcfe8" stroke="#1e293b" strokeWidth="2.2" />
        <ellipse cx="76" cy="78" rx="14" ry="5" fill="#f43f5e" stroke="#1e293b" strokeWidth="2" />
      </svg>
    );
  }

  // K) PLUGS / ANALES GENÉRICOS
  if (cat.includes('anal') || nombre.includes('plug') || nombre.includes('sonda')) {
    return (
      <svg className="w-24 h-24 drop-shadow-md transform group-hover:scale-110 transition-transform duration-300" viewBox="0 0 100 100" fill="none">
        <path d="M50 14 C 38 14, 30 28, 30 42 C 30 58, 46 76, 46 76 H 54 S 70 58, 70 42 C 70 28, 62 14, 50 14 Z" fill="#93c5fd" stroke="#1e293b" strokeWidth="2.5" />
        <path d="M42 20 C 38 26, 36 34, 36 42" stroke="white" strokeWidth="2.5" strokeLinecap="round" opacity="0.8" />
        <rect x="45" y="76" width="10" height="9" rx="2" fill="#60a5fa" stroke="#1e293b" strokeWidth="2.5" />
        <ellipse cx="50" cy="88" rx="22" ry="7" fill="#3b82f6" stroke="#1e293b" strokeWidth="2.5" />
        <polygon points="50,84 56,88 50,92 44,88" fill="#f43f5e" stroke="#1e293b" strokeWidth="1.5" />
      </svg>
    );
  }

  // L) DILDO DUAL DENSITY / REALFEEL
  if (nombre.includes('dual density') || nombre.includes('realfeel') || nombre.includes('18cm')) {
    return (
      <svg className="w-24 h-24 drop-shadow-md transform group-hover:scale-110 transition-transform duration-300" viewBox="0 0 100 100" fill="none">
        <path d="M44 86 V 34 C 44 22, 58 18, 64 28 C 68 34, 62 42, 58 48 V 86 Z" fill="#fed7aa" stroke="#1e293b" strokeWidth="2.5" />
        <ellipse cx="51" cy="86" rx="18" ry="7" fill="#f97316" stroke="#1e293b" strokeWidth="2.5" />
        <path d="M48 30 C 50 26, 56 26, 60 30" stroke="#ea580c" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }

  // M) DILDO DE CRISTAL BOROSILICATO
  if (nombre.includes('cristal') || nombre.includes('hechizo') || cat.includes('dildo')) {
    return (
      <svg className="w-24 h-24 drop-shadow-md transform group-hover:scale-110 transition-transform duration-300" viewBox="0 0 100 100" fill="none">
        <path d="M44 88 V 32 C 44 18, 58 18, 58 32 V 88 Z" fill="#bae6fd" stroke="#0284c7" strokeWidth="2.5" opacity="0.85" />
        <ellipse cx="51" cy="88" rx="16" ry="6" fill="#7dd3fc" stroke="#0284c7" strokeWidth="2.5" />
        <path d="M48 24 Q 54 36 48 48 Q 54 60 48 72" stroke="white" strokeWidth="3" strokeLinecap="round" />
      </svg>
    );
  }

  // N) LUBRICANTE / COSMÉTICA ÍNTIMA
  if (nombre.includes('lubricante') || (cat.includes('cosme') && nombre.includes('algodón'))) {
    return (
      <svg className="w-24 h-24 drop-shadow-md transform group-hover:scale-110 transition-transform duration-300" viewBox="0 0 100 100" fill="none">
        <rect x="34" y="38" width="32" height="48" rx="8" fill="#bae6fd" stroke="#1e293b" strokeWidth="2.5" />
        <rect x="42" y="24" width="16" height="14" rx="2" fill="#38bdf8" stroke="#1e293b" strokeWidth="2.5" />
        <rect x="38" y="52" width="24" height="22" rx="4" fill="white" stroke="#1e293b" strokeWidth="1.5" />
        <path d="M50 56 C 47 62, 45 64, 45 67 C 45 70, 47 72, 50 72 C 53 72, 55 70, 55 67 C 55 64, 53 62, 50 56 Z" fill="#0284c7" />
      </svg>
    );
  }

  // O) ACEITE DE MASAJE / VELA AROMÁTICA
  if (nombre.includes('aceite') || nombre.includes('vela') || nombre.includes('masaje')) {
    return (
      <svg className="w-24 h-24 drop-shadow-md transform group-hover:scale-110 transition-transform duration-300" viewBox="0 0 100 100" fill="none">
        <rect x="36" y="36" width="28" height="50" rx="6" fill="#fef08a" stroke="#1e293b" strokeWidth="2.5" />
        <rect x="44" y="22" width="12" height="14" rx="2" fill="#ca8a04" stroke="#1e293b" strokeWidth="2" />
        <path d="M50 14 C 47 18, 45 20, 45 22 C 45 24, 47 26, 50 26 C 53 26, 55 24, 55 22 C 55 20, 53 18, 50 14 Z" fill="#ea580c" />
        <circle cx="50" cy="62" r="5" fill="#f59e0b" />
      </svg>
    );
  }

  // P) LIMPIADOR ANTIBACTERIAL DE JUGUETES
  if (nombre.includes('limpiador') || nombre.includes('antibacterial') || nombre.includes('espumoso')) {
    return (
      <svg className="w-24 h-24 drop-shadow-md transform group-hover:scale-110 transition-transform duration-300" viewBox="0 0 100 100" fill="none">
        <rect x="34" y="40" width="32" height="46" rx="8" fill="#a7f3d0" stroke="#1e293b" strokeWidth="2.5" />
        <rect x="42" y="26" width="16" height="14" rx="2" fill="#34d399" stroke="#1e293b" strokeWidth="2.5" />
        <path d="M42 26 H 32 V 20 H 50 V 26" fill="#10b981" stroke="#1e293b" strokeWidth="2" />
        <circle cx="50" cy="56" r="3" fill="#ffffff" />
        <circle cx="44" cy="66" r="4" fill="#ffffff" />
        <circle cx="56" cy="64" r="2.5" fill="#ffffff" />
      </svg>
    );
  }

  // Q) ESPOSAS DE PELUCHE SUAVE / BDSM
  if (nombre.includes('esposas') || nombre.includes('peluche') || cat.includes('acces')) {
    return (
      <svg className="w-24 h-24 drop-shadow-md transform group-hover:scale-110 transition-transform duration-300" viewBox="0 0 100 100" fill="none">
        <circle cx="34" cy="50" r="16" fill="#fce7f3" stroke="#db2777" strokeWidth="4" />
        <circle cx="66" cy="50" r="16" fill="#e0e7ff" stroke="#4f46e5" strokeWidth="4" />
        <circle cx="34" cy="50" r="9" fill="white" stroke="#1e293b" strokeWidth="1.5" />
        <circle cx="66" cy="50" r="9" fill="white" stroke="#1e293b" strokeWidth="1.5" />
        <path d="M48 50 H 52" stroke="#94a3b8" strokeWidth="4" strokeLinecap="round" />
      </svg>
    );
  }

  // R) DEFAULT / KITS SORPRESA
  return (
    <svg className="w-24 h-24 drop-shadow-md transform group-hover:scale-110 transition-transform duration-300" viewBox="0 0 100 100" fill="none">
      <rect x="25" y="38" width="50" height="46" rx="6" fill="#fef08a" stroke="#1e293b" strokeWidth="2.5" />
      <path d="M22 38 H 78 V 30 H 22 Z" fill="#facc15" stroke="#1e293b" strokeWidth="2.5" />
      <path d="M50 30 V 84 M 25 58 H 75" stroke="#ca8a04" strokeWidth="3" />
      <ellipse cx="44" cy="24" rx="6" ry="4" fill="#ef4444" stroke="#1e293b" strokeWidth="2" />
      <ellipse cx="56" cy="24" rx="6" ry="4" fill="#ef4444" stroke="#1e293b" strokeWidth="2" />
    </svg>
  );
}

export default function ToyBoxCard({ producto, index = 0, onClick }) {
  const theme = getBoxTheme(index);
  const seriesNum = String(index + 1).padStart(3, '0');

  return (
    <div
      onClick={onClick}
      className="w-full max-w-[170px] sm:max-w-[190px] md:max-w-[210px] group cursor-pointer flex flex-col items-center transition-all duration-300 hover:-translate-y-2.5 active:scale-95 select-none"
    >
      {/* 1. PESTAÑA COLGANTE TIPO BLÍSTER DE JUGUETE */}
      <div className={`w-[90%] h-8 ${theme.headerBg} border-3 ${theme.borderColor} border-b-0 rounded-t-xl relative flex items-center justify-center shadow-xs transition-colors`}>
        {/* Agujero de exhibición en percha de tienda */}
        <div className="w-9 h-3.5 bg-white/90 border border-slate-300 rounded-full flex items-center justify-center shadow-inner">
          <div className="w-4 h-1.5 bg-slate-200/80 rounded-full"></div>
        </div>
        {/* Remaches de empaque */}
        <div className="absolute left-2.5 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-black/15"></div>
        <div className="absolute right-2.5 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-black/15"></div>
      </div>

      {/* 2. CUERPO DE LA CAJA (DE FRENTE - PAQUETE COLECCIONABLE) */}
      <div className={`w-full bg-white rounded-2xl border-4 ${theme.borderColor} shadow-[0_12px_24px_rgba(0,0,0,0.12)] group-hover:shadow-[0_20px_35px_rgba(0,0,0,0.22)] overflow-hidden flex flex-col justify-between transition-all duration-300 relative`}>
        
        {/* Cabecera interna */}
        <div className={`${theme.headerBg} px-2.5 py-1.5 flex items-center justify-between border-b-2 ${theme.borderColor}`}>
          <span className="text-[9px] font-black tracking-widest text-[#1e3a8a] uppercase">
            TOY STORE
          </span>
          <span className={`text-[8px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded-md bg-white/80 ${theme.textColor}`}>
            #{seriesNum}
          </span>
        </div>

        {/* 3. VENTANA TRANSPARENTE DEL BLÍSTER CON EL JUGUETE DENTRO */}
        <div className={`relative h-[145px] sm:h-[160px] bg-gradient-to-b ${theme.windowBg} flex items-center justify-center p-3 overflow-hidden`}>
          {/* Fondo interno punteado tenue */}
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1.5px,transparent_1.5px)] [background-size:12px_12px] opacity-40 pointer-events-none"></div>

          {/* Reflejo de plástico brillante al hacer hover */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/25 to-transparent pointer-events-none transform -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"></div>

          {/* El juguete exhibido de frente */}
          <div className="relative z-10 flex items-center justify-center">
            {renderToyFigure(producto, index)}
          </div>

          {/* Sombra de apoyo */}
          <div className="absolute bottom-2 inset-x-8 h-2 bg-black/10 rounded-full blur-xs pointer-events-none"></div>
        </div>

        {/* 4. BASE INFERIOR CON NOMBRE Y PRECIO */}
        <div className="bg-slate-50 p-2.5 border-t-2 border-slate-100 flex flex-col justify-between">
          <h4
            className="text-xs font-black text-[#1e3a8a] truncate text-center leading-tight tracking-tight uppercase"
            title={producto.nombre}
          >
            {producto.nombre}
          </h4>

          {/* Etiqueta de precio */}
          <div className="mt-1.5 flex items-center justify-center gap-1.5">
            <span className="bg-[#fbbf24] text-[#1e3a8a] text-[10px] font-black px-2.5 py-0.5 rounded-full shadow-xs border border-amber-400">
              ${Number(producto.precio).toLocaleString('es-CO')}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
