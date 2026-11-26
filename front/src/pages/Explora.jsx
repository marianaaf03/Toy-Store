import React, { useState } from 'react';
import RoomWrapper from '../components/RoomWrapper';
import AndyCloudsWallpaper from '../components/AndyCloudsWallpaper';
import { useNavigate } from 'react-router-dom';
import { CATALOGO_REAL } from '../data/catalogoProductos';

// Franja a cuadros rojos y blancos idéntica a la del cartel oficial de Pizza Planet
const CheckeredStripe = () => (
  <div
    className="w-full h-4 sm:h-5 shrink-0"
    style={{
      backgroundImage: 'linear-gradient(45deg, #E52521 25%, transparent 25%), linear-gradient(-45deg, #E52521 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #E52521 75%), linear-gradient(-45deg, transparent 75%, #E52521 75%)',
      backgroundSize: '16px 16px',
      backgroundPosition: '0 0, 0 8px, 8px -8px, -8px 0px',
      backgroundColor: '#ffffff'
    }}
  />
);

// Elementos 3D del piso de Pizza Planet: Alien a la izquierda, Alfombra en el centro (solo en madera), Arcade a la derecha del todo
const AlienArcadeFloorElements = () => (
  <div className="relative w-full h-0 pointer-events-auto">
    {/* ALIEN A LA IZQUIERDA: AL RAS DEL INICIO DEL SUELO CON ANIMACIÓN SALTANDO (SIN EFECTO DE SOMBRA) */}
    <div className="absolute left-2 sm:left-4 md:left-8 lg:left-14 xl:left-20 bottom-[-10px] z-30 pointer-events-auto flex flex-col items-center">
      <img
        src="/images/aliencito.png"
        alt="Aliencito saltando en Pizza Planet"
        className="w-20 sm:w-28 md:w-36 lg:w-44 xl:w-52 h-auto object-contain animate-alien-jump select-none"
      />
    </div>

    {/* ALFOMBRA RETRO EN EL CENTRO: ESTRICTAMENTE EN EL SUELO DE MADERA, NUNCA INVADE LA PARED BLANCA */}
    <div className="absolute left-1/2 -translate-x-1/2 top-4 sm:top-6 md:top-8 z-10 pointer-events-none flex justify-center items-center">
      <img
        src="/images/alfombra_retroo.png"
        alt="Alfombra Retro Pizza Planet en el suelo"
        className="w-[84vw] sm:w-[76vw] md:w-[70vw] lg:w-[64vw] xl:w-[58vw] max-w-[300px] sm:max-w-[460px] md:max-w-[620px] lg:max-w-[760px] xl:max-w-[880px] h-auto object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.65)] select-none"
      />
    </div>

    {/* ARCADE A LA DERECHA DEL TODO: BAJADA UN POQUITO MÁS Y SIN EFECTO DE SOMBRA */}
    <div className="absolute right-0 bottom-[-52px] sm:bottom-[-58px] md:bottom-[-64px] z-30 pointer-events-auto">
      <div className="relative group transition-transform duration-300 hover:scale-[1.02] cursor-pointer">
        <img
          src="/images/maquina_aliens.png"
          alt="Máquina de Marcianitos Pizza Planet"
          className="w-36 sm:w-48 md:w-60 lg:w-72 xl:w-80 2xl:w-[390px] h-auto object-contain select-none"
        />
      </div>
    </div>
  </div>
);

