import { Image } from 'expo-image';
import * as ImagePicker from 'expo-image-picker';
import { Stack } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

import ScreenContainer from '~/components/ScreenContainer';
import Spacer from '~/components/Spacer';
import { useProfileStore } from '~/stores/useProfileStore';

export default function Profile() {
  const { profile, updateProfile } = useProfileStore();
  const [uploading, setUploading] = useState(false);

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: 'images',
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled) {
        setUploading(true);
        const imageUri = result.assets[0].uri;

        //Update the profile with the new avatar URL
        await updateProfile({
          ...profile,
          avatar_url: imageUri, // Using the local image URI for now
        });
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      // Handle error appropriately
    } finally {
      setUploading(false);
    }
  };

  return (
    <>
      <Stack.Screen options={{ title: 'Profile' }} />
      <ScreenContainer>
        <>
          <TouchableOpacity onPress={pickImage}>
            <Image
              source={profile?.avatar_url || 'https://picsum.photos/200/300'}
              style={styles.image}
            />
          </TouchableOpacity>
          <Spacer height={20} />
          <Text className="text-2xl font-bold">{profile?.username}</Text>
        </>
      </ScreenContainer>
    </>
  );
}

const styles = StyleSheet.create({
  container: {},
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
  },
});
