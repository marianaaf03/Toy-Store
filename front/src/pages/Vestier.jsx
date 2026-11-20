import React, { useState } from 'react';
import RoomWrapper from '../components/RoomWrapper';
import AndyCloudsWallpaper from '../components/AndyCloudsWallpaper';
import { useNavigate } from 'react-router-dom';

/**
 * JessieOutfitBg: Color insignia pastel de Jessie (melocotón / coral vaquero suave)
 * combinado con los doodles eróticos sutiles (penes y vulvas) de Toy Store.
 */
const JessieOutfitBg = () => (
  <div className="absolute inset-0 bg-gradient-to-b from-[#FFF7ED] via-[#FFEDD5]/60 to-[#FED7AA]/40 overflow-hidden pointer-events-none">
    <div className="absolute inset-0 opacity-[0.13]">
      <AndyCloudsWallpaper />
    </div>
  </div>
);

export default function Vestier() {
  const navigate = useNavigate();
  const [estiloSeleccionado, setEstiloSeleccionado] = useState(0);
  const [tallaSeleccionada, setTallaSeleccionada] = useState('M');

  const colecciones = [
    {
      id: 0,
      nombre: 'Conjunto Cowgirl Jessie',
      tipo: 'Bralette + Liguero + Panty',
      descripcion: 'Nuestra pieza insignia. Combina encaje celeste elástico, estampado icónico de piel de vaca suave al tacto y lazos carmín regulables para un ajuste perfecto.',
      detalles: ['Encaje suave sin varillas', 'Tirantes y liguero ajustables', 'Broches reforzados inoxidables'],
      precio: '$ 145.000',
      enlace: '/tienda?cat=lenceria'
    },
    {
      id: 1,
      nombre: 'Body Galáctico Space Command',
      tipo: 'Body Microfibra Satinada',
      descripcion: 'Diseñado con cortes asimétricos y transparencias sutiles que abrazan las curvas con soporte cómodo y sensualidad futurista.',
      detalles: ['Microfibra elastizada', 'Espalda descubierta en V', 'Broche inferior de liberación rápida'],
      precio: '$ 130.000',
      enlace: '/tienda?cat=lenceria'
    },
    {
      id: 2,
      nombre: 'Babydoll Midnight Silk',
      tipo: 'Camisón de Seda Fría',
      descripcion: 'Caída ligera y sedosa con escote drapeado en encaje negro profundo. Perfecto para noches de juego prolongado y máxima frescura.',
      detalles: ['Satén hipoalergénico', 'Tacto ultra frío', 'Abertura lateral con ribete floral'],
      precio: '$ 120.000',
      enlace: '/tienda?cat=lenceria'
    }
  ];

  const tallas = [
    { talla: 'S', busto: '84 - 89 cm', cintura: '64 - 69 cm', cadera: '89 - 94 cm', equivalente: '32B - 34A' },
    { talla: 'M', busto: '90 - 95 cm', cintura: '70 - 75 cm', cadera: '95 - 100 cm', equivalente: '34B - 36A' },
    { talla: 'L', busto: '96 - 101 cm', cintura: '76 - 81 cm', cadera: '101 - 106 cm', equivalente: '36B - 38A' },
    { talla: 'XL', busto: '102 - 108 cm', cintura: '82 - 88 cm', cadera: '107 - 114 cm', equivalente: '38B - 40B' }
  ];

  const infoTalla = tallas.find(t => t.talla === tallaSeleccionada) || tallas[1];

  return (
    <RoomWrapper 
      theme="woody" 
      fullWallpaper={true} 
      wallpaperContent={<JessieOutfitBg />}
    >
      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 md:px-8 pt-8 pb-16">
        
        {/* CONTENEDOR PRINCIPAL FLOTANTE */}
        <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl border border-amber-100 p-6 md:p-12 animate-in fade-in zoom-in-95 duration-300">
          
          {/* CABECERA */}
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="inline-block px-4 py-1.5 rounded-full bg-amber-50 text-amber-800 text-xs font-black tracking-widest uppercase border border-amber-200 mb-4">
              Vestier & Lencería Exclusiva
            </span>
            <h1 className="text-3xl md:text-4xl font-black text-[#1e3a8a] tracking-tight mb-4">
              El Vestier de Toy Store
            </h1>
            <p className="text-slate-600 text-sm md:text-base leading-relaxed">
              Prendas confeccionadas para encender la fantasía, realzar tu silueta y combinar sensualidad con libertad de movimiento.
            </p>
          </div>

          {/* SELECTOR DE ESTILOS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {colecciones.map((col) => (
              <button
                key={col.id}
                onClick={() => setEstiloSeleccionado(col.id)}
                className={`p-5 rounded-2xl border-2 text-left transition ${
                  estiloSeleccionado === col.id
                    ? 'border-[#1e3a8a] bg-blue-50/50 shadow-md'
                    : 'border-slate-200 bg-white hover:border-amber-300'
                }`}
              >
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">
                  {col.tipo}
                </span>
                <h3 className="font-black text-[#1e3a8a] text-base mb-1">
                  {col.nombre}
                </h3>
                <span className="text-xs font-black text-amber-600 block">
                  {col.precio}
                </span>
              </button>
            ))}
          </div>

          {/* DETALLE DEL ESTILO SELECCIONADO */}
          <div className="bg-slate-50/80 rounded-2xl p-6 md:p-8 border border-slate-200 mb-12 flex flex-col md:flex-row gap-8 items-center">
            <div className="flex-1">
              <span className="text-xs font-bold text-amber-700 uppercase tracking-widest block mb-1">
                Ficha de Diseño
              </span>
              <h2 className="text-2xl font-black text-[#1e3a8a] mb-3">
                {colecciones[estiloSeleccionado].nombre}
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed mb-6">
                {colecciones[estiloSeleccionado].descripcion}
              </p>

              <div className="space-y-2 mb-6">
                {colecciones[estiloSeleccionado].detalles.map((det, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs md:text-sm font-semibold text-slate-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#1e3a8a]"></span>
                    <span>{det}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-4 items-center">
                <button
                  onClick={() => navigate('/tienda')}
                  className="bg-[#a6d4f2] hover:bg-[#8ac6ee] text-[#1e3a8a] font-black px-6 py-3 rounded-xl text-xs uppercase tracking-wider transition shadow-sm"
                >
                  Ver Lencerías en Tienda
                </button>
                <span className="text-xs font-bold text-slate-500">
                  Envíos 100% discretos y protegidos
                </span>
              </div>
            </div>
          </div>

          {/* GUÍA DE TALLAS INTERACTIVA */}
          <div className="bg-gradient-to-r from-amber-50/50 to-orange-50/30 rounded-2xl p-6 md:p-8 border border-amber-200">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
              <div>
                <h3 className="text-lg md:text-xl font-black text-[#1e3a8a]">
                  Guía de Tallas y Calce Perfecto
                </h3>
                <p className="text-xs md:text-sm text-slate-600">
                  Selecciona tu talla habitual para consultar las medidas de contorno recomendadas:
                </p>
              </div>

              {/* Botones de Tallas */}
              <div className="flex gap-2">
                {tallas.map(t => (
                  <button
                    key={t.talla}
                    onClick={() => setTallaSeleccionada(t.talla)}
                    className={`w-10 h-10 rounded-xl font-black text-xs transition uppercase ${
                      tallaSeleccionada === t.talla
                        ? 'bg-[#1e3a8a] text-white shadow-md'
                        : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {t.talla}
                  </button>
                ))}
              </div>
            </div>

            {/* Ficha de Medidas */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-white p-5 rounded-xl border border-amber-100 shadow-xs">
              <div>
                <span className="text-xs text-slate-400 font-bold block uppercase">Busto</span>
                <span className="text-sm md:text-base font-black text-[#1e3a8a]">{infoTalla.busto}</span>
              </div>
              <div>
                <span className="text-xs text-slate-400 font-bold block uppercase">Cintura</span>
                <span className="text-sm md:text-base font-black text-[#1e3a8a]">{infoTalla.cintura}</span>
              </div>
              <div>
                <span className="text-xs text-slate-400 font-bold block uppercase">Cadera</span>
                <span className="text-sm md:text-base font-black text-[#1e3a8a]">{infoTalla.cadera}</span>
              </div>
              <div>
                <span className="text-xs text-slate-400 font-bold block uppercase">Equivalente</span>
                <span className="text-sm md:text-base font-black text-amber-600">{infoTalla.equivalente}</span>
              </div>
            </div>

            <p className="text-[11px] text-slate-500 mt-4 leading-relaxed">
              Nota de higiene: Todas las prendas se despachan higienizadas con sello de seguridad inviolable. Los materiales cuentan con 15% de elastano para adaptarse cómodamente a diferentes tipos de cuerpo.
            </p>
          </div>

        </div>

      </div>
    </RoomWrapper>
  );
}
