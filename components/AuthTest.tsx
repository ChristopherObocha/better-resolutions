import { User } from '@supabase/supabase-js';
import React, { useState } from 'react';
import { View, Button, Text } from 'react-native';

import { supabase } from '../utils/supabase';

export default function AuthTest() {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState('');

  const signUpTest = async () => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email: 'christopherobocha@gmail.com',
        password: 'testpassword123',
      });

      if (error) {
        throw error;
      }
      setUser(data.user);
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError('An unknown error occurred');
      }
    }
  };

  return (
    <View className="p-4">
      <Button title="Test Sign Up" onPress={signUpTest} />
      {user && <Text className="mt-4">Success! User ID: {user.id}</Text>}
      {error && <Text className="mt-4 text-red-500">Error: {error}</Text>}
    </View>
  );
}
