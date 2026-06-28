import {launchImageLibrary} from 'react-native-image-picker';

export const pickImage = async () => {
  const result =
    await launchImageLibrary({
      mediaType: 'photo',
      quality: 0.8,
    });

  if (
    result.assets &&
    result.assets.length > 0
  ) {
    return result.assets[0].uri;
  }

  return null;
};
