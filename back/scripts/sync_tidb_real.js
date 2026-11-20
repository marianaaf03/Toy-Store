const mysql = require('mysql2/promise');

const config = {
  host: 'gateway01.us-east-1.prod.aws.tidbcloud.com',
  port: 4000,
  user: '3KySBgPd8XsrakY.root',
  password: 'yfSQZUcLmGskC2VU',
  database: 'toystore',
  ssl: {
    minVersion: 'TLSv1.2',
    rejectUnauthorized: true
  }
};

const productos = [
  // 1. VIBRADORES
  { id: 1, nombre: 'Masajeador Rabbit Doble Estimulación', categoria: 'vibradores', precio: 185000, stock: 22, imagen: '/images/rabbitbuzz.webp', descripcion: 'Doble motor independiente para estimulación simultánea interna de punto G y externa en clítoris.', nivel_juego: 3 },
  { id: 2, nombre: 'Succionador Clitoriano por Ondas de Aire', categoria: 'vibradores', precio: 145000, stock: 35, imagen: '/images/succionadorclitoris.png', descripcion: 'Ondas de presión pulsantes que acarician el clítoris sin contacto directo ni fricción.', nivel_juego: 2 },
  { id: 3, nombre: 'Vibrador Bala Silenciosa Multi-Velocidad', categoria: 'vibradores', precio: 65000, stock: 40, imagen: '/images/vibradorbala.png', descripcion: 'Ultra compacto, potente y discreto con motor silencioso whisper-quiet.', nivel_juego: 1 },
  { id: 4, nombre: 'Vibrador Punto G en Silicona Líquida', categoria: 'vibradores', precio: 125000, stock: 18, imagen: '/images/vibradorpuntoG.png', descripcion: 'Curvatura anatómica precisa diseñada para estimular el punto G con acabado aterciopelado.', nivel_juego: 2 },
  { id: 5, nombre: 'Vibrador para Ropa Interior con Control Remoto', categoria: 'vibradores', precio: 160000, stock: 15, imagen: '/images/vibradorpararopainterior.png', descripcion: 'Estimulador ergonómico en forma de mariposa con control inalámbrico de hasta 15 metros.', nivel_juego: 2 },
  { id: 6, nombre: 'Cerdito Travieso con Lengua Vibradora', categoria: 'vibradores', precio: 85000, stock: 28, imagen: '/images/cerdito_travieso.png', descripcion: 'Estimulador con lengüeta de silicona flexible de alta frecuencia que simula caricias orales.', nivel_juego: 1 },
  { id: 7, nombre: 'Vibrador Varita Masajeadora Cowgirl', categoria: 'vibradores', precio: 135000, stock: 20, imagen: '/images/vibradorvarita.png', descripcion: 'Varita masajeadora con motor de alta torsión para masajes musculares y clitorianos.', nivel_juego: 3 },

  // 2. LENCERÍA
  { id: 8, nombre: 'Conjunto Lencería Bralette y Panty de Encaje', categoria: 'lencerias', precio: 110000, stock: 30, imagen: '/images/lenceriabralette.png', descripcion: 'Conjunto sensual en encaje floral elástico de alta suavidad con tirantes regulables.', nivel_juego: 1 },
  { id: 9, nombre: 'Baby Doll de Satén con Copas de Encaje', categoria: 'lencerias', precio: 135000, stock: 24, imagen: '/images/babydoll.png', descripcion: 'Camisón corto de satén con escote de encaje y lazos de ajuste. Incluye tanga a juego.', nivel_juego: 1 },
  { id: 10, nombre: 'Body de Encaje con Escote Profundo', categoria: 'lencerias', precio: 120000, stock: 16, imagen: '/images/bodydeencaje.png', descripcion: 'Enterizo sensual con transparencias estratégicas y broches de apertura inferior.', nivel_juego: 2 },
  { id: 11, nombre: 'Arnés Corporal de Tiras Regulables', categoria: 'lencerias', precio: 95000, stock: 25, imagen: '/images/arnescorporal.png', descripcion: 'Arnés de tiras con herrajes dorados mate inoxidables que se adaptan a cualquier talla.', nivel_juego: 2 },
  { id: 12, nombre: 'Bata Kimono Corta en Seda Satinada', categoria: 'lencerias', precio: 140000, stock: 19, imagen: '/images/batakimono.png', descripcion: 'Prenda sedosa con cinturón de amarre y mangas acampanadas para juegos previos.', nivel_juego: 1 },
  { id: 14, nombre: 'Lencería Sensual Masculina Boxer Slip', categoria: 'lencerias', precio: 65000, stock: 32, imagen: '/images/lenceriahombre.png', descripcion: 'Boxer slip ajustado con tejido microperforado ultra suave y transpirable.', nivel_juego: 1 },
  { id: 15, nombre: 'Lencería Masculina Arnés & Suspensorio', categoria: 'lencerias', precio: 75000, stock: 21, imagen: '/images/lenceriahombre2.png', descripcion: 'Set de arnés pectoral y jockstrap con bandas elásticas que definen la silueta.', nivel_juego: 2 },
  { id: 16, nombre: 'Conjunto Lencería Galáctica Space', categoria: 'lencerias', precio: 118000, stock: 18, imagen: '/images/lenceriabuzzmujer.png', descripcion: 'Diseño espacial con acabados satinados brillantes y detalles en verde y violeta.', nivel_juego: 1 },

  // 3. PLUGS & ANALES
  { id: 17, nombre: 'Plug Anal Metálico con Gema de Cristal', categoria: 'anales', precio: 55000, stock: 35, imagen: '/images/pluganalconcristal.png', descripcion: 'Acero inoxidable quirúrgico con gema facetada brillante en la base. Apto temperatura.', nivel_juego: 2 },
  { id: 18, nombre: 'Plug Anal Vibrador con Control Inalámbrico', categoria: 'anales', precio: 115000, stock: 14, imagen: '/images/pluganalvibrador.png', descripcion: 'Cuerpo cónico en silicona sedosa con 10 modos de vibración y mando inalámbrico.', nivel_juego: 3 },
  { id: 19, nombre: 'Set de 3 Plugs Progresivos de Silicona', categoria: 'anales', precio: 85000, stock: 22, imagen: '/images/setplugs.png', descripcion: 'Kit de 3 tamaños progresivos S, M y L en silicona hipoalergénica con base de seguridad.', nivel_juego: 2 },
  { id: 20, nombre: 'Sonda Prostática Ergonómica con Vibración', categoria: 'anales', precio: 130000, stock: 12, imagen: '/images/sondaprostatica.png', descripcion: 'Diseño anatómico de estimulación simultánea prostática y perineal con vibración.', nivel_juego: 3 },

  // 4. DILDOS
  { id: 21, nombre: 'Dildo RealFeel Dual Density con Ventosa 18cm', categoria: 'dildos', precio: 140000, stock: 17, imagen: '/images/dildorealfeel.png', descripcion: 'Doble densidad con núcleo firme y capa exterior flexible con ventosa de fijación.', nivel_juego: 2 },
  { id: 22, nombre: 'Dildo de Cristal Borosilicato Templado', categoria: 'dildos', precio: 110000, stock: 15, imagen: '/images/dildodecristal.png', descripcion: 'Vidrio de borosilicato soplado hipoalergénico con hendiduras en espiral.', nivel_juego: 2 },

  // 5. COSMÉTICA
  { id: 23, nombre: 'Lubricante Íntimo a Base de Agua 100ml', categoria: 'cosmetica', precio: 38000, stock: 50, imagen: '/images/lubricanteintimo.png', descripcion: 'Fórmula hidratante sedosa de larga duración compatible con silicona y látex.', nivel_juego: 1 },
  { id: 24, nombre: 'Aceite de Masaje Sensual Efecto Calor Fresa', categoria: 'cosmetica', precio: 45000, stock: 45, imagen: '/images/aceitedemasaje.png', descripcion: 'Aceite comestible que reacciona con el aliento generando sensación térmica dulce.', nivel_juego: 1 },
  { id: 25, nombre: 'Gel Estimulador Clitoriano Efecto Frío & Calor', categoria: 'cosmetica', precio: 52000, stock: 38, imagen: '/images/gelestimulador.png', descripcion: 'Gotas de cosquilleo estimulante con pulsaciones térmicas para intensificar sensaciones.', nivel_juego: 2 },
  { id: 26, nombre: 'Vela Aromática de Cera de Soya para Masajes', categoria: 'cosmetica', precio: 48000, stock: 30, imagen: '/images/velaaromatica.png', descripcion: 'Cera vegetal tibia enriquecida con aceites hidratantes corporales.', nivel_juego: 1 },
  { id: 27, nombre: 'Limpiador Antibacterial Espumoso para Juguetes', categoria: 'cosmetica', precio: 34000, stock: 60, imagen: '/images/limpiadorantibacterial.png', descripcion: 'Espuma higienizante sin alcohol para conservar la silicona médica.', nivel_juego: 1 },

  // 6. ACCESORIOS & BDSM
  { id: 28, nombre: 'Esposas de Peluche con Cierre de Seguridad', categoria: 'accesorios', precio: 42000, stock: 28, imagen: '/images/esposasdepeluche.png', descripcion: 'Grilletes forrados en felpa acolchada con palanca de liberación rápida.', nivel_juego: 1 },
  { id: 29, nombre: 'Antifaz de Seda Acolchado para Privación Sensorial', categoria: 'accesorios', precio: 28000, stock: 42, imagen: '/images/antifazdeseda.png', descripcion: 'Bloqueo visual total para intensificar el tacto y el oído durante el juego previo.', nivel_juego: 1 },
  { id: 30, nombre: 'Fusta de Placer con Puntera de Cuero Suave', categoria: 'accesorios', precio: 36000, stock: 20, imagen: '/images/fustadeplacer.png', descripcion: 'Accesorio de caricias sensoriales con empuñadura ergonómica y puntera suave.', nivel_juego: 2 },

  // 7. KITS & SORPRESAS
  { id: 31, nombre: 'Kit de Iniciación al Placer y BDSM Suave 5 Piezas', categoria: 'kits', precio: 165000, stock: 14, imagen: '/images/kitdeiniciazion.png', descripcion: 'Caja con antifaz, esposas, pluma, fusta suave y dados eróticos.', nivel_juego: 2 },
  { id: 32, nombre: 'Caja Misteriosa Mystery Box Parejas Romántica', categoria: 'kits', precio: 250000, stock: 12, imagen: '/images/cajamisteriosa.png', descripcion: 'Caja sorpresa con juguete premium, cosmética, lencería y juego de cartas.', nivel_juego: 2 }
];

async function syncTiDB() {
  console.log('Iniciando sincronización de catálogo con TiDB Cloud...');
  const conn = await mysql.createConnection(config);
  try {
    console.log('Conexión establecida con TiDB Cloud.');
    
    // 1. Limpiar tabla productos para evitar duplicados o datos antiguos
    await conn.query('DELETE FROM productos;');
    console.log('Tabla productos vaciada.');

    // 2. Insertar los 28 productos exactos
    const sql = 'INSERT INTO productos (id, nombre, categoria, precio, stock, imagen, descripcion, nivel_juego) VALUES ?';
    const values = productos.map(p => [
      p.id,
      p.nombre,
      p.categoria,
      p.precio,
      p.stock,
      p.imagen,
      p.descripcion,
      p.nivel_juego
    ]);

    await conn.query(sql, [values]);
    console.log(`✅ ¡Éxito! ${productos.length} productos insertados en TiDB Cloud con sus fotos e información real.`);

    const [count] = await conn.query('SELECT count(*) as total FROM productos;');
    console.log('Total verificado en TiDB:', count[0].total);

  } catch (err) {
    console.error('Error al sincronizar TiDB:', err.message);
  } finally {
    await conn.end();
  }
}

syncTiDB();
