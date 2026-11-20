import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import RoomWrapper from '../components/RoomWrapper';
import AndyCloudsWallpaper from '../components/AndyCloudsWallpaper';
import ToyBoxCard from '../components/ToyBoxCard';

// Catálogo oficial completo con todas las imágenes añadidas por el usuario (sin productos repetidos)
const CATALOGO_REAL = [
  // 1. VIBRADORES (7 productos únicos con sus respectivas imágenes)
  {
    id: 1,
    nombre: 'Masajeador Rabbit Doble Estimulación',
    categoria: 'vibradores',
    precio: 185000,
    imagen: '/images/rabbitbuzz.webp',
    descripcion: 'Diseño icónico con doble motor independiente para estimulación simultánea interna de punto G y externa en clítoris con suaves orejitas flexibles. Fabricado en silicona líquida médica ultrasuave, 10 ritmos de vibración progresiva, motor silencioso (<40dB) y 100% sumergible IPX7 para disfrutar en la ducha o la tina.'
  },
  {
    id: 2,
    nombre: 'Succionador Clitoriano por Ondas de Aire',
    categoria: 'vibradores',
    precio: 145000,
    imagen: '/images/succionadorclitoris.png',
    descripcion: 'Revolucionaria tecnología de ondas de presión pulsantes que acarician el clítoris sin contacto directo ni fricción, desatando orgasmos múltiples e intensos en pocos minutos. Cuenta con 11 niveles de intensidad gradual, tacto aterciopelado hipoalergénico y recarga magnética USB.'
  },
  {
    id: 3,
    nombre: 'Vibrador Bala Silenciosa Multi-Velocidad',
    categoria: 'vibradores',
    precio: 65000,
    imagen: '/images/vibradorbala.png',
    descripcion: 'Ultra compacto, potente y discreto para llevar en el bolso. Su punta redondeada transfiere vibraciones profundas focalizadas en zonas erógenas como clítoris, pezones y cuello con 7 modos de frecuencia y motor whisper-quiet.'
  },
  {
    id: 4,
    nombre: 'Vibrador Punto G en Silicona Líquida',
    categoria: 'vibradores',
    precio: 125000,
    imagen: '/images/vibradorpuntoG.png',
    descripcion: 'Curvatura anatómica precisa diseñada para adaptarse a la perfección al canal vaginal y estimular con firmeza el punto G. Acabado ultra suave y flexible que se amolda a la temperatura corporal para caricias envolventes.'
  },
  {
    id: 5,
    nombre: 'Vibrador para Ropa Interior con Control Remoto',
    categoria: 'vibradores',
    precio: 160000,
    imagen: '/images/vibradorpararopainterior.png',
    descripcion: 'Estimulador ergonómico en forma de mariposa con fijación magnética para ajustarse a cualquier panty. Incluye control inalámbrico de hasta 15 metros para juegos de complicidad y entrega en pareja durante cenas, paseos o en la intimidad.'
  },
  {
    id: 6,
    nombre: 'Cerdito Travieso con Lengua Vibradora',
    categoria: 'vibradores',
    precio: 85000,
    imagen: '/images/cerdito_travieso.png',
    descripcion: 'Divertido y adorable estimulador clitoriano con lengüeta de silicona flexible de alta frecuencia. Simula caricias orales continuas con múltiples pulsaciones para sensaciones cosquilleantes irresistibles.'
  },
  {
    id: 7,
    nombre: 'Vibrador Varita Masajeadora Cowgirl',
    categoria: 'vibradores',
    precio: 135000,
    imagen: '/images/vibradorvarita.png',
    descripcion: 'Varita masajeadora con cabezal flexible y motor de alta torsión diseñada para aliviar tensiones musculares y proporcionar sensaciones clitorianas intensas con múltiples patrones rítmicos.'
  },

  // 2. LENCERÍA (9 prendas con sus imágenes exclusivas)
  {
    id: 8,
    nombre: 'Conjunto Lencería Bralette y Panty de Encaje',
    categoria: 'lencerias',
    precio: 110000,
    imagen: '/images/lenceriabralette.png',
    descripcion: 'Conjunto sensual confeccionado en encaje floral elástico de alta suavidad. Bralette sin aros con tirantes regulables y panty de corte favorecedor que realza la silueta con elegancia y comodidad.'
  },
  {
    id: 9,
    nombre: 'Baby Doll de Satén con Copas de Encaje',
    categoria: 'lencerias',
    precio: 135000,
    imagen: '/images/babydoll.png',
    descripcion: 'Camisón corto de satén brillante con caída fluida, escote decorado en encaje transparente y espalda descubierta con lazos de ajuste. Incluye tanga a juego para una noche inolvidable.'
  },
  {
    id: 10,
    nombre: 'Body de Encaje con Escote Profundo',
    categoria: 'lencerias',
    precio: 120000,
    imagen: '/images/bodydeencaje.png',
    descripcion: 'Enterizo sensual con transparencias estratégicas, escote en V pronunciado y broches de apertura inferior que facilitan la comodidad y encuentros espontáneos.'
  },
  {
    id: 11,
    nombre: 'Arnés Corporal de Tiras Regulables',
    categoria: 'lencerias',
    precio: 95000,
    imagen: '/images/arnescorporal.png',
    descripcion: 'Arnés moderno de moda íntima con herrajes dorados mate inoxidables y elásticos suaves que se adaptan y ciñen a cualquier talla, enmarcando el busto y el torso con estilo audaz.'
  },
  {
    id: 12,
    nombre: 'Bata Kimono Corta en Seda Satinada',
    categoria: 'lencerias',
    precio: 140000,
    imagen: '/images/batakimono.png',
    descripcion: 'Prenda sugerente y sedosa con cinturón de amarre y mangas acampanadas. Perfecta para lucir sobre la lencería durante juegos previos o momentos de relajación.'
  },
  {
    id: 13,
    nombre: 'Conjunto Lencería Temática Vaquera',
    categoria: 'lencerias',
    precio: 115000,
    imagen: '/images/lenceria_andy.png',
    descripcion: 'Bralette y panty con temática exclusiva de vaquera chic con lazos en satén y encaje elástico transpirable de alta resistencia.'
  },
  {
    id: 14,
    nombre: 'Lencería Sensual Masculina Boxer Slip',
    categoria: 'lencerias',
    precio: 65000,
    imagen: '/images/lenceriahombre.png',
    descripcion: 'Boxer slip ajustado con tejido microperforado ultra suave y transpirable, diseñado para realzar la anatomía masculina con total confort.'
  },
  {
    id: 15,
    nombre: 'Lencería Masculina Arnés & Suspensorio',
    categoria: 'lencerias',
    precio: 75000,
    imagen: '/images/lenceriahombre2.png',
    descripcion: 'Set de arnés pectoral y jockstrap elástico regulable con bandas de compresión suave que definen la musculatura y añaden un toque seductor.'
  },
  {
    id: 16,
    nombre: 'Conjunto Lencería Galáctica Space',
    categoria: 'lencerias',
    precio: 118000,
    imagen: '/images/lenceriabuzzmujer.png',
    descripcion: 'Diseño futurista inspirado en el espacio exterior con acabados satinados brillantes, copas con soporte suave y detalles violetas y verdes.'
  },

  // 3. PLUGS & ANALES (4 productos con sus imágenes exactas)
  {
    id: 17,
    nombre: 'Plug Anal Metálico con Gema de Cristal',
    categoria: 'anales',
    precio: 55000,
    imagen: '/images/pluganalconcristal.png',
    descripcion: 'Fabricado en acero inoxidable de grado quirúrgico pulido a espejo, rematado con una gema facetada brillante en la base. Permite juegos de temperatura sumergiéndolo en agua tibia o fría, con base de seguridad acampanada.'
  },
  {
    id: 18,
    nombre: 'Plug Anal Vibrador con Control Inalámbrico',
    categoria: 'anales',
    precio: 115000,
    imagen: '/images/pluganalvibrador.png',
    descripcion: 'Cuerpo cónico de fácil inserción en silicona sedosa con motor interno de 10 modos de vibración profunda. Su mando a distancia inalámbrico permite compartir el control del placer con tu pareja.'
  },
  {
    id: 19,
    nombre: 'Set de 3 Plugs Progresivos de Silicona',
    categoria: 'anales',
    precio: 85000,
    imagen: '/images/setplugs.png',
    descripcion: 'Kit completo de iniciación con tamaños S, M y L para una exploración gradual y placentera. Silicona hipoalergénica aterciopelada y cuello estrecho con base ancha de total tranquilidad.'
  },
  {
    id: 20,
    nombre: 'Sonda Prostática Ergonómica con Vibración',
    categoria: 'anales',
    precio: 130000,
    imagen: '/images/sondaprostatica.png',
    descripcion: 'Ángulo de precisión anatómica diseñado para alcanzar y masajear la próstata y el perineo simultáneamente con ondas de vibración profundas y relajantes.'
  },

  // 4. DILDOS (2 productos con sus imágenes)
  {
    id: 21,
    nombre: 'Dildo RealFeel Dual Density con Ventosa 18cm',
    categoria: 'dildos',
    precio: 140000,
    imagen: '/images/dildorealfeel.png',
    descripcion: 'Tecnología de doble densidad con núcleo interno firme y capa externa suave y flexible que emula la textura y calidez natural. Su ventosa inferior se adhiere con fuerza a superficies lisas o arneses.'
  },
  {
    id: 22,
    nombre: 'Dildo de Cristal Borosilicato Templado',
    categoria: 'dildos',
    precio: 110000,
    imagen: '/images/dildodecristal.png',
    descripcion: 'Obra de arte en vidrio de borosilicato soplado hipoalergénico y no poroso con suaves hendiduras en espiral. Compatible con cualquier lubricante y apto para experimentar sensaciones térmicas.'
  },

  // 5. COSMÉTICA (5 productos con sus imágenes)
  {
    id: 23,
    nombre: 'Lubricante Íntimo a Base de Agua 100ml',
    categoria: 'cosmetica',
    precio: 38000,
    imagen: '/images/lubricanteintimo.png',
    descripcion: 'Fórmula hidratante de larga duración y textura sedosa que no mancha ni deja residuos pegajosos. 100% compatible con preservativos de látex y juguetes de silicona médica.'
  },
  {
    id: 24,
    nombre: 'Aceite de Masaje Sensual Efecto Calor Fresa',
    categoria: 'cosmetica',
    precio: 45000,
    imagen: '/images/aceitedemasaje.png',
    descripcion: 'Aceite comestible de tacto sedoso que reacciona con el calor de la piel y el aliento, generando una agradable sensación térmica acompañada de un delicioso aroma a fresa.'
  },
  {
    id: 25,
    nombre: 'Gel Estimulador Clitoriano Efecto Frío & Calor',
    categoria: 'cosmetica',
    precio: 52000,
    imagen: '/images/gelestimulador.png',
    descripcion: 'Gotas concentradas que incrementan la sensibilidad y activan un cosquilleo estimulante con pulsaciones térmicas para potenciar los orgasmos desde la primera caricia.'
  },
  {
    id: 26,
    nombre: 'Vela Aromática de Cera de Soya para Masajes',
    categoria: 'cosmetica',
    precio: 48000,
    imagen: '/images/velaaromatica.png',
    descripcion: 'Se derrite a baja temperatura transformándose en un cálido aceite tibio enriquecido con aceites naturales y fragancias relajantes para masajes corporales sensuales.'
  },
  {
    id: 27,
    nombre: 'Limpiador Antibacterial Espumoso para Juguetes',
    categoria: 'cosmetica',
    precio: 34000,
    imagen: '/images/limpiadorantibacterial.png',
    descripcion: 'Espuma higienizante de fórmula médica sin alcohol que desinfecta y conserva las propiedades de la silicona de tus juguetes favoritos manteniéndolos como nuevos.'
  },

  // 6. ACCESORIOS & BDSM (3 productos con sus imágenes)
  {
    id: 28,
    nombre: 'Esposas de Peluche con Cierre de Seguridad',
    categoria: 'accesorios',
    precio: 42000,
    imagen: '/images/esposasdepeluche.png',
    descripcion: 'Grilletes de muñeca forrados en suave felpa acolchada con cadena metálica y palanca de liberación rápida para juegos de sumisión suaves y placenteros.'
  },
  {
    id: 29,
    nombre: 'Antifaz de Seda Acolchado para Privación Sensorial',
    categoria: 'accesorios',
    precio: 28000,
    imagen: '/images/antifazdeseda.png',
    descripcion: 'Bloquea por completo la luz agudizando los sentidos del tacto, oído y olfato para intensificar cada roce y caricia durante la previa en pareja.'
  },
  {
    id: 30,
    nombre: 'Fusta de Placer con Puntera de Cuero Suave',
    categoria: 'accesorios',
    precio: 36000,
    imagen: '/images/fustadeplacer.png',
    descripcion: 'Accesorio de caricias sensoriales con empuñadura ergonómica y puntera suave para introducir dinámicas de juego de rol y estimulación con delicadeza.'
  },

  // 7. KITS & SORPRESAS (2 kits con sus imágenes)
  {
    id: 31,
    nombre: 'Kit de Iniciación Erótica para Parejas',
    categoria: 'kits',
    precio: 165000,
    imagen: '/images/kitdeiniciazion.png',
    descripcion: 'Set completo con antifaz de satén, esposas de felpa, pluma de caricias, dado erótico y lubricante íntimo para salir de la rutina y encender la chispa.'
  },
  {
    id: 32,
    nombre: 'Caja Misteriosa Toy Store Mystery Box',
    categoria: 'kits',
    precio: 250000,
    imagen: '/images/cajamisteriosa.png',
    descripcion: 'Exclusiva selección sorpresa curada con 3 productos premium (vibrador de alta gama, cosmética íntima y accesorio sensual) con un valor real muy superior al precio final.'
  }
];

