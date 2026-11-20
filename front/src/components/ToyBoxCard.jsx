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

// Renderizador del juguete dentro de la ventana del paquete sorpresa
function renderToyFigure(producto, index = 0) {
  const nombre = (producto.nombre || '').toLowerCase();
  const cat = (producto.categoria || '').toLowerCase();

  // 1. PRODUCTOS OFICIALES CON IMÁGENES PNG EXCLUSIVAS
  if (nombre.includes('vibrador cowgirl woody') || (producto.imagen && producto.imagen.includes('vibrador_cowgirl'))) {
    return <img src="/images/vibrador_cowgirl.png" alt={producto.nombre} className="max-h-[110px] w-auto object-contain drop-shadow-md group-hover:scale-110 transition-transform duration-300" />;
  }
  if (nombre.includes('lencería andy chic') || nombre.includes('lenceria andy') || (producto.imagen && producto.imagen.includes('lenceria_andy'))) {
    return <img src="/images/lenceria_andy.png" alt={producto.nombre} className="max-h-[110px] w-auto object-contain drop-shadow-md group-hover:scale-110 transition-transform duration-300" />;
  }
  if (nombre.includes('plug anal gema') || (producto.imagen && producto.imagen.includes('plug_anal'))) {
    return <img src="/images/plug_anal.png" alt={producto.nombre} className="max-h-[110px] w-auto object-contain drop-shadow-md group-hover:scale-110 transition-transform duration-300" />;
  }
  if (nombre.includes('caja misteriosa toy box') || (producto.imagen && producto.imagen.includes('mystery_box'))) {
    return <img src="/images/mystery_box.png" alt={producto.nombre} className="max-h-[110px] w-auto object-contain drop-shadow-md group-hover:scale-110 transition-transform duration-300" />;
  }
  if (nombre.includes('cerdito') || nombre.includes('jammy')) {
    return <img src="/images/cerdito_travieso.png" alt={producto.nombre} className="max-h-[110px] w-auto object-contain drop-shadow-md group-hover:scale-110 transition-transform duration-300" />;
  }

  // 2. VECTORES ADORABLES Y PERSONALIZADOS SEGÚN CADA PRODUCTO
  // A) VIBRADORES
  if (nombre.includes('succión') || nombre.includes('succ') || nombre.includes('toyito')) {
    return (
      <svg className="w-24 h-24 drop-shadow-md transform group-hover:scale-110 transition-transform duration-300" viewBox="0 0 100 100" fill="none">
        <path d="M50 15 C 36 15, 28 28, 28 45 C 28 68, 40 85, 50 88 C 60 85, 72 68, 72 45 C 72 28, 64 15, 50 15 Z" fill="#f43f5e" stroke="#1e293b" strokeWidth="2.5" />
        <ellipse cx="50" cy="38" rx="9" ry="12" fill="#ffe4e6" stroke="#1e293b" strokeWidth="2" />
        <ellipse cx="50" cy="38" rx="4" ry="6" fill="#be123c" />
        <circle cx="50" cy="65" r="5" fill="#fde047" stroke="#1e293b" strokeWidth="1.8" />
        <path d="M50 62 v 6" stroke="#1e293b" strokeWidth="1.5" />
        {/* Onditas sónicas */}
        <path d="M22 35 Q 16 45 22 55" stroke="#f43f5e" strokeWidth="2" strokeLinecap="round" />
        <path d="M78 35 Q 84 45 78 55" stroke="#f43f5e" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }

  if (nombre.includes('rabbit') || nombre.includes('conejo')) {
    return (
      <svg className="w-24 h-24 drop-shadow-md transform group-hover:scale-110 transition-transform duration-300" viewBox="0 0 100 100" fill="none">
        {/* Cuerpo principal curvado */}
        <path d="M48 88 V 38 C 48 24, 66 22, 66 38 V 88 Z" fill="#ff70a6" stroke="#1e293b" strokeWidth="2.5" />
        {/* Estimulador clitoriano tipo orejas */}
        <path d="M36 68 C 30 52, 44 48, 48 58" fill="#ffd166" stroke="#1e293b" strokeWidth="2.2" strokeLinecap="round" />
        <path d="M54 22 C 50 8, 58 4, 62 14" fill="#ffd166" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" />
        <path d="M64 22 C 68 8, 74 4, 70 14" fill="#ffd166" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" />
        <circle cx="58" cy="74" r="4.5" fill="#ffffff" stroke="#1e293b" strokeWidth="1.8" />
      </svg>
    );
  }

  if (nombre.includes('bala') || nombre.includes('discreto')) {
    return (
      <svg className="w-24 h-24 drop-shadow-md transform group-hover:scale-110 transition-transform duration-300" viewBox="0 0 100 100" fill="none">
        <path d="M38 40 C 38 20, 62 20, 62 40 V 82 H 38 Z" fill="#e0e7ff" stroke="#1e293b" strokeWidth="2.5" />
        <path d="M38 70 H 62" stroke="#6366f1" strokeWidth="3" />
        <rect x="38" y="72" width="24" height="10" fill="#a5b4fc" stroke="#1e293b" strokeWidth="2" />
        <circle cx="50" cy="50" r="4" fill="#ef4444" stroke="#1e293b" strokeWidth="1.5" />
      </svg>
    );
  }

  if (nombre.includes('panty') || nombre.includes('remoto')) {
    return (
      <svg className="w-24 h-24 drop-shadow-md transform group-hover:scale-110 transition-transform duration-300" viewBox="0 0 100 100" fill="none">
        {/* Vibrador ergonómico de mariposa */}
        <path d="M28 45 C 24 30, 48 35, 50 50 C 52 35, 76 30, 72 45 C 68 62, 54 68, 50 68 C 46 68, 32 62, 28 45 Z" fill="#c084fc" stroke="#1e293b" strokeWidth="2.5" />
        <circle cx="50" cy="52" r="3.5" fill="#fef08a" />
        {/* Control remoto mini en forma de gota */}
        <path d="M64 72 C 60 72, 58 78, 64 84 C 70 84, 72 78, 68 72 Z" fill="#f43f5e" stroke="#1e293b" strokeWidth="1.8" />
      </svg>
    );
  }

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

  // B) LENCERÍA
  if (nombre.includes('jessie') || nombre.includes('vaquera') || cat.includes('lence')) {
    return (
      <svg className="w-24 h-24 drop-shadow-md transform group-hover:scale-110 transition-transform duration-300" viewBox="0 0 100 100" fill="none">
        {/* Top / Bralette con estampado vaquero */}
        <path d="M22 28 C 30 32, 42 22, 50 30 C 58 22, 70 32, 78 28 C 76 44, 66 52, 50 56 C 34 52, 24 44, 22 28 Z" fill="#fed7aa" stroke="#1e293b" strokeWidth="2.5" />
        <circle cx="34" cy="38" r="3" fill="#9a3412" />
        <circle cx="66" cy="38" r="3" fill="#9a3412" />
        <circle cx="50" cy="46" r="2.5" fill="#dc2626" />
        <path d="M26 28 L 34 16 M 74 28 L 66 16" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" />
        {/* Panty */}
        <path d="M28 68 H 72 L 58 92 H 42 Z" fill="#fbcfe8" stroke="#1e293b" strokeWidth="2.5" />
        <path d="M36 72 Q 50 78 64 72" stroke="#db2777" strokeWidth="2" fill="none" />
      </svg>
    );
  }

  // C) PLUGS & ANALES
  if (cat.includes('anal') || nombre.includes('plug') || nombre.includes('cola')) {
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

  // D) DILDOS
  if (cat.includes('dildo') || nombre.includes('dildo')) {
    return (
      <svg className="w-24 h-24 drop-shadow-md transform group-hover:scale-110 transition-transform duration-300" viewBox="0 0 100 100" fill="none">
        <path d="M44 88 V 32 C 44 20, 56 16, 62 26 C 66 32, 60 40, 56 46 V 88 Z" fill="#a7f3d0" stroke="#1e293b" strokeWidth="2.5" />
        <ellipse cx="50" cy="88" rx="16" ry="6" fill="#6ee7b7" stroke="#1e293b" strokeWidth="2.5" />
        <circle cx="53" cy="28" r="2" fill="#047857" />
      </svg>
    );
  }

  // E) COSMÉTICA & LUBRICANTES
  if (cat.includes('cosme') || nombre.includes('lubricante') || nombre.includes('limpiador')) {
    return (
      <svg className="w-24 h-24 drop-shadow-md transform group-hover:scale-110 transition-transform duration-300" viewBox="0 0 100 100" fill="none">
        <rect x="34" y="38" width="32" height="48" rx="8" fill="#fbcfe8" stroke="#1e293b" strokeWidth="2.5" />
        <rect x="42" y="24" width="16" height="14" rx="2" fill="#f472b6" stroke="#1e293b" strokeWidth="2.5" />
        <circle cx="50" cy="20" r="4" fill="#db2777" stroke="#1e293b" strokeWidth="2" />
        <rect x="39" y="52" width="22" height="22" rx="4" fill="white" stroke="#1e293b" strokeWidth="1.5" />
        {/* Gotita de placer */}
        <path d="M50 56 C 47 62, 45 64, 45 67 C 45 70, 47 72, 50 72 C 53 72, 55 70, 55 67 C 55 64, 53 62, 50 56 Z" fill="#38bdf8" />
      </svg>
    );
  }

  // F) ACCESORIOS & BDSM
  if (cat.includes('acces') || nombre.includes('esposas') || nombre.includes('antifaz')) {
    return (
      <svg className="w-24 h-24 drop-shadow-md transform group-hover:scale-110 transition-transform duration-300" viewBox="0 0 100 100" fill="none">
        {/* Esposas de peluche suaves */}
        <circle cx="34" cy="50" r="16" fill="#fce7f3" stroke="#db2777" strokeWidth="4" />
        <circle cx="66" cy="50" r="16" fill="#e0e7ff" stroke="#4f46e5" strokeWidth="4" />
        <circle cx="34" cy="50" r="9" fill="white" stroke="#1e293b" strokeWidth="1.5" />
        <circle cx="66" cy="50" r="9" fill="white" stroke="#1e293b" strokeWidth="1.5" />
        <path d="M48 50 H 52" stroke="#94a3b8" strokeWidth="4" strokeLinecap="round" />
      </svg>
    );
  }

  // G) DEFAULT / KITS SORPRESA
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
      className="w-[165px] sm:w-[185px] md:w-[200px] lg:w-[215px] group cursor-pointer flex flex-col items-center transition-all duration-300 hover:-translate-y-2.5 active:scale-95 select-none"
    >
      {/* 1. PESTAÑA COLGANTE TIPO BLÍSTER DE JUGUETE */}
      <div className={`w-[90%] h-8 ${theme.headerBg} border-3 ${theme.borderColor} border-b-0 rounded-t-xl relative flex items-center justify-center shadow-xs transition-colors`}>
        {/* Ranura para colgar del gancho del estante */}
        <div className="w-8 h-3 bg-white/90 rounded-full border border-slate-300 shadow-inner flex items-center justify-center">
          <div className="w-2.5 h-2.5 rounded-full bg-slate-200"></div>
        </div>

        {/* Lazo decorativo de regalo */}
        <div className="absolute right-2 top-1 text-xs opacity-75">
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill={theme.ribbonColor}>
            <path d="M12 12c-2-3-6-4-8-2s-1 6 2 7l6-5zm0 0c2-3 6-4 8-2s1 6-2 7l-6-5zm0 0v6" />
          </svg>
        </div>
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
