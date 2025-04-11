import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import Splash from '../screen/Splash';
import Login from '../screen/Login';
import EventListing from '../screen/EventListing';
import FavoritesScreen from '../screen/Favourites';
import Favourites from '../screen/Favourites';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name={'Splash'}
          component={Splash}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={'Login'}
          component={Login}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={'EventListing'}
          component={EventListing}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={'Favourites'}
          component={Favourites}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
