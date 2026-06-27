import { readFileSync } from 'node:fs';

const html = readFileSync('index.html', 'utf8');
const required = [
  'Treasured² LLC',
  'Clean resale, fair prices, hidden gems worth loving again.',
  'Little Gems by Treasured²',
  'Rewards',
  'Donations',
  'Staff tools foundation',
];
const missing = required.filter((text) => !html.includes(text));
if (missing.length) {
  console.error(`Missing required content: ${missing.join(', ')}`);
  process.exit(1);
}
console.log('Static site content check passed.');
