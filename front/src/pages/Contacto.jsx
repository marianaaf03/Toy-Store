import React, { useState } from 'react';
import RoomWrapper from '../components/RoomWrapper';
import AndyCloudsWallpaper from '../components/AndyCloudsWallpaper';
import valeyyoImg from '../assets/valeyyo.jpeg';

export default function Contacto() {
  const [motivo, setMotivo] = useState('asesoria');
  const [formData, setFormData] = useState({
    alias: '',
    email: '',
    telefono: '',
    mensaje: '',
    confidencial: true
  });
  const [enviado, setEnviado] = useState(false);
  const [faqActiva, setFaqActiva] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setEnviado(true);
    setTimeout(() => {
      setFormData({ alias: '', email: '', telefono: '', mensaje: '', confidencial: true });
    }, 400);
  };

  const motivos = [
    { id: 'asesoria', label: 'Asesoría de Juguetes', desc: 'Te guiamos según tus gustos e intensidad' },
    { id: 'envio', label: 'Estado de mi Pedido', desc: 'Seguimiento de despacho y número de guía' },
    { id: 'garantia', label: 'Garantías y Cambios', desc: '6 meses de soporte técnico directo' },
    { id: 'anonimo', label: 'Consulta 100% Anónima', desc: 'Resuelve dudas íntimas con total libertad' }
  ];

  const faqs = [
    {
      pregunta: '¿Cómo aparece el cobro en mi extracto bancario o tarjeta de crédito?',
      respuesta: 'Por tu seguridad y privacidad absoluta, la transacción se procesa bajo un nombre comercial neutro de servicios tecnológicos generales, sin ninguna mención a Toy Store ni a artículos para adultos.'
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
      respuesta: 'Sí. Nuestro equipo te atiende con calidez, paciencia y sin prejuicios. Te recomendamos la ergonomía, tipo de estímulo (ondas sónicas o vibración) y lubricantes idóneos para una experiencia inolvidable.'
    }
  ];

  return (
    <RoomWrapper 
      theme="buzz" 
      wallpaperContent={<AndyCloudsWallpaper />}
    >
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 md:px-8 pt-6 sm:pt-10 pb-20 font-fredoka select-none">
        
        {/* =========================================================================
            TERMINAL PRINCIPAL DE COMUNICACIÓN (COMANDO ESTELAR / BUZZ LIGHTYEAR)
            Diseño de consola aeroespacial con esquinas suaves, bisel lila y fondo glass
            ========================================================================= */}
        <div className="bg-white/95 backdrop-blur-md rounded-[2.5rem] shadow-[0_25px_70px_rgba(139,92,246,0.18)] border-2 border-purple-200/80 p-5 sm:p-8 md:p-12 animate-in fade-in zoom-in-95 duration-300">
          
          {/* CABECERA HERO: COMANDO ESTELAR */}
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-50 border border-purple-200 text-purple-700 text-xs font-black tracking-widest uppercase mb-4 shadow-2xs">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
              <span>COMANDO ESTELAR • CANAL DE ENLACE DIRECTO</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#1e3a8a] tracking-tight uppercase leading-tight mb-3">
              Estamos aquí para acompañarte
            </h1>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
              Al infinito y más allá de los tabúes. Resuelve tus dudas sobre juguetes íntimos, entregas 100% ciegas y garantías con total confidencialidad y empatía.
            </p>
          </div>

          {/* =========================================================================
              3 CANALES RÁPIDOS DE ENLACE DIRECTO (TARJETAS AEROESPACIALES)
              ========================================================================= */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-12 sm:mb-16">
            
            {/* Canal 1: WhatsApp Inmediato */}
            <div className="bg-gradient-to-b from-purple-50/60 via-white to-purple-50/30 p-6 rounded-3xl border-2 border-purple-100 hover:border-purple-300 shadow-sm transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center mb-4 border border-purple-200 shadow-inner group-hover:scale-105 transition-transform">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700">Online</span>
                  <span className="text-[11px] font-black text-slate-400 uppercase tracking-wide">Respuesta &lt; 5 min</span>
                </div>
                <h3 className="font-black text-[#1e3a8a] text-lg uppercase tracking-wide mb-2">Asesoría WhatsApp</h3>
                <p className="text-slate-600 text-xs leading-relaxed mb-5">
                  Atención personalizada e inmediata para recomendarte la intensidad, tamaño y textura ideal para ti o para tu pareja.
                </p>
              </div>
              <a 
                href="https://wa.me/573000000000" 
                target="_blank" 
                rel="noreferrer"
                className="w-full bg-[#8B5CF6] hover:bg-[#7C3AED] text-white font-black py-3 px-4 rounded-2xl text-center text-xs uppercase tracking-wider transition-all duration-200 shadow-md hover:shadow-lg active:scale-95 block cursor-pointer"
              >
                Chatear con Especialista
              </a>
            </div>

            {/* Canal 2: Empaque 100% Ciego & Discreción */}
            <div className="bg-gradient-to-b from-sky-50/60 via-white to-sky-50/30 p-6 rounded-3xl border-2 border-sky-100 hover:border-sky-300 shadow-sm transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-sky-100 text-[#1e3a8a] flex items-center justify-center mb-4 border border-sky-200 shadow-inner group-hover:scale-105 transition-transform">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">Certificado</span>
                  <span className="text-[11px] font-black text-slate-400 uppercase tracking-wide">Nadie sabrá qué es</span>
                </div>
                <h3 className="font-black text-[#1e3a8a] text-lg uppercase tracking-wide mb-2">Empaque 100% Ciego</h3>
                <p className="text-slate-600 text-xs leading-relaxed mb-5">
                  Cajas de cartón lisas sin rótulos exteriores delatadores. Privacidad blindada desde el despacho hasta la puerta de tu casa.
                </p>
              </div>
              <div className="w-full py-3 px-4 rounded-2xl bg-sky-100 text-[#1e3a8a] text-center font-black text-xs uppercase tracking-wider border border-sky-200 shadow-2xs">
                Discreción Garantizada
              </div>
            </div>

            {/* Canal 3: Mesa de Mando Oficial (Email) */}
            <div className="bg-gradient-to-b from-emerald-50/60 via-white to-emerald-50/30 p-6 rounded-3xl border-2 border-emerald-100 hover:border-emerald-300 shadow-sm transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-4 border border-emerald-200 shadow-inner group-hover:scale-105 transition-transform">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700">Oficial</span>
                  <span className="text-[11px] font-black text-slate-400 uppercase tracking-wide">Garantías & Órdenes</span>
                </div>
                <h3 className="font-black text-[#1e3a8a] text-lg uppercase tracking-wide mb-2">Mesa de Ayuda</h3>
                <p className="text-slate-600 text-xs leading-relaxed mb-5">
                  Para cambios de producto, dudas con facturación o compras corporativas con respuesta en menos de 2 horas hábiles.
                </p>
              </div>
              <a 
                href="mailto:toystorexoxo@gmail.com"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-black py-3 px-4 rounded-2xl text-center text-xs uppercase tracking-wider transition-all duration-200 shadow-md hover:shadow-lg active:scale-95 block truncate cursor-pointer"
              >
                toystorexoxo@gmail.com
              </a>
            </div>

          </div>

          {/* =========================================================================
              SECCIÓN PERSONAL: LAS CREADORAS DEL BAÚL • VALERIA & MARIANA
              Con portarretratos Polaroid real y tarjetas de Instagram con códigos QR
              ========================================================================= */}
          <div className="relative w-full rounded-3xl bg-gradient-to-br from-purple-900 via-indigo-950 to-slate-900 text-white p-6 sm:p-8 md:p-10 mb-12 sm:mb-16 shadow-2xl border-2 border-purple-400/30 overflow-hidden">
            
            {/* Resplandor decorativo de fondo */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-purple-500/20 blur-3xl rounded-full pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-pink-500/15 blur-3xl rounded-full pointer-events-none"></div>

            <div className="relative z-10 flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
              
              {/* COLUMNA IZQUIERDA: PORTARRETRATOS POLAROID DE VALERIA Y MARIANA */}
              <div className="flex flex-col items-center shrink-0">
                <div className="relative transition-all duration-300 hover:rotate-0 hover:scale-105 cursor-pointer -rotate-2">
                  
                  {/* Marco Polaroid blanco */}
                  <div className="w-56 sm:w-64 bg-white p-3 pt-3 pb-5 rounded-2xl shadow-[0_20px_45px_rgba(0,0,0,0.6)] border border-slate-100 flex flex-col items-center">
                    
                    {/* Foto real valeyyo.jpeg */}
                    <div className="w-full h-56 sm:h-64 rounded-xl overflow-hidden bg-slate-100 relative shadow-inner">
                      <img 
                        src={valeyyoImg} 
                        alt="Valeria y Mariana - Creadoras de Toy Store"
                        className="w-full h-full object-cover"
                      />
                      {/* Efecto de cristal superior suave */}
                      <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-white/15 opacity-60 pointer-events-none"></div>
                    </div>

                    {/* Texto manuscrito al pie de la Polaroid */}
                    <div className="mt-3 text-center">
                      <p className="text-slate-800 font-black text-sm tracking-wide">
                        Vale & Mariana
                      </p>
                      <p className="text-purple-600 font-bold text-[11px] tracking-wider uppercase">
                        Fundadoras de Toy Store
                      </p>
                    </div>

                  </div>

                </div>
              </div>

              {/* COLUMNA DERECHA: TEXTO MANIFIESTO + 2 TARJETAS QR DE INSTAGRAM */}
              <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left">
                
                <span className="inline-block px-3.5 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-400/30 text-[11px] font-black tracking-widest uppercase mb-3">
                  EL CORAZÓN DETRÁS DEL PROYECTO
                </span>

                <h2 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight leading-snug mb-3">
                  Conoce a las Creadoras del Baúl
                </h2>

                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-6 max-w-xl">
                  Toy Store nació de nuestra complicidad y de una convicción compartida: el placer, el bienestar y la exploración íntima merecen vivirse sin prejuicios, con diseño impecable, seguridad médica y total naturalidad. ¡Gracias por confiar en nosotras para ser parte de tu viaje!
                </p>

                {/* LAS 2 TARJETAS CON CÓDIGOS QR DE INSTAGRAM */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-md">
                  
                  {/* Tarjeta Instagram: Valeria */}
                  <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 flex flex-col items-center text-center hover:bg-white/15 transition-all duration-200 group">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-5 h-5 rounded-md bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 flex items-center justify-center p-0.5">
                        <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                        </svg>
                      </div>
                      <span className="text-xs font-black uppercase tracking-wider text-white">Valeria</span>
                    </div>

                    {/* Código QR escaneable en blanco */}
                    <div className="w-28 h-28 bg-white p-2 rounded-xl shadow-md my-2 flex items-center justify-center overflow-hidden">
                      <img 
                        src="https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=https://instagram.com/valeria&color=7C3AED&bgcolor=FFFFFF"
                        alt="Código QR Instagram Valeria"
                        className="w-full h-full object-contain"
                      />
                    </div>

                    <a
                      href="https://instagram.com" 
                      target="_blank" 
                      rel="noreferrer"
                      className="mt-1 text-[11px] font-black text-purple-300 hover:text-white transition flex items-center gap-1 uppercase tracking-wider"
                    >
                      <span>Ver Instagram</span>
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
                    </a>
                  </div>

                  {/* Tarjeta Instagram: Mariana */}
                  <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 flex flex-col items-center text-center hover:bg-white/15 transition-all duration-200 group">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-5 h-5 rounded-md bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 flex items-center justify-center p-0.5">
                        <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                        </svg>
                      </div>
                      <span className="text-xs font-black uppercase tracking-wider text-white">Mariana</span>
                    </div>

                    {/* Código QR escaneable en blanco */}
                    <div className="w-28 h-28 bg-white p-2 rounded-xl shadow-md my-2 flex items-center justify-center overflow-hidden">
                      <img 
                        src="https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=https://instagram.com/mariana&color=7C3AED&bgcolor=FFFFFF"
                        alt="Código QR Instagram Mariana"
                        className="w-full h-full object-contain"
                      />
                    </div>

                    <a 
                      href="https://instagram.com" 
                      target="_blank" 
                      rel="noreferrer"
                      className="mt-1 text-[11px] font-black text-purple-300 hover:text-white transition flex items-center gap-1 uppercase tracking-wider"
                    >
                      <span>Ver Instagram</span>
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
                    </a>
                  </div>

                </div>

                <p className="text-[11px] text-slate-400 mt-4 tracking-wider uppercase font-medium">
                  Escanea el código QR desde tu celular o toca el enlace para seguirnos.
                </p>

              </div>

            </div>

          </div>

          {/* =========================================================================
              FORMULARIO CONFIDENCIAL: CONSOLA DE TRANSMISIÓN DE MENSAJES
              ========================================================================= */}
          <div className="bg-slate-50/90 rounded-3xl p-6 sm:p-8 md:p-10 border-2 border-slate-200/80 mb-12 shadow-sm">
            
            <div className="max-w-xl mb-6">
              <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full bg-purple-100 text-purple-700 border border-purple-200 inline-block mb-2">
                MENSAJERÍA PRIVADA
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#1e3a8a] uppercase tracking-tight mb-2">
                Envíanos un mensaje confidencial
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 font-medium">
                Selecciona el motivo de tu consulta y te responderemos con prioridad, respeto absoluto y cero prejuicios.
              </p>
            </div>

            {enviado ? (
              <div className="bg-emerald-50 border-2 border-emerald-300 rounded-3xl p-8 text-center animate-in zoom-in duration-300">
                <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-4 text-emerald-600 shadow-inner">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
                </div>
                <h3 className="font-black text-[#1e3a8a] text-xl uppercase tracking-wide mb-2">¡Mensaje Transmitido con Éxito!</h3>
                <p className="text-slate-600 text-xs sm:text-sm max-w-md mx-auto mb-6 leading-relaxed">
                  Tu consulta ha sido cifrada y almacenada de forma segura. Uno de nuestros asesores responderá a tu correo en menos de 2 horas hábiles.
                </p>
                <button 
                  onClick={() => setEnviado(false)}
                  className="bg-[#1e3a8a] hover:bg-blue-900 text-white font-black py-3 px-6 rounded-2xl text-xs uppercase tracking-wider transition cursor-pointer shadow-md"
                >
                  Enviar otro mensaje
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Selector de motivo en pastillas táctiles interactivas */}
                <div>
                  <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-2.5">
                    Motivo de tu consulta:
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {motivos.map((m) => (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => setMotivo(m.id)}
                        className={`p-3.5 rounded-2xl text-left transition-all border-2 flex flex-col justify-center cursor-pointer ${
                          motivo === m.id
                            ? 'bg-purple-600 text-white border-purple-700 shadow-md scale-[1.01]'
                            : 'bg-white text-slate-800 border-slate-200 hover:border-purple-300 hover:bg-purple-50/30'
                        }`}
                      >
                        <span className="font-black text-xs uppercase tracking-wider">
                          {m.label}
                        </span>
                        <span className={`text-[11px] mt-0.5 ${motivo === m.id ? 'text-purple-100' : 'text-slate-500'}`}>
                          {m.desc}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-1.5">
                      Nombre o Alias (Opcional)
                    </label>
                    <input 
                      type="text" 
                      placeholder="Puedes usar tu nombre o un alias"
                      value={formData.alias}
                      onChange={(e) => setFormData({ ...formData, alias: e.target.value })}
                      className="w-full bg-white border-2 border-slate-200 rounded-2xl px-4 py-3 text-xs sm:text-sm focus:outline-none focus:border-purple-600 transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-1.5">
                      Correo Electrónico (Para tu respuesta)
                    </label>
                    <input 
                      type="email" 
                      required
                      placeholder="tucorreo@ejemplo.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-white border-2 border-slate-200 rounded-2xl px-4 py-3 text-xs sm:text-sm focus:outline-none focus:border-purple-600 transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-1.5">
                    Teléfono o WhatsApp (Opcional)
                  </label>
                  <input 
                    type="tel" 
                    placeholder="Solo si prefieres que te contactemos por WhatsApp"
                    value={formData.telefono}
                    onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                    className="w-full bg-white border-2 border-slate-200 rounded-2xl px-4 py-3 text-xs sm:text-sm focus:outline-none focus:border-purple-600 transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-1.5">
                    Tu Mensaje o Pregunta
                  </label>
                  <textarea 
                    rows={4}
                    required
                    placeholder="Escribe tu consulta con tranquilidad, todo lo que nos compartas es 100% privado y confidencial..."
                    value={formData.mensaje}
                    onChange={(e) => setFormData({ ...formData, mensaje: e.target.value })}
                    className="w-full bg-white border-2 border-slate-200 rounded-2xl p-4 text-xs sm:text-sm focus:outline-none focus:border-purple-600 transition resize-none"
                  ></textarea>
                </div>

                <div className="flex items-start gap-2.5 bg-white p-3.5 rounded-2xl border border-slate-200">
                  <input 
                    type="checkbox" 
                    id="confidencialidad"
                    checked={formData.confidencial}
                    onChange={(e) => setFormData({ ...formData, confidencial: e.target.checked })}
                    className="w-4 h-4 mt-0.5 rounded text-purple-600 focus:ring-purple-300 cursor-pointer"
                  />
                  <label htmlFor="confidencialidad" className="text-xs text-slate-600 font-medium cursor-pointer leading-snug">
                    Acepto que mis datos sean tratados bajo estricta confidencialidad exclusivamente para responder esta consulta íntima.
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto bg-[#8B5CF6] hover:bg-[#7C3AED] text-white font-black px-10 py-4 rounded-2xl text-xs uppercase tracking-widest transition-all shadow-md hover:shadow-xl active:scale-95 cursor-pointer block"
                >
                  Transmitir Mensaje al Comando
                </button>
              </form>
            )}
          </div>

          {/* =========================================================================
              ACORDEÓN DE PREGUNTAS FRECUENTES (SEGURIDAD, PAGOS Y DISCRECIÓN)
              ========================================================================= */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2.5 h-2.5 rounded-full bg-purple-500"></span>
              <h3 className="text-xl sm:text-2xl font-black text-[#1e3a8a] uppercase tracking-tight">
                Preguntas Frecuentes sobre Privacidad & Envíos
              </h3>
            </div>

            <div className="space-y-3">
              {faqs.map((faq, index) => (
                <div key={index} className="border-2 border-slate-200 rounded-2xl overflow-hidden bg-white shadow-2xs">
                  <button
                    onClick={() => setFaqActiva(faqActiva === index ? null : index)}
                    className="w-full text-left px-5 py-4 flex items-center justify-between font-black text-slate-800 text-xs sm:text-sm uppercase tracking-wide hover:bg-purple-50/40 transition cursor-pointer"
                  >
                    <span>{faq.pregunta}</span>
                    <span className="text-purple-600 text-xl font-black ml-4 shrink-0">
                      {faqActiva === index ? '−' : '+'}
                    </span>
                  </button>
                  {faqActiva === index && (
                    <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3.5 bg-slate-50/50">
                      {faq.respuesta}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </RoomWrapper>
  );
}
