import { Stack } from 'expo-router';
import { StyleSheet, View, Text } from 'react-native';

import { ScreenContent } from '~/components/ScreenContent';
import { useAuthStore } from '~/stores/useAuthStore';
import { useProfileStore } from '~/stores/useProfileStore';

export default function Profile() {
  const { user } = useAuthStore();
  const { profile } = useProfileStore();
  console.log('user: ', user);
  console.log('profile: ', profile);

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
