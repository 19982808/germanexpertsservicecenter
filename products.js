document.addEventListener("DOMContentLoaded", () => {
  const shopGrid = document.querySelector(".shop-grid");
  if (!shopGrid) return;

  fetch("products.json")
    .then(res => {
      if (!res.ok) throw new Error("products.json not found");
      return res.json();
    })
    .then(products => {
      shopGrid.innerHTML = "";

      products.forEach(p => {
        const card = document.createElement("div");
        card.className = "product-card";

        const img = p.images?.[0] || "";

        card.innerHTML = `
          <img src="${img}" alt="${p.name}">
          <h3>${p.name}</h3>
          <p class="price">
            KSh ${p.salePrice.toLocaleString()}
            <span class="original-price">
              KSh ${p.price.toLocaleString()}
            </span>
          </p>
          <p class="desc">${p.shortDescription}</p>
          <button class="add-cart">Add to Cart</button>
        `;

        card.querySelector(".add-cart").onclick = () => {
          const cart = JSON.parse(localStorage.getItem("cart")) || [];
          cart.push(p);
          localStorage.setItem("cart", JSON.stringify(cart));
          alert(`🛒 ${p.name} added to cart`);
        };

        shopGrid.appendChild(card);
      });

      console.log("✅ Shop loaded:", products.length);
    })
    .catch(err => {
      console.error(err);
      shopGrid.innerHTML =
        "<p style='color:red;text-align:center;'>❌ Failed to load products</p>";
    });
});
