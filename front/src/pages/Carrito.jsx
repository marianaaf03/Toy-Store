import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Navbar from '../components/Navbar';

// Helper de imagen para productos en el carrito con correspondencia exacta
function resolveItemImage(item) {
  const nombre = (item.nombre || '').toLowerCase();
  const cat = (item.categoria || '').toLowerCase();

  if (nombre.includes('cowgirl') || (nombre.includes('woody') && cat.includes('vibra'))) {
    return '/images/vibrador_cowgirl.png';
  }
  if (nombre.includes('rabbit') || nombre.includes('buzz')) {
    return '/images/rabbitbuzz.webp';
  }
  if (nombre.includes('jessie') || (cat.includes('lence') && nombre.includes('vaquera'))) {
    return '/images/lenceria_andy.png';
  }
  if (nombre.includes('plug anal gema') || nombre.includes('gema rubí') || nombre.includes('gema rubi')) {
    return '/images/plug_anal.png';
  }
  if (nombre.includes('caja misteriosa') || (cat.includes('kit') && nombre.includes('toy box'))) {
    return '/images/mystery_box.png';
  }
  if (nombre.includes('cerdito') || nombre.includes('jammy')) {
    return '/images/cerdito_travieso.png';
  }
  if (item.imagen && (item.imagen.startsWith('/') || item.imagen.startsWith('http')) && !item.imagen.includes('cerdito_travieso')) {
    return item.imagen;
  }
  if (cat.includes('lence')) return '/images/lenceria_andy.png';
  if (cat.includes('anal')) return '/images/plug_anal.png';
  if (cat.includes('kit')) return '/images/mystery_box.png';
  return '/images/vibrador_cowgirl.png';
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
  const [cuponValido, setCuponValido] = useState(false);

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
      setCuponValido(true);
      setMensajePromo('Cupón aplicado con éxito. Descuento de $15.000 COP.');
    } else if (codigo === '') {
      setDescuentoAplicado(0);
      setCuponValido(false);
      setMensajePromo('');
    } else {
      setDescuentoAplicado(0);
      setCuponValido(false);
      setMensajePromo('Código de cupón no válido.');
    }
  };

  const subtotal = items.reduce((acc, item) => acc + (Number(item.precio) * item.cantidad), 0);
  const totalArticulos = items.reduce((acc, item) => acc + item.cantidad, 0);
  const total = Math.max(0, subtotal - descuentoAplicado);

  const enviarPedidoWhatsApp = () => {
    if (items.length === 0) return;
    let mensaje = `*¡Hola Toy Store! Quiero confirmar mi pedido desde la web:*

`;
    items.forEach((item, idx) => {
      mensaje += `${idx + 1}. *${item.nombre}* (${item.categoria}) x${item.cantidad} — $${(Number(item.precio) * item.cantidad).toLocaleString('es-CO')} COP
`;
    });
    if (descuentoAplicado > 0) {
      mensaje += `
*Descuento cupón:* -$${descuentoAplicado.toLocaleString('es-CO')} COP
`;
    }
    mensaje += `
*TOTAL A PAGAR:* $${total.toLocaleString('es-CO')} COP
`;
    mensaje += `*Envío:* Gratis (Discreto y Confidencial)
`;
    mensaje += `*Cliente:* ${usuario ? usuario.nombre : 'Cliente Web'}
`;
    mensaje += `
*Solicito empaque 100% sellado sin distintivos de sex shop.*`;

    const url = `https://wa.me/573009028001?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="w-full min-h-screen bg-white select-none font-fredoka text-[#111111]">
      
      {/* ============================================================ */}
      {/* 1. BARRA VERTICAL FIJA A LA IZQUIERDA (DESKTOP: md en adelante) */}
      {/* ============================================================ */}
      <aside className="hidden md:flex fixed left-0 top-0 bottom-0 w-[82px] border-r border-[#e9e9e9] flex-col justify-between items-center py-4 bg-white z-40 select-none">
        
        {/* ICONOS SUPERIORES */}
        <div className="flex flex-col items-center space-y-4 w-full">
          
          {/* LOGO OFICIAL TOY STORE */}
          <div 
            onClick={() => navigate('/')}
            className="w-[76px] h-[58px] rounded-2xl flex items-center justify-center px-1 py-0.5 cursor-pointer hover:opacity-90 transition-opacity"
            title="Toy Store Inicio"
          >
            <img 
              src="/images/logo_config.png" 
              alt="Toy Store" 
              className="w-full h-full object-contain drop-shadow-sm" 
            />
          </div>

          {/* ICONO 1: INICIO (LA CASITA) */}
          <button 
            onClick={() => navigate('/')} 
            className="w-12 h-12 rounded-full hover:bg-[#a6d4f2]/20 flex items-center justify-center text-[#1e3a8a] transition-colors cursor-pointer"
            title="Inicio"
          >
            <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 10.25L10.9 3.5a1.6 1.6 0 0 1 2.2 0L21 10.25V20a1.75 1.75 0 0 1-1.75 1.75H4.75A1.75 1.75 0 0 1 3 20V10.25z" />
              <path d="M9.5 21v-6a2.5 2.5 0 0 1 5 0v6" />
            </svg>
          </button>

          {/* ICONO 2: TIENDA (SOMBRERO / COMPRAS) */}
          <button 
            onClick={() => navigate('/tienda')} 
            className="w-12 h-12 rounded-full hover:bg-[#a6d4f2]/30 flex items-center justify-center text-[#1e3a8a] transition-all cursor-pointer"
            title="Tienda de Juguetes"
          >
            <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
          </button>

          {/* ICONO 3: EL COFRE DE SECRETOS */}
          <button 
            onClick={() => navigate('/configuracion?tab=secretos')}
            className="w-12 h-12 rounded-full hover:bg-[#a6d4f2]/30 flex items-center justify-center text-[#1e3a8a] transition-all cursor-pointer"
            title="Tus secretos guardados"
          >
            <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 11V8.5C4 5.5 7.5 3.5 12 3.5C16.5 3.5 20 5.5 20 8.5V11" />
              <rect x="3.5" y="11" width="17" height="9" rx="2.5" />
              <rect x="10.5" y="10" width="3" height="4" rx="1" fill="currentColor" fillOpacity="0.25" />
              <circle cx="12" cy="12" r="0.8" fill="currentColor" />
              <path d="M7.5 6.5v13.5" strokeOpacity="0.35" strokeWidth="1.8" />
              <path d="M16.5 6.5v13.5" strokeOpacity="0.35" strokeWidth="1.8" />
              <path d="M2.5 13.5v2" strokeWidth="2" strokeOpacity="0.35" />
              <path d="M21.5 13.5v2" strokeWidth="2" strokeOpacity="0.35" />
            </svg>
          </button>

          {/* ICONO 4: CARRITO DE COMPRAS (RESALTADO ACTIVO) */}
          <button 
            onClick={() => navigate('/carrito')}
            className="w-12 h-12 rounded-2xl bg-[#a6d4f2]/40 ring-2 ring-[#a6d4f2] shadow-xs flex items-center justify-center text-[#1e3a8a] transition-all cursor-pointer relative"
            title="Carrito y Factura"
          >
            <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="20" r="1.5" />
              <circle cx="18" cy="20" r="1.5" />
              <path d="M1 2.5h3.5l2.6 11.5a2 2 0 0 0 2 1.5h8.6a2 2 0 0 0 2-1.5L21.5 6.5H5.2" />
            </svg>
            {totalArticulos > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#E52521] text-white text-[10px] font-black flex items-center justify-center ring-2 ring-white">
                {totalArticulos}
              </span>
            )}
          </button>

          {/* ICONO 5: EXPLORAR / BRÚJULA */}
          <button 
            onClick={() => navigate('/configuracion?tab=hoy')} 
            className="w-12 h-12 rounded-full hover:bg-[#a6d4f2]/30 flex items-center justify-center text-[#1e3a8a] transition-all cursor-pointer"
            title="Explorar y Recomendaciones"
          >
            <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="9.25" />
              <polygon points="15.8,8.2 13.2,13.2 8.2,15.8 10.8,10.8" fill="none" />
              <circle cx="12" cy="12" r="1.2" fill="currentColor" stroke="none" />
            </svg>
          </button>
        </div>

        {/* ICONO INFERIOR: CONFIGURACIÓN */}
        <button 
          onClick={() => navigate('/configuracion')}
          className="w-12 h-12 rounded-full hover:bg-[#a6d4f2]/30 flex items-center justify-center text-[#1e3a8a] transition-all cursor-pointer mb-2"
          title="Configuración"
        >
          <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="3" />
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
          </svg>
        </button>
      </aside>

      {/* ============================================================ */}
      {/* BARRA INFERIOR MÓVIL (SOLO VISIBLE EN MÓVILES: < md)         */}
      {/* ============================================================ */}
      <nav className="fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-[#e9e9e9] flex md:hidden justify-around items-center z-40 px-3 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] select-none">
        <button onClick={() => navigate('/')} className="flex flex-col items-center justify-center text-[#1e3a8a] py-1">
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3">
            <path d="M3 10.25L10.9 3.5a1.6 1.6 0 0 1 2.2 0L21 10.25V20a1.75 1.75 0 0 1-1.75 1.75H4.75A1.75 1.75 0 0 1 3 20V10.25z" />
          </svg>
          <span className="text-[10px] font-bold">Inicio</span>
        </button>

        <button onClick={() => navigate('/tienda')} className="flex flex-col items-center justify-center text-[#1e3a8a] py-1">
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3">
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
            <line x1="3" y1="6" x2="21" y2="6" />
          </svg>
          <span className="text-[10px] font-bold">Tienda</span>
        </button>

        <button onClick={() => navigate('/carrito')} className="flex flex-col items-center justify-center text-[#1e3a8a] py-1 relative">
          <div className="w-10 h-10 rounded-2xl bg-[#a6d4f2]/40 ring-2 ring-[#a6d4f2] flex items-center justify-center">
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3">
              <circle cx="9" cy="20" r="1.5" />
              <circle cx="18" cy="20" r="1.5" />
              <path d="M1 2.5h3.5l2.6 11.5a2 2 0 0 0 2 1.5h8.6a2 2 0 0 0 2-1.5L21.5 6.5H5.2" />
            </svg>
          </div>
          {totalArticulos > 0 && (
            <span className="absolute top-0 right-1 w-4 h-4 rounded-full bg-[#E52521] text-white text-[9px] font-black flex items-center justify-center ring-1 ring-white">
              {totalArticulos}
            </span>
          )}
        </button>

        <button onClick={() => navigate('/configuracion?tab=secretos')} className="flex flex-col items-center justify-center text-[#1e3a8a] py-1">
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
            <rect x="3.5" y="11" width="17" height="9" rx="2.5" />
            <path d="M4 11V8.5C4 5.5 7.5 3.5 12 3.5C16.5 3.5 20 5.5 20 8.5V11" />
          </svg>
          <span className="text-[10px] font-bold">Secretos</span>
        </button>

        <button onClick={() => navigate('/configuracion')} className="flex flex-col items-center justify-center text-[#1e3a8a] py-1">
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3">
            <circle cx="12" cy="12" r="3" />
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
          </svg>
          <span className="text-[10px] font-bold">Ajustes</span>
        </button>
      </nav>

      {/* ============================================================ */}
      {/* 2. ÁREA PRINCIPAL CON DESPLAZAMIENTO A LA DERECHA (pl-[82px]) */}
      {/* ============================================================ */}
      <div className="pl-0 md:pl-[82px] pb-20 md:pb-6 min-h-screen flex flex-col">
        
        {/* NAVBAR MINIMALISTA: SOLO EL AVATAR FLOTANTE EN LA ESQUINA DERECHA (SIN NUBE GIGANTE) */}
        <Navbar minimal={true} />

        <main className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-8 py-4 sm:py-6">
          
          {/* Cabecera limpia y estilizada */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 sm:pb-6 mb-6 sm:mb-8 border-b border-gray-100 gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-[#1e3a8a] tracking-tight uppercase">
                Carrito de Compras
              </h1>
              <p className="text-xs sm:text-sm text-[#717171] mt-1 font-medium">
                {items.length === 0 
                  ? 'Tu baúl de compras está actualmente vacío.' 
                  : `Tienes ${totalArticulos} ${totalArticulos === 1 ? 'juguete seleccionado' : 'juguetes seleccionados'} en tu baúl personal.`}
              </p>
            </div>

            {items.length > 0 && (
              <div className="flex items-center gap-3">
                <button
                  onClick={() => navigate('/tienda')}
                  className="px-4 py-2 bg-[#a6d4f2]/40 hover:bg-[#a6d4f2]/70 text-[#1e3a8a] text-xs font-bold rounded-full transition cursor-pointer"
                >
                  ← Seguir Comprando
                </button>
                <button
                  onClick={vaciarCarrito}
                  className="px-4 py-2 text-rose-600 hover:bg-rose-50 text-xs font-bold rounded-full transition border border-rose-200 cursor-pointer"
                >
                  Vaciar
                </button>
              </div>
            )}
          </div>

          {items.length === 0 ? (
            /* Estado Vacío Elegante */
            <div className="py-20 flex flex-col items-center justify-center text-center max-w-md mx-auto px-4">
              <div className="w-24 h-24 rounded-full bg-[#a6d4f2]/20 flex items-center justify-center text-[#1e3a8a] mb-5">
                <svg className="w-12 h-12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <circle cx="9" cy="20" r="1.5" />
                  <circle cx="18" cy="20" r="1.5" />
                  <path d="M1 2.5h3.5l2.6 11.5a2 2 0 0 0 2 1.5h8.6a2 2 0 0 0 2-1.5L21.5 6.5H5.2" />
                </svg>
              </div>
              <h3 className="text-xl font-black text-[#1e3a8a] uppercase">Tu carrito está vacío</h3>
              <p className="text-xs sm:text-sm text-[#717171] mt-2 leading-relaxed">
                Añade tus juguetes sensuales, lencería y aceites favoritos desde la tienda para iniciar tu pedido confidencial.
              </p>
              <button
                onClick={() => navigate('/tienda')}
                className="mt-6 px-7 py-3 bg-[#a6d4f2] hover:bg-[#8ac6ee] text-[#1e3a8a] font-black rounded-full text-xs uppercase tracking-wider shadow-sm transition active:scale-95 cursor-pointer border-2 border-white"
              >
                Explorar Juguetes en Tienda
              </button>
            </div>
          ) : (
            /* Dos Columnas estilo Samsung E-Commerce / Pinterest */
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Columna Izquierda: Lista de Artículos (7 cols) */}
              <div className="lg:col-span-7 space-y-4">
                {items.map(item => {
                  const itemImg = resolveItemImage(item);
                  const itemSubtotal = Number(item.precio) * item.cantidad;

                  return (
                    <div
                      key={item.id}
                      className="bg-white rounded-3xl p-4 sm:p-5 border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-all flex flex-col sm:flex-row items-center gap-4 relative group"
                    >
                      {/* Imagen / Miniatura en contenedor pastel */}
                      <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-amber-50/80 border border-amber-200/60 p-2 flex items-center justify-center shrink-0">
                        <img
                          src={itemImg}
                          alt={item.nombre}
                          className="w-full h-full object-contain drop-shadow-sm group-hover:scale-105 transition-transform"
                        />
                      </div>

                      {/* Detalles del Producto */}
                      <div className="flex-1 text-center sm:text-left min-w-0">
                        <span className="text-[10px] font-black uppercase tracking-wider text-[#ca8a04] bg-amber-100/70 px-2.5 py-0.5 rounded-md border border-amber-300/60 inline-block">
                          {item.categoria}
                        </span>

                        <h3 className="text-sm sm:text-base font-black text-[#1e3a8a] mt-1 truncate uppercase">
                          {item.nombre}
                        </h3>

                        <p className="text-xs text-[#717171] mt-0.5">
                          Precio unitario: ${Number(item.precio).toLocaleString('es-CO')} COP
                        </p>

                        {/* Controles de Cantidad y Eliminar */}
                        <div className="flex items-center justify-center sm:justify-start gap-4 mt-3">
                          <div className="flex items-center border border-gray-200 rounded-xl px-2 py-0.5 bg-gray-50">
                            <button
                              onClick={() => modificarCantidad(item.id, -1)}
                              className="w-6 h-6 font-black text-gray-500 hover:text-[#1e3a8a] text-sm flex items-center justify-center cursor-pointer"
                            >
                              -
                            </button>
                            <span className="text-xs font-black text-gray-800 w-7 text-center">
                              {item.cantidad}
                            </span>
                            <button
                              onClick={() => modificarCantidad(item.id, 1)}
                              className="w-6 h-6 font-black text-gray-500 hover:text-[#1e3a8a] text-sm flex items-center justify-center cursor-pointer"
                            >
                              +
                            </button>
                          </div>

                          <button
                            onClick={() => eliminarItem(item.id)}
                            className="text-xs text-rose-500 hover:text-rose-700 font-bold flex items-center gap-1 transition cursor-pointer"
                          >
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                            <span>Eliminar</span>
                          </button>
                        </div>
                      </div>

                      {/* Subtotal del Item */}
                      <div className="text-center sm:text-right shrink-0">
                        <span className="text-[10px] text-[#717171] uppercase tracking-wider block font-medium">
                          SUBTOTAL
                        </span>
                        <span className="text-base font-black text-[#1e3a8a]">
                          ${itemSubtotal.toLocaleString('es-CO')}
                        </span>
                      </div>
                    </div>
                  );
                })}

                {/* Banner de Garantía y Discreción */}
                <div className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-4 flex items-center gap-3 mt-6">
                  <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-amber-800 shrink-0">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.3" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-amber-900 uppercase">
                      Garantía de Privacidad 100% Blindada
                    </h4>
                    <p className="text-[11px] text-amber-800/90 leading-relaxed mt-0.5">
                      Empaques lisos de cartón sin marcas exteriores, sellos de seguridad inviolables y cobro bancario confidencial.
                    </p>
                  </div>
                </div>
              </div>

              {/* Columna Derecha: Resumen del Pedido (5 cols) */}
              <div className="lg:col-span-5">
                <div className="bg-white rounded-3xl p-6 sm:p-7 border border-gray-100 shadow-[0_10px_35px_rgba(0,0,0,0.06)] sticky top-24">
                  <h2 className="text-lg font-black text-[#1e3a8a] uppercase tracking-tight pb-4 border-b border-gray-100">
                    Resumen del Pedido
                  </h2>

                  {/* Formulario de Cupón de Descuento */}
                  <form onSubmit={aplicarCupon} className="mt-5">
                    <label className="text-[11px] font-black uppercase tracking-wider text-[#717171] block mb-1.5">
                      Código de Cupón o Referido
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={codigoPromo}
                        onChange={(e) => setCodigoPromo(e.target.value)}
                        placeholder="Ej. WOODY10"
                        className="flex-1 px-4 py-2.5 rounded-2xl bg-gray-50 border border-gray-200 text-xs font-bold text-[#111111] focus:outline-none focus:border-[#1e3a8a] focus:bg-white transition uppercase placeholder:normal-case"
                      />
                      <button
                        type="submit"
                        className="px-5 py-2.5 bg-[#a6d4f2] hover:bg-[#8ac6ee] text-[#1e3a8a] font-black rounded-2xl text-xs uppercase tracking-wider transition active:scale-95 cursor-pointer border-2 border-white"
                      >
                        Aplicar
                      </button>
                    </div>

                    {mensajePromo && (
                      <p className={`text-[11px] font-bold mt-2 ${cuponValido ? 'text-emerald-600' : 'text-rose-500'}`}>
                        {mensajePromo}
                      </p>
                    )}
                  </form>

                  {/* Desglose de Costos */}
                  <div className="mt-6 pt-5 border-t border-gray-100 space-y-3">
                    <div className="flex justify-between text-xs text-[#717171] font-medium">
                      <span>Subtotal ({totalArticulos} artículos)</span>
                      <span className="font-bold text-[#111111]">${subtotal.toLocaleString('es-CO')} COP</span>
                    </div>

                    <div className="flex justify-between text-xs text-[#717171] font-medium">
                      <span>Envío a toda Colombia</span>
                      <span className="font-black text-emerald-600 uppercase">¡Gratis!</span>
                    </div>

                    {descuentoAplicado > 0 && (
                      <div className="flex justify-between text-xs text-rose-500 font-bold">
                        <span>Descuento Cupón</span>
                        <span>-${descuentoAplicado.toLocaleString('es-CO')} COP</span>
                      </div>
                    )}

                    <div className="pt-4 border-t border-gray-100 flex justify-between items-baseline">
                      <div>
                        <span className="text-[10px] text-[#717171] font-black uppercase tracking-wider block">
                          Total Estimado
                        </span>
                        <span className="text-2xl font-black text-[#1e3a8a]">
                          ${total.toLocaleString('es-CO')}
                        </span>
                      </div>
                      <span className="text-xs font-bold text-[#717171]">COP</span>
                    </div>
                  </div>

                  {/* Botones de Pago / Pedido */}
                  <div className="mt-6 space-y-3">
                    <button
                      onClick={enviarPedidoWhatsApp}
                      className="w-full py-3.5 bg-emerald-500 hover:bg-emerald-600 text-white font-black rounded-2xl text-xs uppercase tracking-wider shadow-md transition active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      {/* Icono WhatsApp SVG */}
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0012.04 2zm5.79 14.07c-.24.68-1.4 1.25-1.93 1.33-.51.08-1.18.11-1.91-.12-.44-.14-1.02-.34-1.78-.67-3.13-1.36-5.18-4.52-5.34-4.73-.15-.21-1.28-1.7-1.28-3.25 0-1.54.81-2.3 1.1-2.61.29-.31.63-.39.84-.39.21 0 .42.01.6.02.19.01.44-.07.69.53.25.6.86 2.09.93 2.24.08.15.13.33.02.53-.1.21-.16.33-.31.51-.15.18-.32.41-.46.55-.15.15-.31.32-.13.63.18.31.79 1.3 1.7 2.11 1.17 1.04 2.15 1.36 2.46 1.51.31.15.49.13.67-.08.19-.21.79-.92 1-1.23.21-.31.42-.26.7-.15.28.1.79.84 2.1.84 1.3.01 2.17.01 2.24.12.07.1.07.59-.17 1.27z" />
                      </svg>
                      <span>Pedir por WhatsApp (Atención Inmediata)</span>
                    </button>

                    <button
                      onClick={() => alert("Conexión con pasarela de pagos segura PSE / Tarjeta en proceso.")}
                      className="w-full py-3.5 bg-[#a6d4f2] hover:bg-[#8ac6ee] text-[#1e3a8a] font-black rounded-2xl text-xs uppercase tracking-wider shadow-sm transition active:scale-95 flex items-center justify-center gap-2 cursor-pointer border-2 border-white"
                    >
                      <svg className="w-4 h-4 text-[#1e3a8a]" fill="none" stroke="currentColor" strokeWidth="2.3" viewBox="0 0 24 24">
                        <rect x="2" y="5" width="20" height="14" rx="2" />
                        <line x1="2" y1="10" x2="22" y2="10" />
                      </svg>
                      <span>Pagar con PSE / Tarjeta</span>
                    </button>
                  </div>
                </div>
              </div>

            </div>
          )}
        </main>
      </div>

    </div>
  );
}
