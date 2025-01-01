import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';

const ScreenContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {children}
    </ScrollView>
  );
};

export default ScreenContainer;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    paddingHorizontal: 15,
    paddingTop: 15,
  },
  content: {
    flexGrow: 1,
    alignItems: 'center',
  },
});
