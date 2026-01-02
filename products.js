const params = new URLSearchParams(window.location.search);
const productId = params.get("id");

// fetch JSON from repo
fetch("products.json")
  .then(response => {
    if (!response.ok) throw new Error("Could not load JSON: " + response.status);
    return response.json();
  })
  .then(products => {
    const shopGrid = document.querySelector(".shop-grid");
    shopGrid.innerHTML = ""; // clear placeholder

    products.forEach(p => {
      const card = document.createElement("div");
      card.className = "product-card";
      card.innerHTML = `
        <h3>${p.name}</h3>
        <p class="price">${p.price} <span class="original-price">${p.originalPrice}</span></p>
        <img src="${p.img}" alt="${p.name}" style="width:100%;height:150px;object-fit:cover;margin-bottom:5px;">
        <button class="add-cart">Add to Cart</button>
      `;
      shopGrid.appendChild(card);

      // Add to cart
      card.querySelector(".add-cart").addEventListener("click", () => {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        cart.push(p.name);
        localStorage.setItem("cart", JSON.stringify(cart));
        alert(`${p.name} added to cart 🛒`);
      });
    });
  })
  .catch(err => {
    console.error(err);
    document.querySelector(".shop-grid").innerHTML = "<p style='color:red;'>Failed to load products.</p>";
  });
