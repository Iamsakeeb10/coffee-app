import React, {useState} from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import {useSelector} from 'react-redux';
import LogoutButton from '../../components/Coffee/LogoutButton';
import ProfileImage from '../../components/Coffee/ProfileImage';
import {colors} from '../../constants/colors';
import {RootState} from '../../redux/store/store';
import styles from '../../styles/profileScreenStyles';

const ProfileScreen = () => {
  const [showSheet, setShowSheet] = useState(false);

  const {user} = useSelector((state: RootState) => state.auth);

  const menuItems = [
    {icon: 'log-out-outline', title: 'Log Out'},
    {icon: '', title: ''},
    {icon: '', title: ''},
    {icon: '', title: ''},
    {icon: '', title: ''},
  ];

  const toggleBottomSheet = () => {
    setShowSheet(prev => !prev);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.profileCard}>
        <ProfileImage photoURL={user?.photoURL} />
        <Text style={styles.name}>{user?.displayName}</Text>
        <Text style={styles.phone}>{user?.email}</Text>
      </View>
      <LogoutButton showSheet={showSheet} setShowSheet={setShowSheet} />

      <View style={styles.menuContainer}>
        <Text style={styles.accountText}>Account Overview</Text>
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => {
              if (item.title === 'Log Out') toggleBottomSheet();
            }}
            disabled={!item.icon}
            activeOpacity={0.5}
            style={[
              styles.menuItem,
              {
                borderBottomWidth: item.icon ? 1 : 0,
              },
            ]}>
            <View
              style={[
                styles.menuIconWrap,
                {backgroundColor: item.icon ? colors.menuIcon : 'transparent'},
              ]}>
              <Ionicons name={item.icon} size={20} color="#fff" />
            </View>
            <Text style={styles.menuText}>{item.title}</Text>
            <Ionicons
              name={item.icon ? 'chevron-forward' : ''}
              size={20}
              color={colors.skeletonBackground}
              style={{marginLeft: 'auto'}}
            />
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;
