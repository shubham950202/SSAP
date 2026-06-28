import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Image,
} from 'react-native';

import {useNavigation} from '@react-navigation/native';

import {
  getAllUsers,
  deleteUser,
} from '../../../database/repositories/userRepository';

export default function UsersScreen() {
  const navigation = useNavigation<any>();

  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const data = await getAllUsers();
    setUsers(data);
  };

  const handleDelete = (id: string) => {
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
            await deleteUser(id);
            loadUsers();
          },
        },
      ],
    );
  };

  const renderUser = ({item}: any) => (
    <View style={styles.card}>
      {item.profileImage ? (
        <Image
          source={{uri: item.profileImage}}
          style={styles.avatar}
        />
      ) : (
        <View style={styles.avatarPlaceholder}>
          <Text style={styles.avatarText}>
            {item.fullName?.charAt(0)}
          </Text>
        </View>
      )}

      <Text style={styles.name}>
        {item.fullName}
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
          <Text style={styles.btnText}>
            Edit
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.deleteBtn}
          onPress={() =>
            handleDelete(item.id)
          }>
          <Text style={styles.btnText}>
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
        keyExtractor={item => item.id}
        renderItem={renderUser}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            No Users Found
          </Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    padding: 16,
  },

  heading: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 15,
    color: '#0F172A',
    marginTop: 50
  },

  card: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 15,
    marginBottom: 12,
    elevation: 3,
  },

  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    alignSelf: 'center',
    marginBottom: 10,
  },

  avatarPlaceholder: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#2563EB',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 10,
  },

  avatarText: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: '700',
  },

  name: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0F172A',
    textAlign: 'center',
  },

  text: {
    marginTop: 4,
    color: '#64748B',
    textAlign: 'center',
  },

  buttonRow: {
    flexDirection: 'row',
    marginTop: 15,
    justifyContent: 'center',
  },

  editBtn: {
    backgroundColor: '#2563EB',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    marginRight: 10,
  },

  deleteBtn: {
    backgroundColor: '#DC2626',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },

  btnText: {
    color: '#FFF',
    fontWeight: '600',
  },

  emptyText: {
    textAlign: 'center',
    marginTop: 50,
    color: '#64748B',
  },
});
