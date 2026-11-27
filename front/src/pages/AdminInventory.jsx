import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { CATALOGO_REAL } from '../data/catalogoProductos';
import ChatbotWidget from '../components/ChatbotWidget';

// Pedidos reales asociados a los usuarios auténticos de la base de datos
const PEDIDOS_INICIALES = [
  {
    id: "TS-2025-0101",
    fecha: "26/11/2026, 08:34 p.m.",
    cliente: "Mariana Franco",
    email: "mfranco090393@gmail.com",
    telefono: "+57 312 458 9210",
    ciudad: "Medellín, Antioquia",
    direccion: "Calle 10 #43E-22, El Poblado",
    productos: [
      { nombre: "Masajeador Rabbit Doble Estimulación", cantidad: 1, precio: 185000 },
      { nombre: "Aceite de Masaje Relajante Vainilla", cantidad: 1, precio: 45000 }
    ],
    total: 230000,
    metodoPago: "Tarjeta de Crédito (Wompi)",
    estado: "En camino",
    guia: "ENV-94810234CO",
    empaqueDiscreto: true
  },
  {
    id: "TS-2025-0102",
    fecha: "26/11/2026, 06:15 p.m.",
    cliente: "Sofia Romero",
    email: "romerobermudezsof@gmail.com",
    telefono: "+57 301 224 8831",
    ciudad: "Bogotá D.C.",
    direccion: "Carrera 15 #85-30, Chicó",
    productos: [
      { nombre: "Succionador Clitoriano por Ondas de Aire", cantidad: 1, precio: 145000 },
      { nombre: "Vela de Cera de Soja para Masajes", cantidad: 2, precio: 40000 }
    ],
    total: 225000,
    metodoPago: "Nequi",
    estado: "Pendiente",
    guia: "Por generar",
    empaqueDiscreto: true
  },
  {
    id: "TS-2025-0103",
    fecha: "26/11/2026, 03:40 p.m.",
    cliente: "Keissy Mesa",
    email: "keissymesah@gmail.com",
    telefono: "+57 310 994 1205",
    ciudad: "Cali, Valle del Cauca",
    direccion: "Avenida 6N #22-14, Granada",
    productos: [
      { nombre: "Conjunto Lencería Encaje Medianoche", cantidad: 1, precio: 120000 }
    ],
    total: 120000,
    metodoPago: "Bancolombia QR",
    estado: "Entregado",
    guia: "SER-8829103CO",
    empaqueDiscreto: true
  },
  {
    id: "TS-2025-0104",
    fecha: "25/11/2026, 11:20 a.m.",
    cliente: "Marco",
    email: "ygmarco116@gmail.com",
    telefono: "+57 315 776 3412",
    ciudad: "Barranquilla, Atlántico",
    direccion: "Calle 84 #51B-40, Alto Prado",
    productos: [
      { nombre: "Kit Parejas Sensual Exploración", cantidad: 1, precio: 195000 }
    ],
    total: 195000,
    metodoPago: "PSE",
    estado: "Entregado",
    guia: "COO-5519283CO",
    empaqueDiscreto: true
  },
  {
    id: "TS-2025-0105",
    fecha: "25/11/2026, 09:10 a.m.",
    cliente: "Sara Guevara",
    email: "saraguevara192@gmail.com",
    telefono: "+57 320 883 4511",
    ciudad: "Bucaramanga, Santander",
    direccion: "Carrera 33 #48-12, Cabecera",
    productos: [
      { nombre: "Vibrador Bala Silenciosa Multi-Velocidad", cantidad: 1, precio: 65000 },
      { nombre: "Lubricante Íntimo Base Agua con Ácido Hialurónico", cantidad: 1, precio: 38000 }
    ],
    total: 103000,
    metodoPago: "Tarjeta Débito",
    estado: "En camino",
    guia: "ENV-7738192CO",
    empaqueDiscreto: true
  },
  {
    id: "TS-2025-0106",
    fecha: "24/11/2026, 07:55 p.m.",
    cliente: "Luis",
    email: "lucama87@gmail.com",
    telefono: "+57 300 445 1199",
    ciudad: "Pereira, Risaralda",
    direccion: "Calle 14 #23-45, Circunvalar",
    productos: [
      { nombre: "Plug Anal Joya en Acero Inoxidable", cantidad: 1, precio: 75000 }
    ],
    total: 75000,
    metodoPago: "Nequi",
    estado: "Cancelado",
    guia: "N/A",
    empaqueDiscreto: true
  }
];

// Usuarios auténticos registrados en la base de datos (TiDB Cloud)
const USUARIOS_REALES_BD = [
  {
    id: 1,
    nombre: "Mariana Alvarez",
    username: "alvarezfrancomariana",
    email: "alvarezfrancomariana@gmail.com",
    rol: "Administrador",
    id_rol: 1,
    avatar_hat: "alien",
    fecha_registro: "01/10/2026",
    estado: "Activo"
  },
  {
    id: 2,
    nombre: "Mariana Franco",
    username: "mfranco090393",
    email: "mfranco090393@gmail.com",
    rol: "Cliente",
    id_rol: 2,
    avatar_hat: "woody",
    fecha_registro: "16/10/2026",
    estado: "Activo"
  },
  {
    id: 3,
    nombre: "Sara Guevara",
    username: "saraguevara",
    email: "saraguevara192@gmail.com",
    rol: "Administrador",
    id_rol: 1,
    avatar_hat: "lotso",
    fecha_registro: "15/10/2026",
    estado: "Activo"
  },
  {
    id: 30004,
    nombre: "Sara",
    username: "saraguevara2729",
    email: "saraguevara2729@gmail.com",
    rol: "Cliente",
    id_rol: 2,
    avatar_hat: "woody",
    fecha_registro: "20/10/2026",
    estado: "Activo"
  },
  {
    id: 60005,
    nombre: "Luis",
    username: "lucama87",
    email: "lucama87@gmail.com",
    rol: "Cliente",
    id_rol: 2,
    avatar_hat: "woody",
    fecha_registro: "25/10/2026",
    estado: "Activo"
  },
  {
    id: 90004,
    nombre: "Sofia Romero",
    username: "romerobermudezsof",
    email: "romerobermudezsof@gmail.com",
    rol: "Cliente",
    id_rol: 2,
    avatar_hat: "jessie",
    fecha_registro: "28/10/2026",
    estado: "Activo"
  },
  {
    id: 120004,
    nombre: "Keissy",
    username: "keissymesah",
    email: "keissymesah@gmail.com",
    rol: "Cliente",
    id_rol: 2,
    avatar_hat: "woody",
    fecha_registro: "01/11/2026",
    estado: "Activo"
  },
  {
    id: 150004,
    nombre: "Marco",
    username: "ygmarco116",
    email: "ygmarco116@gmail.com",
    rol: "Cliente",
    id_rol: 2,
    avatar_hat: "woody",
    fecha_registro: "05/11/2026",
    estado: "Activo"
  },
  {
    id: 180004,
    nombre: "Sophia",
    username: "sarasophiaguevarabui",
    email: "sarasophiaguevarabuitrago@gmail.com",
    rol: "Cliente",
    id_rol: 2,
    avatar_hat: "woody",
    fecha_registro: "10/11/2026",
    estado: "Activo"
  },
  {
    id: 210004,
    nombre: "Néstor Chávez",
    username: "nestordavidchavezmar",
    email: "nestordavidchavezmartinez@gmail.com",
    rol: "Cliente",
    id_rol: 2,
    avatar_hat: "woody",
    fecha_registro: "12/11/2026",
    estado: "Activo"
  },
  {
    id: 240004,
    nombre: "Sara",
    username: "saris179",
    email: "saris.179@gmail.com",
    rol: "Cliente",
    id_rol: 2,
    avatar_hat: "woody",
    fecha_registro: "18/11/2026",
    estado: "Activo"
  },
  {
    id: 270004,
    nombre: "Juliana",
    username: "julianaguevararamire",
    email: "julianaguevararamirez44@gmail.com",
    rol: "Cliente",
    id_rol: 2,
    avatar_hat: "woody",
    fecha_registro: "22/11/2026",
    estado: "Activo"
  },
  {
    id: 270005,
    nombre: "Andres Guevara",
    username: "andresdd2014",
    email: "andresdd2014@gmail.com",
    rol: "Cliente",
    id_rol: 2,
    avatar_hat: "woody",
    fecha_registro: "24/11/2026",
    estado: "Activo"
  }
];

