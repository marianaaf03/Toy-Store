import React from 'react';

/**
 * WoodyFloorElements: Elementos vaqueros auténticos de Woody
 * para el suelo de la tienda: Serpiente, Cartel "Se Busca Toyito",
 * Estrellas de Sheriff y Herraduras.
 */
export default function WoodyFloorElements() {
  return (
    <div className="absolute top-0 left-0 w-full h-0 z-40 pointer-events-none select-none">
      <div className="max-w-7xl mx-auto relative w-full h-0">
        
        {/* 1. CARTEL DE "SE BUSCA: TOYITO" (Lado Izquierdo en el suelo) */}
        <div className="absolute left-6 md:left-20 top-8 md:top-14 transform -rotate-6 transition-transform hover:rotate-0 hover:scale-110 pointer-events-auto cursor-pointer drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]">
          <div className="w-28 sm:w-36 bg-[#fef3c7] border-2 border-[#b45309] rounded-lg p-2.5 shadow-inner text-center font-fredoka">
            <span className="text-[10px] sm:text-xs font-black text-[#78350f] tracking-widest uppercase block border-b border-[#b45309]/30 pb-0.5">
              SE BUSCA
            </span>
            <div className="my-1 w-14 h-14 sm:w-16 sm:h-16 mx-auto bg-[#fde68a] rounded-full border border-[#d97706] flex items-center justify-center overflow-hidden">
              <img 
                src="/images/Mascota Toy Store Sonriente.png" 
                alt="Toyito" 
                className="w-12 h-12 object-contain"
                onError={(e) => { e.target.style.display = 'none'; }}
              />
            </div>
            <span className="text-[9px] sm:text-[10px] font-black text-[#92400e] block">
              TOYITO EL VAQUERO
            </span>
            <span className="text-[8px] sm:text-[9px] font-bold text-rose-700 block mt-0.5">
              RECOMPENSA: AMOR
            </span>
          </div>
        </div>

        {/* 2. ESTRELLA DE SHERIFF DORADA (Cerca del cartel) */}
        <div className="absolute left-36 md:left-64 top-24 md:top-36 transform rotate-12 drop-shadow-md pointer-events-auto">
          <svg className="w-9 h-9 sm:w-12 sm:h-12 text-[#facc15] hover:scale-125 transition-transform cursor-pointer" viewBox="0 0 24 24" fill="currentColor" stroke="#b45309" strokeWidth="1.2">
            <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
            <circle cx="12" cy="12" r="3" fill="#fef08a" stroke="#b45309" strokeWidth="1" />
          </svg>
        </div>

        {/* 3. LA SERPIENTE DE LA BOTA (Lado Derecho en el suelo) */}
        <div className="absolute right-10 md:right-28 top-6 md:top-12 transform rotate-3 drop-shadow-[0_8px_16px_rgba(0,0,0,0.45)] pointer-events-auto">
          <div className="group cursor-pointer hover:scale-110 transition-transform">
            <svg className="w-28 sm:w-36 h-20 sm:h-24" viewBox="0 0 140 90" fill="none">
              {/* Cuerpo serpenteante verde lima */}
              <path 
                d="M10 70 C 25 50, 40 85, 60 65 C 80 45, 95 80, 115 50 C 122 40, 130 35, 135 25" 
                stroke="#22c55e" 
                strokeWidth="14" 
                strokeLinecap="round" 
              />
              {/* Manchas en la espalda */}
              <path 
                d="M10 70 C 25 50, 40 85, 60 65 C 80 45, 95 80, 115 50 C 122 40, 130 35, 135 25" 
                stroke="#15803d" 
                strokeWidth="4" 
                strokeDasharray="4 10" 
                strokeLinecap="round" 
              />
              {/* Cabeza redonda simpática */}
              <circle cx="134" cy="24" r="10" fill="#22c55e" stroke="#15803d" strokeWidth="1.5" />
              {/* Ojitos tiernos */}
              <circle cx="131" cy="21" r="2.5" fill="white" />
              <circle cx="131" cy="21" r="1.2" fill="#1e293b" />
              <circle cx="137" cy="21" r="2.5" fill="white" />
              <circle cx="137" cy="21" r="1.2" fill="#1e293b" />
              {/* Lengüita bífida roja */}
              <path d="M143 24l7-3m-7 3l7 3" stroke="#ef4444" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
            <span className="text-[9px] font-black text-amber-200 block text-right -mt-2 pr-2 opacity-0 group-hover:opacity-100 transition-opacity">
              ¡Hay una serpiente en mi bota!
            </span>
          </div>
        </div>

        {/* 4. HERRADURA DE CABALLO PLATEADA (En el centro derecho) */}
        <div className="absolute right-40 md:right-72 top-20 md:top-32 transform -rotate-12 drop-shadow-md pointer-events-auto">
          <svg className="w-8 h-8 sm:w-11 sm:h-11 text-slate-300 hover:rotate-45 transition-transform cursor-pointer" viewBox="0 0 24 24" fill="none" stroke="#475569" strokeWidth="2.8" strokeLinecap="round">
            <path d="M6 3v8a6 6 0 0 0 12 0V3" />
            <circle cx="7" cy="11" r="0.8" fill="#1e293b" />
            <circle cx="17" cy="11" r="0.8" fill="#1e293b" />
            <circle cx="9" cy="14" r="0.8" fill="#1e293b" />
            <circle cx="15" cy="14" r="0.8" fill="#1e293b" />
          </svg>
        </div>

      </div>
    </div>
  );
}
