const express = require('express');
const router = express.Router();
const contactoController = require('../controllers/contacto.controller');
const { 
  registro, 
  login, 
  forgotPassword, 
  resetPassword, 
  googleLogin, 
  sendGoogleVerification, 
  verifyGoogleMock, 
  getMe, 
  logout, 
  setManualPassword,
  actualizarPerfil,
  cambiarContrasena,
  actualizarAvatarHat,
  actualizarFotoPerfil,
  getUsuariosComunidad,
  checkUsernameAvailability,
  getPerfilUsuario,
  seguirUsuario,
  getNotificaciones,
  marcarNotificacionesLeidas,
  toggleGuardado,
  getMisGuardados
} = require('../controllers/auth.controller');

router.post('/registro', registro);
router.post('/contacto', contactoController.enviarMensaje);
router.post('/login', login);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);
router.post('/google-login', googleLogin);
router.post('/google-send-code', sendGoogleVerification);
router.post('/google-register', verifyGoogleMock);
router.post('/set-password', setManualPassword);
router.get('/me', getMe);
router.get('/usuarios', getUsuariosComunidad);
router.get('/check-username', checkUsernameAvailability);
router.get('/perfil/:username', getPerfilUsuario);
router.post('/seguir/:idUsuario', seguirUsuario);
router.get('/guardados', getMisGuardados);
router.post('/guardados/:idProducto', toggleGuardado);
router.get('/notificaciones', getNotificaciones);
router.put('/notificaciones/leer', marcarNotificacionesLeidas);
router.post('/logout', logout);
router.put('/perfil', actualizarPerfil);
router.post('/cambiar-contrasena', cambiarContrasena);
router.put('/avatar-hat', actualizarAvatarHat);
router.put('/foto-perfil', actualizarFotoPerfil);

module.exports = router;