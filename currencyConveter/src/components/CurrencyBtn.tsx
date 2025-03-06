import {StyleSheet, Text, View} from 'react-native';
import type {PropsWithChildren} from 'react';

type CurrencyBtnProps = PropsWithChildren<{
  name: string;
  flag: string;
}>;

export default function CurrencyBtn(props: CurrencyBtnProps) {
  return (
    <View style={styles.btnContainer}>
      <Text style={styles.flag}>{props.flag}</Text>
      <Text style={styles.country}>{props.name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  btnContainer: {
    alignItems: 'center',
  },
  flag: {
    fontSize: 28,
    color: '#FFFFFF',
    marginBottom: 4,
  },
  country: {
    fontSize: 14,
    color: '#2d3436',
  },
});
