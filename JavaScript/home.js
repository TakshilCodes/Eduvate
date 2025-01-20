// Simulating a dynamic fetch of products (you can replace this with an actual API call)
const products = [
    { name: "Complete Python with DSA", author: "Takshil Pandya", price: "₹150", img: "../Assets/Images/product/phython.jpeg" },
    { name: "JavaScript Basic to Advance", author: "Takshil Pandya", price: "₹130", img: "../Assets/Images/product/javascript.jpeg" },
    { name: "Complete Java with DSA", author: "Takshil Pandya", price: "₹200", img: "../Assets/Images/product/java.jpeg" },
    { name: "C++ Basic to Advance", author: "Takshil Pandya", price: "₹220", img: "../Assets/Images/product/C++.jpeg" },
    { name: "Premiere Pro Tools 2024", author: "Takshil Pandya", price: "₹400", img: "../Assets/Images/product/pre.jpeg" },
    { name: "Photoshop Tools 2024", author: "Takshil Pandya", price: "₹380", img: "../Assets/Images/product/photoshop.jpeg" },
    { name: "Ultimate C# Masterclass", author: "Takshil Pandya", price: "₹140", img: "../Assets/Images/product/csharp.jpeg" },
    { name: "Excel from Basic to Advanced", author: "Takshil Pandya", price: "₹350", img: "../Assets/Images/product/excel.jpeg" },
];

// Function to render products on the page
function renderProducts(productList, productsToRender) {
    const placeholder = document.getElementById("placeholder");
    const getStartedButton = document.getElementById("get-started-btn");

    if (productsToRender.length === 0) {
        productList.innerHTML = `<p class="no-results">No products found matching your search.</p>`;
    } else {
        productList.innerHTML = productsToRender.map(product => `
            <div class="prod">
                <div class="prodimg">
                    <img src="${product.img}" alt="${product.name}">
                </div>
                <div class="prodinfo">
                    <p class="prodname">${product.name}</p>
                    <p class="madeby">${product.author}</p>
                    <p class="prodprice">${product.price}</p>
                    <a href="#">Get <i class="arrow fa-solid fa-chevron-right"></i></a>
                </div>
            </div>
        `).join('');
    }

    // Show or hide placeholder image and "Get Started" button
    if (productsToRender.length < products.length) {
        placeholder.style.display = "none";
        getStartedButton.style.display = "none";
    } else {
        placeholder.style.display = "block";
        getStartedButton.style.display = "block";
    }
}

// Load all products on page load
function loadProducts() {
    const productList = document.getElementById("product-list");
    renderProducts(productList, products);
}

// Perform search and update product list
function performSearch() {
    const query = document.getElementById("search-bar").value.toLowerCase();
    const filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(query) ||
        product.author.toLowerCase().includes(query)
    );
    const productList = document.getElementById("product-list");
    renderProducts(productList, filteredProducts);
}

// Initialize product list on window load
window.onload = loadProducts;

function toggleMenu() {
    const links = document.querySelector(".links ul");
    const regester = document.querySelector(".register");
  
    if (links && regester) {
      links.classList.toggle("active");
      regester.classList.toggle("active");
    }
  }

// Initialize EmailJS
emailjs.init("iNawZioSFBX1U70iu"); // Replace YOUR_PUBLIC_KEY with your EmailJS Public Key

// Handle form submission
document.getElementById("contact-form").addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent default form submission

    // Collect form data
    const params = {
        user_name: document.getElementById("user_name").value.trim(),
        user_email: document.getElementById("user_email").value.trim(),
        message: document.getElementById("message").value.trim(),
    };

    // Basic validation to ensure fields are not empty
    if (!params.user_name || !params.user_email || !params.message) {
        alert("Please fill in all fields before submitting.");
        return;
    }

    // Sending the email
    emailjs
        .send("service_u49y045", "template_4h08t8j", params) // Replace with your Service ID and Template ID
        .then(
            function (response) {
                alert("Message sent successfully!");
                console.log("Email sent successfully:", response);
                document.getElementById("contact-form").reset(); // Clear the form
            },
            function (error) {
                alert("Failed to send message. Please try again later.");
                console.error("EmailJS error:", error);
            }
        );
});


