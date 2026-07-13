// src/services/authService.js
//
// Firebase Authentication service for the Admin Dashboard. Mirrors
// src/utils/adminauth.js's function names/shapes (login, logout,
// isAuthenticated, getCurrentAdmin) so that ProtectedRoute.jsx and
// AdminLogin.jsx can later swap to this service with minimal changes.
// Not yet connected to any page — standalone until wired in later.

import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';

import { auth } from '../firebase/firebase.js';

/**
 * Attempts to log in with the given email/password via Firebase Auth.
 * Returns { success: true } on success, or { success: false, error } on failure.
 */
export async function login(email, password) {
  try {
    const credential = await signInWithEmailAndPassword(auth, email, password);
    return { success: true, user: credential.user };
  } catch (error) {
    return { success: false, error: 'Invalid email or password.' };
  }
}

/**
 * Signs the current admin out of Firebase Auth.
 */
export async function logout() {
  await signOut(auth);
}

/**
 * Returns true if there is a currently signed-in Firebase user.
 * Note: Firebase Auth state is asynchronous, so this only reflects
 * whatever auth.currentUser holds at the moment of calling — for
 * reactive auth state, use onAuthStateChange() below instead.
 */
export function isAuthenticated() {
  return !!auth.currentUser;
}

/**
 * Returns the currently signed-in Firebase user, or null.
 */
export function getCurrentAdmin() {
  const user = auth.currentUser;
  if (!user) return null;

  return {
    email: user.email,
    uid: user.uid,
  };
}

/**
 * Subscribes to Firebase Auth state changes. Returns an unsubscribe function.
 * This is the recommended way to reactively know when auth state resolves,
 * since Firebase Auth checks are asynchronous (unlike the current
 * localStorage-based adminAuth.js, which is synchronous).
 */
export function onAuthStateChange(callback) {
  return onAuthStateChanged(auth, (user) => {
    callback(
      user ? { email: user.email, uid: user.uid } : null
    );
  });
}

export default {
  login,
  logout,
  isAuthenticated,
  getCurrentAdmin,
  onAuthStateChange,
};