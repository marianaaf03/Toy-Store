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
                {/* LOTSO ABRAZADOR PARADO ALINEADO AL FINAL DEL RECUADRO Y ABRAZANDO EL MARGEN */}
                {esPrimeraHuella && (
                  <div className="absolute bottom-8 sm:bottom-10 md:bottom-12 left-full -ml-7 sm:-ml-8 md:-ml-9 z-30 pointer-events-none select-none transition-transform group-hover:scale-105 duration-300">
                    <img 
                      src="/images/lotso_abrazador.png" 
                      alt="Lotso Abrazador"
                      className="w-32 sm:w-38 md:w-44 lg:w-48 h-auto object-contain drop-shadow-2xl" 
                    />
                  </div>
                )}

                {/* HUELLITAS DE LOTSO ESTILO CRAYOLA (GRANDES Y DESTACADAS CORONANDO CADA HUELLA) */}
                <div className="flex justify-center -mb-9 sm:-mb-12 md:-mb-14 relative z-20 pointer-events-none">
                  <img 
                    src="/images/lotso_huellas.png" 
                    alt="Huellitas Lotso"
                    className="w-56 sm:w-68 md:w-80 lg:w-88 max-w-[88%] h-auto object-contain drop-shadow-md transition-transform group-hover:scale-105" 
                  />
                </div>

                {/* ALMOHADILLA PRINCIPAL (CUERPO ANCHO DE LA HUELLA CON MARGEN EXTRA GRUESO TIPO PELAJE) */}
                <div className="w-full bg-white/95 backdrop-blur-md rounded-[3.2rem] border-[12px] sm:border-[14px] border-[#db2777] shadow-[0_24px_50px_rgba(225,29,72,0.2)] ring-4 ring-[#be185d]/20 p-7 sm:p-9 pt-10 sm:pt-12 relative z-10 flex flex-col justify-between transition-all duration-300 group-hover:shadow-[0_28px_60px_rgba(225,29,72,0.3)] group-hover:border-[#be185d]">
                  
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
