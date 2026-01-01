/* ==================================================
   GERMAN EXPERTS CENTER – FULL WEBSITE SCRIPT
   GitHub Pages SAFE
================================================== */

document.addEventListener("DOMContentLoaded", () => {

  /* ================= HAMBURGER ================= */
  const burger = document.querySelector(".burger");
  const nav = document.querySelector("header nav");
  if (burger && nav) {
    burger.addEventListener("click", () => {
      nav.style.display = nav.style.display === "flex" ? "none" : "flex";
    });
  }

  /* ================= HERO SLIDER ================= */
  let slides = document.querySelectorAll(".slide");
  let dots = document.querySelectorAll(".dot");
  let currentSlide = 0;

  function showSlide(index) {
    slides.forEach((s, i) => s.classList.toggle("active", i === index));
    dots.forEach((d, i) => d.classList.toggle("active", i === index));
  }

  if (slides.length) {
    setInterval(() => {
      currentSlide = (currentSlide + 1) % slides.length;
      showSlide(currentSlide);
    }, 4000);
  }

  /* ================= DATA ================= */

  const servicesData = [
    { title: "Minor & Major Engine Service", desc: "Complete engine servicing.", img: "images/service1.png" },
    { title: "Diagnosis & Programming", desc: "Advanced diagnostics.", img: "images/service2.png" },
    { title: "Transmission Services", desc: "Gearbox & transmission repairs.", img: "images/service3.png" },
    { title: "Suspension Services", desc: "Smooth ride solutions.", img: "images/service4.png" },
    { title: "Body Works & Paint", desc: "Professional body repairs.", img: "images/service5.png" },
    { title: "Pre-Purchase Inspection", desc: "Full inspection reports.", img: "images/service6.png" },
    { title: "Software Coding", desc: "ECU & module updates.", img: "images/service7.png" },
    { title: "Key Duplication", desc: "Secure key cloning.", img: "images/service8.png" },
    { title: "Interior Works", desc: "Interior restoration.", img: "images/service9.png" }
  ];

  const productsData = [
    { title: "BMW X6 Air Struts", price: "KSh 180,000", img: "images/product1.png" },
    { title: "BMW F22 Headlights", price: "KSh 250,000", img: "images/product2.png" },
    { title: "Porsche Cayenne Air Suspension", price: "KSh 370,000", img: "images/product3.png" },
    { title: "Porsche Xenon Headlights", price: "KSh 130,000", img: "images/product4.png" }
  ];

  const brands = {
    audi: "audi.html",
    bmw: "bmw.html",
    mercedes: "mercedes.html",
    volkswagen: "volkswagen.html",
    porsche: "porsche.html",
    range: "range.html"
  };

  /* ================= CHATBOT ================= */

  const chatBox = document.getElementById("chatbot-container");
  const chatToggle = document.getElementById("chatbot-toggle");
  const chatClose = document.getElementById("chatbot-close");
  const messages = document.getElementById("chatbot-messages");
  const input = document.getElementById("chatbot-input");
  const sendBtn = document.getElementById("chatbot-send");

  if (chatToggle) chatToggle.onclick = () => chatBox.style.display = "flex";
  if (chatClose) chatClose.onclick = () => chatBox.style.display = "none";

  function botMsg(html) {
    const div = document.createElement("div");
    div.className = "message bot";
    div.innerHTML = html;
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
  }

  function userMsg(text) {
    const div = document.createElement("div");
    div.className = "message user";
    div.textContent = text;
    messages.appendChild(div);
  }

  function handleMessage(text) {
    const msg = text.toLowerCase();

    if (msg.includes("hi") || msg.includes("hello")) {
      botMsg("Hi 👋 How can I help you? Ask about <b>services</b>, <b>shop</b> or <b>brands</b>.");
      return;
    }

    if (msg.includes("service")) {
      botMsg(servicesData.map(s =>
        `<div><img src="${s.img}" width="60"><b>${s.title}</b><p>${s.desc}</p></div>`
      ).join(""));
      return;
    }

    if (msg.includes("shop") || msg.includes("product")) {
      botMsg(productsData.map(p =>
        `<div><img src="${p.img}" width="60"><b>${p.title}</b><p>${p.price}</p></div>`
      ).join(""));
      return;
    }

    Object.keys(brands).forEach(b => {
      if (msg.includes(b)) {
        botMsg(`View ${b.toUpperCase()} services 👉 <a href="${brands[b]}" target="_blank">Open Page</a>`);
      }
    });
  }

  if (sendBtn) {
    sendBtn.onclick = () => {
      if (!input.value.trim()) return;
      userMsg(input.value);
      handleMessage(input.value);
      input.value = "";
    };
  }

  /* ================= BRAND CLICK ================= */

  document.querySelectorAll(".brand-card").forEach(card => {
    card.addEventListener("click", () => {
      const key = card.dataset.brand;
      if (brands[key]) window.location.href = brands[key];
    });
  });

});
