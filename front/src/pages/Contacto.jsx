import React, { useState } from 'react';
import RoomWrapper from '../components/RoomWrapper';
import AndyCloudsWallpaper from '../components/AndyCloudsWallpaper';

/**
 * BuzzSuitBg: Fondo color insignia pastel de Buzz Lightyear (lila aeroespacial / blanco)
 * combinado con los doodles eróticos sutiles (penes y vulvas) de Toy Store.
 */
const BuzzSuitBg = () => (
  <div className="absolute inset-0 bg-gradient-to-b from-[#F8FAFC] via-[#F5F3FF]/70 to-[#EDE9FE]/50 overflow-hidden pointer-events-none">
    <div className="absolute inset-0 opacity-[0.13]">
      <AndyCloudsWallpaper />
    </div>
  </div>
);

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
    { id: 'asesoria', label: 'Asesoría de Juguetes' },
    { id: 'envio', label: 'Estado de mi Pedido' },
    { id: 'garantia', label: 'Garantías y Cambios' },
    { id: 'anonimo', label: 'Consulta Anónima' }
  ];

  const faqs = [
    {
      pregunta: '¿Cómo aparece el cobro en mi extracto bancario o tarjeta?',
      respuesta: 'Por tu seguridad y privacidad absoluta, la transacción se procesa con un nombre comercial neutro de servicios tecnológicos, sin ninguna referencia a Toy Store ni a productos íntimos.'
    },
    {
      pregunta: '¿Cómo viene embalado mi pedido?',
      respuesta: 'Todos los envíos se despachan en cajas de cartón neutras, totalmente selladas con cinta de seguridad opaca, sin logos, imágenes ni descripciones de su contenido exterior.'
    },
    {
      pregunta: '¿Qué garantía tienen los dispositivos electrónicos?',
      respuesta: 'Nuestros juguetes y estimuladores recargables cuentan con 6 meses de garantía directa en batería y motor magnético, garantizando materiales de silicona médica 100% hipoalergénica.'
    },
    {
      pregunta: '¿Ofrecen asesoramiento para personas que compran por primera vez?',
      respuesta: 'Sí. Nuestro equipo de asesoras te guía con calidez y sin prejuicios para recomendarte la ergonomía, intensidad y lubricantes adecuados según tus expectativas.'
    }
  ];

  return (
    <RoomWrapper 
      theme="buzz" 
      fullWallpaper={true} 
      wallpaperContent={<BuzzSuitBg />}
    >
      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 md:px-8 pt-8 pb-16">
        
        {/* CONTENEDOR PRINCIPAL DESTACADO (NO SE OPACA CON EL FONDO) */}
        <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl border border-sky-100 p-6 md:p-12 animate-in fade-in zoom-in-95 duration-300">
          
          {/* CABECERA */}
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="inline-block px-4 py-1.5 rounded-full bg-sky-50 text-[#1e3a8a] text-xs font-black tracking-widest uppercase border border-sky-200 mb-4">
              Línea Directa de Confianza y Soporte
            </span>
            <h1 className="text-3xl md:text-4xl font-black text-[#1e3a8a] tracking-tight mb-4">
              Estamos aquí para acompañarte
            </h1>
            <p className="text-slate-600 text-sm md:text-base leading-relaxed">
              Resuelve tus dudas sobre juguetes, materiales, tiempos de entrega y privacidad con nuestro equipo especializado en bienestar íntimo.
            </p>
          </div>

          {/* 3 TARJETAS DE CANALES RÁPIDOS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            
            {/* Canal 1: WhatsApp */}
            <div className="bg-gradient-to-b from-sky-50/50 to-white p-6 rounded-2xl border-2 border-sky-100 shadow-sm flex flex-col justify-between hover:border-sky-300 transition">
              <div>
                <div className="w-12 h-12 rounded-xl bg-sky-100 text-[#1e3a8a] flex items-center justify-center mb-4">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <h3 className="font-black text-[#1e3a8a] text-lg mb-2">Asesoría por WhatsApp</h3>
                <p className="text-slate-600 text-xs leading-relaxed mb-4">
                  Atención personalizada e inmediata para guiarte en tu elección con máxima discreción.
                </p>
              </div>
              <a 
                href="https://wa.me/573000000000" 
                target="_blank" 
                rel="noreferrer"
                className="w-full bg-[#a6d4f2] hover:bg-[#8ac6ee] text-[#1e3a8a] font-black py-2.5 px-4 rounded-xl text-center text-xs uppercase tracking-wider transition shadow-sm"
              >
                Chatear con Especialista
              </a>
            </div>

            {/* Canal 2: Envíos y Privacidad */}
            <div className="bg-gradient-to-b from-blue-50/50 to-white p-6 rounded-2xl border-2 border-blue-100 shadow-sm flex flex-col justify-between hover:border-blue-300 transition">
              <div>
                <div className="w-12 h-12 rounded-xl bg-blue-100 text-[#1e3a8a] flex items-center justify-center mb-4">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
                <h3 className="font-black text-[#1e3a8a] text-lg mb-2">Empaque 100% Ciego</h3>
                <p className="text-slate-600 text-xs leading-relaxed mb-4">
                  Empaquetado neutro y seguro. Nadie sabrá qué contiene el paquete excepto tú.
                </p>
              </div>
              <div className="w-full py-2.5 px-4 rounded-xl bg-slate-100 text-slate-700 text-center font-bold text-xs uppercase tracking-wider">
                Garantía Certificada
              </div>
            </div>

            {/* Canal 3: Correo de Soporte */}
            <div className="bg-gradient-to-b from-purple-50/50 to-white p-6 rounded-2xl border-2 border-purple-100 shadow-sm flex flex-col justify-between hover:border-purple-300 transition">
              <div>
                <div className="w-12 h-12 rounded-xl bg-purple-100 text-[#1e3a8a] flex items-center justify-center mb-4">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="font-black text-[#1e3a8a] text-lg mb-2">Mesa de Ayuda</h3>
                <p className="text-slate-600 text-xs leading-relaxed mb-4">
                  Para reclamos de garantía técnica, órdenes corporativas y alianzas comerciales.
                </p>
              </div>
              <a 
                href="mailto:toystorexoxo@gmail.com"
                className="w-full bg-slate-50 hover:bg-slate-100 text-[#1e3a8a] border border-slate-200 font-bold py-2.5 px-4 rounded-xl text-center text-xs truncate transition"
              >
                toystorexoxo@gmail.com
              </a>
            </div>

          </div>

          {/* FORMULARIO CONFIDENCIAL */}
          <div className="bg-slate-50/80 rounded-2xl p-6 md:p-8 border border-slate-200 mb-12">
            <div className="max-w-xl mb-6">
              <h2 className="text-xl md:text-2xl font-black text-[#1e3a8a] mb-2">
                Envíanos un mensaje confidencial
              </h2>
              <p className="text-xs md:text-sm text-slate-600">
                Selecciona el motivo de tu consulta y te responderemos con prioridad y discreción.
              </p>
            </div>

            {enviado ? (
              <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center animate-in zoom-in duration-300">
                <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 text-green-600">
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
                </div>
                <h3 className="font-black text-slate-800 text-lg mb-2">Mensaje recibido con éxito</h3>
                <p className="text-slate-600 text-sm max-w-md mx-auto mb-6">
                  Hemos registrado tu consulta de forma encriptada. Uno de nuestros asesores te responderá a tu correo en menos de 2 horas hábiles.
                </p>
                <button 
                  onClick={() => setEnviado(false)}
                  className="bg-[#1e3a8a] text-white font-bold py-2.5 px-6 rounded-xl text-xs uppercase tracking-wider hover:bg-blue-900 transition"
                >
                  Enviar otro mensaje
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Selector de motivo en pastillas */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Motivo de la consulta
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {motivos.map((m) => (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => setMotivo(m.id)}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                          motivo === m.id
                            ? 'bg-[#1e3a8a] text-white shadow-sm'
                            : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {m.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Nombre o Alias
                    </label>
                    <input 
                      type="text" 
                      required
                      placeholder="Puedes usar un seudónimo"
                      value={formData.alias}
                      onChange={(e) => setFormData({ ...formData, alias: e.target.value })}
                      className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#1e3a8a] transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Correo Electrónico
                    </label>
                    <input 
                      type="email" 
                      required
                      placeholder="Para recibir tu respuesta"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#1e3a8a] transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Teléfono / WhatsApp (Opcional)
                  </label>
                  <input 
                    type="tel" 
                    placeholder="Solo si prefieres respuesta por WhatsApp"
                    value={formData.telefono}
                    onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                    className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#1e3a8a] transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Tu Mensaje
                  </label>
                  <textarea 
                    rows={4}
                    required
                    placeholder="Escribe tu consulta con tranquilidad, todo lo compartido es estrictamente confidencial..."
                    value={formData.mensaje}
                    onChange={(e) => setFormData({ ...formData, mensaje: e.target.value })}
                    className="w-full bg-white border border-slate-300 rounded-xl p-4 text-sm focus:outline-none focus:border-[#1e3a8a] transition resize-none"
                  ></textarea>
                </div>

                <div className="flex items-center gap-2">
                  <input 
                    type="checkbox" 
                    id="confidencialidad"
                    checked={formData.confidencial}
                    onChange={(e) => setFormData({ ...formData, confidencial: e.target.checked })}
                    className="w-4 h-4 rounded text-[#1e3a8a] focus:ring-sky-300"
                  />
                  <label htmlFor="confidencialidad" className="text-xs text-slate-600 font-medium">
                    Acepto que mis datos sean tratados bajo estricta confidencialidad para fines de asesoría íntima.
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full md:w-auto bg-[#a6d4f2] hover:bg-[#8ac6ee] text-[#1e3a8a] font-black px-8 py-3.5 rounded-xl text-sm uppercase tracking-wider transition shadow-md"
                >
                  Enviar Mensaje Confidencial
                </button>
              </form>
            )}
          </div>

          {/* ACORDEÓN DE PREGUNTAS FRECUENTES */}
          <div>
            <h3 className="text-lg md:text-xl font-black text-[#1e3a8a] mb-4">
              Preguntas Frecuentes sobre Seguridad y Pedidos
            </h3>
            <div className="space-y-3">
              {faqs.map((faq, index) => (
                <div key={index} className="border border-slate-200 rounded-xl overflow-hidden bg-white">
                  <button
                    onClick={() => setFaqActiva(faqActiva === index ? null : index)}
                    className="w-full text-left px-5 py-4 flex items-center justify-between font-bold text-slate-800 text-sm hover:bg-slate-50 transition"
                  >
                    <span>{faq.pregunta}</span>
                    <span className="text-[#1e3a8a] text-lg font-black ml-4">
                      {faqActiva === index ? '−' : '+'}
                    </span>
                  </button>
                  {faqActiva === index && (
                    <div className="px-5 pb-4 text-xs md:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
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
