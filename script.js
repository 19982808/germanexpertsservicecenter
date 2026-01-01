/* ===========================
   GLOBAL HELPERS
=========================== */
function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
}

function addBotMessage(text) {
  const box = document.getElementById("chatbot-messages");
  if (!box) return;
  const div = document.createElement("div");
  div.className = "bot-message";
  div.innerHTML = text;
  box.appendChild(div);
  box.scrollTop = box.scrollHeight;
}

function addUserMessage(text) {
  const box = document.getElementById("chatbot-messages");
  if (!box) return;
  const div = document.createElement("div");
  div.className = "user-message";
  div.textContent = text;
  box.appendChild(div);
  box.scrollTop = box.scrollHeight;
}

/* ===========================
   BRAND DATA
=========================== */
const brandsData = {
  audi: { name: "Audi", page: "audi.html" },
  bmw: { name: "BMW", page: "bmw.html" },
  mercedes: { name: "Mercedes-Benz", page: "mercedes.html" },
  volkswagen: { name: "Volkswagen", page: "volkswagen.html" },
  porsche: { name: "Porsche", page: "porsche.html" },
  range: { name: "Range Rover", page: "range.html" }
};

/* ===========================
   SERVICES DATA
=========================== */
const servicesData = [
  "Diagnostics & Scanning",
  "Major Engine Repairs",
  "Transmission Services",
  "Suspension & Steering",
  "Brake System Repairs",
  "Oil Change & Maintenance",
  "Air Conditioning Service",
  "Body Works & Paint"
];

/* ===========================
   PRODUCTS DATA
=========================== */
const productsData = [
  { name: "BMW X6 F16 Air Struts", price: "KSh 180,000" },
  { name: "Audi A6 C7 Air Suspension", price: "KSh 200,000" },
  { name: "Mercedes W212 Headlights", price: "KSh 150,000" },
  { name: "Porsche Cayenne Air Suspension", price: "KSh 370,000" },
  { name: "VW Golf Mk7 Suspension", price: "KSh 150,000" }
];

/* ===========================
   BRAND CLICK HANDLER
=========================== */
document.querySelectorAll(".brand-card").forEach(card => {
  card.addEventListener("click", () => {
    const key = card.dataset.brand;
    if (!key || !brandsData[key]) {
      alert("Brand page not available.");
      return;
    }
    window.location.href = brandsData[key].page;
  });
});

/* ===========================
   CHATBOT TOGGLE
=========================== */
const toggle = document.getElementById("chatbot-toggle");
const chatbot = document.getElementById("chatbot-container");
const closeBtn = document.getElementById("chatbot-close");

if (toggle && chatbot) {
  toggle.onclick = () => chatbot.classList.toggle("open");
}
if (closeBtn) {
  closeBtn.onclick = () => chatbot.classList.remove("open");
}

/* ===========================
   CHATBOT CORE LOGIC
=========================== */
function processMessage(msg) {
  const text = msg.toLowerCase();

  // greetings
  if (text.includes("hi") || text.includes("hello")) {
    addBotMessage("Hello 👋 How may I help you today?");
    return;
  }

  // services
  if (text.includes("service")) {
    let html = "<strong>Our Services:</strong><br>";
    servicesData.forEach(s => html += "✔️ " + s + "<br>");
    html += "<br><button onclick=\"scrollToSection('services')\">View Services</button>";
    addBotMessage(html);
    return;
  }

  // shop
  if (text.includes("shop") || text.includes("product")) {
    let html = "<strong>Available Products:</strong><br>";
    productsData.forEach(p => {
      html += `🛒 ${p.name} – <b>${p.price}</b><br>`;
    });
    html += "<br><button onclick=\"scrollToSection('shop')\">Go to Shop</button>";
    addBotMessage(html);
    return;
  }

  // booking
  if (text.includes("book") || text.includes("appointment")) {
    addBotMessage("You can book an appointment below 👇");
    scrollToSection("booking");
    return;
  }

  // location
  if (text.includes("location") || text.includes("where")) {
    addBotMessage("📍 We are located at Ngong Road, Kiambu By-pass & Karen.");
    scrollToSection("locations");
    return;
  }

  // brands
  if (text.includes("brand") || text.includes("audi") || text.includes("bmw")) {
    let html = "<strong>We specialize in:</strong><br>";
    Object.values(brandsData).forEach(b => {
      html += `🚗 ${b.name}<br>`;
    });
    html += "<br>Click a brand card below 👇";
    addBotMessage(html);
    scrollToSection("specialization");
    return;
  }

  // fallback
  addBotMessage(
    "I'm not sure I understood 🤔<br>" +
    "You can ask about:<br>" +
    "• Services<br>• Shop / Products<br>• Booking<br>• Locations<br>• Brands"
  );
}

/* ===========================
   CHATBOT INPUT HANDLING
=========================== */
const input = document.getElementById("chatbot-input");
const sendBtn = document.getElementById("chatbot-send");

if (sendBtn && input) {
  sendBtn.onclick = () => {
    const msg = input.value.trim();
    if (!msg) return;
    addUserMessage(msg);
    input.value = "";
    setTimeout(() => processMessage(msg), 400);
  };

  input.addEventListener("keypress", e => {
    if (e.key === "Enter") sendBtn.click();
  });
}

/* ===========================
   CHATBOT QUICK OPTIONS
=========================== */
document.querySelectorAll("#chatbot-options button").forEach(btn => {
  btn.onclick = () => {
    const opt = btn.dataset.option;
    addUserMessage(opt);
    processMessage(opt);
  };
});

/* ===========================
   SLIDER (SAFE)
=========================== */
let slideIndex = 0;
const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");

function showSlide(i) {
  slides.forEach(s => s.classList.remove("active"));
  dots.forEach(d => d.classList.remove("active"));
  slideIndex = (i + slides.length) % slides.length;
  if (slides[slideIndex]) slides[slideIndex].classList.add("active");
  if (dots[slideIndex]) dots[slideIndex].classList.add("active");
}

document.querySelector(".next")?.addEventListener("click", () => showSlide(slideIndex + 1));
document.querySelector(".prev")?.addEventListener("click", () => showSlide(slideIndex - 1));
dots.forEach((dot, i) => dot.addEventListener("click", () => showSlide(i)));

setInterval(() => showSlide(slideIndex + 1), 6000);
