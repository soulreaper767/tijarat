import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { getMyContext, logout as apiLogout } from '../services/api';

const AuthContext = createContext(null);

// Roles that should see the more sensitive nav items (Finance, Settings ->
// user management) — everyone else gets the day-to-day console only.
const ADMIN_ROLES = ['System Manager', 'Distributor Admin', 'Accounts Manager', 'Accounts User'];

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      const context = await getMyContext();
      setUser(context);
      return context;
    } catch {
      setUser(null);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const logout = useCallback(async () => {
    try {
      await apiLogout();
    } finally {
      setUser(null);
    }
  }, []);

  const roles = user?.roles || [];
  const isAdmin = roles.some((role) => ADMIN_ROLES.includes(role));

  return (
    <AuthContext.Provider
      value={{
        user,
        roles,
        loading,
        isAuthenticated: !!user,
        isAdmin,
        refresh,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
}
