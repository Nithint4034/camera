import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import LoginProvider from './app/context/LoginProvider';
import MainNavigator from './app/MainNavigator';
import { LogBox } from 'react-native';

const LandingPage = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require('./assets/deduceLogo.jpg')}
        style={styles.logo}
        resizeMode='cover'
      />
      <Text style={styles.welcomeText}>Welcome To Deduce Technoligies</Text>
    </View>
  );
};

const App = () => {
  const [showLandingPage, setShowLandingPage] = useState(true);
  LogBox.ignoreAllLogs();
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLandingPage(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <LoginProvider>
      <NavigationContainer>
        {showLandingPage ? (
          <LandingPage />
        ) : (
          <MainNavigator />
        )}
      </NavigationContainer>
    </LoginProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#eeeeee',
  },
  logo: {
    width: 330, // Adjust the width as needed
    height: 100, // Adjust the height as needed
    marginBottom: 15, // Adjust the margin as needed
    alignItems: 'center',
    justifyContent: 'center'
  },
  welcomeText: {
    fontSize: 30, // Change this to the desired font size
    color: 'Blue', // Change this to the desired text color
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default App;


