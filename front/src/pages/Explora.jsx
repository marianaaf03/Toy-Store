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

// Lluvia de rodajas de pizza flotando y cayendo desde el cielo con transparencia sutil
const RAINING_PIZZAS = [
  { id: 1, left: '5%', size: 'w-10 sm:w-12', duration: '9s', delay: '0s', opacity: 0.32 },
  { id: 2, left: '14%', size: 'w-8 sm:w-9', duration: '12s', delay: '3s', opacity: 0.25 },
  { id: 3, left: '23%', size: 'w-11 sm:w-13', duration: '10s', delay: '1s', opacity: 0.30 },
  { id: 4, left: '35%', size: 'w-9 sm:w-10', duration: '14s', delay: '5s', opacity: 0.24 },
  { id: 5, left: '46%', size: 'w-12 sm:w-14', duration: '11s', delay: '2s', opacity: 0.28 },
  { id: 6, left: '57%', size: 'w-8 sm:w-10', duration: '13s', delay: '6s', opacity: 0.22 },
  { id: 7, left: '68%', size: 'w-11 sm:w-13', duration: '9.5s', delay: '0.5s', opacity: 0.33 },
  { id: 8, left: '79%', size: 'w-9 sm:w-11', duration: '15s', delay: '4s', opacity: 0.26 },
  { id: 9, left: '89%', size: 'w-10 sm:w-12', duration: '11.5s', delay: '2.5s', opacity: 0.29 },
  { id: 10, left: '10%', size: 'w-11 sm:w-13', duration: '13.5s', delay: '7s', opacity: 0.25 },
  { id: 11, left: '62%', size: 'w-10 sm:w-12', duration: '10.5s', delay: '4.5s', opacity: 0.30 },
  { id: 12, left: '94%', size: 'w-8 sm:w-9', duration: '14.5s', delay: '8s', opacity: 0.22 },
];

