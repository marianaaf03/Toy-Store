import React from 'react';

/**
 * AndyCloudsWallpaper: Tapiz icónico de la habitación de Andy
 * con los patrones de siluetas de nubes eróticas (vulvas y penises).
 * Utiliza espaciado vertical absoluto en píxeles fijos para que
 * NUNCA se deforme, estire, encoja ni salte al filtrar productos.
 */
const AndyCloudsWallpaper = () => {
  // 15 hileras fijas de 210px de separación para cubrir hasta 3200px de altura de pared
  const rows = [
    { top: 35,  items: [{ type: 'v', left: '6%', r: -10, s: 165 }, { type: 'p', left: '30%', r: 18, s: 155 }, { type: 'v', left: '55%', r: -8, s: 160 }, { type: 'p', left: '80%', r: 25, s: 175 }] },
    { top: 245, items: [{ type: 'p', left: '16%', r: 45, s: 180 }, { type: 'v', left: '42%', r: -15, s: 170 }, { type: 'p', left: '68%', r: -12, s: 165 }, { type: 'v', left: '92%', r: 12, s: 160 }] },
    { top: 455, items: [{ type: 'v', left: '8%', r: -22, s: 175 }, { type: 'p', left: '33%', r: 15, s: 195 }, { type: 'v', left: '58%', r: 10, s: 165 }, { type: 'p', left: '84%', r: -28, s: 185 }] },
    { top: 665, items: [{ type: 'p', left: '18%', r: 20, s: 170 }, { type: 'v', left: '46%', r: -35, s: 180 }, { type: 'p', left: '72%', r: 35, s: 190 }, { type: 'v', left: '94%', r: -10, s: 155 }] },
    { top: 875, items: [{ type: 'v', left: '6%', r: 15, s: 170 }, { type: 'p', left: '29%', r: -15, s: 185 }, { type: 'v', left: '53%', r: 22, s: 195 }, { type: 'p', left: '81%', r: -20, s: 170 }] },
    { top: 1085, items: [{ type: 'p', left: '14%', r: 40, s: 180 }, { type: 'v', left: '40%', r: -12, s: 165 }, { type: 'p', left: '66%', r: 18, s: 190 }, { type: 'v', left: '90%', r: -25, s: 170 }] },
    { top: 1295, items: [{ type: 'v', left: '7%', r: -15, s: 165 }, { type: 'p', left: '31%', r: 20, s: 175 }, { type: 'v', left: '56%', r: -8, s: 180 }, { type: 'p', left: '82%', r: 25, s: 170 }] },
    { top: 1505, items: [{ type: 'p', left: '17%', r: 35, s: 185 }, { type: 'v', left: '43%', r: -18, s: 170 }, { type: 'p', left: '69%', r: -10, s: 175 }, { type: 'v', left: '93%', r: 15, s: 165 }] },
    { top: 1715, items: [{ type: 'v', left: '6%', r: -20, s: 170 }, { type: 'p', left: '30%', r: 15, s: 190 }, { type: 'v', left: '55%', r: 10, s: 165 }, { type: 'p', left: '83%', r: -25, s: 180 }] },
    { top: 1925, items: [{ type: 'p', left: '18%', r: 22, s: 170 }, { type: 'v', left: '45%', r: -30, s: 175 }, { type: 'p', left: '71%', r: 30, s: 185 }, { type: 'v', left: '94%', r: -12, s: 160 }] },
    { top: 2135, items: [{ type: 'v', left: '7%', r: 12, s: 170 }, { type: 'p', left: '29%', r: -15, s: 180 }, { type: 'v', left: '54%', r: 20, s: 190 }, { type: 'p', left: '81%', r: -18, s: 170 }] },
    { top: 2345, items: [{ type: 'p', left: '15%', r: 42, s: 180 }, { type: 'v', left: '41%', r: -14, s: 165 }, { type: 'p', left: '67%', r: 15, s: 185 }, { type: 'v', left: '91%', r: -22, s: 170 }] },
    { top: 2555, items: [{ type: 'v', left: '6%', r: -12, s: 165 }, { type: 'p', left: '30%', r: 18, s: 175 }, { type: 'v', left: '55%', r: -10, s: 175 }, { type: 'p', left: '82%', r: 22, s: 170 }] },
    { top: 2765, items: [{ type: 'p', left: '16%', r: 35, s: 180 }, { type: 'v', left: '42%', r: -16, s: 170 }, { type: 'p', left: '68%', r: -8, s: 175 }, { type: 'v', left: '92%', r: 14, s: 160 }] },
    { top: 2975, items: [{ type: 'v', left: '8%', r: -18, s: 170 }, { type: 'p', left: '32%', r: 15, s: 185 }, { type: 'v', left: '57%', r: 8, s: 165 }, { type: 'p', left: '84%', r: -22, s: 180 }] }
  ];

  return (
    <div className="absolute inset-0 select-none pointer-events-none opacity-[0.22] overflow-hidden">
      {rows.map((row, rIdx) => (
        <React.Fragment key={rIdx}>
          {row.items.map((item, iIdx) => (
            <img
              key={`${rIdx}-${iIdx}`}
              src={item.type === 'v' ? '/images/custom_vulva.svg?v=10' : '/images/custom_pene.svg?v=10'}
              alt=""
              className="absolute pointer-events-none"
              style={{
                top: `${row.top}px`,
                left: item.left,
                height: `${item.s}px`,
                transform: `rotate(${item.r}deg)`,
                filter: 'drop-shadow(0 2px 10px rgba(0,0,0,0.12))'
              }}
            />
          ))}
        </React.Fragment>
      ))}
    </div>
  );
};

export default AndyCloudsWallpaper;
