export const getFingerprint = (): string => {
    if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
        return 'Server-Side';
    }

    const fingerprintKey = 'fingerprint';
    let fingerprint = localStorage.getItem(fingerprintKey);

    if (!fingerprint) {
        fingerprint = crypto.randomUUID();
        localStorage.setItem(fingerprintKey, fingerprint);
    }

    return fingerprint;
};
