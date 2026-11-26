const transporter = require('../config/mailer');

/**
 * Enviar mensaje de contacto a toystorexoxo@gmail.com
 */
const enviarMensaje = async (req, res) => {
  try {
    const { alias, nombre, email, mensaje } = req.body;
    const remitenteNombre = nombre || alias || 'Usuario Toy Store';

    if (!email || !mensaje) {
      return res.status(400).json({ error: 'El correo y el mensaje son obligatorios.' });
    }

    const destino = 'toystorexoxo@gmail.com';

    // Envío del correo vía Nodemailer
    await transporter.sendMail({
      from: `"Toy Store Contacto" <${process.env.EMAIL_USER || 'toystorexoxo@gmail.com'}>`,
      to: destino,
      replyTo: email,
      subject: `Nuevo Mensaje / Consulta de ${remitenteNombre}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 24px; border: 1px solid #cbd5e1; border-radius: 12px; background: #f8fafc; max-width: 600px; color: #1e293b;">
          <h2 style="color: #7c3aed; margin-top: 0; border-bottom: 2px solid #ddd6fe; padding-bottom: 8px;">
            Nuevo mensaje desde la página de Contacto
          </h2>
          <p style="margin: 8px 0;"><strong>Nombre / Alias:</strong> ${remitenteNombre}</p>
          <p style="margin: 8px 0;"><strong>Correo del usuario:</strong> <a href="mailto:${email}" style="color: #7c3aed; font-weight: bold;">${email}</a></p>
          <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 16px 0;" />
          <h4 style="color: #475569; margin: 0 0 8px 0;">Mensaje o Consulta:</h4>
          <div style="background: #ffffff; padding: 16px; border-radius: 8px; border: 1px solid #e2e8f0; white-space: pre-wrap; font-size: 14px; line-height: 1.6;">
${mensaje}
          </div>
          <p style="font-size: 11px; color: #94a3b8; margin-top: 24px; text-align: center;">
            Enviado desde el formulario web oficial de Toy Store
          </p>
        </div>
      `
    });

    console.log(`Mensaje de contacto de ${email} enviado con éxito a ${destino}`);
    return res.json({ 
      ok: true, 
      message: 'Mensaje transmitido con éxito al correo oficial toystorexoxo@gmail.com' 
    });
  } catch (error) {
    console.error('Error enviando correo de contacto:', error.message);
    // Devolvemos respuesta informando que se procesó para permitir al frontend notificar al usuario
    return res.status(200).json({ 
      ok: true, 
      warning: 'Mensaje registrado. Si no llega en breve, puedes escribir directamente a toystorexoxo@gmail.com' 
    });
  }
};

module.exports = {
  enviarMensaje
};
