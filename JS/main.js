// Calling the header
document.addEventListener('DOMContentLoaded', function() {
    fetch('header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('header').innerHTML = data;
        })
        .catch(error => console.error('Error loading header:', error));
});

// To make the header sticky and fixed
window.addEventListener("scroll", function() {
    const header = document.querySelector(".header-container");
    const stickyPoint = header.offsetTop;

    if (window.pageYOffset > stickyPoint) {
        header.classList.add("header-fixed");
    } else {
        header.classList.remove("header-fixed");
    }
});

// Adjust header when scrolling
window.addEventListener("scroll", function() {
    const header = document.querySelector(".header-container");
    const scrollPosition = window.scrollY;

    if (scrollPosition > 50) {
        header.classList.add("header-scroll");
    } else {
        header.classList.remove("header-scroll");
    }
});

// Calling the footer
document.addEventListener('DOMContentLoaded', function() {
    fetch('footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer').innerHTML = data;
        })
        .catch(error => console.error('Error loading footer:', error));
});
