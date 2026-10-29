import path from 'node:path';

/**
 * Configuration centrale des chemins et du serveur (Node.js).
 * Les valeurs viennent des variables d'environnement (voir .env.example).
 *
 * - SEED_DB_FILE : base de départ versionnée (lecture seule), copiée au premier lancement.
 * - DATA_DIR     : dossier des données d'exécution (base JSON + journal d'audit), non versionné.
 */
export const DATA_DIR = path.resolve(process.env.DATA_DIR || path.join(process.cwd(), 'data'));
export const SEED_DB_FILE = path.resolve(process.env.SEED_DB_FILE || path.join(process.cwd(), 'seed', 'verif237_db.json'));
export const DB_FILE_PATH = path.join(DATA_DIR, 'verif237_db.json');
export const AUDIT_FILE_PATH = path.join(DATA_DIR, 'verif237_audit.txt');
