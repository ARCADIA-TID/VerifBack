# Vérif237 — Backend (Node.js)

API Express/TypeScript de l'observatoire citoyen Vérif237, exécutée comme un serveur Node.js classique (compilée en JavaScript, sans `tsx` en production).

## Prérequis
- Node.js ≥ 20
- npm ou pnpm

## Installation
```bash
cp .env.example .env     # puis renseigner GEMINI_API_KEY (ou OPENAI_API_KEY) et CORS_ORIGINS
npm install              # ou : pnpm install
```

## Développement
```bash
npm run dev              # rechargement automatique (tsx watch)
npm run lint             # vérification des types
npm test                 # tests (base isolée dans un dossier temporaire)
```

## Production
```bash
npm run build            # compile src/ vers dist/
npm start                # node dist/server.js
```
Le serveur écoute sur `HOST:PORT` (par défaut `0.0.0.0:3001`), expose `GET /api/health` et s'arrête proprement sur `SIGTERM`/`SIGINT`.
Derrière un reverse proxy (Nginx, Render, Railway…), définir `TRUST_PROXY=1`.

## Données
- `seed/verif237_db.json` : base de départ versionnée (jamais modifiée).
- `data/` (créé automatiquement, ignoré par git) : base JSON d'exécution et journal d'audit `verif237_audit.txt`. Au premier lancement, la base est copiée depuis le seed.
- Le dossier se change avec `DATA_DIR`. En production, placez-le sur un **disque persistant** (volume Docker, disque Render, etc.), sinon les données sont perdues à chaque redéploiement.

## Variables d'environnement
Voir `.env.example` : `AI_PROVIDER`, `GEMINI_API_KEY`, `OPENAI_API_KEY`, `OPENAI_MODEL`, `PORT`, `HOST`, `TRUST_PROXY`, `DATA_DIR`, `SEED_DB_FILE`, `CORS_ORIGINS`.
# VerifBack
