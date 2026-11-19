(() => {
    'use strict';

    const form = document.querySelector('#register-form');
    if (!form) return;
    const temporaryAuth = window.UnnToriTemporaryAuth;
    const fullName = document.querySelector('#full-name');
    const email = document.querySelector('#email');
    const password = document.querySelector('#password');
    const confirmPassword = document.querySelector('#confirm-password');
    const strengthTrack = document.querySelector('#password-strength');
    const strengthFill = document.querySelector('.strength-fill');
    const strengthLabel = document.querySelector('#password-strength-label');
    const status = document.querySelector('#form-status');
    const duplicateEmailMessage = 'This email address is already registered. Please log in or use another email.';

    const fields = [
        { input: fullName, error: document.querySelector('#full-name-error') },
        { input: email, error: document.querySelector('#email-error') },
        { input: password, error: document.querySelector('#password-error') },
        { input: confirmPassword, error: document.querySelector('#confirm-password-error') }
    ];

    function getError(input) {
        const value = input.value.trim();

        if (!value) {
            if (input === fullName) return 'Enter your full name.';
            if (input === email) return 'Enter your email address.';
            if (input === password) return 'Create a password.';
            return 'Confirm your password.';
        }

        if (input === email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
            return 'Enter a valid email address.';
        }

        if (input === email && temporaryAuth.isEmailRegistered(value)) {
            return duplicateEmailMessage;
        }

        if (input === password && input.value.length < 8) {
            return 'Use at least 8 characters for your password.';
        }

        if (input === confirmPassword && input.value !== password.value) {
            return 'Passwords do not match.';
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

    function updateStrength() {
        const value = password.value;
        let strength = 'none';

        if (value) {
            const score = Number(value.length >= 8)
                + Number(value.length >= 12)
                + Number(/[a-z]/.test(value) && /[A-Z]/.test(value))
                + Number(/\d/.test(value))
                + Number(/[^A-Za-z0-9]/.test(value));

            if (value.length >= 12 && score >= 4) {
                strength = 'strong';
            } else if (value.length >= 8 && score >= 2) {
                strength = 'medium';
            } else {
                strength = 'weak';
            }
        }

        const levels = { none: 0, weak: 1, medium: 2, strong: 3 };
        if (strengthFill.dataset.strength === strength) return;
        strengthFill.dataset.strength = strength;
        strengthTrack.setAttribute('aria-valuenow', String(levels[strength]));
        strengthTrack.setAttribute('aria-valuetext', strength === 'none' ? 'No password entered' : `${strength} password`);
        strengthLabel.textContent = strength === 'none'
            ? 'Strength: not yet entered'
            : `Strength: ${strength.charAt(0).toUpperCase()}${strength.slice(1)}`;
    }

    fields.forEach((field) => {
        field.input.addEventListener('blur', () => {
            if (field.input === fullName || field.input === email) {
                field.input.value = field.input.value.trim();
            }

            field.input.dataset.touched = 'true';
            validateField(field);
        });

        field.input.addEventListener('input', () => {
            status.hidden = true;
            status.textContent = '';

            if (field.input === password) {
                updateStrength();
                if (confirmPassword.dataset.touched === 'true') {
                    validateField(fields[3]);
                }
            }

            if (field.input.dataset.touched === 'true') {
                validateField(field);
            }
        });
    });

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        status.hidden = true;
        status.textContent = '';
        fullName.value = fullName.value.trim();
        email.value = email.value.trim();
        updateStrength();

        let firstInvalid = null;

        fields.forEach((field) => {
            field.input.dataset.touched = 'true';
            if (!validateField(field) && !firstInvalid) {
                firstInvalid = field.input;
            }
        });

        if (fields[1].error.textContent === duplicateEmailMessage) {
            email.focus();
            return;
        }

        if (firstInvalid) {
            firstInvalid.focus();
            return;
        }

        const result = temporaryAuth.registerAccount({
            name: fullName.value,
            email: email.value,
            password: password.value
        });

        if (!result.ok) {
            if (result.reason === 'duplicate') {
                document.querySelector('#email-error').textContent = duplicateEmailMessage;
                email.setAttribute('aria-invalid', 'true');
                email.focus();
                return;
            }

            status.dataset.kind = 'error';
            status.setAttribute('role', 'alert');
            status.textContent = result.reason === 'storage-unavailable'
                ? 'Session storage is unavailable here. Try opening these pages from a local static server.'
                : 'Please check the form and try again.';
            status.hidden = false;
            return;
        }

        password.value = '';
        confirmPassword.value = '';
        updateStrength();
        status.dataset.kind = 'success';
        status.setAttribute('role', 'status');
        status.textContent = 'Registration saved for this session. Continue to Login.';
        status.hidden = false;
    });
})();
