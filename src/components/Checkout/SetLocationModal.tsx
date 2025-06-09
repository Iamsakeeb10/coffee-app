// import React, {useCallback} from 'react';

// import Ionicons from 'react-native-vector-icons/Ionicons';

// import {useFocusEffect} from '@react-navigation/native';
// import {
//   SafeAreaView,
//   StatusBar,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from 'react-native';
// import {useSafeAreaInsets} from 'react-native-safe-area-context';
// import {colors} from '../../constants/colors';
// import Header from '../Common/Header';

// type SetLocationModalProps = {
//   onClose: () => void;
// };

// const SetLocationModal = ({onClose}: SetLocationModalProps) => {
//   const insets = useSafeAreaInsets();

//   useFocusEffect(
//     useCallback(() => {
//       StatusBar.setBarStyle('dark-content');
//       StatusBar.setBackgroundColor('#fff');
//     }, []),
//   );

//   return (
//     <SafeAreaView
//       style={[
//         styles.container,
//         {
//           paddingTop: insets.top,
//         },
//       ]}>
//       <StatusBar backgroundColor="#fff" barStyle="dark-content" />
//       <Header
//         title="Set Your Location"
//         showBack={true}
//         onBackPress={onClose}
//         modalHeader
//         useSafeArea={true}
//         backgroundColor={colors.white}
//         color={colors.black}
//       />

//       {/* Search Bar */}
//       <View style={styles.searchBar}>
//         <Ionicons name="location-outline" size={20} color="#666" />
//         <View style={styles.input}>
//           <Text>No location picked yet</Text>
//         </View>
//       </View>

