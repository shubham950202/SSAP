import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import {launchImageLibrary} from 'react-native-image-picker';

import Input from '../../../components/Input';
import Button from '../../../components/Button';

import {updateUser} from '../../../database/repositories/userRepository';

export default function EditUserScreen({
  route,
  navigation,
}: any) {
  const {user} = route.params;

  const [fullName, setFullName] = useState(
    user.fullName,
  );

  const [email, setEmail] = useState(
    user.email,
  );

  const [mobile, setMobile] = useState(
    user.mobile,
  );

  const [image, setImage] = useState(
    user.profileImage || '',
  );

  const selectImage = async () => {
    const result =
      await launchImageLibrary({
        mediaType: 'photo',
        quality: 0.8,
      });

    if (
      result.assets &&
      result.assets.length > 0
    ) {
      setImage(
        result.assets[0].uri || '',
      );
    }
  };

  const handleUpdate = async () => {
    try {
      await updateUser(user.id, {
        fullName,
        email,
        mobile,
        profileImage: image,
      });

      Alert.alert(
        'Success',
        'User Updated Successfully',
      );

      navigation.goBack();
    } catch (error) {
      Alert.alert(
        'Error',
        'Update Failed',
      );
    }
  };

  return (
    <ScrollView
      contentContainerStyle={
        styles.container
      }>
      <Text style={styles.heading}>
        Edit User
      </Text>

      <TouchableOpacity
        style={styles.imageBox}
        onPress={selectImage}>
        {image ? (
          <Image
            source={{uri: image}}
            style={styles.avatar}
          />
        ) : (
          <Text>
            Select Profile Image
          </Text>
        )}
      </TouchableOpacity>

      <Input
        placeholder="Full Name"
        value={fullName}
        onChangeText={setFullName}
      />

      <Input
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />

      <Input
        placeholder="Mobile"
        value={mobile}
        onChangeText={setMobile}
      />

      <Button
        title="Update User"
        onPress={handleUpdate}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#F8FAFC',
    flexGrow: 1,
  },

  heading: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 25,
  },

  imageBox: {
    alignItems: 'center',
    marginBottom: 25,
  },

  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
});
