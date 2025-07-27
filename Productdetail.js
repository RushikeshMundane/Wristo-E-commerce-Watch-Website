// List of product data
const products = {
  "rado-watch": {
    name: "Rado Watch",
    price: "₹1,03,893",
    image: "Images/rado-2.avif",
    description: "The Rado watch combines elegance and innovation, known for its durable ceramic design and timeless appeal."
  },
  "jacob-co": {
    name: "Jacob & Co Astronomia",
    price: "₹4,32,889",
    image: "Images/Jacob & Co Astronomia.webp",
    description: "An iconic piece showcasing advanced horology, the Jacob & Co Astronomia is a statement of luxury and precision."
  },
  "tissot-watch": {
    name: "Tissot Watch",
    price: "₹77,920",
    image: "Images/tissot-t.avif",
    description: "Swiss craftsmanship at its finest, the Tissot watch blends tradition with modern watchmaking technology."
  },
  "cartier-watch": {
    name: "Cartier Watch",
    price: "₹3,89,600",
    image: "Images/cartier watch.jpg",
    description: "The Cartier watch reflects luxury and finesse, favored for its sleek look and precision movement."
  },
  "omega-watch": {
    name: "Omega Watch",
    price: "₹95,235",
    image: "Images/Omega_2.webp",
    description: "Worn by astronauts and 007 alike, the Omega watch is legendary for its durability and sophistication."
  },
  "police-watch": {
    name: "Police Watch",
    price: "₹30,302",
    image: "Images/police.webp",
    description: "Sporty and urban, the Police watch is designed for those who like bold, modern fashion accessories."
  },
  "patek-philippe": {
    name: "Patek Philippe",
    price: "₹30,302",
    image: "Images/Patek-Philippe-Nautilus.webp",
    description: "One of the most prestigious watch brands, Patek Philippe watches are known for their craftsmanship and legacy."
  },
  "rolex-watch": {
    name: "Rolex Watch",
    price: "₹30,302",
    image: "Images/Rolex 2.webp",
    description: "A symbol of status and precision, the Rolex watch remains a classic icon of excellence in timekeeping."
  },

  "rolex-oyster": {
    name: "Rolex Oyster",
    price: "₹40,25,873",
    image: "Images/Rolex 12.avif",
    description: "A symbol of status and precision, the Rolex watch remains a classic icon of excellence in timekeeping."
  },

  "tissot-1853": {
    name: "Tissot 1853",
    price: "₹29,42,610",
    image: "Images/tissot-t.avif",
    description: "A perfect blend of heritage and innovation, the Tissot watch embodies Swiss craftsmanship and timeless design."
  },

  "klassc-14": {
    name: "Klassc-14",
    price: "₹29,42,610",
    image: "Images/Klassc.png",
    description: "With bold elegance and modern flair, the Klassc-14 watch defines contemporary luxury for every occasion."
  },

  "citizen": {
    name: "Citizen",
    price: "₹29,42,610",
    image: "Images/citizen.png",
    description: "Blending innovation with timeless design, the Citizen watch delivers reliability and sophistication with every tick."
  },

};

function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const countEl = document.getElementById('cart-count');
  if (countEl) {
    countEl.textContent = `(${totalCount})`;
  }
}

window.onload = () => {
  updateCartCount(); // update cart count on page load

  const productId = getQueryParam('id');
  const product = products[productId];

  if (product) {
    // Populate product details
    document.getElementById('product-name').textContent = product.name;
    document.getElementById('product-price').textContent = product.price;
    document.getElementById('product-image').src = product.image;
    document.getElementById('product-image').alt = product.name;
    document.getElementById('product-description').textContent = product.description;

    // Add to cart button
    document.getElementById('add-to-cart').addEventListener('click', () => {
      let cart = JSON.parse(localStorage.getItem('cart')) || [];

      const existing = cart.find(item => item.id === productId);
      if (existing) {
        existing.quantity += 1;
      } else {
        cart.push({
          id: productId,
          name: product.name,
          price: product.price,
          image: product.image,
          quantity: 1
        });
      }

      localStorage.setItem('cart', JSON.stringify(cart));
      updateCartCount(); // update cart count after adding
      alert(`${product.name} added to cart!`);
    });

    // Buy now button
    document.getElementById('buy-now').addEventListener('click', () => {
      alert(`Proceeding to buy ${product.name}`);
      // Add checkout logic here
    });
  } else {
    document.querySelector('.product-info').innerHTML = "<p>Product not found.</p>";
    document.getElementById('product-image').style.display = 'none';
  }
};

