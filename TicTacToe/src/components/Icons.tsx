import {StyleSheet, Text, View} from 'react-native';
import type {PropsWithChildren} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

type IconProps = PropsWithChildren<{
  name: string;
}>;
const Icons = ({name}: IconProps) => {
  switch (name) {
    case 'circle':
      return <Icon name="circle-thin" size={38} color="#F7CD2E" />;
      break;
    case 'cross':
      return <Icon name="times" size={38} color="#38CC77" />;
      break;
    default:
      return <Icon name="pencil" size={38} color="#0D0D0D" />;
      break;
  }
  return (
    <View>
      <Text>Icons</Text>
    </View>
  );
};

const styles = StyleSheet.create({});
export default Icons;
