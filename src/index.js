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

// Web3Forms Contact Form Handler
const contactForm = document.getElementById('contact-form');
const formResult = document.getElementById('form-result');
const submitButton = contactForm.querySelector('.submit-button');

contactForm.addEventListener('submit', async function(e) {
    e.preventDefault();

    // Disable submit button and show loading state
    submitButton.disabled = true;
    submitButton.textContent = 'Sending...';

    // Hide previous result messages
    formResult.classList.remove('show', 'success', 'error');

    // Get form data
    const formData = new FormData(contactForm);

    // Convert FormData to JSON
    const object = {};
    formData.forEach((value, key) => {
        object[key] = value;
    });
    const json = JSON.stringify(object);

    try {
        // Send to Web3Forms API
        const response = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: json
        });

        const result = await response.json();

        if (response.ok && result.success) {
            // Success
            formResult.textContent = 'Thank you! Your message has been sent successfully.';
            formResult.classList.add('success', 'show');
            contactForm.reset();

            // Reset textarea heights after form reset
            document.querySelectorAll("textarea").forEach(function(textarea) {
                textarea.style.height = "auto";
            });
        } else {
            // Error from API
            throw new Error(result.message || 'Something went wrong');
        }
    } catch (error) {
        // Network or other error
        formResult.textContent = 'Oops! Something went wrong. Please try again.';
        formResult.classList.add('error', 'show');
        console.error('Form submission error:', error);
    } finally {
        // Re-enable submit button
        submitButton.disabled = false;
        submitButton.textContent = 'Send Message';

        // Hide result message after 5 seconds
        setTimeout(() => {
            formResult.classList.remove('show');
        }, 5000);
    }
});