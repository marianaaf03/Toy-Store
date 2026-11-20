import React from 'react';

/**
 * WoodyFloorElements: Elementos de utilería temática del piso de Woody para la Tienda.
 * Incluye: Sombrero de vaquero, Cartel "SE BUSCA TOYITO", Estrella de Sheriff,
 * Herradura dorada y la Serpiente juguetona ("Hay una serpiente en mi bota").
 */
export default function WoodyFloorElements() {
  return (
    <div className="absolute top-0 left-0 w-full h-0 z-40 select-none pointer-events-none">
      <div className="max-w-7xl mx-auto relative w-full h-0">

        {/* 1. SOMBRERO DE VAQUERO DE WOODY (Lado izquierdo) */}
        <div 
          className="absolute -top-16 sm:-top-24 left-2 sm:left-10 w-28 sm:w-44 h-24 sm:h-36 -rotate-12 transition-transform hover:scale-105 pointer-events-auto cursor-pointer drop-shadow-[0_15px_20px_rgba(0,0,0,0.45)]"
          title="El sombrero de Woody"
        >
          <svg viewBox="0 0 160 120" className="w-full h-full overflow-visible">
            {/* Sombra proyectada */}
            <ellipse cx="80" cy="98" rx="65" ry="14" fill="rgba(0,0,0,0.3)" />
            {/* Ala ancha del sombrero con costuras */}
            <path
              d="M15 88 C 25 65, 135 65, 145 88 C 135 106, 25 106, 15 88 Z"
              fill="#8B4513"
              stroke="#5C2E0B"
              strokeWidth="4"
            />
            {/* Dobladillo curvado del ala */}
            <path
              d="M 22 86 Q 80 72 138 86"
              fill="none"
              stroke="#D2691E"
              strokeWidth="2.5"
              strokeDasharray="4 3"
            />
            {/* Copa del sombrero con hendidura vaquera */}
            <path
              d="M 52 75 C 50 35, 62 24, 74 32 C 80 35, 84 35, 90 32 C 102 24, 114 35, 112 75 Z"
              fill="#A0522D"
              stroke="#5C2E0B"
              strokeWidth="4"
            />
            {/* Cinta de cuero marrón oscura */}
            <path
              d="M 51 72 Q 82 78 113 72"
              fill="none"
              stroke="#3D1C06"
              strokeWidth="7"
              strokeLinecap="round"
            />
            {/* Hebilla dorada miniatura */}
            <rect x="77" y="68" width="10" height="9" rx="2" fill="#FBBF24" stroke="#78350F" strokeWidth="1.5" />
            <rect x="80" y="71" width="4" height="3" fill="#3D1C06" />
          </svg>
        </div>

        {/* 2. CARTEL DE SE BUSCA TOYITO (Parchment Wanted Poster - Centro Izquierda) */}
        <div 
          className="absolute -top-20 sm:-top-28 left-[24%] sm:left-[22%] w-24 sm:w-36 h-32 sm:h-44 rotate-6 transition-transform hover:scale-105 pointer-events-auto cursor-pointer drop-shadow-[0_12px_18px_rgba(0,0,0,0.35)]"
          title="Se Busca Toyito - Recompensa"
        >
          <div className="w-full h-full bg-[#fde68a] border-2 sm:border-3 border-[#92400e] rounded-sm p-1.5 sm:p-2.5 flex flex-col items-center justify-between text-[#78350f] font-black relative overflow-hidden shadow-inner">
            {/* Esquina doblada vintage */}
            <div className="absolute top-0 right-0 w-4 h-4 bg-[#d97706]/40 border-b border-l border-[#92400e]"></div>

            <div className="text-center w-full">
              <span className="text-[7px] sm:text-[9px] tracking-widest block uppercase text-[#b45309]">WANTED</span>
              <span className="text-[10px] sm:text-xs tracking-tight font-black block leading-none text-[#78350f]">SE BUSCA</span>
            </div>

            {/* Retrato de Toyito */}
            <div className="w-14 sm:w-20 h-14 sm:h-20 bg-amber-50 border-2 border-dashed border-[#b45309] rounded-lg flex items-center justify-center p-1 my-0.5">
              <img src="/images/logo_official.png" alt="Toyito Wanted" className="w-full h-full object-contain filter sepia" />
            </div>

            <div className="text-center w-full leading-none">
              <span className="text-[6px] sm:text-[8px] font-bold block text-red-700 uppercase">VIVO O MUERTO</span>
              <span className="text-[8px] sm:text-[10px] font-black block text-[#92400e] mt-0.5">RECOMPENSA: 10.000</span>
            </div>
          </div>
        </div>

        {/* 3. ESTRELLA DE SHERIFF DORADA (Centro) */}
        <div 
          className="absolute -top-10 sm:-top-16 left-[50%] -translate-x-1/2 w-14 sm:w-20 h-14 sm:h-20 rotate-12 transition-transform hover:rotate-45 hover:scale-110 pointer-events-auto cursor-pointer drop-shadow-[0_10px_15px_rgba(234,179,8,0.5)]"
          title="Estrella Oficial del Sheriff Woody"
        >
          <svg viewBox="0 0 100 100" className="w-full h-full">
            {/* Estrella de 5 puntas con bolas en los extremos */}
            <polygon
              points="50,5 63,35 95,38 71,60 78,92 50,75 22,92 29,60 5,38 37,35"
              fill="url(#goldGradientSheriff)"
              stroke="#B45309"
              strokeWidth="3"
            />
            {/* Bolitas doradas en las puntas */}
            <circle cx="50" cy="5" r="4" fill="#FDE047" stroke="#B45309" strokeWidth="1.5" />
            <circle cx="95" cy="38" r="4" fill="#FDE047" stroke="#B45309" strokeWidth="1.5" />
            <circle cx="78" cy="92" r="4" fill="#FDE047" stroke="#B45309" strokeWidth="1.5" />
            <circle cx="22" cy="92" r="4" fill="#FDE047" stroke="#B45309" strokeWidth="1.5" />
            <circle cx="5" cy="38" r="4" fill="#FDE047" stroke="#B45309" strokeWidth="1.5" />

            {/* Círculo central con texto */}
            <circle cx="50" cy="53" r="16" fill="#FEF08A" stroke="#B45309" strokeWidth="2" />
            <text x="50" y="57" textAnchor="middle" fontSize="9" fontWeight="900" fill="#78350F" letterSpacing="0.5">
              SHERIFF
            </text>

            <defs>
              <linearGradient id="goldGradientSheriff" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FEF08A" />
                <stop offset="50%" stopColor="#FBBF24" />
                <stop offset="100%" stopColor="#D97706" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* 4. HERRADURA DE LA SUERTE (Centro Derecha) */}
        <div 
          className="absolute -top-12 sm:-top-18 right-[24%] sm:right-[20%] w-14 sm:w-22 h-14 sm:h-22 -rotate-15 transition-transform hover:scale-110 pointer-events-auto cursor-pointer drop-shadow-[0_12px_18px_rgba(0,0,0,0.4)]"
          title="Herradura de la suerte de Tiro al Blanco"
        >
          <svg viewBox="0 0 100 100" className="w-full h-full">
            {/* Herradura en forma de U */}
            <path
              d="M 24 25 C 20 60, 25 85, 50 85 C 75 85, 80 60, 76 25 L 62 28 C 65 52, 60 70, 50 70 C 40 70, 35 52, 38 28 Z"
              fill="url(#goldGradientHerradura)"
              stroke="#78350F"
              strokeWidth="3"
            />
            {/* Agujeros de clavos */}
            <circle cx="28" cy="40" r="2.5" fill="#451A03" />
            <circle cx="29" cy="55" r="2.5" fill="#451A03" />
            <circle cx="33" cy="70" r="2.5" fill="#451A03" />
            <circle cx="72" cy="40" r="2.5" fill="#451A03" />
            <circle cx="71" cy="55" r="2.5" fill="#451A03" />
            <circle cx="67" cy="70" r="2.5" fill="#451A03" />

            <defs>
              <linearGradient id="goldGradientHerradura" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FDE68A" />
                <stop offset="50%" stopColor="#F59E0B" />
                <stop offset="100%" stopColor="#B45309" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* 5. SERPIENTE JUGUETONA ENROSCADA ("Hay una serpiente en mi bota") - Lado Derecho */}
        <div 
          className="absolute -top-16 sm:-top-24 right-2 sm:right-8 w-24 sm:w-36 h-24 sm:h-36 rotate-6 transition-transform hover:scale-110 pointer-events-auto cursor-pointer drop-shadow-[0_15px_22px_rgba(0,0,0,0.4)]"
          title="¡Hay una serpiente en mi bota!"
        >
          <svg viewBox="0 0 120 120" className="w-full h-full overflow-visible">
            {/* Sombra de la serpiente */}
            <ellipse cx="60" cy="100" rx="45" ry="12" fill="rgba(0,0,0,0.25)" />

            {/* Cuerpo enrollado */}
            <path
              d="M 25 95 C 20 80, 45 70, 65 72 C 85 74, 98 85, 92 95 C 85 104, 35 104, 25 95 Z"
              fill="#22C55E"
              stroke="#15803D"
              strokeWidth="3.5"
            />
            {/* Espiral central */}
            <path
              d="M 40 82 C 40 68, 65 62, 80 72 C 88 78, 80 88, 65 86 C 50 84, 48 76, 55 70"
              fill="none"
              stroke="#16A34A"
              strokeWidth="10"
              strokeLinecap="round"
            />
            {/* Patrón de manchas en la espalda */}
            <circle cx="45" cy="85" r="3" fill="#FACC15" />
            <circle cx="65" cy="78" r="3" fill="#FACC15" />
            <circle cx="85" cy="88" r="3" fill="#FACC15" />
            <circle cx="35" cy="94" r="2.5" fill="#FACC15" />

            {/* Cabeza de serpiente tierna */}
            <path
              d="M 72 58 C 72 45, 95 45, 98 58 C 100 70, 75 70, 72 58 Z"
              fill="#4ADE80"
              stroke="#15803D"
              strokeWidth="3"
            />
            {/* Ojos grandes y tiernos tipo Pixar */}
            <circle cx="82" cy="52" r="4.5" fill="white" stroke="#15803D" strokeWidth="1" />
            <circle cx="83" cy="52" r="2.5" fill="#1E293B" />
            <circle cx="84" cy="51" r="1" fill="white" />

            <circle cx="92" cy="53" r="4.5" fill="white" stroke="#15803D" strokeWidth="1" />
            <circle cx="93" cy="53" r="2.5" fill="#1E293B" />
            <circle cx="94" cy="52" r="1" fill="white" />

            {/* Lengüita bífida roja que sale */}
            <path
              d="M 98 62 L 108 64 M 108 64 L 112 61 M 108 64 L 112 67"
              stroke="#EF4444"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </div>

      </div>
    </div>
  );
}
