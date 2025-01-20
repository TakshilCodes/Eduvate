const searchInput = document.querySelector(".search input");
const backImg = document.querySelector(".backimg");
const getStartBtn = document.querySelector(".getstartbtn");

// Add event listener for search
searchInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter" && searchInput.value.trim() !== "") {
        // Hide the image and Get Started button
        backImg.style.display = "none";
        getStartBtn.style.display = "none";
    }
});