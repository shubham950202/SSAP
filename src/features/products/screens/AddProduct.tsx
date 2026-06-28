import React from 'react';
import {
  View,
  StyleSheet,
  Alert,
  ScrollView,
} from 'react-native';

import {
  Controller,
  useForm,
} from 'react-hook-form';

import Input from '../../../components/Input';
import Button from '../../../components/Button';

import {addProduct} from '../../../services/api/productApi';

export default function AddProduct({
  navigation,
}: any) {
  const {control, handleSubmit} = useForm({
    defaultValues: {
      name: '',
      price: '',
      category: '',
      brand: '',
      rating: '',
      stock: '',
      image: '',
    },
  });

  const submit = async (data: any) => {
    try {
      await addProduct({
        ...data,
        price: Number(data.price),
        rating: Number(data.rating),
        stock: Number(data.stock),
      });

      Alert.alert(
        'Success',
        'Product Added Successfully',
      );

      navigation.goBack();
    } catch (error) {
      console.log(error);

      Alert.alert(
        'Error',
        'Unable to add product',
      );
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{
        paddingBottom: 30,
      }}
      keyboardShouldPersistTaps="handled">

      <Controller
        control={control}
        name="name"
        render={({field}) => (
          <Input
            placeholder="Product Name"
            value={field.value}
            onChangeText={field.onChange}
          />
        )}
      />

      <Controller
        control={control}
        name="price"
        render={({field}) => (
          <Input
            placeholder="Price"
            keyboardType="numeric"
            value={field.value}
            onChangeText={field.onChange}
          />
        )}
      />

      <Controller
        control={control}
        name="category"
        render={({field}) => (
          <Input
            placeholder="Category"
            value={field.value}
            onChangeText={field.onChange}
          />
        )}
      />

      <Controller
        control={control}
        name="brand"
        render={({field}) => (
          <Input
            placeholder="Brand"
            value={field.value}
            onChangeText={field.onChange}
          />
        )}
      />

      <Controller
        control={control}
        name="rating"
        render={({field}) => (
          <Input
            placeholder="Rating"
            keyboardType="numeric"
            value={field.value}
            onChangeText={field.onChange}
          />
        )}
      />

      <Controller
        control={control}
        name="stock"
        render={({field}) => (
          <Input
            placeholder="Stock"
            keyboardType="numeric"
            value={field.value}
            onChangeText={field.onChange}
          />
        )}
      />

      <Controller
        control={control}
        name="image"
        render={({field}) => (
          <Input
            placeholder="Image URL"
            value={field.value}
            onChangeText={field.onChange}
          />
        )}
      />

      <Button
        title="Add Product"
        onPress={handleSubmit(submit)}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
});
