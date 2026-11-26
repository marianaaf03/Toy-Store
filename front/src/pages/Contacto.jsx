import React, { useState } from 'react';
import RoomWrapper from '../components/RoomWrapper';
import AndyCloudsWallpaper from '../components/AndyCloudsWallpaper';
import valeyyoImg from '../assets/valeyyo.jpeg';

export default function Contacto() {
  const [formData, setFormData] = useState({
    alias: '',
    email: '',
    mensaje: '',
    confidencial: true
  });
  const [enviado, setEnviado] = useState(false);
  const [faqActiva, setFaqActiva] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setEnviado(true);
    setTimeout(() => {
      setFormData({ alias: '', email: '', mensaje: '', confidencial: true });
    }, 400);
  };

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
      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 md:px-8 pt-6 sm:pt-10 pb-24 font-fredoka select-none">
        
        {/* =========================================================================
            CABECERA PRINCIPAL: COMANDO ESTELAR
            ========================================================================= */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 border-2 border-[#a6d4f2] text-[#1e3a8a] text-xs font-black tracking-widest uppercase mb-3 shadow-xs">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
            <span>CENTRO DE COMANDO & ENLACE DIRECTO</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#1e3a8a] tracking-tight uppercase leading-tight mb-3">
            Estamos aquí para acompañarte
          </h1>
          <p className="text-slate-600 text-xs sm:text-sm md:text-base leading-relaxed font-medium">
            Al infinito y más allá de los tabúes. Resuelve tus dudas sobre juguetes íntimos, entregas 100% ciegas y garantías con total confidencialidad y empatía.
          </p>
        </div>

        {/* =========================================================================
            1. TARJETA SUPERIOR: TARJETA DE CONTACTO (DIVIDIDA EN 2 COLUMNAS)
            Columna Izquierda: Información (Blanco) • Columna Derecha: Formulario (Gris)
            ========================================================================= */}
        <div className="w-full bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(30,58,138,0.15)] border-4 border-[#a6d4f2] overflow-hidden grid grid-cols-1 md:grid-cols-12 relative z-10">
          
          {/* LADO IZQUIERDO: INFORMACIÓN DE CONTACTO (FONDO BLANCO) */}
          <div className="md:col-span-5 p-6 sm:p-10 flex flex-col justify-between space-y-8 bg-white">
            <div className="space-y-7">
              
              {/* 1. LLÁMENOS */}
              <div className="flex items-start gap-4 group">
                <div className="w-12 h-12 rounded-2xl bg-orange-50 border-2 border-orange-200 text-orange-500 flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
                  <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                    <path d="M20 15.5c-1.2 0-2.4-.2-3.6-.6-.3-.1-.7 0-1 .2l-2.2 2.2c-2.8-1.4-5.1-3.8-6.6-6.6l2.2-2.2c.3-.3.4-.7.2-1-.4-1.1-.6-2.3-.6-3.5 0-.6-.4-1-1-1H4c-.6 0-1 .4-1 1 0 9.4 7.6 17 17 17 .6 0 1-.4 1-1v-3.5c0-.6-.4-1-1-1zM19 12h2c0-4.9-4-9-9-9v2c3.9 0 7 3.1 7 7zm-4 0h2c0-2.8-2.2-5-5-5v2c1.7 0 3 1.3 3 3z"/>
                  </svg>
                </div>
                <div>
                  <h4 className="font-black text-sm uppercase tracking-wider text-slate-800 mb-1">
                    LLÁMENOS O ESCRÍBENOS
                  </h4>
                  <p className="text-slate-600 text-xs sm:text-sm font-medium">
                    +57 (300) 000-0000, +57 (310) 000-0000
                  </p>
                  <span className="text-[11px] text-emerald-600 font-bold block mt-0.5">
                    Asesoría personalizada e inmediata
                  </span>
                </div>
              </div>

              {/* 2. UBICACIÓN */}
              <div className="flex items-start gap-4 group">
                <div className="w-12 h-12 rounded-2xl bg-orange-50 border-2 border-orange-200 text-orange-500 flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
                  <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                  </svg>
                </div>
                <div>
                  <h4 className="font-black text-sm uppercase tracking-wider text-slate-800 mb-1">
                    UBICACIÓN & DESPACHOS
                  </h4>
                  <p className="text-slate-600 text-xs sm:text-sm font-medium leading-snug">
                    Despachos a todo el país • Empaque 100% Ciego y neutro sin marcas delatadoras
                  </p>
                  <span className="text-[11px] text-sky-600 font-bold block mt-0.5">
                    Privacidad garantizada desde la bodega
                  </span>
                </div>
              </div>

              {/* 3. HORAS DE TRABAJO */}
              <div className="flex items-start gap-4 group">
                <div className="w-12 h-12 rounded-2xl bg-orange-50 border-2 border-orange-200 text-orange-500 flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
                  <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                    <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
                  </svg>
                </div>
                <div>
                  <h4 className="font-black text-sm uppercase tracking-wider text-slate-800 mb-1">
                    HORAS DE TRABAJO
                  </h4>
                  <p className="text-slate-600 text-xs sm:text-sm font-medium">
                    Lun – Vie ...... 9:00 am – 8:00 pm
                  </p>
                  <p className="text-slate-600 text-xs sm:text-sm font-medium">
                    Sáb, Dom ...... 10:00 am – 6:00 pm
                  </p>
                </div>
              </div>

            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center gap-2 text-slate-400 text-[11px] uppercase tracking-wider font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Canales oficiales en vivo • Toy Store</span>
            </div>
          </div>

          {/* LADO DERECHO: FORMULARIO "CONTÁCTENOS" (FONDO GRIS CLARO CONSOLA) */}
          <div className="md:col-span-7 bg-[#f1f5f9] p-6 sm:p-10 border-t md:border-t-0 md:border-l-2 border-slate-200 flex flex-col justify-center">
            <div className="text-center mb-6">
              <h3 className="text-2xl sm:text-3xl font-black text-slate-800 uppercase tracking-tight">
                CONTÁCTENOS
              </h3>
              <p className="text-slate-500 text-xs sm:text-sm mt-1 font-medium">
                Envíanos tu consulta y te responderemos con total discreción
              </p>
            </div>

            {enviado ? (
              <div className="bg-white border-2 border-emerald-300 rounded-2xl p-6 text-center animate-in zoom-in duration-300 shadow-sm">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
                  </svg>
                </div>
                <h4 className="font-black text-slate-800 text-lg uppercase mb-1">¡Mensaje Transmitido con Éxito!</h4>
                <p className="text-slate-600 text-xs leading-relaxed mb-4">
                  Tu consulta ha sido cifrada y almacenada con seguridad. Te responderemos en menos de 2 horas hábiles.
                </p>
                <button 
                  onClick={() => setEnviado(false)}
                  className="bg-[#a6d4f2] hover:bg-[#8ec2e4] text-[#1e3a8a] font-black py-2.5 px-6 rounded-xl text-xs uppercase tracking-wider transition active:scale-95 cursor-pointer shadow-xs"
                >
                  Enviar otro mensaje
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <input 
                    type="text"
                    required
                    placeholder="Enter your Name"
                    value={formData.alias}
                    onChange={(e) => setFormData({ ...formData, alias: e.target.value })}
                    className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:border-[#a6d4f2] focus:ring-2 focus:ring-[#a6d4f2]/30 transition shadow-2xs font-medium"
                  />
                </div>

                <div>
                  <input 
                    type="email"
                    required
                    placeholder="Enter a valid email address"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:border-[#a6d4f2] focus:ring-2 focus:ring-[#a6d4f2]/30 transition shadow-2xs font-medium"
                  />
                </div>

                <div>
                  <textarea 
                    rows={4}
                    required
                    placeholder="Escribe tu mensaje o consulta íntima confidencial..."
                    value={formData.mensaje}
                    onChange={(e) => setFormData({ ...formData, mensaje: e.target.value })}
                    className="w-full bg-white border border-slate-300 rounded-xl p-4 text-xs sm:text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:border-[#a6d4f2] focus:ring-2 focus:ring-[#a6d4f2]/30 transition resize-none shadow-2xs font-medium"
                  ></textarea>
                </div>

                <div className="flex items-start gap-2 bg-white/80 p-2.5 rounded-xl border border-slate-200">
                  <input 
                    type="checkbox" 
                    id="confidencialidad"
                    checked={formData.confidencial}
                    onChange={(e) => setFormData({ ...formData, confidencial: e.target.checked })}
                    className="w-4 h-4 mt-0.5 rounded text-[#1e3a8a] focus:ring-[#a6d4f2] cursor-pointer"
                  />
                  <label htmlFor="confidencialidad" className="text-[11px] text-slate-600 font-medium cursor-pointer leading-tight">
                    Acepto que mis datos sean tratados bajo estricta confidencialidad para responder mi consulta.
                  </label>
                </div>

                <button 
                  type="submit"
                  className="w-full bg-[#f97316] hover:bg-[#ea580c] text-white font-black py-3.5 rounded-full text-xs sm:text-sm uppercase tracking-wider transition-all shadow-md hover:shadow-lg active:scale-95 cursor-pointer block"
                >
                  ENVIAR
                </button>
              </form>
            )}
          </div>

        </div>

        {/* =========================================================================
            2. CUERDITAS MECÁNICAS / CABLES DE COMANDO CONECTORES
            Unen visualmente la tarjeta de contacto superior con la de creadoras y QRs
            ========================================================================= */}
        <div className="w-full flex justify-around items-center px-12 sm:px-28 -my-2 relative z-20 pointer-events-none">
          
          {/* Cable Mecánico Izquierdo */}
          <div className="flex flex-col items-center">
            {/* Anclaje y tuerca superior */}
            <div className="w-7 sm:w-8 h-3.5 bg-gradient-to-b from-slate-400 to-slate-600 rounded-t-md border border-slate-500 shadow-sm flex items-center justify-center">
              <div className="w-3 h-1 bg-slate-200 rounded-full"></div>
            </div>
            {/* Tubo mecánico corrugado industrial */}
            <div className="w-3 sm:w-3.5 h-12 sm:h-16 bg-gradient-to-r from-slate-700 via-slate-800 to-slate-900 border-x border-slate-600 shadow-md flex flex-col justify-between py-1">
              <div className="w-full h-1 bg-slate-500/70"></div>
              <div className="w-full h-1 bg-slate-500/70"></div>
              <div className="w-full h-1 bg-slate-500/70"></div>
              <div className="w-full h-1 bg-slate-500/70"></div>
            </div>
            {/* Anclaje y tuerca inferior */}
            <div className="w-7 sm:w-8 h-3.5 bg-gradient-to-b from-slate-600 to-slate-400 rounded-b-md border border-slate-500 shadow-sm flex items-center justify-center">
              <div className="w-3 h-1 bg-slate-200 rounded-full"></div>
            </div>
          </div>

          {/* Cable Mecánico Derecho */}
          <div className="flex flex-col items-center">
            {/* Anclaje y tuerca superior */}
            <div className="w-7 sm:w-8 h-3.5 bg-gradient-to-b from-slate-400 to-slate-600 rounded-t-md border border-slate-500 shadow-sm flex items-center justify-center">
              <div className="w-3 h-1 bg-slate-200 rounded-full"></div>
            </div>
            {/* Tubo mecánico corrugado industrial */}
            <div className="w-3 sm:w-3.5 h-12 sm:h-16 bg-gradient-to-r from-slate-700 via-slate-800 to-slate-900 border-x border-slate-600 shadow-md flex flex-col justify-between py-1">
              <div className="w-full h-1 bg-slate-500/70"></div>
              <div className="w-full h-1 bg-slate-500/70"></div>
              <div className="w-full h-1 bg-slate-500/70"></div>
              <div className="w-full h-1 bg-slate-500/70"></div>
            </div>
            {/* Anclaje y tuerca inferior */}
            <div className="w-7 sm:w-8 h-3.5 bg-gradient-to-b from-slate-600 to-slate-400 rounded-b-md border border-slate-500 shadow-sm flex items-center justify-center">
              <div className="w-3 h-1 bg-slate-200 rounded-full"></div>
            </div>
          </div>

        </div>

        {/* =========================================================================
            3. TARJETA INFERIOR: COMANDO DE CREADORAS & CÓDIGOS QR DE INSTAGRAM
            Conectada por las cuerdas mecánicas para mantener el concepto aeroespacial
            ========================================================================= */}
        <div className="w-full bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(30,58,138,0.15)] border-4 border-[#a6d4f2] p-6 sm:p-10 relative overflow-hidden z-10 mb-12 sm:mb-16">
          
          {/* Remaches de consola en las esquinas */}
          <div className="absolute top-4 left-4 w-3.5 h-3.5 rounded-full bg-slate-200 border border-slate-400 shadow-inner flex items-center justify-center">
            <div className="w-2 h-[1px] bg-slate-400 rotate-45"></div>
          </div>
          <div className="absolute top-4 right-4 w-3.5 h-3.5 rounded-full bg-slate-200 border border-slate-400 shadow-inner flex items-center justify-center">
            <div className="w-2 h-[1px] bg-slate-400 -rotate-45"></div>
          </div>
          <div className="absolute bottom-4 left-4 w-3.5 h-3.5 rounded-full bg-slate-200 border border-slate-400 shadow-inner flex items-center justify-center">
            <div className="w-2 h-[1px] bg-slate-400 -rotate-45"></div>
          </div>
          <div className="absolute bottom-4 right-4 w-3.5 h-3.5 rounded-full bg-slate-200 border border-slate-400 shadow-inner flex items-center justify-center">
            <div className="w-2 h-[1px] bg-slate-400 rotate-45"></div>
          </div>

          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
            
            {/* COLUMNA IZQUIERDA: PORTARRETRATOS POLAROID DE VALE & MARIANA */}
            <div className="flex flex-col items-center shrink-0">
              <div className="relative transition-all duration-300 hover:rotate-0 hover:scale-105 cursor-pointer -rotate-2">
                
                {/* Marco Polaroid blanco */}
                <div className="w-56 sm:w-64 bg-white p-3 pt-3 pb-5 rounded-2xl shadow-[0_15px_35px_rgba(30,58,138,0.18)] border-2 border-slate-200 flex flex-col items-center">
                  
                  {/* Foto real valeyyo.jpeg */}
                  <div className="w-full h-56 sm:h-64 rounded-xl overflow-hidden bg-slate-100 relative shadow-inner">
                    <img 
                      src={valeyyoImg} 
                      alt="Valeria y Mariana - Creadoras de Toy Store"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-white/15 opacity-60 pointer-events-none"></div>
                  </div>

                  {/* Texto manuscrito al pie de la Polaroid */}
                  <div className="mt-3 text-center">
                    <p className="text-slate-800 font-black text-sm tracking-wide">
                      Vale & Mariana
                    </p>
                    <p className="text-[#1e3a8a] font-bold text-[11px] tracking-wider uppercase">
                      Fundadoras de Toy Store
                    </p>
                  </div>

                </div>

              </div>
            </div>

            {/* COLUMNA DERECHA: TEXTO + 2 TARJETAS CON CÓDIGOS QR DE INSTAGRAM */}
            <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left">
              
              <span className="inline-block px-3.5 py-1 rounded-full bg-sky-50 text-[#1e3a8a] border border-[#a6d4f2] text-[11px] font-black tracking-widest uppercase mb-3 shadow-2xs">
                EL CORAZÓN DETRÁS DEL PROYECTO
              </span>

              <h2 className="text-2xl sm:text-3xl font-black text-[#1e3a8a] uppercase tracking-tight leading-snug mb-2">
                Conoce a las Creadoras del Baúl
              </h2>

              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-6 max-w-xl font-medium">
                Toy Store nació de nuestra complicidad y de una convicción compartida: el placer y el bienestar íntimo merecen vivirse sin prejuicios, con diseño impecable, seguridad y total naturalidad. ¡Escanea o toca nuestros códigos para conectar con nosotras en Instagram!
              </p>

              {/* LAS 2 TARJETAS CON CÓDIGOS QR DE INSTAGRAM */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-md">
                
                {/* Tarjeta Instagram: Valeria */}
                <div className="bg-slate-50 rounded-2xl p-4 border-2 border-slate-200 flex flex-col items-center text-center hover:border-[#a6d4f2] hover:bg-white transition-all duration-200 group shadow-xs">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-5 h-5 rounded-md bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 flex items-center justify-center p-0.5 shadow-2xs">
                      <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                    </div>
                    <span className="text-xs font-black uppercase tracking-wider text-slate-800">Valeria</span>
                  </div>

                  {/* Código QR escaneable */}
                  <div className="w-28 h-28 bg-white p-2 rounded-xl border border-slate-200 shadow-inner my-2 flex items-center justify-center overflow-hidden">
                    <img 
                      src="https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=https://instagram.com/valeria&color=1E3A8A&bgcolor=FFFFFF"
                      alt="Código QR Instagram Valeria"
                      className="w-full h-full object-contain"
                    />
                  </div>

                  <a 
                    href="https://instagram.com" 
                    target="_blank" 
                    rel="noreferrer"
                    className="mt-1 text-[11px] font-black text-[#1e3a8a] hover:underline flex items-center gap-1 uppercase tracking-wider cursor-pointer"
                  >
                    <span>Ver Instagram</span>
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
                  </a>
                </div>

                {/* Tarjeta Instagram: Mariana */}
                <div className="bg-slate-50 rounded-2xl p-4 border-2 border-slate-200 flex flex-col items-center text-center hover:border-[#a6d4f2] hover:bg-white transition-all duration-200 group shadow-xs">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-5 h-5 rounded-md bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 flex items-center justify-center p-0.5 shadow-2xs">
                      <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                    </div>
                    <span className="text-xs font-black uppercase tracking-wider text-slate-800">Mariana</span>
                  </div>

                  {/* Código QR escaneable */}
                  <div className="w-28 h-28 bg-white p-2 rounded-xl border border-slate-200 shadow-inner my-2 flex items-center justify-center overflow-hidden">
                    <img 
                      src="https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=https://instagram.com/mariana&color=1E3A8A&bgcolor=FFFFFF"
                      alt="Código QR Instagram Mariana"
                      className="w-full h-full object-contain"
                    />
                  </div>

                  <a 
                    href="https://instagram.com" 
                    target="_blank" 
                    rel="noreferrer"
                    className="mt-1 text-[11px] font-black text-[#1e3a8a] hover:underline flex items-center gap-1 uppercase tracking-wider cursor-pointer"
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
            4. BANCO DE PREGUNTAS FRECUENTES (SEGURIDAD, PAGOS Y DISCRECIÓN)
            ========================================================================= */}
        <div className="w-full max-w-4xl mx-auto">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-2.5 h-2.5 rounded-full bg-[#1e3a8a]"></span>
            <h3 className="text-xl sm:text-2xl font-black text-[#1e3a8a] uppercase tracking-tight">
              Preguntas Frecuentes sobre Privacidad & Envíos
            </h3>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div key={index} className="border-2 border-slate-200 rounded-2xl overflow-hidden bg-white shadow-2xs">
                <button
                  onClick={() => setFaqActiva(faqActiva === index ? null : index)}
                  className="w-full text-left px-5 py-4 flex items-center justify-between font-black text-slate-800 text-xs sm:text-sm uppercase tracking-wide hover:bg-sky-50/40 transition cursor-pointer"
                >
                  <span>{faq.pregunta}</span>
                  <span className="text-[#1e3a8a] text-xl font-black ml-4 shrink-0">
                    {faqActiva === index ? '−' : '+'}
                  </span>
                </button>
                {faqActiva === index && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3.5 bg-slate-50/50 font-medium">
                    {faq.respuesta}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </RoomWrapper>
  );
}
