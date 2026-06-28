import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
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

import {registerSchema} from '../validations/registerValidation';
import {registerUser} from '../../../services/auth/registerService';

export default function RegisterScreen({
  navigation,
}: any) {
  const {
    control,
    handleSubmit,
    reset,
    formState: {errors, isSubmitting},
  } = useForm({
    resolver: yupResolver(registerSchema),
    defaultValues: {
      fullName: '',
      email: '',
      mobile: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: any) => {
    try {
      const payload = {
        fullName: data.fullName.trim(),
        email: data.email.trim().toLowerCase(),
        mobile: data.mobile.trim(),
        password: data.password,
      };

      const user = await registerUser(payload);

      console.log(
        'REGISTER SUCCESS =>',
        user,
      );

      reset();

      Alert.alert(
        'Success',
        'Registration Successful',
        [
          {
            text: 'OK',
            onPress: () =>
              navigation.navigate(
                'Login',
              ),
          },
        ],
      );
    } catch (error: any) {
      console.log(
        'REGISTER ERROR =>',
        error,
      );

      Alert.alert(
        'Registration Failed',
        error?.message ||
          'Something went wrong',
      );
    }
  };

  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={
        styles.container
      }>
      <Text style={styles.heading}>
        Create Account
      </Text>

      <Controller
        control={control}
        name="fullName"
        render={({field}) => (
          <Input
            placeholder="Full Name"
            value={field.value}
            onChangeText={
              field.onChange
            }
            error={
              errors.fullName?.message
            }
          />
        )}
      />

      <Controller
        control={control}
        name="email"
        render={({field}) => (
          <Input
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
            value={field.value}
            onChangeText={
              field.onChange
            }
            error={
              errors.email?.message
            }
          />
        )}
      />

      <Controller
        control={control}
        name="mobile"
        render={({field}) => (
          <Input
            placeholder="Mobile Number"
            keyboardType="phone-pad"
            maxLength={10}
            value={field.value}
            onChangeText={
              field.onChange
            }
            error={
              errors.mobile?.message
            }
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
            onChangeText={
              field.onChange
            }
            error={
              errors.password?.message
            }
          />
        )}
      />

      <Controller
        control={control}
        name="confirmPassword"
        render={({field}) => (
          <Input
            placeholder="Confirm Password"
            secureTextEntry
            value={field.value}
            onChangeText={
              field.onChange
            }
            error={
              errors
                .confirmPassword
                ?.message
            }
          />
        )}
      />

      <Button
        title={
          isSubmitting
            ? 'Registering...'
            : 'Register'
        }
        onPress={handleSubmit(
          onSubmit,
        )}
      />
    </ScrollView>
  );
}

const styles =
  StyleSheet.create({
    container: {
      flexGrow: 1,
      padding: 24,
      backgroundColor:
        '#F8FAFC',
      justifyContent:
        'center',
    },

    heading: {
      fontSize: 28,
      fontWeight: '700',
      marginBottom: 30,
      color: '#0F172A',
    },
  });
