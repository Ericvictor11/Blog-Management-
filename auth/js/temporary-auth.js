(() => {
    'use strict';

    const accountsKey = 'unn-tori.temporary-accounts.v1';

    function normalizeEmail(email) {
        return String(email).trim().toLowerCase();
    }

    function readAccounts() {
        const saved = window.sessionStorage.getItem(accountsKey);
        if (!saved) return [];
        const accounts = JSON.parse(saved);
        if (!Array.isArray(accounts)) throw new Error('Invalid account data');
        return accounts;
    }

    function isEmailRegistered(email) {
        try {
            return readAccounts().some((account) => normalizeEmail(account.email) === normalizeEmail(email));
        } catch {
            return false;
        }
    }

    function registerAccount({ name, email, password }) {
        const trimmedName = String(name).trim();
        const normalizedEmail = normalizeEmail(email);
        if (!trimmedName || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail) || String(password).length < 8) {
            return { ok: false, reason: 'invalid' };
        }

        try {
            const accounts = readAccounts();
            if (accounts.some((account) => normalizeEmail(account.email) === normalizedEmail)) {
                return { ok: false, reason: 'duplicate' };
            }
            accounts.push({ name: trimmedName, email: normalizedEmail, password: String(password) });
            window.sessionStorage.setItem(accountsKey, JSON.stringify(accounts));
            return { ok: true };
        } catch {
            return { ok: false, reason: 'storage-unavailable' };
        }
    }

    function checkCredentials(email, password) {
        try {
            const account = readAccounts().find((item) => normalizeEmail(item.email) === normalizeEmail(email));
            return account && account.password === String(password)
                ? { ok: true }
                : { ok: false, reason: 'invalid-credentials' };
        } catch {
            return { ok: false, reason: 'storage-unavailable' };
        }
    }

    window.UnnToriTemporaryAuth = Object.freeze({ isEmailRegistered, registerAccount, checkCredentials });
})();
