import { Stack } from 'expo-router';
import { StyleSheet, View, Text } from 'react-native';

import { ScreenContent } from '~/components/ScreenContent';
import { useAuthStore } from '~/stores/useAuthStore';

export default function Profile() {
  const { user } = useAuthStore();
  console.log('user: ', user);

  return (
    <>
      <Stack.Screen options={{ title: 'Profile' }} />
      <View style={styles.container}>
        <ScreenContent path="app/(tabs)/profile.tsx" title="Profile" />
        <Text>{user?.email}</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
});
