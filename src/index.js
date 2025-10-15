console.log('Hey there! Welcome to my Website')

const icons = document.querySelectorAll('.icon');
icons.forEach(icon => {
    icon.addEventListener('click', (event) => {
        icon.classList.toggle("open");
    });
});

const navbarLinks =
    document.querySelector('.navbar-links');
const hamburger =
    document.querySelector('.icon.nav-icon');

hamburger.addEventListener('click', () => {
    navbarLinks.classList.toggle('active');
});

document.querySelectorAll('.navbar-links a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        navbarLinks.classList.remove('active');
    });
});