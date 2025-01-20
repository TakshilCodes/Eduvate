document.addEventListener("DOMContentLoaded", function () {
  // Ensure the first dropdown menu is visible by default
  const firstDropdownMenu = document.querySelector("#dropdown1 .dropdown-menu");
  if (firstDropdownMenu) firstDropdownMenu.style.display = "block";

  loadProducts(); // Load all products on page load
});

// Function to toggle the navigation menu
function toggleMenu() {
  const links = document.querySelector(".links ul");
  const register = document.querySelector(".register");

  if (links && register) {
    links.classList.toggle("active");
    register.classList.toggle("active");
  }
}

const menuToggle2 = document.querySelector('.menu-toggle2');
const menu2 = document.querySelector('.spec');

// Toggle the mobile menu when the menu button is clicked
menuToggle2.addEventListener('click', () => {
    menu2.classList.toggle('active');
});

// Function to toggle dropdowns
function toggleDropdown(event, dropdownNumber) {
  event.stopPropagation();

  const dropdownMenu = document.querySelector(`#dropdown${dropdownNumber} .dropdown-menu`);
  const nextDropdown = document.querySelector(`#dropdown${dropdownNumber + 1}`);

  if (dropdownMenu) {
    closeAllDropdowns();

    // Toggle the visibility of the current dropdown menu
    dropdownMenu.style.display = dropdownMenu.style.display === "block" ? "none" : "block";

    // Adjust margin-top of the next dropdown
    if (nextDropdown) {
      nextDropdown.style.marginTop = dropdownMenu.style.display === "block" ? "150px" : "0";
    }
  }
}

function selectItem(item, event, dropdownNumber, value = null) {
  event.stopPropagation();

  const button = document.querySelector(`#dropdown${dropdownNumber} .dropdown-button`);
  if (button) button.textContent = item.textContent;

  closeAllDropdowns();

  // Handle dropdown filtering
  if (dropdownNumber === 1) {
    filterProductsByPrice(item.textContent.trim());
  } else if (dropdownNumber === 2) {
    filterProductsByLevel(value || item.textContent.trim().toLowerCase());
  } else if (dropdownNumber === 4) {
    filterProductsByType(item.textContent.trim().toLowerCase());
  }
}

// Function to filter products by price range
function filterProductsByPrice(range) {
  let minPrice = 0;
  let maxPrice = Infinity;

  if (range === "₹0-100") {
    maxPrice = 100;
  } else if (range === "₹100-500") {
    minPrice = 100;
    maxPrice = 500;
  } else if (range === "₹500-1000") {
    minPrice = 500;
    maxPrice = 1000;
  }

  const filteredProducts = products.filter(product => product.price >= minPrice && product.price < maxPrice);
  renderProducts(filteredProducts);
}

// Function to filter products by level
function filterProductsByLevel(level) {
  const filteredProducts = level === "both"
    ? products
    : products.filter(product => product.level.toLowerCase() === level.toLowerCase());
  renderProducts(filteredProducts);
}

// Function to filter products by type
function filterProductsByType(type) {
  const filteredProducts = products.filter(product => product.type.toLowerCase() === type.toLowerCase());
  renderProducts(filteredProducts);
}

// Function to close all dropdown menus
function closeAllDropdowns() {
  const allDropdownMenus = document.querySelectorAll(".dropdown-menu");
  allDropdownMenus.forEach(menu => (menu.style.display = "none"));

  const allDropdowns = document.querySelectorAll(".dropdown");
  allDropdowns.forEach(dropdown => (dropdown.style.marginTop = "0"));
}

// Event listener to close dropdowns when clicking outside
document.addEventListener("click", closeAllDropdowns);

