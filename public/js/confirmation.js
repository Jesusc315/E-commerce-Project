document.addEventListener("DOMContentLoaded", function () {
    // Retrieve query parameters
    const queryParams = new URLSearchParams(window.location.search);

    // Display product details
    const productList = document.getElementById("product-list");
    for (let i = 0; i < queryParams.keys().length; i++) {
      const key = queryParams.key(i);
      if (key.startsWith('product_')) {
        const productName = queryParams.get(key);
        const productPrice = queryParams.get('price_' + key.replace('product_', ''));
        const productItem = document.createElement('li');
        productItem.innerHTML = `<span class="product-name">${productName}:</span> <span class="product-price">$${productPrice}</span>`;
        productList.appendChild(productItem);
      }
    }

    // Populate pricing
    document.getElementById("subtotal").textContent = queryParams.get('subtotal');
    document.getElementById("tax").textContent = queryParams.get('tax');
    document.getElementById("total").textContent = queryParams.get('total');

    // Populate shipping info
    document.getElementById("email").textContent = queryParams.get('email');
    document.getElementById("address").textContent = queryParams.get('address');
    document.getElementById("apartment").textContent = queryParams.get('apartment') || 'Not Provided';
    document.getElementById("city").textContent = queryParams.get('city');
    document.getElementById("state").textContent = queryParams.get('state');
    document.getElementById("zip").textContent = queryParams.get('zip');
  });