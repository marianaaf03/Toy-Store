import React from 'react';

// Paleta diversa de 15 colores pastel únicos para que NINGUNA caja repita color con sus vecinas
const PALETA_CAJAS = [
  { headerBg: 'bg-[#ffb6c1]', borderColor: 'border-[#ff8fa3]', textColor: 'text-[#e11d48]', tag: 'VIBRATOR', ribbon: '#f43f5e', windowBg: 'from-pink-50 via-rose-50/40 to-white' },
  { headerBg: 'bg-[#e9d5ff]', borderColor: 'border-[#c084fc]', textColor: 'text-[#9333ea]', tag: 'LINGERIE', ribbon: '#a855f7', windowBg: 'from-purple-50 via-fuchsia-50/40 to-white' },
  { headerBg: 'bg-[#bae6fd]', borderColor: 'border-[#38bdf8]', textColor: 'text-[#0284c7]', tag: 'ANAL TOY', ribbon: '#0284c7', windowBg: 'from-sky-50 via-blue-50/40 to-white' },
  { headerBg: 'bg-[#fed7aa]', borderColor: 'border-[#fb923c]', textColor: 'text-[#ea580c]', tag: 'DILDO TOY', ribbon: '#f97316', windowBg: 'from-orange-50 via-amber-50/40 to-white' },
  { headerBg: 'bg-[#fbcfe8]', borderColor: 'border-[#f472b6]', textColor: 'text-[#db2777]', tag: 'COSMETIC', ribbon: '#db2777', windowBg: 'from-pink-50 via-rose-50/40 to-white' },
  { headerBg: 'bg-[#bbf7d0]', borderColor: 'border-[#4ade80]', textColor: 'text-[#16a34a]', tag: 'BDSM SOFT', ribbon: '#22c55e', windowBg: 'from-emerald-50 via-teal-50/40 to-white' },
  { headerBg: 'bg-[#fef08a]', borderColor: 'border-[#facc15]', textColor: 'text-[#ca8a04]', tag: 'MYSTERY KIT', ribbon: '#eab308', windowBg: 'from-amber-50 via-yellow-50/40 to-white' },
  { headerBg: 'bg-[#ddd6fe]', borderColor: 'border-[#a78bfa]', textColor: 'text-[#7c3aed]', tag: 'SENSORY', ribbon: '#8b5cf6', windowBg: 'from-indigo-50 via-purple-50/40 to-white' },
  { headerBg: 'bg-[#fecdd3]', borderColor: 'border-[#fb7185]', textColor: 'text-[#e11d48]', tag: 'COWBOY SPECIAL', ribbon: '#f43f5e', windowBg: 'from-rose-50 via-red-50/40 to-white' },
  { headerBg: 'bg-[#99f6e4]', borderColor: 'border-[#2dd4bf]', textColor: 'text-[#0f766e]', tag: 'WATERPROOF', ribbon: '#14b8a6', windowBg: 'from-teal-50 via-cyan-50/40 to-white' },
  { headerBg: 'bg-[#fef9c3]', borderColor: 'border-[#fde047]', textColor: 'text-[#a16207]', tag: 'PREMIUM SILICONE', ribbon: '#ca8a04', windowBg: 'from-yellow-50 via-amber-50/40 to-white' },
  { headerBg: 'bg-[#f5d0fe]', borderColor: 'border-[#e879f9]', textColor: 'text-[#c026d3]', tag: 'LUXURY ED.', ribbon: '#d946ef', windowBg: 'from-fuchsia-50 via-pink-50/40 to-white' },
  { headerBg: 'bg-[#c7d2fe]', borderColor: 'border-[#818cf8]', textColor: 'text-[#4338ca]', tag: 'STAR COMMAND', ribbon: '#6366f1', windowBg: 'from-blue-50 via-indigo-50/40 to-white' },
  { headerBg: 'bg-[#ffedd5]', borderColor: 'border-[#fdba74]', textColor: 'text-[#c2410c]', tag: 'WARM TOUCH', ribbon: '#ea580c', windowBg: 'from-amber-50 via-orange-50/40 to-white' },
  { headerBg: 'bg-[#d9f99d]', borderColor: 'border-[#a3e635]', textColor: 'text-[#4d7c0f]', tag: 'PIZZA PLANET', ribbon: '#65a30d', windowBg: 'from-lime-50 via-green-50/40 to-white' }
];

