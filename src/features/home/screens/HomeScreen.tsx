import React, {
  useEffect,
  useState,
} from 'react';

import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
} from 'react-native';

import {
  getSession,
} from '../../../services/auth/sessionService';

export default function HomeScreen() {
  const [user, setUser] =
    useState<any>(null);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    const data =
      await getSession();

    setUser(data);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.name}>
          {user?.fullName || 'Guest User'}
        </Text>

        <Text style={styles.email}>
          {user?.email || 'No Email'}
        </Text>

        <Text style={styles.mobile}>
          {user?.mobile || 'No Mobile'}
        </Text>
      </View>
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
