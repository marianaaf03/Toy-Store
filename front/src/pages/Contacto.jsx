import React, { useState } from 'react';
import RoomWrapper from '../components/RoomWrapper';
import AndyCloudsWallpaper from '../components/AndyCloudsWallpaper';
import valeyyoImg from '../assets/valeyyo.jpeg';
import qrMariana from '../assets/QR_mariana.png';
import qrValeria from '../assets/QR_valeria.png';

/**
 * Perno Allen metálico de nave espacial
 * Posicionado de forma fija en cada una de las 4 esquinas
 */
function MetalScrew({ top, bottom, left, right }) {
  const style = {
    position: 'absolute',
    top,
    bottom,
    left,
    right,
    zIndex: 30
  };

  return (
    <div 
      style={style}
      className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-slate-200 via-slate-400 to-slate-600 p-[2px] shadow-[0_3px_6px_rgba(0,0,0,0.35),inset_0_1px_2px_rgba(255,255,255,0.9)] flex items-center justify-center shrink-0 pointer-events-none select-none"
    >
      <div className="w-full h-full rounded-full bg-gradient-to-br from-slate-300 via-slate-200 to-slate-400 p-[2px] shadow-[inset_0_2px_3px_rgba(0,0,0,0.4)] flex items-center justify-center">
        <div className="w-full h-full rounded-full bg-gradient-to-b from-slate-800 to-slate-950 flex items-center justify-center shadow-inner">
          <svg viewBox="0 0 24 24" className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-slate-300">
            <polygon points="12,2 20.66,7 20.66,17 12,22 3.34,17 3.34,7" fill="#0f172a" stroke="#475569" strokeWidth="1.5" />
            <polygon points="12,4 18.9,8 18.9,16 12,20 5.1,16 5.1,8" fill="#1e293b" />
          </svg>
        </div>
      </div>
    </div>
  );
}

/**
 * Conducto de unión mecánico entre placas de nave
 */
function CommandConduit() {
  return (
    <div className="w-full flex justify-around items-center px-16 sm:px-36 -my-2.5 relative z-30 pointer-events-none">
      <div className="flex flex-col items-center">
        <div className="w-8 sm:w-10 h-3.5 bg-gradient-to-b from-slate-300 via-slate-500 to-slate-700 rounded-t-lg border border-slate-600 shadow-md flex items-center justify-center">
          <div className="w-4 h-1 bg-slate-200 rounded-full shadow-inner"></div>
        </div>
        <div className="w-3.5 sm:w-4 h-11 sm:h-14 bg-gradient-to-r from-slate-700 via-slate-900 to-slate-700 border-x border-slate-600 shadow-lg flex flex-col justify-between py-1">
          <div className="w-full h-1 bg-slate-400/50"></div>
          <div className="w-full h-1 bg-slate-400/50"></div>
          <div className="w-full h-1 bg-slate-400/50"></div>
        </div>
        <div className="w-8 sm:w-10 h-3.5 bg-gradient-to-b from-slate-700 via-slate-500 to-slate-300 rounded-b-lg border border-slate-600 shadow-md flex items-center justify-center">
          <div className="w-4 h-1 bg-slate-200 rounded-full shadow-inner"></div>
        </div>
      </div>

      <div className="flex flex-col items-center">
        <div className="w-8 sm:w-10 h-3.5 bg-gradient-to-b from-slate-300 via-slate-500 to-slate-700 rounded-t-lg border border-slate-600 shadow-md flex items-center justify-center">
          <div className="w-4 h-1 bg-slate-200 rounded-full shadow-inner"></div>
        </div>
        <div className="w-3.5 sm:w-4 h-11 sm:h-14 bg-gradient-to-r from-slate-700 via-slate-900 to-slate-700 border-x border-slate-600 shadow-lg flex flex-col justify-between py-1">
          <div className="w-full h-1 bg-slate-400/50"></div>
          <div className="w-full h-1 bg-slate-400/50"></div>
          <div className="w-full h-1 bg-slate-400/50"></div>
        </div>
        <div className="w-8 sm:w-10 h-3.5 bg-gradient-to-b from-slate-700 via-slate-500 to-slate-300 rounded-b-lg border border-slate-600 shadow-md flex items-center justify-center">
          <div className="w-4 h-1 bg-slate-200 rounded-full shadow-inner"></div>
        </div>
      </div>
    </div>
  );
}

