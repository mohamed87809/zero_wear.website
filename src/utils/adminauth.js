// src/utils/adminAuth.js

const AUTH_STORAGE_KEY = 'zw_admin_auth';

// Temporary hardcoded credentials — MVP only.
// When a real backend is connected, login() below will call an API endpoint
// instead of comparing against these constants, but its function signature
// (email, password) => { success, error } will stay the same.
const ADMIN_EMAIL = 'admin@zerowear.com';
const ADMIN_PASSWORD = 'ZeroWear2026';

/**
 * Attempts to log in with the given credentials.
 * Returns { success: true } on success, or { success: false, error } on failure.
 *
 * FUTURE BACKEND MIGRATION:
 * Replace the body of this function with something like:
 *   const { token, admin } = await api.post('/admin/login', { email, password });
 *   localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify({ token, email: admin.email }));
 * No changes would be needed in AdminLogin.jsx or ProtectedRoute.jsx.
 */
export function login(email, password) {
  const normalizedEmail = email.trim().toLowerCase();

  if (
    normalizedEmail === ADMIN_EMAIL.toLowerCase() &&
    password === ADMIN_PASSWORD
  ) {
    const session = {
      isAuthenticated: true,
      email: ADMIN_EMAIL,
      loggedInAt: new Date().toISOString(),
    };
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(session));
    return { success: true };
  }

  return { success: false, error: 'Invalid email or password.' };
}

/**
 * Clears the admin session.
 */
export function logout() {
  localStorage.removeItem(AUTH_STORAGE_KEY);
}

/**
 * Returns true if there is a valid admin session.
 *
 * FUTURE BACKEND MIGRATION:
 * This is the natural place to add JWT expiry validation, e.g.
 * decoding the stored token and checking its `exp` claim, without
 * requiring any changes in ProtectedRoute.jsx.
 */
export function isAuthenticated() {
  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY);
    if (!raw) return false;
    const session = JSON.parse(raw);
    return !!session?.isAuthenticated;
  } catch {
    return false;
  }
}

/**
 * Returns the current admin's session info, or null if not logged in.
 * Mirrors what a real backend's GET /admin/me endpoint would return.
 */
export function getCurrentAdmin() {
  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY);
    if (!raw) return null;
    const session = JSON.parse(raw);
    return session?.isAuthenticated
      ? { email: session.email, loggedInAt: session.loggedInAt }
      : null;
  } catch {
    return null;
  }
}

export default {
  login,
  logout,
  isAuthenticated,
  getCurrentAdmin,
};