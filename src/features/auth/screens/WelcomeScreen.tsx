import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import Button from '../../../components/Button';
import {COLORS} from '../../../theme/colors';

export default function WelcomeScreen({navigation}: any) {
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>SSAP</Text>

      <Text style={styles.title}>
        Smart Access Platform
      </Text>

      <Text style={styles.subtitle}>
        React Native app
      </Text>

      <Button
        title="Login"
        onPress={() => navigation.navigate('Login')}
      />

      <View style={{height: 12}} />

      <Button
        title="Register"
        onPress={() => navigation.navigate('Register')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: COLORS.background,
  },

  logo: {
    fontSize: 50,
    fontWeight: '700',
    color: COLORS.primary,
    textAlign: 'center',
  },

  title: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '700',
    marginTop: 20,
    color: COLORS.text,
  },

  subtitle: {
    textAlign: 'center',
    color: COLORS.textSecondary,
    marginBottom: 50,
    marginTop: 10,
  },
});
