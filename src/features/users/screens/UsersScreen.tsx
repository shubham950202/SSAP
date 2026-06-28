import React, {
  useEffect,
  useState,
  useCallback,
} from 'react';

import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Image,
} from 'react-native';

import {
  useNavigation,
  useFocusEffect,
} from '@react-navigation/native';

import {
  getUsers,
  deleteUser,
} from '../../../services/api/userApi';

export default function UsersScreen() {
  const navigation = useNavigation<any>();

  const [users, setUsers] = useState<any[]>([]);
  const [refreshing, setRefreshing] =
    useState(false);

  const loadUsers = async () => {
    try {
      setRefreshing(true);

      const data = await getUsers();

      setUsers(data);
    } catch (error) {
      console.log(error);

      Alert.alert(
        'Error',
        'Unable to load users',
      );
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadUsers();
    }, []),
  );

  const handleDelete = (
    id: string,
  ) => {
    Alert.alert(
      'Delete User',
      'Are you sure you want to delete this user?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteUser(id);

              loadUsers();
            } catch (e) {
              Alert.alert(
                'Error',
                'Delete failed',
              );
            }
          },
        },
      ],
    );
  };

  const renderUser = ({
    item,
  }: any) => (
    <View style={styles.card}>
      {item.profileImage ? (
        <Image
          source={{
            uri: item.profileImage,
          }}
          style={styles.avatar}
        />
      ) : (
        <View
          style={
            styles.avatarPlaceholder
          }>
          <Text
            style={
              styles.avatarText
            }>
            {item.name
              ?.charAt(0)
              ?.toUpperCase()}
          </Text>
        </View>
      )}

      <Text style={styles.name}>
        {item.name}
      </Text>

      <Text style={styles.username}>
        @{item.username}
      </Text>

      <Text style={styles.text}>
        {item.email}
      </Text>

      <Text style={styles.text}>
        {item.mobile}
      </Text>

      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={styles.editBtn}
          onPress={() =>
            navigation.navigate(
              'EditUser',
              {
                user: item,
              },
            )
          }>
          <Text
            style={styles.btnText}>
            Edit
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.deleteBtn}
          onPress={() =>
            handleDelete(item.id)
          }>
          <Text
            style={styles.btnText}>
            Delete
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>
        All Users
      </Text>

      <FlatList
        data={users}
        keyExtractor={item =>
          item.id.toString()
        }
        renderItem={renderUser}
        refreshing={refreshing}
        onRefresh={loadUsers}
        showsVerticalScrollIndicator={
          false
        }
        ListEmptyComponent={
          <Text
            style={styles.emptyText}>
            No Users Found
          </Text>
        }
      />
    </View>
  );
}

const styles =
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:
        '#F8FAFC',
      padding: 16,
    },

    heading: {
      fontSize: 26,
      fontWeight: '700',
      marginTop: 50,
      marginBottom: 20,
      color: '#0F172A',
    },

    card: {
      backgroundColor: '#FFF',
      borderRadius: 18,
      padding: 18,
      marginBottom: 16,
      elevation: 3,
    },

    avatar: {
      width: 80,
      height: 80,
      borderRadius: 40,
      alignSelf: 'center',
      marginBottom: 12,
    },

    avatarPlaceholder: {
      width: 80,
      height: 80,
      borderRadius: 40,
      backgroundColor:
        '#2563EB',
      justifyContent:
        'center',
      alignItems: 'center',
      alignSelf: 'center',
      marginBottom: 12,
    },

    avatarText: {
      color: '#FFF',
      fontSize: 30,
      fontWeight: '700',
    },

    name: {
      fontSize: 20,
      fontWeight: '700',
      textAlign: 'center',
      color: '#0F172A',
    },

    username: {
      textAlign: 'center',
      color: '#2563EB',
      marginTop: 4,
      marginBottom: 6,
    },

    text: {
      textAlign: 'center',
      color: '#64748B',
      marginTop: 3,
    },

    buttonRow: {
      flexDirection: 'row',
      justifyContent:
        'center',
      marginTop: 18,
    },

    editBtn: {
      backgroundColor:
        '#2563EB',
      paddingHorizontal: 24,
      paddingVertical: 10,
      borderRadius: 10,
      marginRight: 10,
    },

    deleteBtn: {
      backgroundColor:
        '#DC2626',
      paddingHorizontal: 24,
      paddingVertical: 10,
      borderRadius: 10,
    },

    btnText: {
      color: '#FFF',
      fontWeight: '700',
    },

    emptyText: {
      marginTop: 80,
      textAlign: 'center',
      color: '#64748B',
      fontSize: 16,
    },
  });
