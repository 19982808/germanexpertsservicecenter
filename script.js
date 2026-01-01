/* =========================================================
   GERMAN EXPERTS SERVICE CENTER – FULL SCRIPT
   MATCHES PROVIDED HTML 100%
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* ================= BURGER MENU ================= */
  const burger = document.querySelector(".burger");
  const nav = document.querySelector("header nav");

  if (burger && nav) {
    burger.addEventListener("click", () => {
      nav.classList.toggle("open");
    });
  }

  /* ================= HERO SLIDER ================= */
  const slides = document.querySelectorAll(".slide");
  const dots = document.querySelectorAll(".dot");
  const prevBtn = document.querySelector(".prev");
  const nextBtn = document.querySelector(".next");
  let currentSlide = 0;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle("active", i === index);
    });
    dots.forEach((dot, i) => {
      dot.classList.toggle("active", i === index);
    });
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }

  function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
  }

  if (nextBtn) nextBtn.addEventListener("click", nextSlide);
  if (prevBtn) prevBtn.addEventListener("click", prevSlide);

  dots.forEach(dot => {
    dot.addEventListener("click", () => {
      currentSlide = Number(dot.dataset.index);
      showSlide(currentSlide);
    });
  });

  if (slides.length > 0) {
    setInterval(nextSlide, 5000);
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
document.addEventListener("DOMContentLoaded", () => {

  const brandsData = [
    { name: "Audi", img: "brands/audi.png", page: "audi.html" },
    { name: "BMW", img: "brands/bmw.png", page: "bmw.html" },
    { name: "Mercedes-Benz", img: "brands/mercedes-benz.png", page: "mercedes.html" },
    { name: "Volkswagen", img: "brands/volkswagen.png", page: "volkswagen.html" },
    { name: "Porsche", img: "brands/porsche.png", page: "porsche.html" },
    { name: "Range Rover", img: "brands/range-rover.png", page: "range.html" }
  ];

  const brandsSection = document.getElementById("specialization");
  if (!brandsSection) return;

  // Create grid container
  const brandsGrid = document.createElement("div");
  brandsGrid.className = "brands-grid";

  brandsData.forEach(brand => {
    const card = document.createElement("div");
    card.className = "brand-card";

    // Create clickable link around card
    const link = document.createElement("a");
    link.href = brand.page;

    // Brand image
    const img = document.createElement("img");
    img.src = brand.img;
    img.alt = brand.name + " Logo";

    // Brand name
    const p = document.createElement("p");
    p.textContent = brand.name;

    // Append image & name to link, link to card
    link.appendChild(img);
    link.appendChild(p);
    card.appendChild(link);

    brandsGrid.appendChild(card);
  });

  brandsSection.appendChild(brandsGrid);
});


  /* ================= BOOKING → WHATSAPP ================= */
  const bookingForm = document.getElementById("bookingForm");
  const popup = document.getElementById("confirmationPopup");

  if (bookingForm) {
    bookingForm.addEventListener("submit", e => {
      e.preventDefault();

      const name = document.getElementById("name").value;
      const phone = document.getElementById("phone").value;
      const service = document.getElementById("service").value;
      const message = document.getElementById("message").value;

      const text =
        `Booking Request:%0A` +
        `Name: ${name}%0A` +
        `Phone: ${phone}%0A` +
        `Service: ${service}%0A` +
        `Message: ${message}`;

      popup.style.display = "block";

      setTimeout(() => {
        window.open(
          `https://wa.me/254704222666?text=${text}`,
          "_blank"
        );
        popup.style.display = "none";
        bookingForm.reset();
      }, 1200);
    });
  }

  /* ================= COPY PAYMENT DETAILS ================= */
  window.copyText = function (text) {
    navigator.clipboard.writeText(text).then(() => {
      alert("Copied: " + text);
    });
  };

  /* ================= SIMPLE CART (UI ONLY) ================= */
  document.querySelectorAll(".add-cart").forEach(btn => {
    btn.addEventListener("click", () => {
      alert("Product added to cart 🛒 (Checkout coming soon)");
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

    if (m.includes("hi") || m.includes("hello")) {
      addMessage("Hello 👋 How can I help you today?", "bot");
      return;
    }

    if (m.includes("service")) {
      addMessage("We offer engine service, diagnostics, suspension, transmission, bodywork & more.", "bot");
      return;
    }

    if (m.includes("location")) {
      addMessage("We are located at Ngong Road, Kiambu By-pass & Karen.", "bot");
      return;
    }

    if (m.includes("contact")) {
      addMessage("📞 0704 222 666 / 0798 690 204<br>✉ germanexpertscenter@gmail.com", "bot");
      return;
    }

    addMessage("Please ask about services, booking, brands or locations.", "bot");
  }

  if (sendBtn) {
    sendBtn.addEventListener("click", () => {
      if (!input.value.trim()) return;
      addMessage(input.value, "user");
      botReply(input.value);
      input.value = "";
    });
  }

});
