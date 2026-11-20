import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RoomWrapper from '../components/RoomWrapper';
import AndyCloudsWallpaper from '../components/AndyCloudsWallpaper';

export default function Vestier() {
  const navigate = useNavigate();

  // Prendas exclusivas del catálogo para probar
  const prendasVestier = [
    {
      id: 1,
      nombre: 'Conjunto Cowgirl Jessie',
      tipo: 'Bralette + Liguero + Panty',
      precio: 115000,
      imagen: '/images/lenceria_andy.png',
      descripcion: 'Nuestra pieza insignia temática vaquera. Encaje suave elastizado, lazos de satén rojo carmín y liguero regulable.',
      detalles: ['Sin varillas incómodas', 'Liguero y tirantes regulables', 'Broches inoxidables reforzados']
    },
    {
      id: 2,
      nombre: 'Baby Doll de Satén & Copas de Encaje',
      tipo: 'Camisón de Satén Seda',
      precio: 135000,
      imagen: '/images/babydoll.png',
      descripcion: 'Caída ligera y sedosa con escote drapeado en encaje transparente y espalda descubierta con lazos de ajuste.',
      detalles: ['Satén hipoalergénico fresco', 'Tacto ultrasuave tipo seda', 'Incluye panty a juego']
    },
    {
      id: 3,
      nombre: 'Body de Encaje Noir con Escote en V',
      tipo: 'Enterizo Sensual Elastizado',
      precio: 120000,
      imagen: '/images/bodydeencaje.png',
      descripcion: 'Diseño anatómico con transparencias estratégicas que abrazan las curvas con soporte cómodo y broche inferior.',
      detalles: ['Microfibra elastizada', 'Escote pronunciado en V', 'Apertura inferior de liberación rápida']
    },
    {
      id: 4,
      nombre: 'Bata Kimono Corta en Seda Satinada',
      tipo: 'Prenda de Salto de Cama',
      precio: 140000,
      imagen: '/images/batakimono.png',
      descripcion: 'Prenda sugerente y sedosa con cinturón de amarre y mangas acampanadas, ideal para lucir sobre la lencería.',
      detalles: ['Cinturón ajustable en satén', 'Mangas tipo kimono amplias', 'Tejido sedoso de baja fricción']
    },
    {
      id: 5,
      nombre: 'Arnés Corporal de Tiras Regulables',
      tipo: 'Accesorio de Moda Íntima',
      precio: 95000,
      imagen: '/images/arnescorporal.png',
      descripcion: 'Arnés moderno con herrajes dorados inoxidables y elásticos suaves que enmarcan el busto y el torso con estilo audaz.',
      detalles: ['100% regulable para cualquier talla', 'Herrajes inoxidables dorados', 'Elásticos suaves antirozaduras']
    },
    {
      id: 6,
      nombre: 'Conjunto Lencería Galáctica Space',
      tipo: 'Bralette + Panty Futurista',
      precio: 118000,
      imagen: '/images/lenceriabuzzmujer.png',
      descripcion: 'Diseño vanguardista inspirado en el espacio exterior con acabados satinados brillantes y detalles violetas y verdes.',
      detalles: ['Copas con soporte suave', 'Detalles satinados metalizados', 'Elásticos de compresión media']
    }
  ];

  const [prendaSeleccionada, setPrendaSeleccionada] = useState(prendasVestier[0]);
  const [busto, setBusto] = useState(90);
  const [cintura, setCintura] = useState(70);
  const [cadera, setCadera] = useState(95);
  const [fotoUsuario, setFotoUsuario] = useState(null);
  const [toast, setToast] = useState('');

  // Cálculo automático de talla inteligente
  const calcularTalla = () => {
    if (busto <= 88 && cintura <= 68 && cadera <= 94) {
      return { talla: 'S', equivalente: '32B - 34A', nota: 'Ajuste ceñido ideal para contexturas esbeltas.' };
    }
    if (busto <= 96 && cintura <= 76 && cadera <= 102) {
      return { talla: 'M', equivalente: '34B - 36A', nota: 'Tu silueta se encuentra en el rango medio más equilibrado.' };
    }
    if (busto <= 104 && cintura <= 84 && cadera <= 110) {
      return { talla: 'L', equivalente: '36B - 38A', nota: 'Comodidad total con excelente realce y soporte en copas.' };
    }
    return { talla: 'XL', equivalente: '38B - 40B', nota: 'Ajuste generoso con total libertad de movimiento y elásticos reforzados.' };
  };

  const recomendacion = calcularTalla();

  // Añadir look al carrito oficial
  const anadirLookAlCarrito = () => {
    try {
      const stored = localStorage.getItem('toy_carrito') || localStorage.getItem('toy_cart') || '[]';
      const actual = JSON.parse(stored);
      const existe = actual.find(i => i.id === prendaSeleccionada.id);
      let actualizado;
      if (existe) {
        actualizado = actual.map(i => i.id === prendaSeleccionada.id ? { ...i, cantidad: i.cantidad + 1 } : i);
      } else {
        actualizado = [...actual, { ...prendaSeleccionada, cantidad: 1, tallaElegida: recomendacion.talla }];
      }
      localStorage.setItem('toy_carrito', JSON.stringify(actualizado));
      localStorage.setItem('toy_cart', JSON.stringify(actualizado));
      setToast(`¡Añadiste "${prendaSeleccionada.nombre}" en talla ${recomendacion.talla} al carrito!`);
      setTimeout(() => setToast(''), 3000);
    } catch {
      setToast(`¡Look añadido con éxito!`);
      setTimeout(() => setToast(''), 3000);
    }
  };

  return (
    <RoomWrapper 
      theme="jessie" 
      wallpaperContent={<AndyCloudsWallpaper />}
      hideFloorToys={true}
    >
      <style>{`
        @keyframes floatMirror {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-3px); }
        }
        .animate-mirror-glow {
          animation: floatMirror 5s ease-in-out infinite;
        }
      `}</style>

      {/* TOAST FLOTANTE DE NOTIFICACIÓN */}
      {toast && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[500] bg-[#1e3a8a] text-white px-6 py-3 rounded-full shadow-2xl border-2 border-[#a6d4f2] text-xs sm:text-sm font-black flex items-center gap-2.5 animate-in fade-in duration-300">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
          <span>{toast}</span>
        </div>
      )}

      {/* CONTENEDOR PRINCIPAL */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 pt-4 sm:pt-6 pb-28 font-fredoka select-none flex flex-col items-center">
        
        {/* =========================================================================
            1. BANNER COLGANTE DE LA NUBE: EL VESTIER DE JESSIE
            ========================================================================= */}
        <div className="w-full relative flex flex-col items-center mb-8">
          
          {/* Cuerdas colgantes con remaches dorados que conectan al techo/nube */}
          <div className="w-full max-w-md flex justify-between px-16 -mb-1 relative z-0">
            <div className="w-[3.5px] h-9 sm:h-12 bg-gradient-to-b from-slate-400 via-amber-600 to-amber-700 shadow-xs relative">
              <div className="w-2.5 h-2.5 rounded-full bg-[#facc15] border border-[#78350f] absolute -top-1 -left-[3px]"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-[#facc15] border border-[#78350f] absolute -bottom-1 -left-[3px]"></div>
            </div>
            <div className="w-[3.5px] h-9 sm:h-12 bg-gradient-to-b from-slate-400 via-amber-600 to-amber-700 shadow-xs relative">
              <div className="w-2.5 h-2.5 rounded-full bg-[#facc15] border border-[#78350f] absolute -top-1 -left-[3px]"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-[#facc15] border border-[#78350f] absolute -bottom-1 -left-[3px]"></div>
            </div>
          </div>

          {/* Placa Principal del Vestier */}
          <div className="w-full bg-white/95 backdrop-blur-md rounded-[2.5rem] p-6 sm:p-7 shadow-[0_16px_40px_rgba(217,119,6,0.18)] border-4 border-[#a6d4f2] text-center relative z-10">
            <span className="inline-block px-4 py-1.5 rounded-full bg-amber-50 text-amber-800 text-[11px] font-black tracking-widest uppercase border border-amber-200 mb-2">
              Probador Virtual Interactivo • Edición Jessie
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#1e3a8a] tracking-tight uppercase leading-tight">
              El Vestier de Jessie
            </h1>
            <p className="mt-1 text-xs sm:text-sm md:text-base text-slate-600 max-w-2xl mx-auto font-medium">
              Prueba conjuntos en tiempo real sobre el maniquí virtual, simula tu silueta y calcula tu talla recomendada antes de añadir a tu baúl.
            </p>
            {/* Pill de innovación para la sustentación del SENA */}
            <div className="mt-3 inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#1e3a8a] text-[10px] font-bold">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
              <span>Módulo Simulador v1.0 • Roadmap SENA: Fase 2 Proyectada con IA Generativa</span>
            </div>
          </div>
        </div>

        {/* =========================================================================
            2. LAYOUT DUAL: ESPEJO PROBADOR (IZQ) + PERCHERO Y ASESOR DE TALLAS (DER)
            ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 w-full items-start">
          
          {/* =========================================================================
              LADO IZQUIERDO: EL ESPEJO DE TOCADOR & SILUETA VIRTUAL (5 Columnas)
              ========================================================================= */}
          <div className="lg:col-span-5 w-full flex flex-col items-center">
            
            {/* Marco de Espejo de Tocador estilo camerino con bombillas y borde amaderado */}
            <div className="w-full max-w-[420px] bg-gradient-to-b from-[#fed7aa] via-amber-100 to-[#fed7aa] p-5 sm:p-6 rounded-[3.5rem] border-4 border-[#ca8a04] shadow-[0_25px_50px_rgba(0,0,0,0.25)] relative animate-mirror-glow flex flex-col items-center">
              
              {/* Bombillas decorativas de tocador */}
              <div className="absolute -top-3 inset-x-12 flex justify-between px-4 pointer-events-none">
                <div className="w-4 h-4 rounded-full bg-amber-200 border-2 border-amber-400 shadow-[0_0_10px_#fef08a]"></div>
                <div className="w-4 h-4 rounded-full bg-amber-200 border-2 border-amber-400 shadow-[0_0_10px_#fef08a]"></div>
                <div className="w-4 h-4 rounded-full bg-amber-200 border-2 border-amber-400 shadow-[0_0_10px_#fef08a]"></div>
              </div>

              {/* Corona del espejo con sombrero vaquero o lazo de Jessie */}
              <div className="w-full flex items-center justify-between pb-3 border-b-2 border-amber-300/80 mb-4 px-2">
                <span className="text-[10px] font-black uppercase tracking-widest text-[#78350f]">
                  Espejo Mágico • Toy Store
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-white/90 text-amber-800 text-[9px] font-black uppercase border border-amber-200">
                  Reflejo en Vivo
                </span>
              </div>

              {/* Cristal del Espejo con Reflejo */}
              <div className="w-full h-[400px] sm:h-[440px] bg-gradient-to-b from-sky-50 via-white to-sky-100/60 rounded-[2.8rem] border-3 border-white shadow-inner relative flex flex-col items-center justify-center p-4 overflow-hidden">
                
                {/* Reflejo diagonal de luz sobre el cristal */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/30 to-transparent pointer-events-none"></div>
                
                {/* Camafeo superior: Foto del usuario o avatar */}
                <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center">
                  <div className="w-14 h-14 rounded-full bg-white border-3 border-[#a6d4f2] shadow-md overflow-hidden flex items-center justify-center relative group">
                    {fotoUsuario ? (
                      <img src={fotoUsuario} alt="Foto usuario" className="w-full h-full object-cover" />
                    ) : (
                      <svg className="w-8 h-8 text-[#1e3a8a]/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    )}
                  </div>
                  <label className="mt-1 text-[9px] font-black text-[#1e3a8a] bg-white/90 px-2 py-0.5 rounded-full border border-sky-200 shadow-xs cursor-pointer hover:bg-sky-50 transition">
                    {fotoUsuario ? 'Cambiar foto' : '+ Tu foto'}
                    <input 
                      type="file" 
                      accept="image/*" 
                      className="hidden" 
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onload = (ev) => setFotoUsuario(ev.target?.result);
                          reader.readAsDataURL(file);
                        }
                      }} 
                    />
                  </label>
                </div>

                {/* Silueta / Maniquí elegante vestido con la prenda seleccionada */}
                <div className="relative z-10 flex flex-col items-center justify-center mt-12 transition-all duration-300">
                  <div className="relative flex items-center justify-center">
                    {/* Prenda real exhibida sobre el probador */}
                    <img 
                      src={prendaSeleccionada.imagen} 
                      alt={prendaSeleccionada.nombre}
                      className="max-h-[200px] sm:max-h-[220px] w-auto object-contain drop-shadow-xl animate-in zoom-in-95 duration-300"
                    />
                  </div>
                </div>

                {/* Placa inferior del espejo con la prenda en prueba */}
                <div className="absolute bottom-3 inset-x-4 bg-white/95 backdrop-blur-md rounded-2xl p-2.5 border-2 border-amber-200 shadow-sm flex items-center justify-between z-20">
                  <div className="truncate pr-2">
                    <p className="text-[9px] font-bold text-amber-700 uppercase tracking-wider">Prenda en prueba:</p>
                    <p className="text-xs font-black text-[#1e3a8a] truncate">{prendaSeleccionada.nombre}</p>
                  </div>
                  <span className="text-xs font-black text-rose-600 bg-rose-50 px-2.5 py-1 rounded-xl border border-rose-200 whitespace-nowrap">
                    ${Number(prendaSeleccionada.precio).toLocaleString('es-CO')}
                  </span>
                </div>

              </div>

              {/* Botón rápido para añadir al carrito directamente desde el probador */}
              <button
                onClick={anadirLookAlCarrito}
                className="mt-4 w-full py-3 bg-[#a6d4f2] hover:bg-[#8ac6ee] text-[#1e3a8a] font-black rounded-2xl text-xs uppercase tracking-wider shadow-md transition active:scale-95 border-2 border-white cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Añadir este Look al Carrito</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>

            </div>
          </div>

          {/* =========================================================================
              LADO DERECHO: PERCHERO DE LENCERÍAS & ASESOR DE TALLAS (7 Columnas)
              ========================================================================= */}
          <div className="lg:col-span-7 w-full flex flex-col gap-6">
            
            {/* 1. PERCHERO DE PRENDAS DEL CATÁLOGO REAL */}
            <div className="w-full bg-white/95 backdrop-blur-md rounded-[2.5rem] p-6 sm:p-7 shadow-[0_16px_40px_rgba(30,58,138,0.1)] border-4 border-white">
              
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
                <div>
                  <h3 className="text-lg sm:text-xl font-black text-[#1e3a8a] uppercase leading-tight">
                    Perchero de Lencería
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">
                    Haz clic en cualquier prenda para probártela en el espejo virtual
                  </p>
                </div>
                <span className="px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-[10px] font-black uppercase border border-amber-200">
                  {prendasVestier.length} Diseños
                </span>
              </div>

              {/* Grid del perchero con 6 prendas interactivas */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {prendasVestier.map((prenda) => {
                  const activa = prendaSeleccionada.id === prenda.id;
                  return (
                    <div
                      key={prenda.id}
                      onClick={() => setPrendaSeleccionada(prenda)}
                      className={`p-3 rounded-2xl border-2 cursor-pointer transition-all flex flex-col items-center justify-between text-center ${
                        activa
                          ? 'bg-amber-50/70 border-amber-400 shadow-md scale-102 ring-2 ring-amber-300/40'
                          : 'bg-white border-slate-200 hover:border-amber-300 hover:bg-slate-50/60'
                      }`}
                    >
                      <div className="h-24 w-full flex items-center justify-center p-1 relative">
                        <img 
                          src={prenda.imagen} 
                          alt={prenda.nombre}
                          className="max-h-full max-w-full object-contain drop-shadow-sm transition-transform hover:scale-105"
                        />
                        {activa && (
                          <span className="absolute top-0 right-0 w-4 h-4 rounded-full bg-amber-500 text-white text-[9px] font-black flex items-center justify-center">
                            ✓
                          </span>
                        )}
                      </div>
                      <div className="mt-2 w-full">
                        <h4 className="text-[11px] sm:text-xs font-black text-[#1e3a8a] truncate uppercase">
                          {prenda.nombre}
                        </h4>
                        <span className="text-[10px] font-black text-amber-700 block mt-0.5">
                          ${Number(prenda.precio).toLocaleString('es-CO')}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>

            {/* 2. ASESOR INTERACTIVO DE MEDIDAS & CALCULADORA DE TALLAS */}
            <div className="w-full bg-white/95 backdrop-blur-md rounded-[2.5rem] p-6 sm:p-7 shadow-[0_16px_40px_rgba(30,58,138,0.1)] border-4 border-[#a6d4f2]">
              
              <div className="pb-3 mb-4 border-b border-slate-100 flex items-center justify-between">
                <div>
                  <h3 className="text-lg sm:text-xl font-black text-[#1e3a8a] uppercase leading-tight">
                    Calculadora de Talla & Silueta
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">
                    Ajusta tus medidas aproximadas para conocer tu talla recomendada
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-[9px] font-black uppercase text-slate-400 block">Talla sugerida:</span>
                  <span className="text-xl sm:text-2xl font-black text-[#1e3a8a] px-3 py-0.5 rounded-xl bg-[#a6d4f2]/40 border border-[#a6d4f2]">
                    {recomendacion.talla}
                  </span>
                </div>
              </div>

              {/* Sliders de medidas interactivos */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                
                {/* Busto */}
                <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-black text-[#1e3a8a] uppercase">Busto</span>
                    <span className="text-xs font-black text-rose-600">{busto} cm</span>
                  </div>
                  <input 
                    type="range" 
                    min="78" 
                    max="115" 
                    value={busto}
                    onChange={(e) => setBusto(Number(e.target.value))}
                    className="w-full accent-amber-500 cursor-pointer"
                  />
                </div>

                {/* Cintura */}
                <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-black text-[#1e3a8a] uppercase">Cintura</span>
                    <span className="text-xs font-black text-rose-600">{cintura} cm</span>
                  </div>
                  <input 
                    type="range" 
                    min="58" 
                    max="95" 
                    value={cintura}
                    onChange={(e) => setCintura(Number(e.target.value))}
                    className="w-full accent-amber-500 cursor-pointer"
                  />
                </div>

                {/* Cadera */}
                <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-black text-[#1e3a8a] uppercase">Cadera</span>
                    <span className="text-xs font-black text-rose-600">{cadera} cm</span>
                  </div>
                  <input 
                    type="range" 
                    min="82" 
                    max="120" 
                    value={cadera}
                    onChange={(e) => setCadera(Number(e.target.value))}
                    className="w-full accent-amber-500 cursor-pointer"
                  />
                </div>

              </div>

              {/* Ficha explicativa de la talla recomendada */}
              <div className="bg-gradient-to-r from-sky-50 to-amber-50 p-4 rounded-2xl border border-sky-200 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-black text-[#1e3a8a]">
                    Talla recomendada: {recomendacion.talla} • Copa equivalente: {recomendacion.equivalente}
                  </p>
                  <p className="text-[11px] text-slate-600 font-medium mt-0.5">
                    {recomendacion.nota}
                  </p>
                </div>
                <button
                  onClick={() => navigate('/tienda?cat=lencerias')}
                  className="px-4 py-2 bg-white text-[#1e3a8a] hover:bg-sky-50 text-[10px] font-black uppercase tracking-wider rounded-xl border border-sky-300 shadow-xs cursor-pointer whitespace-nowrap transition"
                >
                  Ver en Tienda →
                </button>
              </div>

            </div>

          </div>

        </div>

      </div>
    </RoomWrapper>
  );
}
