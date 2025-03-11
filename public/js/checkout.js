document.addEventListener("DOMContentLoaded", function () {
    const query = new URLSearchParams(window.location.search);
    const cartItems = Array.from(query.entries());
    const cartSummary = document.getElementById('cart-summary');
    
    let subtotal = 0;
    let productHTML = "";
    let products = [];

    // Load user data from users.json
    fetch('users.json')
      .then(response => response.json())
      .then(users => {
        // Validate the login form
        document.getElementById('submit-btn').addEventListener('click', function () {
          const email = document.getElementById('email').value;
          const password = document.getElementById('password').value;
          
          // Check if the email and password match any user
          const user = users.find(u => u.email === email && u.password == password);

          if (user) {
            // Login successful, proceed with the checkout form submission
            const form = document.getElementById('checkout-form');
            if (form.checkValidity()) {  
              const formData = new FormData(form);  // Capture all form data
              const url = new URL('confirmation.html', window.location.href);
              const params = new URLSearchParams();

              // Add all form fields to URL params
              formData.forEach((value, key) => {
                params.set(key, value); // This includes the email
              });

              // Include calculated prices and products as well
              params.set('subtotal', subtotal.toFixed(2));
              params.set('tax', tax.toFixed(2));
              params.set('total', total.toFixed(2));

              // Include all product prices
              products.forEach((price, index) => {
                params.set(`product_${index}`, `Product: $${price}`);
              });

              // Redirect to confirmation page with parameters
              url.search = params.toString();
              window.location.href = url;
            } else {
              form.reportValidity(); // Show validation errors if any
            }
          } else {
            // Show error if email/password is invalid
            document.getElementById('error').textContent = 'Invalid email or password';
          }
        });
      })
      .catch(error => {
        console.error('Error loading users.json:', error);
        // Handle errors loading the JSON file
      });

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
    let productListHTML = "";
    cartItems.forEach(([key, value], index) => {
      if (key === 'name' || key === 'price') {
        if (key === 'name') {
          const price = cartItems[index + 1] ? cartItems[index + 1][1] : 0; // Get next price value
          productListHTML += `<div><strong>${value}:</strong> <span class="product-price">$${price}</span></div>`;
        }
      }
    });

    // Insert product details into cart-summary
    document.getElementById('product-details').innerHTML = productListHTML;
    document.getElementById('subtotal').textContent = "$" + subtotal.toFixed(2);
    document.getElementById('tax').textContent = "$" + tax.toFixed(2);
    document.getElementById('total').textContent = "$" + total.toFixed(2);
  });