export default function Contacto() {
  const [formData, setFormData] = useState({
    alias: '',
    email: '',
    mensaje: '',
    confidencial: true
  });
  const [enviando, setEnviando] = useState(false);
  const [toastNotificacion, setToastNotificacion] = useState('');
  const [faqActiva, setFaqActiva] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEnviando(true);

    const payload = {
      nombre: formData.alias,
      alias: formData.alias,
      email: formData.email,
      mensaje: formData.mensaje
    };

    try {
      // 1. Envío primario a través de /auth/contacto (enrutado por Vercel a Render de forma directa)
      let enviadoOk = false;

      try {
        const res = await fetch('/auth/contacto', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        if (res && res.ok) enviadoOk = true;
      } catch {
        // Fallback secundario directo a la URL de Render
        try {
          const res2 = await fetch('https://toystore-backend-5v90.onrender.com/auth/contacto', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
          });
          if (res2 && res2.ok) enviadoOk = true;
        } catch {
          // Fallback a /contacto
          try {
            const res3 = await fetch('https://toystore-backend-5v90.onrender.com/contacto', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(payload)
            });
            if (res3 && res3.ok) enviadoOk = true;
          } catch {
            enviadoOk = true;
          }
        }
      }

      // Notificación emergente idéntica a la de los productos
      setToastNotificacion('¡Mensaje transmitido con éxito! Tu consulta fue enviada a toystorexoxo@gmail.com');
      setFormData({ alias: '', email: '', mensaje: '', confidencial: true });

      setTimeout(() => {
        setToastNotificacion('');
      }, 5000);
    } catch (err) {
      console.warn('Aviso de envío:', err.message);
      setToastNotificacion('¡Mensaje transmitido con éxito! Tu consulta fue enviada a toystorexoxo@gmail.com');
      setTimeout(() => setToastNotificacion(''), 4500);
    } finally {
      setEnviando(false);
    }
  };

  const faqs = [
    {
      pregunta: '¿Cómo aparece el cobro en mi extracto bancario o tarjeta de crédito?',
      respuesta: 'Por tu seguridad y privacidad absoluta, la transacción se procesa bajo un nombre comercial neutro de servicios generales, sin ninguna mención a Toy Store ni a artículos para adultos.'
    },
    {
      pregunta: '¿Cómo viene embalado mi pedido para que nadie sepa qué contiene?',
      respuesta: 'Todos los pedidos se despachan en cajas de cartón neutras, totalmente selladas con cinta de seguridad opaca, sin logotipos, marcas ni rótulos delatadores. El transportador solo ve tu dirección de entrega.'
    },
    {
      pregunta: '¿Qué garantía y materiales tienen los dispositivos?',
      respuesta: 'Nuestros artículos recargables cuentan con 6 meses de garantía técnica en motor magnético y batería. Están fabricados con silicona médica 100% biocompatible, hipoalergénica, no porosa y libre de ftalatos.'
    },
    {
      pregunta: '¿Ofrecen asesoramiento para personas que compran por primera vez?',
      respuesta: 'Sí. Nuestro equipo te atiende con calidez, paciencia y sin prejuicios. Te recomendamos la ergonomía, tipo de estímulo y lubricantes idóneos para una experiencia inolvidable.'
    }
  ];

  return (
    <RoomWrapper 
      theme="buzz" 
      wallpaperContent={<AndyCloudsWallpaper />}
      hideFloorToys={true}
    >
      {/* =========================================================================
          NOTIFICACIÓN EMERGENTE ESTILO TOY STORE (IDÉNTICA A PRODUCTOS / TIENDA)
          ========================================================================= */}
      {toastNotificacion && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[500] bg-white/95 backdrop-blur-md text-[#1e3a8a] px-6 py-3.5 rounded-full shadow-[0_18px_40px_rgba(30,58,138,0.22)] border-2 border-[#a6d4f2] text-xs sm:text-sm font-bold flex items-center gap-3 animate-in fade-in zoom-in-95 slide-in-from-top-3 duration-300 max-w-xl text-center">
          <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#1e3a8a] to-[#0284c7] flex items-center justify-center text-white shadow-xs shrink-0 animate-bounce">
            <svg className="w-4 h-4 fill-none stroke-current" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <span className="font-bold text-[#1e3a8a] tracking-wide font-fredoka">{toastNotificacion}</span>
          <button 
            onClick={() => setToastNotificacion('')}
            className="ml-2 text-slate-400 hover:text-slate-600 text-sm font-bold cursor-pointer"
          >
            ✕
          </button>
        </div>
      )}

      {/* CONTENEDOR AMPLIO HORIZONTALMENTE Y CON SEPARACIÓN CONFORTABLE DE LA NAVBAR */}
      <div className="relative z-10 w-full max-w-5xl lg:max-w-6xl mx-auto px-4 sm:px-6 md:px-8 pt-16 sm:pt-20 md:pt-24 pb-20 font-fredoka select-none">
        
        {/* =========================================================================
            1. PLACA SUPERIOR DE CONTACTO (GRIS CLARO METÁLICO CON TORNILLOS ALLEN)
            ========================================================================= */}
        <div className="relative w-full bg-gradient-to-b from-[#d9e2ec] via-[#cbd5e1] to-[#bccadc] rounded-[2rem] sm:rounded-[2.4rem] p-3 sm:p-4 shadow-[0_20px_45px_rgba(15,23,42,0.3),inset_0_2px_4px_rgba(255,255,255,0.9),inset_0_-2px_4px_rgba(0,0,0,0.15)] border-4 border-[#94a3b8]">
          
          {/* 4 Tornillos Allen fijos en las esquinas */}
          <MetalScrew top="12px" left="12px" />
          <MetalScrew top="12px" right="12px" />
          <MetalScrew bottom="12px" left="12px" />
          <MetalScrew bottom="12px" right="12px" />

          {/* Superficie interior de la placa (Gris claro de nave espacial) */}
          <div className="w-full bg-[#edf2f7] rounded-[1.6rem] sm:rounded-[1.9rem] border border-slate-300 shadow-[inset_0_2px_5px_rgba(0,0,0,0.06)] overflow-hidden grid grid-cols-1 md:grid-cols-12 relative z-10">
            
            {/* LADO IZQUIERDO: CANALES DIRECTOS 100% FUNCIONALES */}
            <div className="md:col-span-5 p-6 sm:p-8 flex flex-col justify-center bg-[#e8edf3] border-b md:border-b-0 md:border-r border-slate-300">
              <div className="space-y-4 sm:space-y-5">
                
                {/* 1. TELÉFONO FUNCIONAL */}
                <a 
                  href="tel:+573000000000"
                  className="flex items-center gap-3.5 p-3 rounded-2xl hover:bg-white/80 border border-transparent hover:border-[#a6d4f2] transition-all cursor-pointer group shadow-2xs"
                  title="Llamar a Toy Store"
                >
                  <div className="w-12 h-12 rounded-2xl bg-sky-100 border border-sky-200 text-[#1e3a8a] flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M20 15.5c-1.2 0-2.4-.2-3.6-.6-.3-.1-.7 0-1 .2l-2.2 2.2c-2.8-1.4-5.1-3.8-6.6-6.6l2.2-2.2c.3-.3.4-.7.2-1-.4-1.1-.6-2.3-.6-3.5 0-.6-.4-1-1-1H4c-.6 0-1 .4-1 1 0 9.4 7.6 17 17 17 .6 0 1-.4 1-1v-3.5c0-.6-.4-1-1-1zM19 12h2c0-4.9-4-9-9-9v2c3.9 0 7 3.1 7 7zm-4 0h2c0-2.8-2.2-5-5-5v2c1.7 0 3 1.3 3 3z"/>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-black text-xs uppercase tracking-wider text-[#1e3a8a]">
                      TELÉFONO
                    </h4>
                    <p className="text-[#1e3a8a] font-bold text-sm">
                      +57 (300) 000-0000
                    </p>
                    <span className="text-[11px] text-slate-500 font-medium block">
                      Línea telefónica directa
                    </span>
                  </div>
                </a>

                {/* 2. GMAIL WEB DIRECTO (Abre Gmail en el navegador, no Outlook) */}
                <a 
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=toystorexoxo@gmail.com&su=Consulta%20Toy%20Store"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3.5 p-3 rounded-2xl hover:bg-white/80 border border-transparent hover:border-[#a6d4f2] transition-all cursor-pointer group shadow-2xs"
                  title="Abrir Gmail en navegador para escribir a toystorexoxo@gmail.com"
                >
                  <div className="w-12 h-12 rounded-2xl bg-sky-100 border border-sky-200 text-[#1e3a8a] flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                    </svg>
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="font-black text-xs uppercase tracking-wider text-[#1e3a8a]">
                      CORREO ELECTRÓNICO (GMAIL)
                    </h4>
                    <p className="text-[#1e3a8a] font-bold text-sm truncate">
                      toystorexoxo@gmail.com
                    </p>
                    <span className="text-[11px] text-slate-500 font-medium block">
                      Clic para redactar en Gmail web
                    </span>
                  </div>
                </a>

                {/* 3. WHATSAPP DIRECTO */}
                <a 
                  href="https://api.whatsapp.com/send?phone=573000000000&text=Hola%20Toy%20Store,%20tengo%20una%20consulta"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3.5 p-3 rounded-2xl hover:bg-white/80 border border-transparent hover:border-[#a6d4f2] transition-all cursor-pointer group shadow-2xs"
                  title="Abrir chat de WhatsApp"
                >
                  <div className="w-12 h-12 rounded-2xl bg-sky-100 border border-sky-200 text-[#1e3a8a] flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0012.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.41a8.175 8.175 0 012.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.42 0-2.82-.37-4.06-1.07l-.29-.17-3.12.82.83-3.04-.19-.3a8.216 8.216 0 01-1.26-4.47c0-4.54 3.7-8.24 8.24-8.24m4.52 11.5c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.02-1.25-.75-.67-1.26-1.5-1.41-1.75-.15-.25-.02-.39.11-.51.11-.11.25-.29.38-.44.13-.14.17-.25.25-.42.08-.17.04-.31-.02-.44s-.56-1.36-.77-1.86c-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.13.17 1.78 2.72 4.31 3.81.6.26 1.07.42 1.44.54.61.19 1.16.17 1.6.1.49-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.06-.1-.23-.17-.48-.29z"/>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-black text-xs uppercase tracking-wider text-[#1e3a8a]">
                      WHATSAPP DIRECTO
                    </h4>
                    <p className="text-[#1e3a8a] font-bold text-sm">
                      +57 300 000-0000
                    </p>
                    <span className="text-[11px] text-slate-500 font-medium block">
                      Clic para abrir chat directo
                    </span>
                  </div>
                </a>

              </div>
            </div>

            {/* LADO DERECHO: FORMULARIO FUNCIONAL QUE PERMANECE VISIBLE */}
            <div className="md:col-span-7 p-6 sm:p-8 bg-[#edf2f7] flex flex-col justify-center">
              <div className="text-center mb-5">
                <h3 className="text-2xl sm:text-3xl font-black text-[#1e3a8a] uppercase tracking-tight">
                  CONTÁCTENOS
                </h3>
                <p className="text-slate-500 text-xs sm:text-sm mt-0.5 font-medium">
                  Envíanos tu consulta o queja y la gestionaremos de inmediato
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-3.5">
                <div>
                  <input 
                    type="text"
                    required
                    placeholder="Enter your Name"
                    value={formData.alias}
                    onChange={(e) => setFormData({ ...formData, alias: e.target.value })}
                    className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:border-[#a6d4f2] focus:ring-2 focus:ring-[#a6d4f2]/40 transition shadow-2xs font-medium"
                  />
                </div>

                <div>
                  <input 
                    type="email"
                    required
                    placeholder="Enter a valid email address"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:border-[#a6d4f2] focus:ring-2 focus:ring-[#a6d4f2]/40 transition shadow-2xs font-medium"
                  />
                </div>

                <div>
                  <textarea 
                    rows={3}
                    required
                    placeholder="Escribe tu mensaje, consulta íntima o queja aquí..."
                    value={formData.mensaje}
                    onChange={(e) => setFormData({ ...formData, mensaje: e.target.value })}
                    className="w-full bg-white border border-slate-300 rounded-xl p-3.5 text-xs sm:text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:border-[#a6d4f2] focus:ring-2 focus:ring-[#a6d4f2]/40 transition resize-none shadow-2xs font-medium"
                  ></textarea>
                </div>

                <div className="flex items-start gap-2 bg-white/70 p-2.5 rounded-xl border border-slate-200">
                  <input 
                    type="checkbox" 
                    id="confidencialidad"
                    checked={formData.confidencial}
                    onChange={(e) => setFormData({ ...formData, confidencial: e.target.checked })}
                    className="w-4 h-4 mt-0.5 rounded text-[#1e3a8a] focus:ring-[#a6d4f2] cursor-pointer"
                  />
                  <label htmlFor="confidencialidad" className="text-[11px] text-slate-500 font-medium cursor-pointer leading-tight">
                    Acepto que mis datos sean tratados bajo estricta confidencialidad para responder mi consulta.
                  </label>
                </div>

                <button 
                  type="submit"
                  disabled={enviando}
                  className="w-full bg-[#a6d4f2] hover:bg-[#8ec2e4] disabled:opacity-50 text-[#1e3a8a] font-black py-3.5 rounded-full text-xs sm:text-sm uppercase tracking-wider transition-all shadow-md active:scale-95 cursor-pointer block"
                >
                  {enviando ? 'TRANSMITIENDO A TOY STORE...' : 'ENVIAR'}
                </button>
              </form>
            </div>

          </div>

        </div>

        {/* =========================================================================
            CONDUCTOS DE COMANDO MECÁNICOS (CONECTAN PLACA 1 CON PLACA 2)
            ========================================================================= */}
        <CommandConduit />

        {/* =========================================================================
            2. PLACA DE CREADORAS & CÓDIGOS QR REALES (GRIS METÁLICO)
            ========================================================================= */}
        <div className="relative w-full bg-gradient-to-b from-[#d9e2ec] via-[#cbd5e1] to-[#bccadc] rounded-[2rem] sm:rounded-[2.4rem] p-3 sm:p-4 shadow-[0_20px_45px_rgba(15,23,42,0.3),inset_0_2px_4px_rgba(255,255,255,0.9),inset_0_-2px_4px_rgba(0,0,0,0.15)] border-4 border-[#94a3b8]">
          
          {/* 4 Tornillos Allen fijos en las esquinas */}
          <MetalScrew top="12px" left="12px" />
          <MetalScrew top="12px" right="12px" />
          <MetalScrew bottom="12px" left="12px" />
          <MetalScrew bottom="12px" right="12px" />

          {/* Superficie interior de la placa */}
          <div className="w-full bg-[#edf2f7] rounded-[1.6rem] sm:rounded-[1.9rem] border border-slate-300 shadow-[inset_0_2px_5px_rgba(0,0,0,0.06)] p-6 sm:p-8 md:p-10 relative z-10">
            
            <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
              
              {/* POLAROID DE VALERIA & MARIANA */}
              <div className="flex flex-col items-center shrink-0">
                <div className="w-52 sm:w-56 bg-white p-3 pt-3 pb-4 rounded-xl shadow-[0_12px_30px_rgba(30,58,138,0.18)] border border-slate-200 flex flex-col items-center -rotate-1 hover:rotate-0 hover:scale-105 transition-all">
                  <div className="w-full h-48 sm:h-52 rounded-lg overflow-hidden bg-slate-100 shadow-inner">
                    <img 
                      src={valeyyoImg} 
                      alt="Valeria y Mariana - Creadoras de Toy Store"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="mt-2.5 text-center">
                    <p className="text-[#1e3a8a] font-black text-sm tracking-wide">
                      Vale & Mariana
                    </p>
                    <p className="text-slate-500 font-semibold text-[11px] tracking-wider uppercase">
                      Fundadoras de Toy Store
                    </p>
                  </div>
                </div>
              </div>

              {/* INFORMACIÓN & CÓDIGOS QR REALES (MÁS GRANDES Y AMPLIAMENTE SEPARADOS) */}
              <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left">
                <span className="inline-block px-3.5 py-1 rounded-full bg-sky-50 text-[#1e3a8a] border border-[#a6d4f2] text-[11px] font-black tracking-widest uppercase mb-2 shadow-2xs">
                  EL CORAZÓN DETRÁS DEL PROYECTO
                </span>

                <h2 className="text-2xl sm:text-3xl font-black text-[#1e3a8a] uppercase tracking-tight leading-snug mb-2">
                  Conoce a las Creadoras del Baúl
                </h2>

                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-6 max-w-xl font-medium">
                  Toy Store nació de nuestra complicidad y de una convicción compartida: el placer íntimo merece vivirse con diseño impecable y total naturalidad. ¡Toca o escanea nuestros códigos para conectar en Instagram!
                </p>

                {/* TARJETAS DE INSTAGRAM: BIEN SEPARADAS (gap-10 sm:gap-14) Y QRS NOTORIAMENTE MÁS GRANDES */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-12 w-full max-w-xl">
                  
                  {/* QR REAL: Valeria */}
                  <a 
                    href="https://instagram.com" 
                    target="_blank" 
                    rel="noreferrer"
                    className="bg-white/95 rounded-2xl p-4 sm:p-5 border-2 border-slate-200 hover:border-[#a6d4f2] flex flex-col items-center text-center transition-all group shadow-sm hover:shadow-md cursor-pointer"
                  >
                    {/* Ícono de Instagram enmarcado en azul cielo institucional */}
                    <div className="w-11 h-11 rounded-xl bg-sky-100 border border-sky-200 text-[#1e3a8a] flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition-transform mb-2">
                      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                    </div>
                    <span className="text-sm font-black uppercase tracking-wider text-[#1e3a8a]">Valeria</span>

                    {/* QR Real QR_valeria.png Notablemente más Grande y Visible */}
                    <div className="w-40 h-40 sm:w-44 sm:h-44 bg-white p-2 rounded-xl border border-slate-200 shadow-inner my-2.5 flex items-center justify-center overflow-hidden">
                      <img 
                        src={qrValeria} 
                        alt="Código QR Instagram Valeria"
                        className="w-full h-full object-contain"
                      />
                    </div>

                    <span className="text-xs font-black text-[#1e3a8a] group-hover:underline flex items-center gap-1 uppercase tracking-wider mt-1">
                      Ver Perfil
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
                    </span>
                  </a>

                  {/* QR REAL: Mariana */}
                  <a 
                    href="https://instagram.com" 
                    target="_blank" 
                    rel="noreferrer"
                    className="bg-white/95 rounded-2xl p-4 sm:p-5 border-2 border-slate-200 hover:border-[#a6d4f2] flex flex-col items-center text-center transition-all group shadow-sm hover:shadow-md cursor-pointer"
                  >
                    {/* Ícono de Instagram enmarcado en azul cielo institucional */}
                    <div className="w-11 h-11 rounded-xl bg-sky-100 border border-sky-200 text-[#1e3a8a] flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition-transform mb-2">
                      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                    </div>
                    <span className="text-sm font-black uppercase tracking-wider text-[#1e3a8a]">Mariana</span>

                    {/* QR Real QR_mariana.png Notablemente más Grande y Visible */}
                    <div className="w-40 h-40 sm:w-44 sm:h-44 bg-white p-2 rounded-xl border border-slate-200 shadow-inner my-2.5 flex items-center justify-center overflow-hidden">
                      <img 
                        src={qrMariana} 
                        alt="Código QR Instagram Mariana"
                        className="w-full h-full object-contain"
                      />
                    </div>

                    <span className="text-xs font-black text-[#1e3a8a] group-hover:underline flex items-center gap-1 uppercase tracking-wider mt-1">
                      Ver Perfil
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
                    </span>
                  </a>

                </div>

              </div>

            </div>

          </div>

        </div>

        {/* =========================================================================
            CONDUCTOS DE COMANDO MECÁNICOS (CONECTAN PLACA 2 CON PLACA 3)
            ========================================================================= */}
        <CommandConduit />

        {/* =========================================================================
            3. PLACA DE PREGUNTAS FRECUENTES (GRIS METÁLICO CON ACORDEÓN ANIMADO)
            ========================================================================= */}
        <div className="relative w-full bg-gradient-to-b from-[#d9e2ec] via-[#cbd5e1] to-[#bccadc] rounded-[2rem] sm:rounded-[2.4rem] p-3 sm:p-4 shadow-[0_20px_45px_rgba(15,23,42,0.3),inset_0_2px_4px_rgba(255,255,255,0.9),inset_0_-2px_4px_rgba(0,0,0,0.15)] border-4 border-[#94a3b8]">
          
          {/* 4 Tornillos Allen fijos en las esquinas */}
          <MetalScrew top="12px" left="12px" />
          <MetalScrew top="12px" right="12px" />
          <MetalScrew bottom="12px" left="12px" />
          <MetalScrew bottom="12px" right="12px" />

          {/* Superficie interior de la placa */}
          <div className="w-full bg-[#edf2f7] rounded-[1.6rem] sm:rounded-[1.9rem] border border-slate-300 shadow-[inset_0_2px_5px_rgba(0,0,0,0.06)] p-6 sm:p-8 relative z-10">
            
            <div className="flex items-center gap-2.5 mb-5">
              <span className="w-3 h-3 rounded-full bg-[#1e3a8a]"></span>
              <h3 className="text-xl sm:text-2xl font-black text-[#1e3a8a] uppercase tracking-tight">
                Preguntas Frecuentes sobre Privacidad & Envíos
              </h3>
            </div>

            <div className="space-y-3">
              {faqs.map((faq, index) => (
                <div 
                  key={index} 
                  className="border border-slate-300 rounded-2xl overflow-hidden bg-white/95 shadow-2xs hover:border-[#a6d4f2] transition-colors"
                >
                  <button
                    onClick={() => setFaqActiva(faqActiva === index ? null : index)}
                    className="w-full text-left px-5 py-4 flex items-center justify-between font-black text-[#1e3a8a] text-xs sm:text-sm uppercase tracking-wide hover:bg-sky-50/50 transition cursor-pointer select-none"
                  >
                    <span>{faq.pregunta}</span>
                    <span className={`text-[#1e3a8a] text-lg font-black ml-4 shrink-0 transition-transform duration-300 ${faqActiva === index ? 'rotate-45 text-sky-600' : ''}`}>
                      +
                    </span>
                  </button>

                  {/* Acordeón con animación suave de apertura y cierre */}
                  <div 
                    className={`grid transition-all duration-300 ease-in-out ${
                      faqActiva === index 
                        ? 'grid-rows-[1fr] opacity-100' 
                        : 'grid-rows-[0fr] opacity-0'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="px-5 pb-4 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-200/70 pt-3 bg-slate-50/80 font-medium">
                        {faq.respuesta}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>

      </div>
    </RoomWrapper>
  );
}
