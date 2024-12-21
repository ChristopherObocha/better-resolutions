import React, { useState } from 'react';
import { View, Button, Text } from 'react-native';

import { supabase } from '../utils/supabase';
import { Profile } from '~/types/profile';
import { useAuthStore } from '~/stores/useAuthStore';

export default function DatabaseTest() {
  const [result, setResult] = useState('');
  const { user } = useAuthStore();

  const testQuery = async () => {
    const { data, error } = await supabase.from('profiles').select('*');

    if (error) {
      setResult(`Error: ${error.message}`);
      console.log('supabase: ', error);
    } else {
      setResult(`Success! Found ${data.length} rows`);
    }
  };

  const getProfile = async () => {
    const { data: profile, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user?.id)
      .single();

    if (error) {
      console.error('Error fetching profile:', error);
      return null;
    } else {
      console.log(`Success! Found ${JSON.stringify(profile)}`);
    }

    return profile;
  };

  return (
    <View className="p-4">
      <Button title="Test Database" onPress={getProfile} />
      <Text className="mt-4">{result}</Text>
    </View>
  );
}
