import React, { useState, useEffect, useRef } from 'react';
import { Text, View, TouchableOpacity, Button, StyleSheet } from 'react-native';
import { Camera } from 'expo-camera';
import * as Location from 'expo-location';
import * as FileSystem from 'expo-file-system';
import Toast from 'react-native-toast-message';
import Tasks from './Tasks';

export default function Cam() {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [hasLocationPermission, setHasLocationPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const cameraRef = useRef(null);
  const [showTasks, setShowTasks] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [count, setCount] = useState(3);
  const [isVisible, setIsVisible] = useState(false); // Set to false initially

  useEffect(() => {
    const getPermissions = async () => {
      const { status: cameraStatus } = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus === 'granted');
      const { status: locationStatus } = await Location.requestForegroundPermissionsAsync();
      setHasLocationPermission(locationStatus === 'granted');
    };
    getPermissions();
  }, []);

// ...

useEffect(() => {
  // Start the interval when isVisible is true
  const intervalId = isVisible ? setInterval(() => {
    setCount((prevCount) => (prevCount > 0 ? prevCount - 1 : 0)); // Change condition to stop at 0
  }, 1000) : null;

  if (count === 0) {
    clearInterval(intervalId);
    setIsVisible(false);
  }

  return () => clearInterval(intervalId);
}, [isVisible, count]);

// ...

  

  const showToast = (type, text1, text2) => {
    Toast.show({
      type,
      text1,
      text2,
      position: 'top',
      visibilityTime: 4000,
      autoHide: true,
      topOffset: 50,
      bottomOffset: 40,
      textStyle: { fontSize: 100, fontWeight: 'bold', color: 'white' },
      backgroundColor: type === 'error' ? 'green' : 'red',
    });
  };

  const handleTakePicture = async () => {
    if (cameraRef.current && hasLocationPermission) {
      try {
        const location = await Location.getCurrentPositionAsync({});
        setIsVisible(true); // Set isVisible to true when the capture button is pressed
        console.log('Location:', location.coords.latitude, location.coords.longitude);

        const { uri } = await cameraRef.current.takePictureAsync();
        console.log('Photo captured:', uri);

        const base64 = await convertToBase64(uri);

        const apiUrl = 'https://deducetravelshoot.deducetech.com/add_location';   //AWS Hosted

        const payload = {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          image: base64,
        };

        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });

        if (response.ok) {
          setIsPressed(true);
          setTimeout(() => {
            showToast('success', 'Photo Uploaded', `Location: ${location.coords.latitude}, ${location.coords.longitude}`);
          }, 1000);
          setTimeout(() => {
            setShowTasks(true);
          }, 2000);
        } else {
          showToast('error', 'Error Uploading Photo', 'Please try again');
        }
      } catch (error) {
        console.error('Error taking picture:', error);
        showToast('error', 'Error Taking Picture', 'Please try again');
      }
    }
  };

  const handleBackPress = () => {
    setShowTasks(true);
  };

  const convertToBase64 = async (uri) => {
    try {
      const base64 = await FileSystem.readAsStringAsync(uri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      return base64;
    } catch (error) {
      console.error('Error converting to base64:', error);
      throw error;
    }
  };

  if (hasCameraPermission === null || hasLocationPermission === null) {
    return null;
  }

  if (hasCameraPermission === false || hasLocationPermission === false) {
    return <Text>No access to camera or location</Text>;
  }

  return (
    <View style={{ flex: 1 }}>
      {showTasks ? (
        <Tasks />
      ) : (
        <Camera style={{ flex: 1 }} type={type} ref={cameraRef}>
          <View style={{ margin: 170 }}>
            <Button title="" color="rgba(0, 0, 0, 0)" />
          </View>
          <View style={isVisible ? styles.container : { display: 'none' }}>
            <Text style={styles.counterText}>{count}</Text>
          </View>
          <TouchableOpacity
            style={{
              position: 'absolute',
              bottom: 16,
              right: 135,
            }}
            onPress={handleTakePicture}
          >
            <View
              style={{
                width: 80,
                height: 80,
                backgroundColor: isPressed ? 'green' : 'rgba(255, 0, 0, 0.5)',
                borderRadius: 40,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text style={{ fontSize: 18, color: 'white' }}> Capture </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              position: 'absolute',
              bottom: 35,
              right: 20,
            }}
            onPress={handleBackPress}>
            <View
              style={{
                width: 80,
                height: 40,
                backgroundColor: 'rgba(0, 0, 0, 0.2)',
                borderRadius: 35,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{ fontSize: 18, color: 'white' }}>Go Back</Text>
            </View>
          </TouchableOpacity>

          {isPressed ?
            <TouchableOpacity
              style={{
                position: 'absolute',
                top: 220,
                right: 85,
              }}
              onPress={handleBackPress}>
              <View
                style={{
                  width: 180,
                  height: 40,
                  backgroundColor: 'green',
                  borderRadius: 35,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={{ fontSize: 28, color: 'white' }}>Successful..!</Text>
              </View>
            </TouchableOpacity>
            : ''}
        </Camera>
      )}
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  counterText: {
    fontSize: 70,
    opacity: 0.5,
  },
});
