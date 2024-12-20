import React from 'react';
import { View, Button } from 'react-native';

import AuthTest from '../../components/AuthTest';
import DatabaseTest from '../../components/DatabaseTest';
// import useAuthStore from '../../stores/useAuthStore';
import { useAuthStore } from '../../stores/useAuthStore';

export default function TabOneScreen() {
  // const signOut = useAuthStore((state) => state.signOut);
  const { signOut } = useAuthStore();

  return (
    <View className="flex-1 p-4">
      <AuthTest />
      <DatabaseTest />
      <Button title="Sign Out" onPress={signOut} />
    </View>
  );
}
