 //Below is the code that will be activated once the page loads
      //Products are added straight to the main page via the json file
      document.addEventListener("DOMContentLoaded", function () {
        const productList = document.querySelector("#product-list");
        let productsData = [];
        let productHTML = "";
        fetch("/api/products")
          .then((response) => response.json())
          .then((data) => {
            productsData = data;
            data.forEach((product) => {
              productHTML += `<div class="col-md-4">
                <div class="card mb-4 product-card">
                  <img src="${product.image}" class="card-img-top" alt="${product.name}">
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
            document.querySelectorAll(".add-to-cart").forEach((button) => {
              button.addEventListener("click", addToCart);
            });
            //Empty Array to store products that are added via add to cart button to the Array for further handling.
            const cart = [];

            function addToCart(event) {
            const productId = event.target.getAttribute("data-id");
            const product = productsData.find(p => p._id === productId);

            let cartItem = {
              id: product._id,
              name: product.name,
              price: product.price,
            };

              cart.push(cartItem);
              renderCart();
            }
            //Render cart function helps div with Cart-List to display prices of the individual products.
            function renderCart() {
              const cartList = document.getElementById("cart-list");
              let cartItem = "";
              cart.forEach((product) => {
                cartItem += `<div class="col-md-4">
                  <div class="card mb-4">
                    <div class="card-body">
                      <h5>${product.name}</h5>
                      <p>$${product.price}</p>
                      <input type="hidden" name="id" value="${product._id}" />
                      <input type="hidden" name="name" value="${product.name}" />
                      <input type="hidden" name="price" value="${product.price}" />
                      <button class="btn btn-danger remove-from-cart" data-id="${product._id}">
                        Remove
                      </button>
                    </div>
                  </div>
                </div>`;
              });
              cartList.innerHTML = cartItem;
              document.querySelectorAll(".remove-from-cart").forEach((button) => {
                button.addEventListener("click", removeFromCart);
              });
            }

            function removeFromCart(event) {
              const productId = event.target.getAttribute("data-id");
              const productIndex = cart.findIndex((product) => product.id == productId);
              cart.splice(productIndex, 1);
              renderCart();
            }
          });
      }); 