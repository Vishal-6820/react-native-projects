import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
export default function BottomNavigation({navigation, token}) {
  const [selectedTab, setSelectedTab] = useState(0);
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <TouchableOpacity style={styles.tabStyle}>
          <Image
            source={require('../assets/images/search.png')}
            style={{width: 26, height: 26}}
          />
          <Text>Search</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('EventListing', {token: token});
          }}
          style={styles.tabStyle}>
          <Image
            source={require('../assets/images/events_fill.png')}
            style={{width: 26, height: 26}}
          />
          <Text>Events</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Favourites', {token: token});
          }}
          style={styles.tabStyle}>
          <Image
            source={require('../assets/images/favourites.png')}
            style={{width: 26, height: 24}}
          />
          <Text>Favourites</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabStyle}>
          <Image
            source={require('../assets/images/user.png')}
            style={{width: 26, height: 26}}
          />
          <Text>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {marginBottom: 15, backgroundColor: 'red'},
  innerContainer: {
    position: 'absolute',
    bottom: 0,
    height: 60,
    width: '100%',
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  tabStyle: {
    width: '20%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
