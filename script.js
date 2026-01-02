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

  // ================= CHATBOT WITH FULL MINI SECTIONS =================
const chatBox = document.getElementById("chatbot-container");
const chatToggle = document.getElementById("chatbot-toggle");
const chatClose = document.getElementById("chatbot-close");
const messages = document.getElementById("chatbot-messages");
const input = document.getElementById("chatbot-input");
const sendBtn = document.getElementById("chatbot-send");
const options = document.querySelectorAll("#chatbot-options button");

// Show/hide chatbot
chatToggle.onclick = () => chatBox.style.display = "flex";
chatClose.onclick = () => chatBox.style.display = "none";

// Add message to chat
function addMessage(content, type) {
  const div = document.createElement("div");
  div.className = `message ${type}`;
  div.innerHTML = content;
  messages.appendChild(div);
  messages.scrollTop = messages.scrollHeight;
}

// ===== CLICK TO SCROLL FUNCTION =====
function scrollToSection(selector) {
  const section = document.querySelector(selector);
  if (section) {
    section.scrollIntoView({ behavior: "smooth", block: "start" });
    addMessage(`✅ Jumped to ${selector.replace("#","")} section.`, "bot");
  } else {
    addMessage(`❌ Section not found.`, "bot");
  }
}

// ===== MINI PREVIEWS WITH SCROLLABLE CARDS =====
const sectionPreviews = {
  services: () => {
    const services = [
      { name: "Engine Service", id: "#services", img: "service1.png" },
      { name: "Diagnostics", id: "#services", img: "service2.png" },
      { name: "Transmission", id: "#services", img: "service3.png" },
      { name: "Suspension", id: "#services", img: "service4.png" },
      { name: "Body & Paint", id: "#services", img: "service5.png" },
      { name: "Pre-Purchase", id: "#services", img: "service6.png" },
      { name: "Software Upgrades", id: "#services", img: "service7.png" },
      { name: "Key Duplication", id: "#services", img: "service8.png" },
      { name: "Interior Works", id: "#services", img: "service9.png" }
    ];
    let html = `<strong>Our Services:</strong><div style="display:flex;overflow-x:auto;gap:5px;padding:5px 0;">`;
    services.forEach(s => {
      html += `<div onclick="scrollToSection('${s.id}')" style="flex:0 0 auto;width:120px;background:#4B88C4;color:#fff;border-radius:8px;padding:5px;cursor:pointer;text-align:center;font-size:12px;">
        <img src="${s.img}" style="width:100%;height:60px;object-fit:cover;border-radius:5px;margin-bottom:4px;">
        ${s.name}
      </div>`;
    });
    html += `</div>`;
    return html;
  },

  products: () => {
    const products = [
      { name: "BMW X6 Air Struts", price: "KSh 180,000", id: "#shop", img: "images/product1.jpg" },
      { name: "F87 M2 Headlights", price: "KSh 250,000", id: "#shop", img: "images/product2.jpg" },
      { name: "Porsche Cayenne Air Suspension", price: "KSh 370,000", id: "#shop", img: "images/product3.jpg" },
      { name: "Audi A6 Air Kit", price: "KSh 200,000", id: "#shop", img: "images/product4.jpg" }
    ];
    let html = `<strong>Shop Highlights:</strong><div style="display:flex;overflow-x:auto;gap:5px;padding:5px 0;">`;
    products.forEach(p => {
      html += `<div onclick="scrollToSection('${p.id}')" style="flex:0 0 auto;width:120px;background:#4B88C4;color:#fff;border-radius:8px;padding:5px;cursor:pointer;text-align:center;font-size:12px;">
        <img src="${p.img}" style="width:100%;height:60px;object-fit:cover;border-radius:5px;margin-bottom:4px;">
        ${p.name}<br><span style="font-size:11px;">${p.price}</span>
      </div>`;
    });
    html += `</div>`;
    return html;
  },

  booking: () => {
    return `<strong>Book an Appointment:</strong><br>
    <button style="padding:5px 8px;margin-top:5px;cursor:pointer;background:#4B88C4;color:#fff;border:none;border-radius:4px;" onclick="scrollToSection('#booking')">Go to Booking Section</button>`;
  },

  locations: () => {
    const locations = [
      { name: "Ngong Road", id: "#locations", img: "images/location1.png" },
      { name: "Kiambu By-pass", id: "#locations", img: "images/location2.png" },
      { name: "Karen Branch", id: "#locations", img: "images/location3.png" }
    ];
    let html = `<strong>Our Locations:</strong><div style="display:flex;overflow-x:auto;gap:5px;padding:5px 0;">`;
    locations.forEach(loc => {
      html += `<div onclick="scrollToSection('${loc.id}')" style="flex:0 0 auto;width:120px;background:#4B88C4;color:#fff;border-radius:8px;padding:5px;cursor:pointer;text-align:center;font-size:12px;">
        <img src="${loc.img}" style="width:100%;height:60px;object-fit:cover;border-radius:5px;margin-bottom:4px;">
        ${loc.name}
      </div>`;
    });
    html += `</div>`;
    return html;
  },

  contact: () => {
    return `<strong>Contact Us:</strong><br>
    📞 0704 222 666 / 0798 690 204<br>
    ✉ germanexpertscenter@gmail.com<br>
    💬 <a href="https://wa.me/254704222666" target="_blank">WhatsApp Primary</a> | 
    <a href="https://wa.me/254798690204" target="_blank">WhatsApp Secondary</a>`;
  },

  gallery: () => {
    const galleryImages = [];
    for(let i=1;i<=12;i++) {
      galleryImages.push({ img: `images/gallery${i}.jpg`, id: "#gallery" });
    }
    let html = `<strong>Garage Gallery:</strong><div style="display:flex;overflow-x:auto;gap:5px;padding:5px 0;">`;
    galleryImages.forEach(g => {
      html += `<div onclick="scrollToSection('${g.id}')" style="flex:0 0 auto;width:100px;height:80px;cursor:pointer;border-radius:5px;overflow:hidden;">
        <img src="${g.img}" style="width:100%;height:100%;object-fit:cover;">
      </div>`;
    });
    html += `</div>`;
    return html;
  }
};

