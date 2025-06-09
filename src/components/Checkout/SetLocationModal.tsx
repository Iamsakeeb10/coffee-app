import React from 'react';

import Ionicons from 'react-native-vector-icons/Ionicons';

import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {colors} from '../../constants/colors';
import Header from '../Common/Header';

const SetLocationModal = () => {
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          paddingTop: insets.top,
        },
      ]}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <Header
        title="Set Your Location"
        showBack={true}
        // onBackPress={headerBackPress}
        modalHeader
        useSafeArea={true}
        backgroundColor={colors.white}
        color={colors.black}
      />

      {/* Search Bar */}
      <View style={styles.searchBar}>
        <Ionicons name="location-outline" size={20} color="#666" />
        <View style={styles.input}>
          <Text>No location picked yet</Text>
        </View>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.actionBtn}>
          <Ionicons name="navigate-outline" size={16} color="#000" />
          <Text style={styles.actionText}>Fetch Current location</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionBtn}>
          <Ionicons name="map-outline" size={16} color="#000" />
          <Text style={styles.actionText}>Pick on Map</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fff'},
  header: {
    paddingHorizontal: 16,
    // paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {fontSize: 18, fontWeight: 'bold', color: '#000'},
  searchBar: {
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
    margin: 16,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    marginLeft: 8,
    color: '#000',
    height: 40,
    justifyContent: 'center',
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
  actionText: {
    marginLeft: 6,
    fontWeight: '500',
    color: '#000',
  },
  addressList: {
    paddingHorizontal: 16,
    marginTop: 10,
  },
  addressItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  addressTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  addressSub: {
    fontSize: 13,
    color: '#888',
    marginTop: 2,
  },
});

export default SetLocationModal;
