import mysql from 'mysql2/promise';

const productosNuevos = [
  {
    nombre: 'Vibrador Succión Clitoriana Toyito',
    categoria: 'vibradores',
    precio: 145000,
    nivel_juego: 2,
    imagen: '/images/vibrador_cowgirl.png',
    descripcion: 'Estimulador de ondas de presión de aire y pulsos sónicos. Silicona médica ultrasuave, 10 patrones de succión y sumergible IPX7 para usar en la ducha.',
    stock: 25
  },
  {
    nombre: 'Varita Mágica Rabbit Rosa Dulce',
    categoria: 'vibradores',
    precio: 185000,
    nivel_juego: 3,
    imagen: '/images/vibrador_cowgirl.png',
    descripcion: 'Doble motor independiente para estimulación simultánea interna de punto G y externa clitoriana. Recargable por USB magnético.',
    stock: 18
  },
  {
    nombre: 'Vibrador Bala Minimalista Sheriff',
    categoria: 'vibradores',
    precio: 65000,
    nivel_juego: 1,
    imagen: '/images/vibrador_cowgirl.png',
    descripcion: 'Ultra discreto, cabe en tu bolsillo o bolso. Motor silencioso Whisper-Quiet (<40dB) con 7 intensidades potentes.',
    stock: 40
  },
  {
    nombre: 'Vibrador Curvado Punto G Terciopelo',
    categoria: 'vibradores',
    precio: 125000,
    nivel_juego: 2,
    imagen: '/images/vibrador_cowgirl.png',
    descripcion: 'Cabezal ergonómico diseñado para alcanzar los puntos más profundos con caricias suaves. Acabado de silicona líquida aterciopelada.',
    stock: 15
  },
  {
    nombre: 'Vibrador Panty a Control Remoto',
    categoria: 'vibradores',
    precio: 160000,
    nivel_juego: 2,
    imagen: '/images/vibrador_cowgirl.png',
    descripcion: 'Diseñado magnéticamente para ajustarse en la ropa interior. Control inalámbrico de hasta 15 metros para jugar en pareja en citas públicas.',
    stock: 20
  },
  {
    nombre: 'Conjunto Lencería Vaquera Jessie',
    categoria: 'lencerias',
    precio: 110000,
    nivel_juego: 1,
    imagen: '/images/lenceria_andy.png',
    descripcion: 'Bralette y panty con estampado exclusivo temático de vaquera sexy con lazos en satén y encaje elástico transpirable de alta resistencia.',
    stock: 30
  },
  {
    nombre: 'Baby Doll Seda Nocturna Andy',
    categoria: 'lencerias',
    precio: 135000,
    nivel_juego: 1,
    imagen: '/images/lenceria_andy.png',
    descripcion: 'Vestido corto vaporoso de satén premium con transparencias en encaje floral negro, copas moldeadas y tanga a juego.',
    stock: 22
  },
  {
    nombre: 'Arnés Corporal de Tiras & Cuero Suave',
    categoria: 'lencerias',
    precio: 95000,
    nivel_juego: 2,
    imagen: '/images/lenceria_andy.png',
    descripcion: 'Arnés ajustable para torso y busto con detalles metálicos inoxidables en color dorado mate. 100% regulable a cualquier talla.',
    stock: 19
  },
  {
    nombre: 'Body de Encaje Floral Escote Profundo',
    categoria: 'lencerias',
    precio: 120000,
    nivel_juego: 1,
    imagen: '/images/lenceria_andy.png',
    descripcion: 'Enterizo sensual con abertura en la espalda y broche inferior de apertura rápida para momentos íntimos espontáneos.',
    stock: 16
  },
  {
    nombre: 'Bata Kimono Satén Caricia Suave',
    categoria: 'lencerias',
    precio: 140000,
    nivel_juego: 1,
    imagen: '/images/lenceria_andy.png',
    descripcion: 'Kimono corto en satén brillante color champán con cinturón de ajuste y mangas amplias tipo campana para una previa elegante.',
    stock: 14
  },
  {
    nombre: 'Plug Anal Metálico Gema Rubí',
    categoria: 'anales',
    precio: 55000,
    nivel_juego: 1,
    imagen: '/images/plug_anal.png',
    descripcion: 'Acero quirúrgico pulido con cristal en forma de gema rubí en la base. Compatible con cambios de temperatura (frío o calor) y base ancha 100% segura.',
    stock: 35
  },
  {
    nombre: 'Plug Anal Vibrador Silicona Líquida',
    categoria: 'anales',
    precio: 115000,
    nivel_juego: 2,
    imagen: '/images/plug_anal.png',
    descripcion: 'Punta cónica de inserción fácil con motor de vibración interno de 10 modos y control remoto inalámbrico.',
    stock: 18
  },
  {
    nombre: 'Set de 3 Plugs Progresivos Sheriff',
    categoria: 'anales',
    precio: 85000,
    nivel_juego: 2,
    imagen: '/images/plug_anal.png',
    descripcion: 'Kit de iniciación y progresión en silicona suave tamaño S, M y L con base acampanada de máxima tranquilidad.',
    stock: 25
  },
  {
    nombre: 'Sonda Anal Flexible con Estimulación de Próstata',
    categoria: 'anales',
    precio: 130000,
    nivel_juego: 3,
    imagen: '/images/plug_anal.png',
    descripcion: 'Ángulo ergonómico de precisión milimétrica para hombres, silicona médica hipoalergénica con vibraciones profundas.',
    stock: 12
  },
  {
    nombre: 'Dildo Dual Density RealFeel 18cm',
    categoria: 'dildos',
    precio: 140000,
    nivel_juego: 2,
    imagen: '/images/cerdito_travieso.png',
    descripcion: 'Tecnología de doble densidad con núcleo interno firme y capa externa suave y tibia como la piel. Con ventosa ultra adherente en la base.',
    stock: 15
  },
  {
    nombre: 'Dildo de Cristal Borosilicato Hechizo',
    categoria: 'dildos',
    precio: 110000,
    nivel_juego: 2,
    imagen: '/images/cerdito_travieso.png',
    descripcion: 'Cristal templado hipoalergénico inodoro de grado médico. Ideal para jugar con sensaciones térmicas poniéndolo en agua tibia o hielo.',
    stock: 10
  },
  {
    nombre: 'Lubricante Base Agua Algodón de Azúcar 100ml',
    categoria: 'cosmetica',
    precio: 38000,
    nivel_juego: 1,
    imagen: '/images/cerdito_travieso.png',
    descripcion: 'Fórmula hidratante sedosa con sabor dulce no pegajoso. Compatible con preservativos de látex y todos los juguetes de silicona.',
    stock: 50
  },
  {
    nombre: 'Aceite de Masaje Sensual Efecto Térmico 120ml',
    categoria: 'cosmetica',
    precio: 45000,
    nivel_juego: 1,
    imagen: '/images/cerdito_travieso.png',
    descripcion: 'Calienta suavemente al soplar o frotar sobre la piel. Aroma embriagador a fresas silvestres y vainilla de Madagascar.',
    stock: 35
  },
  {
    nombre: 'Gel Estimulador Clitoriano Fuego & Hielo 30ml',
    categoria: 'cosmetica',
    precio: 52000,
    nivel_juego: 2,
    imagen: '/images/cerdito_travieso.png',
    descripcion: 'Gotas de cosquilleo y micro-ondas de placer que multiplican la sensibilidad al instante. Fórmula natural a base de extractos botánicos.',
    stock: 28
  },
  {
    nombre: 'Vela Aromática de Cera Tibia para Masajes',
    categoria: 'cosmetica',
    precio: 48000,
    nivel_juego: 1,
    imagen: '/images/cerdito_travieso.png',
    descripcion: 'Se derrite a temperatura corporal para convertirse en un aceite nutritivo de manteca de karité listo para verter sobre el cuerpo.',
    stock: 24
  },
  {
    nombre: 'Esposas de Peluche Suave & Cadena Rosa',
    categoria: 'accesorios',
    precio: 42000,
    nivel_juego: 1,
    imagen: '/images/cerdito_travieso.png',
    descripcion: 'Metálicas con forro de felpa desmontable que no maltrata las muñecas. Incluye sistema de liberación rápida por botón de seguridad.',
    stock: 30
  },
  {
    nombre: 'Antifaz de Satén Negro Ojos Ciegos',
    categoria: 'accesorios',
    precio: 28000,
    nivel_juego: 1,
    imagen: '/images/cerdito_travieso.png',
    descripcion: 'Bloqueo 100% de la luz para agudizar todos los demás sentidos táctiles y sonoros durante el juego erótico.',
    stock: 45
  },
  {
    nombre: 'Plumero de Cosquilleo y Caricias Lotso',
    categoria: 'accesorios',
    precio: 32000,
    nivel_juego: 1,
    imagen: '/images/cerdito_travieso.png',
    descripcion: 'Plumas naturales ultrasuaves con mango aterciopelado para juegos preliminares sensoriales y caricias erógenas.',
    stock: 30
  },
  {
    nombre: 'Mordaza Suave de Silicona en Forma de Bola',
    categoria: 'accesorios',
    precio: 46000,
    nivel_juego: 2,
    imagen: '/images/cerdito_travieso.png',
    descripcion: 'Silicona suave no porosa con correa ajustable de cuero sintético y agujeros de respiración cómodos para sumisión consentida.',
    stock: 16
  },
  {
    nombre: 'Caja Misteriosa Woody & Jessie Prémium',
    categoria: 'kits',
    precio: 250000,
    nivel_juego: 2,
    imagen: '/images/mystery_box.png',
    descripcion: 'Contiene 4 artículos secretos seleccionados al azar: 1 vibrador de alta gama, 1 lencería de diseño, 1 lubricante prémium y 1 accesorio BDSM suave.',
    stock: 12
  },
  {
    nombre: 'Kit Primer Encuentro para Parejas',
    categoria: 'kits',
    precio: 165000,
    nivel_juego: 1,
    imagen: '/images/mystery_box.png',
    descripcion: 'El pack perfecto para dar los primeros pasos juntos: vibrador bala, dados de posturas, pluma de cosquilleo y lubricante con aroma a fresa.',
    stock: 20
  },
  {
    nombre: 'Kit Bondage Suave Cincuenta Sombras',
    categoria: 'kits',
    precio: 190000,
    nivel_juego: 2,
    imagen: '/images/mystery_box.png',
    descripcion: 'Juego completo de restricción sensual: esposas de muñecas, esposas de tobillos, antifaz de satén, látigo suave y pluma.',
    stock: 15
  },
  {
    nombre: 'Limpiador Antibacterial Espumoso para Juguetes 150ml',
    categoria: 'cosmetica',
    precio: 34000,
    nivel_juego: 1,
    imagen: '/images/cerdito_travieso.png',
    descripcion: 'Fórmula sin alcohol de grado médico que esteriliza y cuida la silicona de tus juguetes favoritos manteniéndolos como nuevos.',
    stock: 50
  }
];

