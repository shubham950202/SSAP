import React from 'react';
import {
  TextInput,
  StyleSheet,
  View,
  Text,
} from 'react-native';

import {COLORS} from '../../theme/colors';

interface Props {
  error?: string;
  [key: string]: any;
}

const Input = ({error, ...props}: Props) => {
  return (
    <View>
      <TextInput
        {...props}
        style={[
          styles.input,
          error && styles.errorBorder,
        ]}
        placeholderTextColor="#94A3B8"
      />

      {!!error && (
        <Text style={styles.error}>
          {error}
        </Text>
      )}
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  input: {
    height: 55,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 14,
    paddingHorizontal: 16,
    backgroundColor: COLORS.white,
    marginBottom: 5,
  },

  errorBorder: {
    borderColor: COLORS.danger,
  },

  error: {
    color: COLORS.danger,
    marginBottom: 12,
    marginLeft: 4,
    fontSize: 12,
  },
});
