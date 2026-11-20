import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import RoomWrapper from '../components/RoomWrapper';
import AndyCloudsWallpaper from '../components/AndyCloudsWallpaper';
import ToyBoxCard from '../components/ToyBoxCard';

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

  const ITEMS_POR_PAGINA = 12; // 3 estantes x 4 cajas = 12 cajas

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
        setProductos(data);
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

  // Filtrado de productos
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

  // Agrupar en hasta 3 estantes de 4 cajas
  const estantes = [];
  for (let i = 0; i < productosVisibles.length; i += 4) {
    estantes.push(productosVisibles.slice(i, i + 4));
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
          0%, 100% { transform: rotate(-4.5deg); }
          50% { transform: rotate(4.5deg); }
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
          animation: floatHangingCloud 4s ease-in-out infinite;
        }
      `}</style>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-3 sm:px-6 pt-2 pb-24 font-fredoka flex flex-col items-center">
        
        {/* =========================================================================
            ZONA SUPERIOR: NUBE BUSCADORA COLGANTE Y CARTEL "ADD TO CART"
            ========================================================================= */}
        <div className="w-full relative flex items-center justify-center my-3 min-h-[160px]">
          
          {/* 1. SEGUNDA NUBE: EL BUSCADOR Y SECCIONES COLGANDO DE LA NUBE PRINCIPAL */}
          <div className="relative z-10 flex flex-col items-center animate-hanging-cloud max-w-2xl w-full mx-auto px-2">
            
            {/* Cuerdas colgantes que conectan con la nube superior */}
            <div className="w-full max-w-md flex justify-between px-12 -mb-1 relative z-0">
              <div className="w-[2.5px] h-8 sm:h-11 bg-slate-400/70 shadow-xs"></div>
              <div className="w-[2.5px] h-8 sm:h-11 bg-slate-400/70 shadow-xs"></div>
            </div>

            {/* La Nube Blanca con forma suave y sombra */}
            <div className="w-full bg-white/95 backdrop-blur-md rounded-[2.6rem] p-4 sm:p-5 shadow-[0_15px_35px_rgba(0,0,0,0.18)] border-3 border-sky-200 relative z-10">
              
              {/* Barra de entrada de búsqueda */}
              <div className="flex items-center gap-2 w-full">
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
                    className="w-full pl-10 pr-9 py-2.5 bg-amber-50/60 rounded-2xl border-2 border-amber-200 text-slate-800 text-xs sm:text-sm font-bold shadow-inner focus:outline-none focus:border-[#1e3a8a] focus:bg-white transition placeholder:text-slate-400"
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
                      className="w-5 h-5 rounded-full bg-slate-200 text-slate-600 absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center justify-center text-xs font-bold"
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
                  className="px-5 py-2.5 bg-[#a6d4f2] hover:bg-[#8ac6ee] text-[#1e3a8a] font-black rounded-2xl text-xs uppercase tracking-wider shadow-sm transition active:scale-95 whitespace-nowrap border-2 border-white"
                >
                  Buscar
                </button>
              </div>

              {/* Secciones y Categorías en Píldoras que NO se cortan (flex-wrap limpio) */}
              <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 mt-3 pt-2 border-t border-slate-100">
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
                          ? 'bg-[#1e3a8a] text-white border-[#1e3a8a] shadow-md scale-105'
                          : 'bg-slate-50 text-[#1e3a8a] border-slate-200 hover:bg-amber-100 hover:border-amber-300'
                      }`}
                    >
                      {cat.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* 2. CARTEL COLGANTE ANIMADO: "ADD TO CART" (DERECHA, CON CUERDAS Y BALANCEO) */}
          <div 
            onClick={() => navigate('/carrito')}
            className="hidden sm:flex flex-col items-center absolute right-0 lg:right-4 top-0 z-30 cursor-pointer group animate-swing-sign"
            title="Ir a mi Carrito de Compras"
          >
            {/* Cuerdas del cartel conectadas con la nube superior */}
            <div className="flex justify-between w-14 -mb-1 relative z-0">
              <div className="w-[2px] h-9 bg-amber-400 shadow-xs"></div>
              <div className="w-[2px] h-9 bg-amber-400 shadow-xs"></div>
            </div>

            {/* Placa / Cartel estilo juguetería Woody (Amarillo y Rojo) */}
            <div className="bg-gradient-to-b from-[#fbbf24] via-[#f59e0b] to-[#d97706] border-4 border-[#dc2626] rounded-2xl shadow-[0_12px_25px_rgba(0,0,0,0.35)] px-3.5 py-2 flex flex-col items-center justify-center transition-transform group-hover:scale-110 active:scale-95 relative">
              <span className="text-[10px] font-black text-[#dc2626] tracking-wider uppercase drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)] leading-none">
                ADD TO
              </span>
              <span className="text-xs font-black text-[#1e3a8a] tracking-tight uppercase flex items-center gap-1 leading-tight mt-0.5">
                <span>CART</span>
                <span className="text-sm">🛒</span>
              </span>

              {/* Insignia / Contador de artículos */}
              {totalArticulosCarrito > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#dc2626] text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-md animate-bounce">
                  {totalArticulosCarrito}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* =========================================================================
            LA ESTANTERÍA / ARMARIO DE JUGUETES (BLANCO, ELEGANTE, ESTILO CANVA)
            ========================================================================= */}
        <div className="w-full max-w-5xl bg-white/95 backdrop-blur-md rounded-t-[3.5rem] rounded-b-3xl border-4 border-white shadow-[0_25px_60px_rgba(0,0,0,0.35)] p-4 sm:p-8 relative mt-3">
          
          {cargando ? (
            <div className="py-24 flex flex-col items-center justify-center">
              <div className="w-12 h-12 border-4 border-amber-300 border-t-[#1e3a8a] rounded-full animate-spin"></div>
              <p className="mt-4 text-xs font-black text-[#1e3a8a] uppercase tracking-widest">
                Acomodando los juguetes en los estantes...
              </p>
            </div>
          ) : productosFiltrados.length === 0 ? (
            <div className="py-20 text-center">
              <p className="text-sm font-black text-[#1e3a8a] uppercase">No hay juguetes en esta categoría</p>
              <button
                onClick={() => setSearchParams({})}
                className="mt-4 px-5 py-2 bg-[#a6d4f2] text-[#1e3a8a] font-black rounded-xl text-xs uppercase"
              >
                Ver todos los productos
              </button>
            </div>
          ) : (
            /* Los estantes horizontales con las cajas de juguetes de frente */
            <div className="flex flex-col gap-10">
              {estantes.map((estante, estanteIdx) => {
                if (estante.length === 0) return null;
                return (
                  <div key={estanteIdx} className="relative flex flex-col">
                    
                    {/* Fila de Cajas de Juguetes apoyadas sobre el estante */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 justify-items-center items-end pb-1 relative z-10">
                      {estante.map((prod, pIdx) => {
                        const globalIndex = inicio + (estanteIdx * 4) + pIdx;
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
                      ? 'bg-[#1e3a8a] text-white shadow-sm'
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
          ========================================================================= */}
      {productoSeleccionado && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs font-fredoka">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl relative border-4 border-amber-300 animate-in fade-in zoom-in-95 duration-200">
            {/* Botón Cerrar */}
            <button
              onClick={() => setProductoSeleccionado(null)}
              className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center absolute top-4 right-4 font-black text-base shadow-sm transition"
            >
              ×
            </button>

            <div className="flex flex-col sm:flex-row gap-6 items-center">
              {/* Vista de la Caja */}
              <div className="w-full sm:w-1/2 bg-gradient-to-b from-amber-50 to-yellow-50 rounded-2xl p-6 flex items-center justify-center border-2 border-amber-200 shadow-inner">
                <ToyBoxCard producto={productoSeleccionado} index={0} />
              </div>

              {/* Información y Compra */}
              <div className="w-full sm:w-1/2 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-amber-700 bg-amber-100 px-2.5 py-1 rounded-md border border-amber-300">
                    {productoSeleccionado.categoria}
                  </span>

                  <h3 className="text-xl font-black text-[#1e3a8a] mt-2 leading-tight">
                    {productoSeleccionado.nombre}
                  </h3>

                  <p className="text-2xl font-black text-[#1e3a8a] mt-1.5">
                    ${Number(productoSeleccionado.precio).toLocaleString('es-CO')} COP
                  </p>

                  <p className="mt-3 text-xs text-slate-600 leading-relaxed max-h-32 overflow-y-auto">
                    {productoSeleccionado.descripcion}
                  </p>

                  <div className="mt-3 p-2.5 bg-amber-50 rounded-xl border border-amber-200 text-[10px] text-amber-900 font-semibold space-y-0.5">
                    <p>• Empaque 100% sellado y discreto.</p>
                    <p>• Silicona médica biocompatible.</p>
                  </div>
                </div>

                {/* Feedback de agregado */}
                {agregadoExito && (
                  <div className="mt-2 text-center text-xs font-black text-emerald-600 bg-emerald-50 py-1 rounded-lg border border-emerald-200 animate-pulse">
                    ¡Añadido a tu carrito con éxito!
                  </div>
                )}

                {/* Acciones */}
                <div className="mt-4 pt-3 border-t border-slate-100 flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center border-2 border-slate-200 rounded-xl px-2 py-1 bg-slate-50">
                      <button
                        onClick={() => setCantidadModal(c => Math.max(c - 1, 1))}
                        className="w-5 h-5 font-black text-slate-600"
                      >
                        -
                      </button>
                      <span className="text-xs font-black text-slate-800 w-5 text-center">{cantidadModal}</span>
                      <button
                        onClick={() => setCantidadModal(c => c + 1)}
                        className="w-5 h-5 font-black text-slate-600"
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() => agregarAlCarrito(productoSeleccionado, cantidadModal)}
                      className="flex-1 py-2.5 bg-[#a6d4f2] hover:bg-[#8ac6ee] text-[#1e3a8a] font-black rounded-xl text-xs uppercase tracking-wider shadow-sm transition active:scale-95"
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
                    className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-black rounded-xl text-xs uppercase tracking-wider shadow-md transition active:scale-95 flex items-center justify-center gap-1.5"
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
