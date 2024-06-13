import * as fs from 'fs';
import path from 'path';

const configFile =
  process.env.NODE_ENV === 'production' ? 'acms.production.json' : 'acms.json';

const file = fs.readFileSync(path.join(process.cwd(), configFile), 'utf8');

export const siteConfig = JSON.parse(file);
