import Geolocation from '@react-native-community/geolocation';
import '@react-native-firebase/app';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  PermissionsAndroid,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE, UrlTile} from 'react-native-maps';
import {SafeAreaView} from 'react-native-safe-area-context';

const {width, height} = Dimensions.get('window');

const App = () => {
  const [region, setRegion] = useState(null);
  const [marker, setMarker] = useState(null);
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [locationPermission, setLocationPermission] = useState(false);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [addressLoading, setAddressLoading] = useState(false);
  const [fetchTimeoutId, setFetchTimeoutId] = useState(null);

  useEffect(() => {
    initializeApp();
  }, []);

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
      // For iOS, you would typically check permission status here
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

        // Set region for map
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
      // If no current location, get it first
      setLoading(true);
      getCurrentLocation();
    }
    setShowMap(true);
  };

  const fetchAddress = async (lat, lon) => {
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
    }
  };

  const handleMapPress = event => {
    const {latitude, longitude} = event.nativeEvent.coordinate;
    const newMarker = {latitude, longitude};
    setMarker(newMarker);
    fetchAddress(latitude, longitude);
  };

  const handleConfirmLocation = () => {
    setShowMap(false);
    Alert.alert('Location Confirmed', `Selected location: ${address}`, [
      {text: 'OK'},
    ]);
  };

  const handleCancelMapPicker = () => {
    // Clear any pending address fetch
    if (fetchTimeoutId) {
      clearTimeout(fetchTimeoutId);
      setFetchTimeoutId(null);
    }

    setShowMap(false);
    setAddressLoading(false);

    // Reset to current location if available
    if (currentLocation) {
      setMarker(currentLocation);
      fetchAddress(currentLocation.latitude, currentLocation.longitude);
    }
  };

  // Main screen with buttons
  if (!showMap) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#f8f9fa" />

        <View style={styles.header}>
          <Text style={styles.title}>Location Picker</Text>
          <Text style={styles.subtitle}>
            Choose how you want to select your location
          </Text>
        </View>

        <View style={styles.contentContainer}>
          {/* Current Location Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>📍 Current Location</Text>
            <Text style={styles.sectionDescription}>
              Get your current GPS location automatically
            </Text>

            <TouchableOpacity
              style={[styles.button, styles.primaryButton]}
              onPress={getCurrentLocation}
              disabled={loading}>
              {loading ? (
                <View style={styles.buttonContent}>
                  <ActivityIndicator
                    size="small"
                    color="#fff"
                    style={styles.buttonLoader}
                  />
                  <Text style={styles.primaryButtonText}>
                    Getting Location...
                  </Text>
                </View>
              ) : (
                <Text style={styles.primaryButtonText}>
                  📱 Fetch Current Location
                </Text>
              )}
            </TouchableOpacity>
          </View>

          {/* Manual Selection Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>🗺️ Manual Selection</Text>
            <Text style={styles.sectionDescription}>
              Open map to pick any location manually
            </Text>

            <TouchableOpacity
              style={[styles.button, styles.secondaryButton]}
              onPress={openMapPicker}>
              <Text style={styles.secondaryButtonText}>
                🎯 Pick Location on Map
              </Text>
            </TouchableOpacity>
          </View>

          {/* Address Display */}
          {address ? (
            <View style={styles.addressSection}>
              <Text style={styles.addressTitle}>Selected Address:</Text>
              <View style={styles.addressContainer}>
                <Text style={styles.addressText}>{address}</Text>
              </View>
            </View>
          ) : null}
        </View>
      </SafeAreaView>
    );
  }

  // Map screen
  return (
    <View style={styles.mapContainer}>
      <StatusBar barStyle="light-content" backgroundColor="#007AFF" />

      {/* Map Header */}
      <View style={styles.mapHeader}>
        <TouchableOpacity
          style={styles.headerButton}
          onPress={handleCancelMapPicker}>
          <Text style={styles.headerButtonText}>✕ Cancel</Text>
        </TouchableOpacity>

        <Text style={styles.mapTitle}>Pick Location</Text>

        <TouchableOpacity
          style={styles.headerButton}
          onPress={handleConfirmLocation}
          disabled={!marker}>
          <Text
            style={[styles.headerButtonText, !marker && styles.disabledText]}>
            ✓ Confirm
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
          {addressLoading
            ? 'Fetching address...'
            : address || 'Tap on map to select a location'}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    marginTop: 60,
  },
  header: {
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#343a40',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#6c757d',
    textAlign: 'center',
    marginTop: 5,
  },
  contentContainer: {
    flex: 1,
    padding: 20,
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#343a40',
    marginBottom: 8,
  },
  sectionDescription: {
    fontSize: 14,
    color: '#6c757d',
    marginBottom: 15,
    lineHeight: 20,
  },
  button: {
    borderRadius: 8,
    paddingVertical: 15,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 50,
  },
  primaryButton: {
    backgroundColor: '#007AFF',
  },
  secondaryButton: {
    backgroundColor: '#28a745',
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonLoader: {
    marginRight: 10,
  },
  addressSection: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  addressTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#343a40',
    marginBottom: 10,
  },
  addressContainer: {
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 15,
    borderLeftWidth: 4,
    borderLeftColor: '#007AFF',
  },
  addressText: {
    fontSize: 14,
    color: '#495057',
    lineHeight: 20,
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
    paddingTop: Platform.OS === 'ios' ? 50 : 60,
    paddingBottom: 15,
    paddingHorizontal: 15,
  },
  headerButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  headerButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
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

export default App;
