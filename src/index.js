document.addEventListener('DOMContentLoaded', function () {
    const navIcon = document.querySelector('.nav-icon');
    const navbarLinks = document.querySelector('.navbar-links');
    const navLinks = document.querySelectorAll('.navbar-links a');

    navIcon.addEventListener('click', () => {
        navbarLinks.classList.toggle('active');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navbarLinks.classList.contains('active')) {
                navbarLinks.classList.remove('active');
            }
        });
    });

    const form = document.getElementById('contact-form');
    const formResult = document.getElementById('form-result');

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        const formData = new FormData(form);
        const object = {};
        formData.forEach((value, key) => {
            object[key] = value;
        });
        const json = JSON.stringify(object);
        formResult.innerHTML = "Please wait...";
        formResult.classList.add('show');


        fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: json
        })
            .then(async (response) => {
                let jsonResponse = await response.json();
                if (response.status === 200) {
                    formResult.innerHTML = jsonResponse.message;
                    formResult.classList.add('success');
                } else {
                    console.log(response);
                    formResult.innerHTML = jsonResponse.message;
                    formResult.classList.add('error');
                }
            })
            .catch(error => {
                console.log(error);
                formResult.innerHTML = "Something went wrong!";
                formResult.classList.add('error');
            })
            .then(function () {
                form.reset();
                setTimeout(() => {
                    formResult.classList.remove('show');
                }, 5000);
            });
    });

    // Set current year in the footer
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }
});

function copyEmail() {
    const email = document.getElementById('email').innerText;
    navigator.clipboard.writeText(email).then(() => {
        const popup = document.createElement('div');
        popup.innerText = 'E-Mail copied to clipboard';
        popup.classList.add('info-popup');
        document.body.appendChild(popup);
        setTimeout(() => {
            popup.classList.add('show');
        }, 10);
        setTimeout(() => {
            popup.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(popup);
            }, 500);
        }, 3000);
    }).catch(err => {
        console.error('Failed to copy email: ', err);
    });
}
