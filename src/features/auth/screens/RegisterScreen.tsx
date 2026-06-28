import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import {registerUser} from '../../../services/auth/registerService';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';

import Input from '../../../components/Input';
import Button from '../../../components/Button';

import {registerSchema} from '../validations/registerValidation';

export default function RegisterScreen({navigation}: any) {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

 
    const onSubmit = async (data: any) => {
      try {
        const user =
          await registerUser(data);

        console.log(
          'User Saved =>',
          user,
        );

        Alert.alert(
          'Success',
          'Registration Successful',
        );

        navigation.navigate('Login');
      } catch (error: any) {
        Alert.alert(
          'Error',
          error.message,
        );
      }
    };

  return (
    <ScrollView
      contentContainerStyle={styles.container}>
      <Text style={styles.heading}>
        Create Account
      </Text>

      <Controller
        control={control}
        name="fullName"
        render={({field: {onChange, value}}) => (
          <Input
            placeholder="Full Name"
            value={value}
            onChangeText={onChange}
            error={errors.fullName?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="email"
        render={({field: {onChange, value}}) => (
          <Input
            placeholder="Email"
            keyboardType="email-address"
            value={value}
            onChangeText={onChange}
            error={errors.email?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="mobile"
        render={({field: {onChange, value}}) => (
          <Input
            placeholder="Mobile"
            keyboardType="phone-pad"
            value={value}
            onChangeText={onChange}
            error={errors.mobile?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="password"
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

      <Controller
        control={control}
        name="confirmPassword"
        render={({field: {onChange, value}}) => (
          <Input
            placeholder="Confirm Password"
            secureTextEntry
            value={value}
            onChangeText={onChange}
            error={errors.confirmPassword?.message}
          />
        )}
      />

      <Button
        title="Register"
        onPress={handleSubmit(onSubmit)}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
  },

  heading: {
    fontSize: 28,
    fontWeight: '700',
    marginTop: 50,
    marginBottom: 25,
  },
});
