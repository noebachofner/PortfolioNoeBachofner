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
            .finally(function () {
                form.reset();
                if (window.turnstile) {
                    turnstile.reset();
                }

                const btn = document.getElementById("submitButton");
                btn.disabled = true;
                btn.style.opacity = "0.5";
                btn.style.cursor = "not-allowed";

                setTimeout(() => {
                    formResult.classList.remove('show');
                    formResult.classList.remove('success', 'error');
                }, 5000);
            });
    });

    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    const currentAge = document.getElementById("current-age");
    if (currentAge) {
        currentAge.textContent = calculateAge();
    }

    function calculateAge() {
        const birthDate = new Date("04/10/2008");
        const todayDate = new Date();

        var years = (todayDate.getFullYear() - birthDate.getFullYear());

        if (todayDate.getMonth() < birthDate.getMonth() ||
            todayDate.getMonth() == birthDate.getMonth() && todayDate.getDate() < birthDate.getDate()) {
            years--;
        }

        return years;
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


function enableButton() {
    const btn = document.getElementById("submitButton");
    btn.disabled = false;
    btn.style.opacity = "1";
    btn.style.cursor = "pointer";
}
