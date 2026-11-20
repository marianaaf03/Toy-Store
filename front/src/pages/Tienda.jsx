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

  // Carrito guardado en localStorage
  const [carrito, setCarrito] = useState(() => {
    try {
      const guardado = localStorage.getItem('toy_cart');
      return guardado ? JSON.parse(guardado) : [];
    } catch {
      return [];
    }
  });
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);

  // Modal emergente del producto al hacer clic en la caja de juguete
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [cantidadModal, setCantidadModal] = useState(1);

  const ITEMS_POR_PAGINA = 12; // 3 estantes de 4 cajas = 12 cajas por estantería

  useEffect(() => {
    fetchProductos();
  }, [categoriaActiva]);

  useEffect(() => {
    try {
      localStorage.setItem('toy_cart', JSON.stringify(carrito));
    } catch {
      // Ignorar
    }
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
    setCartDrawerOpen(true);
  };

  const modificarCantidad = (id, delta) => {
    setCarrito(prev => prev.map(item => {
      if (item.id === id) {
        const nueva = item.cantidad + delta;
        return nueva > 0 ? { ...item, cantidad: nueva } : null;
      }
      return item;
    }).filter(Boolean));
  };

  const eliminarDelCarrito = (id) => {
    setCarrito(prev => prev.filter(item => item.id !== id));
  };

  const totalCarrito = carrito.reduce((sum, item) => sum + (Number(item.precio) * item.cantidad), 0);
  const itemsCount = carrito.reduce((sum, item) => sum + item.cantidad, 0);

  const enviarPedidoWhatsApp = () => {
    if (carrito.length === 0) return;
    let mensaje = `*¡Hola Toy Store! Quiero realizar el siguiente pedido discreto:*\n\n`;
    carrito.forEach((item, idx) => {
      mensaje += `${idx + 1}. *${item.nombre}* x${item.cantidad} - $${(Number(item.precio) * item.cantidad).toLocaleString('es-CO')} COP\n`;
    });
    mensaje += `\n*TOTAL:* $${totalCarrito.toLocaleString('es-CO')} COP\n`;
    mensaje += `*Solicito empaque 100% discreto y confidencial.*`;
    
    const url = `https://wa.me/573009028001?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');
  };

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

  // Agrupar en hasta 3 estantes de 4 cajas cada uno
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
    { id: 'accesorios', label: 'Accesorios' },
    { id: 'kits', label: 'Kits & Sorpresas' }
  ];

  return (
    <RoomWrapper 
      theme="woody" 
      wallpaperContent={<AndyCloudsWallpaper />}
    >
      <div className="relative z-10 w-full max-w-6xl mx-auto px-3 sm:px-6 pt-6 pb-24 font-fredoka flex flex-col items-center">
        
        {/* TÍTULO Y FILTROS SOBRE LA ESTANTERÍA */}
        <div className="text-center max-w-3xl mx-auto mb-6">
          <div className="inline-flex items-center gap-2 bg-white/95 border-2 border-amber-300 text-[#1e3a8a] px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest shadow-md mb-2">
            <span>ARMARIO DE JUGUETES DE WOODY</span>
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
            <span>EDICIÓN COLECCIONISTA</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white drop-shadow-[0_4px_8px_rgba(0,0,0,0.4)] tracking-tight uppercase">
            Tienda Toy Store
          </h1>

          {/* Barra de Búsqueda */}
          <div className="mt-4 flex flex-col sm:flex-row items-center gap-2 w-full max-w-xl mx-auto">
            <div className="relative flex-1 w-full">
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
                placeholder="Buscar juguetes en el armario..."
                className="w-full pl-10 pr-9 py-2.5 bg-white/95 rounded-2xl border-2 border-amber-300 text-slate-800 text-xs font-bold shadow-md focus:outline-none focus:border-[#1e3a8a]"
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
              className="px-5 py-2.5 bg-[#a6d4f2] hover:bg-[#8ac6ee] text-[#1e3a8a] font-black rounded-2xl text-xs uppercase tracking-wider shadow-md transition active:scale-95 whitespace-nowrap border-2 border-white"
            >
              Buscar
            </button>
          </div>

          {/* Píldoras de Categorías */}
          <div className="mt-4 flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none justify-start sm:justify-center">
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
                  className={`px-3 py-1.5 rounded-xl text-[11px] font-black uppercase tracking-wider whitespace-nowrap transition-all border ${
                    activo
                      ? 'bg-[#1e3a8a] text-white border-white shadow-md scale-105'
                      : 'bg-white/90 text-[#1e3a8a] border-amber-200 hover:bg-white'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* =========================================================================
            LA ESTANTERÍA / ARMARIO DE JUGUETES (BLANCO, ELEGANTE, ESTILO CANVA)
            ========================================================================= */}
        <div className="w-full max-w-5xl bg-white/95 backdrop-blur-md rounded-t-[3.5rem] rounded-b-3xl border-4 border-white shadow-[0_25px_60px_rgba(0,0,0,0.35)] p-4 sm:p-8 relative">
          
          {/* Corona superior arqueada con adorno Toy Store */}
          <div className="text-center -mt-2 mb-6">
            <span className="text-[11px] font-black text-amber-700 uppercase tracking-widest bg-amber-50 border border-amber-200 px-4 py-1 rounded-full">
              Colección Oficial • Paquetes Sorpresa
            </span>
          </div>

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
              {/* Vista del Juguete */}
              <div className="w-full sm:w-1/2 bg-gradient-to-b from-amber-50 to-yellow-50 rounded-2xl p-6 flex items-center justify-center border-2 border-amber-200 shadow-inner">
                <ToyBoxCard producto={productoSeleccionado} index={0} />
              </div>

              {/* Información y Compra */}
              <div className="w-full sm:w-1/2 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-amber-700 bg-amber-100 px-2.5 py-1 rounded-md border border-amber-300">
                    {productoSeleccionado.categoria}
                  </span>

                  <h3 className="text-xl font-black text-[#1e3a8a] mt-2.5 leading-tight">
                    {productoSeleccionado.nombre}
                  </h3>

                  <p className="text-2xl font-black text-[#1e3a8a] mt-2">
                    ${Number(productoSeleccionado.precio).toLocaleString('es-CO')} COP
                  </p>

                  <p className="mt-3 text-xs text-slate-600 leading-relaxed max-h-36 overflow-y-auto">
                    {productoSeleccionado.descripcion}
                  </p>

                  {/* Garantías y Discreción */}
                  <div className="mt-3 p-2.5 bg-amber-50 rounded-xl border border-amber-200 text-[10px] text-amber-900 font-semibold space-y-1">
                    <p>• Empaque 100% neutro sin distintivos.</p>
                    <p>• Silicona médica hipoalergénica.</p>
                  </div>
                </div>

                {/* Controles de Cantidad y Botón Añadir */}
                <div className="mt-5 pt-4 border-t border-slate-100 flex items-center gap-3">
                  <div className="flex items-center gap-2 border border-slate-200 rounded-xl px-2 py-1 bg-slate-50">
                    <button
                      onClick={() => setCantidadModal(c => Math.max(c - 1, 1))}
                      className="w-5 h-5 font-black text-slate-600"
                    >
                      -
                    </button>
                    <span className="text-xs font-black text-slate-800">{cantidadModal}</span>
                    <button
                      onClick={() => setCantidadModal(c => c + 1)}
                      className="w-5 h-5 font-black text-slate-600"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => {
                      agregarAlCarrito(productoSeleccionado, cantidadModal);
                      setProductoSeleccionado(null);
                    }}
                    className="flex-1 py-3 bg-[#a6d4f2] hover:bg-[#8ac6ee] text-[#1e3a8a] font-black rounded-xl text-xs uppercase tracking-wider shadow-md transition active:scale-95"
                  >
                    Añadir al Carrito
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Botón Flotante del Carrito */}
      <button
        onClick={() => setCartDrawerOpen(true)}
        className="fixed bottom-6 right-6 z-40 bg-[#1e3a8a] hover:bg-[#172554] text-white p-4 rounded-full shadow-[0_10px_30px_rgba(30,58,138,0.5)] flex items-center justify-center transition-all hover:scale-110 active:scale-95 group"
        title="Abrir Carrito"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
        {itemsCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[11px] font-black w-6 h-6 rounded-full flex items-center justify-center border-2 border-white shadow-sm animate-bounce">
            {itemsCount}
          </span>
        )}
      </button>

      {/* Drawer Lateral del Carrito */}
      {cartDrawerOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden font-fredoka">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-xs transition-opacity" onClick={() => setCartDrawerOpen(false)}></div>
          
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
              
              <div className="p-5 bg-gradient-to-r from-amber-50 to-yellow-50 border-b border-amber-200 flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-black text-[#1e3a8a] uppercase">Tu Carrito Toy Store</h2>
                  <p className="text-xs text-slate-500">{itemsCount} artículos seleccionados</p>
                </div>
                <button
                  onClick={() => setCartDrawerOpen(false)}
                  className="w-8 h-8 rounded-full bg-white border border-slate-200 text-slate-500 hover:bg-slate-100 flex items-center justify-center font-bold text-sm"
                >
                  ×
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-5 divide-y divide-slate-100">
                {carrito.length === 0 ? (
                  <div className="text-center py-16">
                    <p className="text-sm font-black text-[#1e3a8a] uppercase">Tu carrito está vacío</p>
                    <p className="text-xs text-slate-400 mt-1">Explora la estantería y añade juguetes a tu baúl.</p>
                  </div>
                ) : (
                  carrito.map(item => (
                    <div key={item.id} className="py-4 flex items-center gap-3">
                      <div className="w-14 h-14 bg-amber-50 rounded-xl flex items-center justify-center p-1 border border-amber-200">
                        <span className="text-xs font-black text-amber-700 uppercase">TOY</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-black text-[#1e3a8a] truncate">{item.nombre}</h4>
                        <p className="text-xs font-black text-amber-700 mt-0.5">
                          ${(Number(item.precio) * item.cantidad).toLocaleString('es-CO')} COP
                        </p>
                        
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            onClick={() => modificarCantidad(item.id, -1)}
                            className="w-6 h-6 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center text-xs font-black"
                          >
                            -
                          </button>
                          <span className="text-xs font-black text-slate-800 w-4 text-center">{item.cantidad}</span>
                          <button
                            onClick={() => modificarCantidad(item.id, 1)}
                            className="w-6 h-6 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center text-xs font-black"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      <button
                        onClick={() => eliminarDelCarrito(item.id)}
                        className="text-slate-400 hover:text-rose-500 p-2 text-xs font-bold"
                        title="Quitar"
                      >
                        ×
                      </button>
                    </div>
                  ))
                )}
              </div>

              {carrito.length > 0 && (
                <div className="p-5 border-t border-slate-100 bg-slate-50/50 flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Subtotal</span>
                    <span className="text-xl font-black text-[#1e3a8a]">
                      ${totalCarrito.toLocaleString('es-CO')} COP
                    </span>
                  </div>

                  <button
                    onClick={enviarPedidoWhatsApp}
                    className="w-full py-3.5 bg-emerald-500 hover:bg-emerald-600 text-white font-black rounded-2xl text-xs uppercase tracking-wider shadow-md flex items-center justify-center gap-2 active:scale-95 transition"
                  >
                    Pedir por WhatsApp
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </RoomWrapper>
  );
}
