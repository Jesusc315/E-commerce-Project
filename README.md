# Fork this repo to start your e-commerce project

<select class="form-control" id="state" required>
            <option value="">Select your state</option>
            <option value="AL">AL</option>
            <option value="AK">AK</option>
            <option value="AZ">AZ</option>
            <option value="AR">AR</option>
            <option value="CA">CA</option>
            <option value="CO">CO</option>
            <option value="CT">CT</option>
            <option value="DE">DE</option>
            <option value="FL">FL</option>
            <option value="GA">GA</option>
            <option value="HI">HI</option>
            <option value="ID">ID</option>
            <option value="IL">IL</option>
            <option value="IN">IN</option>
            <option value="IA">IA</option>
            <option value="KS">KS</option>
            <option value="KY">KY</option>
            <option value="LA">LA</option>
            <option value="ME">ME</option>
            <option value="MD">MD</option>
            <option value="MA">MA</option>
            <option value="MI">MI</option>
            <option value="MN">MN</option>
            <option value="MS">MS</option>
            <option value="MO">MO</option>
            <option value="MT">MT</option>
            <option value="NE">NE</option>
            <option value="NV">NV</option>
            <option value="NH">NH</option>
            <option value="NJ">NJ</option>
            <option value="NM">NM</option>
            <option value="NY">NY</option>
            <option value="NC">NC</option>
            <option value="ND">ND</option>
            <option value="OH">OH</option>
            <option value="OK">OK</option>
            <option value="OR">OR</option>
            <option value="PA">PA</option>
            <option value="RI">RI</option>
            <option value="SC">SC</option>
            <option value="SD">SD</option>
            <option value="TN">TN</option>
            <option value="TX">TX</option>
            <option value="UT">UT</option>
            <option value="VT">VT</option>
            <option value="VA">VA</option>
            <option value="WA">WA</option>
            <option value="WV">WV</option>
            <option value="WI">WI</option>
            <option value="WY">WY</option>
          </select>
          <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Checkout</title>
    <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
      rel="stylesheet"
      integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH"
      crossorigin="anonymous"
    />
  </head>
  <body>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <a class="navbar-brand" href="#">Navbar</a>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item">
            <a class="nav-link" href="index.html">Products</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="checkout.html">Checkout</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="confirmation.html">Confirmation</a>
          </li>
        </ul>
      </div>
    </nav>

    <div class="container mt-5">
      <form id="checkout-form">
        <h1>Checkout</h1>

        <!-- Cart Summary and Prices -->
        <div id="cart-summary">
          <!-- Cart summary will be dynamically inserted here -->
        </div>

        <h2>Subtotal</h2>
        <div id="subtotal">
          <!-- Subtotal will display here-->
        </div>

        <h2>Tax</h2>
        <div id="tax">
          <!-- Tax will display here-->
        </div>

        <h2>Total</h2>
        <div id="total">
          <!-- Total will display here-->
        </div>

        <!-- Login Information -->
        <h2>Login</h2>
        <h3 id="error"></h3>
        <div class="form-group">
          <label for="email">Email address <span class="text-danger">*</span></label>
          <input
            type="email"
            class="form-control"
            id="email"
            placeholder="Enter your email"
            required
          />
        </div>
        <div class="form-group">
          <label for="password">Password <span class="text-danger">*</span></label>
          <input
            type="password"
            class="form-control"
            id="password"
            placeholder="Enter your password"
            required
          />
        </div>

        <!-- Shipping Information -->
        <h2>Shipping Address</h2>
        <div class="form-group">
          <label for="address">Address <span class="text-danger">*</span></label>
          <input
            type="text"
            class="form-control"
            id="address"
            placeholder="Enter your address"
            required
          />
        </div>
        <div class="form-group">
          <label for="apartment">Apartment Number</label>
          <input
            type="text"
            class="form-control"
            id="apartment"
            placeholder="Enter your apartment number (optional)"
          />
        </div>
        <div class="form-group">
          <label for="city">City <span class="text-danger">*</span></label>
          <input
            type="text"
            class="form-control"
            id="city"
            placeholder="Enter your city"
            required
          />
        </div>
        <div class="form-group">
          <label for="state">State <span class="text-danger">*</span></label>
         <select class="form-control" id="state" required>
            <option value="">Select your state</option>
            <option value="AL">AL</option>
            <option value="AK">AK</option>
            <option value="AZ">AZ</option>
            <option value="AR">AR</option>
            <option value="CA">CA</option>
            <option value="CO">CO</option>
            <option value="CT">CT</option>
            <option value="DE">DE</option>
            <option value="FL">FL</option>
            <option value="GA">GA</option>
            <option value="HI">HI</option>
            <option value="ID">ID</option>
            <option value="IL">IL</option>
            <option value="IN">IN</option>
            <option value="IA">IA</option>
            <option value="KS">KS</option>
            <option value="KY">KY</option>
            <option value="LA">LA</option>
            <option value="ME">ME</option>
            <option value="MD">MD</option>
            <option value="MA">MA</option>
            <option value="MI">MI</option>
            <option value="MN">MN</option>
            <option value="MS">MS</option>
            <option value="MO">MO</option>
            <option value="MT">MT</option>
            <option value="NE">NE</option>
            <option value="NV">NV</option>
            <option value="NH">NH</option>
            <option value="NJ">NJ</option>
            <option value="NM">NM</option>
            <option value="NY">NY</option>
            <option value="NC">NC</option>
            <option value="ND">ND</option>
            <option value="OH">OH</option>
            <option value="OK">OK</option>
            <option value="OR">OR</option>
            <option value="PA">PA</option>
            <option value="RI">RI</option>
            <option value="SC">SC</option>
            <option value="SD">SD</option>
            <option value="TN">TN</option>
            <option value="TX">TX</option>
            <option value="UT">UT</option>
            <option value="VT">VT</option>
            <option value="VA">VA</option>
            <option value="WA">WA</option>
            <option value="WV">WV</option>
            <option value="WI">WI</option>
            <option value="WY">WY</option>
          </select>
        </div>
        <div class="form-group">
          <label for="zip">Zip Code <span class="text-danger">*</span></label>
          <input
            type="text"
            class="form-control"
            id="zip"
            placeholder="Enter your zip code"
            required
          />
        </div>

        <button type="button" class="btn btn-primary" id="submit-btn">Submit</button>
      </form>
    </div>

    <script>
      document.addEventListener("DOMContentLoaded", function () {
        const query = new URLSearchParams(window.location.search);
        const cartItems = Array.from(query.entries());
        const cartSummary = document.getElementById('cart-summary');

        let subtotal = 0;
        let productHTML = "";
        let products = [];

        // Loop through the cart items and sum up the prices
        cartItems.forEach(([key, value]) => {
          if (key === 'name' || key === 'price') {
            if (key === 'name') {
              productHTML += `<p><strong>Product:</strong> ${value}</p>`;
            }
            if (key === 'price') {
              subtotal += parseFloat(value); // Add price to subtotal
              products.push(value); // Save product price for later
            }
          }
        });

        // Assuming tax is 15%
        const tax = subtotal * 0.15;
        const total = subtotal + tax;

        // Display product details, subtotal, tax, and total
        cartSummary.innerHTML = productHTML;
        document.getElementById('subtotal').textContent = "$" + subtotal.toFixed(2);
        document.getElementById('tax').textContent = "$" + tax.toFixed(2);
        document.getElementById('total').textContent = "$" + total.toFixed(2);

        // Handle form submission
        document.getElementById('submit-btn').addEventListener('click', function () {
          const formData = new FormData(document.getElementById('checkout-form'));
          const url = new URL('confirmation.html', window.location.href);
          const params = new URLSearchParams();

          formData.forEach((value, key) => {
            params.set(key, value);
          });

          // Include calculated prices and products as well
          params.set('subtotal', subtotal.toFixed(2));
          params.set('tax', tax.toFixed(2));
          params.set('total', total.toFixed(2));
          products.forEach((price, index) => {
            params.set(`product_${index}`, `Product: $${price}`);
          });

          // Redirect to confirmation page with parameters
          url.search = params.toString();
          window.location.href = url;
        });
      });
    </script>
  </body>
