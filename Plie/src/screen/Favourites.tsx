import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/store';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import BottomNavigation from '../components/BottomNavigation';
import EventCard from '../components/EventCard';
import {getEventListing} from '../api';

// Define the RootStackParamList type (assuming you have it defined elsewhere)
type RootStackParamList = {
  EventListing: {token: string};
  // ... other screens
};

type Props = NativeStackScreenProps<RootStackParamList, 'EventListing'>;

const Favourites: React.FC<Props> = ({navigation, route}) => {
  const [isDataLoading, setIsDataLoading] = useState(false);
  const [eventsData, setEventsData] = useState<any[]>([]);
  const {token} = route.params;

  const favoriteIds = useSelector(
    (state: RootState) => state.favorites.favorites,
  );

  const [filteredData, setFilteredData] = useState<any[]>([]);

  useEffect(() => {
    getEventListingData();
  }, []);

  useEffect(() => {
    // Filter events that are in the favorite list whenever eventsData or favoriteIds change
    console.log('favoriteIds >> ' + favoriteIds);
    const favoriteEvents = eventsData.filter(event =>
      favoriteIds.includes(event.event_date_id),
    );
    console.log(favoriteEvents);
    setFilteredData(favoriteEvents);
  }, [eventsData, favoriteIds]);

  const getEventListingData = async () => {
    try {
      setIsDataLoading(true);
      const response = await getEventListing(token);
      if (response.success) {
        // console.log('Fetched Events:', JSON.stringify(response.data.events));
        setEventsData(response.data.events || []);
      } else {
        Alert.alert('Failed to get data', response.message);
      }
    } catch (err) {
      console.log('Error fetching events:', err);
    } finally {
      setIsDataLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#D9D9D9" />
      <View style={styles.scrollContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>Hello Renzo!</Text>
          <Text style={styles.headerSubtitle}>Are you ready to dance?</Text>
        </View>

        <View style={styles.eventsContainer}>
          {isDataLoading ? (
            <View style={styles.loaderContainer}>
              <ActivityIndicator size="large" color="blue" />
            </View>
          ) : filteredData.length > 0 ? (
            <FlatList
              data={filteredData} // Use filteredData here
              keyExtractor={item => item.id}
              renderItem={({item}) => <EventCard event={item} />}
              showsVerticalScrollIndicator={false}
            />
          ) : (
            <Text style={styles.noDataText}>No favorite events found.</Text>
          )}
        </View>
      </View>

      <BottomNavigation navigation={navigation} />
    </SafeAreaView>
  );
};

export default Favourites;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollContainer: {
    flex: 1,
  },
  headerContainer: {
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
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noDataText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: 'gray',
  },
});
