import React, { useState } from 'react';
import { View, Button, Text } from 'react-native';

import { supabase } from '../utils/supabase';

export default function DatabaseTest() {
  const [result, setResult] = useState('');
  // const

  const testQuery = async () => {
    const { data, error } = await supabase.from('profiles').select('*');

    if (error) {
      setResult(`Error: ${error.message}`);
      console.log('supabase: ', error);
    } else {
      setResult(`Success! Found ${data.length} rows`);
    }
  };

  return (
    <View className="p-4">
      <Button title="Test Database" onPress={testQuery} />
      <Text className="mt-4">{result}</Text>
    </View>
  );
}
