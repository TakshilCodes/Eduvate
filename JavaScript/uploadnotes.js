// Function to toggle the navigation menu
function toggleMenu() {
    const links = document.querySelector(".links ul");
    const register = document.querySelector(".register");
  
    if (links && register) {
      links.classList.toggle("active");
      register.classList.toggle("active");
    }
  }
  
// Toggle dropdown visibility
function toggleDropdown(event, dropdownNumber) {
    event.stopPropagation();
  
    const dropdownMenu = document.querySelector(`#dropdown${dropdownNumber} .dropdown-menu`);
    if (dropdownMenu) {
      closeAllDropdowns(); // Close other dropdowns
      dropdownMenu.style.display = dropdownMenu.style.display === "block" ? "none" : "block";
    }
  }
  
  // Close all dropdown menus
  function closeAllDropdowns() {
    const allDropdownMenus = document.querySelectorAll(".dropdown-menu");
    allDropdownMenus.forEach(menu => (menu.style.display = "none"));
  }
  
  // Handle dropdown item selection
  function selectItem(item, event, dropdownNumber, value) {
    event.stopPropagation();
  
    const button = document.querySelector(`#dropdown${dropdownNumber} .dropdown-button`);
    if (button) button.textContent = item.textContent;
  
    closeAllDropdowns();
  }
  
  // Close dropdown when clicking outside
  document.addEventListener("click", closeAllDropdowns);
  
  const fileInput = document.getElementById('file-input');
  const uploadButton = document.getElementById('upload-button');
  const canvas = document.getElementById('pdf-preview');
  const context = canvas.getContext('2d');

  // Open file dialog when the button is clicked
  uploadButton.addEventListener('click', () => {
    fileInput.click();
  });

  fileInput.addEventListener('change', async (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      const fileReader = new FileReader();
      fileReader.onload = async function () {
        const typedArray = new Uint8Array(this.result);

        // Load the PDF and render the first page
        const pdf = await pdfjsLib.getDocument(typedArray).promise;
        const page = await pdf.getPage(1);
        const viewport = page.getViewport({ scale: 1.5 });

        canvas.width = viewport.width;
        canvas.height = viewport.height;

        // Make the canvas visible after rendering
        canvas.style.display = 'block';

        const renderContext = {
          canvasContext: context,
          viewport: viewport,
        };
        await page.render(renderContext).promise;
      };
      fileReader.readAsArrayBuffer(file);
    } else {
      alert('Please upload a valid PDF file.');
    }
  });
  
  