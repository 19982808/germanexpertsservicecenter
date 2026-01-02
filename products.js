const params = new URLSearchParams(window.location.search);
const productId = params.get("id");

fetch("products.json")
  .then(res => res.json())
  .then(products => {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    document.getElementById("product-name").textContent = product.name;
    document.getElementById("sale-price").textContent =
      `KSh ${product.salePrice.toLocaleString()}`;
    document.getElementById("original-price").textContent =
      `KSh ${product.price.toLocaleString()}`;
    document.getElementById("product-short").textContent =
      product.shortDescription;

    document.getElementById("product-description").textContent =
      product.description || "Contact us for full installation details.";

    const imagesDiv = document.getElementById("product-images");
    product.images.forEach(img => {
      const image = document.createElement("img");
      image.src = img;
      imagesDiv.appendChild(image);
    });

    // ADD TO CART
    document.getElementById("add-to-cart").onclick = () => {
      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      cart.push(product);
      localStorage.setItem("cart", JSON.stringify(cart));
      alert("Added to cart 🛒");
    };
  });
