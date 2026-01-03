document.addEventListener("DOMContentLoaded", () => {

  /* ================= HERO SLIDER ================= */
  const slides = document.querySelectorAll(".slide");
  const dots = document.querySelectorAll(".dot");
  const prevBtn = document.querySelector(".prev");
  const nextBtn = document.querySelector(".next");
  let currentSlide = 0;
  let slideInterval;

  function showSlide(index) {
    slides.forEach((slide, i) => slide.classList.toggle("active", i === index));
    dots.forEach((dot, i) => dot.classList.toggle("active", i === index));
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }

  function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
  }

  function resetSlideInterval() {
    clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, 5000);
  }

  if (slides.length) {
    showSlide(currentSlide);
    slideInterval = setInterval(nextSlide, 5000);
  }

  nextBtn?.addEventListener("click", () => { nextSlide(); resetSlideInterval(); });
  prevBtn?.addEventListener("click", () => { prevSlide(); resetSlideInterval(); });

  dots.forEach(dot => {
    dot.addEventListener("click", () => {
      currentSlide = Number(dot.dataset.index);
      showSlide(currentSlide);
      resetSlideInterval();
    });
  });

  /* ================= REVIEWS ================= */
  const reviews = document.querySelectorAll(".review");
  let reviewIndex = 0;

  if (reviews.length) {
    setInterval(() => {
      reviews.forEach(r => r.classList.remove("active"));
      reviewIndex = (reviewIndex + 1) % reviews.length;
      reviews[reviewIndex].classList.add("active");
    }, 4000);
  }

  /* ================= BRANDS ================= */
  const brands = [
    { name: "Audi", img: "audi.png" },
    { name: "BMW", img: "bmw.png" },
    { name: "Mercedes", img: "mercedes-benz.png" },
    { name: "Volkswagen", img: "volkswagen.png" },
    { name: "Porsche", img: "porsche.png" },
    { name: "Range Rover", img: "range-rover.png" }
  ];

  const brandsSection = document.getElementById("brands");
  if (brandsSection) {
    const grid = document.createElement("div");
    grid.className = "brands-grid";

    brands.forEach(b => {
      const card = document.createElement("div");
      card.className = "brand-card";
      card.innerHTML = `<img src="${b.img}" alt="${b.name}"><p>${b.name}</p>`;
      grid.appendChild(card);
    });

    brandsSection.appendChild(grid);
  }
// ====================== GLOBAL CART ======================
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// ====================== LOAD PRODUCTS ======================
fetch("products.json")
  .then(res => res.json())
  .then(products => renderShop(products))
  .catch(err => console.error("Products load error:", err));

function renderShop(products) {
  const shopGrid = document.querySelector(".shop-grid");
  if (!shopGrid) return;

  shopGrid.innerHTML = "";

  products.forEach(p => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <img src="images/${p.images[0]}" alt="${p.name}">
      <h3>${p.name}</h3>
      <p>KSh ${p.salePrice.toLocaleString()}</p>
      <button onclick="addToCart(${p.id})">Add to Cart</button>
      <button onclick="addToCartFromChat('${p.id}')">💬 Chatbot Add</button>
    `;
    shopGrid.appendChild(card);
  });
}

// ====================== ADD TO CART ======================
function addToCart(productId) {
  fetch("products.json")
    .then(res => res.json())
    .then(products => {
      const product = products.find(p => p.id === productId);
      if (!product) return;

      const existing = cart.find(i => i.id === product.id);
      if (existing) {
        existing.quantity += 1;
      } else {
        cart.push({
          id: product.id,
          name: product.name,
          price: product.salePrice,
          image: product.images[0],
          quantity: 1
        });
      }
      saveCart();
      renderCart();
    });
}

// ====================== CART RENDER ======================
function renderCart() {
  const cartItems = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");
  if (!cartItems || !cartTotal) return;

  cartItems.innerHTML = "";
  let total = 0;

  cart.forEach(item => {
    const subtotal = item.price * item.quantity;
    total += subtotal;

    cartItems.innerHTML += `
      <div class="cart-item">
        <img src="images/${item.image}" width="50">
        <strong>${item.name}</strong>
        <div class="qty">
          <button onclick="changeQty('${item.id}', -1)">−</button>
          <span>${item.quantity}</span>
          <button onclick="changeQty('${item.id}', 1)">+</button>
        </div>
        <span>KSh ${subtotal.toLocaleString()}</span>
        <button onclick="removeItem('${item.id}')">🗑</button>
      </div>
    `;
  });

  cartTotal.textContent = `TOTAL: KSh ${total.toLocaleString()}`;
}

// ====================== CART FUNCTIONS ======================
function changeQty(id, amount) {
  const item = cart.find(i => i.id === id);
  if (!item) return;

  item.quantity += amount;
  if (item.quantity <= 0) cart = cart.filter(i => i.id !== id);

  saveCart();
  renderCart();
}

function removeItem(id) {
  cart = cart.filter(i => i.id !== id);
  saveCart();
  renderCart();
}

// ====================== WHATSAPP CHECKOUT ======================
document.getElementById("checkoutBtn")?.addEventListener("click", () => {
  if (cart.length === 0) return alert("Cart is empty!");

  let message = "🛒 *New Order*%0A%0A";
  let total = 0;

  cart.forEach(item => {
    const subtotal = item.price * item.quantity;
    total += subtotal;
    message += `• ${item.name} x${item.quantity} — KSh ${subtotal}%0A`;
  });

  message += `%0A*TOTAL: KSh ${total}*`;
  window.open(`https://wa.me/254704222666?text=${message}`, "_blank");
});

