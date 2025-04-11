import React, {useState} from 'react';
import {TouchableOpacity, View, Text, StyleSheet} from 'react-native';

const Checkbox = ({label, value, onValueChange}) => {
  const [isChecked, setIsChecked] = useState(value);

  const handleToggle = () => {
    const newValue = !isChecked;
    setIsChecked(newValue);
    onValueChange(newValue); // Notify the parent component of the change
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handleToggle}>
      <View style={[styles.checkboxBase, isChecked && styles.checkboxChecked]}>
        {isChecked && <View style={styles.checkboxInner} />}
      </View>
      {label && <Text style={styles.label}>{label}</Text>}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkboxBase: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#000',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: 'blue',
    borderColor: 'blue',
  },
  checkboxInner: {
    width: 12,
    height: 12,
    backgroundColor: '#fff',
    borderRadius: 2,
  },
  label: {
    marginLeft: 10,
    fontSize: 16,
  },
});

export default Checkbox;
