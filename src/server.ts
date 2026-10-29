import 'dotenv/config';
import type http from 'node:http';
import { app } from './app.js';
import { verificationQueue } from './verificationQueue.js';

const PORT = Number(process.env.PORT) || 3001;
const HOST = process.env.HOST || '0.0.0.0';
const SHUTDOWN_TIMEOUT_MS = 10_000;

export function startServer(): http.Server {
  // Derrière un reverse proxy (Nginx, Render, Railway…) : TRUST_PROXY=1 pour lire la vraie IP cliente
  if (process.env.TRUST_PROXY) {
    app.set('trust proxy', /^\d+$/.test(process.env.TRUST_PROXY) ? Number(process.env.TRUST_PROXY) : process.env.TRUST_PROXY);
  }
  app.disable('x-powered-by');

  const server = app.listen(PORT, HOST, () => {
    console.log(`[VERIF237] API backend running on http://${HOST}:${PORT} (${process.env.NODE_ENV || 'development'})`);
    verificationQueue.resumePendingTasks();
  });

  // Arrêt propre : on cesse d'accepter des connexions puis on quitte
  let shuttingDown = false;
  const shutdown = (signal: string) => {
    if (shuttingDown) return;
    shuttingDown = true;
    console.log(`[VERIF237] ${signal} reçu, arrêt en cours…`);
    const force = setTimeout(() => {
      console.error('[VERIF237] Arrêt forcé (délai dépassé).');
      process.exit(1);
    }, SHUTDOWN_TIMEOUT_MS);
    force.unref();
    server.close((err) => {
      if (err) {
        console.error('[VERIF237] Erreur à la fermeture du serveur :', err);
        process.exit(1);
      }
      process.exit(0);
    });
  };
  process.on('SIGTERM', () => shutdown('SIGTERM'));
  process.on('SIGINT', () => shutdown('SIGINT'));

  process.on('unhandledRejection', (reason) => {
    console.error('[VERIF237] unhandledRejection :', reason);
  });
  process.on('uncaughtException', (err) => {
    console.error('[VERIF237] uncaughtException :', err);
    shutdown('uncaughtException');
  });

  return server;
}

startServer();
