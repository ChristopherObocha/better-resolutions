// import { FileObject } from '@supabase/supabase-js';
import { decode } from 'base64-arraybuffer';
import * as FileSystem from 'expo-file-system';
import { Image } from 'expo-image';
import * as ImagePicker from 'expo-image-picker';
import { Stack } from 'expo-router';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

import ScreenContainer from '~/components/ScreenContainer';
import Spacer from '~/components/Spacer';
import { useAuthStore } from '~/stores/useAuthStore';
import { useProfileStore } from '~/stores/useProfileStore';
import { supabase } from '~/utils/supabase';

export default function Profile() {
  const { profile, updateProfile } = useProfileStore();
  // const [uploading, setUploading] = useState(false);
  // const [file, setFile] = useState<FileObject[]>([]);
  // const [file, setFile] = useState([]);
  const [imgUri, setImgUri] = useState(profile?.avatar_url);

  const { user } = useAuthStore();

  useEffect(() => {
    if (!user) return;

    loadImages();
  }, [user]);

  const loadImages = async () => {};

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: 'images',
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled) {
        setImgUri(result.assets[0].uri);

        const img = result.assets[0];
        const base64 = await FileSystem.readAsStringAsync(img.uri, {
          encoding: FileSystem.EncodingType.Base64,
        });
        const filePath = `${user?.id}/${new Date().getTime()}.png`;
        const contentType = 'image/png';
        await supabase.storage.from('files').upload(filePath, decode(base64), {
          contentType,
        });

        await loadImages();
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      // Handle error appropriately
    } finally {
      console.log('done');
    }
  };

  const listBuckets = async () => {
    const { data, error } = await supabase.storage.listBuckets();
    console.log('data: ', data);
    console.log('error: ', error);
  };

  // listBuckets();

  const createBucket = async () => {
    const { data, error } = await supabase.storage.createBucket('test');
    console.log('data: ', data);
    console.log('error: ', error);
  };

  // console.log('user', user);

  return (
    <>
      <Stack.Screen options={{ title: 'Profile' }} />
      <ScreenContainer>
        <>
          <TouchableOpacity onPress={pickImage}>
            <Image source={imgUri || 'https://picsum.photos/200/300'} style={styles.image} />
          </TouchableOpacity>
          <Spacer height={20} />
          <Text className="text-2xl font-bold">{profile?.username}</Text>
        </>

        <TouchableOpacity onPress={createBucket}>
          <Text className="font-bold text-blue-500">Create Bucket</Text>
        </TouchableOpacity>
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