// Prioridad fija de categorías según solicitud del usuario:
// 1. Vibradores, 2. Lencería, 3. Plugs & Anales, 4. Dildos, 5. Cosmética, 6. Accesorios & BDSM, 7. Kits & Sorpresas
const CATEGORY_PRIORITY = {
  vibra: 1,
  lence: 2,
  anal: 3,
  plug: 3,
  dildo: 4,
  cosme: 5,
  acces: 6,
  bdsm: 6,
  kit: 7
};

function getCategoryPriority(cat = '') {
  const c = (cat || '').toLowerCase();
  for (const [key, val] of Object.entries(CATEGORY_PRIORITY)) {
    if (c.includes(key)) return val;
  }
  return 8;
}

function getProductosPorCategoria(cat = 'todos') {
  const filtered = cat === 'todos' 
    ? CATALOGO_REAL 
    : CATALOGO_REAL.filter(p => p.categoria.toLowerCase().includes(cat.toLowerCase()));
  return [...filtered].sort((a, b) => {
    const prioA = getCategoryPriority(a.categoria);
    const prioB = getCategoryPriority(b.categoria);
    if (prioA !== prioB) return prioA - prioB;
    return a.id - b.id;
  });
}

export default function Tienda() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const categoriaActiva = searchParams.get('cat') || 'todos';
  const busqueda = (searchParams.get('buscar') || searchParams.get('q') || '').toLowerCase().trim();
  const [pagina, setPagina] = useState(1);
  const [filtroTexto, setFiltroTexto] = useState(busqueda);

  // Inicialización instantánea sin demora ni pantalla rara al recargar
  const [productos, setProductos] = useState(() => getProductosPorCategoria(categoriaActiva));
  const [cargando, setCargando] = useState(false);

  // Carrito sincronizado con localStorage
  const [carrito, setCarrito] = useState(() => {
    try {
      const stored = localStorage.getItem('toy_carrito') || localStorage.getItem('toy_cart');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch {}
    return [];
  });

  // Modal emergente del producto al hacer clic en cualquier caja
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [cantidadModal, setCantidadModal] = useState(1);
  const [toastNotificacion, setToastNotificacion] = useState('');

  // 5 productos por fila horizontalmente x 3 estantes = 15 productos por página
  const ITEMS_POR_PAGINA = 15;

  useEffect(() => {
    // Actualización inmediata al cambiar categoría
    setProductos(getProductosPorCategoria(categoriaActiva));
    fetchProductosSilencioso();
  }, [categoriaActiva]);

  useEffect(() => {
    try {
      localStorage.setItem('toy_carrito', JSON.stringify(carrito));
      localStorage.setItem('toy_cart', JSON.stringify(carrito));
    } catch {}
  }, [carrito]);

  useEffect(() => {
    setPagina(1);
  }, [categoriaActiva, busqueda]);

  // Actualización en segundo plano sin interrumpir ni demorar la visualización
  const fetchProductosSilencioso = async () => {
    try {
      const url = categoriaActiva === 'todos' 
        ? '/productos'
        : `/productos?categoria=${encodeURIComponent(categoriaActiva)}`;
      const res = await fetch(url);
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        // Combinamos manteniendo los nombres e imágenes correctas
        const merged = data.map((item, idx) => {
          const matchReal = CATALOGO_REAL.find(c => c.id === item.id || c.nombre.toLowerCase() === item.nombre.toLowerCase());
          if (matchReal) {
            return { ...matchReal, stock: item.stock || matchReal.stock || 15 };
          }
          const fallback = CATALOGO_REAL[idx % CATALOGO_REAL.length];
          return {
            ...fallback,
            id: item.id || fallback.id,
            precio: item.precio || fallback.precio,
            categoria: item.categoria || fallback.categoria,
            stock: item.stock || 15
          };
        });

        const sorted = [...merged].sort((a, b) => {
          const prioA = getCategoryPriority(a.categoria);
          const prioB = getCategoryPriority(b.categoria);
          if (prioA !== prioB) return prioA - prioB;
          return a.id - b.id;
        });
        setProductos(sorted);
      }
    } catch (e) {
      // Si el backend duerme, el catálogo real ya está visible sin demoras
    }
  };

  const agregarAlCarrito = (producto, cantidad = 1) => {
    setCarrito(prev => {
      const existe = prev.find(item => item.id === producto.id);
      if (existe) {
        return prev.map(item =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + cantidad }
            : item
        );
      }
      return [...prev, { ...producto, cantidad }];
    });
    setToastNotificacion(`¡Añadiste "${producto.nombre}" a tu carrito!`);
    setTimeout(() => setToastNotificacion(''), 3000);
  };

  const totalArticulosCarrito = carrito.reduce((sum, item) => sum + item.cantidad, 0);

  // Filtrado de productos por texto
  const productosFiltrados = productos.filter(p => {
    if (!busqueda) return true;
    const nombre = (p.nombre || '').toLowerCase();
    const desc = (p.descripcion || '').toLowerCase();
    const cat = (p.categoria || '').toLowerCase();
    return nombre.includes(busqueda) || desc.includes(busqueda) || cat.includes(busqueda);
  });

  const totalPaginas = Math.ceil(productosFiltrados.length / ITEMS_POR_PAGINA);
  const inicio = (pagina - 1) * ITEMS_POR_PAGINA;
  const productosVisibles = productosFiltrados.slice(inicio, inicio + ITEMS_POR_PAGINA);

  // Agrupar en estantes de 5 cajas por fila
  const estantes = [];
  for (let i = 0; i < productosVisibles.length; i += 5) {
    estantes.push(productosVisibles.slice(i, i + 5));
  }
  while (estantes.length < 3 && productosVisibles.length > 0) {
    estantes.push([]);
  }

  const categoriasMenu = [
    { id: 'todos', label: 'Todos' },
    { id: 'vibradores', label: 'Vibradores' },
    { id: 'lencerias', label: 'Lencería' },
    { id: 'anales', label: 'Plugs & Anales' },
    { id: 'dildos', label: 'Dildos' },
    { id: 'cosmetica', label: 'Cosmética' },
    { id: 'accesorios', label: 'Accesorios & BDSM' },
    { id: 'kits', label: 'Kits & Sorpresas' }
  ];

  return (
    <RoomWrapper 
      theme="woody" 
      wallpaperContent={<AndyCloudsWallpaper />}
      hideFloorToys={true}
    >
      <style>{`
        @keyframes swingSign {
          0%, 100% { transform: rotate(-3deg); }
          50% { transform: rotate(3deg); }
        }
        .animate-swing-sign {
          transform-origin: top center;
          animation: swingSign 4s ease-in-out infinite;
        }
        @keyframes floatHangingCloud {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-3px); }
        }
        .animate-hanging-cloud {
          animation: floatHangingCloud 4s ease-in-out infinite;
        }
      `}</style>

      {/* TOAST / NOTIFICACIÓN EMERGENTE AL AÑADIR AL CARRITO */}
      {toastNotificacion && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[500] bg-[#1e3a8a] text-white px-5 py-3 rounded-full shadow-2xl border-2 border-[#a6d4f2] text-xs sm:text-sm font-black flex items-center gap-2.5 animate-in fade-in slide-in-from-top-4 duration-300">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
          <span>{toastNotificacion}</span>
        </div>
      )}

      {/* ÁREA DE CONTENIDO PRINCIPAL: Espaciado ajustado para que las cuerdas coincidan exactamente con la nube */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-3 sm:px-6 pt-0 pb-28 font-fredoka flex flex-col items-center select-none">
        
        {/* =========================================================================
            ZONA SUPERIOR: BUSCADOR CON BARRITAS COLGANTES + CARTEL "AÑADIR AL CARRITO"
            ========================================================================= */}
        <div className="w-full relative flex items-center justify-center mb-6 min-h-[170px] -mt-2 sm:-mt-3 md:-mt-4">
          
          {/* 1. CARTEL "AÑADIR AL CARRITO": CONECTADO CON SUS BARRITAS, SCROLLEA CON LA PÁGINA */}
          <div 
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              navigate('/carrito');
            }}
            className="absolute top-3 sm:top-4 md:top-5 right-0 sm:right-1 md:right-2 lg:right-3 z-30 cursor-pointer group pointer-events-auto select-none flex flex-col items-center animate-swing-sign"
            title="Ver Carrito de Compras"
          >
            {/* Barritas que sostienen el cartel de añadir al carrito */}
            <div className="flex justify-between w-12 sm:w-16 mx-auto -mb-1 relative z-0">
              <div className="w-[3px] h-12 sm:h-16 md:h-18 bg-gradient-to-b from-slate-400 via-amber-600 to-amber-700 shadow-xs relative">
                <div className="w-2 h-2 rounded-full bg-[#facc15] border border-[#78350f] absolute -top-1 -left-[2.5px]"></div>
                <div className="w-2 h-2 rounded-full bg-[#facc15] border border-[#78350f] absolute -bottom-1 -left-[2.5px]"></div>
              </div>
              <div className="w-[3px] h-12 sm:h-16 md:h-18 bg-gradient-to-b from-slate-400 via-amber-600 to-amber-700 shadow-xs relative">
                <div className="w-2 h-2 rounded-full bg-[#facc15] border border-[#78350f] absolute -top-1 -left-[2.5px]"></div>
                <div className="w-2 h-2 rounded-full bg-[#facc15] border border-[#78350f] absolute -bottom-1 -left-[2.5px]"></div>
              </div>
            </div>

            {/* Imagen oficial del cartel con tamaño moderado y proporcional */}
            <div className="relative flex items-center justify-center transition-transform group-hover:scale-105 active:scale-95">
              <img 
                src="/images/anadir_carrito.png" 
                alt="Añadir al Carrito" 
                onError={(e) => { e.target.src = '/images/añadir_carrito.png'; }}
                className="w-16 sm:w-20 md:w-24 h-auto object-contain drop-shadow-md"
              />

              {/* Botón / Indicador rojo en la esquina con el contador de artículos pendientes */}
              {totalArticulosCarrito > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#E52521] text-white text-[10px] sm:text-[11px] font-black w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center border-2 border-white shadow-md animate-bounce ring-1 ring-red-300">
                  {totalArticulosCarrito}
                </span>
              )}
            </div>
          </div>

          {/* 2. EL BUSCADOR: SOSTENIDO POR SUS BARRITAS COLGANTES */}
          <div className="relative z-10 flex flex-col items-center animate-hanging-cloud max-w-2xl w-full mx-auto px-2">
            
            {/* Barritas que sostienen el buscador conectadas a la parte superior */}
            <div className="w-full max-w-md flex justify-between px-12 sm:px-16 -mb-1 relative z-0">
              <div className="w-[3.5px] h-14 sm:h-16 md:h-20 bg-gradient-to-b from-slate-400 via-amber-600 to-amber-700 shadow-xs relative">
                <div className="w-2.5 h-2.5 rounded-full bg-[#facc15] border border-[#78350f] absolute -top-1 -left-[3px]"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-[#facc15] border border-[#78350f] absolute -bottom-1 -left-[3px]"></div>
              </div>
              <div className="w-[3.5px] h-14 sm:h-16 md:h-20 bg-gradient-to-b from-slate-400 via-amber-600 to-amber-700 shadow-xs relative">
                <div className="w-2.5 h-2.5 rounded-full bg-[#facc15] border border-[#78350f] absolute -top-1 -left-[3px]"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-[#facc15] border border-[#78350f] absolute -bottom-1 -left-[3px]"></div>
              </div>
            </div>

            {/* Contenedor Limpio y Redondeado sin bolas ni bordes deformes */}
            <div className="w-full bg-white/95 backdrop-blur-md rounded-[2.5rem] p-4 sm:p-5 shadow-[0_12px_35px_rgba(30,58,138,0.12)] border-4 border-[#a6d4f2] relative z-10">
              
              {/* Barra de entrada de búsqueda */}
              <div className="flex items-center gap-2.5 w-full">
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={filtroTexto}
                    onChange={(e) => setFiltroTexto(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        setSearchParams(prev => {
                          const n = new URLSearchParams(prev);
                          if (filtroTexto.trim()) n.set('buscar', filtroTexto.trim());
                          else n.delete('buscar');
                          return n;
                        });
                      }
                    }}
                    placeholder="Buscar juguetes íntimos, lencería, aceites..."
                    className="w-full pl-10 pr-9 py-2.5 bg-sky-50/50 rounded-2xl border-2 border-sky-100 text-slate-800 text-xs sm:text-sm font-bold shadow-inner focus:outline-none focus:border-[#1e3a8a] focus:bg-white transition placeholder:text-slate-400"
                  />
                  <svg className="w-4 h-4 text-[#1e3a8a] absolute left-3.5 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  {filtroTexto && (
                    <button
                      onClick={() => {
                        setFiltroTexto('');
                        setSearchParams(prev => {
                          const n = new URLSearchParams(prev);
                          n.delete('buscar');
                          return n;
                        });
                      }}
                      className="w-5 h-5 rounded-full bg-slate-200 text-slate-600 absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center justify-center text-xs font-bold hover:bg-slate-300"
                    >
                      ×
                    </button>
                  )}
                </div>

                {/* Botón Buscar en Celeste Configuración */}
                <button
                  onClick={() => {
                    setSearchParams(prev => {
                      const n = new URLSearchParams(prev);
                      if (filtroTexto.trim()) n.set('buscar', filtroTexto.trim());
                      else n.delete('buscar');
                      return n;
                    });
                  }}
                  className="px-5 py-2.5 bg-[#a6d4f2] hover:bg-[#8ac6ee] text-[#1e3a8a] font-black rounded-2xl text-xs uppercase tracking-wider shadow-sm transition active:scale-95 whitespace-nowrap border-2 border-white cursor-pointer"
                >
                  Buscar
                </button>
              </div>

              {/* Categorías en Píldoras sin cortes */}
              <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 mt-3 pt-2.5 border-t border-slate-100">
                {categoriasMenu.map(cat => {
                  const activo = categoriaActiva === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => {
                        setSearchParams(prev => {
                          const n = new URLSearchParams(prev);
                          if (cat.id === 'todos') n.delete('cat');
                          else n.set('cat', cat.id);
                          return n;
                        });
                      }}
                      className={`px-3 py-1 rounded-xl text-[11px] font-black uppercase tracking-wider transition-all border cursor-pointer ${
                        activo
                          ? 'bg-[#a6d4f2] text-[#1e3a8a] border-[#1e3a8a] shadow-md scale-105 ring-2 ring-[#1e3a8a]/20'
                          : 'bg-slate-50 text-[#1e3a8a] border-slate-200 hover:bg-[#a6d4f2]/30 hover:border-[#a6d4f2]'
                      }`}
                    >
                      {cat.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================================
            LA ESTANTERÍA / ARMARIO DE JUGUETES (5 PRODUCTOS POR FILA HORIZONTALMENTE)
            ========================================================================= */}
        <div className="w-full max-w-7xl bg-white/95 backdrop-blur-md rounded-t-[3.5rem] rounded-b-3xl border-4 border-white shadow-[0_25px_60px_rgba(0,0,0,0.35)] p-4 sm:p-8 relative mt-3">
          
          {/* Sombrero de Woody agrandado y coronando la curvatura de la esquina superior del estante */}
          <div className="absolute -top-11 -left-7 sm:-top-14 sm:-left-9 md:-top-16 md:-left-12 lg:-left-14 z-30 pointer-events-none -rotate-[16deg] transition-transform hover:rotate-0">
            <img 
              src="/images/sombrero_vaquero.png" 
              alt="Sombrero Vaquero Woody" 
              className="w-28 sm:w-36 md:w-44 h-auto object-contain drop-shadow-xl"
            />
          </div>

          {productosFiltrados.length === 0 ? (
            <div className="py-20 text-center">
              <p className="text-sm font-black text-[#1e3a8a] uppercase">No hay juguetes en esta categoría</p>
              <button
                onClick={() => setSearchParams({})}
                className="mt-4 px-5 py-2.5 bg-[#a6d4f2] hover:bg-[#8ac6ee] text-[#1e3a8a] font-black rounded-xl text-xs uppercase shadow-sm border-2 border-white cursor-pointer"
              >
                Ver todos los productos
              </button>
            </div>
          ) : (
            /* Los estantes horizontales con 5 cajas de juguetes de frente por fila */
            <div className="flex flex-col gap-10">
              {estantes.map((estante, estanteIdx) => {
                if (estante.length === 0) return null;
                return (
                  <div key={estanteIdx} className="relative flex flex-col">
                    
                    {/* Fila de 5 Cajas de Juguetes apoyadas sobre el estante */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-5 justify-items-center items-end pb-1 relative z-10">
                      {estante.map((prod, pIdx) => {
                        const globalIndex = inicio + (estanteIdx * 5) + pIdx;
                        return (
                          <ToyBoxCard
                            key={prod.id}
                            producto={prod}
                            index={globalIndex}
                            onClick={() => {
                              setProductoSeleccionado(prod);
                              setCantidadModal(1);
                            }}
                          />
                        );
                      })}
                    </div>

                    {/* LA BALDA / ESTANTE BLANCO (Ménsula horizontal que sostiene las cajas) */}
                    <div className="w-full relative mt-[-2px] z-20">
                      {/* Borde superior del estante con brillo */}
                      <div className="h-4 sm:h-5 bg-gradient-to-b from-white via-slate-100 to-slate-200 border-t-2 border-white border-b-2 border-slate-300 shadow-[0_8px_16px_rgba(0,0,0,0.15)] rounded-xs flex items-center justify-between px-2">
                        <div className="w-2 h-2 rounded-full bg-slate-300"></div>
                        <div className="w-2 h-2 rounded-full bg-slate-300"></div>
                      </div>

                      {/* Soporte triangular inferior izquierdo y derecho */}
                      <div className="flex justify-between px-6 -mt-0.5">
                        <div className="w-4 h-6 border-l-4 border-slate-300 border-b-4 border-transparent"></div>
                        <div className="w-4 h-6 border-r-4 border-slate-300 border-b-4 border-transparent"></div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Paginación con botones en Celeste Configuración */}
          {totalPaginas > 1 && (
            <div className="flex items-center justify-center gap-2 mt-10 pt-6 border-t border-slate-100">
              <button
                disabled={pagina === 1}
                onClick={() => setPagina(p => Math.max(p - 1, 1))}
                className="px-4 py-2 bg-slate-100 hover:bg-[#a6d4f2] disabled:opacity-40 text-[#1e3a8a] font-black rounded-xl text-xs uppercase tracking-wider transition cursor-pointer"
              >
                Anterior
              </button>

              {Array.from({ length: totalPaginas }, (_, i) => i + 1).map(p => (
                <button
                  key={p}
                  onClick={() => setPagina(p)}
                  className={`w-9 h-9 rounded-xl font-black text-xs transition cursor-pointer ${
                    pagina === p
                      ? 'bg-[#a6d4f2] text-[#1e3a8a] shadow-md border-2 border-white ring-2 ring-[#1e3a8a]/20'
                      : 'bg-slate-50 text-[#1e3a8a] hover:bg-[#a6d4f2]/40'
                  }`}
                >
                  {p}
                </button>
              ))}

              <button
                disabled={pagina === totalPaginas}
                onClick={() => setPagina(p => Math.min(p + 1, totalPaginas))}
                className="px-4 py-2 bg-slate-100 hover:bg-[#a6d4f2] disabled:opacity-40 text-[#1e3a8a] font-black rounded-xl text-xs uppercase tracking-wider transition cursor-pointer"
              >
                Siguiente
              </button>
            </div>
          )}
        </div>
      </div>

      {/* =========================================================================
          PÁGINA EMERGENTE / MODAL DETALLADO CON MARGEN AZULITO (COMBINADO CON BUSCADOR)
          ========================================================================= */}
      {productoSeleccionado && (
        <div className="fixed inset-0 z-[400] flex items-center justify-center p-3 sm:p-6 bg-black/25 backdrop-blur-xs font-fredoka select-none animate-in fade-in duration-200">
          <div className="bg-white rounded-[2.5rem] max-w-4xl w-full max-h-[88vh] overflow-y-auto p-6 sm:p-10 shadow-[0_25px_70px_rgba(0,0,0,0.25)] relative border-4 border-[#a6d4f2] animate-in zoom-in-95 duration-200 z-[401]">
            
            {/* Botón Cerrar */}
            <button
              onClick={() => setProductoSeleccionado(null)}
              className="w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center absolute top-5 right-5 font-black text-lg shadow-sm transition active:scale-95 cursor-pointer z-10"
            >
              ✕
            </button>

            <div className="flex flex-col md:flex-row gap-8 items-center">
              {/* Vista del Producto Directa y Amplia (Sin recuadro contenedor extra) */}
              <div className="w-full md:w-5/12 flex items-center justify-center">
                <ToyBoxCard producto={productoSeleccionado} index={0} isModalView={true} />
              </div>

              {/* Información y Compra */}
              <div className="w-full md:w-7/12 flex flex-col justify-between">
                <div>
                  {/* Título del producto sin caja contenedora de categoría */}
                  <h3 className="text-2xl sm:text-3xl font-black text-[#1e3a8a] leading-tight uppercase pb-3 border-b border-slate-100">
                    {productoSeleccionado.nombre}
                  </h3>

                  {/* Precio separado claramente */}
                  <p className="text-2xl sm:text-3xl font-black text-[#0284c7] mt-3 mb-4">
                    ${Number(productoSeleccionado.precio).toLocaleString('es-CO')} COP
                  </p>

                  {/* Descripción definida, persuasiva y completa */}
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-h-48 overflow-y-auto pr-1">
                    {productoSeleccionado.descripcion}
                  </p>
                </div>

                {/* Acciones: Cantidad y Añadir al Carrito (Sin checklist ni botón verde) */}
                <div className="mt-8 pt-5 border-t border-slate-100 flex items-center gap-4">
                  <div className="flex items-center border-2 border-slate-200 rounded-2xl px-3 py-2 bg-slate-50">
                    <button
                      onClick={() => setCantidadModal(c => Math.max(c - 1, 1))}
                      className="w-7 h-7 font-black text-slate-600 hover:text-[#1e3a8a] text-base cursor-pointer"
                    >
                      -
                    </button>
                    <span className="text-base font-black text-slate-800 w-9 text-center">{cantidadModal}</span>
                    <button
                      onClick={() => setCantidadModal(c => c + 1)}
                      className="w-7 h-7 font-black text-slate-600 hover:text-[#1e3a8a] text-base cursor-pointer"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => {
                      agregarAlCarrito(productoSeleccionado, cantidadModal);
                      setProductoSeleccionado(null);
                    }}
                    className="flex-1 py-3.5 bg-[#a6d4f2] hover:bg-[#8ac6ee] text-[#1e3a8a] font-black rounded-2xl text-xs sm:text-sm uppercase tracking-wider shadow-sm transition active:scale-95 border-2 border-white cursor-pointer"
                  >
                    Añadir al Carrito
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </RoomWrapper>
  );
}
