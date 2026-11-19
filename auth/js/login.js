(() => {
    'use strict';

    const form = document.querySelector('#login-form');
    if (!form) return;
    const email = document.querySelector('#email');
    const password = document.querySelector('#password');
    const status = document.querySelector('#form-status');

    const fields = [
        { input: email, error: document.querySelector('#email-error') },
        { input: password, error: document.querySelector('#password-error') }
    ];

    function getError(input) {
        if (!input.value.trim()) {
            return input === email ? 'Enter your email address.' : 'Enter your password.';
        }

        if (input === email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value.trim())) {
            return 'Enter a valid email address.';
        }

        return '';
    }

    function validateField(field) {
        const message = getError(field.input);
        field.error.textContent = message;

        if (message) {
            field.input.setAttribute('aria-invalid', 'true');
        } else {
            field.input.removeAttribute('aria-invalid');
        }

        return !message;
    }

    fields.forEach((field) => {
        field.input.addEventListener('blur', () => {
            field.input.dataset.touched = 'true';
            validateField(field);
        });

        field.input.addEventListener('input', () => {
            status.hidden = true;
            status.textContent = '';

            if (field.input.dataset.touched === 'true') {
                validateField(field);
            }
        });
    });

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        status.hidden = true;
        status.textContent = '';
        email.value = email.value.trim();

        let firstInvalid = null;

        fields.forEach((field) => {
            field.input.dataset.touched = 'true';
            if (!validateField(field) && !firstInvalid) {
                firstInvalid = field.input;
            }
        });

        if (firstInvalid) {
            firstInvalid.focus();
            return;
        }

        status.dataset.kind = 'error';
        status.setAttribute('role', 'alert');
        status.textContent = 'Login is unavailable.';
        status.hidden = false;
    });
})();
