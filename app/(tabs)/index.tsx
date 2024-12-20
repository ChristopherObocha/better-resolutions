import React from 'react';
import { View } from 'react-native';

import AuthTest from '../../components/AuthTest';
import DatabaseTest from '../../components/DatabaseTest';

export default function TabOneScreen() {
  return (
    <View className="flex-1 p-4">
      <AuthTest />
      <DatabaseTest />
    </View>
  );
}
