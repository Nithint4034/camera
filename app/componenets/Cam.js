import React, { useState, useEffect, useRef } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import * as Location from 'expo-location';
import * as FileSystem from 'expo-file-system';
import Toast from 'react-native-toast-message';

export default function Cam() {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [hasLocationPermission, setHasLocationPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      const { status: cameraStatus } = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus === 'granted');

      const { status: locationStatus } = await Location.requestForegroundPermissionsAsync();
      setHasLocationPermission(locationStatus === 'granted');
    })();
  }, []);

  const showToast = (type, text1, text2) => {
    Toast.show({
      type: type,
      text1: text1,
      text2: text2,
    });
  };

  const handleTakePicture = async () => {
    if (cameraRef.current && hasLocationPermission) {
      try {
        // Fetch current location
        const location = await Location.getCurrentPositionAsync({});
        console.log('Location:', location.coords.latitude, location.coords.longitude);
  
        // Take picture
        const { uri } = await cameraRef.current.takePictureAsync();
        console.log('Photo captured:', uri);
  
        // Convert image to base64
        const base64 = await convertToBase64(uri);
        // console.log('Base64 representation:', base64);
  
        // API endpoint
        const apiUrl = 'http://10.10.5.130:8795/add_location';
  
        // Prepare payload
        const payload = {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          image: base64,
        };
        // console.log('jgfjg', payload);
  
        // Send POST request to the API
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });

        // console.log(response);
  
        if (response.ok) {
          // Show success toast
          showToast('success', 'Photo Uploaded', `Location: ${location.coords.latitude}, ${location.coords.longitude}`);
        } else {
          // Show error toast
          showToast('error', 'Error Uploading Photo', 'Please try again');
        }
      } catch (error) {
        console.error('Error taking picture:', error);
        // Show error toast
        showToast('error', 'Error Taking Picture', 'Please try again');
      }
    }
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
    return <View />;
  }
  if (hasCameraPermission === false || hasLocationPermission === false) {
    return <Text>No access to camera or location</Text>;
  }

  return (
    <View style={{ flex: 1 }}>
      <Camera style={{ flex: 1 }} type={type} ref={cameraRef}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'transparent',
            flexDirection: 'row',
          }}>
          <TouchableOpacity
            style={{
              flex: 0.1,
              alignSelf: 'flex-end',
              alignItems: 'center',
            }}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}>
            {/* <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}> Flip </Text> */}
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              position: 'absolute',
              bottom: 16,
              right: 145, // Adjust the right position as needed
            }}
            onPress={handleTakePicture}>
            <View
              style={{
                width: 70,
                height: 70,
                backgroundColor: 'red',
                borderRadius: 35,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{ fontSize: 18, color: 'white' }}> Capture </Text>
            </View>
          </TouchableOpacity>
        </View>
      </Camera>
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </View>
  );
}
