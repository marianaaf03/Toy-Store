import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import RoomWrapper from '../components/RoomWrapper';
import AndyCloudsWallpaper from '../components/AndyCloudsWallpaper';
import ToyBoxCard from '../components/ToyBoxCard';
import CowboyHat from '../components/CowboyHat';

// Orden de categorías prioritario según requerimiento:
// 1. Vibradores -> 2. Lencería -> 3. Plugs & Anales -> 4. Dildos -> 5. Cosmética -> 6. Accesorios & BDSM -> 7. Kits
const CATEGORY_PRIORITY = {
  'vibrador': 1,
  'vibra': 1,
  'lencer': 2,
  'anal': 3,
  'plug': 3,
  'dildo': 4,
  'cosmet': 5,
  'lubri': 5,
  'accesori': 6,
  'bdsm': 6,
  'kit': 7,
  'sorpresa': 7
};

function getCategoryPriority(cat) {
  if (!cat) return 99;
  const c = cat.toLowerCase();
  for (const [key, val] of Object.entries(CATEGORY_PRIORITY)) {
    if (c.includes(key)) return val;
  }
  return 99;
}

export default function Tienda() {
  const navigate = useNavigate();
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const categoriaActiva = searchParams.get('cat') || 'todos';
  const busqueda = (searchParams.get('buscar') || searchParams.get('q') || '').toLowerCase().trim();
  const [pagina, setPagina] = useState(1);
  const [filtroTexto, setFiltroTexto] = useState(busqueda);

  // Carrito sincronizado con localStorage (clave toy_carrito)
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

  // Modal emergente del producto al hacer clic en cualquier caja de juguete
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [cantidadModal, setCantidadModal] = useState(1);
  const [agregadoExito, setAgregadoExito] = useState(false);

  // 5 cajas horizontalmente por estante x 3 estantes = 15 cajas por página
  const ITEMS_POR_PAGINA = 15;

  useEffect(() => {
    fetchProductos();
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

  const fetchProductos = async () => {
    try {
      setCargando(true);
      const url = categoriaActiva === 'todos' 
        ? '/productos'
        : `/productos?categoria=${encodeURIComponent(categoriaActiva)}`;
      
      const res = await fetch(url);
      const data = await res.json();
      if (Array.isArray(data)) {
        // Ordenar según prioridad de categorías
        const ordenados = [...data].sort((a, b) => {
          const pA = getCategoryPriority(a.categoria);
          const pB = getCategoryPriority(b.categoria);
          if (pA !== pB) return pA - pB;
          return (a.id || 0) - (b.id || 0);
        });
        setProductos(ordenados);
      } else {
        setProductos([]);
      }
    } catch (error) {
      console.error("Error cargando productos:", error);
      setProductos([]);
    } finally {
      setCargando(false);
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
    setAgregadoExito(true);
    setTimeout(() => setAgregadoExito(false), 2200);
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

  // Agrupar en estantes de 5 cajas horizontalmente
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
    >
      <style>{`
        @keyframes swingSign {
          0%, 100% { transform: rotate(-5deg); }
          50% { transform: rotate(5deg); }
        }
        .animate-swing-sign {
          transform-origin: top center;
          animation: swingSign 3.5s ease-in-out infinite;
        }
        @keyframes floatHangingCloud {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-5px); }
        }
        .animate-hanging-cloud {
          animation: floatHangingCloud 4.5s ease-in-out infinite;
        }
      `}</style>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-3 sm:px-6 pt-1 pb-24 font-fredoka flex flex-col items-center">
        
        {/* =========================================================================
            ZONA SUPERIOR: NUBE BUSCADORA COLGANTE Y CARTEL "ADD TO CART"
            ========================================================================= */}
        <div className="w-full relative flex items-start justify-center my-2 min-h-[175px]">
          
          {/* 1. SEGUNDA NUBE: EL BUSCADOR Y SECCIONES COLGANDO DE LA NUBE PRINCIPAL */}
          <div className="relative z-10 flex flex-col items-center animate-hanging-cloud max-w-3xl w-full mx-auto px-2">
            
            {/* Cuerdas colgantes que conectan con la nube superior */}
            <div className="w-full max-w-lg flex justify-between px-16 -mb-1 relative z-0">
              <div className="w-[3px] h-9 sm:h-12 bg-gradient-to-b from-slate-400 via-amber-300 to-amber-500 shadow-sm rounded-full"></div>
              <div className="w-[3px] h-9 sm:h-12 bg-gradient-to-b from-slate-400 via-amber-300 to-amber-500 shadow-sm rounded-full"></div>
            </div>

            {/* La Nube Blanca Orgánica con Ondulaciones Suaves y Esquinas Redondeadas */}
            <div className="w-full bg-white/95 backdrop-blur-md rounded-[3rem] p-4 sm:p-6 shadow-[0_18px_40px_rgba(0,0,0,0.18)] border-3 border-sky-200 relative z-10">
              
              {/* Gotas/Ondas decorativas de nube en el borde superior */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-48 h-4 bg-white rounded-t-full -z-10"></div>

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
                    placeholder="Buscar en el baúl de juguetes..."
                    className="w-full pl-10 pr-9 py-2.5 bg-amber-50/50 rounded-2xl border-2 border-amber-200 text-slate-800 text-xs sm:text-sm font-bold shadow-inner focus:outline-none focus:border-[#a6d4f2] focus:bg-white transition placeholder:text-slate-400"
                  />
                  <svg className="w-4 h-4 text-amber-600 absolute left-3.5 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

                <button
                  onClick={() => {
                    setSearchParams(prev => {
                      const n = new URLSearchParams(prev);
                      if (filtroTexto.trim()) n.set('buscar', filtroTexto.trim());
                      else n.delete('buscar');
                      return n;
                    });
                  }}
                  className="px-5 py-2.5 bg-[#a6d4f2] hover:bg-[#8ec2e4] text-[#1e3a8a] font-black rounded-2xl text-xs uppercase tracking-wider shadow-sm transition active:scale-95 whitespace-nowrap border-2 border-white"
                >
                  Buscar
                </button>
              </div>

              {/* Secciones y Categorías en Píldoras que NO se cortan (flex-wrap limpio sin scrollbars) */}
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
                      className={`px-3 py-1 rounded-xl text-[11px] font-black uppercase tracking-wider transition-all border ${
                        activo
                          ? 'bg-[#a6d4f2] text-[#1e3a8a] border-2 border-[#1e3a8a] shadow-md scale-105'
                          : 'bg-slate-50 text-[#1e3a8a] border-slate-200 hover:bg-[#a6d4f2]/40 hover:border-[#a6d4f2]'
                      }`}
                    >
                      {cat.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* 2. CARTEL COLGANTE ANIMADO: "ADD TO CART" (DERECHA, CON CUERDAS, BALANCEO Y CLICKABLE) */}
          <div 
            onClick={() => navigate('/carrito')}
            className="hidden sm:flex flex-col items-center absolute right-0 lg:right-2 top-0 z-[150] pointer-events-auto cursor-pointer group animate-swing-sign select-none"
            title="Ir a mi Carrito de Compras"
          >
            {/* Cuerdas del cartel conectadas con la nube superior */}
            <div className="flex justify-between w-14 -mb-1 relative z-0">
              <div className="w-[2.5px] h-10 bg-gradient-to-b from-slate-400 to-amber-600 shadow-xs"></div>
              <div className="w-[2.5px] h-10 bg-gradient-to-b from-slate-400 to-amber-600 shadow-xs"></div>
            </div>

            {/* Placa / Cartel estilo juguetería Woody (Amarillo y Borde Rojo con Remaches) */}
            <div className="bg-gradient-to-b from-[#fde047] via-[#f59e0b] to-[#d97706] border-4 border-[#dc2626] rounded-2xl shadow-[0_12px_28px_rgba(0,0,0,0.35)] px-4 py-2.5 flex flex-col items-center justify-center transition-transform group-hover:scale-110 active:scale-95 relative">
              {/* Remaches dorados en las 4 esquinas */}
              <div className="w-1.5 h-1.5 rounded-full bg-[#78350f] border border-amber-200 absolute top-1 left-1"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-[#78350f] border border-amber-200 absolute top-1 right-1"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-[#78350f] border border-amber-200 absolute bottom-1 left-1"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-[#78350f] border border-amber-200 absolute bottom-1 right-1"></div>

              <span className="text-[10px] font-black text-[#dc2626] tracking-wider uppercase drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)] leading-none">
                ADD TO
              </span>
              <span className="text-xs font-black text-[#1e3a8a] tracking-tight uppercase flex items-center gap-1.5 leading-tight mt-0.5">
                <span>CART</span>
                {/* Icono SVG de Carrito limpio (CERO EMOJIS) */}
                <svg className="w-4 h-4 text-[#1e3a8a]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <circle cx="9" cy="20" r="1.5" />
                  <circle cx="18" cy="20" r="1.5" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 4h2l2 12h12l2-8H6" />
                </svg>
              </span>

              {/* Insignia / Contador de artículos */}
              {totalArticulosCarrito > 0 && (
                <span className="absolute -top-2.5 -right-2.5 bg-[#dc2626] text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-md animate-bounce">
                  {totalArticulosCarrito}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* BOTÓN FLOTANTE MÓVIL PARA VER CARRITO (SOLO EN PANTALLAS PEQUEÑAS) */}
        <div 
          onClick={() => navigate('/carrito')}
          className="sm:hidden fixed bottom-6 right-6 z-[120] bg-[#a6d4f2] text-[#1e3a8a] border-3 border-white p-3.5 rounded-full shadow-2xl flex items-center justify-center active:scale-95 cursor-pointer"
          title="Ver Carrito"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <circle cx="9" cy="20" r="1.5" />
            <circle cx="18" cy="20" r="1.5" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 4h2l2 12h12l2-8H6" />
          </svg>
          {totalArticulosCarrito > 0 && (
            <span className="absolute -top-1 -right-1 bg-[#dc2626] text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-md">
              {totalArticulosCarrito}
            </span>
          )}
        </div>

        {/* =========================================================================
            LA ESTANTERÍA / ARMARIO DE JUGUETES (BLANCO, ELEGANTE, 5 CAJAS HORIZONTALES)
            ========================================================================= */}
        <div className="w-full max-w-7xl bg-white/95 backdrop-blur-md rounded-t-[3.5rem] rounded-b-3xl border-4 border-white shadow-[0_25px_60px_rgba(0,0,0,0.35)] p-4 sm:p-8 relative mt-3">
          
          {/* Sombrero de Woody apoyado en la esquina superior izquierda del estante */}
          <div className="absolute -top-7 -left-3 sm:-top-9 sm:-left-4 z-30 pointer-events-none transform -rotate-12 hover:rotate-0 transition-transform">
            <CowboyHat className="w-16 h-10 sm:w-22 sm:h-14 drop-shadow-[0_8px_16px_rgba(0,0,0,0.35)]" />
          </div>

          {cargando ? (
            <div className="py-24 flex flex-col items-center justify-center">
              <div className="w-12 h-12 border-4 border-amber-300 border-t-[#a6d4f2] rounded-full animate-spin"></div>
              <p className="mt-4 text-xs font-black text-[#1e3a8a] uppercase tracking-widest">
                Acomodando los juguetes en los estantes...
              </p>
            </div>
          ) : productosFiltrados.length === 0 ? (
            <div className="py-20 text-center">
              <p className="text-sm font-black text-[#1e3a8a] uppercase">No hay juguetes en esta categoría</p>
              <button
                onClick={() => setSearchParams({})}
                className="mt-4 px-5 py-2.5 bg-[#a6d4f2] hover:bg-[#8ec2e4] text-[#1e3a8a] font-black rounded-xl text-xs uppercase transition shadow-sm border border-white"
              >
                Ver todos los productos
              </button>
            </div>
          ) : (
            /* Los estantes horizontales con 5 cajas de juguetes apoyadas de frente */
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
                      <div className="h-4 sm:h-5 bg-gradient-to-b from-white via-slate-100 to-slate-200 border-t-2 border-white border-b-2 border-slate-300 shadow-[0_8px_16px_rgba(0,0,0,0.15)] rounded-xs flex items-center justify-between px-3">
                        <div className="w-2 h-2 rounded-full bg-slate-300"></div>
                        <div className="w-2 h-2 rounded-full bg-slate-300"></div>
                      </div>

                      {/* Soportes triangulares inferiores */}
                      <div className="flex justify-between px-8 -mt-0.5">
                        <div className="w-4 h-6 border-l-4 border-slate-300 border-b-4 border-transparent"></div>
                        <div className="w-4 h-6 border-r-4 border-slate-300 border-b-4 border-transparent"></div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Paginación */}
          {totalPaginas > 1 && (
            <div className="mt-10 pt-6 border-t-2 border-slate-100 flex items-center justify-center gap-2">
              <button
                onClick={() => setPagina(p => Math.max(p - 1, 1))}
                disabled={pagina === 1}
                className="px-4 py-2 rounded-xl bg-slate-100 text-[#1e3a8a] text-xs font-black uppercase disabled:opacity-40 hover:bg-slate-200 transition"
              >
                Anterior
              </button>

              {Array.from({ length: totalPaginas }, (_, i) => i + 1).map(num => (
                <button
                  key={num}
                  onClick={() => setPagina(num)}
                  className={`w-9 h-9 rounded-xl text-xs font-black transition ${
                    pagina === num
                      ? 'bg-[#a6d4f2] text-[#1e3a8a] border-2 border-[#1e3a8a] shadow-sm'
                      : 'bg-slate-100 text-[#1e3a8a] hover:bg-slate-200'
                  }`}
                >
                  {num}
                </button>
              ))}

              <button
                onClick={() => setPagina(p => Math.min(p + 1, totalPaginas))}
                disabled={pagina === totalPaginas}
                className="px-4 py-2 rounded-xl bg-slate-100 text-[#1e3a8a] text-xs font-black uppercase disabled:opacity-40 hover:bg-slate-200 transition"
              >
                Siguiente
              </button>
            </div>
          )}
        </div>
      </div>

      {/* =========================================================================
          PÁGINA EMERGENTE / MODAL DETALLADO AL DAR CLIC EN CUALQUIER CAJA
          Z-[9999] PARA QUE NUNCA QUEDE DEBAJO DE LA NAVBAR
          ========================================================================= */}
      {productoSeleccionado && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm font-fredoka animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-3xl sm:max-w-4xl w-full p-6 sm:p-10 shadow-2xl relative border-4 border-amber-300 animate-in zoom-in-95 duration-200 max-h-[92vh] overflow-y-auto">
            
            {/* Botón Cerrar */}
            <button
              onClick={() => setProductoSeleccionado(null)}
              className="w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center absolute top-4 right-4 font-black text-lg shadow-sm transition active:scale-95"
              aria-label="Cerrar modal"
            >
              ×
            </button>

            <div className="flex flex-col md:flex-row gap-8 items-center pt-2">
              {/* Vista de la Caja de Juguete en Grande */}
              <div className="w-full md:w-5/12 bg-gradient-to-b from-amber-50 to-yellow-50 rounded-3xl p-6 flex items-center justify-center border-2 border-amber-200 shadow-inner">
                <div className="scale-110 sm:scale-125 transform py-4">
                  <ToyBoxCard producto={productoSeleccionado} index={0} />
                </div>
              </div>

              {/* Información Detallada y Acciones */}
              <div className="w-full md:w-7/12 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] sm:text-xs font-black uppercase tracking-wider text-amber-800 bg-amber-100 px-3 py-1 rounded-md border border-amber-300">
                    {productoSeleccionado.categoria}
                  </span>

                  <h3 className="text-2xl sm:text-3xl font-black text-[#1e3a8a] mt-2.5 leading-tight">
                    {productoSeleccionado.nombre}
                  </h3>

                  <p className="text-3xl font-black text-[#1e3a8a] mt-2">
                    ${Number(productoSeleccionado.precio).toLocaleString('es-CO')} <span className="text-xs font-bold text-slate-400">COP</span>
                  </p>

                  <p className="mt-4 text-xs sm:text-sm text-slate-600 leading-relaxed max-h-40 overflow-y-auto pr-1">
                    {productoSeleccionado.descripcion}
                  </p>

                  <div className="mt-4 p-3 bg-amber-50 rounded-2xl border border-amber-200 text-xs text-amber-900 font-semibold space-y-1">
                    <p className="flex items-center gap-1.5">
                      <svg className="w-4 h-4 text-amber-700 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                      Empaque 100% sellado, liso y sin distintivos exteriores.
                    </p>
                    <p className="flex items-center gap-1.5">
                      <svg className="w-4 h-4 text-amber-700 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                      Silicona médica biocompatible certificada y suave al tacto.
                    </p>
                  </div>
                </div>

                {/* Feedback de agregado */}
                {agregadoExito && (
                  <div className="mt-3 text-center text-xs font-black text-emerald-700 bg-emerald-50 py-2 rounded-xl border border-emerald-200 animate-pulse">
                    ¡Añadido a tu baúl con éxito!
                  </div>
                )}

                {/* Acciones de Compra y Botón Celeste */}
                <div className="mt-6 pt-4 border-t border-slate-100 flex flex-col gap-2.5">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center border-2 border-slate-200 rounded-2xl px-3 py-1.5 bg-slate-50">
                      <button
                        onClick={() => setCantidadModal(c => Math.max(c - 1, 1))}
                        className="w-6 h-6 font-black text-slate-600 hover:text-[#1e3a8a] text-sm"
                      >
                        -
                      </button>
                      <span className="text-sm font-black text-slate-800 w-8 text-center">{cantidadModal}</span>
                      <button
                        onClick={() => setCantidadModal(c => c + 1)}
                        className="w-6 h-6 font-black text-slate-600 hover:text-[#1e3a8a] text-sm"
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() => agregarAlCarrito(productoSeleccionado, cantidadModal)}
                      className="flex-1 py-3 bg-[#a6d4f2] hover:bg-[#8ec2e4] text-[#1e3a8a] font-black rounded-2xl text-xs uppercase tracking-wider shadow-sm transition active:scale-95 border-2 border-white"
                    >
                      Añadir al Carrito
                    </button>
                  </div>

                  <button
                    onClick={() => {
                      agregarAlCarrito(productoSeleccionado, cantidadModal);
                      setProductoSeleccionado(null);
                      navigate('/carrito');
                    }}
                    className="w-full py-3.5 bg-emerald-500 hover:bg-emerald-600 text-white font-black rounded-2xl text-xs uppercase tracking-wider shadow-md transition active:scale-95 flex items-center justify-center gap-2"
                  >
                    <span>Comprar Ahora y Ver Carrito</span>
                    <span>→</span>
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
