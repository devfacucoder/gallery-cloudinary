import rateLimit from 'express-rate-limit';

// Configuración de Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // Limita cada IP a 100 solicitudes por "window" (15 minutos)
  message: 'Demasiadas solicitudes, por favor inténtalo de nuevo más tarde.',
});

export default limiter;