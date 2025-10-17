console.log('Hey there! Welcome to my Website')

if (!window.location.hash) {
    window.location.hash = '#home';
}

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

function copyEmail() {
    const emailElement = document.getElementById("email");
    const emailText = emailElement.textContent;

    navigator.clipboard.writeText(emailText).then(() => {
        const tooltip =
            document.createElement('div');
        tooltip.className = 'copy-tooltip';
        tooltip.textContent = 'Email copied!';
        emailElement.appendChild(tooltip);

        setTimeout(() => {
            tooltip.classList.add('show');
        }, 10);

        setTimeout(() => {
            tooltip.classList.remove('show');
            setTimeout(() => {
                tooltip.remove();
            }, 300);
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy email:', err);
    });

}

document.querySelectorAll("textarea").forEach(function(textarea) {
    textarea.style.height = textarea.scrollHeight + "px";
    textarea.style.overflowY = "hidden";

    textarea.addEventListener("input", function() {
        this.style.height = "auto";
        this.style.height = this.scrollHeight + "px";
    });
});