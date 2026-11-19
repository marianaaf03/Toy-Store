const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');

const config = {
  host: 'gateway01.us-east-1.prod.aws.tidbcloud.com',
  port: 4000,
  user: '3KySBgPd8XsrakY.root',
  password: 'yfSQZUcLmGskC2VU',
  ssl: {
    minVersion: 'TLSv1.2',
    rejectUnauthorized: true
  },
  multipleStatements: true
};

async function importDatabase() {
  console.log('Iniciando conexion con TiDB Cloud...');
  let connection;
  try {
    connection = await mysql.createConnection(config);
    console.log('Conexion exitosa con TiDB Cloud.');

    // 1. Crear base de datos toystore si no existe
    console.log('Creando base de datos `toystore` si no existe...');
    await connection.query('CREATE DATABASE IF NOT EXISTS `toystore` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;');
    await connection.query('USE `toystore`;');
    console.log('Usando base de datos `toystore`.');

    // 2. Leer archivo SQL de respaldo
    const sqlPath = path.resolve(__dirname, '../../toystore_backup_2025.sql');
    console.log(`Leyendo archivo de respaldo: ${sqlPath}`);
    if (!fs.existsSync(sqlPath)) {
      throw new Error(`Archivo no encontrado en ${sqlPath}`);
    }

    let sql = fs.readFileSync(sqlPath, 'utf8');

    // Remover directivas conflictivas de dump local si existen
    // (algunos dumps tienen SET @@SESSION... o CREATE DATABASE redundante)
    console.log('Ejecutando script SQL...');
    await connection.query(sql);
    console.log('Script SQL ejecutado con exito.');

    // 3. Verificar tablas creadas
    const [tables] = await connection.query('SHOW TABLES;');
    console.log('Tablas en la base de datos `toystore`:');
    console.table(tables);

    for (const row of tables) {
      const tableName = Object.values(row)[0];
      const [countResult] = await connection.query(`SELECT COUNT(*) as total FROM \`${tableName}\``);
      console.log(`- Tabla ${tableName}: ${countResult[0].total} registros`);
    }

    console.log('IMPORTACION COMPLETADA SATISFACTORIAMENTE.');
  } catch (error) {
    console.error('Error durante la importacion a TiDB:', error);
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

importDatabase();
