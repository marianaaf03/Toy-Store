import React from 'react';

// Temas de color pastel y acentos según categoría para las cajas tipo Funko / Blind Box
function getBoxTheme(categoria = '') {
  const cat = categoria.toLowerCase();
  if (cat.includes('vibra')) {
    return {
      headerBg: 'bg-[#ffb6c1]',      // Pastel rosa suave
      borderColor: 'border-[#ff9eb5]',
      textColor: 'text-[#e11d48]',
      tagText: 'VIBRATOR',
      ribbonColor: '#f43f5e',
      windowBg: 'from-pink-50 via-rose-50/50 to-white'
    };
  }
  if (cat.includes('lence')) {
    return {
      headerBg: 'bg-[#e9d5ff]',      // Pastel lavanda
      borderColor: 'border-[#d8b4fe]',
      textColor: 'text-[#9333ea]',
      tagText: 'LINGERIE',
      ribbonColor: '#a855f7',
      windowBg: 'from-purple-50 via-fuchsia-50/50 to-white'
    };
  }
  if (cat.includes('anal')) {
    return {
      headerBg: 'bg-[#bae6fd]',      // Pastel celeste
      borderColor: 'border-[#7dd3fc]',
      textColor: 'text-[#0284c7]',
      tagText: 'ANAL TOY',
      ribbonColor: '#0284c7',
      windowBg: 'from-sky-50 via-blue-50/50 to-white'
    };
  }
  if (cat.includes('cosme')) {
    return {
      headerBg: 'bg-[#fbcfe8]',      // Pastel fucsia/algodón
      borderColor: 'border-[#f472b6]',
      textColor: 'text-[#db2777]',
      tagText: 'COSMETIC',
      ribbonColor: '#db2777',
      windowBg: 'from-pink-50 via-rose-50/40 to-white'
    };
  }
  if (cat.includes('kit')) {
    return {
      headerBg: 'bg-[#fef08a]',      // Pastel amarillo soleado
      borderColor: 'border-[#facc15]',
      textColor: 'text-[#ca8a04]',
      tagText: 'MYSTERY KIT',
      ribbonColor: '#eab308',
      windowBg: 'from-amber-50 via-yellow-50/50 to-white'
    };
  }
  if (cat.includes('dildo') || cat.includes('pene')) {
    return {
      headerBg: 'bg-[#fed7aa]',      // Pastel melocotón
      borderColor: 'border-[#fb923c]',
      textColor: 'text-[#ea580c]',
      tagText: 'DILDO TOY',
      ribbonColor: '#f97316',
      windowBg: 'from-orange-50 via-amber-50/50 to-white'
    };
  }
  // Accesorios / default
  return {
    headerBg: 'bg-[#bbf7d0]',        // Pastel menta
    borderColor: 'border-[#86efac]',
    textColor: 'text-[#16a34a]',
    tagText: 'ACCESSORY',
    ribbonColor: '#22c55e',
    windowBg: 'from-emerald-50 via-teal-50/50 to-white'
  };
}

