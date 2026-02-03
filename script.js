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

  /* ================= SERVICES ================= */
  const servicesData = [
    { name: "Minor & Major Engine Service", desc: "Comprehensive engine servicing including oil changes, brakes, and full inspections.", img: "service1.png" },
    { name: "Diagnosis & Programming", desc: "Advanced computer diagnostics and electronic troubleshooting.", img: "service2.png" },
    { name: "Transmission Services", desc: "Fluid changes, repair, and full transmission servicing.", img: "service3.png" },
    { name: "Suspension Services", desc: "Full suspension inspections, repairs, and replacements.", img: "service4.png" },
    { name: "Body Works & Paint", desc: "High-quality bodywork repairs and paint restoration.", img: "service5.png" },
    { name: "Car Pre-Purchase Inspection", desc: "Detailed inspections for buying used German cars.", img: "service6.png" },
    { name: "Online Coding & Software Upgrades", desc: "Vehicle software updates and ECU programming.", img: "service7.png" },
    { name: "Key Duplication", desc: "Secure and reliable key duplication for all models.", img: "service8.png" },
    { name: "Interior Works", desc: "Repairs, restoration, and upgrades for interiors.", img: "service9.png" }
  ];

  const serviceSection = document.querySelector("#services .service-grid");
  if (serviceSection) {
    serviceSection.innerHTML = "";
    servicesData.forEach(s => {
      const card = document.createElement("div");
      card.className = "service-card";
      card.innerHTML = `
        <img src="images/${s.img}" alt="${s.name}">
        <h3>${s.name}</h3>
        <p>${s.desc}</p>
      `;
      serviceSection.appendChild(card);
    });
  }

  /* ================= BRANDS ================= */
  const brands = [
    { name: "Audi", img: "audi.png", page: "audi.html" },
    { name: "BMW", img: "bmw2.png", page: "bmw.html" },
    { name: "Mercedes", img: "mercedes-benz.png", page: "mercedes.html" },
    { name: "Volkswagen", img: "volkswagen.png", page: "volkswagen.html" },
    { name: "Porsche", img: "porsche.png", page: "porsche.html" },
    { name: "Range Rover", img: "rangerover.png", page: "rangerover.html" }
  ];

  const brandsSection = document.getElementById("brands");
  if (brandsSection) {
    const grid = document.createElement("div");
    grid.className = "brands-grid";
    brands.forEach(b => {
      const card = document.createElement("div");
      card.className = "brand-card";
      card.innerHTML = `<img src="images/${b.img}" alt="${b.name}"><p>${b.name}</p>`;
      card.style.cursor = "pointer";
      card.addEventListener("click", () => { window.location.href = b.page; });
      grid.appendChild(card);
    });
    brandsSection.appendChild(grid);
  }

  /* ================= PRODUCTS & CART ================= */
  const shopGrid = document.querySelector("#shop .shop-grid");
  let productsList = [];
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  function addToCart(productId) {
    const product = productsList.find(p => p.id === productId);
    if (!product) {
      showToast("❌ Product not found");
      return;
    }

    const existing = cart.find(i => i.id === productId);
    if (existing) existing.quantity += 1;
    else cart.push({
      id: product.id,
      name: product.name || "Unnamed Product",
      price: Number(product.salePrice) || 0,
      quantity: 1
    });

    saveCart();
    renderCart();
    showToast(`${product.name} added to cart`);
  }

  function renderShop() {
    if (!shopGrid) return;
    shopGrid.innerHTML = "";
    productsList.forEach(p => {
      const card = document.createElement("div");
      card.className = "product-card";
      card.innerHTML = `
        <img src="images/${p.images[0]}" alt="${p.name}">
        <h3>${p.name}</h3>
        <p>KSh ${p.salePrice.toLocaleString()}</p>
        <button class="add-to-cart" data-id="${p.id}">Add to Cart</button>
      `;
      shopGrid.appendChild(card);
    });
  }

  fetch("products.json")
    .then(res => res.json())
    .then(data => {
      productsList = data;
      renderShop();
    })
    .catch(err => {
      console.error("Failed to load products:", err);
      shopGrid.innerHTML = "<p>Failed to load products.</p>";
    });

  function renderCart() {
    const cartItems = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");
    if (!cartItems || !cartTotal) return;

    if (!cart.length) {
      cartItems.innerHTML = "";
      cartTotal.textContent = "KSh 0";
      return;
    }

    cartItems.innerHTML = "";
    let total = 0;

    cart.forEach(item => {
      if (!item.id || !item.name || isNaN(item.price) || !item.quantity) return;

      const subtotal = item.price * item.quantity;
      total += subtotal;

      cartItems.innerHTML += `
        <div class="cart-item">
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

  window.changeQty = function(id, amount) {
    const item = cart.find(i => i.id == id);
    if (!item) return;
    item.quantity += amount;
    if (item.quantity <= 0) cart = cart.filter(i => i.id != id);
    saveCart();
    renderCart();
  }

  window.removeItem = function(id) {
    cart = cart.filter(i => i.id != id);
    saveCart();
    renderCart();
  }

  document.getElementById("checkoutBtn")?.addEventListener("click", () => {
    if (!cart.length) return alert("Cart is empty!");
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

  renderCart();

  /* ================= CHATBOT ================= */
  const chatBox = document.getElementById("chatbot-container");
  const toggle = document.getElementById("chatbot-toggle");
  const closeBtn = document.getElementById("chatbot-close");
  const messages = document.getElementById("chatbot-messages");
  const input = document.getElementById("chatbot-input");
  const send = document.getElementById("chatbot-send");
  const optionButtons = document.querySelectorAll("#chatbot-options button");

  toggle.addEventListener("click", () => chatBox.classList.remove("hidden"));
  closeBtn.addEventListener("click", () => chatBox.classList.add("hidden"));

  function addMessage(text, type) {
    const div = document.createElement("div");
    div.className = `message ${type}`;
    div.innerHTML = text;
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
  }

  function botReply(msg) {
    msg = msg.toLowerCase();
    if (msg.includes("hi") || msg.includes("hello")) addMessage("Hello 👋 How can I help you today?", "bot");
    else if (msg.includes("service")) servicesData.forEach(s => addMessage(`<strong>${s.name}</strong><br><img src="images/${s.img}" width="100"><br>${s.desc}`, "bot"));
    else if (msg.includes("brand")) brands.forEach(b => addMessage(`<strong>${b.name}</strong><br><img src="images/${b.img}" width="100"><br><a href="${b.page}" target="_blank">Open ${b.name}</a>`, "bot"));
    else if (msg.includes("shop") || msg.includes("products")) productsList.forEach(p => addMessage(`<strong>${p.name}</strong><br>KSh ${p.salePrice.toLocaleString()}<br><img src="images/${p.images[0]}" width="100"><br>ID: ${p.id}`, "bot"));
    else if (msg.startsWith("add ")) { addToCart(msg.replace("add ", "").trim()); addMessage("✅ Product added to your cart.", "bot"); }
    else if (msg.includes("cart")) { 
      if (!cart.length) { addMessage("Your cart is empty 🛒", "bot"); return; }
      let total = 0, cartText = "<strong>Your Cart:</strong><br>";
      cart.forEach(item => { if (!item.id || !item.name) return; total += item.price * item.quantity; cartText += `${item.name} x${item.quantity} — KSh ${item.price * item.quantity}<br>`; });
      cartText += `<br><strong>Total: KSh ${total}</strong>`;
      addMessage(cartText, "bot");
    }
    else if (msg.includes("checkout")) {
      if (!cart.length) { addMessage("Your cart is empty 🛒", "bot"); return; }
      let text = "🛒 *New Order*%0A%0A", total = 0;
      cart.forEach(item => { total += item.price * item.quantity; text += `• ${item.name} x${item.quantity} — KSh ${item.price * item.quantity}%0A`; });
      text += `%0A*TOTAL: KSh ${total}*`;
      window.open(`https://wa.me/254704222666?text=${text}`, "_blank");
      addMessage("Opening WhatsApp for checkout 🟢", "bot");
    }
    else if (msg.includes("contact")) addMessage("📞 0704 222 666<br>📍 Ngong Road, Kiambu & Karen", "bot");
    else if (msg.includes("booking")) addMessage("To book, type the service name or use the form above.", "bot");
    else addMessage("Ask me about services, brands, shop, add [id], cart, checkout, booking or contact.", "bot");
  }

  send.addEventListener("click", () => { const text = input.value.trim(); if (!text) return; addMessage(text, "user"); botReply(text); input.value = ""; });
  input.addEventListener("keydown", e => { if (e.key === "Enter") send.click(); });

  optionButtons.forEach(btn => { btn.addEventListener("click", () => { addMessage(btn.textContent, "user"); botReply(btn.dataset.option); }); });
  document.addEventListener("click", e => { if (e.target.classList.contains("add-to-cart")) addToCart(e.target.dataset.id); });

  /* ================= SMOOTH SCROLL & SECTION TOGGLE ================= */
  const allSections = document.querySelectorAll("section");
  document.querySelectorAll("nav a").forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      const targetId = link.getAttribute("href").replace("#", "");
      const targetSection = document.getElementById(targetId);
      if(!targetSection) return;

      // Hide all sections
      allSections.forEach(sec => sec.style.display = "none");

      // Show target section
      targetSection.style.display = "block";

      // Scroll to top
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  });

  // Show first section on load
  if(allSections.length) allSections[0].style.display = "block";

  /* ================= TOAST ================= */
  const toastContainer = document.createElement("div");
  toastContainer.id = "toast";
  document.body.appendChild(toastContainer);

  function showToast(text) {
    toastContainer.textContent = text;
    toastContainer.classList.add("show");
    setTimeout(() => toastContainer.classList.remove("show"), 2000);
  }

});
