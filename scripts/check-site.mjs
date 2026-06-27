import { readFileSync } from 'node:fs';

const html = readFileSync('index.html', 'utf8');
const required = [
  'Treasured Twice LLC',
  'Clean resale, fair prices, hidden gems worth loving again.',
  'Little Gems by Treasured²',
  'Rewards',
  'Donations',
  'Treasured Twice LLC staff tools foundation',
];
const missing = required.filter((text) => !html.includes(text));
if (missing.length) {
  console.error(`Missing required content: ${missing.join(', ')}`);
  process.exit(1);
}

const forbiddenMainNames = [
  'Little Gems, a Treasured Twice LLC boutique',
  'Treasured² LLC',
  'Treasured² Little Gems',
  'Twice Treasured',
];
const presentForbiddenNames = forbiddenMainNames.filter((text) => html.includes(text));
if (presentForbiddenNames.length) {
  console.error(`Forbidden main business name found: ${presentForbiddenNames.join(', ')}`);
  process.exit(1);
}

console.log('Static site content check passed.');
