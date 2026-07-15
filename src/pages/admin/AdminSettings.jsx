// src/pages/admin/AdminSettings.jsx

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserCircle, Store, Bell, LogOut } from 'lucide-react';

import Card from '../../components/ui/Card.jsx';
import Button from '../../components/ui/Button.jsx';
import { Spinner } from '../../components/ui/Loading.jsx';
import { logout, onAuthStateChange } from '../../services/authService.js';

function AdminSettings() {
  const navigate = useNavigate();
  const [admin, setAdmin] = useState(null);
  const [isCheckingSession, setIsCheckingSession] = useState(true);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChange((user) => {
      setAdmin(user);
      setIsCheckingSession(false);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logout();
      navigate('/admin/login', { replace: true });
    } catch {
      setIsLoggingOut(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-[#111827] sm:text-3xl">
          Settings
        </h1>
        <p className="mt-1 text-sm text-[#374151]">
          Manage your account and store preferences.
        </p>
      </div>

      {/* Account info */}
      <Card padding="lg" hoverEffect={false} className="flex flex-col gap-4">
        {isCheckingSession ? (
          <div className="flex items-center gap-3">
            <Spinner size="sm" />
            <p className="text-sm text-[#374151]">Loading account info...</p>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#2563eb]/10 text-[#2563eb]">
              <UserCircle size={22} />
            </div>
            <div>
              <p className="text-sm font-semibold text-[#111827]">
                {admin?.email || 'Unknown'}
              </p>
              <p className="text-xs text-[#374151]/70">Signed in via Firebase</p>
            </div>
          </div>
        )}

        <Button
          variant="outline"
          onClick={handleLogout}
          isLoading={isLoggingOut}
          className="w-fit gap-2"
        >
          <LogOut size={16} />
          Logout
        </Button>
      </Card>

      {/* Store settings — placeholder */}
      <Card padding="lg" hoverEffect={false} className="flex items-start gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#f9fafb] text-[#374151]">
          <Store size={20} />
        </div>
        <div>
          <p className="text-sm font-semibold text-[#111827]">
            Store Settings
          </p>
          <p className="mt-1 text-sm text-[#374151]">
            Store name, logo, currency, and tax settings will be configurable
            here once connected to a backend.
          </p>
          <span className="mt-2 inline-block rounded-full bg-[#f9fafb] px-3 py-1 text-xs font-medium text-[#374151]">
            Coming Soon
          </span>
        </div>
      </Card>

      {/* Notification settings — placeholder */}
      <Card padding="lg" hoverEffect={false} className="flex items-start gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#f9fafb] text-[#374151]">
          <Bell size={20} />
        </div>
        <div>
          <p className="text-sm font-semibold text-[#111827]">
            Notification Preferences
          </p>
          <p className="mt-1 text-sm text-[#374151]">
            Email and SMS alerts for new orders and low-stock products will
            be configurable here in a future update.
          </p>
          <span className="mt-2 inline-block rounded-full bg-[#f9fafb] px-3 py-1 text-xs font-medium text-[#374151]">
            Coming Soon
          </span>
        </div>
      </Card>
    </div>
  );
}

export default AdminSettings;