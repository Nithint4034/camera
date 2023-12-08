// Tasks.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ToastAndroid } from 'react-native';
import { useLogin } from '../context/LoginProvider';
import Cam from './Cam';

const Tasks = () => {
  const { isLoggedIn, setIsLoggedIn } = useLogin();
  const [showTasks, setShowTasks] = useState(false);

  const handleCapturePress = () => {
    setShowTasks(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    showToast('Logout successful');
  };

  const showToast = (message) => {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  };

  return (
    <View style={styles.container}>
      {showTasks ? (
        <Cam />
      ) : (
        <View>
          <View>
            <Image
              source={require('../../assets/deduceLogo.jpg')}
              style={styles.logo}
              resizeMode="cover"
            />
          </View>
          <View>
            <Image
              source={require('../../assets/boy.png')}
              style={styles.image}
              resizeMode="cover"
            />
          </View>
          <TouchableOpacity onPress={handleCapturePress} style={styles.button}>
            <Text style={styles.buttonText}>Capture Photo</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleLogout} style={[styles.button, styles.logoutButton]}>
            <Text style={styles.buttonText}>Logout</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#1b1b33',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  logoutButton: {
    backgroundColor: '#ff5252',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  image: {
    marginBottom: 10,
    width: 255,
    height: 280,
    borderRadius: 5,
  },
  logo: {
    width: 285,
    height: 90,
    marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default Tasks;