// ===== BOT LOGIC =====
function botReply(msg) {
  const m = msg.toLowerCase();
  if (m.includes("hi") || m.includes("hello")) addMessage("Hello 👋 How can I help you today?", "bot");
  else if (m.includes("service")) addMessage(sectionPreviews.services(), "bot");
  else if (m.includes("booking")) addMessage(sectionPreviews.booking(), "bot");
  else if (m.includes("location")) addMessage(sectionPreviews.locations(), "bot");
  else if (m.includes("contact")) addMessage(sectionPreviews.contact(), "bot");
  else if (m.includes("gallery")) addMessage(sectionPreviews.gallery(), "bot");
  else if (m.includes("product") || m.includes("shop")) addMessage(sectionPreviews.products(), "bot");
  else addMessage("Please ask about services, booking, locations, contact, gallery, or products.", "bot");
}

// ===== SEND MESSAGE =====
sendBtn.addEventListener("click", () => {
  if (!input.value.trim()) return;
  addMessage(input.value, "user");
  botReply(input.value);
  input.value = "";
});

input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") sendBtn.click();
});

// ===== OPTION BUTTONS =====
options.forEach(btn => {
  btn.addEventListener("click", () => {
    const option = btn.dataset.option;
    addMessage(sectionPreviews[option](), "bot");
  });
});

  /* ================= SMOOTH SCROLLING ================= */
  document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault(); // Prevent default anchor click behavior

      const targetId = this.getAttribute('href'); // Get the target section ID
      const targetSection = document.querySelector(targetId); // Select the target section

      // Scroll to the target section smoothly
      targetSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    });
  });

});
