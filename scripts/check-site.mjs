import { readFileSync } from 'node:fs';

const html = readFileSync('index.html', 'utf8');
const required = ['Treasured Twice LLC', 'Preloved Finds • Fair Prices • Hidden Gems', 'Shop / Inventory Preview', 'Rewards', 'Donations', 'Admin Dashboard Placeholder'];
const missing = required.filter((text) => !html.includes(text));
if (missing.length) {
  console.error(`Missing required content: ${missing.join(', ')}`);
  process.exit(1);
}
console.log('Static site content check passed.');
