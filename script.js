// Chatbot toggle
const faq = [
  {
    question: "quels sont les produits proposés",
    answer: `Tazira propose une gamme de soins capillaires 100 % naturels à base de sidr :<br>• Shampoing purifiant<br>• Après-shampoing démêlant<br>• Masque nourrissant<br>• Crème coiffante protectrice<br>• Sérum réparateur`
  },
  {
    question: "c'est quoi le sidr",
    answer: "Le sidr est une plante marocaine utilisée depuis des siècles pour ses vertus purifiantes, fortifiantes et apaisantes pour le cuir chevelu."
  },
  {
    question: "quels sont les ingrédients",
    answer: `• Feuilles de sidr<br>• Huile d'argan<br>• Huile de nigelle<br>• Beurre de karité<br>• Eau florale de lavande<br>• Camomille<br>• Aloe vera`
  },
  {
    question: "à qui s'adressent les produits",
    answer: "À tous types de cheveux : raides, bouclés, ondulés, crépus. Convient aussi aux personnes après chimiothérapie ou aux cuirs chevelus sensibles."
  },
  {
    question: "conviennent aux enfants ou femmes enceintes",
    answer: "Oui, car ils sont naturels. Mais en cas de doute, demandez l'avis de votre médecin."
  },
  {
    question: "où acheter vos produits",
    answer: "Directement sur notre site web, dans la section 'Produits'."
  },
  {
    question: "comment se passe la livraison",
    answer: "Sous 3 à 5 jours ouvrables, avec un numéro de suivi envoyé par e-mail."
  },
  {
    question: "suivre ma commande",
    answer: "Oui, grâce au lien de suivi envoyé après l'expédition."
  },
  {
    question: "comment vous contacter",
    answer: "Par formulaire sur notre site, par mail, ou directement dans ce chat. Réponse sous 24h."
  },
  {
    question: "diagnostic personnalisé",
    answer: "Un quiz capillaire sera bientôt disponible pour vous aider à choisir la meilleure routine."
  }
];

const quizQuestions = [
  {
    question: "Quel est votre type de cheveux ?",
    options: ["Lisses", "Ondulés", "Bouclés", "Crépus"]
  },
  {
    question: "Comment est votre cuir chevelu ?",
    options: ["Gras", "Sec", "Normal", "Sensible ou irrité"]
  },
  {
    question: "Quel est votre objectif principal ?",
    options: ["Réduire les pellicules", "Apporter de l'hydratation", "Nourrir les pointes sèches", "Apaiser les démangeaisons", "Définir les boucles", "Protéger les cheveux colorés"]
  },
  {
    question: "Utilisez-vous souvent des appareils chauffants (lisseur, fer, sèche-cheveux) ?",
    options: ["Oui, souvent", "De temps en temps", "Non"]
  },
  {
    question: "À quelle fréquence lavez-vous vos cheveux ?",
    options: ["Tous les jours", "2 à 3 fois par semaine", "1 fois par semaine", "Moins d'une fois par semaine"]
  }
];

let quizActive = false;
let quizStep = 0;
let quizAnswers = [];

function showQuizQuestion() {
  const q = quizQuestions[quizStep];
  const botDiv = document.createElement('div');
  botDiv.className = 'bot-message';
  let html = `<strong>${q.question}</strong><br>`;
  q.options.forEach((opt, i) => {
    html += `<button class='quiz-btn' data-idx='${i}'>${opt}</button> `;
  });
  botDiv.innerHTML = html;
  chatbotMessages.appendChild(botDiv);
  chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
  // Ajoute les listeners sur les boutons
  botDiv.querySelectorAll('.quiz-btn').forEach(btn => {
    btn.onclick = function() {
      quizAnswers.push(q.options[btn.dataset.idx]);
      botDiv.querySelectorAll('.quiz-btn').forEach(b => b.disabled = true);
      quizStep++;
      if (quizStep < quizQuestions.length) {
        setTimeout(showQuizQuestion, 400);
      } else {
        setTimeout(showQuizResult, 600);
        quizActive = false;
      }
    };
  });
}

