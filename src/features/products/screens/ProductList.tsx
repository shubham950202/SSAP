import React from 'react';
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';

import {useNavigation} from '@react-navigation/native';

import useProducts from '../hooks/useProducts';

export default function ProductList() {
  const navigation: any = useNavigation();

  const {products, loading} = useProducts();

  if (loading) {
    return (
      <View style={styles.loader}>
        <Text>Loading Products...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => (
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() =>
              navigation.navigate('ProductDetail', {
                product: item,
              })
            }>
            <View style={styles.card}>
              <Image
                source={{uri: item.image}}
                style={styles.image}
                resizeMode="cover"
              />

              <View style={styles.content}>
                <Text
                  numberOfLines={2}
                  style={styles.name}>
                  {item.name}
                </Text>

                <Text style={styles.price}>
                  ₹ {Number(item.price).toLocaleString()}
                </Text>

                <View style={styles.row}>
                  <Text style={styles.category}>
                    {item.category}
                  </Text>

                  <Text style={styles.brand}>
                    {item.brand}
                  </Text>
                </View>

                <View style={styles.bottomRow}>
                  <Text style={styles.rating}>
                    ⭐ {item.rating}
                  </Text>

                  <Text
                    style={[
                      styles.stock,
                      {
                        color:
                          item.stock > 0
                            ? '#16A34A'
                            : '#DC2626',
                      },
                    ]}>
                    {item.stock > 0
                      ? `${item.stock} In Stock`
                      : 'Out of Stock'}
                  </Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />

      {/* Floating Add Button */}

      <TouchableOpacity
        style={styles.fab}
        onPress={() =>
          navigation.navigate('AddProduct')
        }>
        <Text style={styles.plus}>＋</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },

  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  list: {
    padding: 15,
    paddingBottom: 90,
  },

  card: {
    backgroundColor: '#FFF',
    borderRadius: 18,
    overflow: 'hidden',
    marginBottom: 18,

    elevation: 5,

    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 10,
  },

  image: {
    width: '100%',
    height: 220,
    backgroundColor: '#EEE',
  },

  content: {
    padding: 15,
  },

  name: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0F172A',
  },

  price: {
    fontSize: 22,
    fontWeight: '700',
    color: '#2563EB',
    marginTop: 8,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },

  category: {
    backgroundColor: '#EEF2FF',
    color: '#4338CA',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    fontSize: 13,
    fontWeight: '600',
  },

  brand: {
    color: '#64748B',
    fontWeight: '600',
  },

  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
    alignItems: 'center',
  },

  rating: {
    fontSize: 16,
    fontWeight: '700',
  },

  stock: {
    fontWeight: '700',
  },

  fab: {
    position: 'absolute',
    right: 20,
    bottom: 25,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#2563EB',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
  },

  plus: {
    color: '#fff',
    fontSize: 34,
    fontWeight: '700',
  },
});