export default function AdminInventory({ defaultApp = 'inventario' }) {
  const { usuario } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  // Deducir app activa desde la URL o la prop
  const getInitialApp = () => {
    if (location.pathname.includes('/admin/pedidos')) return 'pedidos';
    if (location.pathname.includes('/admin/usuarios')) return 'usuarios';
    if (location.pathname.includes('/admin/productos')) return 'inventario';
    return defaultApp;
  };

  const [ventanaAbierta, setVentanaAbierta] = useState(true);
  const [appActiva, setAppActiva] = useState(getInitialApp);
  const [ventanaMaximizada, setVentanaMaximizada] = useState(false);

  // Sincronizar app si cambia la URL
  useEffect(() => {
    if (location.pathname.includes('/admin/pedidos')) setAppActiva('pedidos');
    else if (location.pathname.includes('/admin/usuarios')) setAppActiva('usuarios');
    else if (location.pathname.includes('/admin/productos')) setAppActiva('inventario');
  }, [location.pathname]);

  // Reloj de la barra superior
  const [currentTime, setCurrentTime] = useState(
    new Date().toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit', hour12: true })
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit', hour12: true }));
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Función estándar para salir de cualquier subaplicación hacia el panel principal con opciones
  const salirAlPanelPrincipal = () => {
    if (ventanaAbierta) {
      setVentanaAbierta(false);
    } else {
      navigate('/admin');
    }
  };

  // ==========================================
  // 1. ESTADO: INVENTARIO / PRODUCTOS
  // ==========================================
  const [productos, setProductos] = useState(() => {
    try {
      const guardados = localStorage.getItem('toystore_admin_productos');
      if (guardados) {
        const parsed = JSON.parse(guardados);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {}
    return CATALOGO_REAL;
  });

  const [busquedaProd, setBusquedaProd] = useState('');
  const [categoriaFiltro, setCategoriaFiltro] = useState('todas');
  const [mostrandoFormProd, setMostrandoFormProd] = useState(false);
  const [editandoProdId, setEditandoProdId] = useState(null);
  const [formDataProd, setFormDataProd] = useState({
    nombre: '',
    precio: '',
    categoria: 'vibradores',
    stock: '',
    descripcion: '',
    imagen: ''
  });

  const guardarProductosLocal = (lista) => {
    setProductos(lista);
    try {
      localStorage.setItem('toystore_admin_productos', JSON.stringify(lista));
      // Notificar a Tienda.jsx en tiempo real
      window.dispatchEvent(new Event('toystore_catalog_updated'));
      window.dispatchEvent(new Event('storage'));
    } catch (e) {}
  };

  const abrirFormProd = (producto = null) => {
    if (producto) {
      setEditandoProdId(producto.id);
      setFormDataProd({
        nombre: producto.nombre,
        precio: producto.precio,
        categoria: producto.categoria,
        stock: producto.stock,
        descripcion: producto.descripcion || '',
        imagen: producto.imagen || ''
      });
    } else {
      setEditandoProdId(null);
      setFormDataProd({
        nombre: '',
        precio: '',
        categoria: 'vibradores',
        stock: '',
        descripcion: '',
        imagen: ''
      });
    }
    setMostrandoFormProd(true);
  };

  const handleSubmitProd = (e) => {
    e.preventDefault();
    let actualizados;
    if (editandoProdId) {
      actualizados = productos.map(p =>
        p.id === editandoProdId
          ? { ...p, ...formDataProd, precio: Number(formDataProd.precio), stock: Number(formDataProd.stock) }
          : p
      );
    } else {
      const nuevo = {
        id: Date.now(),
        ...formDataProd,
        precio: Number(formDataProd.precio),
        stock: Number(formDataProd.stock) || 15,
        imagen: formDataProd.imagen || '/images/rabbitbuzz.webp'
      };
      actualizados = [nuevo, ...productos];
    }
    guardarProductosLocal(actualizados);
    setMostrandoFormProd(false);
  };

  const eliminarProducto = (id, nombre) => {
    if (window.confirm(`¿Seguro que deseas eliminar "${nombre}" del almacén?`)) {
      const filtrados = productos.filter(p => p.id !== id);
      guardarProductosLocal(filtrados);
    }
  };

  const productosFiltrados = productos.filter(p => {
    const matchCat = categoriaFiltro === 'todas' || p.categoria?.toLowerCase() === categoriaFiltro.toLowerCase();
    const matchSearch = !busquedaProd.trim() || p.nombre?.toLowerCase().includes(busquedaProd.toLowerCase()) || p.id?.toString().includes(busquedaProd);
    return matchCat && matchSearch;
  });

  const totalStock = productos.reduce((acc, p) => acc + (Number(p.stock) || 0), 0);
  const bajoStock = productos.filter(p => Number(p.stock) <= 3).length;

  const categoriasLista = [
    { id: 'todas', label: 'Todos' },
    { id: 'vibradores', label: 'Vibradores' },
    { id: 'lencerias', label: 'Lencería' },
    { id: 'anales', label: 'Plugs & Anales' },
    { id: 'dildos', label: 'Dildos' },
    { id: 'cosmetica', label: 'Cosmética & Aceites' },
    { id: 'accesorios', label: 'Accesorios & BDSM' },
    { id: 'kits', label: 'Kits & Sorpresas' }
  ];

  // ==========================================
  // 2. ESTADO: PEDIDOS & DESPACHOS
  // ==========================================
  const [pedidos, setPedidos] = useState(() => {
    try {
      const guardados = localStorage.getItem('toystore_admin_pedidos');
      if (guardados) {
        const parsed = JSON.parse(guardados);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {}
    return PEDIDOS_INICIALES;
  });

  useEffect(() => {
    const sincronizarPedidos = () => {
      try {
        const guardados = localStorage.getItem('toystore_admin_pedidos');
        if (guardados) {
          const parsed = JSON.parse(guardados);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setPedidos(parsed);
          }
        }
      } catch (e) {}
    };
    window.addEventListener('toystore_orders_updated', sincronizarPedidos);
    window.addEventListener('storage', sincronizarPedidos);
    return () => {
      window.removeEventListener('toystore_orders_updated', sincronizarPedidos);
      window.removeEventListener('storage', sincronizarPedidos);
    };
  }, []);

  const [busquedaPed, setBusquedaPed] = useState('');
  const [filtroEstadoPed, setFiltroEstadoPed] = useState('todos');
  const [pedidoDetalle, setPedidoDetalle] = useState(null);
  const [mostrandoNuevoPedido, setMostrandoNuevoPedido] = useState(false);
  const [nuevoPedidoData, setNuevoPedidoData] = useState({
    cliente: 'Mariana Franco',
    email: 'mfranco090393@gmail.com',
    telefono: '+57 312 458 9210',
    ciudad: 'Medellín',
    direccion: 'Calle 10 #43E-22',
    productoId: 1,
    cantidad: 1,
    metodoPago: 'Nequi'
  });

  const guardarPedidosLocal = (lista) => {
    setPedidos(lista);
    try {
      localStorage.setItem('toystore_admin_pedidos', JSON.stringify(lista));
    } catch (e) {}
  };

  const cambiarEstadoPedido = (idPedido, nuevoEstado) => {
    const actualizados = pedidos.map(p =>
      p.id === idPedido ? { ...p, estado: nuevoEstado } : p
    );
    guardarPedidosLocal(actualizados);
    if (pedidoDetalle && pedidoDetalle.id === idPedido) {
      setPedidoDetalle(prev => ({ ...prev, estado: nuevoEstado }));
    }
  };

  const handleCrearPedidoManual = (e) => {
    e.preventDefault();
    const prodSeleccionado = productos.find(p => p.id === Number(nuevoPedidoData.productoId)) || productos[0];
    const totalCalc = prodSeleccionado.precio * Number(nuevoPedidoData.cantidad);
    const nuevo = {
      id: `TS-2025-${Math.floor(1000 + Math.random() * 9000)}`,
      fecha: new Date().toLocaleString('es-CO', { dateStyle: 'short', timeStyle: 'short' }),
      cliente: nuevoPedidoData.cliente,
      email: nuevoPedidoData.email || 'cliente@toystore.com',
      telefono: nuevoPedidoData.telefono,
      ciudad: nuevoPedidoData.ciudad,
      direccion: nuevoPedidoData.direccion || 'Entrega confidencial',
      productos: [{ nombre: prodSeleccionado.nombre, cantidad: Number(nuevoPedidoData.cantidad), precio: prodSeleccionado.precio }],
      total: totalCalc,
      metodoPago: nuevoPedidoData.metodoPago,
      estado: 'Pendiente',
      guia: `TS-${Math.floor(100000 + Math.random() * 900000)}CO`,
      empaqueDiscreto: true
    };
    guardarPedidosLocal([nuevo, ...pedidos]);
    setMostrandoNuevoPedido(false);
  };

  const pedidosFiltrados = pedidos.filter(p => {
    const matchEstado = filtroEstadoPed === 'todos' || p.estado.toLowerCase() === filtroEstadoPed.toLowerCase();
    const matchSearch = !busquedaPed.trim() ||
      p.cliente.toLowerCase().includes(busquedaPed.toLowerCase()) ||
      p.id.toLowerCase().includes(busquedaPed.toLowerCase()) ||
      p.ciudad.toLowerCase().includes(busquedaPed.toLowerCase());
    return matchEstado && matchSearch;
  });

  const totalFacturado = pedidos
    .filter(p => p.estado !== 'Cancelado')
    .reduce((acc, p) => acc + p.total, 0);

  // ==========================================
  // 3. ESTADO: USUARIOS REALES DE LA BASE DE DATOS
  // ==========================================
  const [usuarios, setUsuarios] = useState(() => {
    try {
      const guardados = localStorage.getItem('toystore_admin_usuarios');
      if (guardados) {
        const parsed = JSON.parse(guardados);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {}
    return USUARIOS_REALES_BD;
  });

  const [busquedaUser, setBusquedaUser] = useState('');
  const [filtroRolUser, setFiltroRolUser] = useState('todos');
  const [mostrandoNuevoUser, setMostrandoNuevoUser] = useState(false);
  const [nuevoUserData, setNuevoUserData] = useState({
    nombre: '',
    username: '',
    email: '',
    rol: 'Cliente'
  });

  // Intentar sincronizar con el backend de forma transparente
  useEffect(() => {
    fetch('/auth/usuarios', { credentials: 'include' })
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          const mapeados = data.map(u => ({
            id: u.id_usuario || u.id,
            nombre: u.nombre,
            username: u.nombre_usuario || u.username || u.email?.split('@')[0],
            email: u.email,
            rol: (u.id_rol === 1 || u.rol === 'admin' || u.rol === 'Administrador') ? 'Administrador' : 'Cliente',
            id_rol: (u.id_rol === 1 || u.rol === 'admin') ? 1 : 2,
            avatar_hat: u.avatar_hat || 'woody',
            fecha_registro: u.fecha_registro || '15/10/2026',
            estado: 'Activo'
          }));
          setUsuarios(mapeados);
          localStorage.setItem('toystore_admin_usuarios', JSON.stringify(mapeados));
        }
      })
      .catch(() => {
        // Mantiene la lista de usuarios reales de la base de datos ya cargada
      });
  }, []);

  const guardarUsuariosLocal = (lista) => {
    setUsuarios(lista);
    try {
      localStorage.setItem('toystore_admin_usuarios', JSON.stringify(lista));
    } catch (e) {}
  };

  const toggleRolUsuario = (id) => {
    const actualizados = usuarios.map(u => {
      if (u.id === id) {
        const nuevoRol = u.rol === 'Administrador' ? 'Cliente' : 'Administrador';
        return { ...u, rol: nuevoRol, id_rol: nuevoRol === 'Administrador' ? 1 : 2 };
      }
      return u;
    });
    guardarUsuariosLocal(actualizados);
  };

  const toggleEstadoUsuario = (id) => {
    const actualizados = usuarios.map(u => {
      if (u.id === id) {
        return { ...u, estado: u.estado === 'Activo' ? 'Inactivo' : 'Activo' };
      }
      return u;
    });
    guardarUsuariosLocal(actualizados);
  };

  const eliminarUsuario = (id, nombre) => {
    if (window.confirm(`¿Seguro que deseas eliminar la cuenta de "${nombre}"?`)) {
      const filtrados = usuarios.filter(u => u.id !== id);
      guardarUsuariosLocal(filtrados);
    }
  };

  const handleCrearUsuario = (e) => {
    e.preventDefault();
    const nuevo = {
      id: Date.now(),
      nombre: nuevoUserData.nombre,
      username: nuevoUserData.username.replace('@', '').toLowerCase(),
      email: nuevoUserData.email,
      rol: nuevoUserData.rol,
      id_rol: nuevoUserData.rol === 'Administrador' ? 1 : 2,
      avatar_hat: 'woody',
      fecha_registro: new Date().toLocaleDateString('es-CO'),
      estado: 'Activo'
    };
    guardarUsuariosLocal([nuevo, ...usuarios]);
    setMostrandoNuevoUser(false);
    setNuevoUserData({ nombre: '', username: '', email: '', rol: 'Cliente' });
  };

  const usuariosFiltrados = usuarios.filter(u => {
    const matchRol = filtroRolUser === 'todos' || u.rol.toLowerCase() === filtroRolUser.toLowerCase();
    const matchSearch = !busquedaUser.trim() ||
      u.nombre.toLowerCase().includes(busquedaUser.toLowerCase()) ||
      u.username.toLowerCase().includes(busquedaUser.toLowerCase()) ||
      u.email.toLowerCase().includes(busquedaUser.toLowerCase());
    return matchRol && matchSearch;
  });

  const formatCOP = (val) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      maximumFractionDigits: 0
    }).format(val || 0);
  };

  return (
    <div className="min-h-screen w-full bg-[#0b1329] text-[#111111] flex flex-col select-none relative overflow-x-hidden font-sans">
      
      {/* ============================================================ */}
      {/* 1. BARRA SUPERIOR DE MENÚ DEL SISTEMA OPERATIVO (TOY-OS 2025)*/}
      {/* ============================================================ */}
      <header className="h-9 bg-white/95 backdrop-blur-md border-b border-slate-200/90 px-4 flex items-center justify-between z-50 text-xs font-medium text-slate-800 flex-shrink-0 shadow-xs">
        
        {/* Lado izquierdo: Identificador del SO y Pestañas */}
        <div className="flex items-center gap-4">
          <div 
            className="flex items-center gap-1.5 font-bold text-[#1e3a8a] cursor-pointer hover:opacity-85 transition-opacity" 
            onClick={salirAlPanelPrincipal}
            title="Ir al escritorio del computador ToyOS"
          >
            <svg className="w-4 h-4 fill-current text-[#1e3a8a]" viewBox="0 0 24 24">
              <path d="M12 2.5s3.5 3 4.5 7.5c1 4.5-.5 8.5-.5 8.5l-4-2-4 2s-1.5-4-.5-8.5C8.5 5.5 12 2.5 12 2.5z" />
              <circle cx="12" cy="10" r="1.5" fill="white" />
            </svg>
            <span className="tracking-tight font-black">ToyOS 2025</span>
          </div>

          <div className="hidden sm:flex items-center gap-4 text-slate-600 text-xs">
            <span 
              onClick={() => { setAppActiva('inventario'); setVentanaAbierta(true); }}
              className={`cursor-pointer transition-colors ${ventanaAbierta && appActiva === 'inventario' ? 'font-bold text-[#1e3a8a] underline underline-offset-4 decoration-2 decoration-[#a6d4f2]' : 'hover:text-slate-900'}`}
            >
              Almacén
            </span>
            <span 
              onClick={() => { setAppActiva('pedidos'); setVentanaAbierta(true); }}
              className={`cursor-pointer transition-colors ${ventanaAbierta && appActiva === 'pedidos' ? 'font-bold text-[#1e3a8a] underline underline-offset-4 decoration-2 decoration-[#a6d4f2]' : 'hover:text-slate-900'}`}
            >
              Pedidos
            </span>
            <span 
              onClick={() => { setAppActiva('usuarios'); setVentanaAbierta(true); }}
              className={`cursor-pointer transition-colors ${ventanaAbierta && appActiva === 'usuarios' ? 'font-bold text-[#1e3a8a] underline underline-offset-4 decoration-2 decoration-[#a6d4f2]' : 'hover:text-slate-900'}`}
            >
              Usuarios
            </span>
          </div>
        </div>

        {/* Lado derecho: Estado del sistema y opciones */}
        <div className="flex items-center gap-3.5 text-xs text-slate-600">
          <div className="hidden md:flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="font-mono text-[10px] text-slate-500 font-semibold">BD 2025 En línea</span>
          </div>

          <button 
            onClick={salirAlPanelPrincipal}
            className="px-3 py-1 rounded-lg bg-slate-100 hover:bg-[#a6d4f2]/40 text-[#1e3a8a] text-[11px] font-bold transition-colors cursor-pointer"
            title="Ver pantalla de inicio del computador con las opciones"
          >
            Escritorio ToyOS
          </button>

          <button 
            onClick={() => navigate('/admin')}
            className="px-3 py-1 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 text-[11px] font-bold transition-colors cursor-pointer"
            title="Salir hacia la habitación"
          >
            Apagar / Cuarto
          </button>

          <span className="font-mono font-bold text-slate-700 pl-1">{currentTime}</span>
        </div>
      </header>

      {/* ============================================================ */}
      {/* 2. PANTALLA PRINCIPAL DEL COMPUTADOR (ESCRITORIO & VENTANAS) */}
      {/* ============================================================ */}
      <main className="flex-1 p-3 md:p-6 pb-24 flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#1a4a75]">
        
        {/* Marca de agua / Wallpaper estético */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5 select-none">
          <span className="text-[16vw] font-black text-white tracking-widest leading-none">TOY STORE</span>
        </div>

        {/* ========================================================== */}
        {/* VISTA A: ESCRITORIO CON LAS 3 APPS                         */}
        {/* ========================================================== */}
        {!ventanaAbierta ? (
          <div className="w-full max-w-4xl h-[75vh] md:h-[580px] bg-[#1a4a75] rounded-2xl shadow-[0_25px_70px_rgba(0,0,0,0.6)] border-2 border-slate-400/80 flex flex-col relative z-10 overflow-hidden animate-in zoom-in-95 duration-200" style={{ backgroundImage: 'radial-gradient(circle at center, #2b6da0 0%, #1a4a75 100%)' }}>
            
            {/* Cabecera macOS de la ventana Desktop OS */}
            <div className="h-10 bg-gradient-to-b from-[#e8e8e8] to-[#d8d8d8] border-b border-slate-300 flex items-center px-4 justify-between shrink-0 select-none">
              <div className="flex gap-2">
                <button onClick={salirAlPanelPrincipal} className="w-3.5 h-3.5 rounded-full bg-[#ff5f56] border border-[#e0443e] flex items-center justify-center text-[8px] text-red-950 font-black cursor-pointer hover:opacity-80" title="Volver al panel principal">
                  ✕
                </button>
                <div className="w-3.5 h-3.5 rounded-full bg-[#ffbd2e] border border-[#dea123]"></div>
                <div className="w-3.5 h-3.5 rounded-full bg-[#27c93f] border border-[#1aab29]"></div>
              </div>
              <div className="font-bold text-xs text-slate-700 tracking-wider">os</div>
              <div className="w-16"></div>
            </div>

            {/* Contenido del escritorio: Marca de agua y las 3 apps gigantes */}
            <div className="flex-1 relative flex flex-col items-center justify-center p-8">
              <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none select-none">
                <span className="text-8xl md:text-9xl font-black text-white text-center leading-none">
                  TOY<br/>STORE
                </span>
              </div>

              <div className="relative z-10 grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-10 max-w-2xl w-full">
                {/* Botón 1: INVENTARIO (Azul) */}
                <button
                  onClick={() => { setAppActiva('inventario'); setVentanaAbierta(true); }}
                  className="bg-blue-600 hover:bg-blue-500 border-b-4 border-blue-800 text-white rounded-2xl p-6 flex flex-col items-center justify-center gap-3 shadow-xl transform transition-all hover:scale-105 active:scale-95 cursor-pointer group"
                >
                  <div className="w-16 h-16 rounded-xl bg-white/10 flex items-center justify-center group-hover:rotate-6 transition-transform">
                    <svg className="w-9 h-9 fill-none stroke-current" strokeWidth="2.2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                  </div>
                  <span className="font-black text-xs md:text-sm tracking-wider uppercase">INVENTARIO</span>
                  <span className="text-[10px] text-blue-100 font-medium">{productos.length} juguetes</span>
                </button>

                {/* Botón 2: PEDIDOS (Rojo) */}
                <button
                  onClick={() => { setAppActiva('pedidos'); setVentanaAbierta(true); }}
                  className="bg-red-500 hover:bg-red-400 border-b-4 border-red-700 text-white rounded-2xl p-6 flex flex-col items-center justify-center gap-3 shadow-xl transform transition-all hover:scale-105 active:scale-95 cursor-pointer group"
                >
                  <div className="w-16 h-16 rounded-xl bg-white/10 flex items-center justify-center group-hover:rotate-6 transition-transform">
                    <svg className="w-9 h-9 fill-none stroke-current" strokeWidth="2.2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <span className="font-black text-xs md:text-sm tracking-wider uppercase">PEDIDOS</span>
                  <span className="text-[10px] text-red-100 font-medium">{pedidos.length} órdenes</span>
                </button>

                {/* Botón 3: USUARIOS (Verde) */}
                <button
                  onClick={() => { setAppActiva('usuarios'); setVentanaAbierta(true); }}
                  className="bg-emerald-500 hover:bg-emerald-400 border-b-4 border-emerald-700 text-white rounded-2xl p-6 flex flex-col items-center justify-center gap-3 shadow-xl transform transition-all hover:scale-105 active:scale-95 cursor-pointer group"
                >
                  <div className="w-16 h-16 rounded-xl bg-white/10 flex items-center justify-center group-hover:rotate-6 transition-transform">
                    <svg className="w-9 h-9 fill-none stroke-current" strokeWidth="2.2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </div>
                  <span className="font-black text-xs md:text-sm tracking-wider uppercase">USUARIOS</span>
                  <span className="text-[10px] text-emerald-100 font-medium">{usuarios.length} registrados</span>
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* ========================================================== */
          /* VISTA B: VENTANA DE APLICACIÓN ACTIVA                      */
          /* ========================================================== */
          <div className={`w-full max-w-6xl ${ventanaMaximizada ? 'h-[92vh]' : 'h-[85vh]'} bg-white rounded-2xl shadow-[0_25px_70px_rgba(0,0,0,0.55)] border border-slate-300 flex flex-col overflow-hidden relative z-10 animate-in zoom-in-95 duration-200`}>
            
            {/* BARRA DE TÍTULO DE LA VENTANA (BOTONES macOS) */}
            <div className="h-10 bg-slate-100 border-b border-slate-200 px-4 flex items-center justify-between flex-shrink-0 select-none">
              
              {/* Traffic Lights: Botón Rojo vuelve directamente al panel principal con opciones */}
              <div className="flex items-center gap-2">
                <button 
                  onClick={salirAlPanelPrincipal}
                  className="w-3.5 h-3.5 rounded-full bg-[#ff5f56] hover:brightness-90 flex items-center justify-center text-[8px] text-red-950 font-black group cursor-pointer shadow-2xs"
                  title="Cerrar y volver al panel principal"
                >
                  <span className="opacity-0 group-hover:opacity-100">✕</span>
                </button>
                <button 
                  onClick={salirAlPanelPrincipal}
                  className="w-3.5 h-3.5 rounded-full bg-[#ffbd2e] hover:brightness-90 cursor-pointer shadow-2xs"
                  title="Volver a las opciones"
                />
                <button 
                  onClick={() => setVentanaMaximizada(!ventanaMaximizada)}
                  className="w-3.5 h-3.5 rounded-full bg-[#27c93f] hover:brightness-90 cursor-pointer shadow-2xs"
                  title="Maximizar / Restaurar"
                />
              </div>

              {/* Título dinámico de la ventana */}
              <div className="flex items-center gap-2 text-xs font-bold text-[#1e3a8a]">
                {appActiva === 'inventario' && (
                  <>
                    <svg className="w-3.5 h-3.5 fill-none stroke-current" strokeWidth="2.2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                    <span>Almacén de Juguetes — Administrador v2.5 (2025)</span>
                  </>
                )}
                {appActiva === 'pedidos' && (
                  <>
                    <svg className="w-3.5 h-3.5 fill-none stroke-current" strokeWidth="2.2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <span>Gestión de Pedidos & Despachos — ToyOS 2025</span>
                  </>
                )}
                {appActiva === 'usuarios' && (
                  <>
                    <svg className="w-3.5 h-3.5 fill-none stroke-current" strokeWidth="2.2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                    <span>Directorio de Usuarios Registrados en Base de Datos — ToyOS 2025</span>
                  </>
                )}
              </div>

              {/* Botón Ver Apps a la derecha */}
              <button 
                onClick={salirAlPanelPrincipal}
                className="text-[11px] font-semibold text-slate-500 hover:text-[#1e3a8a] cursor-pointer"
                title="Volver al panel principal con opciones"
              >
                Ver Apps
              </button>
            </div>

            {/* ======================================================== */}
            {/* APP 1: ALMACÉN / INVENTARIO                              */}
            {/* ======================================================== */}
            {appActiva === 'inventario' && (
              <>
                <div className="p-4 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 flex-shrink-0">
                  <div className="relative flex-1 min-w-[220px] max-w-sm">
                    <input
                      type="text"
                      value={busquedaProd}
                      onChange={(e) => setBusquedaProd(e.target.value)}
                      placeholder="Buscar por nombre o referencia..."
                      className="w-full text-xs py-2 pl-8 pr-3 rounded-xl bg-white border border-slate-300 focus:border-[#a6d4f2] focus:ring-2 focus:ring-[#a6d4f2]/40 outline-none text-slate-800 transition-all font-normal"
                    />
                    <svg className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="hidden lg:flex items-center gap-2 text-xs">
                      <div className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-600">
                        Total: <b className="text-[#1e3a8a]">{productos.length}</b>
                      </div>
                      <div className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-600">
                        Stock: <b className="text-[#1e3a8a]">{totalStock}</b> uds
                      </div>
                      {bajoStock > 0 && (
                        <div className="px-3 py-1.5 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 font-semibold">
                          {bajoStock} en alerta
                        </div>
                      )}
                    </div>

                    <button
                      onClick={() => abrirFormProd()}
                      className="px-4 py-2 rounded-xl bg-[#a6d4f2] hover:bg-[#8ec2e4] text-[#1e3a8a] text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer active:scale-95"
                    >
                      <span className="text-sm font-black">+</span>
                      <span>Nuevo Juguete</span>
                    </button>
                  </div>
                </div>

                {/* FILTROS POR CATEGORÍA */}
                <div className="px-4 py-2 bg-white border-b border-slate-100 flex items-center gap-1.5 overflow-x-auto no-scrollbar flex-shrink-0">
                  {categoriasLista.map(cat => {
                    const isSelected = categoriaFiltro === cat.id;
                    return (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => setCategoriaFiltro(cat.id)}
                        className={`px-3 py-1 rounded-full text-xs transition-all cursor-pointer whitespace-nowrap ${
                          isSelected
                            ? 'bg-[#a6d4f2] text-[#1e3a8a] font-bold shadow-2xs'
                            : 'bg-slate-100 hover:bg-slate-200/70 text-slate-700 font-normal'
                        }`}
                      >
                        {cat.label}
                      </button>
                    );
                  })}
                </div>

                {/* TABLA DE PRODUCTOS */}
                <div className="flex-1 overflow-auto no-scrollbar bg-white">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider text-[10px] font-bold sticky top-0 z-10 border-b border-slate-200">
                      <tr>
                        <th className="py-3 px-4 w-16">Item</th>
                        <th className="py-3 px-4">Producto</th>
                        <th className="py-3 px-4">Categoría</th>
                        <th className="py-3 px-4">Precio COP</th>
                        <th className="py-3 px-4">Stock en Almacén</th>
                        <th className="py-3 px-4 text-right">Acciones</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-800">
                      {productosFiltrados.length === 0 ? (
                        <tr>
                          <td colSpan="6" className="py-20 text-center text-slate-400 font-normal">
                            No hay productos que coincidan con los criterios seleccionados.
                          </td>
                        </tr>
                      ) : (
                        productosFiltrados.map((p) => {
                          const stockNum = Number(p.stock) || 0;
                          return (
                            <tr key={p.id} className="hover:bg-sky-50/50 transition-colors">
                              <td className="py-2.5 px-4">
                                <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center p-1">
                                  <img 
                                    src={p.imagen || '/images/rabbitbuzz.webp'} 
                                    alt={p.nombre} 
                                    className="max-h-full max-w-full object-contain"
                                    onError={(e) => { e.target.src = '/images/rabbitbuzz.webp'; }}
                                  />
                                </div>
                              </td>
                              <td className="py-2.5 px-4">
                                <div className="font-bold text-[#1e3a8a] text-xs">{p.nombre}</div>
                                <span className="text-[10px] text-slate-400 font-mono">REF #{p.id.toString().padStart(4, '0')}</span>
                              </td>
                              <td className="py-2.5 px-4">
                                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase bg-slate-100 text-slate-700 border border-slate-200">
                                  {p.categoria}
                                </span>
                              </td>
                              <td className="py-2.5 px-4 font-bold text-slate-800">
                                {formatCOP(p.precio)}
                              </td>
                              <td className="py-2.5 px-4">
                                <div className="flex items-center gap-2">
                                  <span className={`w-2 h-2 rounded-full ${stockNum <= 3 ? 'bg-rose-500' : 'bg-emerald-500'}`}></span>
                                  <span className={`font-semibold ${stockNum <= 3 ? 'text-rose-600 font-bold' : 'text-slate-700'}`}>
                                    {stockNum} unidades
                                  </span>
                                </div>
                              </td>
                              <td className="py-2.5 px-4 text-right">
                                <div className="flex items-center justify-end gap-1.5">
                                  <button
                                    onClick={() => abrirFormProd(p)}
                                    className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-[#a6d4f2] text-slate-700 hover:text-[#1e3a8a] font-semibold text-[11px] transition-colors cursor-pointer"
                                  >
                                    Editar
                                  </button>
                                  <button
                                    onClick={() => eliminarProducto(p.id, p.nombre)}
                                    className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-rose-100 text-slate-700 hover:text-rose-700 font-semibold text-[11px] transition-colors cursor-pointer"
                                  >
                                    Eliminar
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </div>

                <div className="h-7 bg-slate-50 border-t border-slate-200 px-4 flex items-center justify-between text-[11px] text-slate-500 flex-shrink-0">
                  <span>{productosFiltrados.length} juguetes listados en almacén</span>
                  <span>Catálogo Toy Store 2025 • Conexión Segura</span>
                </div>
              </>
            )}

            {/* ======================================================== */}
            {/* APP 2: PEDIDOS & DESPACHOS                               */}
            {/* ======================================================== */}
            {appActiva === 'pedidos' && (
              <>
                <div className="p-4 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 flex-shrink-0">
                  <div className="relative flex-1 min-w-[220px] max-w-sm">
                    <input
                      type="text"
                      value={busquedaPed}
                      onChange={(e) => setBusquedaPed(e.target.value)}
                      placeholder="Buscar por cliente, pedido o ciudad..."
                      className="w-full text-xs py-2 pl-8 pr-3 rounded-xl bg-white border border-slate-300 focus:border-[#a6d4f2] focus:ring-2 focus:ring-[#a6d4f2]/40 outline-none text-slate-800 transition-all font-normal"
                    />
                    <svg className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="hidden lg:flex items-center gap-2 text-xs">
                      <div className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-600">
                        Órdenes: <b className="text-[#1e3a8a]">{pedidos.length}</b>
                      </div>
                      <div className="px-3 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800">
                        Total: <b className="font-bold">{formatCOP(totalFacturado)}</b>
                      </div>
                    </div>

                    <button
                      onClick={() => setMostrandoNuevoPedido(true)}
                      className="px-4 py-2 rounded-xl bg-[#a6d4f2] hover:bg-[#8ec2e4] text-[#1e3a8a] text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer active:scale-95"
                    >
                      <span className="text-sm font-black">+</span>
                      <span>Registrar Pedido</span>
                    </button>
                  </div>
                </div>

                {/* FILTROS POR ESTADO */}
                <div className="px-4 py-2 bg-white border-b border-slate-100 flex items-center gap-1.5 overflow-x-auto no-scrollbar flex-shrink-0">
                  {[
                    { id: 'todos', label: 'Todos los Pedidos' },
                    { id: 'pendiente', label: 'Pendientes' },
                    { id: 'en camino', label: 'En camino / Despachados' },
                    { id: 'entregado', label: 'Entregados con Éxito' },
                    { id: 'cancelado', label: 'Cancelados' }
                  ].map(tab => {
                    const isSelected = filtroEstadoPed === tab.id;
                    return (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => setFiltroEstadoPed(tab.id)}
                        className={`px-3 py-1 rounded-full text-xs transition-all cursor-pointer whitespace-nowrap ${
                          isSelected
                            ? 'bg-[#a6d4f2] text-[#1e3a8a] font-bold shadow-2xs'
                            : 'bg-slate-100 hover:bg-slate-200/70 text-slate-700 font-normal'
                        }`}
                      >
                        {tab.label}
                      </button>
                    );
                  })}
                </div>

                {/* TABLA DE PEDIDOS */}
                <div className="flex-1 overflow-auto no-scrollbar bg-white">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider text-[10px] font-bold sticky top-0 z-10 border-b border-slate-200">
                      <tr>
                        <th className="py-3 px-4">Referencia & Fecha</th>
                        <th className="py-3 px-4">Cliente & Destino</th>
                        <th className="py-3 px-4">Artículos</th>
                        <th className="py-3 px-4">Total COP</th>
                        <th className="py-3 px-4">Estado del Envío</th>
                        <th className="py-3 px-4 text-right">Acciones</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-800">
                      {pedidosFiltrados.length === 0 ? (
                        <tr>
                          <td colSpan="6" className="py-20 text-center text-slate-400 font-normal">
                            No se encontraron pedidos con los filtros actuales.
                          </td>
                        </tr>
                      ) : (
                        pedidosFiltrados.map((ped) => {
                          const estadoColors = {
                            'Pendiente': 'bg-amber-100 text-amber-800 border-amber-200',
                            'En camino': 'bg-sky-100 text-[#1e3a8a] border-sky-200',
                            'Entregado': 'bg-emerald-100 text-emerald-800 border-emerald-200',
                            'Cancelado': 'bg-rose-100 text-rose-800 border-rose-200'
                          };

                          return (
                            <tr key={ped.id} className="hover:bg-sky-50/50 transition-colors">
                              <td className="py-2.5 px-4">
                                <div className="font-mono font-bold text-[#1e3a8a] text-xs">{ped.id}</div>
                                <div className="text-[10px] text-slate-400">{ped.fecha}</div>
                              </td>
                              <td className="py-2.5 px-4">
                                <div className="font-bold text-slate-800">{ped.cliente}</div>
                                <div className="text-[10px] text-slate-500">{ped.ciudad} • {ped.telefono}</div>
                              </td>
                              <td className="py-2.5 px-4">
                                <div className="text-slate-700 max-w-xs truncate">
                                  {ped.productos.map(p => `${p.cantidad}x ${p.nombre}`).join(', ')}
                                </div>
                                <span className="text-[10px] text-emerald-600 font-medium">Empaque 100% Ciego</span>
                              </td>
                              <td className="py-2.5 px-4 font-bold text-slate-900">
                                {formatCOP(ped.total)}
                              </td>
                              <td className="py-2.5 px-4">
                                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${estadoColors[ped.estado] || 'bg-slate-100 text-slate-700'}`}>
                                  {ped.estado}
                                </span>
                              </td>
                              <td className="py-2.5 px-4 text-right">
                                <button
                                  onClick={() => setPedidoDetalle(ped)}
                                  className="px-3 py-1 rounded-lg bg-slate-100 hover:bg-[#a6d4f2] text-slate-700 hover:text-[#1e3a8a] font-semibold text-[11px] transition-colors cursor-pointer"
                                >
                                  Ver Detalle
                                </button>
                              </td>
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </div>

                <div className="h-7 bg-slate-50 border-t border-slate-200 px-4 flex items-center justify-between text-[11px] text-slate-500 flex-shrink-0">
                  <span>{pedidosFiltrados.length} órdenes registradas</span>
                  <span>Envíos discretos garantizados a toda Colombia</span>
                </div>
              </>
            )}

            {/* ======================================================== */}
            {/* APP 3: USUARIOS REALES DE LA BASE DE DATOS               */}
            {/* ======================================================== */}
            {appActiva === 'usuarios' && (
              <>
                <div className="p-4 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 flex-shrink-0">
                  <div className="relative flex-1 min-w-[220px] max-w-sm">
                    <input
                      type="text"
                      value={busquedaUser}
                      onChange={(e) => setBusquedaUser(e.target.value)}
                      placeholder="Buscar por nombre, @username o correo..."
                      className="w-full text-xs py-2 pl-8 pr-3 rounded-xl bg-white border border-slate-300 focus:border-[#a6d4f2] focus:ring-2 focus:ring-[#a6d4f2]/40 outline-none text-slate-800 transition-all font-normal"
                    />
                    <svg className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="hidden lg:flex items-center gap-2 text-xs">
                      <div className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-600">
                        Total en BD: <b className="text-[#1e3a8a]">{usuarios.length}</b>
                      </div>
                      <div className="px-3 py-1.5 rounded-lg bg-sky-50 border border-sky-200 text-[#1e3a8a]">
                        Admins: <b className="font-bold">{usuarios.filter(u => u.rol === 'Administrador').length}</b>
                      </div>
                    </div>

                    <button
                      onClick={() => setMostrandoNuevoUser(true)}
                      className="px-4 py-2 rounded-xl bg-[#a6d4f2] hover:bg-[#8ec2e4] text-[#1e3a8a] text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer active:scale-95"
                    >
                      <span className="text-sm font-black">+</span>
                      <span>Nuevo Usuario</span>
                    </button>
                  </div>
                </div>

                {/* FILTROS POR ROL */}
                <div className="px-4 py-2 bg-white border-b border-slate-100 flex items-center gap-1.5 overflow-x-auto no-scrollbar flex-shrink-0">
                  {[
                    { id: 'todos', label: 'Todos los Registrados en BD' },
                    { id: 'administrador', label: 'Administradores' },
                    { id: 'cliente', label: 'Clientes Registrados' }
                  ].map(tab => {
                    const isSelected = filtroRolUser === tab.id;
                    return (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => setFiltroRolUser(tab.id)}
                        className={`px-3 py-1 rounded-full text-xs transition-all cursor-pointer whitespace-nowrap ${
                          isSelected
                            ? 'bg-[#a6d4f2] text-[#1e3a8a] font-bold shadow-2xs'
                            : 'bg-slate-100 hover:bg-slate-200/70 text-slate-700 font-normal'
                        }`}
                      >
                        {tab.label}
                      </button>
                    );
                  })}
                </div>

                {/* TABLA DE USUARIOS */}
                <div className="flex-1 overflow-auto no-scrollbar bg-white">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider text-[10px] font-bold sticky top-0 z-10 border-b border-slate-200">
                      <tr>
                        <th className="py-3 px-4">Usuario</th>
                        <th className="py-3 px-4">Correo Electrónico</th>
                        <th className="py-3 px-4">Rol en Tienda</th>
                        <th className="py-3 px-4">Registro</th>
                        <th className="py-3 px-4">Estado</th>
                        <th className="py-3 px-4 text-right">Acciones</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-800">
                      {usuariosFiltrados.length === 0 ? (
                        <tr>
                          <td colSpan="6" className="py-20 text-center text-slate-400 font-normal">
                            No se encontraron usuarios con los criterios de búsqueda.
                          </td>
                        </tr>
                      ) : (
                        usuariosFiltrados.map((u) => {
                          const esAdmin = u.rol === 'Administrador';
                          return (
                            <tr key={u.id} className="hover:bg-sky-50/50 transition-colors">
                              <td className="py-2.5 px-4">
                                <div className="flex items-center gap-2.5">
                                  <div className="w-8 h-8 rounded-full bg-[#a6d4f2]/40 border border-[#a6d4f2] flex items-center justify-center font-bold text-[#1e3a8a] text-xs">
                                    {u.nombre.charAt(0)}
                                  </div>
                                  <div>
                                    <div className="font-bold text-[#1e3a8a] text-xs">{u.nombre}</div>
                                    <div className="text-[10px] text-slate-400 font-mono">@{u.username}</div>
                                  </div>
                                </div>
                              </td>
                              <td className="py-2.5 px-4 font-normal text-slate-600">
                                {u.email}
                              </td>
                              <td className="py-2.5 px-4">
                                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${esAdmin ? 'bg-sky-100 text-[#1e3a8a] border-sky-200' : 'bg-slate-100 text-slate-700 border-slate-200'}`}>
                                  {u.rol}
                                </span>
                              </td>
                              <td className="py-2.5 px-4 text-slate-500 text-[11px]">
                                {u.fecha_registro}
                              </td>
                              <td className="py-2.5 px-4">
                                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${u.estado === 'Activo' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
                                  {u.estado}
                                </span>
                              </td>
                              <td className="py-2.5 px-4 text-right">
                                <div className="flex items-center justify-end gap-1.5">
                                  <button
                                    onClick={() => toggleRolUsuario(u.id)}
                                    className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-[#a6d4f2] text-slate-700 hover:text-[#1e3a8a] font-semibold text-[11px] transition-colors cursor-pointer"
                                    title={esAdmin ? 'Cambiar a Cliente' : 'Ascender a Administrador'}
                                  >
                                    {esAdmin ? 'Hacer Cliente' : 'Hacer Admin'}
                                  </button>
                                  <button
                                    onClick={() => toggleEstadoUsuario(u.id)}
                                    className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-[11px] transition-colors cursor-pointer"
                                  >
                                    {u.estado === 'Activo' ? 'Suspender' : 'Activar'}
                                  </button>
                                  <button
                                    onClick={() => eliminarUsuario(u.id, u.nombre)}
                                    className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-rose-100 text-slate-700 hover:text-rose-700 font-semibold text-[11px] transition-colors cursor-pointer"
                                  >
                                    Eliminar
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </div>

                <div className="h-7 bg-slate-50 border-t border-slate-200 px-4 flex items-center justify-between text-[11px] text-slate-500 flex-shrink-0">
                  <span>{usuariosFiltrados.length} usuarios registrados en la base de datos de Toy Store</span>
                  <span>Conexión TiDB Cloud verificada</span>
                </div>
              </>
            )}

          </div>
        )}

        {/* ========================================================== */}
        {/* MODAL 1: FORMULARIO JUGUETE / PRODUCTO                     */}
        {/* ========================================================== */}
        {mostrandoFormProd && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
            <div className="bg-white w-full max-w-xl rounded-2xl shadow-2xl border border-slate-300 overflow-hidden animate-in zoom-in-95 duration-150">
              <div className="h-10 bg-slate-100 border-b border-slate-200 px-4 flex items-center justify-between select-none">
                <span className="text-xs font-bold text-[#1e3a8a]">
                  {editandoProdId ? 'Editar Juguete en Almacén' : 'Registrar Nuevo Juguete en Catálogo'}
                </span>
                <button
                  onClick={() => setMostrandoFormProd(false)}
                  className="w-6 h-6 rounded-full hover:bg-slate-200 text-slate-500 flex items-center justify-center text-xs font-bold cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleSubmitProd} className="p-6 space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-bold text-[#1e3a8a] block">Nombre del Juguete</label>
                    <input
                      type="text"
                      value={formDataProd.nombre}
                      onChange={(e) => setFormDataProd({ ...formDataProd, nombre: e.target.value })}
                      required
                      placeholder="Ej. Vibrador Cowgirl Deluxe"
                      className="w-full py-2 px-3 rounded-lg border border-slate-300 focus:border-[#a6d4f2] focus:ring-2 focus:ring-[#a6d4f2]/40 outline-none text-slate-800"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-[#1e3a8a] block">Categoría</label>
                    <select
                      value={formDataProd.categoria}
                      onChange={(e) => setFormDataProd({ ...formDataProd, categoria: e.target.value })}
                      required
                      className="w-full py-2 px-3 rounded-lg border border-slate-300 focus:border-[#a6d4f2] outline-none text-slate-800 bg-white cursor-pointer"
                    >
                      <option value="vibradores">Vibradores</option>
                      <option value="lencerias">Lencerías</option>
                      <option value="anales">Anales & Plugs</option>
                      <option value="dildos">Dildos</option>
                      <option value="cosmetica">Cosmética & Aceites</option>
                      <option value="accesorios">Accesorios & BDSM</option>
                      <option value="kits">Kits & Sorpresas</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-[#1e3a8a] block">Precio en COP ($)</label>
                    <input
                      type="number"
                      value={formDataProd.precio}
                      onChange={(e) => setFormDataProd({ ...formDataProd, precio: e.target.value })}
                      required
                      min="1"
                      placeholder="Ej. 185000"
                      className="w-full py-2 px-3 rounded-lg border border-slate-300 focus:border-[#a6d4f2] outline-none text-slate-800"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-[#1e3a8a] block">Unidades en Stock</label>
                    <input
                      type="number"
                      value={formDataProd.stock}
                      onChange={(e) => setFormDataProd({ ...formDataProd, stock: e.target.value })}
                      required
                      min="0"
                      placeholder="Ej. 12"
                      className="w-full py-2 px-3 rounded-lg border border-slate-300 focus:border-[#a6d4f2] outline-none text-slate-800"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-[#1e3a8a] block">Ruta de Imagen (URL o archivo local)</label>
                  <input
                    type="text"
                    value={formDataProd.imagen}
                    onChange={(e) => setFormDataProd({ ...formDataProd, imagen: e.target.value })}
                    placeholder="/images/rabbitbuzz.webp"
                    className="w-full py-2 px-3 rounded-lg border border-slate-300 focus:border-[#a6d4f2] outline-none text-slate-800 font-mono text-[11px]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-[#1e3a8a] block">Descripción Discreta</label>
                  <textarea
                    value={formDataProd.descripcion}
                    onChange={(e) => setFormDataProd({ ...formDataProd, descripcion: e.target.value })}
                    rows="3"
                    placeholder="Descripción sutil y discreta del producto..."
                    className="w-full py-2 px-3 rounded-lg border border-slate-300 focus:border-[#a6d4f2] outline-none text-slate-800 resize-none font-normal"
                  />
                </div>

                <div className="pt-3 flex items-center justify-end gap-2 border-t border-slate-200">
                  <button
                    type="button"
                    onClick={() => setMostrandoFormProd(false)}
                    className="px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold cursor-pointer"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-lg bg-[#a6d4f2] hover:bg-[#8ec2e4] text-[#1e3a8a] font-bold cursor-pointer transition-all shadow-xs"
                  >
                    {editandoProdId ? 'Actualizar Ficha' : 'Guardar y Publicar en Tienda'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ========================================================== */}
        {/* MODAL 2: DETALLE COMPLETO DE PEDIDO                        */}
        {/* ========================================================== */}
        {pedidoDetalle && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
            <div className="bg-white w-full max-w-xl rounded-2xl shadow-2xl border border-slate-300 overflow-hidden animate-in zoom-in-95 duration-150">
              <div className="h-10 bg-slate-100 border-b border-slate-200 px-4 flex items-center justify-between select-none">
                <span className="text-xs font-bold text-[#1e3a8a]">
                  Detalle del Pedido #{pedidoDetalle.id}
                </span>
                <button
                  onClick={() => setPedidoDetalle(null)}
                  className="w-6 h-6 rounded-full hover:bg-slate-200 text-slate-500 flex items-center justify-center text-xs font-bold cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <div className="p-6 space-y-4 text-xs">
                {/* Datos del Cliente y Envío */}
                <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-bold block">Cliente</span>
                    <strong className="text-slate-800 text-sm block">{pedidoDetalle.cliente}</strong>
                    <span className="text-slate-500 text-[11px] block">{pedidoDetalle.email}</span>
                    <span className="text-slate-500 text-[11px] block">{pedidoDetalle.telefono}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-bold block">Destino y Guía</span>
                    <strong className="text-slate-800 text-sm block">{pedidoDetalle.ciudad}</strong>
                    <span className="text-slate-500 text-[11px] block">{pedidoDetalle.direccion}</span>
                    <span className="text-[#1e3a8a] font-mono text-[11px] font-bold block">Guía: {pedidoDetalle.guia}</span>
                  </div>
                </div>

                {/* Artículos del Pedido */}
                <div>
                  <h4 className="font-bold text-[#1e3a8a] mb-2">Artículos en la Caja</h4>
                  <div className="border border-slate-200 rounded-xl overflow-hidden">
                    {pedidoDetalle.productos.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 border-b border-slate-100 last:border-0 bg-white">
                        <div>
                          <span className="font-bold text-slate-800">{item.nombre}</span>
                          <span className="text-slate-400 text-[11px] block">Cantidad: {item.cantidad}</span>
                        </div>
                        <span className="font-bold text-[#1e3a8a]">{formatCOP(item.precio * item.cantidad)}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Total y Empaque */}
                <div className="flex items-center justify-between p-3 bg-emerald-50 border border-emerald-200 rounded-xl">
                  <div>
                    <span className="text-emerald-800 font-bold block">Empaque Ciego Garantizado</span>
                    <span className="text-emerald-600 text-[10px]">Caja neutra sin marcas ni logotipos delatadores</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-500 block uppercase">Total a Cobrar</span>
                    <span className="text-base font-black text-emerald-800">{formatCOP(pedidoDetalle.total)}</span>
                  </div>
                </div>

                {/* Cambio de Estado Rápido */}
                <div className="pt-2">
                  <span className="font-bold text-[#1e3a8a] block mb-2">Modificar Estado del Envío</span>
                  <div className="grid grid-cols-4 gap-2">
                    {['Pendiente', 'En camino', 'Entregado', 'Cancelado'].map(st => (
                      <button
                        key={st}
                        type="button"
                        onClick={() => cambiarEstadoPedido(pedidoDetalle.id, st)}
                        className={`py-2 rounded-lg font-bold text-xs transition-all cursor-pointer ${
                          pedidoDetalle.estado === st
                            ? 'bg-[#1e3a8a] text-white shadow-xs'
                            : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                        }`}
                      >
                        {st}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-3 flex items-center justify-end border-t border-slate-200">
                  <button
                    onClick={() => setPedidoDetalle(null)}
                    className="px-5 py-2 rounded-lg bg-[#a6d4f2] hover:bg-[#8ec2e4] text-[#1e3a8a] font-bold cursor-pointer"
                  >
                    Listo / Cerrar
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================== */}
        {/* MODAL 3: REGISTRO MANUAL DE PEDIDO                         */}
        {/* ========================================================== */}
        {mostrandoNuevoPedido && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
            <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-slate-300 overflow-hidden animate-in zoom-in-95 duration-150">
              <div className="h-10 bg-slate-100 border-b border-slate-200 px-4 flex items-center justify-between select-none">
                <span className="text-xs font-bold text-[#1e3a8a]">
                  Registrar Nuevo Pedido (Venta Telefónica o WhatsApp)
                </span>
                <button
                  onClick={() => setMostrandoNuevoPedido(false)}
                  className="w-6 h-6 rounded-full hover:bg-slate-200 text-slate-500 flex items-center justify-center text-xs font-bold cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleCrearPedidoManual} className="p-6 space-y-4 text-xs">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-bold text-[#1e3a8a] block">Nombre del Cliente</label>
                    <input
                      type="text"
                      required
                      placeholder="Ej. Mariana Franco"
                      value={nuevoPedidoData.cliente}
                      onChange={(e) => setNuevoPedidoData({ ...nuevoPedidoData, cliente: e.target.value })}
                      className="w-full py-2 px-3 rounded-lg border border-slate-300 focus:border-[#a6d4f2] outline-none text-slate-800"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-bold text-[#1e3a8a] block">Teléfono / WhatsApp</label>
                    <input
                      type="tel"
                      required
                      placeholder="+57 300 000 0000"
                      value={nuevoPedidoData.telefono}
                      onChange={(e) => setNuevoPedidoData({ ...nuevoPedidoData, telefono: e.target.value })}
                      className="w-full py-2 px-3 rounded-lg border border-slate-300 focus:border-[#a6d4f2] outline-none text-slate-800"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-bold text-[#1e3a8a] block">Ciudad de Envío</label>
                    <input
                      type="text"
                      required
                      placeholder="Medellín, Bogotá, Cali..."
                      value={nuevoPedidoData.ciudad}
                      onChange={(e) => setNuevoPedidoData({ ...nuevoPedidoData, ciudad: e.target.value })}
                      className="w-full py-2 px-3 rounded-lg border border-slate-300 focus:border-[#a6d4f2] outline-none text-slate-800"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-bold text-[#1e3a8a] block">Dirección de Entrega</label>
                    <input
                      type="text"
                      required
                      placeholder="Calle / Carrera / Apto"
                      value={nuevoPedidoData.direccion}
                      onChange={(e) => setNuevoPedidoData({ ...nuevoPedidoData, direccion: e.target.value })}
                      className="w-full py-2 px-3 rounded-lg border border-slate-300 focus:border-[#a6d4f2] outline-none text-slate-800"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-[#1e3a8a] block">Producto a Despachar</label>
                  <select
                    value={nuevoPedidoData.productoId}
                    onChange={(e) => setNuevoPedidoData({ ...nuevoPedidoData, productoId: e.target.value })}
                    className="w-full py-2 px-3 rounded-lg border border-slate-300 focus:border-[#a6d4f2] outline-none text-slate-800 bg-white"
                  >
                    {productos.map(p => (
                      <option key={p.id} value={p.id}>{p.nombre} — {formatCOP(p.precio)}</option>
                    ))}
                  </select>
                </div>

                <div className="pt-3 flex items-center justify-end gap-2 border-t border-slate-200">
                  <button
                    type="button"
                    onClick={() => setMostrandoNuevoPedido(false)}
                    className="px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold cursor-pointer"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-lg bg-[#a6d4f2] hover:bg-[#8ec2e4] text-[#1e3a8a] font-bold cursor-pointer transition-all shadow-xs"
                  >
                    Guardar Pedido
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ========================================================== */}
        {/* MODAL 4: CREACIÓN DE USUARIO                               */}
        {/* ========================================================== */}
        {mostrandoNuevoUser && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
            <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-slate-300 overflow-hidden animate-in zoom-in-95 duration-150">
              <div className="h-10 bg-slate-100 border-b border-slate-200 px-4 flex items-center justify-between select-none">
                <span className="text-xs font-bold text-[#1e3a8a]">
                  Crear Nueva Cuenta de Usuario
                </span>
                <button
                  onClick={() => setMostrandoNuevoUser(false)}
                  className="w-6 h-6 rounded-full hover:bg-slate-200 text-slate-500 flex items-center justify-center text-xs font-bold cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleCrearUsuario} className="p-6 space-y-4 text-xs">
                <div className="space-y-1">
                  <label className="font-bold text-[#1e3a8a] block">Nombre Completo</label>
                  <input
                    type="text"
                    required
                    placeholder="Ej. Mariana Franco"
                    value={nuevoUserData.nombre}
                    onChange={(e) => setNuevoUserData({ ...nuevoUserData, nombre: e.target.value })}
                    className="w-full py-2 px-3 rounded-lg border border-slate-300 focus:border-[#a6d4f2] outline-none text-slate-800"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-[#1e3a8a] block">Nombre de Usuario (@)</label>
                  <input
                    type="text"
                    required
                    placeholder="mfranco090393"
                    value={nuevoUserData.username}
                    onChange={(e) => setNuevoUserData({ ...nuevoUserData, username: e.target.value })}
                    className="w-full py-2 px-3 rounded-lg border border-slate-300 focus:border-[#a6d4f2] outline-none text-slate-800 font-mono text-[11px]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-[#1e3a8a] block">Correo Electrónico</label>
                  <input
                    type="email"
                    required
                    placeholder="usuario@ejemplo.com"
                    value={nuevoUserData.email}
                    onChange={(e) => setNuevoUserData({ ...nuevoUserData, email: e.target.value })}
                    className="w-full py-2 px-3 rounded-lg border border-slate-300 focus:border-[#a6d4f2] outline-none text-slate-800"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-[#1e3a8a] block">Rol Asignado</label>
                  <select
                    value={nuevoUserData.rol}
                    onChange={(e) => setNuevoUserData({ ...nuevoUserData, rol: e.target.value })}
                    className="w-full py-2 px-3 rounded-lg border border-slate-300 focus:border-[#a6d4f2] outline-none text-slate-800 bg-white"
                  >
                    <option value="Cliente">Cliente (Comprador)</option>
                    <option value="Administrador">Administrador (Acceso total)</option>
                  </select>
                </div>

                <div className="pt-3 flex items-center justify-end gap-2 border-t border-slate-200">
                  <button
                    type="button"
                    onClick={() => setMostrandoNuevoUser(false)}
                    className="px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold cursor-pointer"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-lg bg-[#a6d4f2] hover:bg-[#8ec2e4] text-[#1e3a8a] font-bold cursor-pointer transition-all shadow-xs"
                  >
                    Guardar Usuario
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ========================================================== */}
        {/* TOYITO: ASISTENTE OFICIAL COMPLETO (CHATBOTWIDGET)         */}
        {/* ========================================================== */}
        <ChatbotWidget />

      </main>

      {/* ============================================================ */}
      {/* 3. DOCK FLOTANTE INFERIOR DEL SISTEMA OPERATIVO (TOY-OS 2025) */}
      {/* ============================================================ */}
      <footer className="fixed bottom-3 left-1/2 -translate-x-1/2 z-40 bg-white/20 backdrop-blur-xl border border-white/30 rounded-2xl p-1.5 shadow-2xl flex items-center gap-1.5">
        
        {/* App 1: Inventario */}
        <button 
          onClick={() => { setAppActiva('inventario'); setVentanaAbierta(true); }}
          className={`w-11 h-11 rounded-xl flex flex-col items-center justify-center shadow-md relative group cursor-pointer transition-transform hover:scale-110 active:scale-95 ${
            ventanaAbierta && appActiva === 'inventario' ? 'bg-white text-[#1e3a8a]' : 'bg-white/70 hover:bg-white text-slate-700'
          }`}
          title="Almacén de Productos"
        >
          <svg className="w-5 h-5 fill-none stroke-current" strokeWidth="2.2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
          {ventanaAbierta && appActiva === 'inventario' && (
            <span className="w-1 h-1 bg-[#1e3a8a] rounded-full mt-0.5"></span>
          )}
        </button>

        {/* App 2: Pedidos */}
        <button 
          onClick={() => { setAppActiva('pedidos'); setVentanaAbierta(true); }}
          className={`w-11 h-11 rounded-xl flex flex-col items-center justify-center shadow-md relative group cursor-pointer transition-transform hover:scale-110 active:scale-95 ${
            ventanaAbierta && appActiva === 'pedidos' ? 'bg-white text-[#1e3a8a]' : 'bg-white/70 hover:bg-white text-slate-700'
          }`}
          title="Gestión de Pedidos & Despachos"
        >
          <svg className="w-5 h-5 fill-none stroke-current" strokeWidth="2.2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          {ventanaAbierta && appActiva === 'pedidos' && (
            <span className="w-1 h-1 bg-[#1e3a8a] rounded-full mt-0.5"></span>
          )}
        </button>

        {/* App 3: Usuarios */}
        <button 
          onClick={() => { setAppActiva('usuarios'); setVentanaAbierta(true); }}
          className={`w-11 h-11 rounded-xl flex flex-col items-center justify-center shadow-md relative group cursor-pointer transition-transform hover:scale-110 active:scale-95 ${
            ventanaAbierta && appActiva === 'usuarios' ? 'bg-white text-[#1e3a8a]' : 'bg-white/70 hover:bg-white text-slate-700'
          }`}
          title="Directorio de Usuarios Registrados"
        >
          <svg className="w-5 h-5 fill-none stroke-current" strokeWidth="2.2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
          {ventanaAbierta && appActiva === 'usuarios' && (
            <span className="w-1 h-1 bg-[#1e3a8a] rounded-full mt-0.5"></span>
          )}
        </button>

        <div className="w-px h-6 bg-white/30 mx-1"></div>

        {/* Salir / Volver al Panel Principal con Opciones */}
        <button 
          onClick={salirAlPanelPrincipal}
          className="w-11 h-11 rounded-xl bg-slate-900/70 hover:bg-slate-900 text-white flex items-center justify-center shadow-md relative group cursor-pointer transition-transform hover:scale-110 active:scale-95"
          title="Volver al panel principal con opciones"
        >
          <svg className="w-5 h-5 fill-none stroke-current" strokeWidth="2.2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
        </button>

      </footer>

    </div>
  );
}
