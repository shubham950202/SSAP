import React, {
  useEffect,
  useState,
} from 'react';

import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Alert,
} from 'react-native';

import Button from '../../../components/Button';

import {
  getSession,
  clearSession,
} from '../../../services/auth/sessionService';

export default function ProfileScreen({
  onLogout,
}: any) {
  const [user, setUser] =
    useState<any>(null);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    const data =
      await getSession();

    setUser(data);
  };

  const logout = async () => {
    Alert.alert(
      'Logout',
      'Are you sure?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            await clearSession();

            onLogout?.();
          },
        },
      ],
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.name}>
          {user?.fullName}
        </Text>

        <Text style={styles.email}>
          {user?.email}
        </Text>

        <Text style={styles.mobile}>
          {user?.mobile}
        </Text>
      </View>

      <Button
        title="Logout"
        onPress={logout}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    padding: 20,
  },

  card: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    elevation: 3,
  },

  name: {
    fontSize: 22,
    fontWeight: '700',
    color: '#0F172A',
  },

  email: {
    marginTop: 8,
    color: '#64748B',
  },

  mobile: {
    marginTop: 4,
    color: '#64748B',
  },
});
