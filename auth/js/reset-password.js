(() => {
    'use strict';

    const form = document.querySelector('#reset-form');
    if (!form) return;
    const email = document.querySelector('#email');
    const emailError = document.querySelector('#email-error');
    const status = document.querySelector('#form-status');

    function validateEmail() {
        const value = email.value.trim();
        let message = '';

        if (!value) {
            message = 'Enter your email address.';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
            message = 'Enter a valid email address.';
        }

        emailError.textContent = message;

        if (message) {
            email.setAttribute('aria-invalid', 'true');
        } else {
            email.removeAttribute('aria-invalid');
        }

        return !message;
    }

    email.addEventListener('blur', () => {
        email.value = email.value.trim();
        email.dataset.touched = 'true';
        validateEmail();
    });

    email.addEventListener('input', () => {
        status.hidden = true;
        status.textContent = '';

        if (email.dataset.touched === 'true') {
            validateEmail();
        }
    });

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        status.hidden = true;
        status.textContent = '';
        email.value = email.value.trim();
        email.dataset.touched = 'true';

        if (!validateEmail()) {
            email.focus();
            return;
        }

        status.textContent = 'Email format is valid.';
        status.hidden = false;
    });
})();
