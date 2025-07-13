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
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  BackHandler,
  Dimensions,
  InteractionManager,
  Linking,
  Modal,
  PermissionsAndroid,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import MapView, {Marker, UrlTile} from 'react-native-maps';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {colors} from '../../constants/colors';
import {bangladeshRegion} from '../../utils/staticPortion';
import {fontFamily} from '../../utils/typography';
import Header from '../Common/Header';

const {width, height} = Dimensions.get('window');

type SetLocationModalProps = {
  onClose: () => void;
  onLocationSelected?: (
    location: {latitude: number; longitude: number},
    address: {displayName: string; details: any},
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
  const [address, setAddress] = useState<{
    displayName: string;
    details: any;
  } | null>(null);

  const [loading, setLoading] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [locationPermission, setLocationPermission] = useState(false);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [addressLoading, setAddressLoading] = useState(false);
  const [fetchTimeoutId, setFetchTimeoutId] = useState(null);
  const mapRef = useRef(null);

  useFocusEffect(
    useCallback(() => {
      StatusBar.setBarStyle('dark-content');
      StatusBar.setBackgroundColor('#fff');
    }, []),
  );

  useEffect(() => {
    const backAction = () => {
      // Your custom function
      Alert.alert('Hold on!', 'Are you sure you want to go back?', [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        {
          text: 'YES',
          onPress: () => {
            handleCancelMapPicker();
          },
        },
      ]);
      return true; // prevents default behavior (going back)
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove(); // Clean up the listener on unmount
  }, []);

  useEffect(() => {
    if (showMap && mapRef.current && currentLocation) {
      const newRegion = {
        latitude: currentLocation.latitude,
        longitude: currentLocation.longitude,
        latitudeDelta: 0.02,
        longitudeDelta: 0.02,
      };

      // Wait for all interactions and animations to finish
      const interaction = InteractionManager.runAfterInteractions(() => {
        setTimeout(() => {
          mapRef.current?.animateToRegion(newRegion, 1500); // smooth 1s animation
        }, 300); // Slight buffer to ensure map is ready
      });

      return () => interaction.cancel(); // Clean up if component unmounts early
    }
  }, [showMap, currentLocation]);

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
        const isGranted = granted === PermissionsAndroid.RESULTS.GRANTED;
        setLocationPermission(isGranted);
        return isGranted;
      } catch (err) {
        console.warn(err);
        setLocationPermission(false);
        return false;
      }
    } else {
      setLocationPermission(true);
      return true;
    }
  };

  const openAppSettings = () => {
    Linking.openSettings().catch(() => {
      console.warn('Unable to open app settings');
    });
  };

  const getCurrentLocation = async () => {
    const isLocationEnabled = await DeviceInfo.isLocationEnabled();

    if (!isLocationEnabled) {
      Alert.alert(
        'Enable Location Services',
        'Please turn on GPS/location services to continue.',
        [
          {text: 'Cancel', style: 'cancel'},
          {
            text: 'Open Settings',
            onPress: () =>
              Linking.sendIntent('android.settings.LOCATION_SOURCE_SETTINGS'),
          },
        ],
      );
      return;
    }

    const hasPermission = await checkLocationPermission();
    if (!hasPermission) {
      Alert.alert(
        'Permission Required',
        'Location permission is required to fetch your current location.',
        [
          {text: 'Cancel', style: 'cancel'},
          {text: 'Open Settings', onPress: () => openAppSettings()},
        ],
      );
      return;
    }

    setLoading(true);
    setAddress({
      displayName: '',
      details: {},
    });

    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        const location = {latitude, longitude};

        setCurrentLocation(location);
        setMarker(location);

        const newRegion = {
          latitude,
          longitude,
          latitudeDelta: 0.02,
          longitudeDelta: 0.02,
        };
        setRegion(newRegion);

        if (mapRef.current) {
          mapRef.current.animateToRegion(newRegion, 2000);
        }

        fetchAddress(latitude, longitude); // ✅ Don't handle loading here
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

  const openMapPicker = async () => {
    const isLocationEnabled = await DeviceInfo.isLocationEnabled();

    if (!isLocationEnabled) {
      Alert.alert(
        'Enable Location Services',
        'Please turn on GPS/location services to continue.',
        [
          {text: 'Cancel', style: 'cancel'},
          {
            text: 'Open Settings',
            onPress: () =>
              Linking.sendIntent('android.settings.LOCATION_SOURCE_SETTINGS'),
          },
        ],
      );
      return;
    }

    const hasPermission = await checkLocationPermission();
    if (!hasPermission) {
      Alert.alert(
        'Permission Required',
        'Location permission is required to pick a location on map.',
        [
          {text: 'Cancel', style: 'cancel'},
          {text: 'Open Settings', onPress: () => openAppSettings()},
        ],
      );
      return;
    }

    if (!currentLocation) {
      // setLoading(true);
      setAddressLoading(true);
      await getCurrentLocation(); // fetch location first if not set
    }

    setShowMap(true);
  };

  const fetchAddress = async (lat, lon) => {
    console.log('This =>>');
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
      console.log('Address Data =>>', data);

      if (data && data.display_name) {
        setAddress({
          displayName: data.display_name,
          details: data.address,
        });
      }
    } catch (error) {
      console.error('Address fetch error:', error);
    } finally {
      setAddressLoading(false);
      setLoading(false); // ✅ This ensures loading ends **after** address is fetched
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
      <Modal
        visible={showMap}
        animationType="slide"
        presentationStyle="fullScreen"
        transparent={false}
        onRequestClose={handleCancelMapPicker} // handles hardware back button on Android
        statusBarTranslucent={true}>
        <View style={styles.mapContainer}>
          <StatusBar barStyle="dark-content" backgroundColor="#007AFF" />

          {/* Floating Back Button */}
          <TouchableOpacity
            onPress={handleCancelMapPicker}
            style={{
              position: 'absolute',
              top: insets.top + 10,
              left: 20,
              backgroundColor: colors.white,
              padding: 10,
              borderRadius: 24,
              zIndex: 999,
            }}>
            <Ionicons name="chevron-back" size={24} color={colors.background} />
          </TouchableOpacity>

          {/* Map */}
          <MapView
            ref={mapRef}
            style={styles.map}
            region={bangladeshRegion}
            onPress={handleMapPress}
            // provider={PROVIDER_GOOGLE}
            showsUserLocation={true}
            // loadingEnabled
            // loadingBackgroundColor={colors.white}
            // loadingIndicatorColor={colors.badge}
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
                description={address?.displayName || 'Fetching address...'}
              />
            )}
          </MapView>

          {/* Footer Section */}
          <View style={styles.mapFooter}>
            <View style={styles.addressHeader}>
              <Text style={styles.mapAddressTitle}>
                Help to find you quickly!
              </Text>
              <Text style={styles.mapAddressSubTitle}>
                Choose a spot where the rider can easily find you.
              </Text>
            </View>

            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                borderWidth: 1,
                borderColor: colors.lightGray,
                paddingHorizontal: 16,
                height: 60,
                borderRadius: 12,
                backgroundColor: colors.white,
              }}>
              {addressLoading ? (
                <ActivityIndicator size="small" color={colors.deepRed} />
              ) : (
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Ionicons
                    name="man-outline"
                    size={16}
                    color="#000"
                    style={{marginRight: 6}}
                  />
                  <Text style={styles.mapAddressText} numberOfLines={3}>
                    {address?.displayName}
                  </Text>
                </View>
              )}
            </View>

            <TouchableOpacity
              onPress={handleConfirmLocation}
              style={{
                marginVertical: 16,
                backgroundColor: colors.deepRed,
                paddingVertical: 14,
                borderRadius: 30,
                alignItems: 'center',
              }}>
              <Text
                style={{
                  color: '#fff',
                  fontSize: 16,
                  fontFamily: fontFamily.medium,
                }}>
                Confirm Pickup Point
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
        useSafeArea={false}
        backgroundColor={colors.white}
        color={colors.black}
        hideElevation
      />

      {/* Search Bar / Address Display */}
      <View style={styles.searchBar}>
        <Ionicons name="location-outline" size={20} color="#666" />
        <View style={styles.input}>
          {loading ? (
            <ActivityIndicator size="small" color="#666" />
          ) : address?.displayName ? (
            <Text style={styles.selectedAddress} numberOfLines={2}>
              {address.displayName}
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
    color: colors.cardBackground,
    fontSize: 14,
    fontFamily: fontFamily.medium,
    lineHeight: 18,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  actionBtn: {
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  disabledBtn: {
    opacity: 0.6,
  },
  actionText: {
    marginLeft: 6,
    fontFamily: fontFamily.medium,
    fontSize: 14,
  },
  confirmContainer: {
    padding: 16,
    marginTop: 20,
  },
  confirmBtn: {
    backgroundColor: colors.deepRed,
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
  },
  confirmBtnText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: fontFamily.medium,
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
    // flexDirection: 'row',
    justifyContent: 'flex-start',
    // alignItems: 'center',
    marginBottom: 12,
  },
  addressLoader: {
    marginLeft: 8,
  },
  mapAddressTitle: {
    fontSize: 16,
    fontFamily: fontFamily.bold,
    color: colors.background,
  },

  mapAddressSubTitle: {
    fontSize: 12,
    fontWeight: 300,
    color: colors.arrowLightBlackShadow,
    marginTop: 4,
  },
  mapAddressText: {
    fontSize: 14,
    color: colors.cardBackground,
    lineHeight: 18,
    fontFamily: fontFamily.medium,
  },
});

export default SetLocationModal;
