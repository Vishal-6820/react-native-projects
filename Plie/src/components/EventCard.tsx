import {Image, Text, TouchableOpacity, View, StyleSheet} from 'react-native';
import {toggleFavorite} from '../redux/slice/favouriteSlice';
import {RootState} from '../redux/store';
import {useDispatch, useSelector} from 'react-redux';
import {useState} from 'react'; // Import useState

interface EventProps {
  id: number;
  name: string;
  event_id: number; // Ensure event_id is part of the props
  event_profile_img: string;
  event_name: string;
  readable_from_date: string;
  readable_to_date?: string;
  city: string;
  country: string;
  event_price_from?: number;
  event_price_to?: number;
  keywords: string[];
  event_date_id: number;
}

const EventCard = ({event}: {event: EventProps}) => {
  const dispatch = useDispatch();
  const favorites = useSelector(
    (state: RootState) => state.favorites.favorites,
  );
  const [isLocalFavorite, setIsLocalFavorite] = useState(
    favorites.includes(event.event_date_id),
  );

  const handleToggleFavorite = () => {
    setIsLocalFavorite(!isLocalFavorite);
    dispatch(toggleFavorite(event.event_date_id));
    console.log('eventId dispatch >> ' + event.event_date_id);
  };

  return (
    <View style={styles.card}>
      <Image source={{uri: event.event_profile_img}} style={styles.image} />
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{event.event_name}</Text>

        {/* Date and Location in the same row */}
        <View style={styles.dateLocationContainer}>
          <Text style={styles.date}>
            {`${event.readable_from_date}${
              event.readable_to_date ? ` - ${event.readable_to_date}` : ''
            }`}
          </Text>
          <Text
            style={styles.location}>{`${event.city}, ${event.country}`}</Text>
        </View>

        <Text style={styles.price}>
          {event.event_price_from && event.event_price_to
            ? `€${event.event_price_from} - €${event.event_price_to}`
            : event.event_price_from
            ? `€${event.event_price_from}`
            : event.event_price_to
            ? `€${event.event_price_to}`
            : ''}
        </Text>

        <View style={styles.tagsContainer}>
          {event.keywords.map((tag, index) => (
            <Text key={index} style={styles.tag}>
              {tag}
            </Text>
          ))}
        </View>
      </View>
      <View style={styles.actionsContainer}>
        <TouchableOpacity>
          <Image
            source={require('../assets/images/navigationIcon.png')}
            style={styles.navigationIcon}
          />
        </TouchableOpacity>
        <View style={styles.iconRow}>
          <TouchableOpacity style={{marginHorizontal: 10}}>
            <Image
              source={require('../assets/images/shareIcon.png')}
              style={styles.icon}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleToggleFavorite}>
            <Image
              source={
                isLocalFavorite
                  ? require('../assets/images/heart_fill.png')
                  : require('../assets/images/heart.png')
              }
              style={styles.heartIcon}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginBottom: 12,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  detailsContainer: {
    flex: 1,
    marginLeft: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
  dateLocationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 4,
  },
  date: {
    color: '#34A853',
    fontSize: 12,
    fontWeight: '500',
    flex: 1, // Pushes location to the right
  },
  location: {
    color: '#828282',
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'right',
  },
  price: {
    fontSize: 11,
    fontWeight: '400',
  },
  tagsContainer: {
    flexDirection: 'row',
    marginTop: 8,
  },
  tag: {
    fontSize: 12,
    backgroundColor: '#F5F7FC',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 4,
  },
  actionsContainer: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  iconRow: {
    flexDirection: 'row',
  },
  icon: {
    width: 16,
    height: 20,
  },
  heartIcon: {
    width: 20,
    height: 18,
  },
  navigationIcon: {
    width: 14,
    height: 14,
  },
});

export default EventCard;
