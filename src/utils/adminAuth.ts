/**
 * Admin Authentication Utilities
 * Manages admin session in sessionStorage
 */

const ADMIN_TOKEN_KEY = 'Naturra_admin_token';

export const setAdminSession = (token: string) => {
    sessionStorage.setItem(ADMIN_TOKEN_KEY, token);
};

export const getAdminToken = () => {
    return sessionStorage.getItem(ADMIN_TOKEN_KEY);
};

export const isAdminAuthenticated = () => {
    const token = getAdminToken();
    if (!token) return false;

    // Basic check - in a real app we'd verify the token with the backend or check expiry
    return token.startsWith('Naturra_admin_session_');
};

export const logoutAdmin = () => {
    sessionStorage.removeItem(ADMIN_TOKEN_KEY);
    window.location.href = '/admin/login';
};
