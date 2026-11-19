(() => {
    'use strict';

    const form = document.querySelector('#login-form');
    if (!form) return;
    const temporaryAuth = window.UnnToriTemporaryAuth;
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

        const result = temporaryAuth.checkCredentials(email.value, password.value);
        if (!result.ok) {
            status.dataset.kind = 'error';
            status.setAttribute('role', 'alert');
            status.textContent = result.reason === 'storage-unavailable'
                ? 'Session storage is unavailable here. Try opening these pages from a local static server.'
                : 'Invalid email or password.';
            status.hidden = false;
            return;
        }

        status.dataset.kind = 'success';
        status.setAttribute('role', 'status');
        status.innerHTML = '<span class="login-success-icon" aria-hidden="true">&#10004;</span><span>Login Successful.</span>';
        status.hidden = false;
    });
})();
