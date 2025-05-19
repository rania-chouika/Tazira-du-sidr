// Gestion du panier
let cart = [];
const cartPanel = document.getElementById('cartPanel');
const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cart-total');
const addSound = document.getElementById('addSound');
const paySound = document.getElementById('paySound');

// Sons pour les interactions
const addToCartSound = new Audio('add-to-cart.mp3');
const openCartSound = new Audio('open-cart.mp3');

function toggleCart() {
  cartPanel.classList.toggle('open');
  if (cartPanel.classList.contains('open')) {
    cartPanel.style.display = 'block';
  } else {
    setTimeout(() => {
      cartPanel.style.display = 'none';
    }, 400);
  }
}

function updateCart() {
  cartItems.innerHTML = '';
  let total = 0;
  
  cart.forEach(item => {
    const itemTotal = item.prix * item.quantite;
    total += itemTotal;
    
    const div = document.createElement('div');
    div.className = 'cart-item';
    div.innerHTML = `
      <img src="${item.img}" alt="${item.nom}">
      <div class="cart-item-info">
        <h3>${item.nom}</h3>
        <p class="cart-item-price">${item.prix.toFixed(2)} MAD</p>
        <div class="cart-item-quantity">
          <button class="quantity-btn" onclick="updateQuantity('${item.nom}', -1)">-</button>
          <span>${item.quantite}</span>
          <button class="quantity-btn" onclick="updateQuantity('${item.nom}', 1)">+</button>
        </div>
      </div>
      <button class="remove-item" onclick="removeItem('${item.nom}')">
        <i class="fas fa-trash"></i>
      </button>
    `;
    cartItems.appendChild(div);
  });
  
  cartTotal.innerText = total.toFixed(2);
}

function updateQuantity(nom, change) {
  const item = cart.find(item => item.nom === nom);
  if (item) {
    item.quantite = Math.max(0, item.quantite + change);
    if (item.quantite === 0) {
      removeItem(nom);
    } else {
      updateCart();
    }
  }
}

function removeItem(nom) {
  cart = cart.filter(item => item.nom !== nom);
  updateCart();
}

function addToCart(product) {
  const existingItem = cart.find(item => item.nom === product.nom);
  
  if (existingItem) {
    existingItem.quantite++;
  } else {
    cart.push({
      nom: product.nom,
      prix: product.prix,
      img: product.img,
      quantite: 1
    });
  }
  
  updateCart();
  addSound.play();
  
  // Animation de la carte 3D
  showCardAnimation();
}

function pay() {
  if (cart.length === 0) {
    alert('Votre panier est vide !');
    return;
  }
  
  paySound.play();
  showCardAnimation();
  
  setTimeout(() => {
    alert("Merci pour votre achat féérique !");
    cart = [];
    updateCart();
    toggleCart();
  }, 2000);
}

function showCardAnimation() {
  const card = document.createElement('div');
  card.className = 'card-3d';
  card.innerHTML = `
    <div class="card-3d-inner">
      <div class="card-3d-front">
        <div class="card-chip"></div>
        <div class="card-number">**** **** **** 1234</div>
        <div class="card-holder">Tazira</div>
        <div class="card-expiry">12/25</div>
      </div>
      <div class="card-3d-back">
        <div class="card-stripe"></div>
        <div class="card-signature"></div>
        <div class="card-cvv">123</div>
      </div>
    </div>
  `;
  
  document.body.appendChild(card);
  setTimeout(() => {
    card.classList.add('animate');
  }, 100);
  
  setTimeout(() => {
    card.remove();
  }, 2000);
}

// Animation des feuilles de sidr
// function createLeaf() { ... }
// setInterval(createLeaf, 3000); 