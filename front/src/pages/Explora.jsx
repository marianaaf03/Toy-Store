import React, { useState } from 'react';
import RoomWrapper from '../components/RoomWrapper';
import AndyCloudsWallpaper from '../components/AndyCloudsWallpaper';
import { useNavigate } from 'react-router-dom';

/**
 * AlienSpaceBg: Color insignia pastel de los Marcianitos (menta mística suave)
 * combinado con los doodles eróticos sutiles (penes y vulvas) de Toy Store.
 */
const AlienSpaceBg = () => (
  <div className="absolute inset-0 bg-gradient-to-b from-[#F0FDF4] via-[#DCFCE7]/60 to-[#BBF7D0]/40 overflow-hidden pointer-events-none">
    <div className="absolute inset-0 opacity-[0.13]">
      <AndyCloudsWallpaper />
    </div>
  </div>
);

export default function Explora() {
  const navigate = useNavigate();
  const [estacionActiva, setEstacionActiva] = useState(0);

  const estaciones = [
    {
      id: 0,
      titulo: 'Termosensaciones (Calor y Frío)',
      categoria: 'Aceites y Geles Térmicos',
      descripcion: 'Juega con los contrastes de temperatura para despertar zonas dormidas de la piel. Los aceites comestibles reaccionan al aliento generando un cosquilleo cálido y dulce.',
      items: [
        'Aceite térmico sabor fresa silvestre (calor con el aliento)',
        'Gel de efecto frío estimulante para intensificar caricias',
        'Vela de masaje de cera de soja tibia para masajes cuerpo a cuerpo'
      ],
      cta: 'Ver Aceites en Tienda'
    },
    {
      id: 1,
      titulo: 'Plugs y Precisión Anatómica',
      categoria: 'Joyería Ergonómica',
      descripcion: 'Explora la plenitud y la estimulación de terminaciones nerviosas profundas con materiales nobles como el acero quirúrgico pulido y la silicona aterciopelada.',
      items: [
        'Plug anal con joya facetada Buzz Lightyear (acero hipoalergénico)',
        'Base acampanada de seguridad estándar internacional',
        'Sensación de temperatura adaptable sumergiéndolo en agua tibia o fría'
      ],
      cta: 'Ver Joyería en Tienda'
    },
    {
      id: 2,
      titulo: 'Seducción y Privación Sensorial',
      categoria: 'Kits de Fantasía y Vendas',
      descripcion: 'Al cubrir los ojos, el resto de los sentidos se multiplican por diez. Descubre cómo las texturas ligeras y el tacto suave transforman el juego previo.',
      items: [
        'Antifaz de satén acolchado para privación total de la vista',
        'Plumero de cosquillas suaves para estimulación dérmica',
        'Sujeciones acolchadas con sistema de liberación rápida por velcro'
      ],
      cta: 'Ver Kits en Tienda'
    },
    {
      id: 3,
      titulo: 'Mystery Box (Experiencia a Ciegas)',
      categoria: 'Cajas Sorpresa de Pareja',
      descripcion: 'Rompe la monotonía con una selección curada por especialistas. Cada caja contiene 1 juguete principal, lencería o accesorio y un juego de cartas para romper el hielo.',
      items: [
        'Ahorro del 35% respecto a comprar productos individuales',
        'Selección personalizada para parejas o juego individual',
        'Empaque exterior 100% discreto sin pistas del contenido'
      ],
      cta: 'Ver Cajas Sorpresa'
    }
  ];

  return (
    <RoomWrapper 
      theme="aliens" 
      fullWallpaper={true} 
      wallpaperContent={<AlienSpaceBg />}
    >
      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 md:px-8 pt-8 pb-16">
        
        {/* CONTENEDOR PRINCIPAL FLOTANTE */}
        <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl border border-emerald-100 p-6 md:p-12 animate-in fade-in zoom-in-95 duration-300">
          
          {/* CABECERA */}
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="inline-block px-4 py-1.5 rounded-full bg-emerald-50 text-emerald-800 text-xs font-black tracking-widest uppercase border border-emerald-200 mb-4">
              Laboratorio de Deseos y Sensaciones
            </span>
            <h1 className="text-3xl md:text-4xl font-black text-[#1e3a8a] tracking-tight mb-4">
              Explora Nuevos Horizontes de Placer
            </h1>
            <p className="text-slate-600 text-sm md:text-base leading-relaxed">
              Descubre texturas térmicas, joyas anatómicas de acero y experiencias diseñadas para estimular todos tus sentidos.
            </p>
          </div>

          {/* ESTACIONES EN GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {estaciones.map((est) => (
              <div
                key={est.id}
                onClick={() => setEstacionActiva(est.id)}
                className={`p-6 md:p-8 rounded-2xl border-2 cursor-pointer transition flex flex-col justify-between ${
                  estacionActiva === est.id
                    ? 'border-emerald-500 bg-emerald-50/40 shadow-lg'
                    : 'border-slate-200 bg-white hover:border-emerald-300'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest">
                      {est.categoria}
                    </span>
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                  </div>

                  <h3 className="text-xl font-black text-[#1e3a8a] mb-3">
                    {est.titulo}
                  </h3>

                  <p className="text-slate-600 text-xs md:text-sm leading-relaxed mb-6">
                    {est.descripcion}
                  </p>

                  <div className="space-y-2 mb-6 border-t border-slate-100 pt-4">
                    {est.items.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs font-semibold text-slate-700">
                        <span className="text-emerald-600 font-black">✓</span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate('/tienda');
                  }}
                  className="w-full bg-[#a6d4f2] hover:bg-[#8ac6ee] text-[#1e3a8a] font-black py-3 rounded-xl text-xs uppercase tracking-wider transition shadow-sm"
                >
                  {est.cta}
                </button>
              </div>
            ))}
          </div>

          {/* MANIFIESTO DE SEGURIDAD Y RESPETO */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50/40 rounded-2xl p-6 md:p-8 border border-blue-100 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="max-w-xl">
              <h4 className="text-base md:text-lg font-black text-[#1e3a8a] mb-1">
                La Regla de Oro: Seguridad, Respeto y Consentimiento
              </h4>
              <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
                Cada producto de nuestro laboratorio está diseñado bajo estrictos estándares ergonómicos internacionales para garantizar que tu exploración sea placentera, segura y siempre libre de riesgos.
              </p>
            </div>
            <button
              onClick={() => navigate('/tienda')}
              className="bg-[#1e3a8a] hover:bg-blue-900 text-white font-black px-8 py-3.5 rounded-xl text-xs uppercase tracking-wider whitespace-nowrap shadow-md transition shrink-0"
            >
              Explorar Catálogo Completo
            </button>
          </div>

        </div>

      </div>
    </RoomWrapper>
  );
}
