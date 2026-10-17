import { readFileSync, existsSync } from 'node:fs';
import { treasureListConfig } from '../src/treasure-list-config.mjs';
import { validateSignupUrl } from '../src/treasure-list.mjs';
const pages=['index.html','shop.html','women.html','men.html','little-gems.html','shoes.html','bags.html','accessories.html','home-treasures.html','hidden-gems.html','clearance.html','donations.html','promise.html','rewards.html','about.html','contact.html','policies.html','styles.css','manifest.json','README.md'];
const missing=pages.filter((p)=>!existsSync(p) && !existsSync(`src/${p}`));
if(missing.length) throw new Error(`Missing required files: ${missing.join(', ')}`);
const officialLogos=['assets/logos/main/treasured-twice-official.jpeg','assets/logos/little-gems/little-gems-official.png'];
const missingLogos=officialLogos.filter((p)=>!existsSync(p));
if(missingLogos.length) throw new Error(`Missing official logos: ${missingLogos.join(', ')}`);
const publicHtml=pages.filter(p=>p.endsWith('.html')).map(p=>readFileSync(p,'utf8')).join('\n');
const all=pages.map(p=>readFileSync(p,'utf8')).join('\n');
const required=['Treasured Twice','Once Loved, Treasured Again.',"Women's Collection","Men's Collection","Little Gems Children's Collection",'Hidden Gems','hello@shoptreasuredtwice.com','Clean Gem Promise','Treasure Chest Rewards'];
const absent=required.filter(t=>!all.includes(t));
if(absent.length) throw new Error(`Missing content: ${absent.join(', ')}`);
const forbidden=['Fresh Finds','fresh finds','Once loved. Treasured again.','Admin / Inventory Manager','Inventory Manager','href="admin.html"','href="inventory.html"','data-product-grid','data-inventory-form','Saved Request Bag','<form','data-save-form','data-form-status','(c) 2026','Warm Resale '+String.fromCharCode(66,111,117,116,105,113,117,101),'warm resale '+String.fromCharCode(98,111,117,116,105,113,117,101)];
const present=forbidden.filter(t=>all.includes(t));
if(present.length) throw new Error(`Forbidden content found: ${present.join(', ')}`);
const canonicalNavItems=[
  ['women.html',"Women's Collection"],
  ['men.html',"Men's Collection"],
  ['little-gems.html',"Little Gems Children's Collection"],
  ['home-treasures.html','Home Décor'],
  ['accessories.html','Accessories'],
  ['shoes.html','Shoes'],
  ['about.html','About'],
  ['contact.html','Contact']
];
const canonicalBottomNavItems=[
  ['women.html',"Women's Collection"],
  ['men.html',"Men's Collection"],
  ['little-gems.html',"Little Gems Children's Collection"],
  ['contact.html','Contact']
];
for(const page of pages.filter(p=>p.endsWith('.html'))){
  const html=readFileSync(page,'utf8');
  if(page !== 'index.html' && /treasure(?:\s|%20)+list|treasure-list/i.test(html)) throw new Error('Treasure List must appear only on the homepage: '+page);
  const nav=html.match(/<nav class="nav"[^>]*>([\s\S]*?)<\/nav>/);
  if(!nav) throw new Error('Missing primary navigation: '+page);
  if(!nav[0].includes('aria-label="Primary navigation"')) throw new Error('Primary navigation is missing its accessible label: '+page);
  const items=[...nav[1].matchAll(/<a href="([^"]+)">([^<]+)<\/a>/g)].map(m=>[m[1],m[2]]);
  if(JSON.stringify(items)!==JSON.stringify(canonicalNavItems)) throw new Error('Inconsistent primary navigation: '+page);
  const bottomNav=html.match(/<nav class="bottom-nav"[^>]*>([\s\S]*?)<\/nav>/);
  if(!bottomNav) throw new Error('Missing bottom navigation: '+page);
  const bottomItems=[...bottomNav[1].matchAll(/<a href="([^"]+)">([^<]+)<\/a>/g)].map(m=>[m[1],m[2]]);
  if(JSON.stringify(bottomItems)!==JSON.stringify(canonicalBottomNavItems)) throw new Error('Inconsistent bottom navigation: '+page);
}
const collectionsPage=readFileSync('shop.html','utf8');
const overviewMain=collectionsPage.match(/<main\b[^>]*>([\s\S]*?)<\/main>/)?.[1];
if(!overviewMain) throw new Error('Collections overview is missing its main content');
const overviewCards=[...overviewMain.matchAll(/<article\b[^>]*>([\s\S]*?)<\/article>/g)];
const expectedCollectionItems=canonicalNavItems.slice(0,6);
if(overviewCards.length!==expectedCollectionItems.length) throw new Error('Collections overview must contain exactly six collection cards');
for(const [index,card] of overviewCards.entries()){
  const [href,label]=expectedCollectionItems[index];
  const heading=card[1].match(/<h3>([^<]+)<\/h3>/)?.[1];
  const links=[...card[1].matchAll(/<a\b[^>]*href="([^" ]+)"[^>]*>([^<]+)<\/a>/g)].map(m=>[m[1],m[2]]);
  if(heading!==label || JSON.stringify(links)!==JSON.stringify([[href,'View '+label]])) throw new Error('Invalid collection overview card: '+label);
}
const overviewLinks=[...overviewMain.matchAll(/href="([^" ]+)"/g)].map(m=>m[1]);
if(JSON.stringify(overviewLinks)!==JSON.stringify(expectedCollectionItems.map(item=>item[0]))) throw new Error('Collections overview must link only to its six collections');
const retiredOverviewLinks=['bags.html','hidden-gems.html','clearance.html'];
if(retiredOverviewLinks.some(link=>collectionsPage.includes('href="'+link+'"'))) throw new Error('Collections overview contains a retired specialty section link');
const forbiddenPublic=['Static preview','static preview','Public preview','public preview','app-like','phone-app style','Launch Preview','launch preview','Coming Soon','coming soon','Website Launch','launch updates','sneak peek','Sneak peek','online checkout is being prepared','not yet available','will appear here when available','public item listings listings'];
const publicCopyFound=forbiddenPublic.filter(text=>publicHtml.includes(text));
if(publicCopyFound.length) throw new Error(`Outdated public copy found: ${publicCopyFound.join(', ')}`);
const expectedFooter='© 2026 Treasured Twice LLC • Once Loved, Treasured Again.';
const pagesWithOldFooter=pages.filter(page=>page.endsWith('.html')&&!readFileSync(page,'utf8').includes(expectedFooter));
if(pagesWithOldFooter.length) throw new Error(`Pages missing the approved footer: ${pagesWithOldFooter.join(', ')}`);
if(!readFileSync('contact.html','utf8').includes('class="section card-grid contact-grid"')) throw new Error('Contact page is missing its two-column layout');
if(!readFileSync('index.html','utf8').includes('assets/logos/main/treasured-twice-official.jpeg')) throw new Error('Homepage is missing its official main logo');
for(const page of pages.filter(p=>p.endsWith('.html'))){
  const html=readFileSync(page,'utf8');
  const header=html.match(/<header\b[^>]*>([\s\S]*?)<\/header>/)?.[1];
  if(!header) throw new Error('Missing site header: '+page);
  if(/<img\b|brand-lockup|Treasured Twice LLC|Once Loved, Treasured Again\./.test(header)) throw new Error('Header contains a duplicate logo or tagline: '+page);
}
if(!readFileSync('little-gems.html','utf8').includes('assets/logos/little-gems/little-gems-official.png')) throw new Error('Little Gems page is missing its official logo');
const forbiddenFiles=['admin.html','inventory.html','product.html','products.js','script.js'];
const exposed=forbiddenFiles.filter(existsSync);
if(exposed.length) throw new Error(`Public inventory/admin preview files should not exist: ${exposed.join(', ')}`);
const hrefs=[...publicHtml.matchAll(/href="([^"]+)"/g)].map(m=>m[1]).filter(h=>!h.startsWith('#')&&!h.startsWith('mailto:')&&!h.startsWith('http'));
const broken=hrefs.filter(h=>!existsSync(h));
if(broken.length) throw new Error(`Broken links: ${[...new Set(broken)].join(', ')}`);
const sources=[...publicHtml.matchAll(/src="([^"]+)"/g)].map(m=>m[1]);
const missingSources=sources.filter(src=>!src.startsWith('https:') && !existsSync(src));
if(missingSources.length) throw new Error(`Missing assets/scripts: ${[...new Set(missingSources)].join(', ')}`);
const home=readFileSync('index.html','utf8');
if((home.match(/id="treasure-list"/g)||[]).length !== 1 || !home.includes('<h2 id="treasure-list-title">Join the Treasure List</h2>')) throw new Error('Homepage must have exactly one titled Treasure List section');
if(!/<button\b[^>]*id="treasure-list-pending"[^>]*\sdisabled>/.test(home)) throw new Error('Signup must be disabled without JavaScript or verified configuration');
const signupLink=home.match(/<a\b[^>]*id="treasure-list-link"[^>]*>/)?.[0];
if(!signupLink || !/\shidden>/.test(signupLink) || /\shref=/.test(signupLink)) throw new Error('Signup link must start hidden without a destination');
if(!home.includes('type="module" src="src/treasure-list.mjs"')) throw new Error('Missing homepage signup module');
if(treasureListConfig.hostedSignupUrl && !validateSignupUrl(treasureListConfig.hostedSignupUrl)) throw new Error('Unsupported or unsafe hosted signup URL');
if(typeof treasureListConfig.signupVerified !== 'boolean' || (treasureListConfig.signupVerified && !validateSignupUrl(treasureListConfig.hostedSignupUrl))) throw new Error('Verified signup requires a valid hosted form URL');
const contact=readFileSync('contact.html','utf8');
for(const href of ['mailto:hello@shoptreasuredtwice.com?subject=Item%20Request','mailto:hello@shoptreasuredtwice.com?subject=Customer%20Question']) {
  if(!contact.includes(`href="${href}"`)) throw new Error('Missing customer contact option: '+href);
}
console.log('Static site QA check passed.');