// Renderizador del juguete dentro de la ventana de la caja
function renderToyFigure(producto) {
  const cat = (producto.categoria || '').toLowerCase();
  const nombre = (producto.nombre || '').toLowerCase();

  // Si tiene imagen propia asignada que no sea repetida por defecto
  if (producto.imagen && producto.imagen.includes('cerdito_travieso')) {
    return <img src="/images/cerdito_travieso.png" alt={producto.nombre} className="max-h-[110px] w-auto object-contain drop-shadow-md group-hover:scale-110 transition-transform duration-300" />;
  }
  if (producto.imagen && producto.imagen.includes('vibrador_cowgirl')) {
    return <img src="/images/vibrador_cowgirl.png" alt={producto.nombre} className="max-h-[110px] w-auto object-contain drop-shadow-md group-hover:scale-110 transition-transform duration-300" />;
  }
  if (producto.imagen && producto.imagen.includes('lenceria_andy')) {
    return <img src="/images/lenceria_andy.png" alt={producto.nombre} className="max-h-[110px] w-auto object-contain drop-shadow-md group-hover:scale-110 transition-transform duration-300" />;
  }
  if (producto.imagen && producto.imagen.includes('plug_anal')) {
    return <img src="/images/plug_anal.png" alt={producto.nombre} className="max-h-[110px] w-auto object-contain drop-shadow-md group-hover:scale-110 transition-transform duration-300" />;
  }
  if (producto.imagen && producto.imagen.includes('mystery_box')) {
    return <img src="/images/mystery_box.png" alt={producto.nombre} className="max-h-[110px] w-auto object-contain drop-shadow-md group-hover:scale-110 transition-transform duration-300" />;
  }

  // Ilustraciones vectoriales adorables estilo "muñequito / Funko Pop"
  if (cat.includes('vibra')) {
    return (
      <svg className="w-24 h-24 drop-shadow-md transform group-hover:scale-110 transition-transform duration-300" viewBox="0 0 100 100" fill="none">
        {/* Cuerpo tipo varita / conejo animado */}
        <path d="M40 90V40c0-10 10-18 20-18s20 8 20 18v50c0 5-5 8-10 8H50c-5 0-10-3-10-8z" fill="#ff70a6" stroke="#1e293b" strokeWidth="2.5" />
        {/* Orejitas */}
        <path d="M44 24C40 10 46 4 52 14c4 7 2 12 0 14" fill="#ffd166" stroke="#1e293b" strokeWidth="2.2" strokeLinecap="round" />
        <path d="M66 24C70 10 64 4 58 14c-4 7-2 12 0 14" fill="#ffd166" stroke="#1e293b" strokeWidth="2.2" strokeLinecap="round" />
        {/* Carita tierna */}
        <ellipse cx="53" cy="46" rx="2.5" ry="3.5" fill="#1e293b" />
        <ellipse cx="67" cy="46" rx="2.5" ry="3.5" fill="#1e293b" />
        <circle cx="52" cy="44.5" r="1" fill="white" />
        <circle cx="66" cy="44.5" r="1" fill="white" />
        <path d="M58 53c1.5 1 3.5 1 5 0" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" />
        <circle cx="48" cy="50" r="2.5" fill="#ff99c8" opacity="0.8" />
        <circle cx="72" cy="50" r="2.5" fill="#ff99c8" opacity="0.8" />
        {/* Botón de encendido */}
        <circle cx="60" cy="72" r="5" fill="#ffffff" stroke="#1e293b" strokeWidth="2" />
        <path d="M60 69v3" stroke="#e11d48" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    );
  }

  if (cat.includes('lence')) {
    return (
      <svg className="w-24 h-24 drop-shadow-md transform group-hover:scale-110 transition-transform duration-300" viewBox="0 0 100 100" fill="none">
        {/* Bralette y lencería vaquera animada */}
        <path d="M26 30c8 3 18-4 24 2 6-6 16-1 24-2 0 14-6 24-12 28l-12 6-12-6c-6-4-12-14-12-28z" fill="#d8b4fe" stroke="#1e293b" strokeWidth="2.5" />
        <path d="M26 30l10-18M74 30l-10-18" stroke="#7e22ce" strokeWidth="2.5" strokeLinecap="round" />
        {/* Panty vaquera */}
        <path d="M32 68h36l-8 22H40l-8-22z" fill="#fbcfe8" stroke="#1e293b" strokeWidth="2.5" />
        <circle cx="50" cy="74" r="2.5" fill="#ec4899" />
        <path d="M38 72c6 2 18 2 24 0" stroke="#ec4899" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }

  if (cat.includes('anal')) {
    return (
      <svg className="w-24 h-24 drop-shadow-md transform group-hover:scale-110 transition-transform duration-300" viewBox="0 0 100 100" fill="none">
        {/* Plug metálico con gema animada */}
        <path d="M50 14c-12 0-20 14-20 28 0 16 16 34 16 34h8s16-18 16-34c0-14-8-28-20-28z" fill="#93c5fd" stroke="#1e293b" strokeWidth="2.5" />
        <path d="M42 20c-4 6-6 14-6 22" stroke="white" strokeWidth="2.5" strokeLinecap="round" opacity="0.8" />
        {/* Cuello y base */}
        <rect x="45" y="74" width="10" height="10" rx="2" fill="#60a5fa" stroke="#1e293b" strokeWidth="2.5" />
        <ellipse cx="50" cy="87" rx="22" ry="7" fill="#3b82f6" stroke="#1e293b" strokeWidth="2.5" />
        {/* Gema brillante */}
        <polygon points="50,83 56,87 50,91 44,87" fill="#f43f5e" stroke="#1e293b" strokeWidth="1.5" />
      </svg>
    );
  }

  if (cat.includes('cosme')) {
    return (
      <svg className="w-24 h-24 drop-shadow-md transform group-hover:scale-110 transition-transform duration-300" viewBox="0 0 100 100" fill="none">
        {/* Botella cosmética animada */}
        <rect x="34" y="38" width="32" height="48" rx="8" fill="#fbcfe8" stroke="#1e293b" strokeWidth="2.5" />
        <rect x="42" y="24" width="16" height="14" rx="2" fill="#f472b6" stroke="#1e293b" strokeWidth="2.5" />
        <circle cx="50" cy="20" r="4" fill="#db2777" stroke="#1e293b" strokeWidth="2" />
        {/* Etiqueta con corazón */}
        <rect x="39" y="52" width="22" height="22" rx="4" fill="white" stroke="#1e293b" strokeWidth="1.5" />
        <path d="M50 66l-4-4c-2-2-2-5 0-7 2-2 5-2 7 0 2-2 5-2 7 0 2 2 2 5 0 7l-10 4z" fill="#f43f5e" />
      </svg>
    );
  }

  // Default: Paquete sorpresa misterioso
  return (
    <svg className="w-24 h-24 drop-shadow-md transform group-hover:scale-110 transition-transform duration-300" viewBox="0 0 100 100" fill="none">
      <rect x="25" y="35" width="50" height="48" rx="6" fill="#fde047" stroke="#1e293b" strokeWidth="2.5" />
      <path d="M22 35h56v-8H22v8z" fill="#facc15" stroke="#1e293b" strokeWidth="2.5" />
      <path d="M50 27v56M25 56h50" stroke="#ca8a04" strokeWidth="3" />
      <ellipse cx="44" cy="22" rx="6" ry="4" fill="#ef4444" stroke="#1e293b" strokeWidth="2" />
      <ellipse cx="56" cy="22" rx="6" ry="4" fill="#ef4444" stroke="#1e293b" strokeWidth="2" />
    </svg>
  );
}

export default function ToyBoxCard({ producto, index = 0, onClick }) {
  const theme = getBoxTheme(producto.categoria);
  const seriesNum = String(index + 1).padStart(3, '0');

  return (
    <div
      onClick={onClick}
      className="w-[175px] sm:w-[195px] md:w-[215px] group cursor-pointer flex flex-col items-center transition-all duration-300 hover:-translate-y-2.5 active:scale-95"
    >
      {/* 1. SOMBRERITO / PESTAÑA COLGANTE TIPO BLÍSTER DE JUGUETE */}
      <div className={`w-[90%] h-8 ${theme.headerBg} border-3 ${theme.borderColor} border-b-0 rounded-t-xl relative flex items-center justify-center shadow-xs transition-colors`}>
        {/* Ranura ovalada para colgar del gancho del estante */}
        <div className="w-8 h-3 bg-white/90 rounded-full border border-slate-300 shadow-inner flex items-center justify-center">
          <div className="w-2.5 h-2.5 rounded-full bg-slate-200"></div>
        </div>

        {/* Lazo / Moño decorativo estilo Canva */}
        <div className="absolute right-2 top-1 text-xs opacity-75">
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill={theme.ribbonColor}>
            <path d="M12 12c-2-3-6-4-8-2s-1 6 2 7l6-5zm0 0c2-3 6-4 8-2s1 6-2 7l-6-5zm0 0v6" />
          </svg>
        </div>
      </div>

      {/* 2. CUERPO DE LA CAJA (DE FRENTE - TIPO FUNKO POP / PAQUETE SORPRESA) */}
      <div className={`w-full bg-white rounded-2xl border-4 ${theme.borderColor} shadow-[0_12px_24px_rgba(0,0,0,0.12)] group-hover:shadow-[0_20px_35px_rgba(0,0,0,0.22)] overflow-hidden flex flex-col justify-between transition-all duration-300 relative`}>
        
        {/* Cabecera superior interna */}
        <div className={`${theme.headerBg} px-2.5 py-1.5 flex items-center justify-between border-b-2 ${theme.borderColor}`}>
          <span className="text-[9px] font-black tracking-widest text-[#1e3a8a] uppercase">
            TOY STORE
          </span>
          <span className={`text-[8px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded-md bg-white/80 ${theme.textColor}`}>
            #{seriesNum}
          </span>
        </div>

        {/* 3. VENTANA TRANSPARENTE DEL BLÍSTER CON EL JUGUETE DENTRO */}
        <div className={`relative h-[150px] sm:h-[165px] bg-gradient-to-b ${theme.windowBg} flex items-center justify-center p-3 overflow-hidden`}>
          {/* Fondo interno con patrón decorativo tenue */}
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1.5px,transparent_1.5px)] [background-size:12px_12px] opacity-40 pointer-events-none"></div>

          {/* Reflejo diagonal de plástico transparente (Brillo animado al hacer hover) */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/25 to-transparent pointer-events-none transform -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"></div>

          {/* El juguete exhibido en el centro de la ventana */}
          <div className="relative z-10 flex items-center justify-center">
            {renderToyFigure(producto)}
          </div>

          {/* Sombra de apoyo en la base de la ventana */}
          <div className="absolute bottom-2 inset-x-8 h-2 bg-black/10 rounded-full blur-xs pointer-events-none"></div>
        </div>

        {/* 4. BASE INFERIOR DE LA CAJA CON NOMBRE Y PRECIO */}
        <div className="bg-slate-50 p-2.5 border-t-2 border-slate-100 flex flex-col justify-between">
          <h4
            className="text-xs font-black text-[#1e3a8a] truncate text-center leading-tight tracking-tight uppercase"
            title={producto.nombre}
          >
            {producto.nombre}
          </h4>

          {/* Sticker de precio estrella estilo Toy Store */}
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
