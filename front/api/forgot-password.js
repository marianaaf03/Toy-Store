const nodemailer = require('nodemailer');
const crypto = require('crypto');

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: (process.env.EMAIL_USER || 'toystorexoxo@gmail.com').trim(),
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
    return res.status(200).json({ status: 'API Forgot Password activa.' });
  }

  try {
    const { email } = req.body || {};
    if (!email) {
      return res.status(400).json({ error: 'El correo electrónico es obligatorio.' });
    }

    const token = crypto.randomBytes(32).toString('hex');
    const frontendBase = 'https://front-psi-five.vercel.app';
    const resetLink = `${frontendBase}/reset-password/${token}`;

    await transporter.sendMail({
      from: `"Toy Store Oficial" <toystorexoxo@gmail.com>`,
      to: email,
      subject: 'Recupera tu contraseña - Toy Store',
      html: `
        <div style="font-family: Arial, sans-serif; padding: 24px; border-radius: 12px; background: #f8fafc; border: 1px solid #e2e8f0; max-width: 550px; color: #1e293b;">
          <h2 style="color: #1e3a8a; margin-top: 0; border-bottom: 2px solid #a6d4f2; padding-bottom: 8px;">
            Restablecer contraseña en Toy Store
          </h2>
          <p>Hola,</p>
          <p>Hemos recibido una solicitud para restablecer la contraseña asociada a tu cuenta <strong>${email}</strong> en Toy Store.</p>
          <p style="margin: 24px 0; text-align: center;">
            <a href="${resetLink}" style="background: #1e3a8a; color: white; padding: 14px 28px; text-decoration: none; border-radius: 9999px; font-weight: bold; display: inline-block; box-shadow: 0 4px 12px rgba(30,58,138,0.25);">
              Restablecer mi Contraseña
            </a>
          </p>
          <p style="font-size: 12px; color: #64748b; line-height: 1.5;">
            Si el botón no funciona, copia y pega este enlace en tu navegador:<br />
            <a href="${resetLink}" style="color: #1e3a8a; word-break: break-all;">${resetLink}</a>
          </p>
          <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 16px 0;" />
          <p style="font-size: 11px; color: #94a3b8; text-align: center;">
            Si tú no solicitaste este cambio, puedes ignorar este correo de forma segura.
          </p>
        </div>
      `
    });

    // Enviar también notificación a toystorexoxo@gmail.com
    if (email.toLowerCase() !== 'toystorexoxo@gmail.com') {
      try {
        await transporter.sendMail({
          from: `"Toy Store Sistema" <toystorexoxo@gmail.com>`,
          to: 'toystorexoxo@gmail.com',
          subject: `Aviso: Solicitud de Recuperación para ${email}`,
          html: `<p>Se ha solicitado restablecimiento de contraseña para: <strong>${email}</strong></p><p>Enlace generado: <a href="${resetLink}">${resetLink}</a></p>`
        });
      } catch (e2) {
        console.warn('Aviso copia admin:', e2.message);
      }
    }

    return res.status(200).json({
      ok: true,
      message: 'Si el correo está registrado en Toy Store, recibirás las instrucciones de recuperación en los próximos minutos.'
    });
  } catch (error) {
    console.error('Error enviando correo de recuperacion:', error.message);
    return res.status(500).json({
      ok: false,
      error: 'Error al enviar recuperación: ' + error.message
    });
  }
};
