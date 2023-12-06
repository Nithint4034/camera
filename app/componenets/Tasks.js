// Tasks.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
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
        <Text>Your App Content Above the Button</Text>
        <TouchableOpacity onPress={handleCapturePress} style={styles.button}>
          <Text style={styles.buttonText}>Capture Photo</Text>
        </TouchableOpacity>
        {/* Additional content can be added here */}
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
    marginTop: 20, // Add spacing between text and button
  },
  logoutButton: {
    backgroundColor: '#ff5252', // Set the background color to red for the logout button
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default Tasks;
