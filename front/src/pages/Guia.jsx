import React, { useState } from 'react';
import RoomWrapper from '../components/RoomWrapper';
import AndyCloudsWallpaper from '../components/AndyCloudsWallpaper';
import { useNavigate } from 'react-router-dom';

/**
 * LotsoBg: Color insignia pastel de Lotso (rosa fresa suave)
 * combinado con los doodles eróticos sutiles (penes y vulvas) de Toy Store.
 */
const LotsoBg = () => (
  <div className="absolute inset-0 bg-gradient-to-b from-[#FFF1F5] via-[#FCE7F3]/60 to-[#FBCFE8]/40 overflow-hidden pointer-events-none">
    <div className="absolute inset-0 opacity-[0.13]">
      <AndyCloudsWallpaper />
    </div>
  </div>
);

export default function Guia() {
  const navigate = useNavigate();
  const [moduloActivo, setModuloActivo] = useState(0);
  const [testRespuesta, setTestRespuesta] = useState(null);

  const modulos = [
    {
      id: 0,
      titulo: 'Materiales y Silicona Médica',
      subtitulo: 'La base de un bienestar seguro y duradero',
      contenido: [
        'La silicona médica hipoalergénica es el estándar de oro en juguetería íntima. Al ser un material no poroso, impide la acumulación de bacterias, moho o residuos microbianos.',
        'Regla de oro de la lubricación: Los juguetes de silicona pura SIEMPRE deben usarse exclusivamente con lubricantes a base de agua. Los aceites, vaselinas o lubricantes de silicona pueden degradar y derretir la superficie del juguete de forma irreversible.',
        'Nuestros productos están certificados libres de ftalatos, látex tóxico y metales pesados, garantizando biocompatibilidad total con tus mucosas más delicadas.'
      ]
    },
    {
      id: 1,
      titulo: 'Ondas de Presión vs Vibración Clásica',
      subtitulo: 'Entendiendo los dos universos de estimulación',
      contenido: [
        'Estimulación por ondas de aire (pulsaciones sónicas): Genera ondas que estimulan las más de 8.000 terminaciones nerviosas del clítoris sin necesidad de roce mecánico directo, evitando el adormecimiento o la hipersensibilidad.',
        'Vibración mecánica clásica: Ideal para estimulación profunda, puntos internos (punto G/P) o zonas erógenas amplias. Permite graduar intensidades constantes y patrones rítmicos.',
        'Estimulación combinada: Los juguetes duales conectan ambos mundos simultáneamente, facilitando experiencias multiorgásmicas con total control desde sus botones ergonómicos.'
      ]
    },
    {
      id: 2,
      titulo: 'Protocolo de Higiene y Cuidados',
      subtitulo: 'Cómo proteger tu salud y duplicar la vida útil de tu juguete',
      contenido: [
        'Antes y después de cada uso: Lava tu dispositivo con agua tibia y jabón neutro antibacterial (o limpiador especializado para silicona). Evita productos con alcohol o fragancias fuertes.',
        'Resistencia al agua: Muchos de nuestros modelos cuentan con certificación IPX7 (sumergibles), pero se recomienda no sumergir la zona del puerto de carga magnética por tiempos prolongados.',
        'Almacenamiento: Seca completamente con una toalla que no desprenda pelusa y guarda tu juguete en su bolsita de satén original, en un lugar fresco y lejos de la luz solar directa.'
      ]
    },
    {
      id: 3,
      titulo: 'Placer en Pareja y Comunicación',
      subtitulo: 'Derribando mitos y explorando juntos',
      contenido: [
        'Los juguetes no reemplazan a nadie: Son aliados que suman sensaciones, enriquecen el juego previo y permiten explorar fantasías desde la complicidad y el consentimiento.',
        'Cómo proponerlo: Conversa en un momento neutro y relajado, fuera de la cama. Comparte curiosidad genuina en lugar de expectativas o exigencias.',
        'Modelos con control a distancia: Perfectos para juegos de anticipación en citas o a distancia, permitiendo que tu pareja controle vibraciones y patrones en tiempo real.'
      ]
    }
  ];

  const quizOpciones = [
    {
      opcion: 'Prefiero sensaciones suaves, sin contacto directo y que no me causen cosquillas.',
      recomendacion: 'Estimulador de ondas sónicas por aire (Succionador Clitoriano)',
      link: '/tienda?cat=vibradores'
    },
    {
      opcion: 'Busco explorar sensaciones compartidas, lencería y juegos de rol en pareja.',
      recomendacion: 'Conjuntos de Lencería Cowgirl y Kits Sensoriales',
      link: '/vestier'
    },
    {
      opcion: 'Quiero intensidad profunda, vibraciones graduables y ergonomía versátil.',
      recomendacion: 'Vibradores de silicona médica recargables',
      link: '/tienda?cat=vibradores'
    }
  ];

  return (
    <RoomWrapper 
      theme="lotso"
      wallpaperContent={<AndyCloudsWallpaper />}
    >
      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 md:px-8 pt-8 pb-16">
        
        {/* CONTENEDOR PRINCIPAL FLOTANTE */}
        <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl border border-rose-100 p-6 md:p-12 animate-in fade-in zoom-in-95 duration-300">
          
          {/* CABECERA */}
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="inline-block px-4 py-1.5 rounded-full bg-rose-50 text-rose-800 text-xs font-black tracking-widest uppercase border border-rose-200 mb-4">
              Educación Íntima y Autocuidado
            </span>
            <h1 className="text-3xl md:text-4xl font-black text-[#1e3a8a] tracking-tight mb-4">
              Manual de Exploración y Cuidado
            </h1>
            <p className="text-slate-600 text-sm md:text-base leading-relaxed">
              Descubre información clara y profesional sobre materiales, tipos de estimulación y mantenimiento para disfrutar con total confianza.
            </p>
          </div>

          {/* PESTAÑAS DE CAPÍTULOS / MÓDULOS */}
          <div className="flex flex-wrap gap-2 justify-center mb-8 border-b border-slate-100 pb-4">
            {modulos.map((m) => (
              <button
                key={m.id}
                onClick={() => setModuloActivo(m.id)}
                className={`px-5 py-2.5 rounded-xl text-xs md:text-sm font-black transition uppercase tracking-wider ${
                  moduloActivo === m.id
                    ? 'bg-[#1e3a8a] text-white shadow-md'
                    : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {m.titulo}
              </button>
            ))}
          </div>

          {/* CONTENIDO DEL MÓDULO ACTIVO */}
          <div className="bg-slate-50/80 rounded-2xl p-6 md:p-8 border border-slate-200 mb-12">
            <div className="mb-4">
              <span className="text-xs font-bold text-rose-600 uppercase tracking-widest">
                Capítulo {moduloActivo + 1} de {modulos.length}
              </span>
              <h2 className="text-xl md:text-2xl font-black text-[#1e3a8a] mt-1">
                {modulos[moduloActivo].titulo}
              </h2>
              <p className="text-xs md:text-sm text-slate-500 font-medium">
                {modulos[moduloActivo].subtitulo}
              </p>
            </div>

            <div className="space-y-4 text-slate-700 text-sm md:text-base leading-relaxed border-t border-slate-200 pt-4">
              {modulos[moduloActivo].contenido.map((parrafo, idx) => (
                <div key={idx} className="flex gap-3 items-start">
                  <div className="w-2 h-2 rounded-full bg-[#1e3a8a] mt-2 shrink-0"></div>
                  <p>{parrafo}</p>
                </div>
              ))}
            </div>
          </div>

          {/* TEST INTERACTIVO RÁPIDO */}
          <div className="bg-gradient-to-r from-sky-50 to-indigo-50/50 rounded-2xl p-6 md:p-8 border border-sky-100">
            <h3 className="text-lg md:text-xl font-black text-[#1e3a8a] mb-2">
              Encuentra tu experiencia ideal
            </h3>
            <p className="text-xs md:text-sm text-slate-600 mb-6">
              Selecciona la sensación que más te llama la atención para ver nuestra sugerencia experta:
            </p>

            <div className="space-y-3 mb-6">
              {quizOpciones.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => setTestRespuesta(item)}
                  className={`w-full text-left p-4 rounded-xl border text-xs md:text-sm font-bold transition flex items-center justify-between ${
                    testRespuesta?.opcion === item.opcion
                      ? 'bg-[#1e3a8a] text-white border-[#1e3a8a] shadow-sm'
                      : 'bg-white text-slate-700 border-slate-200 hover:border-sky-300'
                  }`}
                >
                  <span>{item.opcion}</span>
                  <span className="text-xs opacity-70 ml-2">Seleccionar</span>
                </button>
              ))}
            </div>

            {testRespuesta && (
              <div className="bg-white p-5 rounded-xl border-2 border-sky-200 animate-in fade-in duration-200 flex flex-col md:flex-row items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-bold text-sky-600 uppercase tracking-wider block mb-1">
                    Recomendación Sugerida:
                  </span>
                  <p className="font-black text-[#1e3a8a] text-base">
                    {testRespuesta.recomendacion}
                  </p>
                </div>
                <button
                  onClick={() => navigate(testRespuesta.link)}
                  className="bg-[#a6d4f2] hover:bg-[#8ac6ee] text-[#1e3a8a] font-black px-6 py-2.5 rounded-xl text-xs uppercase tracking-wider whitespace-nowrap shadow-sm transition"
                >
                  Ver en Catálogo
                </button>
              </div>
            )}
          </div>

        </div>

      </div>
    </RoomWrapper>
  );
}
