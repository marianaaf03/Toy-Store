const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  },
  connectionTimeout: 5000,
  greetingTimeout: 5000,
  socketTimeout: 5000
});

// Verificamos conexión de forma asíncrona sin bloquear el arranque del servidor
transporter.verify()
  .then(() => console.log('Servicio de correo verificado'))
  .catch((error) => {
    console.warn('Aviso: Verificacion SMTP no completada (' + error.message + '). El servidor continúa funcionando normalmente.');
  });

module.exports = transporter;