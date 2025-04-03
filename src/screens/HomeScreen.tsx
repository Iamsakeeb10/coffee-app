import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import ButtonLocal from '../components/Common/ButtonLocal';
import {AppDispatch, RootState} from '../redux/store/store';
import {logoutUser} from '../redux/thunks/authThunks';

const HomeScreen = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {user, loading} = useSelector((state: RootState) => state.auth);

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.welcomeText}>
          {`Welcome, ${user?.displayName || 'User'}!`}
        </Text>
        <Text style={styles.emailText}>{`Email: ${user?.email || 'N/A'}`}</Text>
        <View style={styles.buttonContainer}>
          <ButtonLocal
            title="Log out"
            loading={loading}
            buttonStyle={{backgroundColor: '#e74c3c'}}
            onPressHandler={handleLogout}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f4f4f4',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 30,
    resizeMode: 'contain',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  emailText: {
    fontSize: 16,
    color: '#555',
    marginBottom: 20,
  },
  buttonContainer: {
    marginTop: 30,
  },
});

export default HomeScreen;
