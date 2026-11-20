import React from 'react';
import { useNavigate } from 'react-router-dom';
import RoomWrapper from '../components/RoomWrapper';
import AndyCloudsWallpaper from '../components/AndyCloudsWallpaper';

export default function Guia() {
  const navigate = useNavigate();

  const huellas = [
    {
      id: 1,
      badge: 'HUELLA 01 • PRIMEROS PASOS',
      titulo: '¿Primera Vez? Cero Nervios & a Tu Ritmo',
      subtitulo: 'Aprende a conocer tu cuerpo con total libertad y curiosidad',
      puntos: [
        {
          titulo: 'Sin expectativas de rendimiento',
          desc: 'No hay prisa ni una forma obligatoria. Empieza a solas, con luz tenue y música que te relaje; el objetivo es conectar contigo misma y disfrutar el momento.'
        },
        {
          titulo: 'De menos a más',
          desc: 'Comienza explorando zonas externas y sensibles como el cuello, el abdomen o la parte interna de los muslos antes de acercarte a las áreas íntimas.'
        },
        {
          titulo: 'Control de intensidad gradual',
          desc: 'Usa siempre la velocidad más baja al inicio. Deja que tu piel se acostumbre a las nuevas sensaciones rítmicas sin saturarte.'
        }
      ],
      tip: 'Tip de amiga: Si sientes cosquillas intensas al principio, coloca una sábana de satén fina entre el juguete y tu piel.'
    },
    {
      id: 2,
      badge: 'HUELLA 02 • SALUD & CONFORT',
      titulo: 'La Regla Sagrada del Lubricante',
      subtitulo: 'El secreto para una experiencia 100% sedosa y sin molestias',
      puntos: [
        {
          titulo: 'Siempre a base de agua',
          desc: 'Los juguetes de silicona pura médica SOLO deben usarse con lubricantes a base de agua. Los aceites, cremas corporales o vaselinas dañan el material.'
        },
        {
          titulo: 'Silicona médica hipoalergénica',
          desc: 'Todos nuestros juguetes están hechos de silicona biocompatible no porosa, suave como piel de durazno y 100% libre de ftalatos o químicos nocivos.'
        },
        {
          titulo: 'La cantidad justa multiplica el placer',
          desc: 'Un par de gotas de lubricante reducen cualquier fricción a cero y transforman el contacto en una caricia ultrasuave y deslizante.'
        }
      ],
      tip: 'Tip de amiga: Aplica unas gotas tanto en tu piel como en el juguete para máxima comodidad y suavidad.'
    },
    {
      id: 3,
      badge: 'HUELLA 03 • TIPOS DE SENSACIÓN',
      titulo: '¿Ondas de Aire o Vibración Clásica?',
      subtitulo: 'Descubre qué tecnología se adapta mejor a tu sensibilidad',
      puntos: [
        {
          titulo: 'Ondas de presión sónicas (Ideal principiantes)',
          desc: 'Estimulan mediante pulsaciones envolventes de aire sin fricción mecánica directa, evitando adormecimientos o molestias por roce.'
        },
        {
          titulo: 'Vibración continua y profunda',
          desc: 'Brinda un masaje rítmico perfecto para relajación general, zonas erógenas amplias o estimulación interna del punto G.'
        },
        {
          titulo: 'Modelos duales (Rabbit)',
          desc: 'Combinan ambos estímulos a la vez para sensaciones completas y simultáneas una vez que ya conozcas tus gustos favoritos.'
        }
      ],
      tip: 'Tip de amiga: Si es tu primer juguete íntimo, un estimulador por ondas de aire suele ser la opción más amable y sorprendente.'
    },
    {
      id: 4,
      badge: 'HUELLA 04 • HIGIENE & DISCRECIÓN',
      titulo: 'Limpieza en 1 Minuto & Privacidad',
      subtitulo: 'Cuidados sencillos para que tu aliado íntimo dure muchos años',
      puntos: [
        {
          titulo: 'Lavado fácil en 60 segundos',
          desc: 'Lava con agua tibia y jabón neutro sin alcohol antes y después de cada uso. Enjuaga con abundante agua y sécalo con toalla limpia.'
        },
        {
          titulo: 'Resistentes al agua (Certificación IPX7)',
          desc: 'Puedes usarlos con total tranquilidad bajo la ducha o en la tina. Solo recuerda secar el puerto magnético antes de recargarlo.'
        },
        {
          titulo: 'Empaque 100% discreto',
          desc: 'Todos los pedidos se entregan en cajas lisas sin logotipos delatadores ni descripciones exteriores: tu privacidad está 100% protegida.'
        }
      ],
      tip: 'Tip de amiga: Guárdalo siempre en su saquito de tela transpirable en un lugar fresco y protegido del sol directo.'
    }
  ];

  return (
    <RoomWrapper 
      theme="lotso" 
      wallpaperContent={<AndyCloudsWallpaper />}
      hideFloorToys={true}
    >
      <style>{`
        @keyframes floatPaw {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-3px); }
        }
        .animate-paw-card {
          animation: floatPaw 5s ease-in-out infinite;
        }
      `}</style>

      {/* CONTENEDOR PRINCIPAL: Espaciado superior cómodo y limpio bajo las nubes */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 pt-3 sm:pt-4 pb-28 font-fredoka select-none flex flex-col items-center">
        
        {/* Píldora de bienvenida tierna y sutil para primerizas (sin carteles gigantes) */}
        <div className="flex items-center gap-2.5 mb-7 sm:mb-9 bg-white/95 backdrop-blur-md px-5 sm:px-6 py-2 rounded-full border-2 border-rose-300 shadow-sm">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse"></span>
          <p className="text-xs sm:text-sm font-black text-[#1e3a8a] uppercase tracking-wider">
            Guía de Confianza para Primerizas • Espacio Libre de Tabúes
          </p>
        </div>

        {/* =========================================================================
            LAS 4 SECCIONES EN FORMA DE HUELLA DE OSITO LOTSO: 2 ARRIBA Y 2 ABAJO
            ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-12 sm:gap-y-16 w-full max-w-5xl justify-items-center">
          {huellas.map((h, idx) => (
            <div 
              key={h.id}
              className="relative w-full max-w-[480px] group flex flex-col items-center transition-all duration-300 hover:-translate-y-1.5"
            >
              {/* DEDITOS DE LA HUELLA DEL OSITO LOTSO (4 almohadillas arqueadas en la parte superior) */}
              <div className="flex items-end justify-center gap-2 sm:gap-3.5 -mb-5 sm:-mb-6 relative z-20">
                {/* Dedo 1 (Izquierdo exterior) */}
                <div className="w-9 h-11 sm:w-11 sm:h-13 rounded-[50%] bg-gradient-to-b from-rose-200 via-pink-200 to-rose-300 border-[3.5px] border-[#e11d48] shadow-sm transform -rotate-18 flex items-center justify-center transition-transform group-hover:scale-110">
                  <div className="w-4 h-6 sm:w-5 sm:h-7 rounded-[50%] bg-white/80 border border-rose-300/60"></div>
                </div>
                {/* Dedo 2 (Central izquierdo más alto) */}
                <div className="w-11 h-13 sm:w-13 sm:h-16 rounded-[50%] bg-gradient-to-b from-rose-200 via-pink-200 to-rose-300 border-[3.5px] border-[#e11d48] shadow-sm transform -rotate-6 flex items-center justify-center -translate-y-2 transition-transform group-hover:scale-110">
                  <div className="w-5 h-8 sm:w-6 sm:h-9 rounded-[50%] bg-white/80 border border-rose-300/60"></div>
                </div>
                {/* Dedo 3 (Central derecho más alto) */}
                <div className="w-11 h-13 sm:w-13 sm:h-16 rounded-[50%] bg-gradient-to-b from-rose-200 via-pink-200 to-rose-300 border-[3.5px] border-[#e11d48] shadow-sm transform rotate-6 flex items-center justify-center -translate-y-2 transition-transform group-hover:scale-110">
                  <div className="w-5 h-8 sm:w-6 sm:h-9 rounded-[50%] bg-white/80 border border-rose-300/60"></div>
                </div>
                {/* Dedo 4 (Derecho exterior) */}
                <div className="w-9 h-11 sm:w-11 sm:h-13 rounded-[50%] bg-gradient-to-b from-rose-200 via-pink-200 to-rose-300 border-[3.5px] border-[#e11d48] shadow-sm transform rotate-18 flex items-center justify-center transition-transform group-hover:scale-110">
                  <div className="w-4 h-6 sm:w-5 sm:h-7 rounded-[50%] bg-white/80 border border-rose-300/60"></div>
                </div>
              </div>

              {/* ALMOHADILLA PRINCIPAL (CUERPO DE LA HUELLA) */}
              <div className="w-full bg-white/95 backdrop-blur-md rounded-[2.8rem] border-4 border-[#f472b6] shadow-[0_16px_36px_rgba(225,29,72,0.14)] p-6 sm:p-7 pt-9 sm:pt-10 relative z-10 flex flex-col justify-between transition-all duration-300 group-hover:shadow-[0_22px_45px_rgba(225,29,72,0.24)] group-hover:border-[#e11d48]">
                
                {/* Cabecera de la Huella */}
                <div className="border-b border-rose-100 pb-3.5 mb-4 text-center">
                  <span className="inline-block px-3 py-1 rounded-full bg-rose-50 text-rose-700 text-[10px] font-black uppercase tracking-wider border border-rose-200 mb-1.5">
                    {h.badge}
                  </span>
                  <h3 className="text-lg sm:text-xl font-black text-[#1e3a8a] uppercase leading-tight tracking-tight">
                    {h.titulo}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium mt-1">
                    {h.subtitulo}
                  </p>
                </div>

                {/* Lista de Puntos Clave Claros y Amigables */}
                <div className="flex flex-col gap-3 my-1">
                  {h.puntos.map((punto, pIdx) => (
                    <div key={pIdx} className="bg-rose-50/40 rounded-2xl p-3 sm:p-3.5 border border-rose-100/80 flex items-start gap-2.5">
                      <div className="w-5 h-5 rounded-full bg-[#f472b6]/20 text-rose-700 font-black text-[10px] flex items-center justify-center shrink-0 mt-0.5 border border-[#f472b6]/40">
                        0{pIdx + 1}
                      </div>
                      <div className="flex-1">
                        <h4 className="text-xs sm:text-[13px] font-black text-[#1e3a8a] leading-snug">
                          {punto.titulo}
                        </h4>
                        <p className="text-[11px] sm:text-xs text-slate-600 mt-0.5 leading-relaxed font-medium">
                          {punto.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Tip de Confianza al Pie de la Huella */}
                <div className="mt-4 pt-3 border-t border-rose-100">
                  <div className="bg-gradient-to-r from-rose-100/70 to-pink-100/70 rounded-2xl p-2.5 px-3.5 border border-rose-200/80 flex items-center gap-2">
                    <svg className="w-4 h-4 text-rose-600 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-[11px] font-bold text-rose-800 leading-tight">
                      {h.tip}
                    </p>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* =========================================================================
            BOTÓN INFERIOR: EXPLORAR LA TIENDA DE JUGUETES
            ========================================================================= */}
        <div className="mt-12 sm:mt-14 flex flex-col items-center gap-3">
          <p className="text-xs sm:text-sm font-bold text-[#1e3a8a] bg-white/90 px-4 py-1.5 rounded-full border border-rose-200 shadow-xs">
            ¿Lista para poner en práctica lo aprendido con total libertad y discreción?
          </p>
          <button
            onClick={() => navigate('/tienda')}
            className="px-8 py-3.5 bg-[#a6d4f2] hover:bg-[#8ac6ee] text-[#1e3a8a] font-black rounded-2xl text-xs sm:text-sm uppercase tracking-wider transition-all shadow-md active:scale-95 border-2 border-white cursor-pointer flex items-center gap-2.5"
          >
            <span>Explorar Juguetes en la Tienda</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>

      </div>
    </RoomWrapper>
  );
}
