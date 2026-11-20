import React, { useState } from 'react';
import RoomWrapper from '../components/RoomWrapper';
import AndyCloudsWallpaper from '../components/AndyCloudsWallpaper';
import { useNavigate } from 'react-router-dom';
import { CATALOGO_REAL } from '../data/catalogoProductos';

export default function Explora() {
  const navigate = useNavigate();

  // Estado del modal y del quizz
  const [modalAbierto, setModalAbierto] = useState(false);
  const [preguntaActual, setPreguntaActual] = useState(0); // 0 a 6 (7 preguntas)
  const [respuestas, setRespuestas] = useState([]);
  const [mostrarResultados, setMostrarResultados] = useState(false);
  const [isPressingBtn, setIsPressingBtn] = useState(false);

  // Las 7 preguntas del Quizz de Pizza Planet
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
        { id: 'libre', letra: 'D', texto: '¡Me dejo llevar por la curiosidad de lo que surja según el día!', tipo: 'sorpresa' }
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

  // Abrir Quizz al pulsar el botón rojo
  const handlePulsarBotonRojo = () => {
    setIsPressingBtn(true);
    setTimeout(() => {
      setIsPressingBtn(false);
      setPreguntaActual(0);
      setRespuestas([]);
      setMostrarResultados(false);
      setModalAbierto(true);
    }, 250);
  };

  // Manejar respuesta
  const handleResponder = (tipo) => {
    const nuevas = [...respuestas, tipo];
    setRespuestas(nuevas);

    if (preguntaActual < preguntasQuizz.length - 1) {
      setPreguntaActual(preguntaActual + 1);
    } else {
      setMostrarResultados(true);
    }
  };

  // Calcular recomendaciones personalizadas de CATALOGO_REAL
  const getRecomendaciones = () => {
    const conteo = respuestas.reduce((acc, r) => {
      acc[r] = (acc[r] || 0) + 1;
      return acc;
    }, {});

    // Perfil dominante
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

    // Default: sonico / suave
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
        @keyframes pulseGlow {
          0%, 100% { box-shadow: 0 0 25px rgba(239, 68, 68, 0.4), inset 0 0 15px rgba(255, 255, 255, 0.3); }
          50% { box-shadow: 0 0 50px rgba(239, 68, 68, 0.8), inset 0 0 25px rgba(255, 255, 255, 0.6); }
        }
        .animate-red-btn-glow {
          animation: pulseGlow 2.5s ease-in-out infinite;
        }
        @keyframes neonBillboard {
          0%, 100% { filter: drop-shadow(0 0 15px rgba(52, 211, 153, 0.4)); }
          50% { filter: drop-shadow(0 0 30px rgba(52, 211, 153, 0.8)); }
        }
        .animate-neon-billboard {
          animation: neonBillboard 4s ease-in-out infinite;
        }
      `}</style>

      {/* CONTENEDOR DE LA PÁGINA */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 pt-6 sm:pt-10 pb-20 font-fredoka select-none flex flex-col items-center justify-center min-h-[80vh]">
        
        {/* =========================================================================
            1. CARTEL TIPO PIZZA PLANET SÚPER FUTURISTA
            ========================================================================= */}
        <div className="w-full bg-slate-950/90 rounded-[2.5rem] sm:rounded-[3.2rem] border-4 sm:border-[6px] border-emerald-400 shadow-[0_20px_70px_rgba(16,185,129,0.35)] ring-4 ring-emerald-500/20 p-6 sm:p-10 text-center relative overflow-hidden backdrop-blur-md animate-neon-billboard mb-10 sm:mb-14">
          
          {/* Insignia superior de Pizza Planet */}
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="w-3 h-3 rounded-full bg-emerald-400 animate-ping"></span>
            <span className="px-3.5 py-1 rounded-full bg-emerald-950 border border-emerald-500/50 text-[10px] sm:text-xs font-black tracking-widest text-emerald-300 uppercase">
              PIZZA PLANET • TERMINAL INTERACTIVA
            </span>
            <span className="w-3 h-3 rounded-full bg-emerald-400 animate-ping"></span>
          </div>

          {/* Gran Pregunta del Cartel */}
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-tight uppercase leading-tight drop-shadow-md">
            ¿QUIERES EXPLORARTE Y NO SABES POR DÓNDE EMPEZAR?
          </h1>

          <p className="text-slate-300 text-xs sm:text-base font-medium mt-3 max-w-2xl mx-auto leading-relaxed">
            Presiona el botón central para iniciar una trivia de 7 preguntas. Nuestro sistema cósmico analizará tus gustos para revelarte tus juguetes, lencería y sensaciones ideales.
          </p>

          {/* Remaches metálicos decorativos en las esquinas */}
          <div className="absolute top-4 left-4 w-3 h-3 rounded-full bg-slate-700 border border-slate-500"></div>
          <div className="absolute top-4 right-4 w-3 h-3 rounded-full bg-slate-700 border border-slate-500"></div>
          <div className="absolute bottom-4 left-4 w-3 h-3 rounded-full bg-slate-700 border border-slate-500"></div>
          <div className="absolute bottom-4 right-4 w-3 h-3 rounded-full bg-slate-700 border border-slate-500"></div>
        </div>

        {/* =========================================================================
            2. BOTÓN ROJO GRANDE EN TODA LA MITAD DE LA PÁGINA
            ========================================================================= */}
        <div className="flex flex-col items-center relative my-2">
          
          {/* Aro exterior cromado / industrial */}
          <div className="w-56 h-56 sm:w-64 sm:h-64 rounded-full bg-gradient-to-b from-slate-200 via-slate-400 to-slate-700 p-4 sm:p-5 shadow-[0_25px_60px_rgba(0,0,0,0.6)] flex items-center justify-center border-2 border-slate-400/80">
            
            {/* Aro de advertencia neón */}
            <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center ring-4 ring-rose-500/40 p-2 sm:p-2.5">
              
              {/* CÚPULA DEL BOTÓN ROJO TÁCTIL 3D */}
              <button
                type="button"
                onClick={handlePulsarBotonRojo}
                className={`w-full h-full rounded-full bg-gradient-to-b from-red-500 via-rose-600 to-red-800 text-white font-black flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-200 shadow-[inset_0_8px_16px_rgba(255,255,255,0.45),0_15px_30px_rgba(159,18,57,0.7)] animate-red-btn-glow ${
                  isPressingBtn 
                    ? 'scale-90 translate-y-3 shadow-inner' 
                    : 'hover:scale-105 active:scale-95 active:translate-y-2'
                }`}
                title="Presionar aquí para abrir la trivia"
              >
                <span className="text-xl sm:text-2xl md:text-3xl font-black uppercase tracking-wider drop-shadow-md leading-tight">
                  PRESIONAR
                </span>
                <span className="text-xl sm:text-2xl md:text-3xl font-black uppercase tracking-wider drop-shadow-md leading-tight">
                  AQUÍ
                </span>
                <span className="text-[9px] sm:text-[10px] font-bold tracking-widest text-rose-200 mt-1 uppercase opacity-90">
                  INICIAR QUIZZ
                </span>
              </button>

            </div>

          </div>

          {/* Marcianitos de Pizza Planet animando al usuario */}
          <div className="mt-8 flex items-center gap-4 bg-slate-900/90 border border-emerald-400/40 rounded-2xl p-3.5 sm:p-4 max-w-md shadow-xl backdrop-blur-md">
            <img 
              src="/images/aliens_friends.png" 
              alt="Marcianitos de Pizza Planet"
              className="w-14 sm:w-16 h-auto object-contain shrink-0 drop-shadow-lg"
            />
            <p className="text-xs sm:text-sm text-emerald-200 font-medium italic">
              “¡Ooooh! ¡El gran botón de La Garra! Púlsalo para descubrir tu universo ideal en Toy Store.”
            </p>
          </div>

        </div>

      </div>

      {/* =========================================================================
          3. VENTANA EMERGENTE CENTRAL: QUIZZ / TRIVIA DE 7 PREGUNTAS
          ========================================================================= */}
      {modalAbierto && (
        <div className="fixed inset-0 z-[300] bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200 select-none font-fredoka">
          
          <div className="relative w-full max-w-2xl bg-slate-950 rounded-[2.5rem] border-4 border-emerald-400 shadow-[0_0_60px_rgba(16,185,129,0.5)] p-6 sm:p-9 overflow-hidden flex flex-col justify-between max-h-[92vh]">
            
            {/* Botón de cerrar (X) */}
            <button
              onClick={() => setModalAbierto(false)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center text-sm font-black transition cursor-pointer z-30"
              title="Cerrar ventana"
            >
              ✕
            </button>

            {!mostrarResultados ? (
              /* MODO PREGUNTAS (1 A 7) */
              <div className="flex flex-col items-center">
                
                {/* Cabecera con Fase y Progreso */}
                <div className="text-center w-full mb-6">
                  <div className="flex items-center justify-between text-xs font-black text-emerald-400 uppercase tracking-widest mb-2 px-1">
                    <span>{preg.categoria}</span>
                    <span>PREGUNTA {preg.numero}</span>
                  </div>

                  {/* Barra de energía verde neón */}
                  <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden border border-slate-700 p-0.5">
                    <div 
                      className="h-full bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-300 rounded-full transition-all duration-300 shadow-[0_0_8px_#10b981]"
                      style={{ width: `${((preguntaActual + 1) / 7) * 100}%` }}
                    ></div>
                  </div>

                  <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-white uppercase mt-4 leading-snug">
                    {preg.pregunta}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-400 font-medium mt-1">
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
                      className="text-left p-3.5 sm:p-4 rounded-2xl bg-slate-900/90 hover:bg-emerald-950/60 border-2 border-slate-700 hover:border-emerald-400 transition-all flex items-center gap-3.5 group cursor-pointer active:scale-95 shadow-sm"
                    >
                      <div className="w-8 h-8 rounded-xl bg-slate-800 text-emerald-300 border border-slate-600 group-hover:bg-emerald-500 group-hover:text-slate-950 group-hover:border-emerald-300 flex items-center justify-center font-black text-xs sm:text-sm shrink-0 transition-colors">
                        {opc.letra}
                      </div>
                      <span className="text-xs sm:text-sm font-semibold text-slate-200 group-hover:text-white leading-snug">
                        {opc.texto}
                      </span>
                    </button>
                  ))}
                </div>

                {/* Pie con indicador de avance */}
                <div className="text-[11px] font-black text-slate-500 tracking-wider uppercase">
                  TRIVIA SENSORIAL TOY STORE • PIZZA PLANET
                </div>

              </div>
            ) : (
              /* MODO RESULTADOS: RECOMENDACIÓN DE PRODUCTOS Y LENCERÍA */
              <div className="flex flex-col items-center animate-in fade-in zoom-in-95 duration-300 overflow-y-auto no-scrollbar max-h-[80vh] pr-1">
                
                {/* Cabecera del Resultado */}
                <div className="text-center mb-6">
                  <span className="inline-block px-3.5 py-1 rounded-full bg-emerald-950 border border-emerald-500/50 text-emerald-300 text-[11px] font-black tracking-widest uppercase mb-2">
                    ¡RESULTADO CÓSMICO DE TU TRIVIA!
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-black text-white uppercase leading-tight">
                    {recomendacion.titulo}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-300 font-medium mt-2 leading-relaxed max-w-lg mx-auto">
                    {recomendacion.descripcion}
                  </p>
                </div>

                {/* Categorías recomendadas */}
                <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
                  <span className="text-xs font-black text-slate-400 uppercase">
                    Secciones sugeridas:
                  </span>
                  {recomendacion.categorias.map((cat, idx) => (
                    <span 
                      key={idx}
                      className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-black uppercase"
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
                      className="bg-slate-900 rounded-2xl border border-emerald-500/30 p-3 flex flex-col justify-between text-center group hover:border-emerald-400 transition"
                    >
                      <div className="w-full h-28 rounded-xl bg-slate-950 flex items-center justify-center p-2 mb-2 group-hover:scale-105 transition-transform overflow-hidden">
                        <img 
                          src={p.imagen} 
                          alt={p.nombre} 
                          className="max-h-full max-w-full object-contain drop-shadow-md"
                        />
                      </div>
                      <h4 className="text-xs font-bold text-white line-clamp-2 leading-tight mb-1.5">
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
                    className="w-full sm:w-1/2 py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-emerald-300 border border-slate-600 font-black text-xs uppercase tracking-wider transition cursor-pointer"
                  >
                    Repetir Trivia
                  </button>

                  <button
                    onClick={() => {
                      setModalAbierto(false);
                      navigate(`/tienda?categoria=${recomendacion.categoriaFiltro}`);
                    }}
                    className="w-full sm:w-1/2 py-2.5 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-black text-xs uppercase tracking-wider transition shadow-md cursor-pointer"
                  >
                    Ver en Tienda
                  </button>
                </div>

              </div>
            )}

          </div>

        </div>
      )}

    </RoomWrapper>
  );
}
