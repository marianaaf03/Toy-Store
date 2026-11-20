import React from 'react';
import RoomWrapper from '../components/RoomWrapper';
import AndyCloudsWallpaper from '../components/AndyCloudsWallpaper';

export default function Guia() {
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
      tip: 'Tip de amiga: Si sientes cosquillas intensas al principio, coloca una prenda de satén fina entre el dispositivo y tu piel.'
    },
    {
      id: 2,
      badge: 'HUELLA 02 • SALUD & CONFORT',
      titulo: 'La Regla Sagrada del Lubricante',
      subtitulo: 'El secreto para una experiencia 100% sedosa y sin molestias',
      puntos: [
        {
          titulo: 'Siempre a base de agua',
          desc: 'Los artículos de silicona pura médica SOLO deben usarse con lubricantes a base de agua. Los aceites, cremas corporales o vaselinas dañan el material.'
        },
        {
          titulo: 'Silicona médica biocompatible',
          desc: 'Nuestros artículos están fabricados con silicona hipoalergénica no porosa, ultra suave al tacto y 100% libre de ftalatos o componentes nocivos.'
        },
        {
          titulo: 'La cantidad justa multiplica el bienestar',
          desc: 'Un par de gotas de lubricante reducen cualquier fricción a cero y transforman el contacto en una caricia ultrasuave y deslizante.'
        }
      ],
      tip: 'Tip de amiga: Aplica unas gotas tanto en tu piel como en el producto para máxima comodidad y suavidad.'
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
          desc: 'Brinda un masaje rítmico perfecto para relajación general, zonas de tensión corporal o estimulación sensorial localizada.'
        },
        {
          titulo: 'Modelos duales sincronizados',
          desc: 'Combinan ambos estímulos a la vez para sensaciones completas y simultáneas una vez que ya conozcas tus gustos favoritos.'
        }
      ],
      tip: 'Tip de amiga: Para una primera experiencia, un estimulador por ondas de aire suele ser la opción más amable y sorprendente.'
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

      {/* CONTENEDOR PRINCIPAL: Espaciado superior limpio y cómodo bajo las nubes */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-8 pt-10 sm:pt-14 md:pt-16 pb-24 font-fredoka select-none flex flex-col items-center">
        
        {/* =========================================================================
            LAS 4 SECCIONES EN FORMA DE HUELLA DE OSITO LOTSO (2 ARRIBA Y 2 ABAJO)
            Con espacio amplio para que respire y Lotso abrazador en la primera huella
            ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 sm:gap-x-16 md:gap-x-24 gap-y-16 sm:gap-y-20 w-full justify-items-center">
          {huellas.map((h, idx) => {
            const esPrimeraHuella = h.id === 1;

            return (
              <div 
                key={h.id}
                className="relative w-full max-w-[560px] sm:max-w-[590px] group flex flex-col items-center transition-all duration-300 hover:-translate-y-1.5"
              >
                {/* LOTSO ABRAZADOR PARADO AL FINAL DEL RECUADRO Y ABRAZANDO EL BORDE */}
                {esPrimeraHuella && (
                  <div className="absolute -bottom-2 sm:-bottom-3 md:-bottom-4 -right-10 sm:-right-14 md:-right-18 lg:-right-20 z-30 pointer-events-none select-none transition-transform group-hover:scale-105 duration-300">
                    <img 
                      src="/images/lotso_abrazador.png" 
                      alt="Lotso Abrazador"
                      className="w-20 sm:w-24 md:w-28 lg:w-32 h-auto object-contain drop-shadow-2xl" 
                    />
                  </div>
                )}

                {/* DEDITOS DE LA HUELLA DEL OSITO LOTSO DE PELUCHE (4 almohadillas detalladas y arqueadas) */}
                <div className="flex items-end justify-center gap-2.5 sm:gap-4 -mb-5 sm:-mb-6 relative z-20">
                  
                  {/* Dedo 1 (Izquierdo exterior) */}
                  <div className="flex flex-col items-center transform -rotate-[20deg] -translate-x-1 transition-transform group-hover:scale-110">
                    <div className="w-2.5 h-3 bg-rose-100 rounded-t-full border border-rose-300 shadow-xs -mb-1 relative z-30"></div>
                    <div className="w-10 h-13 sm:w-12 sm:h-15 rounded-[50%] bg-gradient-to-b from-[#f472b6] via-[#db2777] to-[#9d174d] border-[3.5px] border-[#831843] shadow-[0_6px_12px_rgba(0,0,0,0.22)] flex items-center justify-center p-1 relative z-20">
                      <div className="w-5 h-7 sm:w-6 sm:h-9 rounded-[50%] bg-gradient-to-b from-white/95 to-rose-200/90 border border-rose-300/80 shadow-inner"></div>
                    </div>
                  </div>

                  {/* Dedo 2 (Central izquierdo más alto) */}
                  <div className="flex flex-col items-center transform -rotate-[7deg] -translate-y-2.5 transition-transform group-hover:scale-110">
                    <div className="w-2.5 h-3.5 bg-rose-100 rounded-t-full border border-rose-300 shadow-xs -mb-1 relative z-30"></div>
                    <div className="w-12 h-15 sm:w-14 sm:h-18 rounded-[50%] bg-gradient-to-b from-[#f472b6] via-[#db2777] to-[#9d174d] border-[3.5px] border-[#831843] shadow-[0_6px_14px_rgba(0,0,0,0.24)] flex items-center justify-center p-1.5 relative z-20">
                      <div className="w-6 h-8 sm:w-7 sm:h-10 rounded-[50%] bg-gradient-to-b from-white/95 to-rose-200/90 border border-rose-300/80 shadow-inner"></div>
                    </div>
                  </div>

                  {/* Dedo 3 (Central derecho más alto) */}
                  <div className="flex flex-col items-center transform rotate-[7deg] -translate-y-2.5 transition-transform group-hover:scale-110">
                    <div className="w-2.5 h-3.5 bg-rose-100 rounded-t-full border border-rose-300 shadow-xs -mb-1 relative z-30"></div>
                    <div className="w-12 h-15 sm:w-14 sm:h-18 rounded-[50%] bg-gradient-to-b from-[#f472b6] via-[#db2777] to-[#9d174d] border-[3.5px] border-[#831843] shadow-[0_6px_14px_rgba(0,0,0,0.24)] flex items-center justify-center p-1.5 relative z-20">
                      <div className="w-6 h-8 sm:w-7 sm:h-10 rounded-[50%] bg-gradient-to-b from-white/95 to-rose-200/90 border border-rose-300/80 shadow-inner"></div>
                    </div>
                  </div>

                  {/* Dedo 4 (Derecho exterior) */}
                  <div className="flex flex-col items-center transform rotate-[20deg] translate-x-1 transition-transform group-hover:scale-110">
                    <div className="w-2.5 h-3 bg-rose-100 rounded-t-full border border-rose-300 shadow-xs -mb-1 relative z-30"></div>
                    <div className="w-10 h-13 sm:w-12 sm:h-15 rounded-[50%] bg-gradient-to-b from-[#f472b6] via-[#db2777] to-[#9d174d] border-[3.5px] border-[#831843] shadow-[0_6px_12px_rgba(0,0,0,0.22)] flex items-center justify-center p-1 relative z-20">
                      <div className="w-5 h-7 sm:w-6 sm:h-9 rounded-[50%] bg-gradient-to-b from-white/95 to-rose-200/90 border border-rose-300/80 shadow-inner"></div>
                    </div>
                  </div>

                </div>

                {/* ALMOHADILLA PRINCIPAL (CUERPO ANCHO DE LA HUELLA CON MARGEN GRUESO TIPO PELAJE) */}
                <div className="w-full bg-white/95 backdrop-blur-md rounded-[3.2rem] border-8 border-[#db2777] shadow-[0_20px_45px_rgba(225,29,72,0.18)] p-7 sm:p-9 pt-10 sm:pt-12 relative z-10 flex flex-col justify-between transition-all duration-300 group-hover:shadow-[0_26px_55px_rgba(225,29,72,0.28)] group-hover:border-[#be185d]">
                  
                  {/* Cabecera de la Huella */}
                  <div className="border-b border-rose-100 pb-4 mb-4 text-center">
                    <span className="inline-block px-3.5 py-1 rounded-full bg-rose-50 text-rose-700 text-[10px] sm:text-[11px] font-black uppercase tracking-wider border border-rose-200 mb-2">
                      {h.badge}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black text-[#1e3a8a] uppercase leading-tight tracking-tight">
                      {h.titulo}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
                      {h.subtitulo}
                    </p>
                  </div>

                  {/* Lista de Puntos Clave Claros y Amigables */}
                  <div className="flex flex-col gap-3.5 my-1">
                    {h.puntos.map((punto, pIdx) => (
                      <div key={pIdx} className="bg-rose-50/50 rounded-2xl p-3.5 sm:p-4 border border-rose-100 flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-[#f472b6]/20 text-rose-700 font-black text-xs flex items-center justify-center shrink-0 mt-0.5 border border-[#f472b6]/40 shadow-xs">
                          0{pIdx + 1}
                        </div>
                        <div className="flex-1">
                          <h4 className="text-sm sm:text-[15px] font-black text-[#1e3a8a] leading-snug">
                            {punto.titulo}
                          </h4>
                          <p className="text-xs sm:text-[13px] text-slate-600 mt-1 leading-relaxed font-medium">
                            {punto.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Tip de Confianza al Pie de la Huella */}
                  <div className="mt-5 pt-3.5 border-t border-rose-100">
                    <div className="bg-gradient-to-r from-rose-100/80 to-pink-100/80 rounded-2xl p-3 px-4 border border-rose-200 flex items-center gap-2.5">
                      <svg className="w-4 h-4 text-rose-600 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <p className="text-xs font-bold text-rose-800 leading-snug">
                        {h.tip}
                      </p>
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

      </div>
    </RoomWrapper>
  );
}