function showQuizResult() {
  // Logique simple d'exemple, à personnaliser selon les réponses
  let routine = '';
  if (quizAnswers[0] === 'Bouclés' && quizAnswers[1] === 'Sec' && quizAnswers[2].includes('hydratation')) {
    routine = `<strong>Routine recommandée :</strong><br>• Shampoing purifiant au sidr<br>• Masque nourrissant<br>• Crème coiffante protectrice<br>• Sérum réparateur pour les pointes`;
  } else if (quizAnswers[0] === 'Lisses' && quizAnswers[1] === 'Gras') {
    routine = `<strong>Routine recommandée :</strong><br>• Shampoing purifiant au sidr<br>• Après-shampoing démêlant (léger)<br>• Sérum réparateur uniquement sur les pointes`;
  } else if (quizAnswers[1] === 'Sensible ou irrité' && quizAnswers[0] === 'Crépus') {
    routine = `<strong>Routine recommandée :</strong><br>• Shampoing doux au sidr et camomille<br>• Masque nourrissant au beurre de karité<br>• Crème protectrice pour définir et assouplir`;
  } else {
    routine = `<strong>Routine personnalisée :</strong><br>• Shampoing purifiant au sidr<br>• Après-shampoing démêlant<br>• Masque nourrissant<br>• Crème coiffante protectrice`;
  }
  const botDiv = document.createElement('div');
  botDiv.className = 'bot-message';
  botDiv.innerHTML = routine;
  chatbotMessages.appendChild(botDiv);
  chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
  // Reset quiz
  quizStep = 0;
  quizAnswers = [];
}

const chatbotIcon = document.getElementById('chatbot-icon');
const chatbotWindow = document.getElementById('chatbot-window');
const chatbotForm = document.getElementById('chatbot-form');
const chatbotInput = document.getElementById('chatbot-input');
const chatbotMessages = document.querySelector('.chatbot-messages');

chatbotIcon.addEventListener('click', () => {
  chatbotWindow.classList.toggle('hidden');
  if (!chatbotWindow.classList.contains('hidden')) {
    setTimeout(() => chatbotInput.focus(), 200);
  }
});

document.addEventListener('click', (e) => {
  if (!chatbotWindow.contains(e.target) && !chatbotIcon.contains(e.target)) {
    chatbotWindow.classList.add('hidden');
  }
});

chatbotForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const userMsg = chatbotInput.value.trim();
  if (userMsg === '') return;

  // Affiche le message utilisateur
  const userDiv = document.createElement('div');
  userDiv.className = 'user-message';
  userDiv.textContent = userMsg;
  chatbotMessages.appendChild(userDiv);
  chatbotMessages.scrollTop = chatbotMessages.scrollHeight;

  chatbotInput.value = '';

  // Déclenche le quiz si l'utilisateur tape "quiz"
  if (userMsg.toLowerCase().includes('quiz')) {
    quizActive = true;
    quizStep = 0;
    quizAnswers = [];
    setTimeout(showQuizQuestion, 400);
    return;
  }

  // Recherche une réponse dans la FAQ
  if (!quizActive) {
    let found = false;
    const userMsgLower = userMsg.toLowerCase();
    for (const item of faq) {
      if (userMsgLower.includes(item.question)) {
        const botDiv = document.createElement('div');
        botDiv.className = 'bot-message';
        botDiv.innerHTML = item.answer;
        chatbotMessages.appendChild(botDiv);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
        found = true;
        // Si la question concerne le diagnostic personnalisé, lance le quiz
        if (item.question.includes('diagnostic personnalisé')) {
          setTimeout(() => {
            quizActive = true;
            quizStep = 0;
            quizAnswers = [];
            showQuizQuestion();
          }, 800);
        }
        break;
      }
    }
    if (!found) {
      setTimeout(() => {
        const botDiv = document.createElement('div');
        botDiv.className = 'bot-message';
        botDiv.textContent = 'Merci pour votre message ! Nous reviendrons vers vous rapidement.';
        chatbotMessages.appendChild(botDiv);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
      }, 700);
    }
  }
});

