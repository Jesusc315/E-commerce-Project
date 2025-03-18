  // When the DOM loads, set up event listeners for the registration form
document.addEventListener("DOMContentLoaded", () => {
    const registerForm = document.querySelector("#register-form")
    registerForm.addEventListener("submit", registerFormSubmit)
  })
  
  // Function to handle the registration form submission
  async function registerFormSubmit(event) {
    // 1. Prevent the default form submission
    event.preventDefault()
  
    const registerForm = document.querySelector("#register-form")
  
    // 2. Gather all form data into an object
    const formData = {
      name: registerForm.elements["name"].value,
      lastName: registerForm.elements["lastName"].value,
      email: registerForm.elements["email"].value,
      password: registerForm.elements["password"].value,
      address: {
        street: registerForm.elements["street"].value,
        city: registerForm.elements["city"].value,
        state: registerForm.elements["state"].value,
        zip: registerForm.elements["zip"].value,
      },
    }
  
    // 3. Validate form data
    const errors = validateForm(formData)
    if (errors.length > 0) {
      displayErrors(errors)
      return
    }
  
    // 4. Send the data to your API using fetch() with POST method
    try {
      const response = await fetch("http://localhost:3000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
  
      // 5. Handle the response
      if (response.ok) {
        const data = await response.json()
        // Store user data in localStorage
        localStorage.setItem("userData", JSON.stringify(data))
        // Redirect to home page
        window.location.href = "/home.html"
      } else {
        const errorData = await response.json()
        displayErrors([errorData.message || "Registration failed"])
      }
    } catch (error) {
      console.error("Registration error:", error)
      displayErrors(["An unexpected error occurred. Please try again."])
    }
  }
  
  // Helper function for form validation
  function validateForm(formData) {
    const errors = []
    if (!formData.name) errors.push("Name is required")
    if (!formData.lastName) errors.push("Last name is required")
    if (!formData.email) errors.push("Email is required")
    if (!/\S+@\S+\.\S+/.test(formData.email)) errors.push("Email is invalid")
    if (!formData.password) errors.push("Password is required")
    if (formData.password.length < 8) errors.push("Password must be at least 8 characters")
    if (!formData.address.street) errors.push("Street is required")
    if (!formData.address.city) errors.push("City is required")
    if (!formData.address.state) errors.push("State is required")
    if (!formData.address.zip) errors.push("ZIP code is required")
    return errors
  }
  
  // Helper function to display errors
  function displayErrors(errors) {
    const errorContainer = document.getElementById("error-container")
    errorContainer.innerHTML = ""
    errors.forEach((error) => {
      const errorElement = document.createElement("p")
      errorElement.textContent = error
      errorContainer.appendChild(errorElement)
    })
  }
  
  