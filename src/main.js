const products = [
  { name: 'Cozy Knit Cardigan', category: 'Women', price: '$8–$14', condition: 'Gently loved' },
  { name: 'Everyday Denim', category: 'Men', price: '$10–$18', condition: 'Good condition' },
  { name: 'Playday Outfit Set', category: 'Kids', price: '$5–$9', condition: 'Freshly checked' },
  { name: 'Baby Essentials Bundle', category: 'Baby', price: '$6–$12', condition: 'Clean and soft' },
  { name: 'Statement Tote', category: 'Accessories', price: '$7–$15', condition: 'Light wear' },
  { name: 'Tabletop Decor Find', category: 'Home', price: '$4–$16', condition: 'Ready to display' },
  { name: 'Hidden Gem Feature', category: 'Hidden Gems', price: 'Special find', condition: 'Extra special' },
];

document.getElementById('product-grid').innerHTML = products.map((product) => `
  <article class="product-card">
    <div class="product-image">✓</div>
    <p class="category">${product.category}</p>
    <h3>${product.name}</h3>
    <p><strong>Price:</strong> ${product.price}</p>
    <p><strong>Condition:</strong> ${product.condition}</p>
    <p class="clean-note"><span>✓</span> Cleaned / disinfected before floor placement when appropriate.</p>
  </article>
`).join('');