const responses = {
  "shampoing": `
    <div class="product-response">
      <img src="https://www.pacdora.com/fr/share?filter_url=psbs85eu1e" alt="Shampoing doux au Sidr" class="product-image">
      <div class="product-info">
        <strong>Shampoing doux au Sidr</strong><br>
        Nettoie en douceur, purifie le cuir chevelu et stimule la pousse des cheveux.<br>
        <strong>Ingrédients :</strong> Sidr (feuilles), hydrolat de lavande, huile de nigelle, glycérine végétale.<br>
        <a href="produits/shampoing.html" class="product-link">Découvrir le produit</a>
      </div>
    </div>
  `,
  "après-shampoing": `
    <div class="product-response">
      <img src="https://www.pacdora.com/fr/share?filter_url=ps1r4bnlkl" alt="Après-shampoing démêlant" class="product-image">
      <div class="product-info">
        <strong>Après-shampoing démêlant</strong><br>
        Démêle facilement, adoucit les longueurs et évite la casse.<br>
        <strong>Ingrédients :</strong> Sidr, extrait de figue de barbarie, huile de pépins de raisin, protéines de soie.<br>
        <a href="produits/apres-shampoing.html" class="product-link">Découvrir le produit</a>
      </div>
    </div>
  `,
  "masque": `
    <div class="product-response">
      <img src="https://www.pacdora.com/fr/share?filter_url=psfbro984d" alt="Masque nourrissant réparateur" class="product-image">
      <div class="product-info">
        <strong>Masque nourrissant réparateur</strong><br>
        Hydrate intensément, répare les pointes sèches et fortifie la fibre capillaire.<br>
        <strong>Ingrédients :</strong> Beurre de karité, huile d'argan, sidr, huile de ricin, aloe vera.<br>
        <a href="produits/masque.html" class="product-link">Découvrir le produit</a>
      </div>
    </div>
  `,
  "crème": `
    <div class="product-response">
      <img src="https://www.pacdora.com/fr/share?filter_url=ps22r3lhj9" alt="Crème coiffante protectrice" class="product-image">
      <div class="product-info">
        <strong>Crème coiffante protectrice</strong><br>
        Facilite le coiffage, protège des agressions extérieures et laisse les cheveux doux.<br>
        <strong>Ingrédients :</strong> Sidr, huile de coco, huile de jojoba, cire végétale, vitamine E.<br>
        <a href="produits/creme.html" class="product-link">Découvrir le produit</a>
      </div>
    </div>
  `,
  "huile": `
    <div class="product-response">
      <img src="https://www.pacdora.com/fr/share?filter_url=psygli2a2c" alt="Huile capillaire régénérante" class="product-image">
      <div class="product-info">
        <strong>Huile capillaire régénérante</strong><br>
        Nourrit intensément, stimule la pousse et protège les longueurs.<br>
        <strong>Ingrédients :</strong> Huile de sidr, huile d'argan, huile de ricin, huile de nigelle, huile essentielle de romarin.<br>
        <a href="produits/huile.html" class="product-link">Découvrir le produit</a>
      </div>
    </div>
  `,
  "gamme": `
    <div class="product-response">
      <img src="https://www.pacdora.com/fr/share?filter_url=psbs85eu1e" alt="Gamme capillaire complète Tazira" class="product-image">
      <div class="product-info">
        <strong>Gamme capillaire complète Tazira</strong><br>
        Un rituel 100% naturel à base de Sidr, pour tous types de cheveux.<br>
        <ul>
          <li>Shampoing purifiant</li>
          <li>Après-shampoing démêlant</li>
          <li>Masque nourrissant</li>
          <li>Crème coiffante protectrice</li>
          <li>Huile capillaire régénérante</li>
        </ul>
        <a href="produits/gamme-complete.html" class="product-link">Découvrir la gamme complète</a>
      </div>
    </div>
  `
};

function sendMessage() {
  const input = document.getElementById("userInput");
  const message = input.value.toLowerCase().trim();
  const chatBody = document.getElementById("chat-body");

  if (message === "") return;

  chatBody.innerHTML += `<div class="user-message"><strong>Vous :</strong> ${message}</div>`;

  let reply = "Je ne comprends pas. Cliquez sur un bouton ou tapez : shampoing, masque, huile, etc.";
  for (const keyword in responses) {
    if (message.includes(keyword)) {
      reply = responses[keyword];
      break;
    }
  }

  chatBody.innerHTML += `<div class="bot-message"><strong>Tazira Bot :</strong> ${reply}</div>`;
  chatBody.scrollTop = chatBody.scrollHeight;
  input.value = "";
}

function sendButton(keyword) {
  const chatBody = document.getElementById("chat-body");
  chatBody.innerHTML += `<div class="user-message"><strong>Vous :</strong> ${keyword}</div>`;
  chatBody.innerHTML += `<div class="bot-message"><strong>Tazira Bot :</strong> ${responses[keyword]}</div>`;
  chatBody.scrollTop = chatBody.scrollHeight;
}

