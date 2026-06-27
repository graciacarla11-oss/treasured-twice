// Phase 1 preview only.
// The redesigned homepage is static and does not add checkout, login, authentication, payments, or a database.

const productGrid = document.getElementById('product-grid');

if (productGrid) {
  const products = [
    { name: 'Newborn Welcome Bundle', category: 'Little Gems • Newborn', price: '$6–$12', condition: 'Washed and inspected' },
    { name: 'Everyday Denim', category: 'Treasured Twice LLC • Adult', price: '$10–$18', condition: 'Good condition' },
    { name: 'Statement Tote', category: 'Treasured Twice LLC • Accessories', price: '$7–$15', condition: 'Light wear' },
    { name: 'Hidden Gem Feature', category: 'Treasured Twice LLC • Hidden Gems', price: 'Special find', condition: 'Extra special' },
  ];

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
}

const previewNote = document.getElementById('preview-note');
const noteStatus = document.getElementById('note-status');

if (previewNote && noteStatus) {
  const noteKey = 'treasured-twice-preview-note';
  const savedNote = window.localStorage.getItem(noteKey);

  if (savedNote) {
    previewNote.value = savedNote;
    noteStatus.textContent = 'Preview note saved in this browser only.';
  }

  previewNote.addEventListener('input', () => {
    window.localStorage.setItem(noteKey, previewNote.value);
    noteStatus.textContent = previewNote.value
      ? 'Preview note saved in this browser only.'
      : 'No note saved yet.';
  });
}
