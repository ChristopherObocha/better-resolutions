import { Session, User } from '@supabase/supabase-js';
import { create } from 'zustand';

import { supabase } from '../utils/supabase';

interface AuthState {
  user: User | null;
  session: Session | null;
  loading: boolean;
  setSession: (session: Session | null) => void;
  initialize: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  session: null,
  loading: true,
  setSession: (session) =>
    set({
      session,
      user: session?.user ?? null,
      loading: false,
    }),
  initialize: async () => {
    // Check initial session
    const {
      data: { session },
    } = await supabase.auth.getSession();
    set({ session, user: session?.user ?? null, loading: false });

    // Listen for auth changes
    supabase.auth.onAuthStateChange((_event, session) => {
      set({ session, user: session?.user ?? null });
    });
  },
}));

// Initialize auth state when the store is imported
useAuthStore.getState().initialize();
