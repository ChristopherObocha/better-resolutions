import { create } from 'zustand';
import { supabase } from '../utils/supabase';
import type { Profile } from '../types/profile';

interface ProfileState {
  profile: Profile | null;
  loading: boolean;
  fetchProfile: (userId: string) => Promise<void>;
}

export const useProfileStore = create<ProfileState>((set) => ({
  profile: null,
  loading: false,
  fetchProfile: async (userId: string) => {
    set({ loading: true });
    const { data, error } = await supabase.from('profiles').select('*').eq('id', userId).single();

    if (error) {
      console.error('Error fetching profile:', error);
      set({ loading: false });
      return;
    }

    set({ profile: data, loading: false });
  },
}));
