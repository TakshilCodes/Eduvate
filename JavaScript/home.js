function toggleMenu() {
    const links = document.querySelector(".links ul");
    const regester = document.querySelector(".regester");

    // Toggle both elements
    links.classList.toggle("active");
    regester.classList.toggle("active");
}