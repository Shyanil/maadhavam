import { useState, useEffect } from 'react';
import { supabase } from '../services/supabase';

const isMockEnabled = () => {
  return import.meta.env.VITE_SUPABASE_URL === undefined || 
         import.meta.env.VITE_SUPABASE_URL.includes('placeholder-url');
};

export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isMockEnabled()) {
      const mockSession = localStorage.getItem('madhavam_admin_session');
      if (mockSession) {
        setUser({ email: 'admin@madhavam.com', role: 'admin' });
      }
      setLoading(false);
      return;
    }

    // Supabase Auth Listener
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      setLoading(false);
    };

    getSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    try {
      if (isMockEnabled()) {
        if (email === 'admin@madhavam.com' && password === 'admin123') {
          const mockUser = { email: 'admin@madhavam.com', role: 'admin' };
          localStorage.setItem('madhavam_admin_session', 'true');
          setUser(mockUser);
          return { success: true, user: mockUser, error: null };
        } else {
          return { success: false, error: new Error('Invalid email or password') };
        }
      }

      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      setUser(data.user);
      return { success: true, user: data.user, error: null };
    } catch (err) {
      return { success: false, error: err };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      if (isMockEnabled()) {
        localStorage.removeItem('madhavam_admin_session');
        setUser(null);
        return { success: true, error: null };
      }

      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      setUser(null);
      return { success: true, error: null };
    } catch (err) {
      return { success: false, error: err };
    } finally {
      setLoading(false);
    }
  };

  return {
    user,
    loading,
    login,
    logout,
    isAdmin: !!user,
  };
}
