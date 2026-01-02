document.addEventListener("DOMContentLoaded", () => {
  const shopGrid = document.querySelector(".shop-grid");
  if (!shopGrid) {
    console.error("❌ No .shop-grid found!");
    return;
  }

  fetch("products.json")
    .then(response => {
      if (!response.ok) throw new Error("Could not load JSON: " + response.status);
      return response.json();
    })
    .then(products => {
      console.log("✅ Products loaded:", products); // DEBUG

      shopGrid.innerHTML = "";

      products.forEach(p => {
        const card = document.createElement("div");
        card.className = "product-card";

        // Directly use the filename from JSON, images are in the same folder
        const imgSrc = p.images && p.images.length ? p.images[0] : "placeholder.jpg";

        card.innerHTML = `
          <img src="${imgSrc}" alt="${p.name}" style="width:100%;height:150px;object-fit:cover;margin-bottom:8px;">
          <h3>${p.name}</h3>
          <p class="price">
            KSh ${p.salePrice.toLocaleString()}
            <span class="original-price">KSh ${p.price.toLocaleString()}</span>
          </p>
          <p>${p.shortDescription}</p>
          <button class="add-cart">Add to Cart</button>
        `;

        card.querySelector(".add-cart").addEventListener("click", () => {
          let cart = JSON.parse(localStorage.getItem("cart")) || [];
          cart.push({ id: p.id, name: p.name, price: p.salePrice });
          localStorage.setItem("cart", JSON.stringify(cart));
          alert(`🛒 ${p.name} added to cart`);
        });

        shopGrid.appendChild(card);
      });
    })
    .catch(err => {
      console.error("❌ Failed to load products:", err);
      shopGrid.innerHTML = "<p style='color:red;'>Failed to load products. Check JSON path and console.</p>";
    });
});