// Fonction pour mettre à jour le compteur du panier dans la navbar
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
  const cartIcon = document.querySelector('.icons a[href="../panier.html"] i');
  
  // Supprime l'ancien badge s'il existe
  const oldBadge = cartIcon.parentElement.querySelector('.cart-badge');
  if (oldBadge) {
    oldBadge.remove();
  }
  
  // Ajoute un nouveau badge si le panier n'est pas vide
  if (totalItems > 0) {
    const badge = document.createElement('span');
    badge.className = 'cart-badge';
    badge.textContent = totalItems;
    badge.style.cssText = `
      position: absolute;
      top: -8px;
      right: -8px;
      background: #E5C335;
      color: #fff;
      border-radius: 50%;
      width: 20px;
      height: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
      font-weight: bold;
    `;
    cartIcon.parentElement.style.position = 'relative';
    cartIcon.parentElement.appendChild(badge);
  }
}

// Fonction pour ajouter un produit au panier
function addToCartWithQty(productId) {
  const qty = parseInt(document.getElementById('quantity').value) || 1;
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  // Liste des produits avec images .png
  const products = [
    { id: "shampoing", name: "Shampoing purifiant au sidr", price: 85, img: "shampooing.png" },
    { id: "apres-shampoing", name: "Après-shampoing démêlant", price: 75, img: "apres-shampoing.png" },
    { id: "masque", name: "Masque nourrissant au sidr", price: 95, img: "masque.png" },
    { id: "creme", name: "Crème coiffante protectrice", price: 80, img: "creme.png" },
    { id: "serum", name: "Sérum réparateur (pointes)", price: 90, img: "serum.png" },
    { id: "pack-gamme", name: "Pack Capillaire 5 en 1", price: 350, img: "pack-gamme.png" }
  ];

  const product = products.find(p => p.id === productId);
  if (!product) return;

  const existing = cart.find(item => item.id === productId);
  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      qty: qty,
      img: product.img
    });
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();

  // Animation du produit vers le panier
  const cartIcon = document.querySelector('.icons a[href="../panier.html"] i');
  const productElement = document.querySelector('.product-detail-image');
  
  if (productElement && cartIcon) {
    const productRect = productElement.getBoundingClientRect();
    const cartRect = cartIcon.getBoundingClientRect();
    
    // Créer l'élément volant
    const flyingProduct = document.createElement('div');
    flyingProduct.style.cssText = `
      position: fixed;
      width: 60px;
      height: 60px;
      background: #fff;
      border-radius: 50%;
      box-shadow: 0 4px 12px rgba(229, 195, 53, 0.3);
      z-index: 1000;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 28px;
      pointer-events: none;
      transform-origin: center;
      animation: flyToCart 1s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
    `;
    flyingProduct.innerHTML = '🛍️';
    
    // Ajouter l'animation CSS
    const style = document.createElement('style');
    style.textContent = `
      @keyframes flyToCart {
        0% {
          left: ${productRect.left + productRect.width/2 - 30}px;
          top: ${productRect.top + productRect.height/2 - 30}px;
          transform: scale(1) rotate(0deg);
          opacity: 1;
        }
        50% {
          transform: scale(1.2) rotate(180deg);
          opacity: 0.8;
        }
        100% {
          left: ${cartRect.left + cartRect.width/2 - 30}px;
          top: ${cartRect.top + cartRect.height/2 - 30}px;
          transform: scale(0.5) rotate(360deg);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);
    document.body.appendChild(flyingProduct);
    
    // Ajouter un effet de rebond sur l'icône du panier
    cartIcon.style.animation = 'cartBounce 0.5s ease';
    const bounceStyle = document.createElement('style');
    bounceStyle.textContent = `
      @keyframes cartBounce {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.3); }
      }
    `;
    document.head.appendChild(bounceStyle);
    
    // Supprimer les éléments après l'animation
    setTimeout(() => {
      flyingProduct.remove();
      style.remove();
      bounceStyle.remove();
      cartIcon.style.animation = '';
      window.location.href = '../panier.html';
    }, 1000);
  } else {
    window.location.href = '../panier.html';
  }
}

// Met à jour le compteur du panier au chargement de la page
document.addEventListener('DOMContentLoaded', updateCartCount); 