async function seed() {
  console.log('Conectando a TiDB Cloud para sembrar catálogo enriquecido...');
  const conn = await mysql.createConnection({
    host: 'gateway01.us-east-1.prod.aws.tidbcloud.com',
    port: 4000,
    user: '3KySBgPd8XsrakY.root',
    password: 'yfSQZUcLmGskC2VU',
    database: 'toystore',
    ssl: { minVersion: 'TLSv1.2', rejectUnauthorized: true }
  });

  console.log('Verificando productos existentes en TiDB...');
  const [existing] = await conn.query('SELECT nombre FROM productos');
  const existingNames = new Set(existing.map(r => r.nombre.toLowerCase().trim()));

  let insertados = 0;
  for (const prod of productosNuevos) {
    if (!existingNames.has(prod.nombre.toLowerCase().trim())) {
      await conn.query(
        'INSERT INTO productos (nombre, categoria, precio, nivel_juego, imagen, descripcion, stock) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [prod.nombre, prod.categoria, prod.precio, prod.nivel_juego, prod.imagen, prod.descripcion, prod.stock]
      );
      insertados++;
      console.log(`+ Insertado: ${prod.nombre} (${prod.categoria}) - $${prod.precio.toLocaleString()} COP`);
    } else {
      console.log(`= Ya existia: ${prod.nombre}`);
    }
  }

  const [total] = await conn.query('SELECT count(*) as total FROM productos');
  console.log(`Proceso completado. Total productos en TiDB Cloud: ${total[0].total} (nuevos insertados: ${insertados})`);
  await conn.end();
}

seed().catch(err => {
  console.error('Error sembrando catalogo:', err);
  process.exit(1);
});
