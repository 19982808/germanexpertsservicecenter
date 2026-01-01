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

  if (nextBtn) nextBtn.addEventListener("click", () => { nextSlide(); resetSlideInterval(); });
  if (prevBtn) prevBtn.addEventListener("click", () => { prevSlide(); resetSlideInterval(); });

  dots.forEach(dot => {
    dot.addEventListener("click", () => {
      currentSlide = Number(dot.dataset.index);
      showSlide(currentSlide);
      resetSlideInterval();
    });
  });

  if (slides.length > 0) {
    showSlide(currentSlide);
    slideInterval = setInterval(nextSlide, 5000);
  }

  /* ================= REVIEWS ROTATION ================= */
  const reviews = document.querySelectorAll(".review");
  let reviewIndex = 0;

  if (reviews.length > 0) {
    setInterval(() => {
      reviews.forEach(r => r.classList.remove("active"));
      reviewIndex = (reviewIndex + 1) % reviews.length;
      reviews[reviewIndex].classList.add("active");
    }, 4000);
  }

  /* ================= DYNAMIC BRANDS SECTION ================= */
  const brandsData = [
    { name: "Audi", img: "audi.png", page: "audi.html" },
    { name: "BMW", img: "bmw.png", page: "bmw.html" },
    { name: "Mercedes-Benz", img: "mercedes-benz.png", page: "mercedes.html" },
    { name: "Volkswagen", img: "volkswagen.png", page: "volkswagen.html" },
    { name: "Porsche", img: "porsche.png", page: "porsche.html" },
    { name: "Range Rover", img: "range-rover.png", page: "range-rover.html" }
  ];

  const brandsSection = document.getElementById("brands");
  if (brandsSection) {
    const brandsGrid = document.createElement("div");
    brandsGrid.className = "brands-grid";

    brandsData.forEach(brand => {
      const card = document.createElement("div");
      card.className = "brand-card";
      card.innerHTML = `<img src="${brand.img}" alt="${brand.name} Logo"><p>${brand.name}</p>`;
      card.addEventListener("click", () => window.location.href = brand.page);
      brandsGrid.appendChild(card);
    });

    brandsSection.appendChild(brandsGrid);
  }

  /* ================= BOOKING → WHATSAPP ================= */
  const bookingForm = document.getElementById("bookingForm");
  const popup = document.getElementById("confirmationPopup");

  if (bookingForm) {
    bookingForm.addEventListener("submit", e => {
      e.preventDefault();

      const name = document.getElementById("name").value.trim();
      const phone = document.getElementById("phone").value.trim();
      const service = document.getElementById("service").value;
      const message = document.getElementById("message").value.trim();

      const text = encodeURIComponent(
        `Booking Request:\nName: ${name}\nPhone: ${phone}\nService: ${service}\nMessage: ${message}`
      );

      popup.style.display = "block";

      setTimeout(() => {
        window.open(`https://wa.me/254704222666?text=${text}`, "_blank");
        popup.style.display = "none";
        bookingForm.reset();
      }, 1200);
    });
  }

  /* ================= COPY PAYMENT DETAILS ================= */
  window.copyText = function(text) {
    navigator.clipboard.writeText(text).then(() => alert("Copied: " + text));
  };

  /* ================= SIMPLE CART (localStorage) ================= */
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  document.querySelectorAll(".add-cart").forEach(btn => {
    btn.addEventListener("click", () => {
      const productName = btn.parentElement.querySelector("h3").textContent;
      cart.push(productName);
      localStorage.setItem("cart", JSON.stringify(cart));
      alert(`${productName} added to cart 🛒`);
    });
  });

  /* ================= CHATBOT ================= */
  const chatBox = document.getElementById("chatbot-container");
  const chatToggle = document.getElementById("chatbot-toggle");
  const chatClose = document.getElementById("chatbot-close");
  const messages = document.getElementById("chatbot-messages");
  const input = document.getElementById("chatbot-input");
  const sendBtn = document.getElementById("chatbot-send");

  if (chatToggle) chatToggle.onclick = () => chatBox.style.display = "flex";
  if (chatClose) chatClose.onclick = () => chatBox.style.display = "none";

  function addMessage(text, type) {
    const div = document.createElement("div");
    div.className = `message ${type}`;
    div.innerHTML = text;
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
  }

  function botReply(msg) {
    const m = msg.toLowerCase();
    if (m.includes("hi") || m.includes("hello")) addMessage("Hello 👋 How can I help you today?", "bot");
    else if (m.includes("service")) addMessage("We offer engine service, diagnostics, suspension, transmission, bodywork & more.", "bot");
    else if (m.includes("location")) addMessage("We are located at Ngong Road, Kiambu By-pass & Karen.", "bot");
    else if (m.includes("contact")) addMessage("📞 0704 222 666 / 0798 690 204<br>✉ germanexpertscenter@gmail.com", "bot");
    else addMessage("Please ask about services, booking, brands or locations.", "bot");
  }

  if (sendBtn) {
    sendBtn.addEventListener("click", () => {
      if (!input.value.trim()) return;
      addMessage(input.value, "user");
      botReply(input.value);
      input.value = "";
    });

    // Enable Enter key
    input.addEventListener("keypress", (e) => {
      if (e.key === "Enter") sendBtn.click();
    });
  }

});
