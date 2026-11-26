import React from 'react';
import RoomWrapper from '../components/RoomWrapper';
import AndyCloudsWallpaper from '../components/AndyCloudsWallpaper';

export default function Guia() {
  const huellas = [
    {
      id: 1,
      badge: 'HUELLA 01 • PRIMEROS PASOS',
      titulo: 'Para Hombres & Mujeres: Cero Tabúes & a Tu Propio Ritmo',
      subtitulo: 'Aprende a conectar con tu propio cuerpo con total libertad, curiosidad y bienestar',
      categoria: 'general',
      puntos: [
        {
          titulo: 'Sin expectativas de rendimiento ni prisas',
          desc: 'Para hombres y mujeres, la exploración íntima no es una competencia. Deshazte de la presión del clímax rápido o estereotipos: empieza a solas en un ambiente relajado y con luz tenue para descubrir qué sensaciones te generan placer genuino.'
        },
        {
          titulo: 'Exploración progresiva de zonas erógenas',
          desc: 'Tanto en cuerpos masculinos como femeninos, el placer va mucho más allá de la zona genital. Recorre con caricias previas el cuello, el pecho, la espalda baja, el abdomen y los muslos para despertar las terminaciones nerviosas con suavidad.'
        },
        {
          titulo: 'Control de intensidad gradual',
          desc: 'Ya sea un masturbador masculino, un estimulador sónico o una varita masajeadora, inicia siempre en la velocidad o succión más baja. Deja que tu piel se acostumbre al estímulo rítmico antes de subir la potencia.'
        }
      ],
      tip: 'Consejo Toy Store: La autoexploración no tiene género. Conocer tu propia respuesta sensorial mejora la autoestima, reduce el estrés diario y potencia la complicidad en pareja.'
    },
    {
      id: 2,
      badge: 'HUELLA 02 • SALUD & CONFORT',
      titulo: 'La Regla Sagrada del Lubricante para Toda Anatomía',
      subtitulo: 'El secreto indispensable para una experiencia 100% sedosa, suave y sin molestias',
      categoria: 'salud',
      puntos: [
        {
          titulo: 'Siempre a base de agua',
          desc: 'Tanto para artículos de silicona femenina como masculina (masturbadores, anillos vibradores, sondas prostáticas o estimuladores), usa exclusivamente lubricante a base de agua. Los aceites corporales y vaselinas degradan la silicona médica.'
        },
        {
          titulo: 'Silicona médica biocompatible y segura',
          desc: 'Nuestros artículos están fabricados con silicona hipoalergénica de grado quirúrgico, sin porosidades, no tóxica y 100% libre de ftalatos. Es tan amigable con la piel que se adapta a cualquier anatomía sensible.'
        },
        {
          titulo: 'Generosidad en la aplicación',
          desc: 'En masturbación masculina con fundas texturizadas o en juegos íntimos femeninos y de pareja, unas gotas adicionales de lubricante eliminan cualquier fricción incómoda y multiplican la sensibilidad táctil.'
        }
      ],
      tip: 'Consejo Toy Store: Aplica lubricante tanto directamente en la piel como en el interior o superficie del juguete para un deslizamiento sedoso y perfecto.'
    },
    {
      id: 3,
      badge: 'HUELLA 03 • GUÍA POR TECNOLOGÍA & GÉNERO',
      titulo: 'Encuentra Tu Estímulo Ideal: Hombres, Mujeres & Parejas',
      subtitulo: 'Diferentes tecnologías diseñadas específicamente para cada anatomía y fantasía',
      categoria: 'estimulo',
      puntos: [
        {
          titulo: 'Para Mujeres: Ondas de aire sónicas y punto G',
          desc: 'Las ondas de presión pulsan aire envolvente sin fricción directa, evitando saturación en el clítoris. Los modelos con curvatura anatómica ofrecen estimulación profunda en el punto G con vibraciones continuas.'
        },
        {
          titulo: 'Para Hombres: Masturbadores, anillos y placer prostático',
          desc: 'Las fundas y masturbadores ergonómicos simulan texturas ultra realistas. Los anillos vibradores aumentan la firmeza y brindan estimulación dual en pareja, mientras que las sondas anatómicas desbloquean el placer prostático y perineal.'
        },
        {
          titulo: 'Para Parejas & Juegos Compartidos',
          desc: 'Dispositivos con control inalámbrico a distancia de largo alcance, dados de retos sensuales, lencería sedosa para ambos y aceites térmicos comestibles para masajes corporales inolvidables.'
        }
      ],
      tip: 'Consejo Toy Store: No existen límites ni normas predefinidas. Experimenta con diferentes intensidades y ritmos hasta descubrir tu combinación favorita.'
    },
    {
      id: 4,
      badge: 'HUELLA 04 • HIGIENE & DISCRECIÓN',
      titulo: 'Limpieza en 60 Segundos & Empaque 100% Discreto',
      subtitulo: 'Cuidados rápidos para que tus artículos duren años con la máxima tranquilidad',
      categoria: 'higiene',
      puntos: [
        {
          titulo: 'Lavado fácil y rápido con agua tibia',
          desc: 'Usa agua tibia y jabón neutro sin alcohol o espuma higienizante antibacteriana antes y después de cada uso. Enjuaga abundantemente y seca con una toalla suave que no deje pelusa.'
        },
        {
          titulo: 'Resistentes al agua para la ducha o tina (IPX7)',
          desc: 'La gran mayoría de nuestros modelos son sumergibles. Puedes disfrutarlos con total calma bajo el agua tibia. Solo asegúrate de secar bien los pines de carga magnética antes de conectarlos.'
        },
        {
          titulo: 'Garantía de empaque 100% ciego y discreto',
          desc: 'Cuidamos tu privacidad al máximo. Todos los pedidos se envían en cajas lisas sin ningún logotipo, texto ni indicio del contenido. Ni el repartidor ni terceros sabrán qué hay adentro.'
        }
      ],
      tip: 'Consejo Toy Store: Guarda siempre tus juguetes limpios y secos dentro de su bolsita de tela transpirable en un espacio reservado, fresco y fuera de la luz solar directa.'
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
                {/* HUELLITAS DE LOTSO ESTILO CRAYOLA (GRANDES Y DESTACADAS CORONANDO CADA HUELLA) */}
                <div className="flex justify-center -mb-9 sm:-mb-12 md:-mb-14 relative z-20 pointer-events-none">
                  <img
                    src="/images/lotso_huellas.png"
                    alt="Huellitas Lotso"
                    className="w-56 sm:w-68 md:w-80 lg:w-88 max-w-[88%] h-auto object-contain drop-shadow-md transition-transform group-hover:scale-105"
                  />
                </div>

                {/* ALMOHADILLA PRINCIPAL (CUERPO ANCHO DE LA HUELLA CON MARGEN EXTRA GRUESO TIPO PELAJE) */}
                <div className="w-full bg-white/95 backdrop-blur-md rounded-[2.4rem] sm:rounded-[3.2rem] border-[8px] sm:border-[14px] border-[#db2777] shadow-[0_24px_50px_rgba(225,29,72,0.2)] ring-2 sm:ring-4 ring-[#be185d]/20 p-5 sm:p-9 pt-8 sm:pt-12 relative z-10 flex flex-col justify-between transition-all duration-300 group-hover:shadow-[0_28px_60px_rgba(225,29,72,0.3)] group-hover:border-[#be185d]">

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
