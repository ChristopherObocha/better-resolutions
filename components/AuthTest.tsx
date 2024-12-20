import React from 'react';
import { View, Text } from 'react-native';

import { useAuthStore } from '../stores/useAuthStore';

export default function AuthTest() {
  const { user, session, loading } = useAuthStore();

  console.log('AuthTest rendering:', { user, session, loading });

  if (loading) {
    return (
      <View className="p-4">
        <Text>Loading auth status...</Text>
      </View>
    );
  }

  // console.log('user: ', user);
  console.log('session: ', session);

  return (
    <View className="m-2 border border-gray-300 p-4">
      <Text className="text-lg">
        Auth Status: {session ? 'Authenticated' : 'Not authenticated'}
      </Text>
      {user && <Text className="mt-2">User ID: {user.id}</Text>}
    </View>
  );
}
