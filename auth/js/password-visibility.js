(() => {
    'use strict';

    document.querySelectorAll('.password-toggle').forEach((button) => {
        const input = document.querySelector(`#${button.getAttribute('aria-controls')}`);
        if (!input) return;

        const description = button.getAttribute('aria-label').replace(/^Show /, '');
        button.addEventListener('click', () => {
            const isVisible = input.type === 'password';
            input.type = isVisible ? 'text' : 'password';
            button.setAttribute('aria-label', `${isVisible ? 'Hide' : 'Show'} ${description}`);
            button.setAttribute('aria-pressed', String(isVisible));
        });
    });
})();
