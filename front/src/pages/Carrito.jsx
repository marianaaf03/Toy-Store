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

  // Estados del Checkout / Pasarela de Pago Realista
  const [mostrarCheckout, setMostrarCheckout] = useState(false);
  const [pasoCheckout, setPasoCheckout] = useState(1);
  const [errorCheckout, setErrorCheckout] = useState('');
  const [pedidoConfirmado, setPedidoConfirmado] = useState(null);

  const [datosEnvio, setDatosEnvio] = useState({
    nombre: '',
    email: '',
    telefono: '',
    departamento: 'Antioquia',
    ciudad: 'Medellín',
    direccion: '',
    barrio: '',
    notas: '',
    empaqueDiscreto: true
  });

  const [datosPago, setDatosPago] = useState({
    metodo: 'pse',
    pseBanco: 'Bancolombia',
    pseTipoPersona: 'Natural',
    pseDocTipo: 'CC',
    pseDocNumero: '',
    tarjetaNumero: '',
    tarjetaNombre: '',
    tarjetaExpiracion: '',
    tarjetaCvv: '',
    tarjetaCuotas: '1',
    nequiComprobante: ''
  });

  useEffect(() => {
    if (usuario) {
      setDatosEnvio(prev => ({
        ...prev,
        nombre: prev.nombre || usuario.nombre || '',
        email: prev.email || usuario.email || '',
        telefono: prev.telefono || usuario.telefono || ''
      }));
    }
  }, [usuario]);

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

  const handleIniciarCheckout = () => {
    if (items.length === 0) return;
    setErrorCheckout('');
    setPasoCheckout(1);
    setMostrarCheckout(true);
  };

  const handleValidarEnvio = (e) => {
    e.preventDefault();
    setErrorCheckout('');
    if (!datosEnvio.nombre.trim()) {
      setErrorCheckout('Por favor ingresa tu nombre completo.');
      return;
    }
    if (!datosEnvio.email.trim() || !datosEnvio.email.includes('@')) {
      setErrorCheckout('Por favor ingresa un correo electrónico válido.');
      return;
    }
    if (!datosEnvio.telefono.trim()) {
      setErrorCheckout('Por favor ingresa un número de teléfono o celular.');
      return;
    }
    if (!datosEnvio.direccion.trim()) {
      setErrorCheckout('Por favor ingresa la dirección de entrega.');
      return;
    }
    setPasoCheckout(2);
  };

  const handleConfirmarPago = (e) => {
    e.preventDefault();
    setErrorCheckout('');

    if (datosPago.metodo === 'pse') {
      if (!datosPago.pseDocNumero.trim()) {
        setErrorCheckout('Por favor ingresa tu número de documento para PSE.');
        return;
      }
    } else if (datosPago.metodo === 'tarjeta') {
      const limpioNum = datosPago.tarjetaNumero.replace(/\s+/g, '');
      if (limpioNum.length < 15) {
        setErrorCheckout('Por favor ingresa los 16 dígitos de tu tarjeta.');
        return;
      }
      if (!datosPago.tarjetaNombre.trim()) {
        setErrorCheckout('Por favor ingresa el nombre impreso en la tarjeta.');
        return;
      }
      if (!datosPago.tarjetaExpiracion.trim()) {
        setErrorCheckout('Por favor ingresa la fecha de vencimiento (MM/AA).');
        return;
      }
      if (datosPago.tarjetaCvv.length < 3) {
        setErrorCheckout('Por favor ingresa el código CVV.');
        return;
      }
    }

    // Paso 3: Pantalla de procesamiento realista (2.2 segundos)
    setPasoCheckout(3);

    setTimeout(() => {
      const randomNum = Math.floor(1000 + Math.random() * 9000);
      const idOrden = `TS-2026-${randomNum}`;
      const idGuia = `ENV-${Math.floor(10000000 + Math.random() * 90000000)}CO`;
      const fechaActual = new Date().toLocaleString('es-CO', { 
        year: 'numeric', 
        month: '2-digit', 
        day: '2-digit', 
        hour: '2-digit', 
        minute: '2-digit', 
        hour12: true 
      });

      let metodoNombre = 'PSE';
      if (datosPago.metodo === 'pse') {
        metodoNombre = `PSE (${datosPago.pseBanco})`;
      } else if (datosPago.metodo === 'tarjeta') {
        const ultimos4 = datosPago.tarjetaNumero.replace(/\s+/g, '').slice(-4) || '4242';
        metodoNombre = `Tarjeta Débito/Crédito (•••• ${ultimos4})`;
      } else if (datosPago.metodo === 'nequi') {
        metodoNombre = 'Nequi / Daviplata';
      } else if (datosPago.metodo === 'contraentrega') {
        metodoNombre = 'Pago Contra Entrega (Efectivo)';
      }

      const ordenCreada = {
        id: idOrden,
        fecha: fechaActual,
        cliente: datosEnvio.nombre.trim(),
        email: datosEnvio.email.trim(),
        telefono: datosEnvio.telefono.trim(),
        ciudad: `${datosEnvio.ciudad}, ${datosEnvio.departamento}`,
        direccion: `${datosEnvio.direccion.trim()}${datosEnvio.barrio ? ', ' + datosEnvio.barrio.trim() : ''}`,
        productos: items.map(it => ({
          nombre: it.nombre,
          cantidad: it.cantidad,
          precio: Number(it.precio)
        })),
        total: total,
        metodoPago: metodoNombre,
        estado: datosPago.metodo === 'contraentrega' ? 'Pendiente' : 'En camino',
        guia: idGuia,
        empaqueDiscreto: true,
        notas: datosEnvio.notas ? datosEnvio.notas.trim() : 'Empaque 100% sellado neutro y confidencial.'
      };

      // Registrar pedido en localStorage para el panel de administración
      try {
        const guardados = localStorage.getItem('toystore_admin_pedidos');
        let lista = guardados ? JSON.parse(guardados) : [];
        if (!Array.isArray(lista)) lista = [];
        lista = [ordenCreada, ...lista];
        localStorage.setItem('toystore_admin_pedidos', JSON.stringify(lista));
        window.dispatchEvent(new Event('toystore_orders_updated'));
      } catch (err) {
        console.warn('Error guardando en historial admin:', err);
      }

      setPedidoConfirmado(ordenCreada);
      setItems([]);
      try {
        localStorage.removeItem('toy_carrito');
        localStorage.removeItem('toy_cart');
      } catch {}

      setPasoCheckout(4);
    }, 2200);
  };

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
                      onClick={handleIniciarCheckout}
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

      {/* ============================================================ */}
      {/* MODAL DE CHECKOUT / PASARELA DE PAGO PROFESIONAL Y REALISTA */}
      {/* ============================================================ */}
      {mostrarCheckout && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden border border-slate-100 flex flex-col max-h-[90vh]">
            
            {/* Header del Modal */}
            <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-blue-100 flex items-center justify-center text-[#1e3a8a]">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-base font-black text-[#1e3a8a]">Pasarela de Pago Segura</h3>
                  <p className="text-[11px] text-slate-500 font-medium">Toy Store Colombia • Cifrado SSL 256-Bit</p>
                </div>
              </div>

              {pasoCheckout !== 3 && (
                <button
                  onClick={() => setMostrarCheckout(false)}
                  className="w-8 h-8 rounded-full bg-slate-200/60 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>

            {/* Barra de progreso de pasos */}
            <div className="bg-white px-6 py-3 border-b border-slate-100 flex items-center justify-between text-xs font-bold text-slate-500">
              <div className={`flex items-center gap-2 ${pasoCheckout >= 1 ? 'text-[#1e3a8a]' : 'opacity-40'}`}>
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] text-white ${pasoCheckout >= 1 ? 'bg-[#1e3a8a]' : 'bg-slate-300'}`}>1</span>
                <span>Envío</span>
              </div>
              <div className="flex-1 h-[2px] bg-slate-100 mx-3"></div>
              <div className={`flex items-center gap-2 ${pasoCheckout >= 2 ? 'text-[#1e3a8a]' : 'opacity-40'}`}>
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] text-white ${pasoCheckout >= 2 ? 'bg-[#1e3a8a]' : 'bg-slate-300'}`}>2</span>
                <span>Pago</span>
              </div>
              <div className="flex-1 h-[2px] bg-slate-100 mx-3"></div>
              <div className={`flex items-center gap-2 ${pasoCheckout >= 3 ? 'text-[#1e3a8a]' : 'opacity-40'}`}>
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] text-white ${pasoCheckout >= 3 ? 'bg-[#1e3a8a]' : 'bg-slate-300'}`}>3</span>
                <span>Confirmación</span>
              </div>
            </div>

            {/* Mensaje de error general si ocurre */}
            {errorCheckout && (
              <div className="mx-6 mt-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs font-bold flex items-center gap-2">
                <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{errorCheckout}</span>
              </div>
            )}

            {/* Contenido según el paso */}
            <div className="p-6 overflow-y-auto flex-1">
              
              {/* ================================================= */}
              {/* PASO 1: DATOS DE ENVÍO Y CONFIDENCIALIDAD */}
              {/* ================================================= */}
              {pasoCheckout === 1 && (
                <form onSubmit={handleValidarEnvio} className="space-y-4">
                  <div className="p-3 bg-blue-50/60 rounded-2xl border border-blue-100/80 flex items-start gap-3">
                    <svg className="w-5 h-5 text-[#1e3a8a] shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    <div className="text-xs">
                      <p className="font-bold text-[#1e3a8a]">Garantía de Privacidad Absoluta</p>
                      <p className="text-slate-500">Tus datos personales y de envío son tratados bajo estricta confidencialidad. Tu pedido se enviará en empaque 100% neutro.</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Nombre y Apellido *</label>
                      <input
                        type="text"
                        value={datosEnvio.nombre}
                        onChange={e => setDatosEnvio({ ...datosEnvio, nombre: e.target.value })}
                        placeholder="Ej. Keissy Mesa"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#1e3a8a] transition"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Correo Electrónico *</label>
                      <input
                        type="email"
                        value={datosEnvio.email}
                        onChange={e => setDatosEnvio({ ...datosEnvio, email: e.target.value })}
                        placeholder="tucorreo@ejemplo.com"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#1e3a8a] transition"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Teléfono / WhatsApp *</label>
                      <input
                        type="tel"
                        value={datosEnvio.telefono}
                        onChange={e => setDatosEnvio({ ...datosEnvio, telefono: e.target.value })}
                        placeholder="+57 300 000 0000"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#1e3a8a] transition"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Departamento</label>
                      <select
                        value={datosEnvio.departamento}
                        onChange={e => setDatosEnvio({ ...datosEnvio, departamento: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#1e3a8a] transition bg-white"
                      >
                        <option value="Antioquia">Antioquia</option>
                        <option value="Bogotá D.C.">Bogotá D.C.</option>
                        <option value="Valle del Cauca">Valle del Cauca</option>
                        <option value="Atlántico">Atlántico</option>
                        <option value="Santander">Santander</option>
                        <option value="Cundinamarca">Cundinamarca</option>
                        <option value="Risaralda">Risaralda</option>
                        <option value="Caldas">Caldas</option>
                        <option value="Bolívar">Bolívar</option>
                        <option value="Otro">Otro departamento</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Ciudad *</label>
                      <input
                        type="text"
                        value={datosEnvio.ciudad}
                        onChange={e => setDatosEnvio({ ...datosEnvio, ciudad: e.target.value })}
                        placeholder="Ej. Medellín"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#1e3a8a] transition"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Barrio / Sector</label>
                      <input
                        type="text"
                        value={datosEnvio.barrio}
                        onChange={e => setDatosEnvio({ ...datosEnvio, barrio: e.target.value })}
                        placeholder="Ej. El Poblado / Laureles"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#1e3a8a] transition"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Dirección Completa de Entrega *</label>
                    <input
                      type="text"
                      value={datosEnvio.direccion}
                      onChange={e => setDatosEnvio({ ...datosEnvio, direccion: e.target.value })}
                      placeholder="Calle / Carrera #, Apto, Torre, Oficina"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#1e3a8a] transition"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Instrucciones para la Entrega (Opcional)</label>
                    <input
                      type="text"
                      value={datosEnvio.notas}
                      onChange={e => setDatosEnvio({ ...datosEnvio, notas: e.target.value })}
                      placeholder="Ej. Dejar en recepción o portería, no timbrar"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#1e3a8a] transition"
                    />
                  </div>

                  <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200/80 flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="empaqueDiscretoCheck"
                      checked={datosEnvio.empaqueDiscreto}
                      onChange={e => setDatosEnvio({ ...datosEnvio, empaqueDiscreto: e.target.checked })}
                      className="w-4 h-4 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500 cursor-pointer"
                    />
                    <label htmlFor="empaqueDiscretoCheck" className="text-xs font-bold text-emerald-800 cursor-pointer">
                      Solicitar empaque 100% neutro, sellado y sin descripción ni logos visibles de sex shop (Recomendado).
                    </label>
                  </div>

                  <div className="pt-3 flex justify-between items-center border-t border-slate-100">
                    <span className="text-sm font-bold text-slate-600">Total a pagar: <strong className="text-[#1e3a8a] text-base">${total.toLocaleString('es-CO')} COP</strong></span>
                    <button
                      type="submit"
                      className="px-6 py-3 bg-[#1e3a8a] hover:bg-blue-900 text-white font-bold rounded-2xl text-xs uppercase tracking-wider transition shadow-md active:scale-95"
                    >
                      Continuar al Pago
                    </button>
                  </div>
                </form>
              )}

              {/* ================================================= */}
              {/* PASO 2: MÉTODO DE PAGO */}
              {/* ================================================= */}
              {pasoCheckout === 2 && (
                <form onSubmit={handleConfirmarPago} className="space-y-5">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {[
                      { id: 'pse', titulo: 'PSE', subtitulo: 'Débito Bancario' },
                      { id: 'tarjeta', titulo: 'Tarjeta', subtitulo: 'Crédito / Débito' },
                      { id: 'nequi', titulo: 'Nequi / Davi', subtitulo: 'Billetera Móvil' },
                      { id: 'contraentrega', titulo: 'Contra Entrega', subtitulo: 'Pago en Efectivo' }
                    ].map(met => (
                      <button
                        key={met.id}
                        type="button"
                        onClick={() => setDatosPago({ ...datosPago, metodo: met.id })}
                        className={`p-3 rounded-2xl border-2 text-left transition ${datosPago.metodo === met.id ? 'border-[#1e3a8a] bg-blue-50/50' : 'border-slate-200 hover:border-slate-300'}`}
                      >
                        <div className="text-xs font-black text-[#1e3a8a]">{met.titulo}</div>
                        <div className="text-[10px] text-slate-500 font-medium">{met.subtitulo}</div>
                      </button>
                    ))}
                  </div>

                  {/* FORMULARIO PSE */}
                  {datosPago.metodo === 'pse' && (
                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                      <p className="text-xs font-bold text-[#1e3a8a]">Pago Seguro mediante PSE (Transferencia en Línea)</p>
                      
                      <div>
                        <label className="block text-xs font-bold text-slate-600 mb-1">Selecciona tu Banco *</label>
                        <select
                          value={datosPago.pseBanco}
                          onChange={e => setDatosPago({ ...datosPago, pseBanco: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm bg-white focus:outline-none focus:border-[#1e3a8a]"
                        >
                          <option value="Bancolombia">Bancolombia</option>
                          <option value="Davivienda">Davivienda</option>
                          <option value="Nequi">Nequi</option>
                          <option value="Banco de Bogotá">Banco de Bogotá</option>
                          <option value="BBVA Colombia">BBVA Colombia</option>
                          <option value="Banco de Occidente">Banco de Occidente</option>
                          <option value="Scotiabank Colpatria">Scotiabank Colpatria</option>
                          <option value="Banco Popular">Banco Popular</option>
                          <option value="Banco AV Villas">Banco AV Villas</option>
                          <option value="Nubank">Nubank Colombia</option>
                          <option value="Lulo Bank">Lulo Bank</option>
                          <option value="Dale!">Dale!</option>
                          <option value="Banco Caja Social">Banco Caja Social</option>
                          <option value="RappiPay">RappiPay</option>
                        </select>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-bold text-slate-600 mb-1">Tipo de Persona</label>
                          <select
                            value={datosPago.pseTipoPersona}
                            onChange={e => setDatosPago({ ...datosPago, pseTipoPersona: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm bg-white"
                          >
                            <option value="Natural">Persona Natural</option>
                            <option value="Jurídica">Persona Jurídica</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-600 mb-1">Tipo y Documento *</label>
                          <div className="flex gap-2">
                            <select
                              value={datosPago.pseDocTipo}
                              onChange={e => setDatosPago({ ...datosPago, pseDocTipo: e.target.value })}
                              className="w-24 px-2 py-2 rounded-xl border border-slate-200 text-sm bg-white"
                            >
                              <option value="CC">CC</option>
                              <option value="CE">CE</option>
                              <option value="NIT">NIT</option>
                              <option value="PP">PP</option>
                            </select>
                            <input
                              type="text"
                              value={datosPago.pseDocNumero}
                              onChange={e => setDatosPago({ ...datosPago, pseDocNumero: e.target.value })}
                              placeholder="Número documento"
                              className="flex-1 px-3 py-2 rounded-xl border border-slate-200 text-sm bg-white focus:outline-none focus:border-[#1e3a8a]"
                              required
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* FORMULARIO TARJETA */}
                  {datosPago.metodo === 'tarjeta' && (
                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                      <p className="text-xs font-bold text-[#1e3a8a]">Tarjeta de Crédito o Débito (Visa, Mastercard, Amex)</p>

                      <div>
                        <label className="block text-xs font-bold text-slate-600 mb-1">Número de Tarjeta *</label>
                        <input
                          type="text"
                          maxLength={19}
                          value={datosPago.tarjetaNumero}
                          onChange={e => {
                            const val = e.target.value.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim();
                            setDatosPago({ ...datosPago, tarjetaNumero: val });
                          }}
                          placeholder="4500 •••• •••• ••••"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm bg-white font-mono focus:outline-none focus:border-[#1e3a8a]"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-600 mb-1">Nombre del Titular *</label>
                        <input
                          type="text"
                          value={datosPago.tarjetaNombre}
                          onChange={e => setDatosPago({ ...datosPago, tarjetaNombre: e.target.value })}
                          placeholder="Como figura en la tarjeta"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm bg-white uppercase focus:outline-none focus:border-[#1e3a8a]"
                          required
                        />
                      </div>

                      <div className="grid grid-cols-3 gap-3">
                        <div>
                          <label className="block text-xs font-bold text-slate-600 mb-1">Expiración *</label>
                          <input
                            type="text"
                            maxLength={5}
                            value={datosPago.tarjetaExpiracion}
                            onChange={e => {
                              let v = e.target.value.replace(/\D/g, '');
                              if (v.length >= 2) v = v.slice(0, 2) + '/' + v.slice(2, 4);
                              setDatosPago({ ...datosPago, tarjetaExpiracion: v });
                            }}
                            placeholder="MM/AA"
                            className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm bg-white font-mono text-center"
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-600 mb-1">CVV / CVC *</label>
                          <input
                            type="password"
                            maxLength={4}
                            value={datosPago.tarjetaCvv}
                            onChange={e => setDatosPago({ ...datosPago, tarjetaCvv: e.target.value.replace(/\D/g, '') })}
                            placeholder="•••"
                            className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm bg-white font-mono text-center"
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-600 mb-1">Cuotas</label>
                          <select
                            value={datosPago.tarjetaCuotas}
                            onChange={e => setDatosPago({ ...datosPago, tarjetaCuotas: e.target.value })}
                            className="w-full px-2 py-2 rounded-xl border border-slate-200 text-sm bg-white"
                          >
                            <option value="1">1 cuota</option>
                            <option value="2">2 cuotas</option>
                            <option value="3">3 cuotas</option>
                            <option value="6">6 cuotas</option>
                            <option value="12">12 cuotas</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* FORMULARIO NEQUI / DAVIPLATA */}
                  {datosPago.metodo === 'nequi' && (
                    <div className="p-4 bg-purple-50 rounded-2xl border border-purple-200 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-black text-purple-900">Transferencia Directa Nequi / Daviplata</span>
                        <span className="px-2 py-0.5 bg-purple-200 text-purple-900 rounded-md text-[10px] font-bold">Inmediato</span>
                      </div>
                      <p className="text-xs text-purple-800">
                        Envía el total de <strong>${total.toLocaleString('es-CO')} COP</strong> al número oficial:
                      </p>
                      <div className="p-3 bg-white rounded-xl border border-purple-100 flex items-center justify-between">
                        <div>
                          <span className="text-[10px] text-slate-400 block font-bold uppercase">Línea Oficial Toy Store</span>
                          <span className="text-base font-black text-purple-950 font-mono tracking-wider">300 902 8001</span>
                        </div>
                        <span className="text-xs font-bold text-purple-600 bg-purple-50 px-2.5 py-1 rounded-lg">Toy Store SAS</span>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-purple-900 mb-1">Número de Aprobación / Referencia (Opcional)</label>
                        <input
                          type="text"
                          value={datosPago.nequiComprobante}
                          onChange={e => setDatosPago({ ...datosPago, nequiComprobante: e.target.value })}
                          placeholder="Ej. M18928374 o últimos 6 dígitos"
                          className="w-full px-3 py-2 rounded-xl border border-purple-200 text-sm bg-white"
                        />
                      </div>
                    </div>
                  )}

                  {/* FORMULARIO CONTRA ENTREGA */}
                  {datosPago.metodo === 'contraentrega' && (
                    <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 space-y-2">
                      <div className="text-xs font-black text-amber-900">Pago Contra Entrega en Efectivo</div>
                      <p className="text-xs text-amber-800">
                        Pagarás el valor exacto de <strong>${total.toLocaleString('es-CO')} COP</strong> al mensajero cuando entregue el paquete sellado y neutro en tu dirección.
                      </p>
                      <p className="text-[11px] text-amber-700 italic">
                        * Recuerda tener a mano el dinero en efectivo para facilitar la recepción rápida y discreta.
                      </p>
                    </div>
                  )}

                  <div className="pt-3 flex justify-between items-center border-t border-slate-100">
                    <button
                      type="button"
                      onClick={() => setPasoCheckout(1)}
                      className="px-4 py-2.5 text-xs font-bold text-slate-500 hover:text-slate-800 transition"
                    >
                      ← Volver a Envío
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-3 bg-[#1e3a8a] hover:bg-blue-900 text-white font-bold rounded-2xl text-xs uppercase tracking-wider transition shadow-md active:scale-95 flex items-center gap-2"
                    >
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Confirmar y Pagar</span>
                    </button>
                  </div>
                </form>
              )}

              {/* ================================================= */}
              {/* PASO 3: PROCESANDO PAGO CON ANIMACIÓN REALISTA */}
              {/* ================================================= */}
              {pasoCheckout === 3 && (
                <div className="py-12 flex flex-col items-center justify-center text-center space-y-4">
                  <div className="relative w-16 h-16">
                    <div className="w-16 h-16 rounded-full border-4 border-blue-100 border-t-[#1e3a8a] animate-spin"></div>
                    <div className="absolute inset-0 flex items-center justify-center text-[#1e3a8a]">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-base font-black text-[#1e3a8a]">Procesando transacción segura...</h4>
                    <p className="text-xs text-slate-500 mt-1">Conectando con la red bancaria y validando embalaje confidencial</p>
                  </div>
                  <div className="w-48 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-[#1e3a8a] rounded-full animate-pulse"></div>
                  </div>
                </div>
              )}

              {/* ================================================= */}
              {/* PASO 4: COMPRA CONFIRMADA EXITOSA */}
              {/* ================================================= */}
              {pasoCheckout === 4 && pedidoConfirmado && (
                <div className="space-y-5 animate-in zoom-in-95 duration-300">
                  <div className="text-center py-2">
                    <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3 shadow-inner">
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h4 className="text-xl font-black text-[#1e3a8a]">¡Pedido Confirmado con Éxito!</h4>
                    <p className="text-xs text-slate-500 mt-1">
                      Hemos recibido tu orden y ya está en proceso de alistamiento.
                    </p>
                  </div>

                  {/* Resumen de la Orden */}
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs space-y-2">
                    <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                      <span className="text-slate-500 font-bold">Número de Pedido:</span>
                      <span className="font-mono font-black text-[#1e3a8a] text-sm">{pedidoConfirmado.id}</span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                      <span className="text-slate-500 font-bold">Guía de Transporte:</span>
                      <span className="font-mono font-bold text-emerald-700">{pedidoConfirmado.guia}</span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                      <span className="text-slate-500 font-bold">Destinatario:</span>
                      <span className="font-bold text-slate-800">{pedidoConfirmado.cliente}</span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                      <span className="text-slate-500 font-bold">Destino:</span>
                      <span className="font-bold text-slate-800">{pedidoConfirmado.direccion}</span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                      <span className="text-slate-500 font-bold">Método de Pago:</span>
                      <span className="font-bold text-slate-800">{pedidoConfirmado.metodoPago}</span>
                    </div>
                    <div className="flex justify-between items-center pt-1 text-sm font-black text-[#1e3a8a]">
                      <span>Total Pagado:</span>
                      <span>${pedidoConfirmado.total.toLocaleString('es-CO')} COP</span>
                    </div>
                  </div>

                  {/* Certificado de Empaque Neutro */}
                  <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200 flex items-center gap-3">
                    <svg className="w-5 h-5 text-emerald-600 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7m0 0l7-7m-7 7l-7-7" />
                    </svg>
                    <p className="text-xs text-emerald-800 font-medium">
                      <strong>Garantía de Confidencialidad:</strong> Tu caja será despachada totalmente sellada, sin leyendas, marcas ni distintivos relacionados con la tienda.
                    </p>
                  </div>

                  <div className="pt-3 flex gap-3">
                    <button
                      onClick={() => {
                        setMostrarCheckout(false);
                        navigate('/tienda');
                      }}
                      className="flex-1 py-3 bg-[#1e3a8a] hover:bg-blue-900 text-white font-bold rounded-2xl text-xs uppercase tracking-wider transition text-center shadow-md cursor-pointer"
                    >
                      Continuar en la Tienda
                    </button>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      )}

    </div>
  );
}
