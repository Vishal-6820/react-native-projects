import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useLayoutEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  Alert,
  SafeAreaView,
  StatusBar,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import EventCard from '../components/EventCard';
import {getEventListing} from '../api/index';
import BottomNavigation from '../components/BottomNavigation';
import {useSelector} from 'react-redux';
type Props = NativeStackScreenProps<RootStackParamList, 'EventListing'>;

const EventListing: React.FC<Props> = ({navigation, route}) => {
  const [isDataLoading, setIsDataLoading] = useState(false);
  const [eventsData, setEventsData] = useState(null);
  const {token} = route.params;
  const favoriteIds = useSelector(
    (state: RootState) => state.favorites.favorites,
  );

  useLayoutEffect(() => {
    getEventListingData();
  }, []);

  const getEventListingData = async () => {
    try {
      setIsDataLoading(true);
      const response = await getEventListing(token);
      const success = response.success;
      const message = response.message;
      if (success) {
        console.log('response >> ' + JSON.stringify(response.data.events));
        setEventsData(response.data.events);
      } else {
        Alert.alert('Failed to get data', message);
      }
    } catch (err) {
      console.log('Get Event Listing Data ', err);
    } finally {
      setIsDataLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'dark-content'} backgroundColor={'#D9D9D9'} />
      {isDataLoading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#007bff" />
        </View>
      ) : (
        <ScrollView style={styles.scrollContainer}>
          <View style={styles.scrollContainer}>
            <View style={styles.headerContainer}>
              <Text style={styles.headerTitle}>Hello Renzo!</Text>
              <Text style={styles.headerSubtitle}>Are you ready to dance?</Text>
            </View>
            <View style={styles.eventsContainer}>
              {eventsData != null && (
                <FlatList
                  data={eventsData}
                  keyExtractor={item => item.id}
                  renderItem={({item}) => <EventCard event={item} />}
                  showsVerticalScrollIndicator={false}
                />
              )}
            </View>
          </View>
        </ScrollView>
      )}
      <BottomNavigation navigation={navigation} token={token} />
    </SafeAreaView>
  );
};

export default EventListing;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollContainer: {
    flex: 1,
  },
  headerContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
    top: 54,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  headerSubtitle: {
    color: 'gray',
    marginBottom: 16,
  },
  eventsContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: '#D9D9D9',
    marginTop: 54,
    height: '100%',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
});
