const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const authRoutes = require('./src/routes/auth.routes');
const productosRoutes = require('./src/routes/productos.routes');
const chatRoutes = require('./src/routes/chat.routes');
const confesionesRoutes = require('./src/routes/confesiones.routes');
const contactoRoutes = require('./src/routes/contacto.routes');

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  process.env.FRONTEND_URL
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    // Permitir peticiones sin origin o desde Vercel / localhost
    if (!origin || allowedOrigins.includes(origin) || origin.endsWith('.vercel.app')) {
      return callback(null, true);
    }
    return callback(null, true);
  },
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());

// Rutas
app.use('/auth', authRoutes);
app.use('/productos', productosRoutes);
app.use('/chat', chatRoutes);
app.use('/confesiones', confesionesRoutes);
app.use('/contacto', contactoRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({ message: 'API Toy Store funcionando correctamente' });
});

// Middleware de manejo de errores global
app.use((err, req, res, next) => {
  console.error('Error no controlado:', err);
  res.status(500).json({ error: 'Error interno en el servidor', detalle: err.message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});