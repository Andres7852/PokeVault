document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('catalog-container');
    if (!container) return;

    renderCatalog(productosPokemon);
});

function renderCatalog(items) {
    const container = document.getElementById('catalog-container');
    if (!container) return;
    container.innerHTML = '';

    const cart = JSON.parse(localStorage.getItem('cartItems')) || [];

    items.forEach(prod => {
        const cartItem = cart.find(item => item.id === prod.id);
        const quantity = cartItem ? cartItem.cantidad : 0;

        const card = document.createElement('article');
        card.className = 'product-card';

        let buttonHTML = '';
        if (quantity > 0) {
            buttonHTML = `
        <div class="quantity-controls">
          <button class="btn-qty" onclick="changeQuantity(${prod.id}, -1)">-</button>
          <span class="qty-count">${quantity}</span>
          <button class="btn-qty" onclick="changeQuantity(${prod.id}, 1)">+</button>
        </div>
      `;
        } else {
            buttonHTML = `
        <button class="btn-primary" onclick="changeQuantity(${prod.id}, 1)">Agregar al Carrito</button>
      `;
        }

        card.innerHTML = `
      <img src="${prod.imagen}" alt="${prod.nombre}">
      <div class="product-info">
        <span class="product-tag">${prod.categoria}</span>
        <h3>${prod.nombre}</h3>
        <p style="font-size: 0.85rem; color: var(--text-muted);">${prod.descripcion}</p>
        <div class="product-price">$${prod.precio.toFixed(2)}</div>
        ${buttonHTML}
      </div>
    `;
        container.appendChild(card);
    });
}

function changeQuantity(id, delta) {
    let cart = JSON.parse(localStorage.getItem('cartItems')) || [];
    const product = productosPokemon.find(p => p.id === id);
    const itemIndex = cart.findIndex(item => item.id === id);

    if (itemIndex > -1) {
        cart[itemIndex].cantidad += delta;
        if (cart[itemIndex].cantidad <= 0) {
            cart.splice(itemIndex, 1);
        }
    } else if (delta > 0 && product) {
        cart.push({ ...product, cantidad: 1 });
    }

    localStorage.setItem('cartItems', JSON.stringify(cart));
    if (typeof updateCartBadge === 'function') updateCartBadge();

    const activeBtn = document.querySelector('.filter-btn.active');
    const activeCat = activeBtn ? activeBtn.getAttribute('data-category') : 'todos';
    const itemsToRender = activeCat === 'todos'
        ? productosPokemon
        : productosPokemon.filter(p => p.categoria === activeCat);

    renderCatalog(itemsToRender);
}



document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('.filter-btn');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            filterButtons.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');

            const cat = e.target.getAttribute('data-category');
            if (cat === 'todos') {
                renderCatalog(productosPokemon);
            } else {
                const filtered = productosPokemon.filter(p => p.categoria === cat);
                renderCatalog(filtered);
            }
        });
    });
});