const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || 'toystorexoxo@gmail.com',
    pass: (process.env.EMAIL_PASSWORD || 'wuresmubxunrupjo').replace(/\s+/g, '')
  }
});

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(200).json({ status: 'API Contacto activa y lista para recibir mensajes.' });
  }

  try {
    const { alias, nombre, email, mensaje } = req.body || {};
    const remitenteNombre = nombre || alias || 'Usuario Toy Store';
    const remitenteEmail = email || 'anonimo@toystore.com';

    if (!mensaje) {
      return res.status(400).json({ error: 'El mensaje es obligatorio.' });
    }

    const destino = 'toystorexoxo@gmail.com';

    await transporter.sendMail({
      from: `"Toy Store Contacto" <toystorexoxo@gmail.com>`,
      to: destino,
      replyTo: remitenteEmail,
      subject: `Nuevo Mensaje / Consulta de ${remitenteNombre}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 24px; border: 1px solid #cbd5e1; border-radius: 12px; background: #f8fafc; max-width: 600px; color: #1e293b;">
          <h2 style="color: #1e3a8a; margin-top: 0; border-bottom: 2px solid #a6d4f2; padding-bottom: 8px;">
            Nuevo mensaje desde la página de Contacto
          </h2>
          <p style="margin: 8px 0;"><strong>Nombre / Alias:</strong> ${remitenteNombre}</p>
          <p style="margin: 8px 0;"><strong>Correo del remitente:</strong> <a href="mailto:${remitenteEmail}" style="color: #1e3a8a; font-weight: bold;">${remitenteEmail}</a></p>
          <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 16px 0;" />
          <h4 style="color: #1e3a8a; margin: 0 0 8px 0;">Mensaje o Consulta:</h4>
          <div style="background: #ffffff; padding: 16px; border-radius: 8px; border: 1px solid #e2e8f0; white-space: pre-wrap; font-size: 14px; line-height: 1.6;">
${mensaje}
          </div>
          <p style="font-size: 11px; color: #94a3b8; margin-top: 24px; text-align: center;">
            Enviado desde el formulario oficial de Toy Store
          </p>
        </div>
      `
    });

    console.log(`Mensaje enviado con éxito a ${destino}`);
    return res.status(200).json({
      ok: true,
      message: 'Mensaje transmitido con éxito al correo oficial toystorexoxo@gmail.com'
    });
  } catch (error) {
    console.error('Error enviando correo de contacto:', error.message);
    return res.status(500).json({
      ok: false,
      error: 'Error al enviar el correo: ' + error.message
    });
  }
};
