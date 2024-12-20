import { router } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';

import { useAuthStore } from '../stores/useAuthStore';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const { signUpWithEmail } = useAuthStore();

  const handleSignUp = async () => {
    try {
      await signUpWithEmail(email, password, username);
      router.back(); // Close the modal after successful signup
    } catch (error) {
      console.error('Sign up error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text className="mb-4 text-2xl font-bold">Sign Up</Text>
      <TextInput
        className="mb-2 rounded border border-gray-300 p-2"
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />
      <TextInput
        className="mb-2 rounded border border-gray-300 p-2"
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        className="mb-4 rounded border border-gray-300 p-2"
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Pressable onPress={handleSignUp} className="rounded-lg bg-blue-500 p-3">
        <Text className="text-center font-semibold text-white">Sign Up</Text>
      </Pressable>
      <Pressable onPress={() => router.back()} className="mt-4">
        <Text className="text-center text-blue-500">Cancel</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
