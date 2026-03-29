/**
 * Admin Authentication Utilities
 * Manages admin session in sessionStorage
 */

const ADMIN_TOKEN_KEY = 'Naturra_admin_token';
const ADMIN_USER_KEY = 'Naturra_admin_user';

export const setAdminSession = (token: string) => {
    sessionStorage.setItem(ADMIN_TOKEN_KEY, token);
};

export const setAdminUser = (username: string) => {
    sessionStorage.setItem(ADMIN_USER_KEY, username);
};

export const getAdminUser = () => {
    return sessionStorage.getItem(ADMIN_USER_KEY) || 'admin';
};

export const getAdminToken = () => {
    return sessionStorage.getItem(ADMIN_TOKEN_KEY);
};

export const isAdminAuthenticated = () => {
    const token = getAdminToken();
    if (!token) return false;

    // Basic check - in a real app we'd verify the token with the backend or check expiry
    return token.startsWith('naturra_admin_session_');
};

export const logoutAdmin = () => {
    sessionStorage.removeItem(ADMIN_TOKEN_KEY);
    sessionStorage.removeItem(ADMIN_USER_KEY);
    window.location.href = '/admin/login';
};