// Visualizador único y adorable del muñeco dentro de la ventana de la caja
function renderProductFigure(producto) {
  const nombre = (producto.nombre || '').toLowerCase();
  const cat = (producto.categoria || '').toLowerCase();

  // Si tiene imagen propia específica de archivo
  if (nombre.includes('cerdito')) {
    return <img src="/images/cerdito_travieso.png" alt={producto.nombre} className="max-h-[105px] w-auto object-contain drop-shadow-md group-hover:scale-110 transition-transform duration-300" />;
  }
  if (nombre.includes('cowgirl') || nombre.includes('sheriff') && cat.includes('vibra')) {
    return <img src="/images/vibrador_cowgirl.png" alt={producto.nombre} className="max-h-[105px] w-auto object-contain drop-shadow-md group-hover:scale-110 transition-transform duration-300" />;
  }
  if (nombre.includes('lencería de andy') || nombre.includes('lenceria de andy')) {
    return <img src="/images/lenceria_andy.png" alt={producto.nombre} className="max-h-[105px] w-auto object-contain drop-shadow-md group-hover:scale-110 transition-transform duration-300" />;
  }
  if (nombre.includes('plug anal sheriff')) {
    return <img src="/images/plug_anal.png" alt={producto.nombre} className="max-h-[105px] w-auto object-contain drop-shadow-md group-hover:scale-110 transition-transform duration-300" />;
  }
  if (nombre.includes('caja misteriosa al') || nombre.includes('caja misteriosa woody')) {
    return <img src="/images/mystery_box.png" alt={producto.nombre} className="max-h-[105px] w-auto object-contain drop-shadow-md group-hover:scale-110 transition-transform duration-300" />;
  }

  // 1. VIBRADORES ESPECÍFICOS
  if (nombre.includes('rabbit') || nombre.includes('varita')) {
    return (
      <svg className="w-20 h-20 sm:w-24 sm:h-24 drop-shadow-md group-hover:scale-110 transition-transform duration-300" viewBox="0 0 100 100" fill="none">
        <path d="M42 92V38c0-8 8-14 16-14s16 6 16 14v54c0 4-4 8-8 8H50c-4 0-8-4-8-8z" fill="#f43f5e" stroke="#1e293b" strokeWidth="2.5" />
        {/* Orejitas de conejo rabbit */}
        <path d="M46 26C41 12 47 4 53 14c4 7 1 12 0 14" fill="#fda4af" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" />
        <path d="M66 26C71 12 65 4 59 14c-4 7-1 12 0 14" fill="#fda4af" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" />
        {/* Estimulador clitoriano lateral */}
        <path d="M36 58c-6-3-9-10-4-15 4-4 10-1 10 3" fill="#fda4af" stroke="#1e293b" strokeWidth="2" />
        <circle cx="58" cy="46" r="3" fill="#1e293b" />
        <circle cx="57" cy="45" r="0.8" fill="white" />
        <path d="M58 72h4m-2-2v4" stroke="white" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }

  if (nombre.includes('bala') || (cat.includes('vibra') && nombre.includes('minimalista'))) {
    return (
      <svg className="w-20 h-20 sm:w-24 sm:h-24 drop-shadow-md group-hover:scale-110 transition-transform duration-300" viewBox="0 0 100 100" fill="none">
        <path d="M38 88V35c0-12 12-18 24-18s24 6 24 18v53c0 4-4 7-8 7H46c-4 0-8-3-8-7z" fill="#facc15" stroke="#1e293b" strokeWidth="2.5" />
        <polygon points="62,45 64,50 69,51 65,54 66,59 62,56 58,59 59,54 55,51 60,50" fill="#e11d48" stroke="#1e293b" strokeWidth="1" />
        <circle cx="62" cy="74" r="5" fill="#ca8a04" stroke="#1e293b" strokeWidth="1.5" />
        <path d="M48 24c4-3 10-4 16-3" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    );
  }

  if (nombre.includes('succión') || nombre.includes('succion')) {
    return (
      <svg className="w-20 h-20 sm:w-24 sm:h-24 drop-shadow-md group-hover:scale-110 transition-transform duration-300" viewBox="0 0 100 100" fill="none">
        <path d="M34 85c-4-20 8-52 26-62 16-9 32 3 24 24-8 22-2 42-12 46-12 5-30 4-38-8z" fill="#fb7185" stroke="#1e293b" strokeWidth="2.5" />
        <ellipse cx="68" cy="38" rx="8" ry="12" fill="#881337" stroke="#1e293b" strokeWidth="2" />
        <circle cx="68" cy="38" r="4" fill="#fda4af" />
        <circle cx="48" cy="65" r="4" fill="white" stroke="#1e293b" strokeWidth="1.5" />
      </svg>
    );
  }

  // 2. LENCERÍAS ESPECÍFICAS
  if (cat.includes('lence') || nombre.includes('baby doll') || nombre.includes('arnés') || nombre.includes('body')) {
    return (
      <svg className="w-20 h-20 sm:w-24 sm:h-24 drop-shadow-md group-hover:scale-110 transition-transform duration-300" viewBox="0 0 100 100" fill="none">
        <path d="M28 26c8 4 16-2 22 2 6-4 14 2 22-2 0 14-6 22-12 26l-10 6-10-6c-6-4-12-12-12-26z" fill="#d8b4fe" stroke="#1e293b" strokeWidth="2.5" />
        <path d="M28 26l8-14M72 26l-8-14" stroke="#7e22ce" strokeWidth="2.5" strokeLinecap="round" />
        {/* Encaje inferior */}
        <path d="M34 65h32l-6 24H40l-6-24z" fill="#fbcfe8" stroke="#1e293b" strokeWidth="2.5" />
        <circle cx="50" cy="72" r="2.5" fill="#db2777" />
        <path d="M39 70c6 2 16 2 22 0" stroke="#db2777" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    );
  }

  // 3. ANALES & PLUGS
  if (cat.includes('anal') || nombre.includes('plug') || nombre.includes('gema')) {
    return (
      <svg className="w-20 h-20 sm:w-24 sm:h-24 drop-shadow-md group-hover:scale-110 transition-transform duration-300" viewBox="0 0 100 100" fill="none">
        <path d="M50 15c-11 0-18 12-18 24 0 14 14 30 14 30h8s14-16 14-30c0-12-7-24-18-24z" fill="#93c5fd" stroke="#1e293b" strokeWidth="2.5" />
        <path d="M43 20c-4 5-6 12-6 18" stroke="white" strokeWidth="2.5" strokeLinecap="round" opacity="0.8" />
        <rect x="46" y="69" width="8" height="9" rx="1.5" fill="#60a5fa" stroke="#1e293b" strokeWidth="2.5" />
        <ellipse cx="50" cy="82" rx="20" ry="6" fill="#3b82f6" stroke="#1e293b" strokeWidth="2.5" />
        {/* Gema rubí brillante */}
        <polygon points="50,78 55,82 50,86 45,82" fill="#ef4444" stroke="#1e293b" strokeWidth="1.5" />
      </svg>
    );
  }

  // 4. DILDOS
  if (cat.includes('dildo') || nombre.includes('dildo') || cat.includes('pene')) {
    return (
      <svg className="w-20 h-20 sm:w-24 sm:h-24 drop-shadow-md group-hover:scale-110 transition-transform duration-300" viewBox="0 0 100 100" fill="none">
        <path d="M42 90V30c0-9 8-16 18-16s18 7 18 16v60c0 4-4 6-8 6H50c-4 0-8-2-8-6z" fill="#fed7aa" stroke="#1e293b" strokeWidth="2.5" />
        <path d="M50 18c3-3 7-4 10-4" stroke="white" strokeWidth="2" strokeLinecap="round" />
        <ellipse cx="60" cy="88" rx="24" ry="7" fill="#fb923c" stroke="#1e293b" strokeWidth="2.5" />
        <path d="M42 45c4 2 12 2 16 0" stroke="#ea580c" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    );
  }

  // 5. COSMÉTICA & LUBRICANTES
  if (cat.includes('cosme') || nombre.includes('lubricante') || nombre.includes('aceite') || nombre.includes('gel')) {
    return (
      <svg className="w-20 h-20 sm:w-24 sm:h-24 drop-shadow-md group-hover:scale-110 transition-transform duration-300" viewBox="0 0 100 100" fill="none">
        <rect x="34" y="38" width="32" height="48" rx="8" fill="#fbcfe8" stroke="#1e293b" strokeWidth="2.5" />
        <rect x="42" y="24" width="16" height="14" rx="2" fill="#f472b6" stroke="#1e293b" strokeWidth="2.5" />
        <circle cx="50" cy="20" r="4" fill="#db2777" stroke="#1e293b" strokeWidth="2" />
        <rect x="40" y="52" width="20" height="20" rx="4" fill="white" stroke="#1e293b" strokeWidth="1.5" />
        <path d="M50 65l-3-3c-1.5-1.5-1.5-4 0-5.5 1.5-1.5 4-1.5 5.5 0 1.5-1.5 4-1.5 5.5 0 1.5 1.5 1.5 4 0 5.5l-8 3z" fill="#f43f5e" />
      </svg>
    );
  }

  // 6. ACCESORIOS & BDSM
  if (cat.includes('accesor') || nombre.includes('esposas') || nombre.includes('antifaz') || nombre.includes('plumero')) {
    return (
      <svg className="w-20 h-20 sm:w-24 sm:h-24 drop-shadow-md group-hover:scale-110 transition-transform duration-300" viewBox="0 0 100 100" fill="none">
        {/* Esposas forradas en felpa suave */}
        <circle cx="34" cy="48" r="14" fill="#fbcfe8" stroke="#1e293b" strokeWidth="2.5" />
        <circle cx="34" cy="48" r="7" fill="white" stroke="#1e293b" strokeWidth="2" />
        <circle cx="66" cy="48" r="14" fill="#fbcfe8" stroke="#1e293b" strokeWidth="2.5" />
        <circle cx="66" cy="48" r="7" fill="white" stroke="#1e293b" strokeWidth="2" />
        <path d="M48 48h4" stroke="#ca8a04" strokeWidth="4.5" strokeLinecap="round" />
      </svg>
    );
  }

  // 7. KITS Y CAJAS SORPRESA
  return (
    <svg className="w-20 h-20 sm:w-24 sm:h-24 drop-shadow-md group-hover:scale-110 transition-transform duration-300" viewBox="0 0 100 100" fill="none">
      <rect x="25" y="38" width="50" height="46" rx="6" fill="#fef08a" stroke="#1e293b" strokeWidth="2.5" />
      <path d="M22 38h56v-9H22v9z" fill="#facc15" stroke="#1e293b" strokeWidth="2.5" />
      <path d="M50 29v55M25 58h50" stroke="#ca8a04" strokeWidth="3" />
      <ellipse cx="44" cy="23" rx="6" ry="4" fill="#ef4444" stroke="#1e293b" strokeWidth="2" />
      <ellipse cx="56" cy="23" rx="6" ry="4" fill="#ef4444" stroke="#1e293b" strokeWidth="2" />
    </svg>
  );
}

export default function ToyBoxCard({ producto, index = 0, onClick }) {
  // Cada caja tiene un tema de color diferente asegurado por la paleta de 15 colores
  const theme = PALETA_CAJAS[index % PALETA_CAJAS.length];
  const seriesNum = String(index + 1).padStart(3, '0');

  return (
    <div
      onClick={onClick}
      className="w-full max-w-[195px] sm:max-w-[210px] group cursor-pointer flex flex-col items-center transition-all duration-300 hover:-translate-y-3 hover:scale-105 active:scale-95"
    >
      {/* 1. SOMBRERITO / PESTAÑA COLGANTE TIPO BLÍSTER DE JUGUETE */}
      <div className={`w-[88%] h-7 sm:h-8 ${theme.headerBg} border-3 ${theme.borderColor} border-b-0 rounded-t-xl relative flex items-center justify-center shadow-xs transition-colors`}>
        {/* Ranura ovalada para colgar del estante */}
        <div className="w-7 h-2.5 bg-white/90 rounded-full border border-slate-300 shadow-inner flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-slate-200"></div>
        </div>

        {/* Lazo decorativo SVG */}
        <div className="absolute right-2 top-1 text-xs opacity-80">
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill={theme.ribbon}>
            <path d="M12 12c-2-3-6-4-8-2s-1 6 2 7l6-5zm0 0c2-3 6-4 8-2s1 6-2 7l-6-5zm0 0v6" />
          </svg>
        </div>
      </div>

      {/* 2. CUERPO DE LA CAJA (DE FRENTE - TIPO FUNKO POP / BLIND BOX) */}
      <div className={`w-full bg-white rounded-2xl border-4 ${theme.borderColor} shadow-[0_12px_24px_rgba(0,0,0,0.12)] group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.25)] overflow-hidden flex flex-col justify-between transition-all duration-300 relative`}>
        
        {/* Cabecera superior interna */}
        <div className={`${theme.headerBg} px-2.5 py-1 flex items-center justify-between border-b-2 ${theme.borderColor}`}>
          <span className="text-[9px] font-black tracking-widest text-[#1e3a8a] uppercase">
            TOY STORE
          </span>
          <span className={`text-[8px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded-md bg-white/85 ${theme.textColor}`}>
            #{seriesNum}
          </span>
        </div>

        {/* 3. VENTANA TRANSPARENTE DEL BLÍSTER CON EL JUGUETE DENTRO */}
        <div className={`relative h-[135px] sm:h-[155px] bg-gradient-to-b ${theme.windowBg} flex items-center justify-center p-2.5 overflow-hidden`}>
          {/* Patrón halftone interior */}
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1.5px,transparent_1.5px)] [background-size:11px_11px] opacity-40 pointer-events-none"></div>

          {/* Brillo diagonal animado al pasar el cursor */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/30 to-transparent pointer-events-none transform -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"></div>

          {/* Muñeco o juguete único en el centro */}
          <div className="relative z-10 flex items-center justify-center">
            {renderProductFigure(producto)}
          </div>

          {/* Sombra de suelo dentro de la caja */}
          <div className="absolute bottom-1.5 inset-x-6 h-2 bg-black/10 rounded-full blur-xs pointer-events-none"></div>
        </div>

        {/* 4. BASE INFERIOR CON NOMBRE Y PRECIO */}
        <div className="bg-slate-50 px-2 py-2 border-t-2 border-slate-100 flex flex-col justify-between">
          <h4
            className="text-[11px] sm:text-xs font-black text-[#1e3a8a] truncate text-center leading-tight tracking-tight uppercase"
            title={producto.nombre}
          >
            {producto.nombre}
          </h4>

          {/* Sticker de precio estrella en pesos colombianos */}
          <div className="mt-1 flex items-center justify-center">
            <span className="bg-[#fbbf24] text-[#1e3a8a] text-[10px] font-black px-2.5 py-0.5 rounded-full shadow-xs border border-amber-400">
              ${Number(producto.precio).toLocaleString('es-CO')}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
