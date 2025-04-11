import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';

export default function Splash() {
  const navigation = useNavigation();
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Login');
    }, 1000);
  }, []);

  return (
    <View style={styles.continer}>
      <Text style={styles.titleText}>Plie</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  continer: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 36,
    lineHeight: 40,
    color: 'black',
  },
});
