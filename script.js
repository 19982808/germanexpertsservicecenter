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
 /* ================= CART ================= */
  function loadCart() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const container = document.getElementById("cartItems");
  const totalEl = document.getElementById("cartTotal");

  if (!container) return;

  container.innerHTML = "";
  let total = 0;

  cart.forEach((p, i) => {
    total += p.salePrice * p.qty;
    container.innerHTML += `
      <div>
        ${p.name} × ${p.qty} — KSh ${p.salePrice * p.qty}
      </div>
    `;
  });

  totalEl.textContent = `TOTAL: KSh ${total}`;
}

loadCart();

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
