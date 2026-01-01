/* =========================
   FULL WEBSITE SCRIPT
   Hero Slider, Booking, Payments, Reviews, Smooth Scroll, Hamburger, Chatbot, Brands
========================= */

window.addEventListener("load", () => {

  /* ================= HAMBURGER MENU ================= */
  const burger = document.querySelector(".burger");
  const nav = document.querySelector("header nav");
  if(burger){
    burger.addEventListener("click", () => {
      nav.style.display = nav.style.display === "flex" ? "none" : "flex";
    });
  }

  /* ================= HERO SLIDER ================= */
  (function () {
    let slides, dots, prev, next;
    let currentSlide = 0;
    let autoSlide;

    function initHeroSlider() {
      slides = document.querySelectorAll(".slide");
      dots = document.querySelectorAll(".dot");
      prev = document.querySelector(".prev");
      next = document.querySelector(".next");

      if (!slides.length) return;

      showSlide(currentSlide);
      startAutoSlide();

      next.addEventListener("click", () => { goNext(); restartAutoSlide(); });
      prev.addEventListener("click", () => { goPrev(); restartAutoSlide(); });

      dots.forEach(dot => {
        dot.addEventListener("click", () => {
          currentSlide = Number(dot.dataset.index);
          showSlide(currentSlide);
          restartAutoSlide();
        });
      });
    }

    function showSlide(index){
      slides.forEach((slide, i)=>{
        slide.classList.toggle("active", i===index);
        if(dots[i]) dots[i].classList.toggle("active", i===index);
      });
    }
    function goNext(){ currentSlide=(currentSlide+1)%slides.length; showSlide(currentSlide);}
    function goPrev(){ currentSlide=(currentSlide-1+slides.length)%slides.length; showSlide(currentSlide);}
    function startAutoSlide(){ autoSlide=setInterval(goNext, 4000);}
    function restartAutoSlide(){ clearInterval(autoSlide); startAutoSlide();}

    if(document.readyState==="loading"){
      document.addEventListener("DOMContentLoaded", initHeroSlider);
    } else { initHeroSlider(); }

  })();

  /* ================= BOOKING FORM ================= */
  const bookingForm = document.getElementById("bookingForm");
  const confirmationPopup = document.getElementById("confirmationPopup");
  if(bookingForm){
    bookingForm.addEventListener("submit", function(e){
      e.preventDefault();
      const name = document.getElementById("name").value.trim();
      const phone = document.getElementById("phone").value.trim();
      const service = document.getElementById("service").value;
      const message = document.getElementById("message").value.trim();

      if(name && phone && service){
        const whatsappMessage = `Hello, my name is ${name}. I would like to book: ${service}. Message: ${message}`;
        const whatsappURL = `https://wa.me/254704222666?text=${encodeURIComponent(whatsappMessage)}`;
        
        confirmationPopup.style.display = "block";
        setTimeout(()=>{
          confirmationPopup.style.display="none";
          window.open(whatsappURL,"_blank");
          bookingForm.reset();
        },2000);
      }
    });
  }

  /* ================= COPY PAYMENT INFO ================= */
  window.copyText = function(text){
    navigator.clipboard.writeText(text).then(()=>{ alert(`Copied: ${text}`); })
    .catch(()=>{ alert("Failed to copy"); });
  }

  /* ================= REVIEWS ================= */
  const reviews = document.querySelectorAll(".review");
  let currentReview = 0;
  if(reviews.length){
    function showReview(index){
      reviews.forEach(r => r.classList.remove("active"));
      reviews[index].classList.add("active");
    }
    setInterval(()=>{
      currentReview=(currentReview+1)%reviews.length;
      showReview(currentReview);
    },5000);
  }

  /* ================= SMOOTH SCROLL ================= */
  document.querySelectorAll('header nav a').forEach(anchor=>{
    anchor.addEventListener('click', function(e){
      if(this.getAttribute("href").startsWith("#")){
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        target.scrollIntoView({ behavior: 'smooth' });
        if(window.innerWidth<=768) nav.style.display="none";
      }
    });
  });

  /* ==================== SERVICES & PRODUCTS DATA ==================== */
  const servicesData = [
    {title:"Minor & Major Engine Service", desc:"Comprehensive engine servicing including oil change, brake checks, and inspections.", img:"service1.jpg"},
    {title:"Diagnosis & Programming", desc:"Advanced diagnostics and programming for all German car brands.", img:"service2.jpg"},
    {title:"Transmission Services", desc:"Transmission inspection, repairs, and fluid replacement.", img:"service3.jpg"},
    {title:"Suspension Services", desc:"Suspension diagnostics and repairs for smooth handling.", img:"service4.jpg"},
    {title:"Body Works & Paint", desc:"High-quality body repairs and painting for flawless finish.", img:"service5.jpg"},
    {title:"Car Pre-Purchase Inspection", desc:"Thorough vehicle inspection before purchase to avoid surprises.", img:"service6.jpg"},
    {title:"Online Coding & Software Upgrades", desc:"Vehicle software updates and programming.", img:"service7.jpg"},
    {title:"Key Duplication", desc:"Secure and reliable key duplication.", img:"service8.jpg"},
    {title:"Interior Works", desc:"Interior repairs, restoration, and cleaning.", img:"service9.jpg"}
  ];

  const productsData = [
    {title:"BMW X6 F16 Air Struts (2015-2019)", price:"KSh 180,000", img:"product1.jpg"},
    {title:"F87 M2 F22 2 Series Headlights (2014–2021)", price:"KSh 250,000", img:"product2.jpg"},
    {title:"Porsche Cayenne Air Suspension (2011–2017)", price:"KSh 370,000", img:"product3.jpg"},
    {title:"Porsche Cayenne Xenon Projector Headlights", price:"KSh 130,000", img:"product4.jpg"}
  ];

  const brandsData = [
    {key:"audi", name:"Audi", page:"audi.html"},
    {key:"bmw", name:"BMW", page:"bmw.html"},
    {key:"mercedes", name:"Mercedes-Benz", page:"mercedes.html"},
    {key:"volkswagen", name:"Volkswagen", page:"volkswagen.html"},
    {key:"porsche", name:"Porsche", page:"porsche.html"},
    {key:"range", name:"Range Rover", page:"range.html"}
  ];

  /* ==================== BOT LOGIC ==================== */
  const chatbotToggle = document.getElementById("chatbot-toggle");
  const chatbotContainer = document.getElementById("chatbot-container");
  const chatbotClose = document.getElementById("chatbot-close");
  const chatbotMessages = document.getElementById("chatbot-messages");
  const chatbotInput = document.getElementById("chatbot-input");
  const chatbotSend = document.getElementById("chatbot-send");

  chatbotToggle.addEventListener("click", ()=>{ chatbotContainer.style.display="flex"; });
  chatbotClose.addEventListener("click", ()=>{ chatbotContainer.style.display="none"; });

  function appendMessage(text,sender){
    const msg=document.createElement("div");
    msg.classList.add("message",sender);
    msg.innerHTML=text;
    chatbotMessages.appendChild(msg);
    chatbotMessages.scrollTop=chatbotMessages.scrollHeight;
  }

  function appendButtonMessage(text, buttons){
    const msg = document.createElement("div");
    msg.classList.add("message","bot");
    let btnHTML = buttons.map(b=>`<button class="dynamic-btn" data-action="${b.action}">${b.text}</button>`).join(" ");
    msg.innerHTML = `<p>${text}</p><div>${btnHTML}</div>`;
    chatbotMessages.appendChild(msg);

    msg.querySelectorAll(".dynamic-btn").forEach(btn=>{
      btn.addEventListener("click",()=>handleAction(btn.dataset.action));
    });

    chatbotMessages.scrollTop=chatbotMessages.scrollHeight;
  }

  function sendUserMessage(text){
    if(text==="") return;
    appendMessage(text,"user");
    chatbotInput.value="";
    setTimeout(()=>botReply(text.toLowerCase()),500);
  }

  chatbotSend.addEventListener("click", ()=>sendUserMessage(chatbotInput.value.trim()));
  chatbotInput.addEventListener("keypress", e=>{ if(e.key==="Enter") sendUserMessage(chatbotInput.value.trim()); });

  function botReply(msg){
    if(msg.includes("hi")||msg.includes("hello")){
      appendMessage("Hi! How can I help you today? You can ask about <b>services</b>, <b>shop</b>, <b>booking</b>, <b>locations</b>, or <b>brands</b>.","bot");
      return;
    }
    if(msg.includes("service")||msg.includes("services")){ showServices(); return; }
    if(msg.includes("shop")||msg.includes("products")){ showProducts(); return; }
    if(msg.includes("book")||msg.includes("appointment")){
      appendMessage('You can book an appointment using the booking form above or click the button below.',"bot");
      appendButtonMessage("Go to Booking",[{"text":"Book Now","action":"booking"}]);
      return;
    }
    if(msg.includes("location")||msg.includes("branch")){
      appendMessage('Our branches are located at Ngong Road, Kiambu By-pass, and Karen.',"bot");
      appendButtonMessage("View Locations",[{"text":"Locations","action":"locations"}]);
      return;
    }
    if(msg.includes("contact")||msg.includes("phone")||msg.includes("email")){
      appendMessage("You can contact us via phone: 0704 222 666 or email: germanexpertscenter@gmail.com","bot");
      return;
    }
    for(let brand of brandsData){
      if(msg.includes(brand.key)){
        appendMessage(`You can view ${brand.name} services and products <a href="${brand.page}" target="_blank">here</a>.`,"bot");
        return;
      }
    }
    appendMessage("I’m sorry, I didn’t understand that. Try asking about <b>services</b>, <b>shop</b>, <b>booking</b>, <b>locations</b>, or <b>brands</b>.","bot");
  }

  function handleAction(action){
    switch(action){
      case "services": showServices(); break;
      case "shop": showProducts(); break;
      case "booking": document.getElementById("booking").scrollIntoView({behavior:"smooth"}); appendMessage("Here is the booking form above.","bot"); break;
      case "locations": document.getElementById("locations").scrollIntoView({behavior:"smooth"}); appendMessage("Here are our locations above.","bot"); break;
      case "back": appendMessage("What else can I help you with? You can ask about <b>services</b>, <b>shop</b>, <b>booking</b>, <b>locations</b>, or <b>brands</b>.","bot"); break;
    }
  }

  function showServices(){
    let html="<p>Here are our main services:</p><div>";
    servicesData.forEach(s=>{
      html+=`<div style="margin:10px 0;">
              <img src="${s.img}" alt="${s.title}" style="width:80px;vertical-align:middle;margin-right:10px;">
              <b>${s.title}</b>: ${s.desc}
              <br><button onclick="document.getElementById('booking').scrollIntoView({behavior:'smooth'})">Book</button>
            </div>`;
    });
    html+=`<br><button class="dynamic-btn" data-action="back">Go Back</button></div>`;
    appendMessage(html,"bot");
    setTimeout(()=>{ document.querySelectorAll(".dynamic-btn").forEach(btn=>btn.addEventListener("click",()=>handleAction(btn.dataset.action))); },100);
  }

  function showProducts(){
    let html="<p>Here are our products:</p><div>";
    productsData.forEach(p=>{
      html+=`<div style="margin:10px 0;">
              <img src="${p.img}" alt="${p.title}" style="width:80px;vertical-align:middle;margin-right:10px;">
              <b>${p.title}</b>: ${p.price}
              <br><button onclick="document.getElementById('payments').scrollIntoView({behavior:'smooth'})">Buy Now</button>
            </div>`;
    });
    html+=`<br><button class="dynamic-btn" data-action="back">Go Back</button></div>`;
    appendMessage(html,"bot");
    setTimeout(()=>{ document.querySelectorAll(".dynamic-btn").forEach(btn=>btn.addEventListener("click",()=>handleAction(btn.dataset.action))); },100);
  }

  /* ==================== BRAND CARD CLICK FIXED ==================== */
  document.querySelectorAll(".brand-card").forEach(card => {
    card.addEventListener("click", () => {
      const brandKey = card.dataset.brand; // make sure HTML has data-brand
      if(!brandKey) return alert("Brand key not set in HTML!");
      const brand = brandsData.find(b => b.key === brandKey);
      if (brand && brand.page) {
        window.open(brand.page, "_blank");
      } else {
        alert("Brand page not found!");
      }
    });
  });

});
