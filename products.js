document.addEventListener("DOMContentLoaded", () => {
  const shopGrid = document.querySelector(".shop-grid");
  const modal = document.getElementById("productModal");

  fetch("products.json")
    .then(res => res.json())
    .then(products => {
      shopGrid.innerHTML = "";

      products.forEach(p => {
        const card = document.createElement("div");
        card.className = "product-card";

        card.innerHTML = `
          <img src="${p.images[0]}" />
          <h3>${p.name}</h3>
          <p>KSh ${p.salePrice}</p>
          <button>View</button>
        `;

        card.querySelector("button").onclick = () => openModal(p);
        shopGrid.appendChild(card);
      });
    });

  function openModal(p) {
    modal.style.display = "block";
    modal.querySelector("#modalImg").src = p.images[0];
    modal.querySelector("#modalName").textContent = p.name;
    modal.querySelector("#modalDesc").textContent = p.fullDescription;
    modal.querySelector("#modalPrice").textContent = `KSh ${p.salePrice}`;

    modal.querySelector("#modalWhatsapp").onclick = () => {
      window.open(
        `https://wa.me/254704222666?text=I want to buy ${p.name} for KSh ${p.salePrice}`,
        "_blank"
      );
    };

    addToCart(p);
  }

  document.getElementById("closeModal").onclick = () => {
    modal.style.display = "none";
  };

  // CART
  function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push({ ...product, qty: 1 });
    localStorage.setItem("cart", JSON.stringify(cart));
  }
});
