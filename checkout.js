function getCart() {
  return JSON.parse(localStorage.getItem('cart')) || [];
}

function formatPrice(price) {
  return `₹${price.toFixed(2)}`;
}

function loadOrderSummary() {
  const cart = getCart();
  const summaryItems = document.getElementById('summary-items');
  const summaryTotal = document.getElementById('summary-total');
  summaryItems.innerHTML = '';
  let total = 0;

  if (cart.length === 0) {
    summaryItems.innerHTML = '<p>Your cart is empty.</p>';
    summaryTotal.textContent = '₹0.00';
    return;
  }

  cart.forEach(item => {
    const price = parseFloat(item.price.replace(/[₹,]/g, ''));
    const subtotal = price * item.quantity;
    total += subtotal;

    const div = document.createElement('div');
    div.style.display = 'flex';
    div.style.alignItems = 'center';
    div.style.marginBottom = '10px';

    const img = document.createElement('img');
    img.src = item.image;
    img.alt = item.name;
    img.style.width = '80px';
    img.style.height = '80px';
    img.style.objectFit = 'contain';
    img.style.marginRight = '15px';

    const infoDiv = document.createElement('div');
    infoDiv.innerHTML = `<strong>${item.name}</strong> x ${item.quantity} = ${formatPrice(subtotal)}`;

    div.appendChild(img);
    div.appendChild(infoDiv);
    summaryItems.appendChild(div);
  });

  summaryTotal.textContent = formatPrice(total);
}

function validateAddress() {
  const name = document.getElementById('name').value.trim();
  const address = document.getElementById('address').value.trim();
  const phone = document.getElementById('phone').value.trim();

  if (!name || !address || !phone) {
    alert('Please fill all shipping details.');
    return false;
  }
  return true;
}

document.getElementById('confirm-btn').addEventListener('click', () => {
  if (!validateAddress()) return;

  // Show payment options
  document.getElementById('payment-options').style.display = 'block';

  // Scroll to payment options
  document.getElementById('payment-options').scrollIntoView({ behavior: 'smooth' });
});

// Show/hide form fields depending on payment method
function selectPayment(method) {
  const paymentFormDiv = document.getElementById('payment-form');
  const barcodeDiv = document.getElementById('barcode');

  // Clear previous content
  paymentFormDiv.innerHTML = '';
  barcodeDiv.innerHTML = '';

  if (method === 'UPI') {
    barcodeDiv.innerHTML = `<p>Selected Payment Method: <strong>${method}</strong></p>
      <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=upi://pay" alt="UPI QR Code" />`;
  } else if (method === 'Net Banking') {
    paymentFormDiv.innerHTML = `
      <h3>Net Banking Details</h3>
      <label for="ifsc">IFSC Code:</label>
      <input type="text" id="ifsc" placeholder="Enter IFSC Code" required style="width: 100%; padding: 0.5rem; margin-bottom: 0.5rem;" />
      
      <label for="accountNumber">Account Number:</label>
      <input type="text" id="accountNumber" placeholder="Enter Account Number" required style="width: 100%; padding: 0.5rem; margin-bottom: 0.5rem;" />
      
      <label for="branchName">Branch Name:</label>
      <input type="text" id="branchName" placeholder="Enter Branch Name" required style="width: 100%; padding: 0.5rem;" />
      
      <button onclick="submitNetBanking()" style="margin-top: 1rem; padding: 0.5rem 1rem; background-color:#007bff; color:#fff; border:none; border-radius:4px; cursor:pointer;">Submit Net Banking Details</button>
    `;
  } else if (method === 'Cash on Delivery') {
    barcodeDiv.innerHTML = `<p>Please keep cash ready at delivery.</p>`;
  }
}

function submitNetBanking() {
  const ifsc = document.getElementById('ifsc').value.trim();
  const accountNumber = document.getElementById('accountNumber').value.trim();
  const branchName = document.getElementById('branchName').value.trim();

  if (!ifsc || !accountNumber || !branchName) {
    alert('Please fill all net banking details.');
    return;
  }

  alert('Net Banking details submitted successfully! Your order is confirmed.');
  // Optionally clear cart and redirect or do further processing here
  localStorage.removeItem('cart');
  window.location.href = 'thankyou.html'; // create a thank you page or change as needed
}

window.onload = () => {
  loadOrderSummary();
};


