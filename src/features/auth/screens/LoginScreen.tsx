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

import {yupResolver} from '@hookform/resolvers/yup';

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
    formState: {errors, isSubmitting},
  } = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: any) => {
    try {
      const user = await loginUser(
        data.email.trim().toLowerCase(),
        data.password,
      );

      console.log(
        'LOGIN SUCCESS =>',
        user,
      );

      Alert.alert(
        'Success',
        `Welcome ${user.name}`,
      );

      // RootNavigator ko notify karega
      onLogin?.();
    } catch (error: any) {
      console.log(
        'LOGIN ERROR =>',
        error,
      );

      Alert.alert(
        'Login Failed',
        error?.message ||
          'Invalid email or password',
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
        render={({field}) => (
          <Input
            placeholder="Email"
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="email-address"
            value={field.value}
            onChangeText={field.onChange}
            error={errors.email?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="password"
        render={({field}) => (
          <Input
            placeholder="Password"
            secureTextEntry
            value={field.value}
            onChangeText={field.onChange}
            error={errors.password?.message}
          />
        )}
      />

      <Button
        title={
          isSubmitting
            ? 'Logging in...'
            : 'Login'
        }
        onPress={handleSubmit(onSubmit)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#F8FAFC',
  },

  heading: {
    fontSize: 30,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 30,
  },
});