</html>
<form id="checkout-form">
  <h1>Checkout</h1>

  <!-- Cart Summary Section -->
  <div id="cart-summary" class="mb-4">
    <h2>Cart Summary</h2>
    <div class="card shadow-sm mb-3">
      <div class="card-body">
        <h5 class="card-title">Products</h5>
        <div id="product-details">
          <!-- Cart items will be dynamically inserted here -->
        </div>
      </div>
    </div>
  </div>

  <!-- Pricing Information -->
  <div class="row mb-4">
    <div class="col-12 col-md-6">
      <div class="card border-light">
        <div class="card-body">
          <h5 class="card-title">Subtotal</h5>
          <p id="subtotal" class="h4 text-dark">$0.00</p>
        </div>
      </div>
    </div>
    <div class="col-12 col-md-6">
      <div class="card border-light">
        <div class="card-body">
          <h5 class="card-title">Tax (15%)</h5>
          <p id="tax" class="h4 text-dark">$0.00</p>
        </div>
      </div>
    </div>
  </div>

  <!-- Total Price -->
  <div class="row mb-4">
    <div class="col-12 col-md-6">
      <div class="card bg-success text-white">
        <div class="card-body">
          <h5 class="card-title">Total</h5>
          <p id="total" class="h3">$0.00</p>
        </div>
      </div>
    </div>
  </div>

  <!-- Login Information -->
  <h2>Login</h2>
  <h3 id="error"></h3>
  <div class="form-group">
    <label for="email">Email address <span class="text-danger">*</span></label>
    <input
      type="email"
      class="form-control"
      id="email"
      name="email"  
      placeholder="Enter your email"
      required
    />
  </div>
  <div class="form-group">
    <label for="password">Password <span class="text-danger">*</span></label>
    <input
      type="password"
      class="form-control"
      id="password"
      name="password"
      placeholder="Enter your password"
      required
    />
  </div>

  <!-- Shipping Information -->
  <h2>Shipping Address</h2>
  <div class="form-group">
    <label for="address">Address <span class="text-danger">*</span></label>
    <input
      type="text"
      class="form-control"
      id="address"
      name="address"
      placeholder="Enter your address"
      required
    />
  </div>
  <!-- Add other fields similarly -->

  <button type="button" class="btn btn-primary" id="submit-btn">Submit</button>
</form>
