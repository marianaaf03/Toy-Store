import React, { useState } from 'react';
import RoomWrapper from '../components/RoomWrapper';
import AndyCloudsWallpaper from '../components/AndyCloudsWallpaper';
import valeyyoImg from '../assets/valeyyo.jpeg';

/**
 * Perno / Tornillo Allen de Nave Espacial
 * Réplica con relieves metálicos, biseles y dado hexagonal interior
 */
function SpaceBolt({ className = "" }) {
  return (
    <div className={`relative w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-slate-200 via-slate-400 to-slate-600 p-[3px] shadow-[0_4px_8px_rgba(0,0,0,0.35),inset_0_1.5px_2px_rgba(255,255,255,0.9)] flex items-center justify-center shrink-0 pointer-events-none select-none ${className}`}>
      {/* Anillo de avellanado metálico */}
      <div className="w-full h-full rounded-full bg-gradient-to-br from-slate-300 via-slate-200 to-slate-400 p-[3px] shadow-[inset_0_2px_4px_rgba(0,0,0,0.4)] flex items-center justify-center">
        {/* Hueco hexagonal Allen */}
        <div className="w-full h-full rounded-full bg-gradient-to-b from-slate-800 to-slate-950 flex items-center justify-center shadow-inner">
          <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-300">
            <polygon points="12,2 20.66,7 20.66,17 12,22 3.34,17 3.34,7" fill="#0f172a" stroke="#475569" strokeWidth="1.5" />
            <polygon points="12,4 18.9,8 18.9,16 12,20 5.1,16 5.1,8" fill="#1e293b" />
          </svg>
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
      hideFloorToys={true}
    >
      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 md:px-8 pt-10 sm:pt-14 md:pt-16 pb-24 font-fredoka select-none">
        
        {/* =========================================================================
            1. TARJETA SUPERIOR: PLACA METÁLICA ESPACIAL CON PERNOS ALLEN
            Dividida en 2 Columnas: Canales Directos (Blanco) • Consola de Contacto (Gris)
            ========================================================================= */}
        <div className="w-full bg-gradient-to-b from-[#f8fafc] via-[#f1f5f9] to-[#e2e8f0] rounded-[2.5rem] sm:rounded-[3rem] p-3 sm:p-4 shadow-[0_25px_60px_rgba(15,23,42,0.35),inset_0_2px_4px_rgba(255,255,255,0.9),inset_0_-3px_6px_rgba(0,0,0,0.15)] border-4 sm:border-[5px] border-slate-300/90 relative z-10">
          
          {/* Tornillos Allen en las 4 esquinas exteriores */}
          <SpaceBolt className="absolute top-4 left-4 sm:top-5 sm:left-5 z-30" />
          <SpaceBolt className="absolute top-4 right-4 sm:top-5 sm:right-5 z-30" />
          <SpaceBolt className="absolute bottom-4 left-4 sm:bottom-5 sm:left-5 z-30" />
          <SpaceBolt className="absolute bottom-4 right-4 sm:bottom-5 sm:right-5 z-30" />

          {/* Ranura y contenido interior */}
          <div className="w-full bg-white rounded-[2rem] sm:rounded-[2.4rem] border-2 border-slate-300/80 shadow-[inset_0_2px_6px_rgba(0,0,0,0.08)] overflow-hidden grid grid-cols-1 md:grid-cols-12 relative z-20">
            
            {/* LADO IZQUIERDO: INFORMACIÓN DE CONTACTO (3 CANALES AMPLIOS Y ESPACIADOS) */}
            <div className="md:col-span-5 p-6 sm:p-10 md:p-12 flex flex-col justify-center bg-white">
              <div className="space-y-8 sm:space-y-10 py-3 sm:py-6">
                
                {/* 1. TELÉFONO */}
                <div className="flex items-start gap-4 sm:gap-5 group">
                  <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-purple-50 border-2 border-purple-200 text-purple-600 flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 group-hover:bg-purple-100 transition-all">
                    <svg className="w-6 h-6 sm:w-7 sm:h-7 fill-current" viewBox="0 0 24 24">
                      <path d="M20 15.5c-1.2 0-2.4-.2-3.6-.6-.3-.1-.7 0-1 .2l-2.2 2.2c-2.8-1.4-5.1-3.8-6.6-6.6l2.2-2.2c.3-.3.4-.7.2-1-.4-1.1-.6-2.3-.6-3.5 0-.6-.4-1-1-1H4c-.6 0-1 .4-1 1 0 9.4 7.6 17 17 17 .6 0 1-.4 1-1v-3.5c0-.6-.4-1-1-1zM19 12h2c0-4.9-4-9-9-9v2c3.9 0 7 3.1 7 7zm-4 0h2c0-2.8-2.2-5-5-5v2c1.7 0 3 1.3 3 3z"/>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-black text-xs sm:text-sm uppercase tracking-wider text-slate-800 mb-1">
                      TELÉFONO
                    </h4>
                    <p className="text-slate-700 text-sm sm:text-base font-bold">
                      +57 (300) 000-0000
                    </p>
                    <span className="text-[11px] sm:text-xs text-purple-600 font-semibold block mt-0.5">
                      Línea de atención telefónica directa
                    </span>
                  </div>
                </div>

                {/* 2. GMAIL / CORREO */}
                <div className="flex items-start gap-4 sm:gap-5 group">
                  <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-purple-50 border-2 border-purple-200 text-purple-600 flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 group-hover:bg-purple-100 transition-all">
                    <svg className="w-6 h-6 sm:w-7 sm:h-7 fill-current" viewBox="0 0 24 24">
                      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-black text-xs sm:text-sm uppercase tracking-wider text-slate-800 mb-1">
                      CORREO ELECTRÓNICO (GMAIL)
                    </h4>
                    <a href="mailto:toystore.oficial@gmail.com" className="text-slate-700 hover:text-purple-700 text-sm sm:text-base font-bold break-all transition">
                      toystore.oficial@gmail.com
                    </a>
                    <span className="text-[11px] sm:text-xs text-purple-600 font-semibold block mt-0.5">
                      Consultas formales y pedidos especiales
                    </span>
                  </div>
                </div>

                {/* 3. WHATSAPP */}
                <div className="flex items-start gap-4 sm:gap-5 group">
                  <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-purple-50 border-2 border-purple-200 text-purple-600 flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 group-hover:bg-purple-100 transition-all">
                    <svg className="w-6 h-6 sm:w-7 sm:h-7 fill-current" viewBox="0 0 24 24">
                      <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0012.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.41a8.175 8.175 0 012.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.42 0-2.82-.37-4.06-1.07l-.29-.17-3.12.82.83-3.04-.19-.3a8.216 8.216 0 01-1.26-4.47c0-4.54 3.7-8.24 8.24-8.24m4.52 11.5c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.02-1.25-.75-.67-1.26-1.5-1.41-1.75-.15-.25-.02-.39.11-.51.11-.11.25-.29.38-.44.13-.14.17-.25.25-.42.08-.17.04-.31-.02-.44s-.56-1.36-.77-1.86c-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.13.17 1.78 2.72 4.31 3.81.6.26 1.07.42 1.44.54.61.19 1.16.17 1.6.1.49-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.06-.1-.23-.17-.48-.29z"/>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-black text-xs sm:text-sm uppercase tracking-wider text-slate-800 mb-1">
                      WHATSAPP DIRECTO
                    </h4>
                    <a href="https://wa.me/573000000000" target="_blank" rel="noreferrer" className="text-slate-700 hover:text-purple-700 text-sm sm:text-base font-bold transition">
                      +57 300 000-0000
                    </a>
                    <span className="text-[11px] sm:text-xs text-purple-600 font-semibold block mt-0.5">
                      Atención 1 a 1 inmediata y 100% privada
                    </span>
                  </div>
                </div>

              </div>
            </div>

            {/* LADO DERECHO: FORMULARIO "CONTÁCTENOS" (ESTILO CONSOLA GRIS CON BOTÓN MORADO) */}
            <div className="md:col-span-7 bg-[#f8fafc] p-6 sm:p-10 md:p-12 border-t md:border-t-0 md:border-l-2 border-slate-200 flex flex-col justify-center">
              <div className="text-center mb-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100/80 text-purple-700 border border-purple-200 text-[11px] font-black tracking-wider uppercase mb-2">
                  <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></span>
                  <span>ENLACE SEGURO & PRIVADO</span>
                </div>
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
                    className="bg-[#8B5CF6] hover:bg-[#7C3AED] text-white font-black py-2.5 px-6 rounded-xl text-xs uppercase tracking-wider transition active:scale-95 cursor-pointer shadow-xs"
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
                      className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-400/25 transition shadow-2xs font-medium"
                    />
                  </div>

                  <div>
                    <input 
                      type="email"
                      required
                      placeholder="Enter a valid email address"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-400/25 transition shadow-2xs font-medium"
                    />
                  </div>

                  <div>
                    <textarea 
                      rows={4}
                      required
                      placeholder="Escribe tu mensaje o consulta íntima confidencial..."
                      value={formData.mensaje}
                      onChange={(e) => setFormData({ ...formData, mensaje: e.target.value })}
                      className="w-full bg-white border border-slate-300 rounded-xl p-4 text-xs sm:text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-400/25 transition resize-none shadow-2xs font-medium"
                    ></textarea>
                  </div>

                  <div className="flex items-start gap-2 bg-white/80 p-2.5 rounded-xl border border-slate-200">
                    <input 
                      type="checkbox" 
                      id="confidencialidad"
                      checked={formData.confidencial}
                      onChange={(e) => setFormData({ ...formData, confidencial: e.target.checked })}
                      className="w-4 h-4 mt-0.5 rounded text-purple-600 focus:ring-purple-400 cursor-pointer"
                    />
                    <label htmlFor="confidencialidad" className="text-[11px] text-slate-600 font-medium cursor-pointer leading-tight">
                      Acepto que mis datos sean tratados bajo estricta confidencialidad para responder mi consulta.
                    </label>
                  </div>

                  <button 
                    type="submit"
                    className="w-full bg-[#8B5CF6] hover:bg-[#7C3AED] text-white font-black py-4 rounded-full text-xs sm:text-sm uppercase tracking-wider transition-all shadow-[0_10px_25px_rgba(139,92,246,0.35)] hover:shadow-[0_14px_30px_rgba(139,92,246,0.45)] active:scale-95 cursor-pointer block"
                  >
                    ENVIAR
                  </button>
                </form>
              )}
            </div>

          </div>

        </div>

        {/* =========================================================================
            2. CUERDITAS MECÁNICAS / CABLES DE COMANDO CONECTORES
            Unen visualmente la placa superior con la placa inferior de creadoras y QRs
            ========================================================================= */}
        <div className="w-full flex justify-around items-center px-14 sm:px-32 -my-2 sm:-my-3 relative z-30 pointer-events-none">
          
          {/* Cable Mecánico Izquierdo */}
          <div className="flex flex-col items-center">
            {/* Brida de anclaje superior */}
            <div className="w-8 sm:w-10 h-4 bg-gradient-to-b from-slate-300 via-slate-500 to-slate-700 rounded-t-lg border border-slate-600 shadow-md flex items-center justify-center">
              <div className="w-4 h-1 bg-slate-200 rounded-full shadow-inner"></div>
            </div>
            {/* Conducto industrial corrugado */}
            <div className="w-3.5 sm:w-4 h-12 sm:h-16 bg-gradient-to-r from-slate-700 via-slate-900 to-slate-700 border-x border-slate-600 shadow-lg flex flex-col justify-between py-1">
              <div className="w-full h-1 bg-slate-400/50"></div>
              <div className="w-full h-1 bg-slate-400/50"></div>
              <div className="w-full h-1 bg-slate-400/50"></div>
              <div className="w-full h-1 bg-slate-400/50"></div>
            </div>
            {/* Brida de anclaje inferior */}
            <div className="w-8 sm:w-10 h-4 bg-gradient-to-b from-slate-700 via-slate-500 to-slate-300 rounded-b-lg border border-slate-600 shadow-md flex items-center justify-center">
              <div className="w-4 h-1 bg-slate-200 rounded-full shadow-inner"></div>
            </div>
          </div>

          {/* Cable Mecánico Derecho */}
          <div className="flex flex-col items-center">
            {/* Brida de anclaje superior */}
            <div className="w-8 sm:w-10 h-4 bg-gradient-to-b from-slate-300 via-slate-500 to-slate-700 rounded-t-lg border border-slate-600 shadow-md flex items-center justify-center">
              <div className="w-4 h-1 bg-slate-200 rounded-full shadow-inner"></div>
            </div>
            {/* Conducto industrial corrugado */}
            <div className="w-3.5 sm:w-4 h-12 sm:h-16 bg-gradient-to-r from-slate-700 via-slate-900 to-slate-700 border-x border-slate-600 shadow-lg flex flex-col justify-between py-1">
              <div className="w-full h-1 bg-slate-400/50"></div>
              <div className="w-full h-1 bg-slate-400/50"></div>
              <div className="w-full h-1 bg-slate-400/50"></div>
              <div className="w-full h-1 bg-slate-400/50"></div>
            </div>
            {/* Brida de anclaje inferior */}
            <div className="w-8 sm:w-10 h-4 bg-gradient-to-b from-slate-700 via-slate-500 to-slate-300 rounded-b-lg border border-slate-600 shadow-md flex items-center justify-center">
              <div className="w-4 h-1 bg-slate-200 rounded-full shadow-inner"></div>
            </div>
          </div>

        </div>

        {/* =========================================================================
            3. TARJETA INFERIOR: PLACA METÁLICA DE CREADORAS & CÓDIGOS QR INSTAGRAM
            Con pernos Allen, relieve de nave y conexión mecánica
            ========================================================================= */}
        <div className="w-full bg-gradient-to-b from-[#f8fafc] via-[#f1f5f9] to-[#e2e8f0] rounded-[2.5rem] sm:rounded-[3rem] p-3 sm:p-4 shadow-[0_25px_60px_rgba(15,23,42,0.35),inset_0_2px_4px_rgba(255,255,255,0.9),inset_0_-3px_6px_rgba(0,0,0,0.15)] border-4 sm:border-[5px] border-slate-300/90 relative z-10 mb-12 sm:mb-16">
          
          {/* Tornillos Allen en las 4 esquinas exteriores */}
          <SpaceBolt className="absolute top-4 left-4 sm:top-5 sm:left-5 z-30" />
          <SpaceBolt className="absolute top-4 right-4 sm:top-5 sm:right-5 z-30" />
          <SpaceBolt className="absolute bottom-4 left-4 sm:bottom-5 sm:left-5 z-30" />
          <SpaceBolt className="absolute bottom-4 right-4 sm:bottom-5 sm:right-5 z-30" />

          {/* Ranura y contenido interior */}
          <div className="w-full bg-white rounded-[2rem] sm:rounded-[2.4rem] border-2 border-slate-300/80 shadow-[inset_0_2px_6px_rgba(0,0,0,0.08)] p-6 sm:p-10 md:p-12 relative z-20">
            
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

                    {/* Texto al pie de la Polaroid */}
                    <div className="mt-3 text-center">
                      <p className="text-slate-800 font-black text-sm tracking-wide">
                        Vale & Mariana
                      </p>
                      <p className="text-purple-700 font-bold text-[11px] tracking-wider uppercase">
                        Fundadoras de Toy Store
                      </p>
                    </div>

                  </div>

                </div>
              </div>

              {/* COLUMNA DERECHA: TEXTO + 2 TARJETAS CON CÓDIGOS QR DE INSTAGRAM */}
              <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left">
                
                <span className="inline-block px-3.5 py-1 rounded-full bg-purple-50 text-purple-700 border border-purple-200 text-[11px] font-black tracking-widest uppercase mb-3 shadow-2xs">
                  EL CORAZÓN DETRÁS DEL PROYECTO
                </span>

                <h2 className="text-2xl sm:text-3xl font-black text-slate-800 uppercase tracking-tight leading-snug mb-2">
                  Conoce a las Creadoras del Baúl
                </h2>

                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-6 max-w-xl font-medium">
                  Toy Store nació de nuestra complicidad y de una convicción compartida: el placer y el bienestar íntimo merecen vivirse sin prejuicios, con diseño impecable, seguridad y total naturalidad. ¡Escanea o toca nuestros códigos para conectar con nosotras en Instagram!
                </p>

                {/* LAS 2 TARJETAS CON CÓDIGOS QR DE INSTAGRAM */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-md">
                  
                  {/* Tarjeta Instagram: Valeria */}
                  <div className="bg-slate-50/80 rounded-2xl p-4 border-2 border-slate-200 flex flex-col items-center text-center hover:border-purple-300 hover:bg-white transition-all duration-200 group shadow-xs">
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
                        src="https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=https://instagram.com/valeria&color=7C3AED&bgcolor=FFFFFF"
                        alt="Código QR Instagram Valeria"
                        className="w-full h-full object-contain"
                      />
                    </div>

                    <a 
                      href="https://instagram.com" 
                      target="_blank" 
                      rel="noreferrer"
                      className="mt-1 text-[11px] font-black text-purple-700 hover:text-purple-900 flex items-center gap-1 uppercase tracking-wider cursor-pointer"
                    >
                      <span>Ver Instagram</span>
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
                    </a>
                  </div>

                  {/* Tarjeta Instagram: Mariana */}
                  <div className="bg-slate-50/80 rounded-2xl p-4 border-2 border-slate-200 flex flex-col items-center text-center hover:border-purple-300 hover:bg-white transition-all duration-200 group shadow-xs">
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
                        src="https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=https://instagram.com/mariana&color=7C3AED&bgcolor=FFFFFF"
                        alt="Código QR Instagram Mariana"
                        className="w-full h-full object-contain"
                      />
                    </div>

                    <a 
                      href="https://instagram.com" 
                      target="_blank" 
                      rel="noreferrer"
                      className="mt-1 text-[11px] font-black text-purple-700 hover:text-purple-900 flex items-center gap-1 uppercase tracking-wider cursor-pointer"
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

        </div>

        {/* =========================================================================
            4. BANCO DE PREGUNTAS FRECUENTES (SEGURIDAD, PAGOS Y DISCRECIÓN)
            ========================================================================= */}
        <div className="w-full max-w-4xl mx-auto">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-2.5 h-2.5 rounded-full bg-purple-600"></span>
            <h3 className="text-xl sm:text-2xl font-black text-slate-800 uppercase tracking-tight">
              Preguntas Frecuentes sobre Privacidad & Envíos
            </h3>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div key={index} className="border-2 border-slate-200 hover:border-purple-200 rounded-2xl overflow-hidden bg-white shadow-2xs transition-colors">
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