// Product data
const products = [
  { name: "Complete Python with DSA", author: "Takshil Pandya", price: 150, img: "../Assets/Images/product/phython.jpeg", level: "both", type: "course" },
  { name: "JavaScript Basic to Advance", author: "Takshil Pandya", price: 130, img: "../Assets/Images/product/javascript.jpeg", level: "both", type: "course" },
  { name: "Complete Java with DSA", author: "Takshil Pandya", price: 200, img: "../Assets/Images/product/java.jpeg", level: "both", type: "course" },
  { name: "C++ Basic to Advance", author: "Takshil Pandya", price: 220, img: "../Assets/Images/product/C++.jpeg", level: "both", type: "course" },
  { name: "Premiere Pro Tools 2024", author: "Takshil Pandya", price: 400, img: "../Assets/Images/product/pre.jpeg", level: "advanced", type: "course" },
  { name: "Photoshop Tools 2024", author: "Takshil Pandya", price: 380, img: "../Assets/Images/product/photoshop.jpeg", level: "advanced", type: "course" },
  { name: "Ultimate C# Masterclass", author: "Takshil Pandya", price: 140, img: "../Assets/Images/product/csharp.jpeg", level: "both", type: "course" },
  { name: "Excel from Basic to Advanced", author: "Takshil Pandya", price: 350, img: "../Assets/Images/product/excel.jpeg", level: "both", type: "course" },
  { name: "After Effects Tools 2024", author: "Takshil Pandya", price: 480, img: "../Assets/Images/product/aftereffects.jpeg", level: "advanced", type: "course" },
  { name: "Word from Basic to Advanced", author: "Takshil Pandya", price: 480, img: "../Assets/Images/product/Word.jpeg", level: "both", type: "course" },
  { name: "PowerPoint from Basic to Advanced", author: "Takshil Pandya", price: 460, img: "../Assets/Images/product/powerpoint.jpeg", level: "both", type: "course" },
  { name: "Python Basic", author: "Takshil Pandya", price: 70, img: "../Assets/Images/product/phython.jpeg", level: "basic", type: "course" },
  { name: "JavaScript Basic", author: "Takshil Pandya", price: 60, img: "../Assets/Images/product/javascript.jpeg", level: "basic", type: "course" },
  { name: "Java Basic", author: "Takshil Pandya", price: 110, img: "../Assets/Images/product/java.jpeg", level: "basic", type: "course" },
  { name: "C++ Basic", author: "Takshil Pandya", price: 110, img: "../Assets/Images/product/C++.jpeg", level: "basic", type: "course" },
  { name: "C# Basic", author: "Takshil Pandya", price: 50, img: "../Assets/Images/product/csharp.jpeg", level: "basic", type: "course" },
  { name: "PowerPoint using AI", author: "Takshil Pandya", price: 550, img: "../Assets/Images/product/powerpoint.jpeg", level: "advanced", type: "course" },
];

// Render products based on filter
function renderProducts(productsToRender) {
  const productList = document.getElementById("product-list");
  productList.innerHTML = ""; // Clear previous content

  if (productsToRender.length === 0) {
    productList.innerHTML = `<p class="no-results">No products found matching your search.</p>`;
  } else {
    productsToRender.forEach(product => {
      const productDiv = document.createElement("div");
      productDiv.className = "prod";
      productDiv.innerHTML = `
        <div class="prodimg">
          <img src="${product.img}" alt="${product.name}">
        </div>
        <div class="prodinfo">
          <p class="prodname">${product.name}</p>
          <p class="madeby">${product.author}</p>
          <p class="prodprice">₹${product.price}</p>
          <a href="#">Get <i class="arrow fa-solid fa-chevron-right"></i></a>
        </div>
      `;
      productList.appendChild(productDiv);
    });
  }
}

// Load all products initially
function loadProducts() {
  renderProducts(products);
}

// Search for products
function performSearch() {
  const query = document.getElementById("search-bar").value.toLowerCase();
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(query) ||
    product.author.toLowerCase().includes(query)
  );
  renderProducts(filteredProducts);
}

function performSearch2() {
  const query = document.getElementById("search-bar2").value.toLowerCase();
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(query) ||
    product.author.toLowerCase().includes(query)
  );
  renderProducts(filteredProducts);
}
