document.addEventListener("DOMContentLoaded", function () {
  const productList = document.querySelector("#product-list");
  let productsData = [];
  let productHTML = "";
  
  // Fetching products from the backend API
  fetch("products.json")
    .then((response) => response.json())
    .then((data) => {
      productsData = data.products;
      data.products.forEach((product) => {
        productHTML += `<div class="col-md-4">
          <div class="card mb-4 product-card">
            <img src="${product.imageUrl || 'default-image.jpg'}" class="card-img-top" alt="${product.name}">
            <div class="card-body">
              <h5 class="card-title">${product.name}</h5>
              <p class="card-text product-price">$${product.price}</p>
              <p class="card-text product-description">${product.description}</p>
              <button class="btn btn-primary add-to-cart" data-id="${product._id}">Add to Cart</button>
            </div>
          </div>
        </div>`;
      });
      productList.innerHTML = productHTML;

      // Event listener for 'Add to Cart' buttons
      document.querySelectorAll(".add-to-cart").forEach((button) => {
        button.addEventListener("click", addToCart);
      });

      // Initialize an empty cart array
      const cart = [];

      // Add product to cart
      function addToCart(event) {
        const productId = event.target.getAttribute("data-id");
        const product = productsData.find((p) => p._id === productId);
        
        let cartItem = {
          id: product._id,
          name: product.name,
          price: product.price,
        };
        cart.push(cartItem);
        renderCart();
      }

      // Render the cart items on the page
      function renderCart() {
        const cartList = document.getElementById("cart-list");
        let cartItem = "";
        
        cart.forEach((product) => {
          cartItem += `<div class="col-md-4">
            <div class="card mb-4">
              <div class="card-body">
                <h5>${product.name}</h5>
                <p>$${product.price}</p>
                <input type="hidden" name="id" value="${product.id}" />
                <input type="hidden" name="name" value="${product.name}" />
                <input type="hidden" name="price" value="${product.price}" />
                <button class="btn btn-danger remove-from-cart" data-id="${product.id}">
                  Remove
                </button>
              </div>
            </div>
          </div>`;
        });
        cartList.innerHTML = cartItem;

        // Event listener for 'Remove from Cart' buttons
        document.querySelectorAll(".remove-from-cart").forEach((button) => {
          button.addEventListener("click", removeFromCart);
        });
      }

      // Remove product from the cart
      function removeFromCart(event) {
        const productId = event.target.getAttribute("data-id");
        const productIndex = cart.findIndex((product) => product.id === productId);
        cart.splice(productIndex, 1);
        renderCart();
      }
    })
    .catch((error) => {
      console.error('Error fetching products:', error);
      alert('Error fetching products from the server');
    });
});
