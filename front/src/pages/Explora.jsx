import React, { useState } from 'react';
import RoomWrapper from '../components/RoomWrapper';
import AndyCloudsWallpaper from '../components/AndyCloudsWallpaper';
import { useNavigate } from 'react-router-dom';

export default function Explora() {
  const navigate = useNavigate();

  // Estados del juego arcade
  const [faseActual, setFaseActual] = useState(0); // 0, 1, 2, 3 = preguntas | 4 = resultados
  const [respuestas, setRespuestas] = useState([]);
  const [isGrabbing, setIsGrabbing] = useState(false);
  const [opcionSeleccionada, setOpcionSeleccionada] = useState(null);

  // Banco de preguntas de La Garra de Pizza Planet
  const preguntas = [
    {
      id: 1,
      fase: 'FASE 01 • RITMO & EXPERIENCIA',
      titulo: '¿Cuál es tu sintonía para explorar hoy?',
      subtitulo: 'La Garra calibra la intensidad y el enfoque de tu viaje sensorial',
      opciones: [
        {
          id: 'suave',
          letra: 'A',
          titulo: 'Curiosidad & Primeros Pasos',
          desc: 'Quiero sensaciones gentiles, cero presiones y descubrir a mi propio ritmo.',
          arquetipo: 'sonico'
        },
        {
          id: 'sonico',
          letra: 'B',
          titulo: 'Exploración & Nuevos Pulsos',
          desc: 'Ya conozco lo básico; busco tecnología innovadora, ondas de aire y confort.',
          arquetipo: 'sonico'
        },
        {
          id: 'fantasia',
          letra: 'C',
          titulo: 'Aventura & Seducción Intensa',
          desc: 'Me fascinan los contrastes térmicos, el BDSM suave, la lencería y el juego libre.',
          arquetipo: 'fantasia'
        },
        {
          id: 'misterio',
          letra: 'D',
          titulo: 'Cero Expectativas, ¡Sorpréndeme!',
          desc: 'Dejo que el destino y la suerte de Pizza Planet elijan lo mejor para mí.',
          arquetipo: 'misterio'
        }
      ]
    },
    {
      id: 2,
      fase: 'FASE 02 • ESCENARIO IDEAL',
      titulo: '¿Cómo imaginas tu momento perfecto?',
      subtitulo: 'Define la atmósfera donde florecen tus deseos',
      opciones: [
        {
          id: 'solas',
          letra: 'A',
          titulo: 'Santuario Personal (A Solas)',
          desc: 'Un ritual de autocuidado íntimo, luz tenue, música suave y conexión propia.',
          arquetipo: 'sonico'
        },
        {
          id: 'pareja',
          letra: 'B',
          titulo: 'Cómplice & Sensual (En Pareja)',
          desc: 'Juegos previos sin prisa, masajes aromáticos y miradas traviesas de a dos.',
          arquetipo: 'pareja'
        },
        {
          id: 'juegos_poder',
          letra: 'C',
          titulo: 'Misterio & Privación Sensorial',
          desc: 'Ojos vendados, caricias a ciegas y cosquilleos que multiplican la piel.',
          arquetipo: 'fantasia'
        },
        {
          id: 'versatil',
          letra: 'D',
          titulo: 'Exploración Total sin Límites',
          desc: 'Disfruto tanto la soledad placentera como la adrenalina compartida.',
          arquetipo: 'misterio'
        }
      ]
    },
    {
      id: 3,
      fase: 'FASE 03 • TEXTURA & ESTIMULACIÓN',
      titulo: '¿Qué tipo de caricia despierta tu curiosidad?',
      subtitulo: 'La Garra detecta los estímulos que encienden tu piel',
      opciones: [
        {
          id: 'ondas_aire',
          letra: 'A',
          titulo: 'Ondas Sónicas de Aire envolvente',
          desc: 'Pulsaciones de aire sin contacto mecánico agresivo ni adormecimiento.',
          arquetipo: 'sonico'
        },
        {
          id: 'termosensaciones',
          letra: 'B',
          titulo: 'Termosensaciones (Calor & Frío)',
          desc: 'Aceites comestibles que queman dulce con el aliento y velas tibias.',
          arquetipo: 'pareja'
        },
        {
          id: 'saten_lenceria',
          letra: 'C',
          titulo: 'Seda, Satén & Lencería Fina',
          desc: 'Prendas provocativas que enmarcan la silueta y encienden la imaginación.',
          arquetipo: 'fantasia'
        },
        {
          id: 'joyeria_acero',
          letra: 'D',
          titulo: 'Joyería Ergonómica & Acero Pulido',
          desc: 'Materiales nobles biocompatibles con gemas facetadas y sensaciones profundas.',
          arquetipo: 'misterio'
        }
      ]
    },
    {
      id: 4,
      fase: 'FASE 04 • EL PREMIO GALÁCTICO',
      titulo: 'Si La Garra pudiera atrapar algo para ti hoy...',
      subtitulo: 'La última coordenada para revelar tu destino sensorial',
      opciones: [
        {
          id: 'gadget',
          letra: 'A',
          titulo: 'Un Dispositivo Ergonómico Recargable',
          desc: 'Silencioso, de silicona ultra sedosa grado médico y resistente al agua.',
          arquetipo: 'sonico'
        },
        {
          id: 'kit_sensual',
          letra: 'B',
          titulo: 'Un Kit de Masaje & Aromaterapia',
          desc: 'Aceite térmico, vela aromática y plumeros de caricias para desconectar.',
          arquetipo: 'pareja'
        },
        {
          id: 'kit_fantasia',
          letra: 'C',
          titulo: 'Un Set de Antifaz & Esposas de Peluche',
          desc: 'El encanto del BDSM suave y lúdico para entregarse al juego.',
          arquetipo: 'fantasia'
        },
        {
          id: 'mystery_box',
          letra: 'D',
          titulo: 'Una Mystery Box Secreta de Toy Store',
          desc: 'Una caja sorpresa curada por especialistas para una experiencia a ciegas.',
          arquetipo: 'misterio'
        }
      ]
    }
  ];

  // Catálogo de Arquetipos y Resultados
  const arquetipos = {
    sonico: {
      titulo: 'EXPLORADOR/A SÓNICO/A & BIENESTAR',
      lema: 'Tu camino al placer es la sutileza, la tecnología de punta y el respeto absoluto a tus tiempos.',
      descripcion: 'Tienes afinidad por estímulos de vanguardia que cuidan tu anatomía sin saturarte. Las ondas de aire pulsátil y los dispositivos recargables de silicona pura médica son tus aliados predilectos para conectar con sensaciones puras y reparadoras.',
      colorAccent: 'border-emerald-500 bg-emerald-500/10 text-emerald-400',
      badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
      categorias: [
        { nombre: 'Vibradores', filtro: 'vibradores' },
        { nombre: 'Cosmética', filtro: 'cosmetica' }
      ],
      productos: [
        {
          nombre: 'Succionador Clitoriano a Base de Aire',
          precio: '$145.000',
          imagen: '/images/succionadorclitoris.png',
          categoria: 'vibradores',
          desc: 'Tecnología de pulsaciones sónicas sin contacto mecánico que evita adormecimientos.'
        },
        {
          nombre: 'Vibrador Varita Masajeadora Cowgirl',
          precio: '$135.000',
          imagen: '/images/vibradorvarita.png',
          categoria: 'vibradores',
          desc: 'Motor de alta torsión con cabezal flexible para aliviar tensiones y estimulación profunda.'
        },
        {
          nombre: 'Lubricante Íntimo a Base de Agua',
          precio: '$45.000',
          imagen: '/images/lubricanteintimo.png',
          categoria: 'cosmetica',
          desc: 'Fórmula biocompatible 100% sedosa e hipoalergénica que protege tus dispositivos.'
        }
      ]
    },
    pareja: {
      titulo: 'MAESTRO/A DE LOS JUEGOS PREVIOS & TERMOSENSACIONES',
      lema: 'Para ti, el erotismo es un arte de contrastes: temperaturas deliciosas, aromas envolventes y complicidad compartida.',
      descripcion: 'Valoras la conexión paso a paso. Los masajes de cuerpo a cuerpo, las fragancias excitantes y los geles que reaccionan con la respiración transforman cualquier noche ordinaria en un viaje sensorial inolvidable.',
      colorAccent: 'border-amber-400 bg-amber-400/10 text-amber-300',
      badgeColor: 'bg-amber-400/20 text-amber-300 border-amber-400/40',
      categorias: [
        { nombre: 'Cosmética', filtro: 'cosmetica' },
        { nombre: 'Kits & Sorpresas', filtro: 'kits' }
      ],
      productos: [
        {
          nombre: 'Aceite de Masaje Sensual Efecto Calor',
          precio: '$45.000',
          imagen: '/images/aceitedemasaje.png',
          categoria: 'cosmetica',
          desc: 'Sabor fresa silvestre comestible que se calienta delicadamente al contacto del aliento.'
        },
        {
          nombre: 'Vela Aromática de Masaje Tibio',
          precio: '$55.000',
          imagen: '/images/velaaromatica.png',
          categoria: 'cosmetica',
          desc: 'Cera vegetal de soja con aceites esenciales nutritivos a temperatura corporal.'
        },
        {
          nombre: 'Gel Estimulador Clitoriano Frío / Calor',
          precio: '$50.000',
          imagen: '/images/gelestimulador.png',
          categoria: 'cosmetica',
          desc: 'Fórmula dual que multiplica las terminaciones nerviosas con cosquilleos únicos.'
        }
      ]
    },
    fantasia: {
      titulo: 'EMBAJADOR/A DE LA FANTASÍA & SEDUCCIÓN AUDAR',
      lema: 'Disfrutas encender los sentidos mediante la vista y el tacto: prendas de impacto y juegos donde la imaginación toma el mando.',
      descripcion: 'Tu energía íntima se nutre del juego de miradas, la moda lúdica y la entrega sensorial. Un antifaz que priva la vista o una prenda que realce tu presencia son llaves directas a una experiencia de alta complicidad.',
      colorAccent: 'border-rose-400 bg-rose-400/10 text-rose-300',
      badgeColor: 'bg-rose-400/20 text-rose-300 border-rose-400/40',
      categorias: [
        { nombre: 'Lencería', filtro: 'lencerias' },
        { nombre: 'Accesorios & BDSM', filtro: 'accesorios' }
      ],
      productos: [
        {
          nombre: 'Conjunto Lencería Bralette y Panty de Encaje',
          precio: '$110.000',
          imagen: '/images/lenceriabralette.png',
          categoria: 'lencerias',
          desc: 'Encaje floral elástico ultra sedoso que favorece y abraza la silueta con elegancia.'
        },
        {
          nombre: 'Antifaz de Seda Acolchado para Pareja',
          precio: '$35.000',
          imagen: '/images/antifazdeseda.png',
          categoria: 'accesorios',
          desc: 'Bloqueo visual absoluto para multiplicar x10 la percepción dérmica de cada caricia.'
        },
        {
          nombre: 'Esposas de Peluche con Cierre Rápido',
          precio: '$42.000',
          imagen: '/images/esposasdepeluche.png',
          categoria: 'accesorios',
          desc: 'Hebillas seguras con acolchado de peluche suave para iniciarse en el juego de roles.'
        }
      ]
    },
    misterio: {
      titulo: 'AVENTURERO/A DEL DESTINO & GRAN SORPRESA',
      lema: 'La adrenalina de abrir una caja y entregarte al asombro es tu mayor deleite.',
      descripcion: 'Te atrae lo inesperado y no le temes a experimentar con nuevas formas anatómicas o selecciones a ciegas. La sorpresa es el condimento perfecto para despertar tu curiosidad sin filtros.',
      colorAccent: 'border-cyan-400 bg-cyan-400/10 text-cyan-300',
      badgeColor: 'bg-cyan-400/20 text-cyan-300 border-cyan-400/40',
      categorias: [
        { nombre: 'Kits & Sorpresas', filtro: 'kits' },
        { nombre: 'Plugs & Anales', filtro: 'anales' }
      ],
      productos: [
        {
          nombre: 'Mystery Box Experiencia a Ciegas de Pareja',
          precio: '$165.000',
          imagen: '/images/cajamisteriosa.png',
          categoria: 'kits',
          desc: 'Caja sorpresa con 1 juguete premium, cosmética y juego de cartas para romper la rutina.'
        },
        {
          nombre: 'Plug Anal Metálico con Gema de Cristal',
          precio: '$65.000',
          imagen: '/images/pluganalconcristal.png',
          categoria: 'anales',
          desc: 'Acero quirúrgico biocompatible con base cónica de seguridad y joya facetada.'
        },
        {
          nombre: 'Kit de Iniciación y Caricias Toy Store',
          precio: '$90.000',
          imagen: '/images/kitdeiniciazion.png',
          categoria: 'kits',
          desc: 'Selección de artículos esenciales ideales para descubrir nuevos horizontes con confianza.'
        }
      ]
    }
  };

  // Manejador al seleccionar opción
  const handleSeleccionarOpcion = (opcion) => {
    if (isGrabbing) return;

    setOpcionSeleccionada(opcion.id);
    setIsGrabbing(true);

    // Animación de La Garra descendiendo y atrapando la respuesta
    setTimeout(() => {
      const nuevasRespuestas = [...respuestas, opcion.arquetipo];
      setRespuestas(nuevasRespuestas);
      setOpcionSeleccionada(null);
      setIsGrabbing(false);

      if (faseActual < preguntas.length - 1) {
        setFaseActual(faseActual + 1);
      } else {
        setFaseActual(4); // Mostrar resultados
      }
    }, 700);
  };

  // Calcular arquetipo ganador
  const calcularResultado = () => {
    if (respuestas.length === 0) return arquetipos.sonico;
    
    // Contar votos por arquetipo
    const conteo = respuestas.reduce((acc, curr) => {
      acc[curr] = (acc[curr] || 0) + 1;
      return acc;
    }, {});

    let arquetipoGanador = 'sonico';
    let maxVotos = -1;
    for (const [key, val] of Object.entries(conteo)) {
      if (val > maxVotos) {
        maxVotos = val;
        arquetipoGanador = key;
      }
    }

    return arquetipos[arquetipoGanador] || arquetipos.sonico;
  };

  const resultado = calcularResultado();

  // Reiniciar el test
  const reiniciarTest = () => {
    setFaseActual(0);
    setRespuestas([]);
    setOpcionSeleccionada(null);
    setIsGrabbing(false);
  };

  const preguntaActiva = preguntas[faseActual];

  return (
    <RoomWrapper 
      theme="aliens" 
      wallpaperContent={<AndyCloudsWallpaper />}
      hideFloorToys={true}
    >
      <style>{`
        @keyframes gantryGlow {
          0%, 100% { filter: drop-shadow(0 0 12px rgba(16, 185, 129, 0.45)); }
          50% { filter: drop-shadow(0 0 24px rgba(52, 211, 153, 0.75)); }
        }
        .animate-claw-glow {
          animation: gantryGlow 3s ease-in-out infinite;
        }
        @keyframes floatAlien {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-4px) rotate(1deg); }
        }
        .animate-float-alien {
          animation: floatAlien 4s ease-in-out infinite;
        }
      `}</style>

      {/* CONTENEDOR PRINCIPAL: CABINA DE ARCADE DE PIZZA PLANET */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-3 sm:px-6 pt-6 sm:pt-10 pb-20 font-fredoka select-none flex flex-col items-center">
        
        {/* =========================================================================
            MÁQUINA ARCADE: CÚPULA DE CRISTAL Y MARQUESINA RETROFUTURISTA
            ========================================================================= */}
        <div className="w-full bg-slate-950/90 rounded-[2.5rem] sm:rounded-[3.2rem] border-4 sm:border-[6px] border-emerald-500/80 shadow-[0_20px_70px_rgba(16,185,129,0.35)] ring-4 ring-emerald-400/20 overflow-hidden relative backdrop-blur-md">
          
          {/* MARQUESINA SUPERIOR: PIZZA PLANET ARCADE */}
          <div className="bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 border-b-4 border-emerald-500/70 px-4 sm:px-8 py-4 sm:py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left relative z-20">
            <div className="flex items-center gap-3">
              <span className="w-3.5 h-3.5 rounded-full bg-emerald-400 animate-ping inline-block"></span>
              <div>
                <span className="text-[10px] sm:text-xs font-black tracking-widest uppercase text-emerald-400/90">
                  PIZZA PLANET ARCADE • TERMINAL #42
                </span>
                <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-white uppercase tracking-wider drop-shadow-md flex items-center gap-2">
                  <span>LA GARRA CÓSMICA</span>
                  <span className="text-emerald-400 text-sm sm:text-base font-bold bg-emerald-950/80 border border-emerald-500/50 px-2 py-0.5 rounded-md">
                    TEST DE PLACER
                  </span>
                </h1>
              </div>
            </div>

            {/* ESTADO DE JUGADOR Y CRÉDITO */}
            <div className="flex items-center gap-2 sm:gap-3 bg-slate-900/90 border border-emerald-500/40 px-3.5 py-1.5 rounded-full text-[11px] sm:text-xs font-black text-emerald-300 tracking-wider">
              <span className="text-emerald-400">CRÉDITO: 1 JUGADOR</span>
              <span className="text-emerald-600">|</span>
              <span className="text-white">
                {faseActual < 4 ? `FASE ${faseActual + 1} DE 4` : 'RESULTADO FINAL'}
              </span>
            </div>
          </div>

          {/* =========================================================================
              SECTOR MECÁNICO: LA GARRA FLOTANTE DE PIZZA PLANET (SVG DINÁMICO)
              ========================================================================= */}
          <div className="relative w-full h-32 sm:h-36 bg-gradient-to-b from-slate-950 via-emerald-950/40 to-slate-900/80 border-b-2 border-emerald-500/30 flex justify-center items-start pt-1 overflow-hidden">
            
            {/* Riel superior gantry */}
            <div className="absolute top-0 left-0 right-0 h-3 bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 border-b border-slate-600 flex items-center justify-around px-8 opacity-70">
              <div className="w-2 h-2 rounded-full bg-slate-900"></div>
              <div className="w-2 h-2 rounded-full bg-slate-900"></div>
              <div className="w-2 h-2 rounded-full bg-slate-900"></div>
              <div className="w-2 h-2 rounded-full bg-slate-900"></div>
            </div>

            {/* LA GARRA MECÁNICA (CON ANIMACIÓN DE DESCENSO AL SELECCIONAR OPCIÓN) */}
            <div 
              className={`relative z-20 flex flex-col items-center transition-all duration-500 ease-out animate-claw-glow ${
                isGrabbing ? 'translate-y-9 scale-110' : 'translate-y-0 scale-100'
              }`}
            >
              {/* Cable de acero metálico */}
              <div className="w-1.5 h-10 sm:h-12 bg-gradient-to-b from-slate-400 via-slate-200 to-slate-400 shadow-sm"></div>

              {/* Cabeza del pistón hidráulico */}
              <div className="w-10 sm:w-12 h-6 sm:h-7 bg-gradient-to-b from-slate-300 via-slate-100 to-slate-400 rounded-t-lg border-2 border-slate-500 flex items-center justify-center shadow-md">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]"></span>
              </div>

              {/* Garfio / Pinzas mecánicas (3 brazos de metal articulados) */}
              <svg 
                viewBox="0 0 100 65" 
                className="w-20 sm:w-24 h-auto -mt-1 drop-shadow-xl" 
                fill="none"
              >
                {/* Base del gancho */}
                <ellipse cx="50" cy="8" rx="16" ry="5" fill="#94a3b8" stroke="#475569" strokeWidth="2"/>
                
                {/* Brazo Izquierdo */}
                <path 
                  d={isGrabbing ? "M40 10 Q28 28 36 50" : "M40 10 Q20 30 28 50"} 
                  stroke="#cbd5e1" 
                  strokeWidth="5" 
                  strokeLinecap="round" 
                  className="transition-all duration-300"
                />
                <circle cx={isGrabbing ? 36 : 28} cy="50" r="3.5" fill="#e2e8f0" stroke="#334155" strokeWidth="1.5" />

                {/* Brazo Central */}
                <path 
                  d="M50 12 L50 48" 
                  stroke="#cbd5e1" 
                  strokeWidth="4.5" 
                  strokeLinecap="round" 
                />
                <circle cx="50" cy="48" r="3" fill="#e2e8f0" stroke="#334155" strokeWidth="1.5" />

                {/* Brazo Derecho */}
                <path 
                  d={isGrabbing ? "M60 10 Q72 28 64 50" : "M60 10 Q80 30 72 50"} 
                  stroke="#cbd5e1" 
                  strokeWidth="5" 
                  strokeLinecap="round" 
                  className="transition-all duration-300"
                />
                <circle cx={isGrabbing ? 64 : 72} cy="50" r="3.5" fill="#e2e8f0" stroke="#334155" strokeWidth="1.5" />
              </svg>
            </div>

            {/* Efecto de rayo de luz alienígena debajo de la garra */}
            <div className={`absolute bottom-0 w-44 sm:w-60 h-24 bg-gradient-to-t from-emerald-500/20 to-transparent blur-md pointer-events-none transition-opacity duration-300 ${
              isGrabbing ? 'opacity-100 scale-125' : 'opacity-40'
            }`}></div>
          </div>

          {/* =========================================================================
              CUERPO INTERACTIVO: PREGUNTAS EN CURSO O PANTALLA DE RESULTADOS
              ========================================================================= */}
          <div className="p-5 sm:p-9 md:p-11 relative z-10 bg-gradient-to-b from-slate-900/95 via-slate-950/95 to-slate-900/95">
            
            {faseActual < 4 ? (
              /* MODO TEST: PREGUNTA ACTIVA CON 4 OPCIONES */
              <div className="flex flex-col items-center">
                
                {/* Cabecera de la pregunta */}
                <div className="text-center max-w-2xl mb-8">
                  <span className="inline-block px-4 py-1 rounded-full bg-emerald-950 text-emerald-400 text-[11px] sm:text-xs font-black tracking-widest uppercase border border-emerald-500/40 mb-3 shadow-inner">
                    {preguntaActiva.fase}
                  </span>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight leading-tight uppercase">
                    {preguntaActiva.titulo}
                  </h2>
                  <p className="text-emerald-200/70 text-xs sm:text-sm font-medium mt-2">
                    {preguntaActiva.subtitulo}
                  </p>
                </div>

                {/* Barra de progreso de energía marciana */}
                <div className="w-full max-w-md bg-slate-800/80 h-2.5 rounded-full overflow-hidden mb-8 border border-slate-700 p-0.5">
                  <div 
                    className="h-full bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-300 rounded-full transition-all duration-500 shadow-[0_0_10px_#10b981]"
                    style={{ width: `${((faseActual + 1) / 4) * 100}%` }}
                  ></div>
                </div>

                {/* Grid de 4 opciones táctiles */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 w-full max-w-3xl mb-8">
                  {preguntaActiva.opciones.map((opc) => {
                    const estaSeleccionada = opcionSeleccionada === opc.id;

                    return (
                      <button
                        key={opc.id}
                        onClick={() => handleSeleccionarOpcion(opc)}
                        disabled={isGrabbing}
                        className={`text-left p-4 sm:p-5 rounded-2xl border-2 transition-all duration-200 flex items-start gap-3.5 group relative overflow-hidden ${
                          estaSeleccionada
                            ? 'bg-emerald-500/30 border-emerald-400 shadow-[0_0_25px_rgba(16,185,129,0.5)] scale-[1.02]'
                            : 'bg-slate-900/90 border-slate-700/80 hover:border-emerald-400 hover:bg-emerald-950/40 hover:-translate-y-0.5 active:scale-95 shadow-md'
                        }`}
                      >
                        {/* Letra / Botón arcade */}
                        <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl font-black text-sm sm:text-base flex items-center justify-center shrink-0 border transition-all ${
                          estaSeleccionada
                            ? 'bg-emerald-400 text-slate-950 border-white shadow-lg'
                            : 'bg-slate-800 text-emerald-300 border-slate-600 group-hover:bg-emerald-500 group-hover:text-slate-950 group-hover:border-emerald-300'
                        }`}>
                          {opc.letra}
                        </div>

                        {/* Textos de la opción */}
                        <div className="flex-1">
                          <h3 className="text-base sm:text-lg font-black text-white group-hover:text-emerald-300 transition-colors leading-snug">
                            {opc.titulo}
                          </h3>
                          <p className="text-xs sm:text-sm text-slate-400 font-medium mt-1 leading-relaxed">
                            {opc.desc}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Marcianitos de Pizza Planet comentando la partida */}
                <div className="flex items-center gap-4 bg-slate-900/80 border border-emerald-500/30 rounded-2xl p-3.5 sm:p-4 max-w-xl animate-float-alien">
                  <img 
                    src="/images/aliens_friends.png" 
                    alt="Marcianitos de Pizza Planet" 
                    className="w-16 sm:w-20 h-auto object-contain shrink-0 drop-shadow-lg"
                  />
                  <div className="text-xs sm:text-sm text-emerald-200">
                    <span className="font-black text-emerald-400 uppercase tracking-wider block mb-0.5">
                      Voz de los Marcianitos:
                    </span>
                    <p className="italic text-slate-300">
                      {isGrabbing 
                        ? '“¡Ooooh! ¡La Garra se mueve! ¡Ha elegido tu respuesta!”' 
                        : '“¡La Garra busca en lo más profundo de tus gustos íntimos... Elige con libertad!”'}
                    </p>
                  </div>
                </div>

              </div>
            ) : (
              /* =====================================================================
                  PANTALLA DE RESULTADOS: ¡LA GARRA HA ELEGIDO TU DESTINO!
                  ===================================================================== */
              <div className="flex flex-col items-center animate-in fade-in zoom-in-95 duration-500">
                
                {/* Badge de Victoria */}
                <div className="text-center max-w-2xl mb-8">
                  <span className={`inline-block px-4 py-1.5 rounded-full text-xs font-black tracking-widest uppercase border mb-3 shadow-md ${resultado.badgeColor}`}>
                    DESTINO REVELADO POR LA GARRA
                  </span>
                  <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-tight uppercase leading-tight">
                    {resultado.titulo}
                  </h2>
                  <p className="text-emerald-300 font-black text-sm sm:text-base mt-2 italic max-w-lg mx-auto">
                    “{resultado.lema}”
                  </p>
                  <p className="text-slate-300 text-xs sm:text-sm font-medium mt-3 leading-relaxed max-w-xl mx-auto">
                    {resultado.descripcion}
                  </p>
                </div>

                {/* Categorías sugeridas para explorar */}
                <div className="flex flex-wrap items-center justify-center gap-2.5 mb-10">
                  <span className="text-xs font-black text-slate-400 uppercase tracking-wider">
                    Categorías recomendadas:
                  </span>
                  {resultado.categorias.map((cat, idx) => (
                    <button
                      key={idx}
                      onClick={() => navigate('/tienda')}
                      className="px-3.5 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-400/60 text-emerald-300 text-xs font-black uppercase tracking-wider hover:bg-emerald-500 hover:text-slate-950 transition shadow-sm"
                    >
                      {cat.nombre} →
                    </button>
                  ))}
                </div>

                {/* LOS 3 PRODUCTOS IDEALES CAPTURADOS POR LA GARRA */}
                <div className="w-full mb-10">
                  <div className="text-center mb-6">
                    <span className="text-xs sm:text-sm font-black uppercase tracking-widest text-emerald-400">
                      Tus 3 Artículos Predilectos en el Baúl de Juguetes
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
                    {resultado.productos.map((prod, idx) => (
                      <div 
                        key={idx}
                        className="bg-slate-900/90 rounded-3xl border-2 border-emerald-500/40 p-5 flex flex-col justify-between hover:border-emerald-400 hover:shadow-[0_12px_30px_rgba(16,185,129,0.25)] transition-all group"
                      >
                        <div>
                          {/* Contenedor de la Imagen con halo galáctico */}
                          <div className="w-full h-44 bg-slate-950 rounded-2xl border border-slate-800 flex items-center justify-center p-3 mb-4 relative overflow-hidden group-hover:border-emerald-500/60 transition">
                            <div className="absolute inset-0 bg-emerald-500/5 group-hover:bg-emerald-500/10 transition"></div>
                            <img 
                              src={prod.imagen} 
                              alt={prod.nombre} 
                              className="max-h-full max-w-full object-contain relative z-10 transition-transform duration-300 group-hover:scale-110 drop-shadow-xl"
                            />
                          </div>

                          {/* Nombre del producto */}
                          <h4 className="text-base font-black text-white group-hover:text-emerald-300 transition-colors leading-tight mb-2">
                            {prod.nombre}
                          </h4>

                          {/* Descripción corta */}
                          <p className="text-xs text-slate-400 leading-relaxed mb-4">
                            {prod.desc}
                          </p>
                        </div>

                        {/* Pie de tarjeta con Precio celeste y Botón hacia Tienda */}
                        <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-2">
                          <span className="inline-block px-3 py-1 rounded-full bg-[#a6d4f2] text-[#1e3a8a] text-xs font-black shadow-xs">
                            {prod.precio}
                          </span>

                          <button
                            onClick={() => navigate('/tienda')}
                            className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black px-3.5 py-1.5 rounded-xl text-xs uppercase tracking-wider transition shadow-sm"
                          >
                            Ver en Tienda
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* BOTONES DE ACCIÓN FINAL */}
                <div className="flex flex-col sm:flex-row items-center gap-3.5 w-full max-w-md">
                  <button
                    onClick={reiniciarTest}
                    className="w-full sm:w-1/2 py-3.5 px-5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-emerald-300 border border-slate-600 font-black text-xs uppercase tracking-wider transition shadow-sm text-center"
                  >
                    Jugar Otra Vez
                  </button>

                  <button
                    onClick={() => navigate('/tienda')}
                    className="w-full sm:w-1/2 py-3.5 px-5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-black text-xs uppercase tracking-wider transition shadow-lg text-center"
                  >
                    Ir a la Tienda
                  </button>
                </div>

                {/* Cierre de los marcianitos */}
                <div className="mt-8 flex items-center gap-3 text-xs text-slate-400 italic">
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                  <span>“La Garra ha decidido. Tu viaje al placer apenas comienza.”</span>
                </div>

              </div>
            )}

          </div>

          {/* BASE DE LA CABINA ARCADE */}
          <div className="bg-slate-950 border-t-2 border-emerald-500/40 px-6 py-3 flex items-center justify-between text-[11px] font-black tracking-widest text-slate-500 uppercase">
            <span>TOY STORE • PIZZA PLANET EDITION</span>
            <span className="text-emerald-500/80">INSERT COIN TO DISCOVER</span>
          </div>

        </div>

      </div>
    </RoomWrapper>
  );
}
