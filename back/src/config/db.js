const mysql = require('mysql2/promise');
require('dotenv').config();

const poolConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

// Si es TiDB Cloud o se especifica DB_SSL, habilitar TLS/SSL
if (process.env.DB_SSL === 'true' || String(process.env.DB_PORT) === '4000') {
  poolConfig.ssl = {
    minVersion: 'TLSv1.2',
    rejectUnauthorized: true
  };
}

const pool = mysql.createPool(poolConfig);

// Probar la conexión al arrancar
pool.getConnection()
  .then(connection => {
    console.log('✅ Conectado a la Base de Datos (' + (poolConfig.ssl ? 'TiDB Cloud SSL' : 'MySQL local') + ')');
    connection.release();
  })
  .catch(err => {
    console.error('❌ Error Base de Datos: No se pudo conectar.');
    console.error(`   Detalle: ${err.message}`);
  });

// Wrapper opcional para mantener compatibilidad si algunas consultas usaban db.query sin await [rows]
// Aunque mysql2/promise devuelve [rows, fields] nativamente en pool.query()
const db = {
  query: async (text, params) => {
    // Si la aplicación destructureaba con const [rows] = await db.query(...), esto devolverá directamente un arreglo.
    return await pool.query(text, params);
  }
};

module.exports = db;

module.exports = db;