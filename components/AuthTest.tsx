import React, { useState } from 'react';
import { View, Text, Pressable, TextInput } from 'react-native';

import { useAuthStore } from '../stores/useAuthStore';
import { supabase } from '../utils/supabase';

export default function AuthTest() {
  const { user, session, loading, signInWithEmail } = useAuthStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (loading) {
    return (
      <View className="p-4">
        <Text>Loading auth status...</Text>
      </View>
    );
  }

  const handleSignIn = async () => {
    try {
      await signInWithEmail(email, password);
      setEmail('');
      setPassword('');
    } catch (error) {
      console.error('Sign in error:', error);
    }
  };

  return (
    <View className="m-2 border border-gray-300 p-4">
      <Text className="text-lg">
        Auth Status: {session ? 'Authenticated' : 'Not authenticated'}
      </Text>
      {user && <Text className="mt-2">User ID: {user.id}</Text>}

      {!session && (
        <View className="mt-4">
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
          <Pressable onPress={handleSignIn} className="rounded-lg bg-blue-500 p-3">
            <Text className="text-center font-semibold text-white">Sign In</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}
