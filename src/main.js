// Phase 1 preview only.
// The redesigned homepage is static and does not add checkout, login, authentication, payments, or a database.

const productGrid = document.getElementById('product-grid');

if (productGrid) {
  const products = [
    { name: 'Pearl-Tag Blouse', category: 'New Arrivals • Women', price: '$8–$16', condition: 'Curated find' },
    { name: 'Little Gems Play Bundle', category: 'Kids/Baby/Youth • Little Gems by Treasured²', price: '$5–$14', condition: 'Washed and checked when appropriate' },
    { name: 'Cozy Home Basket', category: 'Home Treasures • Decor', price: '$6–$18', condition: 'Ready-for-review notes planned' },
    { name: 'Weekend Tote Find', category: 'Accessories • Treasured Twice LLC', price: '$7–$15', condition: 'Good condition with light wear notes' },
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
