// À importer EN PREMIER dans chaque test : isole la base et le journal d'audit
// dans un dossier temporaire pour ne jamais toucher aux données réelles ni au seed.
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

process.env.DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), 'verif237-test-'));
