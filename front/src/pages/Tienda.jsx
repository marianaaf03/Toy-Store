import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import RoomWrapper from '../components/RoomWrapper';
import AndyCloudsWallpaper from '../components/AndyCloudsWallpaper';
import ToyBoxCard from '../components/ToyBoxCard';
import ToyWoodyHat from '../components/ToyWoodyHat';

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

export default function Tienda() {
  const navigate = useNavigate();
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const categoriaActiva = searchParams.get('cat') || 'todos';
  const busqueda = (searchParams.get('buscar') || searchParams.get('q') || '').toLowerCase().trim();
  const [pagina, setPagina] = useState(1);
  const [filtroTexto, setFiltroTexto] = useState(busqueda);

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
  const [agregadoExito, setAgregadoExito] = useState(false);

  // 5 productos por fila horizontalmente x 3 estantes = 15 productos por página
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
        // Orden estricto solicitado: Vibradores -> Lencería -> Plugs/Anales -> Dildos -> Cosmética -> Accesorios -> Kits
        const sorted = [...data].sort((a, b) => {
          const prioA = getCategoryPriority(a.categoria);
          const prioB = getCategoryPriority(b.categoria);
          if (prioA !== prioB) return prioA - prioB;
          return a.id - b.id;
        });
        setProductos(sorted);
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
          0%, 100% { transform: rotate(-4deg); }
          50% { transform: rotate(4deg); }
        }
        .animate-swing-sign {
          transform-origin: top center;
          animation: swingSign 3.5s ease-in-out infinite;
        }
        @keyframes floatHangingCloud {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-4px); }
        }
        .animate-hanging-cloud {
          animation: floatHangingCloud 4s ease-in-out infinite;
        }
      `}</style>

      {/* =========================================================================
          CARTEL COLGANTE ANIMADO FIJO: "ADD TO CART" (SIEMPRE VISIBLE, 100% FUNCIONAL)
          ========================================================================= */}
      <div 
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          navigate('/carrito');
        }}
        className="fixed top-2 sm:top-4 right-3 sm:right-6 md:right-10 z-[250] cursor-pointer group animate-swing-sign pointer-events-auto select-none"
        title="Ir a mi Carrito de Compras"
      >
        {/* Cuerdas colgantes con remaches dorados que vienen del techo/nube */}
        <div className="flex justify-between w-16 sm:w-20 mx-auto -mb-1 relative z-0">
          <div className="w-[3px] h-7 sm:h-10 bg-gradient-to-b from-slate-400 to-amber-700 shadow-xs relative">
            <div className="w-2.5 h-2.5 rounded-full bg-[#facc15] border border-[#78350f] absolute -top-1 -left-[3.5px]"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-[#facc15] border border-[#78350f] absolute -bottom-1 -left-[3.5px]"></div>
          </div>
          <div className="w-[3px] h-7 sm:h-10 bg-gradient-to-b from-slate-400 to-amber-700 shadow-xs relative">
            <div className="w-2.5 h-2.5 rounded-full bg-[#facc15] border border-[#78350f] absolute -top-1 -left-[3.5px]"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-[#facc15] border border-[#78350f] absolute -bottom-1 -left-[3.5px]"></div>
          </div>
        </div>

        {/* Placa de juguete con doble reborde y remaches */}
        <div className="bg-gradient-to-b from-[#fef08a] via-[#f59e0b] to-[#d97706] border-4 border-[#dc2626] rounded-2xl shadow-[0_14px_30px_rgba(0,0,0,0.35)] px-3 sm:px-4 py-2 sm:py-2.5 flex flex-col items-center justify-center transition-transform group-hover:scale-110 active:scale-95 relative">
          {/* Costura de hilo interior */}
          <div className="absolute inset-1 border border-dashed border-[#dc2626]/40 rounded-xl pointer-events-none"></div>

          <span className="text-[10px] sm:text-[11px] font-black text-[#dc2626] tracking-wider uppercase drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)] leading-none">
            ADD TO
          </span>
          <span className="text-xs sm:text-sm font-black text-[#1e3a8a] tracking-tight uppercase flex items-center gap-1.5 leading-tight mt-0.5">
            <span>CART</span>
            {/* Icono vectorial de Carrito (Cero emojis) */}
            <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#1e3a8a]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <circle cx="9" cy="20" r="1.5" />
              <circle cx="18" cy="20" r="1.5" />
              <path d="M1 2.5h3.5l2.6 11.5a2 2 0 0 0 2 1.5h8.6a2 2 0 0 0 2-1.5L21.5 6.5H5.2" />
            </svg>
          </span>

          {/* Insignia / Contador de artículos */}
          {totalArticulosCarrito > 0 && (
            <span className="absolute -top-2.5 -right-2.5 bg-[#dc2626] text-white text-[10px] font-black w-6 h-6 rounded-full flex items-center justify-center border-2 border-white shadow-md animate-bounce">
              {totalArticulosCarrito}
            </span>
          )}
        </div>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-3 sm:px-6 pt-2 pb-28 font-fredoka flex flex-col items-center select-none">
        
        {/* =========================================================================
            ZONA SUPERIOR: SEGUNDA NUBE CONECTADA POR CUERDAS (EL BUSCADOR Y SECCIONES)
            ========================================================================= */}
        <div className="w-full relative flex items-center justify-center my-3 sm:my-4 min-h-[160px]">
          
          <div className="relative z-10 flex flex-col items-center animate-hanging-cloud max-w-3xl w-full mx-auto px-2">
            
            {/* Cuerdas colgantes con remaches dorados que conectan a la nube superior */}
            <div className="w-full max-w-lg flex justify-between px-16 relative z-0">
              <div className="w-[3px] h-8 sm:h-12 bg-slate-400 shadow-xs relative">
                <div className="w-2.5 h-2.5 rounded-full bg-amber-400 border border-amber-600 absolute -top-1 -left-[3.5px]"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-amber-400 border border-amber-600 absolute -bottom-1 -left-[3.5px]"></div>
              </div>
              <div className="w-[3px] h-8 sm:h-12 bg-slate-400 shadow-xs relative">
                <div className="w-2.5 h-2.5 rounded-full bg-amber-400 border border-amber-600 absolute -top-1 -left-[3.5px]"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-amber-400 border border-amber-600 absolute -bottom-1 -left-[3.5px]"></div>
              </div>
            </div>

            {/* Contenedor en Forma de Nube Redondita con Lóbulos Pomposos y Borde Celeste */}
            <div className="w-full relative">
              {/* Lóbulos superiores decorativos de la nube */}
              <div className="absolute -top-7 left-10 w-20 h-16 rounded-full bg-white border-t-4 border-l-4 border-[#a6d4f2] -z-10 shadow-xs"></div>
              <div className="absolute -top-11 left-[32%] w-28 h-22 rounded-full bg-white border-t-4 border-[#a6d4f2] -z-10 shadow-xs"></div>
              <div className="absolute -top-9 left-[56%] w-24 h-20 rounded-full bg-white border-t-4 border-[#a6d4f2] -z-10 shadow-xs"></div>
              <div className="absolute -top-7 right-10 w-20 h-16 rounded-full bg-white border-t-4 border-r-4 border-[#a6d4f2] -z-10 shadow-xs"></div>

              {/* Cuerpo principal de la nube */}
              <div className="w-full bg-white/95 backdrop-blur-md rounded-[3rem] p-4 sm:p-6 shadow-[0_16px_40px_rgba(30,58,138,0.16)] border-4 border-[#a6d4f2] relative z-10">
                
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
                      className="w-full pl-10 pr-9 py-2.5 bg-amber-50/70 rounded-2xl border-2 border-amber-200 text-slate-800 text-xs sm:text-sm font-bold shadow-inner focus:outline-none focus:border-[#1e3a8a] focus:bg-white transition placeholder:text-slate-400"
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
                <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 mt-3.5 pt-2.5 border-t border-slate-100">
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
        </div>

        {/* =========================================================================
            LA ESTANTERÍA / ARMARIO DE JUGUETES (5 PRODUCTOS POR FILA HORIZONTALMENTE)
            ========================================================================= */}
        <div className="w-full max-w-7xl bg-white/95 backdrop-blur-md rounded-t-[3.5rem] rounded-b-3xl border-4 border-white shadow-[0_25px_60px_rgba(0,0,0,0.35)] p-4 sm:p-8 relative mt-3">
          
          {/* Sombrero de Woody descansando en la esquina superior izquierda del estante */}
          <div className="absolute -top-10 -left-4 sm:-top-14 sm:-left-6 md:-top-16 md:-left-8 z-30 pointer-events-none">
            <ToyWoodyHat className="w-24 sm:w-32 md:w-36 h-auto" />
          </div>

          {cargando ? (
            <div className="py-24 flex flex-col items-center justify-center">
              <div className="w-12 h-12 border-4 border-[#a6d4f2] border-t-[#1e3a8a] rounded-full animate-spin"></div>
              <p className="mt-4 text-xs font-black text-[#1e3a8a] uppercase tracking-widest">
                Acomodando los juguetes en los estantes...
              </p>
            </div>
          ) : productosFiltrados.length === 0 ? (
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
          PÁGINA EMERGENTE / MODAL DETALLADO CON Z-INDEX ELEVADO (SIEMPRE ENCIMA DE NAVBAR)
          ========================================================================= */}
      {productoSeleccionado && (
        <div className="fixed inset-0 z-[400] flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-md font-fredoka select-none animate-in fade-in duration-200">
          <div className="bg-white rounded-[2.5rem] max-w-4xl w-full max-h-[88vh] overflow-y-auto p-6 sm:p-10 shadow-[0_30px_90px_rgba(0,0,0,0.5)] relative border-4 border-amber-300 animate-in zoom-in-95 duration-200 z-[401]">
            
            {/* Botón Cerrar */}
            <button
              onClick={() => setProductoSeleccionado(null)}
              className="w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center absolute top-5 right-5 font-black text-lg shadow-sm transition active:scale-95 cursor-pointer z-10"
            >
              ✕
            </button>

            <div className="flex flex-col md:flex-row gap-8 items-center">
              {/* Vista espaciosa de la Caja */}
              <div className="w-full md:w-5/12 bg-gradient-to-b from-amber-50 to-yellow-50 rounded-3xl p-6 flex items-center justify-center border-2 border-amber-200 shadow-inner">
                <ToyBoxCard producto={productoSeleccionado} index={0} />
              </div>

              {/* Información y Compra */}
              <div className="w-full md:w-7/12 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-amber-800 bg-amber-100 px-3 py-1 rounded-md border border-amber-300">
                    {productoSeleccionado.categoria}
                  </span>

                  <h3 className="text-2xl sm:text-3xl font-black text-[#1e3a8a] mt-2.5 leading-tight uppercase">
                    {productoSeleccionado.nombre}
                  </h3>

                  <p className="text-2xl sm:text-3xl font-black text-[#1e3a8a] mt-2">
                    ${Number(productoSeleccionado.precio).toLocaleString('es-CO')} COP
                  </p>

                  <p className="mt-4 text-xs sm:text-sm text-slate-600 leading-relaxed max-h-36 overflow-y-auto">
                    {productoSeleccionado.descripcion}
                  </p>

                  <div className="mt-4 p-3 bg-amber-50 rounded-2xl border border-amber-200 text-xs text-amber-900 font-semibold space-y-1">
                    <p className="flex items-center gap-1.5">
                      <svg className="w-4 h-4 text-amber-700 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                      Empaque 100% sellado y confidencial.
                    </p>
                    <p className="flex items-center gap-1.5">
                      <svg className="w-4 h-4 text-amber-700 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                      Silicona médica biocompatible certificada.
                    </p>
                  </div>
                </div>

                {/* Feedback de agregado */}
                {agregadoExito && (
                  <div className="mt-3 text-center text-xs font-black text-emerald-700 bg-emerald-50 py-2 rounded-xl border border-emerald-200 animate-pulse">
                    ¡Añadido a tu carrito con éxito!
                  </div>
                )}

                {/* Acciones y Botones en Celeste Configuración */}
                <div className="mt-6 pt-4 border-t border-slate-100 flex flex-col gap-2.5">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center border-2 border-slate-200 rounded-2xl px-3 py-1.5 bg-slate-50">
                      <button
                        onClick={() => setCantidadModal(c => Math.max(c - 1, 1))}
                        className="w-6 h-6 font-black text-slate-600 hover:text-[#1e3a8a] text-sm cursor-pointer"
                      >
                        -
                      </button>
                      <span className="text-sm font-black text-slate-800 w-8 text-center">{cantidadModal}</span>
                      <button
                        onClick={() => setCantidadModal(c => c + 1)}
                        className="w-6 h-6 font-black text-slate-600 hover:text-[#1e3a8a] text-sm cursor-pointer"
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() => agregarAlCarrito(productoSeleccionado, cantidadModal)}
                      className="flex-1 py-3 bg-[#a6d4f2] hover:bg-[#8ac6ee] text-[#1e3a8a] font-black rounded-2xl text-xs uppercase tracking-wider shadow-sm transition active:scale-95 border-2 border-white cursor-pointer"
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
                    className="w-full py-3.5 bg-emerald-500 hover:bg-emerald-600 text-white font-black rounded-2xl text-xs uppercase tracking-wider shadow-md transition active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Comprar Ahora y Ver Carrito</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
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