export default function Explora() {
  const navigate = useNavigate();

  // Estados del quizz y del modal de preguntas
  const [modalAbierto, setModalAbierto] = useState(false);
  const [preguntaActual, setPreguntaActual] = useState(0); // 0 a 6 (7 preguntas)
  const [respuestas, setRespuestas] = useState([]);
  const [mostrarResultados, setMostrarResultados] = useState(false);
  const [isPressingBtn, setIsPressingBtn] = useState(false);

  // Las 7 preguntas de la Trivia inspiradas en la estética Pizza Planet
  const preguntasQuizz = [
    {
      id: 1,
      numero: '01 / 07',
      categoria: 'EXPERIENCIA',
      pregunta: '¿Cuál es tu nivel de experiencia en el mundo de los juguetes íntimos?',
      subtitulo: 'No hay respuestas incorrectas, solo tu punto de partida ideal',
      opciones: [
        { id: 'principiante', letra: 'A', texto: 'Apenas estoy empezando, busco suavidad, cero nervios y cosas sencillas.', tipo: 'suave' },
        { id: 'curioso', letra: 'B', texto: 'Ya conozco lo básico; busco tecnología innovadora, ondas de aire e intensidad.', tipo: 'sonico' },
        { id: 'avanzado', letra: 'C', texto: 'Tengo bastante experiencia y me fascina probar nuevas texturas, contrastes y fantasías.', tipo: 'audaz' },
        { id: 'libre', letra: 'D', texto: '¡Me dejo llevar por la curiosidad de lo que surja según el momento!', tipo: 'sorpresa' }
      ]
    },
    {
      id: 2,
      numero: '02 / 07',
      categoria: 'ATMÓSFERA',
      pregunta: '¿Cómo imaginas tu escenario más placentero?',
      subtitulo: 'Define la vibra donde te sientes con mayor libertad',
      opciones: [
        { id: 'solas', letra: 'A', texto: 'A solas conmigo misma/o: música suave, luz tenue y un ritual de autocuidado.', tipo: 'sonico' },
        { id: 'pareja', letra: 'B', texto: 'En pareja: juegos previos divertidos, masajes aromáticos y complicidad mutua.', tipo: 'pareja' },
        { id: 'versatil', letra: 'C', texto: 'Universo híbrido: disfruto tanto a solas como compartiendo momentos mágicos.', tipo: 'suave' },
        { id: 'espontaneo', letra: 'D', texto: 'Una noche imprevista y emocionante que rompa por completo la rutina.', tipo: 'sorpresa' }
      ]
    },
    {
      id: 3,
      numero: '03 / 07',
      categoria: 'ESTÍMULOS',
      pregunta: '¿Qué tipo de estimulación física te llama más la atención?',
      subtitulo: 'Elige la tecnología o sensación que despierta tu curiosidad',
      opciones: [
        { id: 'ondas_aire', letra: 'A', texto: 'Ondas sónicas de aire pulsátil (caricias envolventes sin roce mecánico agresivo).', tipo: 'sonico' },
        { id: 'vibracion_clasica', letra: 'B', texto: 'Vibración continua y profunda (varitas masajeadoreas y estimulación dual interna).', tipo: 'audaz' },
        { id: 'termosensaciones', letra: 'C', texto: 'Juegos de temperatura (aceites térmicos que queman dulce al soplar y velas tibias).', tipo: 'pareja' },
        { id: 'sensorial_suave', letra: 'D', texto: 'Caricias dérmicas ligeras (plumeros, satén y cosquilleos por todo el cuerpo).', tipo: 'suave' }
      ]
    },
    {
      id: 4,
      numero: '04 / 07',
      categoria: 'MODA & SEDUCCIÓN',
      pregunta: '¿Qué lugar ocupa la lencería en tu forma de disfrutar?',
      subtitulo: 'El poder visual y táctil de las prendas íntimas',
      opciones: [
        { id: 'bralette', letra: 'A', texto: '¡Me fascina! Bralettes, encajes y bodies que realcen la silueta y me hagan sentir segura.', tipo: 'lencerias' },
        { id: 'seda', letra: 'B', texto: 'Prefiero la elegancia del satén brillante, kimonos sedosos y batas suaves.', tipo: 'lencerias' },
        { id: 'tematica', letra: 'C', texto: 'Me divierte la lencería lúdica, masculina o inspirada en personajes para jugar.', tipo: 'lencerias' },
        { id: 'piel', letra: 'D', texto: 'Prefiero ir directo al contacto con la piel sin tantas prendas intermedias.', tipo: 'sonico' }
      ]
    },
    {
      id: 5,
      numero: '05 / 07',
      categoria: 'FANTASÍAS',
      pregunta: 'Si te invitaran a experimentar una dinámica diferente...',
      subtitulo: 'Elige la pequeña aventura que te animarías a probar',
      opciones: [
        { id: 'antifaz', letra: 'A', texto: 'Privación sensorial: ojos vendados con antifaz de seda para multiplicar el tacto x10.', tipo: 'audaz' },
        { id: 'esposas', letra: 'B', texto: 'Juegos de entrega y confianza con esposas acolchadas de felpa suave.', tipo: 'audaz' },
        { id: 'joyeria', letra: 'C', texto: 'Joyería anatómica de acero quirúrgico pulido con cristales brillantes.', tipo: 'audaz' },
        { id: 'masaje_lento', letra: 'D', texto: 'Un masaje cuerpo a cuerpo sin prisas con aceites esenciales hidratantes.', tipo: 'pareja' }
      ]
    },
    {
      id: 6,
      numero: '06 / 07',
      categoria: 'TEMPERATURA',
      pregunta: '¿Qué sensación térmica te resulta más tentadora?',
      subtitulo: 'El contraste de temperaturas enciende terminaciones dormidas',
      opciones: [
        { id: 'calor', letra: 'A', texto: 'Efecto calor reconfortante que se activa con el calor de la piel y el aliento.', tipo: 'pareja' },
        { id: 'frio_calor', letra: 'B', texto: 'Efecto dual frío y calor con cosquilleo eléctrico estimulante.', tipo: 'sonico' },
        { id: 'vela_tibia', letra: 'C', texto: 'Cera vegetal tibia que se derrite y acaricia la piel suavemente.', tipo: 'pareja' },
        { id: 'neutro', letra: 'D', texto: 'Sensación fresca y 100% natural con un lubricante sedoso a base de agua.', tipo: 'suave' }
      ]
    },
    {
      id: 7,
      numero: '07 / 07',
      categoria: 'EL REGALO FINAL',
      pregunta: 'Si La Garra de Pizza Planet atrapara un regalo para ti ahora mismo...',
      subtitulo: 'El último paso para revelarte tus productos y categorías ideales',
      opciones: [
        { id: 'gadget', letra: 'A', texto: 'Un estimulador sónico recargable, sumergible y de diseño vanguardista.', tipo: 'sonico' },
        { id: 'conjunto', letra: 'B', texto: 'Un conjunto de lencería de encaje que me empodere frente al espejo.', tipo: 'lencerias' },
        { id: 'caja_sorpresa', letra: 'C', texto: 'Una Mystery Box secreta a ciegas con varias sorpresas en su interior.', tipo: 'sorpresa' },
        { id: 'kit_completo', letra: 'D', texto: 'Un kit de masaje con aceites, velas y caricias para desconectar del estrés.', tipo: 'pareja' }
      ]
    }
  ];

  // Pulsar el botón rojo grande
  const handlePulsarBotonRojo = () => {
    setIsPressingBtn(true);
    setTimeout(() => {
      setIsPressingBtn(false);
      setPreguntaActual(0);
      setRespuestas([]);
      setMostrarResultados(false);
      setModalAbierto(true);
    }, 220);
  };

  // Responder pregunta
  const handleResponder = (tipo) => {
    const nuevas = [...respuestas, tipo];
    setRespuestas(nuevas);

    if (preguntaActual < preguntasQuizz.length - 1) {
      setPreguntaActual(preguntaActual + 1);
    } else {
      setMostrarResultados(true);
    }
  };

  // Calcular recomendaciones de productos y categorías basados en CATALOGO_REAL
  const getRecomendaciones = () => {
    const conteo = respuestas.reduce((acc, r) => {
      acc[r] = (acc[r] || 0) + 1;
      return acc;
    }, {});

    let max = 0;
    let dominante = 'sonico';
    for (const [key, val] of Object.entries(conteo)) {
      if (val > max) {
        max = val;
        dominante = key;
      }
    }

    if (dominante === 'lencerias') {
      return {
        titulo: 'TU PERFIL: AMANTE DE LA MODA & SEDUCCIÓN',
        descripcion: 'Disfrutas la sensualidad a través de la vista y las texturas finas. Las prendas que enmarcan la silueta y los accesorios elegantes son tu clave para encender la chispa.',
        categorias: ['Lencería', 'Accesorios & BDSM'],
        categoriaFiltro: 'lencerias',
        productos: CATALOGO_REAL.filter(p => p.categoria === 'lencerias').slice(0, 3)
      };
    }

    if (dominante === 'pareja') {
      return {
        titulo: 'TU PERFIL: MAESTRO/A DE LOS JUEGOS PREVIOS & TERMOSENSACIONES',
        descripcion: 'Para ti, el placer florece en los contrastes de temperatura, los masajes lentos cuerpo a cuerpo y la complicidad mutua sin prisa.',
        categorias: ['Cosmética & Aceites', 'Kits & Sorpresas'],
        categoriaFiltro: 'cosmetica',
        productos: CATALOGO_REAL.filter(p => p.categoria === 'cosmetica').slice(0, 3)
      };
    }

    if (dominante === 'audaz') {
      return {
        titulo: 'TU PERFIL: EXPLORADOR/A AUDAZ & FANTASÍAS LIBRES',
        descripcion: 'Te entusiasma explorar más allá de lo convencional: privación sensorial con vendas, joyería anatómica de acero pulido y vibración profunda.',
        categorias: ['Plugs & Anales', 'Accesorios & BDSM'],
        categoriaFiltro: 'accesorios',
        productos: CATALOGO_REAL.filter(p => p.categoria === 'accesorios' || p.categoria === 'anales').slice(0, 3)
      };
    }

    if (dominante === 'sorpresa') {
      return {
        titulo: 'TU PERFIL: AVENTURERO/A DEL DESTINO & MYSTERY BOX',
        descripcion: 'Te fascina la emoción de lo inesperado. Abrir una caja sorpresa curada a ciegas es tu mejor pasaporte al placer sin prejuicios.',
        categorias: ['Cajas Sorpresa & Kits', 'Vibradores'],
        categoriaFiltro: 'kits',
        productos: CATALOGO_REAL.filter(p => p.categoria === 'kits' || p.categoria === 'vibradores').slice(0, 3)
      };
    }

    // Default: sonico / bienestar
    return {
      titulo: 'TU PERFIL: BIENESTAR SÓNICO & AUTOCUIDADO',
      descripcion: 'Buscas la máxima comodidad, tecnología ergonómica no invasiva y respeto total por tu ritmo con silicona médica ultra sedosa.',
      categorias: ['Vibradores', 'Cosmética & Aceites'],
      categoriaFiltro: 'vibradores',
      productos: CATALOGO_REAL.filter(p => p.categoria === 'vibradores').slice(0, 3)
    };
  };

  const recomendacion = getRecomendaciones();
  const preg = preguntasQuizz[preguntaActual];

  return (
    <RoomWrapper
      theme="aliens"
      wallpaperContent={<AndyCloudsWallpaper />}
      hideFloorToys={true}
      customFloorElements={<AlienArcadeFloorElements />}
    >
      <style>{`
        @keyframes pulseRedButton {
          0%, 100% {
            box-shadow: 0 0 20px rgba(229, 37, 33, 0.4), inset 0 0 15px rgba(255, 255, 255, 0.35);
          }
          50% {
            box-shadow: 0 0 45px rgba(229, 37, 33, 0.8), inset 0 0 25px rgba(255, 255, 255, 0.6);
          }
        }
        .animate-red-button-glow {
          animation: pulseRedButton 2.4s ease-in-out infinite;
        }
        @keyframes greenNeonChevronGlow {
          0%, 100% {
            filter: drop-shadow(0 0 6px #00FF66) drop-shadow(0 0 16px #22C55E) drop-shadow(0 0 35px #15803D);
            opacity: 0.95;
            transform: translateY(0);
          }
          50% {
            filter: drop-shadow(0 0 12px #39FF14) drop-shadow(0 0 28px #00FF66) drop-shadow(0 0 55px #22C55E);
            opacity: 1;
            transform: translateY(4px);
          }
        }
        .animate-green-neon-arrow {
          animation: greenNeonChevronGlow 2s ease-in-out infinite;
        }
        @keyframes alienJump {
          0%, 100% {
            transform: translateY(0) scale(1, 1);
          }
          12% {
            transform: translateY(4px) scale(1.1, 0.9);
          }
          32% {
            transform: translateY(-42px) scale(0.95, 1.05);
          }
          50% {
            transform: translateY(-64px) scale(1, 1);
          }
          68% {
            transform: translateY(-24px) scale(0.97, 1.03);
          }
          84% {
            transform: translateY(0) scale(1.14, 0.86);
          }
          92% {
            transform: translateY(-10px) scale(0.98, 1.02);
          }
        }
        .animate-alien-jump {
          animation: alienJump 1.7s cubic-bezier(0.28, 0.84, 0.42, 1) infinite;
          transform-origin: bottom center;
        }
        @keyframes alienShadowScale {
          0%, 100% {
            transform: scale(1);
            opacity: 0.65;
          }
          12% {
            transform: scale(1.22);
            opacity: 0.85;
          }
          50% {
            transform: scale(0.42);
            opacity: 0.2;
          }
          84% {
            transform: scale(1.28);
            opacity: 0.9;
          }
          92% {
            transform: scale(0.8);
            opacity: 0.45;
          }
        }
        .animate-alien-shadow {
          animation: alienShadowScale 1.7s cubic-bezier(0.28, 0.84, 0.42, 1) infinite;
        }
      `}</style>

      {/* =========================================================================
          CONTENEDOR PRINCIPAL: PARED, CARTEL, POSTERS, FLECHA Y BOTÓN
          ========================================================================= */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 pt-4 sm:pt-6 pb-6 font-fredoka select-none flex-1 flex flex-col items-center">

        {/* ZONA SUPERIOR / PARED: POSTERS A LA IZQUIERDA + CARTEL CENTRADO + ESPACIO LIBRE PARA LA ARCADE */}
        <div className="w-full flex items-center lg:items-start justify-center gap-6 lg:gap-8 xl:gap-12 mt-2 sm:mt-4">

          {/* COLUMNA IZQUIERDA: 2 POSTERS RETRO (NAVE PIZZA PLANET + ALIEN) */}
          <div className="hidden lg:flex flex-col items-center gap-6 w-36 xl:w-44 shrink-0 self-start mt-10 xl:mt-12">
            
            {/* POSTER RETRO 2: NAVE ESPACIAL PIZZA PLANET */}
            <div className="relative group transition-all duration-300 hover:rotate-0 hover:scale-105 cursor-pointer rotate-2">
              <img 
                src="/images/poster_retro2.png" 
                alt="Poster Retro Pizza Planet 2"
                className="w-36 xl:w-44 h-auto object-contain rounded-md drop-shadow-[0_15px_30px_rgba(0,0,0,0.75)]"
              />
            </div>

            {/* POSTER RETRO 1: ALIEN "I'VE BEEN CHOSEN" (Con ancho idéntico w-36 xl:w-44 para no deformar) */}
            <div className="relative group transition-all duration-300 hover:rotate-0 hover:scale-105 cursor-pointer -rotate-2">
              <img 
                src="/images/poster_retro.png" 
                alt="Poster Retro Pizza Planet Alien"
                className="w-36 xl:w-44 h-auto object-contain rounded-md drop-shadow-[0_15px_30px_rgba(0,0,0,0.75)]"
              />
            </div>

          </div>

          {/* COLUMNA CENTRAL: CARTEL HANGING SIGN + FLECHA NEÓN VERDE + BOTÓN */}
          <div className="flex flex-col items-center w-full max-w-[560px] sm:max-w-[620px] md:max-w-[680px] lg:max-w-[700px] shrink-0">
            
            {/* CARTEL PRINCIPAL HANGING SIGN */}
            <div className="relative flex flex-col items-center w-full">
              {/* Cadenas metálicas de suspensión hacia las nubes */}
              <div className="w-full flex justify-between px-14 sm:px-20 -mb-2 z-10 pointer-events-none">
                <div className="w-2.5 sm:w-3 h-10 sm:h-14 bg-gradient-to-b from-slate-300 via-slate-500 to-slate-800 rounded-sm shadow-md border border-slate-900/60 -mt-2"></div>
                <div className="w-2.5 sm:w-3 h-10 sm:h-14 bg-gradient-to-b from-slate-300 via-slate-500 to-slate-800 rounded-sm shadow-md border border-slate-900/60 -mt-2"></div>
              </div>

              {/* Marco arcade oscuro con remaches y neón sutil */}
              <div className="w-full p-2 sm:p-2.5 bg-gradient-to-b from-[#2a2d3d] via-[#1a1c26] to-[#0e1017] rounded-3xl shadow-[0_25px_60px_rgba(0,0,0,0.85),0_0_35px_rgba(229,37,33,0.3)] border-2 border-slate-700/80 relative transition-transform hover:scale-[1.01] duration-300">
                {/* Remaches metálicos en las 4 esquinas */}
                <div className="absolute top-3 left-3 w-3.5 h-3.5 rounded-full bg-gradient-to-tr from-slate-500 via-slate-300 to-white border border-slate-600 shadow-inner z-20"></div>
                <div className="absolute top-3 right-3 w-3.5 h-3.5 rounded-full bg-gradient-to-tr from-slate-500 via-slate-300 to-white border border-slate-600 shadow-inner z-20"></div>
                <div className="absolute bottom-3 left-3 w-3.5 h-3.5 rounded-full bg-gradient-to-tr from-slate-500 via-slate-300 to-white border border-slate-600 shadow-inner z-20"></div>
                <div className="absolute bottom-3 right-3 w-3.5 h-3.5 rounded-full bg-gradient-to-tr from-slate-500 via-slate-300 to-white border border-slate-600 shadow-inner z-20"></div>

                <img 
                  src="/images/cartel_aliens.png?v=5" 
                  onError={(e) => { e.target.src = '/images/letrero_aliens.png'; }}
                  alt="¿Quieres explorarte y no sabes por dónde empezar? - Pizza Planet"
                  className="w-full h-auto object-contain rounded-2xl"
                />
              </div>
            </div>

            {/* FLECHA NEÓN RETRO VERDE CHEVRON: ESTILO PIZZA PLANET ARCADE */}
            <div className="flex flex-col items-center my-2 sm:my-3 select-none pointer-events-none">
              <div className="animate-green-neon-arrow flex flex-col items-center">
                <svg 
                  className="w-16 h-24 sm:w-20 sm:h-28 md:w-24 md:h-32" 
                  viewBox="0 0 100 120" 
                  fill="none"
                >
                  {/* Chevron 1 (Superior) */}
                  <path 
                    d="M 18 16 L 50 42 L 82 16" 
                    stroke="#00FF66" 
                    strokeWidth="9" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                  />
                  <path 
                    d="M 18 16 L 50 42 L 82 16" 
                    stroke="#E6FFFA" 
                    strokeWidth="3.2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                  />

                  {/* Chevron 2 (Medio) */}
                  <path 
                    d="M 18 48 L 50 74 L 82 48" 
                    stroke="#00FF66" 
                    strokeWidth="9" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                  />
                  <path 
                    d="M 18 48 L 50 74 L 82 48" 
                    stroke="#E6FFFA" 
                    strokeWidth="3.2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                  />

                  {/* Chevron 3 (Inferior, apuntando al botón) */}
                  <path 
                    d="M 18 80 L 50 106 L 82 80" 
                    stroke="#00FF66" 
                    strokeWidth="9" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                  />
                  <path 
                    d="M 18 80 L 50 106 L 82 80" 
                    stroke="#E6FFFA" 
                    strokeWidth="3.2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                  />
                </svg>
              </div>
            </div>

            {/* BOTÓN RETRO ARCADE: "APRETAR AQUÍ" */}
            <div className="flex flex-col items-center mb-6 z-20">
              <div className="w-44 h-44 sm:w-52 sm:h-52 md:w-56 md:h-56 rounded-full bg-[#18181b] border-4 sm:border-[6px] border-[#27272a] shadow-[0_25px_50px_rgba(0,0,0,0.95),inset_0_3px_6px_rgba(255,255,255,0.15)] flex items-center justify-center p-3 sm:p-4 relative">
                <div className="w-full h-full rounded-full bg-[#09090b] p-2 flex items-center justify-center border-2 border-black shadow-inner">
                  <button
                    type="button"
                    onClick={handlePulsarBotonRojo}
                    className={`w-full h-full rounded-full bg-gradient-to-b from-[#ff3834] via-[#d61e1b] to-[#7f1d1d] text-white flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-150 shadow-[inset_0_6px_12px_rgba(255,255,255,0.45),0_10px_20px_rgba(0,0,0,0.6)] animate-red-button-glow ${
                      isPressingBtn 
                        ? 'scale-90 translate-y-2 shadow-[inset_0_6px_14px_rgba(0,0,0,0.85)]' 
                        : 'hover:scale-[1.03] active:scale-95 active:translate-y-2'
                    }`}
                    title="Apretar aquí para iniciar el test"
                  >
                    {/* Reflejo superior de la cúpula convexa */}
                    <div className="w-20 sm:w-24 h-3 sm:h-3.5 bg-white/25 rounded-full blur-[1px] -mt-1 mb-1"></div>

                    <span className="text-xl sm:text-2xl md:text-3xl font-black uppercase tracking-wider text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.85)] leading-tight">
                      APRETAR
                    </span>
                    <span className="text-xl sm:text-2xl md:text-3xl font-black uppercase tracking-wider text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.85)] leading-tight">
                      AQUÍ
                    </span>
                  </button>
                </div>
              </div>
            </div>

          </div>

          {/* COLUMNA DERECHA: ESPACIO VACÍO CON EL MISMO ANCHO EXACTO (w-36 xl:w-44) PARA QUE EL CENTRO SEA 100% PERFECTO Y LA ARCADE TENGA AIRE */}
          <div className="hidden lg:block w-36 xl:w-44 shrink-0 pointer-events-none"></div>

        </div>

        {/* POSTERS EN PANTALLAS MÓVILES (SOLO 2 POSTERS PARA NO SATURAR) */}
        <div className="lg:hidden w-full flex items-center justify-around gap-4 mt-4 px-4 max-w-sm">
          <div className="relative rotate-2 shrink-0">
            <img src="/images/poster_retro2.png" alt="Poster Retro 2" className="w-24 sm:w-28 h-auto object-contain rounded-md drop-shadow-md" />
          </div>
          <div className="relative -rotate-2 shrink-0">
            <img src="/images/poster_retro.png" alt="Poster Retro Alien" className="w-24 sm:w-28 h-auto object-contain rounded-md drop-shadow-md" />
          </div>
        </div>

      </div>

      {/* Espaciador transparente para respirar el diorama del suelo */}
      <div className="w-full h-[360px] sm:h-[420px] md:h-[480px] pointer-events-none"></div>

      {/* =========================================================================
          VENTANA EMERGENTE CENTRAL: QUIZZ INSPIRADO EN CAJA DE PIZZA PLANET
          Con desenfoque suave y muy leve (bg-black/10 backdrop-blur-[3px]), bordes
          rectangulares tipo caja de pizza y botón "VER EN TIENDA" con filtro automático
          ========================================================================= */}
      {modalAbierto && (
        <div className="fixed inset-0 z-[400] bg-black/10 backdrop-blur-[3px] flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200 select-none font-fredoka">
          <div className="relative w-full max-w-2xl bg-white rounded-lg sm:rounded-xl border-4 sm:border-[6px] border-[#E52521] shadow-[0_25px_70px_rgba(229,37,33,0.35)] overflow-hidden flex flex-col justify-between max-h-[90vh]">

            {/* FRANJA SUPERIOR A CUADROS ROJOS Y BLANCOS (ESTILO CAJA DE PIZZA) */}
            <CheckeredStripe />

            {/* Botón de cerrar (X) */}
            <button
              onClick={() => setModalAbierto(false)}
              className="absolute top-5 right-4 w-8 h-8 rounded-full bg-slate-100 hover:bg-red-50 text-slate-500 hover:text-[#E52521] border border-slate-300 flex items-center justify-center text-sm font-black transition cursor-pointer z-30"
              title="Cerrar ventana"
            >
              ✕
            </button>

            {/* CONTENIDO INTERIOR DEL QUIZZ */}
            <div className="p-5 sm:p-8 flex-1 overflow-y-auto no-scrollbar">
              {!mostrarResultados ? (
                /* ================= MODO PREGUNTAS (1 A 7) ================= */
                <div className="flex flex-col items-center">
                  <div className="text-center w-full mb-6">
                    <div className="flex items-center justify-between text-xs font-black text-[#E52521] uppercase tracking-widest mb-2 px-1">
                      <span className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-[#E52521] animate-ping"></span>
                        <span>{preg.categoria}</span>
                      </span>
                      <span className="bg-red-50 px-3 py-1 rounded-full border border-red-200">
                        PREGUNTA {preg.numero}
                      </span>
                    </div>

                    {/* Barra de progreso en rojo Pizza Planet */}
                    <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden border border-slate-200 p-0.5">
                      <div
                        className="h-full bg-gradient-to-r from-red-500 via-rose-500 to-[#E52521] rounded-full transition-all duration-300 shadow-xs"
                        style={{ width: `${((preguntaActual + 1) / 7) * 100}%` }}
                      ></div>
                    </div>

                    <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-[#1e3a8a] uppercase mt-4 leading-snug">
                      {preg.pregunta}
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
                      {preg.subtitulo}
                    </p>
                  </div>

                  {/* 4 Opciones de la Trivia */}
                  <div className="grid grid-cols-1 gap-3 w-full mb-4">
                    {preg.opciones.map(opc => (
                      <button
                        key={opc.id}
                        type="button"
                        onClick={() => handleResponder(opc.tipo)}
                        className="text-left p-3.5 sm:p-4 rounded-xl bg-slate-50/80 hover:bg-red-50/70 border-2 border-slate-200 hover:border-[#E52521] transition-all flex items-center gap-3.5 group cursor-pointer active:scale-95 shadow-2xs"
                      >
                        <div className="w-8 h-8 rounded-lg bg-white text-[#E52521] border-2 border-[#E52521] group-hover:bg-[#E52521] group-hover:text-white flex items-center justify-center font-black text-xs sm:text-sm shrink-0 transition-colors shadow-xs">
                          {opc.letra}
                        </div>
                        <span className="text-xs sm:text-sm font-bold text-slate-800 group-hover:text-[#E52521] transition-colors leading-snug">
                          {opc.texto}
                        </span>
                      </button>
                    ))}
                  </div>

                  <div className="text-[11px] font-black text-slate-400 tracking-wider uppercase text-center mt-2">
                    TRIVIA SENSORIAL TOY STORE • PIZZA PLANET
                  </div>
                </div>
              ) : (
                /* ================= MODO RESULTADOS ================= */
                <div className="flex flex-col items-center animate-in fade-in zoom-in-95 duration-300">
                  <div className="text-center mb-6">
                    <span className="inline-block px-3.5 py-1 rounded-full bg-red-50 border border-red-200 text-[#E52521] text-[11px] font-black tracking-widest uppercase mb-2">
                      ¡RESULTADO CÓSMICO DE TU TRIVIA!
                    </span>
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-[#E52521] uppercase leading-tight">
                      {recomendacion.titulo}
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-600 font-medium mt-2 leading-relaxed max-w-lg mx-auto">
                      {recomendacion.descripcion}
                    </p>
                  </div>

                  {/* Secciones sugeridas */}
                  <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
                    <span className="text-xs font-black text-slate-400 uppercase">
                      Secciones recomendadas:
                    </span>
                    {recomendacion.categorias.map((cat, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 rounded-full bg-red-50 text-[#E52521] border border-red-300 text-xs font-black uppercase shadow-2xs"
                      >
                        {cat}
                      </span>
                    ))}
                  </div>

                  {/* Tarjetas de los 3 productos recomendados */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 w-full mb-6">
                    {recomendacion.productos.map(p => (
                      <div
                        key={p.id}
                        className="bg-slate-50/80 rounded-xl border-2 border-slate-200 p-3 flex flex-col justify-between text-center group hover:border-[#E52521] transition shadow-xs"
                      >
                        <div className="w-full h-28 rounded-lg bg-white flex items-center justify-center p-2 mb-2 group-hover:scale-105 transition-transform overflow-hidden shadow-2xs">
                          <img
                            src={p.imagen}
                            alt={p.nombre}
                            className="max-h-full max-w-full object-contain drop-shadow-sm"
                          />
                        </div>
                        <h4 className="text-xs font-bold text-slate-900 line-clamp-2 leading-tight mb-1.5">
                          {p.nombre}
                        </h4>
                        <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#a6d4f2] text-[#1e3a8a] text-[11px] font-black mx-auto">
                          ${Number(p.precio).toLocaleString('es-CO')}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Botones de acción */}
                  <div className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-md">
                    <button
                      onClick={() => {
                        setPreguntaActual(0);
                        setRespuestas([]);
                        setMostrarResultados(false);
                      }}
                      className="w-full sm:w-1/2 py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 font-black text-xs uppercase tracking-wider transition cursor-pointer"
                    >
                      Repetir Trivia
                    </button>

                    <button
                      onClick={() => {
                        setModalAbierto(false);
                        navigate(`/tienda?cat=${encodeURIComponent(recomendacion.categoriaFiltro)}`);
                      }}
                      className="w-full sm:w-1/2 py-2.5 px-4 rounded-xl bg-gradient-to-r from-red-500 to-[#E52521] hover:from-red-600 hover:to-red-700 text-white font-black text-xs uppercase tracking-wider transition shadow-md cursor-pointer"
                    >
                      Ver en Tienda
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* FRANJA INFERIOR A CUADROS ROJOS Y BLANCOS (ESTILO CAJA DE PIZZA) */}
            <CheckeredStripe />
          </div>
        </div>
      )}

    </RoomWrapper>
  );
}
