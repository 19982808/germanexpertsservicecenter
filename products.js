// Get product ID from URL (optional)
const params = new URLSearchParams(window.location.search);
const productId = params.get("id");

// Select the shop grid container (DECLARE ONCE)
const shopGrid = document.querySelector(".shop-grid");

if (!shopGrid) {
  console.error("❌ No element with class 'shop-grid' found!");
}

// Fetch products JSON
fetch("products.json")
  .then(response => {
    if (!response.ok) {
      throw new Error("Could not load JSON: " + response.status);
    }
    return response.json();
  })
  .then(products => {
    shopGrid.innerHTML = ""; // clear placeholder

    products.forEach(p => {
      const card = document.createElement("div");
      card.className = "product-card";

      // Image (files are in root, not /images)
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

      // Add to cart
      card.querySelector(".add-cart").addEventListener("click", () => {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        cart.push(p.id);
        localStorage.setItem("cart", JSON.stringify(cart));
        alert(`🛒 ${p.name} added to cart`);
      });

      shopGrid.appendChild(card);
    });
  })
  .catch(err => {
    console.error(err);
    shopGrid.innerHTML =
      "<p style='color:red;'>❌ Failed to load products. Check JSON path.</p>";
  });
