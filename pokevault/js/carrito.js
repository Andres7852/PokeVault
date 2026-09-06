document.addEventListener('DOMContentLoaded', () => {
    renderCart();

    const clearBtn = document.getElementById('clear-cart-btn');
    if (clearBtn) {
        clearBtn.addEventListener('click', () => {
            localStorage.removeItem('cartItems');
            renderCart();
            if (typeof updateCartBadge === 'function') updateCartBadge();
        });
    }
});

function renderCart() {
    const cartContainer = document.getElementById('cart-items-list');
    const totalPriceEl = document.getElementById('cart-total-price');
    if (!cartContainer) return;

    const cart = JSON.parse(localStorage.getItem('cartItems')) || [];

    if (cart.length === 0) {
        cartContainer.innerHTML = '<p style="padding: 1rem;">El carrito está vacío.</p>';
        if (totalPriceEl) totalPriceEl.textContent = '$0.00';
        return;
    }

    cartContainer.innerHTML = '';
    let total = 0;

    cart.forEach((item) => {
        const itemSubtotal = item.precio * item.cantidad;
        total += itemSubtotal;

        const row = document.createElement('div');
        row.className = 'cart-item-row';
        row.innerHTML = `
      <div class="cart-item-info">
        <strong>${item.nombre}</strong>
        <div style="font-size: 0.85rem; color: var(--text-muted);">$${item.precio.toFixed(2)} c/u</div>
      </div>
      <div class="quantity-controls">
        <button class="btn-qty" onclick="modifyCartQty(${item.id}, -1)">-</button>
        <span class="qty-count">${item.cantidad}</span>
        <button class="btn-qty" onclick="modifyCartQty(${item.id}, 1)">+</button>
      </div>
      <div style="font-weight: bold; width: 80px; text-align: right;">
        $${itemSubtotal.toFixed(2)}
      </div>
    `;
        cartContainer.appendChild(row);
    });

    if (totalPriceEl) totalPriceEl.textContent = `$${total.toFixed(2)}`;
}

function modifyCartQty(id, delta) {
    let cart = JSON.parse(localStorage.getItem('cartItems')) || [];
    const itemIndex = cart.findIndex(item => item.id === id);

    if (itemIndex > -1) {
        cart[itemIndex].cantidad += delta;
        if (cart[itemIndex].cantidad <= 0) {
            cart.splice(itemIndex, 1);
        }
    }

    localStorage.setItem('cartItems', JSON.stringify(cart));
    renderCart();
    if (typeof updateCartBadge === 'function') updateCartBadge();
}