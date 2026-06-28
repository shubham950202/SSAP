import React, {
  useEffect,
  useState,
  useCallback,
} from 'react';

import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Alert,
  Image,
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

  const loadProfile = useCallback(
    async () => {
      try {
        const data =
          await getSession();

        setUser(data);
      } catch (error) {
        console.log(
          'PROFILE ERROR',
          error,
        );
      }
    },
    [],
  );

  const logout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
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

            setUser(null);

            onLogout?.();
          },
        },
      ],
    );
  };

  return (
    <SafeAreaView
      style={styles.container}>
      <View style={styles.card}>
        {user?.profileImage ? (
          <Image
            source={{
              uri: user.profileImage,
            }}
            style={styles.avatar}
          />
        ) : (
          <View style={styles.avatar}>
            <Text
              style={
                styles.avatarText
              }>
              {user?.name
                ?.charAt(0)
                ?.toUpperCase() ||
                'U'}
            </Text>
          </View>
        )}

        <Text style={styles.name}>
          {user?.name ||
            'Guest User'}
        </Text>

        <Text style={styles.email}>
          {user?.email}
        </Text>

        <Text style={styles.mobile}>
          {user?.mobile}
        </Text>

        <Text
          style={styles.username}>
          @{user?.username}
        </Text>

        <Text
          style={styles.date}>
          Joined :
          {user?.createdAt
            ? ` ${new Date(
                user.createdAt,
              ).toLocaleDateString()}`
            : ''}
        </Text>
      </View>

      <Button
        title="Logout"
        onPress={logout}
      />
    </SafeAreaView>
  );
}

const styles =
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:
        '#F8FAFC',
      padding: 20,
      justifyContent:
        'space-between',
    },

    card: {
      backgroundColor: '#FFF',
      borderRadius: 20,
      padding: 24,
      alignItems: 'center',
      elevation: 3,
    },

    avatar: {
      width: 100,
      height: 100,
      borderRadius: 50,
      backgroundColor:
        '#2563EB',
      justifyContent:
        'center',
      alignItems: 'center',
      marginBottom: 20,
    },

    avatarText: {
      fontSize: 36,
      color: '#FFF',
      fontWeight: '700',
    },

    name: {
      fontSize: 24,
      fontWeight: '700',
      color: '#0F172A',
    },

    email: {
      marginTop: 8,
      color: '#64748B',
      fontSize: 16,
    },

    mobile: {
      marginTop: 6,
      color: '#64748B',
      fontSize: 16,
    },

    username: {
      marginTop: 6,
      color: '#2563EB',
      fontSize: 15,
      fontWeight: '600',
    },

    date: {
      marginTop: 10,
      color: '#94A3B8',
      fontSize: 13,
    },
  });
