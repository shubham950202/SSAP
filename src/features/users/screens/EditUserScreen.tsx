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

import {updateUser} from '../../../services/api/userApi';

export default function EditUserScreen({
  route,
  navigation,
}: any) {
  const {user} = route.params;

  const [name, setName] = useState(user.name || '');
  const [username, setUsername] = useState(
    user.username || '',
  );
  const [email, setEmail] = useState(user.email || '');
  const [mobile, setMobile] = useState(user.mobile || '');
  const [image, setImage] = useState(
    user.profileImage || '',
  );

  const selectImage = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      quality: 0.8,
      selectionLimit: 1,
    });

    if (result.didCancel) {
      return;
    }

    if (result.assets?.length) {
      setImage(result.assets[0].uri ?? '');
    }
  };

  const handleUpdate = async () => {
    try {
      const payload = {
        name: name.trim(),
        username: username.trim(),
        email: email.trim().toLowerCase(),
        mobile: mobile.trim(),
        profileImage: image,
      };

      await updateUser(user.id, payload);

      Alert.alert(
        'Success',
        'User updated successfully',
        [
          {
            text: 'OK',
            onPress: () => navigation.goBack(),
          },
        ],
      );
    } catch (error: any) {
      Alert.alert(
        'Error',
        error?.message || 'Update failed',
      );
    }
  };

  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={styles.container}>
      <Text style={styles.heading}>
        Edit User
      </Text>

      <TouchableOpacity
        style={styles.imageBox}
        activeOpacity={0.8}
        onPress={selectImage}>
        {image ? (
          <Image
            source={{uri: image}}
            style={styles.avatar}
          />
        ) : (
          <View style={styles.placeholder}>
            <Text style={styles.placeholderText}>
              Select Image
            </Text>
          </View>
        )}
      </TouchableOpacity>

      <Input
        placeholder="Full Name"
        value={name}
        onChangeText={setName}
      />

      <Input
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />

      <Input
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />

      <Input
        placeholder="Mobile Number"
        keyboardType="phone-pad"
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
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#F8FAFC',
  },

  heading: {
    fontSize: 28,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 30,
    textAlign: 'center',
  },

  imageBox: {
    alignItems: 'center',
    marginBottom: 30,
  },

  avatar: {
    width: 130,
    height: 130,
    borderRadius: 65,
  },

  placeholder: {
    width: 130,
    height: 130,
    borderRadius: 65,
    backgroundColor: '#E2E8F0',
    justifyContent: 'center',
    alignItems: 'center',
  },

  placeholderText: {
    color: '#475569',
    fontWeight: '600',
  },
});
