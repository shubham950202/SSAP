import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

export default function ProductDetail({
  route,
  navigation,
}: any) {
  const {product} = route.params;

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}>

      <Image
        source={{uri: product.image}}
        style={styles.image}
        resizeMode="cover"
      />

      <View style={styles.content}>
        <Text style={styles.name}>
          {product.name}
        </Text>

        <Text style={styles.price}>
          ₹ {Number(product.price).toLocaleString()}
        </Text>

        <View style={styles.row}>
          <Text style={styles.badge}>
            {product.category}
          </Text>

          <Text style={styles.brand}>
            {product.brand}
          </Text>
        </View>

        <View style={styles.infoBox}>
          <View style={styles.item}>
            <Text style={styles.label}>
              Rating
            </Text>

            <Text style={styles.value}>
              ⭐ {product.rating}
            </Text>
          </View>

          <View style={styles.item}>
            <Text style={styles.label}>
              Stock
            </Text>

            <Text
              style={[
                styles.value,
                {
                  color:
                    product.stock > 0
                      ? '#16A34A'
                      : '#DC2626',
                },
              ]}>
              {product.stock}
            </Text>
          </View>
        </View>

        <Text style={styles.descTitle}>
          Description
        </Text>

        <Text style={styles.desc}>
          Premium quality {product.name} from{' '}
          {product.brand}. Perfect for
          everyday use with excellent build
          quality and performance.
        </Text>

        <TouchableOpacity
          style={styles.button}>
          <Text style={styles.buttonText}>
            Buy Now
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.editButton}
          onPress={() =>
            navigation.navigate(
              'EditProduct',
              {
                product,
              },
            )
          }>
          <Text
            style={styles.editText}>
            Edit Product
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },

  image: {
    width: '100%',
    height: 320,
    backgroundColor: '#EEE',
  },

  content: {
    padding: 20,
  },

  name: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111827',
  },

  price: {
    marginTop: 10,
    fontSize: 26,
    color: '#2563EB',
    fontWeight: '700',
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },

  badge: {
    backgroundColor: '#E0E7FF',
    color: '#4338CA',
    paddingHorizontal: 15,
    paddingVertical: 6,
    borderRadius: 30,
    fontWeight: '600',
  },

  brand: {
    fontWeight: '700',
    color: '#64748B',
  },

  infoBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 25,
    backgroundColor: '#FFF',
    borderRadius: 15,
    padding: 18,
    elevation: 3,
  },

  item: {
    alignItems: 'center',
  },

  label: {
    color: '#64748B',
    marginBottom: 5,
  },

  value: {
    fontSize: 18,
    fontWeight: '700',
  },

  descTitle: {
    marginTop: 25,
    fontSize: 20,
    fontWeight: '700',
  },

  desc: {
    marginTop: 10,
    color: '#64748B',
    lineHeight: 24,
    fontSize: 16,
  },

  button: {
    marginTop: 30,
    backgroundColor: '#2563EB',
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: 'center',
  },

  buttonText: {
    color: '#FFF',
    fontWeight: '700',
    fontSize: 18,
  },

  editButton: {
    marginTop: 15,
    borderWidth: 1,
    borderColor: '#2563EB',
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: 'center',
  },

  editText: {
    color: '#2563EB',
    fontWeight: '700',
    fontSize: 18,
  },
});
