import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import AndyCloudsWallpaper from '../components/AndyCloudsWallpaper';

// Helper de imagen para productos en el carrito
function resolveItemImage(item) {
  if (item.imagen && (item.imagen.startsWith('/') || item.imagen.startsWith('http'))) {
    return item.imagen;
  }
  const cat = (item.categoria || '').toLowerCase();
  if (cat.includes('vibra')) return '/images/vibrador_cowgirl.png';
  if (cat.includes('lence')) return '/images/lenceria_andy.png';
  if (cat.includes('anal')) return '/images/plug_anal.png';
  if (cat.includes('kit')) return '/images/mystery_box.png';
  return '/images/cerdito_travieso.png';
}

export default function Carrito() {
  const { usuario } = useContext(AuthContext);
  const navigate = useNavigate();

  // Productos en el carrito (sincronizados con localStorage)
  const [items, setItems] = useState(() => {
    try {
      const stored = localStorage.getItem('toy_carrito') || localStorage.getItem('toy_cart');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch {}
    return [];
  });

  const [codigoPromo, setCodigoPromo] = useState('');
  const [descuentoAplicado, setDescuentoAplicado] = useState(0);
  const [mensajePromo, setMensajePromo] = useState('');

  useEffect(() => {
    try {
      localStorage.setItem('toy_carrito', JSON.stringify(items));
      localStorage.setItem('toy_cart', JSON.stringify(items));
    } catch {}
  }, [items]);

  const modificarCantidad = (id, delta) => {
    setItems(prev => prev.map(item => {
      if (item.id === id) {
        const nueva = item.cantidad + delta;
        return nueva > 0 ? { ...item, cantidad: nueva } : null;
      }
      return item;
    }).filter(Boolean));
  };

  const eliminarItem = (id) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const vaciarCarrito = () => {
    setItems([]);
  };

  const aplicarCupon = (e) => {
    e.preventDefault();
    const codigo = codigoPromo.trim().toUpperCase();
    if (codigo === 'WOODY10' || codigo === 'TOYSTORE' || codigo === 'SENA') {
      setDescuentoAplicado(15000);
      setMensajePromo('¡Cupón aplicado con éxito! Descuento de $15.000 COP');
    } else if (codigo === '') {
      setDescuentoAplicado(0);
      setMensajePromo('');
    } else {
      setDescuentoAplicado(0);
      setMensajePromo('Código de cupón no válido.');
    }
  };

  const subtotal = items.reduce((acc, item) => acc + (Number(item.precio) * item.cantidad), 0);
  const totalArticulos = items.reduce((acc, item) => acc + item.cantidad, 0);
  const envio = 0; // Envío Gratis garantizado
  const total = Math.max(0, subtotal - descuentoAplicado);

  const enviarPedidoWhatsApp = () => {
    if (items.length === 0) return;
    let mensaje = `*¡Hola Toy Store! Quiero confirmar mi pedido desde la web:*\n\n`;
    items.forEach((item, idx) => {
      mensaje += `${idx + 1}. *${item.nombre}* (${item.categoria}) x${item.cantidad} — $${(Number(item.precio) * item.cantidad).toLocaleString('es-CO')} COP\n`;
    });
    if (descuentoAplicado > 0) {
      mensaje += `\n*Descuento cupón:* -$${descuentoAplicado.toLocaleString('es-CO')} COP\n`;
    }
    mensaje += `\n*TOTAL A PAGAR:* $${total.toLocaleString('es-CO')} COP\n`;
    mensaje += `*Envío:* Gratis (Discreto y Confidencial)\n`;
    mensaje += `*Cliente:* ${usuario ? usuario.nombre : 'Cliente Web'}\n`;
    mensaje += `\n*Solicito empaque 100% sellado sin distintivos de sex shop.*`;

    const url = `https://wa.me/573009028001?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen relative flex flex-col overflow-x-hidden bg-gradient-to-b from-[#FFFDF0] via-[#FEF9C3]/30 to-[#FEF08A]/20 font-fredoka">
      
      {/* Fondo de Nubes y Doodles Eróticos */}
      <div className="fixed inset-0 pointer-events-none select-none z-0 opacity-[0.13]">
        <AndyCloudsWallpaper />
      </div>

      {/* Navbar Superior */}
      <Navbar />

      {/* Contenedor Principal Estilo E-Commerce Samsung */}
      <main className="relative z-10 flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Cabecera del Carrito */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b-2 border-amber-200/80 gap-3">
          <div>
            <h1 className="text-3xl sm:text-4xl font-black text-[#1e3a8a] tracking-tight uppercase">
              Carrito de Compras
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
              {totalArticulos > 0 
                ? `Tienes ${totalArticulos} ${totalArticulos === 1 ? 'artículo seleccionado' : 'artículos seleccionados'} en tu baúl.` 
                : 'Tu baúl de compras está esperando nuevos juguetes.'}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate('/tienda')}
              className="px-4 py-2 bg-white hover:bg-amber-50 text-[#1e3a8a] border-2 border-amber-300 font-black rounded-xl text-xs uppercase tracking-wider transition shadow-sm active:scale-95"
            >
              ← Seguir Comprando
            </button>
            {items.length > 0 && (
              <button
                onClick={vaciarCarrito}
                className="px-3 py-2 bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 font-black rounded-xl text-xs uppercase tracking-wider transition"
                title="Vaciar Carrito"
              >
                Vaciar
              </button>
            )}
          </div>
        </div>

        {/* Distribución en Dos Columnas (Estilo Samsung Checkout) */}
        {items.length === 0 ? (
          <div className="bg-white/95 backdrop-blur-md rounded-3xl p-12 text-center max-w-md mx-auto border-2 border-dashed border-amber-300 shadow-md mt-6">
            <div className="w-20 h-20 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mx-auto mb-4 text-3xl font-black">
              🛒
            </div>
            <h2 className="text-xl font-black text-[#1e3a8a] uppercase">Tu carrito está vacío</h2>
            <p className="text-xs text-slate-500 mt-2 leading-relaxed">
              Explora las cajas de juguetes de la tienda oficial de Woody y añade tus favoritos.
            </p>
            <button
              onClick={() => navigate('/tienda')}
              className="mt-6 px-6 py-3 bg-[#a6d4f2] hover:bg-[#8ac6ee] text-[#1e3a8a] font-black rounded-2xl text-xs uppercase tracking-wider shadow-md transition active:scale-95"
            >
              Ir a la Tienda de Juguetes
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* =========================================================
                COLUMNA IZQUIERDA: LISTA DE PRODUCTOS (7 Columnas)
                ========================================================= */}
            <div className="lg:col-span-7 flex flex-col gap-4">
              {items.map(item => {
                const img = resolveItemImage(item);
                const precioTotalItem = Number(item.precio) * item.cantidad;

                return (
                  <div
                    key={item.id}
                    className="bg-white/95 backdrop-blur-md rounded-2xl p-4 sm:p-5 border-2 border-slate-100 shadow-sm hover:shadow-md hover:border-amber-200 transition-all flex flex-col sm:flex-row items-center gap-4"
                  >
                    {/* Imagen del Juguete */}
                    <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-amber-50/70 border border-amber-200/60 p-3 flex items-center justify-center shrink-0">
                      <img
                        src={img}
                        alt={item.nombre}
                        className="max-h-full max-w-full object-contain drop-shadow-sm"
                      />
                    </div>

                    {/* Información y Títulos */}
                    <div className="flex-1 min-w-0 text-center sm:text-left">
                      <span className="text-[10px] font-black text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200 uppercase tracking-wider">
                        {item.categoria}
                      </span>
                      <h3 className="text-base font-black text-[#1e3a8a] mt-1 truncate leading-tight">
                        {item.nombre}
                      </h3>
                      <p className="text-xs font-bold text-slate-400 mt-0.5">
                        Precio unitario: ${Number(item.precio).toLocaleString('es-CO')} COP
                      </p>

                      {/* Controles de Cantidad */}
                      <div className="flex items-center justify-center sm:justify-start gap-3 mt-3">
                        <div className="flex items-center border-2 border-slate-200 rounded-xl px-2 py-1 bg-slate-50">
                          <button
                            onClick={() => modificarCantidad(item.id, -1)}
                            className="w-6 h-6 font-black text-slate-600 hover:text-[#1e3a8a] flex items-center justify-center text-sm"
                          >
                            -
                          </button>
                          <span className="text-xs font-black text-[#1e3a8a] w-6 text-center">
                            {item.cantidad}
                          </span>
                          <button
                            onClick={() => modificarCantidad(item.id, 1)}
                            className="w-6 h-6 font-black text-slate-600 hover:text-[#1e3a8a] flex items-center justify-center text-sm"
                          >
                            +
                          </button>
                        </div>

                        {/* Botón Eliminar */}
                        <button
                          onClick={() => eliminarItem(item.id)}
                          className="text-xs font-bold text-rose-500 hover:text-rose-700 flex items-center gap-1 hover:underline transition"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                          <span>Eliminar</span>
                        </button>
                      </div>
                    </div>

                    {/* Precio Total por Item */}
                    <div className="text-center sm:text-right shrink-0">
                      <span className="text-[10px] text-slate-400 font-bold block uppercase">Subtotal</span>
                      <span className="text-lg font-black text-[#1e3a8a]">
                        ${precioTotalItem.toLocaleString('es-CO')}
                      </span>
                    </div>
                  </div>
                );
              })}

              {/* Tarjeta de Garantía Discreta */}
              <div className="p-4 bg-amber-50/90 rounded-2xl border-2 border-amber-200 flex items-center gap-3 text-xs text-amber-900 font-medium">
                <span className="text-2xl">🔒</span>
                <div>
                  <p className="font-black uppercase text-[11px] text-[#1e3a8a]">
                    Garantía de Privacidad 100% Blindada
                  </p>
                  <p className="text-[11px] text-slate-600 mt-0.5">
                    Empaques lisos de cartón sin marcas exteriores, sellos de seguridad inviolables y cobro bancario discreto.
                  </p>
                </div>
              </div>
            </div>

            {/* =========================================================
                COLUMNA DERECHA: RESUMEN DEL PEDIDO (5 Columnas)
                ========================================================= */}
            <div className="lg:col-span-5 bg-white/95 backdrop-blur-md rounded-3xl p-6 sm:p-7 border-2 border-sky-100 shadow-xl sticky top-24">
              
              <h2 className="text-xl font-black text-[#1e3a8a] uppercase tracking-tight pb-4 border-b border-slate-100">
                Resumen del Pedido
              </h2>

              {/* Cupón Promocional */}
              <form onSubmit={aplicarCupon} className="mt-5">
                <label className="text-[11px] font-black uppercase text-slate-600 block mb-1.5">
                  Código de Cupón o Referido
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={codigoPromo}
                    onChange={(e) => setCodigoPromo(e.target.value)}
                    placeholder="Ej. WOODY10"
                    className="flex-1 px-3.5 py-2.5 bg-slate-50 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 focus:outline-none focus:border-[#1e3a8a] uppercase placeholder:normal-case"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-[#1e3a8a] font-black rounded-xl text-xs uppercase tracking-wider transition"
                  >
                    Aplicar
                  </button>
                </div>
                {mensajePromo && (
                  <p className={`text-[11px] font-bold mt-1.5 ${descuentoAplicado > 0 ? 'text-emerald-600' : 'text-rose-500'}`}>
                    {mensajePromo}
                  </p>
                )}
              </form>

              {/* Desglose de Precios */}
              <div className="mt-6 space-y-3 text-xs font-medium text-slate-600 pt-4 border-t border-slate-100">
                <div className="flex justify-between items-center">
                  <span>Subtotal ({totalArticulos} artículos)</span>
                  <span className="font-black text-[#1e3a8a] text-sm">
                    ${subtotal.toLocaleString('es-CO')} COP
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span>Envío a toda Colombia</span>
                  <span className="font-black text-emerald-600 uppercase text-xs">
                    ¡Gratis!
                  </span>
                </div>

                {descuentoAplicado > 0 && (
                  <div className="flex justify-between items-center text-emerald-600">
                    <span>Descuento de Cupón</span>
                    <span className="font-black">
                      -${descuentoAplicado.toLocaleString('es-CO')} COP
                    </span>
                  </div>
                )}
              </div>

              {/* Total Final */}
              <div className="mt-6 pt-4 border-t-2 border-slate-100 flex justify-between items-baseline">
                <div>
                  <span className="text-xs font-black text-slate-400 uppercase block">Total Estimado</span>
                  <span className="text-2xl sm:text-3xl font-black text-[#1e3a8a]">
                    ${total.toLocaleString('es-CO')}
                  </span>
                </div>
                <span className="text-xs font-black text-slate-500 uppercase">COP</span>
              </div>

              {/* Botón WhatsApp */}
              <div className="mt-6 flex flex-col gap-2.5">
                <button
                  onClick={enviarPedidoWhatsApp}
                  className="w-full py-4 bg-emerald-500 hover:bg-emerald-600 text-white font-black rounded-2xl text-xs uppercase tracking-wider shadow-md flex items-center justify-center gap-2 active:scale-95 transition"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86.173.086.275.072.376-.044.101-.116.433-.506.549-.68.116-.173.231-.145.39-.086s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.099.824z" />
                  </svg>
                  <span>Pedir por WhatsApp (Atención Inmediata)</span>
                </button>

                <button
                  onClick={() => alert('¡Excelente! Serás redirigido a la pasarela de pagos segura Wompi / PSE.')}
                  className="w-full py-3 bg-[#a6d4f2] hover:bg-[#8ac6ee] text-[#1e3a8a] font-black rounded-2xl text-xs uppercase tracking-wider transition active:scale-95 text-center border-2 border-white"
                >
                  Pagar con PSE / Tarjeta
                </button>
              </div>

              {/* Iconos de confianza */}
              <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-around text-slate-400 text-xs">
                <span className="flex items-center gap-1">🔒 SSL Seguro</span>
                <span className="flex items-center gap-1">📦 Envío Neutro</span>
                <span className="flex items-center gap-1">⚡ Entrega Rápida</span>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