//       {/* Action Buttons */}
//       <View style={styles.actionButtons}>
//         <TouchableOpacity style={styles.actionBtn}>
//           <Ionicons name="navigate-outline" size={16} color="#000" />
//           <Text style={styles.actionText}>Fetch Current location</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.actionBtn}>
//           <Ionicons name="map-outline" size={16} color="#000" />
//           <Text style={styles.actionText}>Pick on Map</Text>
//         </TouchableOpacity>
//       </View>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {flex: 1, backgroundColor: '#fff'},
//   header: {
//     paddingHorizontal: 16,
//     // paddingVertical: 12,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//   },
//   headerTitle: {fontSize: 18, fontWeight: 'bold', color: '#000'},
//   searchBar: {
//     flexDirection: 'row',
//     backgroundColor: '#f0f0f0',
//     margin: 16,
//     paddingHorizontal: 12,
//     borderRadius: 8,
//     alignItems: 'center',
//   },
//   input: {
//     flex: 1,
//     marginLeft: 8,
//     color: '#000',
//     height: 40,
//     justifyContent: 'center',
//   },
//   actionButtons: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     paddingVertical: 10,
//     paddingHorizontal: 16,
//   },
//   actionBtn: {
//     backgroundColor: '#f9f9f9',
//     borderRadius: 10,
//     paddingVertical: 10,
//     paddingHorizontal: 12,
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   actionText: {
//     marginLeft: 6,
//     fontWeight: '500',
//     color: '#000',
//   },
//   addressList: {
//     paddingHorizontal: 16,
//     marginTop: 10,
//   },
//   addressItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingVertical: 14,
//     borderBottomColor: '#eee',
//     borderBottomWidth: 1,
//   },
//   addressTitle: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#000',
//   },
//   addressSub: {
//     fontSize: 13,
//     color: '#888',
//     marginTop: 2,
//   },
// });

// export default SetLocationModal;

import Geolocation from '@react-native-community/geolocation';
import {useFocusEffect} from '@react-navigation/native';
import React, {useCallback, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  PermissionsAndroid,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE, UrlTile} from 'react-native-maps';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {colors} from '../../constants/colors';
import Header from '../Common/Header';

const {width, height} = Dimensions.get('window');

type SetLocationModalProps = {
  onClose: () => void;
  onLocationSelected?: (
    location: {latitude: number; longitude: number},
    address: string,
  ) => void;
};

const SetLocationModal = ({
  onClose,
  onLocationSelected,
}: SetLocationModalProps) => {
  const insets = useSafeAreaInsets();

  // State management
  const [region, setRegion] = useState(null);
  const [marker, setMarker] = useState(null);
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [locationPermission, setLocationPermission] = useState(false);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [addressLoading, setAddressLoading] = useState(false);
  const [fetchTimeoutId, setFetchTimeoutId] = useState(null);

  useFocusEffect(
    useCallback(() => {
      StatusBar.setBarStyle('dark-content');
      StatusBar.setBackgroundColor('#fff');
      initializeApp();
    }, []),
  );

  const initializeApp = async () => {
    try {
      await checkLocationPermission();
    } catch (error) {
      console.error('App initialization error:', error);
    }
  };

  const checkLocationPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message:
              'This app needs access to your location to show nearby places.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        setLocationPermission(granted === PermissionsAndroid.RESULTS.GRANTED);
      } catch (err) {
        console.warn(err);
        setLocationPermission(false);
      }
    } else {
      setLocationPermission(true);
    }
  };

  const getCurrentLocation = () => {
    if (!locationPermission) {
      Alert.alert(
        'Permission Required',
        'Location permission is required to fetch your current location.',
        [
          {text: 'Cancel', style: 'cancel'},
          {text: 'Settings', onPress: () => checkLocationPermission()},
        ],
      );
      return;
    }

    setLoading(true);
    setAddress('');

    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        const location = {latitude, longitude};

        setCurrentLocation(location);
        setMarker(location);

        const newRegion = {
          latitude,
          longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        };
        setRegion(newRegion);

        fetchAddress(latitude, longitude);
        setLoading(false);
      },
      error => {
        setLoading(false);
        console.error('Location error:', error);

        let errorMessage = 'Error getting location. ';
        switch (error.code) {
          case 1:
            errorMessage += 'Permission denied.';
            break;
          case 2:
            errorMessage += 'Position unavailable.';
            break;
          case 3:
            errorMessage += 'Timeout.';
            break;
          default:
            errorMessage += 'Unknown error.';
        }

        Alert.alert('Location Error', errorMessage);
      },
      {
        enableHighAccuracy: false,
        timeout: 20000,
        maximumAge: 60000,
      },
    );
  };

  const openMapPicker = () => {
    if (!currentLocation) {
      setLoading(true);
      getCurrentLocation();
    }
    setShowMap(true);
  };

  const fetchAddress = async (lat, lon) => {
    setAddressLoading(true);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}&addressdetails=1&accept-language=en`,
        {
          headers: {
            'User-Agent': 'YourAppName/1.0',
          },
        },
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data && data.display_name) {
        setAddress(data.display_name);
      } else {
        setAddress('Address not found for this location');
      }
    } catch (error) {
      console.error('Address fetch error:', error);
      setAddress('Error fetching address - please try again');
    } finally {
      setAddressLoading(false);
    }
  };

  const handleMapPress = event => {
    const {latitude, longitude} = event.nativeEvent.coordinate;
    const newMarker = {latitude, longitude};
    setMarker(newMarker);
    fetchAddress(latitude, longitude);
  };

  const handleConfirmLocation = () => {
    if (marker && address) {
      onLocationSelected?.(marker, address);
      setShowMap(false);
      onClose();
    }
  };

  const handleCancelMapPicker = () => {
    if (fetchTimeoutId) {
      clearTimeout(fetchTimeoutId);
      setFetchTimeoutId(null);
    }

    setShowMap(false);
    setAddressLoading(false);

    if (currentLocation) {
      setMarker(currentLocation);
      fetchAddress(currentLocation.latitude, currentLocation.longitude);
    }
  };

  // Map view
  if (showMap) {
    return (
      <View style={styles.mapContainer}>
        <StatusBar barStyle="light-content" backgroundColor="#007AFF" />

        {/* Map Header */}
        <View style={[styles.mapHeader, {paddingTop: insets.top + 10}]}>
          <TouchableOpacity
            style={styles.headerButton}
            onPress={handleCancelMapPicker}>
            <Ionicons name="close" size={20} color="#fff" />
            <Text style={styles.headerButtonText}>Cancel</Text>
          </TouchableOpacity>

          <Text style={styles.mapTitle}>Pick Location</Text>

          <TouchableOpacity
            style={styles.headerButton}
            onPress={handleConfirmLocation}
            disabled={!marker}>
            <Ionicons
              name="checkmark"
              size={20}
              color={!marker ? '#ffffff80' : '#fff'}
            />
            <Text
              style={[styles.headerButtonText, !marker && styles.disabledText]}>
              Confirm
            </Text>
          </TouchableOpacity>
        </View>

        {/* Map */}
        {region ? (
          <MapView
            style={styles.map}
            region={region}
            onPress={handleMapPress}
            provider={PROVIDER_GOOGLE}
            showsUserLocation={true}
            showsMyLocationButton={true}>
            <UrlTile
              urlTemplate="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              maximumZ={19}
              flipY={false}
            />

            {marker && (
              <Marker
                coordinate={marker}
                title="Selected Location"
                description={address || 'Fetching address...'}
              />
            )}
          </MapView>
        ) : (
          <View style={styles.mapLoadingContainer}>
            <ActivityIndicator size="large" color="#007AFF" />
            <Text style={styles.mapLoadingText}>Loading map...</Text>
          </View>
        )}

        {/* Address Footer */}
        <View style={styles.mapFooter}>
          <View style={styles.addressHeader}>
            <Text style={styles.mapAddressTitle}>Selected Location:</Text>
            {addressLoading && (
              <ActivityIndicator
                size="small"
                color="#007AFF"
                style={styles.addressLoader}
              />
            )}
          </View>
          <Text style={styles.mapAddressText} numberOfLines={3}>
            {/* {addressLoading
              ? 'Fetching address...'
              : address || 'Tap on map to select a location'} */}
            {address}
          </Text>
        </View>
      </View>
    );
  }

  // Main modal view
  return (
    <SafeAreaView style={[styles.container, {paddingTop: insets.top}]}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />

      <Header
        title="Set Your Location"
        showBack={true}
        onBackPress={onClose}
        modalHeader
        useSafeArea={true}
        backgroundColor={colors.white}
        color={colors.black}
      />

      {/* Search Bar / Address Display */}
      <View style={styles.searchBar}>
        <Ionicons name="location-outline" size={20} color="#666" />
        <View style={styles.input}>
          {address ? (
            <Text style={styles.selectedAddress} numberOfLines={2}>
              {address}
            </Text>
          ) : (
            <Text style={styles.placeholderText}>No location picked yet</Text>
          )}
        </View>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        <TouchableOpacity
          style={[styles.actionBtn, loading && styles.disabledBtn]}
          onPress={getCurrentLocation}
          disabled={loading}>
          {loading ? (
            <ActivityIndicator size={16} color="#000" />
          ) : (
            <Ionicons name="navigate-outline" size={16} color="#000" />
          )}
          <Text style={styles.actionText}>
            {loading ? 'Getting Location...' : 'Fetch Current location'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionBtn} onPress={openMapPicker}>
          <Ionicons name="map-outline" size={16} color="#000" />
          <Text style={styles.actionText}>Pick on Map</Text>
        </TouchableOpacity>
      </View>

      {/* Confirm Button - Show when location is selected */}
      {marker && address && !showMap && (
        <View style={styles.confirmContainer}>
          <TouchableOpacity
            style={styles.confirmBtn}
            onPress={handleConfirmLocation}>
            <Text style={styles.confirmBtnText}>Confirm Location</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  searchBar: {
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
    margin: 16,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignItems: 'center',
    minHeight: 48,
  },
  input: {
    flex: 1,
    marginLeft: 8,
    justifyContent: 'center',
  },
  placeholderText: {
    color: '#999',
    fontSize: 14,
  },
  selectedAddress: {
    color: '#000',
    fontSize: 14,
    lineHeight: 18,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 16,
    gap: 12,
  },
  actionBtn: {
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  disabledBtn: {
    opacity: 0.6,
  },
  actionText: {
    marginLeft: 6,
    fontWeight: '500',
    color: '#000',
    fontSize: 14,
  },
  confirmContainer: {
    padding: 16,
    marginTop: 20,
  },
  confirmBtn: {
    backgroundColor: colors.primary || '#007AFF',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
  },
  confirmBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },

  // Map styles
  mapContainer: {
    flex: 1,
  },
  mapHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#007AFF',
    paddingBottom: 15,
    paddingHorizontal: 15,
  },
  headerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  headerButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 4,
  },
  disabledText: {
    opacity: 0.5,
  },
  mapTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  map: {
    flex: 1,
  },
  mapLoadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
  mapLoadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#6c757d',
  },
  mapFooter: {
    backgroundColor: '#fff',
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: '#e9ecef',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: -2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  addressHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  addressLoader: {
    marginLeft: 8,
  },
  mapAddressTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#343a40',
  },
  mapAddressText: {
    fontSize: 14,
    color: '#495057',
    lineHeight: 18,
  },
});

export default SetLocationModal;
