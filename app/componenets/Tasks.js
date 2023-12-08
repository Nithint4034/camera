// Tasks.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
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
  };

  return (
    <View style={styles.container}>
      {showTasks ? (
        <Cam />
      ) : (
        <View>
          <View style={styles.imageContainerboy}>
            <Image
              source={require('../../assets/boy.png')} // Change the path to your actual image file
              style={styles.image}
              resizeMode="cover"
            />
          </View>
          {/* <Text>Your App Content Above the Button</Text> */}
          <TouchableOpacity onPress={handleCapturePress} style={styles.button}>
            <Text style={styles.buttonText}>Capture Photo</Text>
          </TouchableOpacity>
          {/* Additional content can be added here */}
          {/* <View style={styles.imageContainer}>
            <Image
              source={require('../path/pngegg.png')} // Change the path to your actual image file
              style={styles.image}
              resizeMode="cover"
            />
          </View> */}
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
    marginTop: 10, // Add spacing between text and button
  },
  logoutButton: {
    backgroundColor: '#ff5252', // Set the background color to red for the logout button
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  image: {
    marginBottom: 10,
    width: 255, // Adjust the width as needed
    height: 280, // Adjust the height as needed
    borderRadius: 5, // Optional: Add borderRadius for a rounded image
  },
});

export default Tasks;
