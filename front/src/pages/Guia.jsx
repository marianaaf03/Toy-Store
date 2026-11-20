import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RoomWrapper from '../components/RoomWrapper';
import AndyCloudsWallpaper from '../components/AndyCloudsWallpaper';

export default function Guia() {
  const navigate = useNavigate();
  const [moduloActivo, setModuloActivo] = useState(0);
  const [quizSeleccion, setQuizSeleccion] = useState(0);

  const modulos = [
    {
      id: 0,
      titulo: 'Materiales & Silicona Médica',
      subtitulo: 'La base de un bienestar íntimo seguro, higiénico y duradero',
      colorBadge: 'bg-rose-100 text-rose-800 border-rose-200',
      puntos: [
        {
          titulo: 'Silicona Líquida de Grado Médico',
          texto: 'Es el estándar de oro absoluto en juguetería íntima. Al ser un material no poroso y biocompatible, no alberga bacterias, moho ni microorganismos, siendo ultrasuave y sedoso al contacto.'
        },
        {
          titulo: 'Regla de Oro: Solo Lubricantes a Base de Agua',
          texto: 'Los juguetes de silicona pura SIEMPRE deben usarse exclusivamente con lubricantes a base de agua. Los aceites, vaselina o lubricantes con silicona degradan la superficie del juguete de manera irreversible.'
        },
        {
          titulo: '100% Libre de Tóxicos',
          texto: 'Todos los productos de nuestro catálogo están certificados libres de ftalatos, plomo, látex nocivo y plastificantes industriales para proteger tu equilibrio íntimo.'
        }
      ]
    },
    {
      id: 1,
      titulo: 'Ondas de Aire vs Vibración Clásica',
      subtitulo: 'Entendiendo los dos universos de estimulación para elegir tu favorito',
      colorBadge: 'bg-sky-100 text-[#1e3a8a] border-sky-200',
      puntos: [
        {
          titulo: 'Ondas de Presión Pulsantes (Sónicas)',
          texto: 'Estimulan las más de 8.000 terminaciones nerviosas del clítoris sin contacto mecánico ni fricción. Generan una sensación envolvente y succionante que evita el adormecimiento o la hipersensibilidad por roce.'
        },
        {
          titulo: 'Vibración Mecánica Continua',
          texto: 'Ideal para estimulación profunda en zonas amplias y puntos internos (punto G). Sus patrones rítmicos y velocidades graduables permiten crear una curva de placer pausada y controlada.'
        },
        {
          titulo: 'Estimulación Dual Sincronizada',
          texto: 'Los modelos rabbit y varitas combinan ambos estímulos a la vez, permitiendo orgasmos dobles y simultáneos con ergonomía adaptada a cada anatomía.'
        }
      ]
    },
    {
      id: 2,
      titulo: 'Higiene, Limpieza & Cuidados',
      subtitulo: 'Pasos simples para duplicar la vida útil de tus juguetes favoritos',
      colorBadge: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      puntos: [
        {
          titulo: 'Lavado Antes y Después de Cada Uso',
          texto: 'Lava tu dispositivo con agua tibia y jabón neutro sin alcohol, o utiliza una espuma antibacterial especializada para silicona. Enjuaga con abundante agua.'
        },
        {
          titulo: 'Resistencia al Agua (Certificación IPX7)',
          texto: 'La mayoría de modelos son sumergibles para usar en la ducha o la bañera. Para proteger la batería, seca bien el puerto de carga magnética antes de conectarlo.'
        },
        {
          titulo: 'Almacenamiento Discreto y Fresco',
          texto: 'Seca con una toalla de microfibra limpia que no deje pelusa y guarda cada juguete en su funda de satén transpirable, en un lugar fresco y protegido de la luz solar directa.'
        }
      ]
    },
    {
      id: 3,
      titulo: 'Placer en Pareja & Comunicación',
      subtitulo: 'Derribando mitos para sumar complicidad, diversión y confianza',
      colorBadge: 'bg-purple-100 text-purple-800 border-purple-200',
      puntos: [
        {
          titulo: 'Aliados de Juego, No Reemplazos',
          texto: 'Los juguetes íntimos son complementos diseñados para enriquecer el juego previo, explorar nuevas fantasías y abrir conversaciones íntimas desde la curiosidad y el respeto.'
        },
        {
          titulo: 'Controles Inalámbricos y a Distancia',
          texto: 'Permiten ceder el control de la intensidad y los patrones rítmicos a tu pareja, creando dinámicas de anticipación y complicidad tanto en citas públicas como en la intimidad.'
        },
        {
          titulo: 'El Consentimiento y la Curiosidad',
          texto: 'Conversa sobre lo que te genera curiosidad en un momento relajado fuera de la cama. El placer compartido florece cuando ambos se sienten seguros y escuchados.'
        }
      ]
    }
  ];

  const quizOpciones = [
    {
      pregunta: 'Busco sensaciones suaves, sin roce mecánico y sin riesgo de cosquillas excesivas.',
      tituloRecomendado: 'Succionador Clitoriano por Ondas de Aire',
      categoria: 'vibradores',
      descripcion: 'Orgasmos intensos sin contacto directo gracias a pulsaciones sónicas de aire.',
      img: '/images/succionadorclitoris.png',
      link: '/tienda?cat=vibradores'
    },
    {
      pregunta: 'Quiero estimulación simultánea interna y externa con vibraciones potentes y graduables.',
      tituloRecomendado: 'Masajeador Rabbit Doble Estimulación',
      categoria: 'vibradores',
      descripcion: 'Doble motor independiente para punto G y clítoris con silicona líquida ultrasuave.',
      img: '/images/rabbitbuzz.webp',
      link: '/tienda?cat=vibradores'
    },
    {
      pregunta: 'Deseo juegos de complicidad en pareja, lencería sensual y entrega a distancia.',
      tituloRecomendado: 'Lencería Sexy & Vibrador con Control Remoto',
      categoria: 'lencerias',
      descripcion: 'Conjuntos con encaje sedoso y estimuladores controlables hasta 15 metros.',
      img: '/images/lenceriabralette.png',
      link: '/tienda?cat=lencerias'
    },
    {
      pregunta: 'Me interesa explorar terapia de frío/calor y sensaciones de iniciación seguras.',
      tituloRecomendado: 'Plug Metálico con Gema & Dildo de Cristal',
      categoria: 'anales',
      descripcion: 'Acero pulido y cristal borosilicato con bases acampanadas 100% seguras.',
      img: '/images/pluganalconcristal.png',
      link: '/tienda?cat=anales'
    }
  ];

  return (
    <RoomWrapper 
      theme="lotso" 
      wallpaperContent={<AndyCloudsWallpaper />}
      hideFloorToys={true}
    >
      <style>{`
        @keyframes floatGuideCard {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-3px); }
        }
        .animate-guide-card {
          animation: floatGuideCard 4.5s ease-in-out infinite;
        }
      `}</style>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 pt-0 pb-28 font-fredoka select-none flex flex-col items-center">
        
        {/* =========================================================================
            1. BANNER COLGANTE DE LA NUBE: GUÍA SENSORIAL TOY STORE
            ========================================================================= */}
        <div className="w-full relative flex flex-col items-center mb-8 -mt-2 sm:-mt-3 md:-mt-4">
          
          {/* Cuerdas colgantes con remaches dorados que conectan al techo/nube */}
          <div className="w-full max-w-md flex justify-between px-16 -mb-1 relative z-0">
            <div className="w-[3.5px] h-14 sm:h-16 md:h-18 bg-gradient-to-b from-slate-400 via-rose-600 to-rose-700 shadow-xs relative">
              <div className="w-2.5 h-2.5 rounded-full bg-[#facc15] border border-[#78350f] absolute -top-1 -left-[3px]"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-[#facc15] border border-[#78350f] absolute -bottom-1 -left-[3px]"></div>
            </div>
            <div className="w-[3.5px] h-14 sm:h-16 md:h-18 bg-gradient-to-b from-slate-400 via-rose-600 to-rose-700 shadow-xs relative">
              <div className="w-2.5 h-2.5 rounded-full bg-[#facc15] border border-[#78350f] absolute -top-1 -left-[3px]"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-[#facc15] border border-[#78350f] absolute -bottom-1 -left-[3px]"></div>
            </div>
          </div>

          {/* Placa Principal de la Guía */}
          <div className="w-full bg-white/95 backdrop-blur-md rounded-[2.5rem] p-6 sm:p-8 shadow-[0_16px_40px_rgba(236,72,153,0.18)] border-4 border-[#a6d4f2] text-center relative z-10 animate-guide-card">
            <span className="inline-block px-4 py-1.5 rounded-full bg-rose-50 text-rose-700 text-[11px] font-black tracking-widest uppercase border border-rose-200 mb-3">
              Educación Íntima & Autocuidado
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#1e3a8a] tracking-tight uppercase leading-tight">
              Manual de Exploración & Cuidado
            </h1>
            <p className="mt-2 text-xs sm:text-sm md:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed font-medium">
              Aprende sobre materiales biocompatibles, tipos de estimulación, higiene y bienestar íntimo para disfrutar al máximo con total libertad y confianza.
            </p>
          </div>
        </div>

        {/* =========================================================================
            2. SELECTOR DE CAPÍTULOS TIPO PÍLDORAS RESALTADAS
            ========================================================================= */}
        <div className="w-full max-w-4xl flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-6">
          {modulos.map((m) => {
            const activo = moduloActivo === m.id;
            return (
              <button
                key={m.id}
                onClick={() => setModuloActivo(m.id)}
                className={`px-4 sm:px-6 py-2.5 rounded-2xl text-xs sm:text-sm font-black uppercase tracking-wider transition-all border cursor-pointer ${
                  activo
                    ? 'bg-[#a6d4f2] text-[#1e3a8a] border-[#1e3a8a] shadow-md scale-105 ring-2 ring-[#1e3a8a]/20'
                    : 'bg-white/90 text-[#1e3a8a] border-slate-200 hover:bg-[#a6d4f2]/30 hover:border-[#a6d4f2]'
                }`}
              >
                {m.titulo}
              </button>
            );
          })}
        </div>

        {/* =========================================================================
            3. CONTENEDOR DEL CAPÍTULO ACTIVO: TARJETA AMPLIA CON CONTENIDO CLARO
            ========================================================================= */}
        <div className="w-full max-w-5xl bg-white/95 backdrop-blur-md rounded-[2.5rem] p-6 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.12)] border-4 border-white mb-10 relative">
          
          {/* Encabezado del capítulo */}
          <div className="pb-5 mb-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className={`inline-block px-3 py-1 rounded-md text-[10px] font-black uppercase tracking-wider border ${modulos[moduloActivo].colorBadge}`}>
                Capítulo {moduloActivo + 1} de {modulos.length}
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#1e3a8a] mt-2 uppercase">
                {modulos[moduloActivo].titulo}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
                {modulos[moduloActivo].subtitulo}
              </p>
            </div>

            <div className="hidden sm:flex items-center gap-1.5 text-xs font-bold text-[#1e3a8a] bg-sky-50 px-4 py-2 rounded-xl border border-sky-100">
              <svg className="w-4 h-4 text-sky-600" fill="none" stroke="currentColor" strokeWidth="2.3" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span>Certificado Toy Store</span>
            </div>
          </div>

          {/* Puntos clave ilustrados */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {modulos[moduloActivo].puntos.map((punto, idx) => (
              <div 
                key={idx}
                className="bg-slate-50/80 rounded-2xl p-5 border border-slate-200/80 hover:border-sky-300 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-8 h-8 rounded-xl bg-[#a6d4f2]/40 text-[#1e3a8a] flex items-center justify-center font-black text-sm mb-3">
                    0{idx + 1}
                  </div>
                  <h3 className="text-sm font-black text-[#1e3a8a] mb-2 leading-snug">
                    {punto.titulo}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {punto.texto}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Botón de acción al pie del capítulo */}
          <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-slate-500 font-medium text-center sm:text-left">
              ¿Quieres poner en práctica lo aprendido o ver los juguetes diseñados con estos estándares?
            </p>
            <button
              onClick={() => navigate('/tienda')}
              className="px-6 py-3 bg-[#a6d4f2] hover:bg-[#8ac6ee] text-[#1e3a8a] font-black rounded-2xl text-xs uppercase tracking-wider transition active:scale-95 shadow-sm border-2 border-white cursor-pointer whitespace-nowrap"
            >
              Explorar Catálogo en Tienda →
            </button>
          </div>
        </div>

        {/* =========================================================================
            4. TEST INTERACTIVO RÁPIDO: ENCUENTRA TU EXPERIENCIA IDEAL
            ========================================================================= */}
        <div className="w-full max-w-5xl bg-white/95 backdrop-blur-md rounded-[2.5rem] p-6 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.12)] border-4 border-[#a6d4f2] relative">
          
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="inline-block px-3 py-1 rounded-full bg-sky-50 text-[#1e3a8a] text-[10px] font-black uppercase tracking-wider border border-sky-200 mb-2">
              Asesor Sensorial Interactivo
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#1e3a8a] uppercase tracking-tight">
              Encuentra Tu Experiencia Ideal en 1 Clic
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Selecciona la sensación que más te llama la atención hoy y te mostraremos la recomendación perfecta:
            </p>
          </div>

          {/* Opciones del test */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
            {quizOpciones.map((opcion, idx) => {
              const seleccionada = quizSeleccion === idx;
              return (
                <div
                  key={idx}
                  onClick={() => setQuizSeleccion(idx)}
                  className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-start gap-3 ${
                    seleccionada
                      ? 'bg-sky-50/80 border-[#1e3a8a] shadow-sm scale-[1.01]'
                      : 'bg-white border-slate-200 hover:border-sky-300'
                  }`}
                >
                  <div className={`w-5 h-5 rounded-full border-2 mt-0.5 shrink-0 flex items-center justify-center transition-colors ${
                    seleccionada ? 'border-[#1e3a8a] bg-[#1e3a8a]' : 'border-slate-300'
                  }`}>
                    {seleccionada && <div className="w-2 h-2 rounded-full bg-white"></div>}
                  </div>
                  <span className={`text-xs sm:text-sm leading-snug font-bold ${
                    seleccionada ? 'text-[#1e3a8a]' : 'text-slate-700'
                  }`}>
                    {opcion.pregunta}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Resultado interactivo destacado */}
          {quizOpciones[quizSeleccion] && (
            <div className="bg-gradient-to-r from-sky-50 via-rose-50/40 to-sky-50 rounded-3xl p-6 border-2 border-sky-200 flex flex-col md:flex-row items-center justify-between gap-6 animate-in fade-in duration-300">
              <div className="flex items-center gap-5">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-white border border-sky-200 p-2 flex items-center justify-center shrink-0 shadow-xs">
                  <img 
                    src={quizOpciones[quizSeleccion].img} 
                    alt={quizOpciones[quizSeleccion].tituloRecomendado}
                    className="max-h-full max-w-full object-contain drop-shadow-sm"
                  />
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-rose-700 bg-rose-100/80 px-2.5 py-0.5 rounded-md border border-rose-200 inline-block mb-1">
                    Recomendación Personalizada
                  </span>
                  <h3 className="text-lg sm:text-xl font-black text-[#1e3a8a] uppercase leading-tight">
                    {quizOpciones[quizSeleccion].tituloRecomendado}
                  </h3>
                  <p className="text-xs text-slate-600 mt-1 max-w-md leading-relaxed">
                    {quizOpciones[quizSeleccion].descripcion}
                  </p>
                </div>
              </div>

              <button
                onClick={() => navigate(quizOpciones[quizSeleccion].link)}
                className="w-full md:w-auto px-6 py-3.5 bg-[#a6d4f2] hover:bg-[#8ac6ee] text-[#1e3a8a] font-black rounded-2xl text-xs uppercase tracking-wider shadow-sm transition active:scale-95 border-2 border-white cursor-pointer whitespace-nowrap"
              >
                Ver en la Tienda →
              </button>
            </div>
          )}

        </div>

      </div>
    </RoomWrapper>
  );
}
