const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || 'toystorexoxo@gmail.com',
    pass: process.env.EMAIL_PASSWORD || 'wure smub xunr upjo'
  },
  connectionTimeout: 10000,
  greetingTimeout: 10000,
  socketTimeout: 10000
});

// Verificamos conexión de forma asíncrona sin bloquear el arranque del servidor
transporter.verify()
  .then(() => console.log('Servicio de correo verificado'))
  .catch((error) => {
    console.warn('Aviso: Verificacion SMTP no completada (' + error.message + '). El servidor continúa funcionando normalmente.');
  });

module.exports = transporter;