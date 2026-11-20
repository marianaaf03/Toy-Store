import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import AndyCloudsWallpaper from '../components/AndyCloudsWallpaper';

// Helper de imagen por categoría o imagen existente
function resolveProductImage(producto) {
  if (producto.imagen && (producto.imagen.startsWith('/') || producto.imagen.startsWith('http'))) {
    return producto.imagen;
  }
  const cat = (producto.categoria || '').toLowerCase();
  if (cat.includes('vibra')) return '/images/vibrador_cowgirl.png';
  if (cat.includes('lence')) return '/images/lenceria_andy.png';
  if (cat.includes('anal')) return '/images/plug_anal.png';
  if (cat.includes('kit')) return '/images/mystery_box.png';
  return '/images/cerdito_travieso.png';
}

// Helper de etiqueta de intensidad
function getIntensityBadge(nivel) {
  if (nivel === 1) return { label: 'Iniciación Suave', color: 'bg-emerald-100 text-emerald-700 border-emerald-200' };
  if (nivel === 3) return { label: 'Intensidad Extrema', color: 'bg-rose-100 text-rose-700 border-rose-200' };
  return { label: 'Placer Avanzado', color: 'bg-amber-100 text-amber-700 border-amber-200' };
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
  const [orden, setOrden] = useState('destacados');

  // Estado del Carrito interactivo (guardado en localStorage)
  const [carrito, setCarrito] = useState(() => {
    try {
      const guardado = localStorage.getItem('toy_cart');
      return guardado ? JSON.parse(guardado) : [];
    } catch {
      return [];
    }
  });
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);

  // Modal de detalle rápido
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [cantidadModal, setCantidadModal] = useState(1);

  const ITEMS_POR_PAGINA = 12;

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
  }, [categoriaActiva, busqueda, orden]);

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

  // Filtrado y ordenamiento
  const productosFiltrados = productos.filter(p => {
    if (!busqueda) return true;
    const nombre = (p.nombre || '').toLowerCase();
    const desc = (p.descripcion || '').toLowerCase();
    const cat = (p.categoria || '').toLowerCase();
    return nombre.includes(busqueda) || desc.includes(busqueda) || cat.includes(busqueda);
  }).sort((a, b) => {
    if (orden === 'precio_asc') return Number(a.precio) - Number(b.precio);
    if (orden === 'precio_desc') return Number(b.precio) - Number(a.precio);
    if (orden === 'nombre_asc') return (a.nombre || '').localeCompare(b.nombre || '');
    return 0; // destacados
  });

  const totalPaginas = Math.ceil(productosFiltrados.length / ITEMS_POR_PAGINA);
  const inicio = (pagina - 1) * ITEMS_POR_PAGINA;
  const productosVisibles = productosFiltrados.slice(inicio, inicio + ITEMS_POR_PAGINA);

  const categoriasMenu = [
    { id: 'todos', label: 'Todos' },
    { id: 'vibradores', label: 'Vibradores' },
    { id: 'lencerias', label: 'Lencería' },
    { id: 'anales', label: 'Plugs & Anales' },
    { id: 'dildos', label: 'Dildos' },
    { id: 'cosmetica', label: 'Cosmética & Sensorial' },
    { id: 'accesorios', label: 'Accesorios & BDSM' },
    { id: 'kits', label: 'Kits & Sorpresas' }
  ];

  return (
    <div className="min-h-screen relative flex flex-col overflow-x-hidden bg-gradient-to-b from-[#FFFDF0] via-[#FEF9C3]/35 to-[#FEF08A]/20 font-fredoka">
      
      {/* Patrón de Nubes Eróticas Sutiles de Andy (penes y vulvas oficiales) */}
      <div className="fixed inset-0 pointer-events-none select-none z-0 opacity-[0.13]">
        <AndyCloudsWallpaper />
      </div>

      {/* Navbar Superior */}
      <Navbar />

      {/* Contenido Principal */}
      <main className="relative z-10 flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-24">
        
        {/* Encabezado Boutique */}
        <section className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 bg-amber-100/90 border border-amber-300 text-amber-900 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest shadow-xs mb-3">
            <span>COLECCIÓN OFICIAL TOY STORE</span>
            <span className="w-1.5 h-1.5 rounded-full bg-amber-600"></span>
            <span>SELECCIÓN WOODY</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#1e3a8a] tracking-tight uppercase">
            Boutique de Placer & Fantasía
          </h1>

          <p className="mt-3 text-sm sm:text-base text-slate-600 font-medium leading-relaxed">
            Explora juguetes sensoriales prémium, lencería de ensueño y cosmética íntima.
            Empaque 100% discreto, confidencial y sin ningún distintivo exterior.
          </p>

          {/* Barra de Búsqueda y Ordenamiento */}
          <div className="mt-6 flex flex-col sm:flex-row items-center gap-3 w-full max-w-2xl mx-auto">
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
                placeholder="Buscar vibradores, lencería, plugs, aceites..."
                className="w-full pl-11 pr-10 py-3.5 bg-white/95 rounded-2xl border-2 border-amber-200/80 focus:border-[#1e3a8a] focus:outline-none text-slate-800 text-sm font-semibold shadow-sm transition placeholder:text-slate-400"
              />
              <svg className="w-5 h-5 text-amber-500 absolute left-3.5 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                  className="w-6 h-6 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-600 absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center text-xs font-black transition"
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
              className="w-full sm:w-auto px-6 py-3.5 bg-[#a6d4f2] hover:bg-[#7dd3fc] text-[#0c4a6e] font-black rounded-2xl text-xs uppercase tracking-wider shadow-sm transition active:scale-95 whitespace-nowrap"
            >
              Buscar
            </button>

            <select
              value={orden}
              onChange={(e) => setOrden(e.target.value)}
              className="w-full sm:w-auto px-4 py-3.5 bg-white/95 rounded-2xl border-2 border-amber-200/80 text-slate-700 text-xs font-black uppercase tracking-wider focus:border-[#1e3a8a] focus:outline-none shadow-sm cursor-pointer"
            >
              <option value="destacados">Destacados</option>
              <option value="precio_asc">Precio: Menor a Mayor</option>
              <option value="precio_desc">Precio: Mayor a Menor</option>
              <option value="nombre_asc">Nombre: A a Z</option>
            </select>
          </div>
        </section>

        {/* Píldoras de Categorías */}
        <section className="mb-8">
          <div className="flex items-center gap-2 overflow-x-auto pb-3 scrollbar-none justify-start sm:justify-center">
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
                  className={`px-4 py-2.5 rounded-2xl text-xs font-black uppercase tracking-wider whitespace-nowrap transition-all shadow-xs border ${
                    activo
                      ? 'bg-[#1e3a8a] text-white border-[#1e3a8a] shadow-md scale-105'
                      : 'bg-white/90 text-slate-700 border-amber-200/70 hover:bg-amber-100 hover:text-amber-900'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </section>

        {/* Estado de Carga */}
        {cargando ? (
          <div className="flex flex-col items-center justify-center py-24">
            <div className="w-12 h-12 border-4 border-amber-200 border-t-[#1e3a8a] rounded-full animate-spin"></div>
            <p className="mt-4 text-xs font-black text-[#1e3a8a] uppercase tracking-widest">
              Cargando selección boutique...
            </p>
          </div>
        ) : productosVisibles.length === 0 ? (
          <div className="bg-white/90 rounded-3xl p-12 text-center max-w-md mx-auto border-2 border-dashed border-amber-300 shadow-sm">
            <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mx-auto mb-4 text-2xl font-black">
              ?
            </div>
            <h3 className="text-lg font-black text-[#1e3a8a] uppercase">No encontramos productos</h3>
            <p className="text-xs text-slate-500 mt-2">
              Prueba buscando con otra palabra clave o selecciona la categoría "Todos".
            </p>
            <button
              onClick={() => {
                setFiltroTexto('');
                setSearchParams({});
              }}
              className="mt-5 px-6 py-2.5 bg-[#a6d4f2] hover:bg-[#7dd3fc] text-[#0c4a6e] font-black rounded-xl text-xs uppercase tracking-wider"
            >
              Ver Todo el Catálogo
            </button>
          </div>
        ) : (
          /* Cuadrícula de Tarjetas Boutique */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {productosVisibles.map(producto => {
              const imageSrc = resolveProductImage(producto);
              const badge = getIntensityBadge(producto.nivel_juego);

              return (
                <div
                  key={producto.id}
                  className="bg-white/95 backdrop-blur-sm rounded-3xl p-5 border border-amber-200/80 shadow-[0_10px_25px_rgba(245,158,11,0.06)] hover:shadow-[0_20px_40px_rgba(245,158,11,0.16)] hover:border-amber-400 transition-all duration-300 hover:-translate-y-2 flex flex-col justify-between group relative overflow-hidden"
                >
                  {/* Insignias superiores */}
                  <div className="flex items-center justify-between gap-2 mb-3 z-10">
                    <span className="text-[10px] font-black uppercase tracking-wider text-amber-600 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200">
                      {producto.categoria}
                    </span>
                    <span className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md border ${badge.color}`}>
                      {badge.label}
                    </span>
                  </div>

                  {/* Pedestal de Imagen */}
                  <div
                    onClick={() => {
                      setProductoSeleccionado(producto);
                      setCantidadModal(1);
                    }}
                    className="bg-gradient-to-b from-amber-50/60 to-yellow-50/40 rounded-2xl h-[190px] flex items-center justify-center p-4 relative overflow-hidden group-hover:bg-amber-100/60 transition-colors cursor-pointer"
                  >
                    <img
                      src={imageSrc}
                      alt={producto.nombre}
                      onError={(e) => { e.target.src = '/images/cerdito_travieso.png'; }}
                      className="max-h-[150px] w-auto object-contain drop-shadow-md group-hover:scale-110 group-hover:rotate-2 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <span className="bg-white/95 text-[#1e3a8a] text-[10px] font-black uppercase tracking-wider px-3 py-1.5 rounded-full shadow-md">
                        Ver Detalles
                      </span>
                    </div>
                  </div>

                  {/* Información del Producto */}
                  <div className="mt-4 flex-1 flex flex-col justify-between">
                    <div>
                      <h3
                        onClick={() => {
                          setProductoSeleccionado(producto);
                          setCantidadModal(1);
                        }}
                        className="text-base font-black text-[#1e3a8a] leading-tight line-clamp-1 hover:text-blue-600 cursor-pointer transition-colors"
                        title={producto.nombre}
                      >
                        {producto.nombre}
                      </h3>
                      <p className="mt-1.5 text-xs text-slate-500 line-clamp-2 leading-relaxed">
                        {producto.descripcion}
                      </p>
                    </div>

                    {/* Fila de Precio y Botón de Carrito */}
                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                      <div>
                        <span className="text-[10px] font-bold text-slate-400 block uppercase">Precio</span>
                        <span className="text-lg font-black text-[#1e3a8a] leading-none">
                          ${Number(producto.precio).toLocaleString('es-CO')}
                        </span>
                      </div>

                      <button
                        onClick={() => agregarAlCarrito(producto, 1)}
                        className="bg-[#a6d4f2] hover:bg-[#7dd3fc] text-[#0c4a6e] font-black px-4 py-2.5 rounded-xl text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-sm active:scale-95 transition-all"
                        title="Añadir a mi carrito"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
                        </svg>
                        <span>Añadir</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Paginación */}
        {totalPaginas > 1 && (
          <div className="mt-12 flex items-center justify-center gap-2">
            <button
              onClick={() => setPagina(p => Math.max(p - 1, 1))}
              disabled={pagina === 1}
              className="px-4 py-2 rounded-xl bg-white border border-amber-200 text-slate-700 text-xs font-black uppercase disabled:opacity-40 hover:bg-amber-50 transition"
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
                    : 'bg-white border border-amber-200 text-slate-700 hover:bg-amber-50'
                }`}
              >
                {num}
              </button>
            ))}

            <button
              onClick={() => setPagina(p => Math.min(p + 1, totalPaginas))}
              disabled={pagina === totalPaginas}
              className="px-4 py-2 rounded-xl bg-white border border-amber-200 text-slate-700 text-xs font-black uppercase disabled:opacity-40 hover:bg-amber-50 transition"
            >
              Siguiente
            </button>
          </div>
        )}
      </main>

      {/* Botón Flotante del Carrito */}
      <button
        onClick={() => setCartDrawerOpen(true)}
        className="fixed bottom-6 right-6 z-40 bg-[#1e3a8a] hover:bg-[#172554] text-white p-4 rounded-full shadow-[0_10px_30px_rgba(30,58,138,0.4)] flex items-center justify-center transition-all hover:scale-110 active:scale-95 group"
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

      {/* Cajón Lateral del Carrito (Cart Drawer) */}
      {cartDrawerOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-xs transition-opacity" onClick={() => setCartDrawerOpen(false)}></div>
          
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
              
              {/* Encabezado del Carrito */}
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

              {/* Lista de Productos en el Carrito */}
              <div className="flex-1 overflow-y-auto p-5 divide-y divide-slate-100">
                {carrito.length === 0 ? (
                  <div className="text-center py-16">
                    <div className="w-16 h-16 rounded-full bg-amber-50 text-amber-500 flex items-center justify-center mx-auto mb-3 text-2xl font-black">
                      🛒
                    </div>
                    <p className="text-sm font-black text-[#1e3a8a] uppercase">Tu carrito está vacío</p>
                    <p className="text-xs text-slate-400 mt-1">Explora la boutique y añade tus favoritos.</p>
                  </div>
                ) : (
                  carrito.map(item => (
                    <div key={item.id} className="py-4 flex items-center gap-3">
                      <img
                        src={resolveProductImage(item)}
                        alt={item.nombre}
                        className="w-16 h-16 object-contain rounded-xl bg-amber-50/70 p-2 border border-amber-200/50"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-black text-[#1e3a8a] truncate">{item.nombre}</h4>
                        <p className="text-xs font-black text-amber-700 mt-0.5">
                          ${(Number(item.precio) * item.cantidad).toLocaleString('es-CO')} COP
                        </p>
                        
                        {/* Controles de cantidad */}
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
                        🗑️
                      </button>
                    </div>
                  ))
                )}
              </div>

              {/* Pie del Carrito */}
              {carrito.length > 0 && (
                <div className="p-5 border-t border-slate-100 bg-slate-50/50 flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Subtotal</span>
                    <span className="text-xl font-black text-[#1e3a8a]">
                      ${totalCarrito.toLocaleString('es-CO')} COP
                    </span>
                  </div>

                  <div className="bg-amber-50 p-2.5 rounded-xl border border-amber-200 flex items-center gap-2 text-[11px] text-amber-900 font-semibold">
                    <span>🔒</span>
                    <span>Empaque discreto 100% garantizado sin marcas exteriores.</span>
                  </div>

                  <button
                    onClick={enviarPedidoWhatsApp}
                    className="w-full py-3.5 bg-emerald-500 hover:bg-emerald-600 text-white font-black rounded-2xl text-xs uppercase tracking-wider shadow-md flex items-center justify-center gap-2 active:scale-95 transition"
                  >
                    <span>Pedir por WhatsApp</span>
                  </button>

                  <button
                    onClick={() => {
                      setCartDrawerOpen(false);
                      navigate('/carrito');
                    }}
                    className="w-full py-3 bg-[#a6d4f2] hover:bg-[#7dd3fc] text-[#0c4a6e] font-black rounded-2xl text-xs uppercase tracking-wider transition"
                  >
                    Ir a Finalizar Compra
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Modal de Detalle Rápido del Producto */}
      {productoSeleccionado && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl relative border-2 border-amber-200 animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setProductoSeleccionado(null)}
              className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center absolute top-4 right-4 font-black text-sm"
            >
              ×
            </button>

            <div className="flex flex-col sm:flex-row gap-5 items-center">
              <div className="w-full sm:w-1/2 bg-amber-50/70 rounded-2xl p-6 flex items-center justify-center border border-amber-200/50">
                <img
                  src={resolveProductImage(productoSeleccionado)}
                  alt={productoSeleccionado.nombre}
                  className="max-h-[180px] w-auto object-contain drop-shadow-lg"
                />
              </div>

              <div className="w-full sm:w-1/2 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                    {productoSeleccionado.categoria}
                  </span>
                  <h3 className="text-lg font-black text-[#1e3a8a] mt-2 leading-tight">
                    {productoSeleccionado.nombre}
                  </h3>
                  <p className="text-xl font-black text-[#1e3a8a] mt-1">
                    ${Number(productoSeleccionado.precio).toLocaleString('es-CO')} COP
                  </p>
                  <p className="mt-3 text-xs text-slate-600 leading-relaxed max-h-32 overflow-y-auto">
                    {productoSeleccionado.descripcion}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-100 flex items-center gap-3">
                  <div className="flex items-center gap-2 border border-slate-200 rounded-xl px-2 py-1">
                    <button
                      onClick={() => setCantidadModal(c => Math.max(c - 1, 1))}
                      className="w-5 h-5 font-black text-slate-500"
                    >
                      -
                    </button>
                    <span className="text-xs font-black text-slate-800">{cantidadModal}</span>
                    <button
                      onClick={() => setCantidadModal(c => c + 1)}
                      className="w-5 h-5 font-black text-slate-500"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => {
                      agregarAlCarrito(productoSeleccionado, cantidadModal);
                      setProductoSeleccionado(null);
                    }}
                    className="flex-1 py-2.5 bg-[#a6d4f2] hover:bg-[#7dd3fc] text-[#0c4a6e] font-black rounded-xl text-xs uppercase tracking-wider shadow-sm transition active:scale-95"
                  >
                    Añadir al Carrito
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
