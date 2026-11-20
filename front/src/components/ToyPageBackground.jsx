import React from 'react';
import AndyCloudsWallpaper from './AndyCloudsWallpaper';

/**
 * Fondo Temático Oficial Unificado:
 * Color pastel insignia del personaje + Doodles eróticos sutiles (penes y vulvas)
 * idéntico a la atmósfera de la página principal.
 */
export default function ToyPageBackground({ theme = 'woody', children, className = '' }) {
  const themes = {
    woody: {
      bg: 'bg-gradient-to-b from-[#FFFDF2] via-[#FEF9C3]/40 to-[#FEF08A]/30',
      doodleOpacity: 'opacity-[0.13]'
    },
    lotso: {
      bg: 'bg-gradient-to-b from-[#FFF1F5] via-[#FCE7F3]/50 to-[#FBCFE8]/30',
      doodleOpacity: 'opacity-[0.13]'
    },
    jessie: {
      bg: 'bg-gradient-to-b from-[#FFF7ED] via-[#FFEDD5]/50 to-[#FED7AA]/30',
      doodleOpacity: 'opacity-[0.13]'
    },
    aliens: {
      bg: 'bg-gradient-to-b from-[#F0FDF4] via-[#DCFCE7]/50 to-[#BBF7D0]/30',
      doodleOpacity: 'opacity-[0.13]'
    },
    buzz: {
      bg: 'bg-gradient-to-b from-[#F8FAFC] via-[#F5F3FF]/60 to-[#EDE9FE]/40',
      doodleOpacity: 'opacity-[0.13]'
    }
  };

  const selectedTheme = themes[theme] || themes.woody;

  return (
    <div className={`min-h-screen relative overflow-hidden flex flex-col ${selectedTheme.bg} ${className}`}>
      {/* Patrón de Nubes Eróticas Oficiales de Toy Store */}
      <div className={`absolute inset-0 pointer-events-none select-none z-0 ${selectedTheme.doodleOpacity}`}>
        <AndyCloudsWallpaper />
      </div>

      {/* Contenido principal por encima del fondo */}
      <div className="relative z-10 flex-1 flex flex-col">
        {children}
      </div>
    </div>
  );
}