export default function Explora() {
  const navigate = useNavigate();

  // Estados del quizz y del modal
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
    >
      <style>{`
        @keyframes rainPizzaAnim {
          0% {
            transform: translateY(-90px) rotate(0deg);
          }
          100% {
            transform: translateY(115vh) rotate(360deg);
          }
        }
        .animate-pizza-fall {
          animation-name: rainPizzaAnim;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
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
      `}</style>

      {/* =========================================================================
          EFECTO ESPECIAL: LLUVIA DE RODAJAS DE PIZZA CAYENDO DESDE EL TECHO
          Con transparencia sutil para ambientar sin saturar la lectura
          ========================================================================= */}
      <div className="fixed inset-0 pointer-events-none z-[5] overflow-hidden">
        {RAINING_PIZZAS.map((p) => (
          <div
            key={p.id}
            className={`absolute top-0 animate-pizza-fall select-none ${p.size}`}
            style={{
              left: p.left,
              animationDuration: p.duration,
              animationDelay: p.delay,
              opacity: p.opacity
            }}
          >
            <img 
              src="/images/rodaja_pizza.png" 
              alt="Rodaja de Pizza Planet"
              className="w-full h-auto object-contain filter drop-shadow-xs" 
            />
          </div>
        ))}
      </div>

      {/* =========================================================================
          CONTENEDOR PRINCIPAL: ESPACIADO FLUIDO IDÉNTICO A LAS DEMÁS PÁGINAS
          Con altura completa para que el cartel quede en la pared y la máquina en el suelo
          ========================================================================= */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 md:px-8 pt-20 sm:pt-24 md:pt-28 pb-4 font-fredoka select-none flex-1 flex flex-col justify-between items-center min-h-[calc(100vh-80px)]">
        
        {/* =====================================================================
            1. ZONA PARED: CARTEL REDIMENSIONADO + CUADRO COHETE PIZZA PLANET
            Ambos ubicados sobre el tapiz verde alien con espacio de sobra de la navbar
            ===================================================================== */}
        <div className="w-full flex flex-col md:flex-row items-center justify-center gap-4 sm:gap-6 md:gap-8 lg:gap-12 mt-2 mb-4">
          
          {/* Cartel más pequeño y proporcionado */}
          <div className="w-full max-w-[420px] sm:max-w-[480px] md:max-w-[530px] flex justify-center transition-transform hover:scale-[1.01] duration-300">
            <img 
              src="/images/cartel_aliens.png" 
              onError={(e) => { e.target.src = '/images/letrero_aliens.png'; }}
              alt="¿Quieres explorarte y no sabes por dónde empezar? - Pizza Planet"
              className="w-full h-auto object-contain drop-shadow-[0_15px_35px_rgba(0,0,0,0.25)] rounded-2xl sm:rounded-3xl border-2 border-white/80"
            />
          </div>

          {/* Cuadro de Pizza Planet colgado en la pared al lado del cartel */}
          <div className="shrink-0 flex justify-center transition-all duration-300 hover:rotate-0 hover:scale-105 cursor-pointer">
            <div className="relative rotate-2 drop-shadow-[0_15px_25px_rgba(0,0,0,0.3)]">
              <img 
                src="/images/cuadro_aliens.png" 
                alt="Cuadro Cohete Pizza Planet"
                className="w-28 sm:w-36 md:w-40 lg:w-44 h-auto object-contain rounded-xl"
              />
            </div>
          </div>

        </div>

        {/* =====================================================================
            2. ZONA CENTRAL: EL GRAN BOTÓN ROJO 3D ("PRESIONAR AQUÍ")
            ===================================================================== */}
        <div className="flex flex-col items-center my-auto py-2">

          {/* Aro exterior metálico / cromado */}
          <div className="w-44 h-44 sm:w-52 sm:h-52 md:w-56 md:h-56 rounded-full bg-gradient-to-b from-slate-200 via-slate-400 to-slate-700 p-3.5 sm:p-4 shadow-[0_20px_50px_rgba(0,0,0,0.4)] flex items-center justify-center border-2 border-slate-300/80">

            {/* Aro de advertencia neón rojo */}
            <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center ring-4 ring-[#E52521]/40 p-2 sm:p-2.5">

              {/* CÚPULA 3D DEL BOTÓN ROJO TÁCTIL */}
              <button
                type="button"
                onClick={handlePulsarBotonRojo}
                className={`w-full h-full rounded-full bg-gradient-to-b from-[#ff3834] via-[#E52521] to-[#991b1b] text-white font-black flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-200 shadow-[inset_0_8px_16px_rgba(255,255,255,0.5),0_15px_30px_rgba(153,27,27,0.7)] animate-red-button-glow ${
                  isPressingBtn 
                    ? 'scale-90 translate-y-3 shadow-inner' 
                    : 'hover:scale-105 active:scale-95 active:translate-y-2'
                }`}
                title="Presionar aquí para abrir el quizz"
              >
                <span className="text-lg sm:text-2xl md:text-2xl font-black uppercase tracking-wider drop-shadow-md leading-tight">
                  PRESIONAR
                </span>
                <span className="text-lg sm:text-2xl md:text-2xl font-black uppercase tracking-wider drop-shadow-md leading-tight">
                  AQUÍ
                </span>
                <span className="text-[9px] sm:text-[10px] font-bold tracking-widest text-red-200 mt-0.5 uppercase opacity-90">
                  INICIAR QUIZZ
                </span>
              </button>

            </div>

          </div>

        </div>

        {/* =====================================================================
            3. ZONA SUELO DE MADERA: MÁQUINA DE LA GARRA CON ALIENS ADENTRO
            Ubicada exactamente en el suelo de madera, tal como los juguetes en Inicio
            ===================================================================== */}
        <div className="w-full flex items-end justify-between sm:justify-end px-2 sm:px-8 mt-2 pb-2">
          
          {/* Diálogo de los marcianitos */}
          <div className="hidden sm:flex items-center gap-3 bg-white/95 border-2 border-slate-200 rounded-2xl p-2.5 sm:p-3 max-w-xs shadow-lg backdrop-blur-md mb-4 mr-4">
            <img
              src="/images/aliens_friends.png"
              alt="Marcianitos Pizza Planet"
              className="w-10 sm:w-12 h-auto object-contain shrink-0"
            />
            <p className="text-[11px] sm:text-xs text-[#1e3a8a] font-bold italic leading-tight">
              “¡Ooooh! ¡Nuestra máquina de La Garra en el suelo! Pulsa el botón para tu viaje sensorial.”
            </p>
          </div>

          {/* Máquina de los Aliens en el suelo */}
          <div className="relative group transition-transform duration-300 hover:scale-105 cursor-pointer ml-auto">
            <img 
              src="/images/maquina_aliens.png" 
              alt="Máquina de Marcianitos Pizza Planet"
              className="w-36 sm:w-48 md:w-56 lg:w-64 h-auto object-contain drop-shadow-[0_15px_30px_rgba(0,0,0,0.55)]"
            />
            {/* Sombra de contacto realista en la madera */}
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4/5 h-3 bg-black/50 blur-md rounded-full pointer-events-none"></div>
          </div>

        </div>

      </div>

      {/* =========================================================================
          3. VENTANA EMERGENTE CENTRAL: QUIZZ INSPIRADO EN EL CARTEL DE PIZZA PLANET
          Con franjas a cuadros rojos y blancos, tipografía nítida y estética limpia
          ========================================================================= */}
      {modalAbierto && (
        <div className="fixed inset-0 z-[300] bg-black/75 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200 select-none font-fredoka">

          <div className="relative w-full max-w-2xl bg-white rounded-[2rem] sm:rounded-[2.5rem] border-4 sm:border-[6px] border-[#E52521] shadow-[0_25px_80px_rgba(229,37,33,0.35)] overflow-hidden flex flex-col justify-between max-h-[92vh]">
            
            {/* FRANJA SUPERIOR A CUADROS ROJOS Y BLANCOS (IDÉNTICA AL CARTEL) */}
            <CheckeredStripe />

            {/* Botón de cerrar (X) */}
            <button
              onClick={() => setModalAbierto(false)}
              className="absolute top-6 right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-red-50 text-slate-500 hover:text-[#E52521] border border-slate-300 flex items-center justify-center text-sm font-black transition cursor-pointer z-30"
              title="Cerrar ventana"
            >
              ✕
            </button>

            {/* CONTENIDO INTERIOR DEL QUIZZ */}
            <div className="p-5 sm:p-8 flex-1 overflow-y-auto no-scrollbar">

              {!mostrarResultados ? (
                /* ================= MODO PREGUNTAS (1 A 7) ================= */
                <div className="flex flex-col items-center">
                  
                  {/* Cabecera con Fase y Progreso */}
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
                        className="text-left p-3.5 sm:p-4 rounded-2xl bg-slate-50/80 hover:bg-red-50/70 border-2 border-slate-200 hover:border-[#E52521] transition-all flex items-center gap-3.5 group cursor-pointer active:scale-95 shadow-2xs"
                      >
                        <div className="w-8 h-8 rounded-xl bg-white text-[#E52521] border-2 border-[#E52521] group-hover:bg-[#E52521] group-hover:text-white flex items-center justify-center font-black text-xs sm:text-sm shrink-0 transition-colors shadow-xs">
                          {opc.letra}
                        </div>
                        <span className="text-xs sm:text-sm font-bold text-slate-800 group-hover:text-[#E52521] transition-colors leading-snug">
                          {opc.texto}
                        </span>
                      </button>
                    ))}
                  </div>

                  {/* Pie con indicador temático */}
                  <div className="text-[11px] font-black text-slate-400 tracking-wider uppercase text-center mt-2">
                    TRIVIA SENSORIAL TOY STORE • PIZZA PLANET
                  </div>

                </div>
              ) : (
                /* ================= MODO RESULTADOS: RECOMENDACIÓN DE PRODUCTOS Y LENCERÍA ================= */
                <div className="flex flex-col items-center animate-in fade-in zoom-in-95 duration-300">
                  
                  {/* Cabecera del Resultado */}
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

                  {/* Tarjetas de los 3 productos recomendados de CATALOGO_REAL */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 w-full mb-6">
                    {recomendacion.productos.map(p => (
                      <div 
                        key={p.id}
                        className="bg-slate-50/80 rounded-2xl border-2 border-slate-200 p-3 flex flex-col justify-between text-center group hover:border-[#E52521] transition shadow-xs"
                      >
                        <div className="w-full h-28 rounded-xl bg-white flex items-center justify-center p-2 mb-2 group-hover:scale-105 transition-transform overflow-hidden shadow-2xs">
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
                        navigate(`/tienda?categoria=${recomendacion.categoriaFiltro}`);
                      }}
                      className="w-full sm:w-1/2 py-2.5 px-4 rounded-xl bg-gradient-to-r from-red-500 to-[#E52521] hover:from-red-600 hover:to-red-700 text-white font-black text-xs uppercase tracking-wider transition shadow-md cursor-pointer"
                    >
                      Ver en Tienda
                    </button>
                  </div>

                </div>
              )}

            </div>

            {/* FRANJA INFERIOR A CUADROS ROJOS Y BLANCOS (IDÉNTICA AL CARTEL) */}
            <CheckeredStripe />

          </div>

        </div>
      )}

    </RoomWrapper>
  );
}