// ====================== CHATBOT ADD TO CART ======================
function addToCartFromChat(productId) {
  fetch("products.json")
    .then(res => res.json())
    .then(products => {
      const product = products.find(p => p.id === productId);
      if (product) addToCart(product.id);
    });
}

// ====================== INITIALIZE ======================
document.addEventListener("DOMContentLoaded", () => {
  renderCart(); // show cart on page load
});


  /* ================= BOOKING → WHATSAPP ================= */
  const bookingForm = document.getElementById("bookingForm");
  const popup = document.getElementById("confirmationPopup");

  bookingForm?.addEventListener("submit", e => {
    e.preventDefault();

    const text = encodeURIComponent(
      `Booking Request\nName: ${name.value}\nPhone: ${phone.value}\nService: ${service.value}\nMessage: ${message.value}`
    );

    popup.style.display = "block";

    setTimeout(() => {
      window.open(`https://wa.me/254704222666?text=${text}`, "_blank");
      popup.style.display = "none";
      bookingForm.reset();
    }, 1000);
  });

  /* ================= CHATBOT ================= */
  const chatBox = document.getElementById("chatbot-container");
  const toggle = document.getElementById("chatbot-toggle");
  const close = document.getElementById("chatbot-close");
  const messages = document.getElementById("chatbot-messages");
  const input = document.getElementById("chatbot-input");
  const send = document.getElementById("chatbot-send");

  toggle.onclick = () => chatBox.style.display = "flex";
  close.onclick = () => chatBox.style.display = "none";

  function addMessage(text, type) {
    const div = document.createElement("div");
    div.className = `message ${type}`;
    div.innerHTML = text;
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
  }

  function botReply(msg) {
    msg = msg.toLowerCase();
    if (msg.includes("hi")) addMessage("Hello 👋 How can I help?", "bot");
    else if (msg.includes("service")) addMessage("We offer engine, diagnostics, suspension & more.", "bot");
    else if (msg.includes("contact")) addMessage("📞 0704 222 666", "bot");
    else if (msg.includes("location")) addMessage("📍 Ngong Road & Karen", "bot");
    else addMessage("Ask about services, booking, location or shop.", "bot");
  }

  send.onclick = () => {
    if (!input.value.trim()) return;
    addMessage(input.value, "user");
    botReply(input.value);
    input.value = "";
  };

  input.addEventListener("keypress", e => {
    if (e.key === "Enter") send.click();
  });
function showProductsInChat() {
  fetch("products.json")
    .then(r => r.json())
    .then(products => {
      const box = document.getElementById("chatbot-messages");

      products.slice(0,3).forEach(p => {
        box.innerHTML += `
          <div class="bot-message">
            <img src="${p.images[0]}" style="width:100%;border-radius:8px">
            <strong>${p.name}</strong><br>
            KSh ${p.salePrice}
          </div>
        `;
      });
    });
}

  /* ================= SMOOTH SCROLL ================= */
  document.querySelectorAll("nav a").forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      document.querySelector(link.getAttribute("href"))?.scrollIntoView({
        behavior: "smooth"
      });
    });
  });

});
