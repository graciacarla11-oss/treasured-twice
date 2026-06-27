const products = [
  { name: 'Newborn Welcome Bundle', category: 'Little Gems • Newborn', price: '$6–$12', condition: 'Washed and inspected' },
  { name: 'Soft Playday Outfit', category: 'Little Gems • 2T–5T', price: '$5–$9', condition: 'Clean and ready' },
  { name: 'Kids Sneaker Find', category: 'Little Gems • Shoes', price: '$7–$14', condition: 'Disinfected soles' },
  { name: 'Storytime Pajama Set', category: 'Little Gems • 6–12', price: '$4–$8', condition: 'Freshly checked' },
  { name: 'Everyday Denim', category: 'Treasured Twice LLC • Adult', price: '$10–$18', condition: 'Good condition' },
  { name: 'Statement Tote', category: 'Treasured Twice LLC • Accessories', price: '$7–$15', condition: 'Light wear' },
  { name: 'Tabletop Decor Find', category: 'Treasured Twice LLC • Home', price: '$4–$16', condition: 'Ready to display' },
  { name: 'Hidden Gem Feature', category: 'Treasured Twice LLC • Hidden Gems', price: 'Special find', condition: 'Extra special' },
];

const productGrid = document.getElementById('product-grid');

productGrid.innerHTML = products.map((product) => `
  <article class="product-card">
    <div class="product-image">◇</div>
    <p class="category">${product.category}</p>
    <h3>${product.name}</h3>
    <p><strong>Price:</strong> ${product.price}</p>
    <p><strong>Condition:</strong> ${product.condition}</p>
    <p class="clean-note"><span>✓</span> Cleaned, washed, or disinfected before floor placement when appropriate.</p>
  </article>
`).join('');
