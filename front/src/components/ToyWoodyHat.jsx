import React from 'react';

/**
 * ToyWoodyHat: Sombrero vaquero de Woody en alta definición.
 * Diseñado con textura de cuero, pliegues realistas, cinta trenzada y hebilla dorada.
 */
export default function ToyWoodyHat({ className = "w-24 sm:w-28 md:w-32 h-auto" }) {
  return (
    <div className={`relative pointer-events-none drop-shadow-[0_12px_18px_rgba(0,0,0,0.35)] -rotate-12 ${className}`}>
      <svg 
        viewBox="0 0 200 130" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full overflow-visible"
      >
        <defs>
          {/* Degradado de la copa del sombrero */}
          <linearGradient id="woodyCrownGrad" x1="100" y1="20" x2="100" y2="85" gradientUnits="userSpaceOnUse">
            <stop stopColor="#b45309" />
            <stop offset="0.5" stopColor="#92400e" />
            <stop offset="1" stopColor="#78350f" />
          </linearGradient>

          {/* Degradado del ala */}
          <linearGradient id="woodyBrimGrad" x1="100" y1="65" x2="100" y2="120" gradientUnits="userSpaceOnUse">
            <stop stopColor="#d97706" />
            <stop offset="0.4" stopColor="#b45309" />
            <stop offset="1" stopColor="#78350f" />
          </linearGradient>

          {/* Cinta de cuero oscura */}
          <linearGradient id="woodyBandGrad" x1="50" y1="75" x2="150" y2="75" gradientUnits="userSpaceOnUse">
            <stop stopColor="#451a03" />
            <stop offset="0.5" stopColor="#78350f" />
            <stop offset="1" stopColor="#451a03" />
          </linearGradient>

          {/* Brillo de hebilla dorada */}
          <linearGradient id="woodyGoldBuckle" x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="#fef08a" />
            <stop offset="0.5" stopColor="#eab308" />
            <stop offset="1" stopColor="#ca8a04" />
          </linearGradient>
        </defs>

        {/* 1. Sombra bajo la copa */}
        <ellipse cx="100" cy="85" rx="52" ry="12" fill="#451a03" opacity="0.4" />

        {/* 2. Ala trasera del sombrero (curvada hacia arriba) */}
        <path 
          d="M20 85 C15 70 45 60 100 60 C155 60 185 70 180 85 C175 75 145 66 100 66 C55 66 25 75 20 85 Z" 
          fill="#78350f" 
          stroke="#451a03" 
          strokeWidth="1.5"
        />

        {/* 3. Copa del sombrero (con hendidura superior icónica de vaquero) */}
        <path 
          d="M58 85 C55 50 62 25 80 22 C92 20 95 30 100 30 C105 30 108 20 120 22 C138 25 145 50 142 85 Z" 
          fill="url(#woodyCrownGrad)" 
          stroke="#5a2408" 
          strokeWidth="2.5"
        />

        {/* Pliegue de relieve central de la copa */}
        <path 
          d="M100 30 C100 45 99 65 99 75" 
          stroke="#451a03" 
          strokeWidth="2.5" 
          strokeLinecap="round" 
          opacity="0.6"
        />
        <path 
          d="M80 22 C88 28 94 30 100 30 C106 30 112 28 120 22" 
          stroke="#451a03" 
          strokeWidth="2" 
          strokeLinecap="round"
        />

        {/* 4. Cinta de cuero trenzada */}
        <path 
          d="M56 82 C70 78 130 78 144 82 L143 89 C128 85 72 85 57 89 Z" 
          fill="url(#woodyBandGrad)" 
          stroke="#270e02" 
          strokeWidth="1.5"
        />

        {/* Costuras trenzadas de la cinta */}
        <path 
          d="M62 82 L65 88 M75 81 L78 87 M88 80 L91 86 M101 80 L104 86 M114 81 L117 87 M127 82 L130 88 M137 83 L140 89" 
          stroke="#fef08a" 
          strokeWidth="1.2" 
          strokeLinecap="round" 
          opacity="0.8"
        />

        {/* Hebilla dorada central */}
        <rect x="94" y="80" width="12" height="8" rx="2" fill="url(#woodyGoldBuckle)" stroke="#854d0e" strokeWidth="1" />
        <rect x="97" y="82" width="6" height="4" rx="1" fill="#451a03" />

        {/* 5. Ala delantera ancha (con curva vaquera envolvente) */}
        <path 
          d="M10 90 C10 82 45 74 100 74 C155 74 190 82 190 90 C185 110 145 116 100 116 C55 116 15 110 10 90 Z" 
          fill="url(#woodyBrimGrad)" 
          stroke="#5a2408" 
          strokeWidth="3"
        />

        {/* Borde cosido exterior de cuero (stitching) */}
        <path 
          d="M16 89 C24 105 58 112 100 112 C142 112 176 105 184 89" 
          stroke="#fef08a" 
          strokeWidth="1.4" 
          strokeDasharray="4 3" 
          strokeLinecap="round" 
          opacity="0.75"
        />

        {/* Brillo suave en la curvatura del ala */}
        <path 
          d="M30 88 C50 82 100 81 145 84" 
          stroke="#fef3c7" 
          strokeWidth="2.5" 
          strokeLinecap="round" 
          opacity="0.35"
        />
      </svg>
    </div>
  );
}
