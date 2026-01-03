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

  /* ================= GLOBAL CART ================= */
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  /* ================= LOAD PRODUCTS ================= */
  let productsList = [];
  fetch("products.json")
    .then(res => res.json())
    .then(products => {
      productsList = products;
      renderShop(productsList);
      renderCart();
    })
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

  /* ================= ADD TO CART ================= */
  window.addToCart = function(productId) {
    const product = productsList.find(p => p.id == productId);
    if (!product) return;

    const existing = cart.find(i => i.id == product.id);
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
  };

  window.addToCartFromChat = function(productId) {
    addToCart(productId);
  };

  /* ================= RENDER CART ================= */
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

  /* ================= CART FUNCTIONS ================= */
  window.changeQty = function(id, amount) {
    const item = cart.find(i => i.id == id);
    if (!item) return;

    item.quantity += amount;
    if (item.quantity <= 0) cart = cart.filter(i => i.id != id);

    saveCart();
    renderCart();
  };

  window.removeItem = function(id) {
    cart = cart.filter(i => i.id != id);
    saveCart();
    renderCart();
  };

  /* ================= WHATSAPP CHECKOUT ================= */
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
/* ================= CHATBOT FRANCO SMART ================= */
const chatBox = document.getElementById("chatbot-container");
const toggle = document.getElementById("chatbot-toggle");
const close = document.getElementById("chatbot-close");
const messages = document.getElementById("chatbot-messages");
const input = document.getElementById("chatbot-input");
const send = document.getElementById("chatbot-send");

toggle.onclick = () => chatBox.style.display = "flex";
close.onclick = () => chatBox.style.display = "none";

// Chat message creator
function addMessage(text, type = "bot") {
  const div = document.createElement("div");
  div.className = `message ${type}`;
  div.innerHTML = text;
  messages.appendChild(div);
  messages.scrollTop = messages.scrollHeight;
}

// Fetch products globally for Franco
let productsList = [];
fetch("products.json")
  .then(r => r.json())
  .then(data => productsList = data);

// Fetch brands
const brands = [
  { name: "Audi", img: "audi.png" },
  { name: "BMW", img: "bmw.png" },
  { name: "Mercedes", img: "mercedes-benz.png" },
  { name: "Volkswagen", img: "volkswagen.png" },
  { name: "Porsche", img: "porsche.png" },
  { name: "Range Rover", img: "range-rover.png" }
];

// Franco reply
function francoReply(msg) {
  msg = msg.toLowerCase();

  if (msg.includes("hi") || msg.includes("hello")) {
    addMessage("Hello 👋! I’m Franco, your smart assistant. Ask me about services, products, brands, booking, locations, or your cart.", "bot");
  }
  else if (msg.includes("services")) {
    const serviceSection = document.getElementById("services");
    serviceSection?.scrollIntoView({behavior: "smooth"});
    addMessage("Here are our services. Click to expand:", "bot");

    document.querySelectorAll("#services .service-card").forEach((card, idx) => {
      const name = card.querySelector("h3").textContent;
      const desc = card.querySelector("p").textContent;
      addMessage(`
        <div class="chat-service" data-idx="${idx}">
          <strong>${name}</strong> <button onclick="toggleService(${idx})">🔍</button>
          <p id="service-desc-${idx}" style="display:none">${desc}</p>
        </div>
      `, "bot");
    });
  }
  else if (msg.includes("products") || msg.includes("shop")) {
    const shopSection = document.getElementById("shop");
    shopSection?.scrollIntoView({behavior: "smooth"});
    addMessage("Here are some products. Click 'Add to Cart' to buy:", "bot");

    productsList.slice(0, 5).forEach(p => {
      addMessage(`
        <div class="chat-product">
          <img src="images/${p.images[0]}" style="width:100px; border-radius:6px; cursor:pointer" onclick="scrollToProduct(${p.id})"><br>
          <strong>${p.name}</strong><br>
          ${p.description || ""}<br>
          KSh ${p.salePrice.toLocaleString()}<br>
          <button onclick="addToCart(${p.id})">Add to Cart 🛒</button>
        </div>
      `, "bot");
    });
  }
  else if (msg.includes("brands")) {
    const brandSection = document.getElementById("brands");
    brandSection?.scrollIntoView({behavior: "smooth"});
    addMessage("We specialize in these brands. Click to view:", "bot");
    brands.forEach((b, idx) => addMessage(`<img src="${b.img}" style="width:80px; cursor:pointer" onclick="scrollToBrand(${idx})"><br>${b.name}`, "bot"));
  }
  else if (msg.includes("locations")) {
    const locSection = document.getElementById("locations");
    locSection?.scrollIntoView({behavior: "smooth"});
    addMessage("Our branches are located here:", "bot");
    addMessage("📍 Ngong Road, Kiambu By-pass & Karen", "bot");
  }
  else if (msg.includes("booking") || msg.includes("appointment")) {
    const bookingSection = document.getElementById("booking");
    bookingSection?.scrollIntoView({behavior: "smooth"});
    addMessage("You can book an appointment here. Fill the form and we’ll confirm via WhatsApp.", "bot");
  }
  else if (msg.includes("cart") || msg.includes("checkout")) {
    const shopSection = document.getElementById("shop");
    shopSection?.scrollIntoView({behavior: "smooth"});
    addMessage("Here’s your cart. Adjust quantities, remove items, or checkout via WhatsApp.", "bot");
    renderCart(); // show live cart
  }
  else {
    addMessage("I can help you navigate the site: services, products, brands, booking, locations, or cart.", "bot");
  }
}

// Toggle service descriptions
window.toggleService = function(idx) {
  const desc = document.getElementById(`service-desc-${idx}`);
  if (desc) desc.style.display = desc.style.display === "none" ? "block" : "none";
};

// Scroll to product in shop
window.scrollToProduct = function(id) {
  const shopSection = document.getElementById("shop");
  const productCard = Array.from(shopSection.querySelectorAll(".product-card")).find(c => c.querySelector("button")?.onclick.toString().includes(`addToCart(${id})`));
  productCard?.scrollIntoView({behavior: "smooth"});
  addMessage(`Scrolled to product <strong>${productCard.querySelector("h3").textContent}</strong>`, "bot");
};

// Scroll to brand
window.scrollToBrand = function(idx) {
  const brandSection = document.getElementById("brands");
  const brandCard = brandSection.querySelectorAll(".brand-card")[idx];
  brandCard?.scrollIntoView({behavior: "smooth"});
  addMessage(`Scrolled to brand <strong>${brands[idx].name}</strong>`, "bot");
};

// Send message
send.onclick = () => {
  if (!input.value.trim()) return;
  addMessage(input.value, "user");
  francoReply(input.value);
  input.value = "";
};

// Enter key sends
input.addEventListener("keypress", e => {
  if (e.key === "Enter") send.click();
});

  

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
