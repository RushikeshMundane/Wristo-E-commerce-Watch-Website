function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const countEl = document.getElementById('cart-count');
  if (countEl) {
    countEl.textContent = `(${totalCount})`;
  }
}

function loadCart() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const cartItemsDiv = document.getElementById('cart-items');
  const cartTotalDiv = document.getElementById('cart-total');
  cartItemsDiv.innerHTML = '';
  let total = 0;

  if (cart.length === 0) {
    cartItemsDiv.innerHTML = '<p>Your cart is empty.</p>';
    cartTotalDiv.textContent = 'Total: ₹0.00';
    updateCartCount(); // update count even if empty
    return;
  }

  cart.forEach((item, index) => {
    const price = parseFloat(item.price.replace(/[₹,]/g, ''));

    const itemTotal = price * item.quantity;
    total += itemTotal;

    const div = document.createElement('div');
    div.className = 'cart-item';
    div.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <div class="cart-details">
        <h3>${item.name}</h3>
        <p>Price: ${item.price}</p>
        <p>Quantity: ${item.quantity}</p>
        <p>Subtotal: ₹${itemTotal.toFixed(2)}</p>
      </div>
      <div class="cart-actions">
        <button onclick="decreaseQuantity(${index})">-</button>
        <button onclick="increaseQuantity(${index})">+</button>
      </div>
    `;
    cartItemsDiv.appendChild(div);
  });

  cartTotalDiv.textContent = `Total: ₹${total.toFixed(2)}`;
  updateCartCount();
}

function removeFromCart(index) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart.splice(index, 1);
  localStorage.setItem('cart', JSON.stringify(cart));
  loadCart();
  updateCartCount();
}

function decreaseQuantity(index) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  if (cart[index].quantity > 1) {
    cart[index].quantity -= 1;
  } else {
    // Remove item if quantity is 1 and user clicks -
    cart.splice(index, 1);
  }
  localStorage.setItem('cart', JSON.stringify(cart));
  loadCart();
  updateCartCount();
}

function increaseQuantity(index) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart[index].quantity += 1;
  localStorage.setItem('cart', JSON.stringify(cart));
  loadCart();
  updateCartCount();
}

window.onload = () => {
  loadCart();

  // Add checkout button event listener
 document.getElementById('checkout-btn').addEventListener('click', () => {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  if(cart.length === 0) {
    alert('Your cart is empty! Please add items before checkout.');
    return;
  }
  window.open('checkout.html', '_blank');
});

};
