import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Alert,
} from 'react-native';

import {
  useForm,
  Controller,
} from 'react-hook-form';

import {
  yupResolver,
} from '@hookform/resolvers/yup';

import Input from '../../../components/Input';
import Button from '../../../components/Button';

import {loginSchema} from '../validations/loginValidation';

import {loginUser} from '../../../services/auth/loginService';

export default function LoginScreen({
  onLogin,
}: any) {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (data: any) => {
    try {
      const user = await loginUser(
        data.email,
        data.password,
      );

      Alert.alert(
        'Success',
        `Welcome ${user.fullName}`,
      );

      onLogin?.();
    } catch (error: any) {
      Alert.alert(
        'Login Failed',
        error.message,
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>
        Login
      </Text>

      <Controller
        control={control}
        name="email"
        defaultValue=""
        render={({field: {onChange, value}}) => (
          <Input
            placeholder="Email"
            value={value}
            onChangeText={onChange}
            keyboardType="email-address"
            error={errors.email?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="password"
        defaultValue=""
        render={({field: {onChange, value}}) => (
          <Input
            placeholder="Password"
            secureTextEntry
            value={value}
            onChangeText={onChange}
            error={errors.password?.message}
          />
        )}
      />

      <Button
        title="Login"
        onPress={handleSubmit(onSubmit)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: '#F8FAFC',
  },

  heading: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 30,
    color: '#0F172A',
  },
});
