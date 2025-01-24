document.addEventListener("DOMContentLoaded", function () {
  // Ensure the first dropdown menu is visible by default
  const firstDropdownMenu = document.querySelector("#dropdown1 .dropdown-menu");
  if (firstDropdownMenu) firstDropdownMenu.style.display = "block";
});

// Toggle the navigation menu
function toggleMenu() {
  const links = document.querySelector(".links ul");
  const register = document.querySelector(".register");

  if (links && register) {
    links.classList.toggle("active");
    register.classList.toggle("active");
  }
}

// Mobile menu toggle
const menuToggle2 = document.querySelector(".menu-toggle2");
const menu2 = document.querySelector(".spec");

menuToggle2.addEventListener("click", () => {
  menu2.classList.toggle("active");
});

// Toggle dropdown menus
function toggleDropdown(event, dropdownNumber) {
  event.stopPropagation();

  const dropdownMenu = document.querySelector(`#dropdown${dropdownNumber} .dropdown-menu`);
  const nextDropdown = document.querySelector(`#dropdown${dropdownNumber + 1}`);

  if (dropdownMenu) {
    closeAllDropdowns(); // Close other dropdowns
    dropdownMenu.style.display = dropdownMenu.style.display === "block" ? "none" : "block";

    // Adjust margin for the next dropdown
    if (nextDropdown) {
      nextDropdown.style.marginTop = dropdownMenu.style.display === "block" ? "150px" : "0";
    }
  }
}

// Select dropdown items and apply filters
function selectItem(item, event, dropdownNumber, value = null) {
  event.stopPropagation();

  const button = document.querySelector(`#dropdown${dropdownNumber} .dropdown-button`);
  if (button) button.textContent = item.textContent;

  closeAllDropdowns();

  if (dropdownNumber === 1) {
    filterProductsByPrice(item.textContent.trim());
  } else if (dropdownNumber === 2) {
    filterProductsByLevel(value || item.textContent.trim().toLowerCase());
  } else if (dropdownNumber === 4) {
    filterProductsByType(item.textContent.trim().toLowerCase());
  }
}

// Close all dropdown menus
function closeAllDropdowns() {
  document.querySelectorAll(".dropdown-menu").forEach(menu => (menu.style.display = "none"));
  document.querySelectorAll(".dropdown").forEach(dropdown => (dropdown.style.marginTop = "0"));
}

// Event listener to close dropdowns when clicking outside
document.addEventListener("click", closeAllDropdowns);

// Fetch and render products dynamically
let products = [];

async function fetchProducts() {
  try {
    const response = await fetch("../Assets/Product-Details/product-details.json");
    products = await response.json();
    renderProducts(products);
  } catch (error) {
    console.error("Error fetching product list:", error);
    document.getElementById("product-list").innerHTML = '<p class="error">Failed to load products. Please try again later.</p>';
  }
}

// Render products to the page
function renderProducts(productsToRender) {
  const productList = document.getElementById("product-list");
  productList.innerHTML = ""; // Clear existing content

  if (productsToRender.length === 0) {
    productList.innerHTML = '<p class="no-results">No products found matching your criteria.</p>';
  } else {
    productsToRender.forEach(product => {
      const productDiv = document.createElement("div");
      productDiv.className = "prod";
      productDiv.innerHTML = `
        <div class="prodimg">
          <img src="${product.img}" alt="${product.name}" loading="lazy">
        </div>
        <div class="prodinfo">
          <p class="prodname">${product.name}</p>
          <p class="madeby">${product.author}</p>
          <p class="prodprice">₹${product.price}</p>
          <a href="../HTML/productDisplay.html?name=${encodeURIComponent(product.name)}">Get <i class="arrow fa-solid fa-chevron-right"></i></a>
        </div>
      `;
      productList.appendChild(productDiv);
    });
  }
}

// Search functionality
function performSearch(inputId) {
  const query = document.getElementById(inputId).value.toLowerCase();
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(query) || product.author.toLowerCase().includes(query)
  );
  renderProducts(filteredProducts);
}

// Filter products by price range
function filterProductsByPrice(priceRange) {
  const priceRangeMatch = priceRange.match(/₹(\d+)-₹(\d+)/); // Match the range format like ₹100-500
  if (priceRangeMatch) {
    const [_, min, max] = priceRangeMatch.map(Number); // Extract and parse min and max values as numbers
    const filteredProducts = products.filter(
      product => product.price >= min && product.price <= max
    );
    renderProducts(filteredProducts);
  } else {
    // If no valid range, show all products
    renderProducts(products);
  }
}



// Filter products by level
function filterProductsByLevel(level) {
  const filteredProducts = products.filter(product => product.level === level);
  renderProducts(filteredProducts);
}

// Filter products by type
function filterProductsByType(type) {
  const filteredProducts = products.filter(product => product.type === type);
  renderProducts(filteredProducts);
}

// Initialize the script
fetchProducts();
