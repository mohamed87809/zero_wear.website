// src/components/admin/ProtectedRoute.jsx

import { useEffect, useState } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

import { onAuthStateChange } from '../../services/authService.js';
import Loading from '../ui/Loading.jsx';

function ProtectedRoute() {
  const location = useLocation();

  // Firebase Auth resolves asynchronously on page load, unlike the old
  // localStorage-based check which was synchronous. We need a real
  // loading state here so we don't redirect a genuinely logged-in admin
  // to /admin/login just because Firebase hasn't finished checking yet.
  const [authState, setAuthState] = useState({
    isChecking: true,
    isAuthenticated: false,
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChange((user) => {
      setAuthState({
        isChecking: false,
        isAuthenticated: !!user,
      });
    });

    return () => unsubscribe();
  }, []);

  if (authState.isChecking) {
    return <Loading label="Checking session..." fullScreen />;
  }

  if (!authState.isAuthenticated) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;