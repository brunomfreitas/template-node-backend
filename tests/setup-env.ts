// tests/setup-env.ts
import 'dotenv/config';

process.env.PORT = process.env.PORT || '3000';
process.env.NODE_ENV = process.env.NODE_ENV || 'test';
process.env.JWT_SECRET = process.env.JWT_SECRET || 'test-secret';
process.env.JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1d';

// Ajuste os valores conforme seu ambiente local de testes:
process.env.DATABASE_URL = process.env.DATABASE_URL || 'postgresql://cognitio_user:cognitio_password@localhost:5433/cognitio?schema=cognitio';