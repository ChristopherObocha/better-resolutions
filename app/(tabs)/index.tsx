import React, { useEffect } from 'react';
import { View, Button } from 'react-native';

import AuthTest from '../../components/AuthTest';
import DatabaseTest from '../../components/DatabaseTest';
// import useAuthStore from '../../stores/useAuthStore';
import { useAuthStore } from '../../stores/useAuthStore';
import { useProfileStore } from '../../stores/useProfileStore';

export default function TabOneScreen() {
  // const signOut = useAuthStore((state) => state.signOut);
  const { user, signOut } = useAuthStore();
  const { fetchProfile } = useProfileStore();

  useEffect(() => {
    if (user) {
      fetchProfile(user.id);
    }
  }, [user]);

  return (
    <View className="flex-1 p-4">
      <AuthTest />
      <DatabaseTest />
      <Button title="Sign Out" onPress={signOut} />
    </View>
  );
}
