import { create } from 'zustand';

import { supabase } from '../utils/supabase';

import { Profile } from '~/types/profile';

interface ProfileStore {
  profile: Profile | null;
  loading: boolean;
  setProfile: (profile: Profile) => void;
  fetchProfile: (userId: string) => Promise<void>;
  updateProfile: (updatedProfile: Profile) => Promise<void>;
}

export const useProfileStore = create<ProfileStore>((set) => ({
  profile: null,
  loading: false,
  setProfile: (profile) => set({ profile }),

  fetchProfile: async (userId: string) => {
    set({ loading: true });
    try {
      const { data, error } = await supabase.from('profiles').select('*').eq('id', userId).single();

      if (error) {
        console.error('Error fetching profile:', error);
        return;
      }

      set({ profile: data });
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      set({ loading: false });
    }
  },

  updateProfile: async (updatedProfile) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .update(updatedProfile)
        .eq('id', updatedProfile.id)
        .select()
        .single();

      if (error) {
        console.error('Error updating profile:', error);
        throw error;
      }

      set({ profile: data });
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
  },
}));
