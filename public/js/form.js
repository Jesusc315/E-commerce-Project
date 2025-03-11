document.addEventListener("DOMContentLoaded", function () {
    const productList = document.querySelector("#product-list");
    let productsData = [];
    let productHTML = "";
    fetch("products.json")
      .then((response) => response.json())
      .then((data) => {
        productsData = data.products;
        data.products.forEach((product) => {
          productHTML += `<div class="col-md-4">
      <div class="card mb-4">
          <img src="https://placehold.co/100" class="card-img-top" alt="Product 1">
          <div class="card-body">
              <h5 class="card-title">${product.name}</h5>
              <p class="card-text">${product.price}</p>
              <p class="card-text">${product.description}</p>
              <button class="btn btn-primary add-to-cart" data-id="${product.id}">Add to Cart</button>
          </div>
      </div>
  </div>`;
        });
        productList.innerHTML = productHTML;
        document.querySelectorAll(".add-to-cart").forEach((button) => {
          button.addEventListener("click", addToCart);
        });
        const cart = [];
        
        function addToCart(event) {
          console.log(event.target.getAttribute("data-id"));
          const productId = event.target.getAttribute("data-id");
          const product = productsData[productId - 1];
          let cartItem = {
            id:product.id,
            name: product.name,
            price: product.price
          };
          cart.push(cartItem);
          console.log(cart);
          renderCart();
        }
        function renderCart() {
          const cartList = document.getElementById("cart-list");
          let cartItem = "";
          cart.forEach((product) => {
            cartItem += 
            `<div class="col-md-4">
      <div class="card mb-4">
          <div class="card-body">
            <div class="cart-item">
              <h5>$${product.name}</h5>
              <p>$${product.price}</p>
              <input type="hidden" name="id" value="${product.id}"/>
              <input type="hidden" name="name" value="${product.name}"/>
              <input type="hidden" name="price" value="${product.price}"/>
              <button class="btn btn-danger remove-from-cart" data-id="${product.id}">
                remove
                </button>
          </div>
      </div>
  </div>
        `;
          });
          cartList.innerHTML = cartItem;
          document.querySelectorAll('.remove-from-cart').forEach((button) => {
            button.addEventListener('click' ,removeFromCart);
          })
        }
        function removeFromCart(event){
          
        }
      });
  });