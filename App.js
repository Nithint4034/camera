// import React, { useState, useEffect, useRef } from 'react';
// import { Text, View, TouchableOpacity } from 'react-native';
// import { Camera } from 'expo-camera';
// import * as FileSystem from 'expo-file-system';

// export default function App() {
//   const [hasPermission, setHasPermission] = useState(null);
//   const [type, setType] = useState(Camera.Constants.Type.back);
//   const cameraRef = useRef(null);

//   useEffect(() => {
//     (async () => {
//       const { status } = await Camera.requestCameraPermissionsAsync();
//       setHasPermission(status === 'granted');
//     })();
//   }, []);

//   const handleTakePicture = async () => {
//     if (cameraRef.current) {
//       try {
//         const { uri } = await cameraRef.current.takePictureAsync();
//         console.log('Photo captured:', uri);

//         // Convert image to base64
//         const base64 = await convertToBase64(uri);
//         console.log('Base64 representation:', base64);

//         // You can handle the captured photo URI and base64 string as needed
//       } catch (error) {
//         console.error('Error taking picture:', error);
//       }
//     }
//   };

//   const convertToBase64 = async (uri) => {
//     try {
//       const base64 = await FileSystem.readAsStringAsync(uri, {
//         encoding: FileSystem.EncodingType.Base64,
//       });
//       return base64;
//     } catch (error) {
//       console.error('Error converting to base64:', error);
//     }
//   };

//   if (hasPermission === null) {
//     return <View />;
//   }
//   if (hasPermission === false) {
//     return <Text>No access to camera</Text>;
//   }

//   return (
//     <View style={{ flex: 1 }}>
//       <Camera style={{ flex: 1 }} type={type} ref={cameraRef}>
//         <View
//           style={{
//             flex: 1,
//             backgroundColor: 'transparent',
//             flexDirection: 'row',
//           }}>
//           <TouchableOpacity
//             style={{
//               flex: 0.1,
//               alignSelf: 'flex-end',
//               alignItems: 'center',
//             }}
//             onPress={() => {
//               setType(
//                 type === Camera.Constants.Type.back
//                   ? Camera.Constants.Type.front
//                   : Camera.Constants.Type.back
//               );
//             }}>
//             <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}> Flip </Text>
//           </TouchableOpacity>
//           <TouchableOpacity
//             style={{
//               flex: 0.1,
//               alignSelf: 'flex-end',
//               alignItems: 'center',
//             }}
//             onPress={handleTakePicture}>
//             <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}> Capture </Text>
//           </TouchableOpacity>
//         </View>
//       </Camera>
//     </View>
//   );
// }

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import LoginProvider from './app/context/LoginProvider';
import MainNavigator from './app/MainNavigator';
// import DrawerNavigator from './app/DrawerNaviagtor';

export default function App() {
  return (
    <LoginProvider>
      <NavigationContainer>
        <MainNavigator />
      </NavigationContainer>
    </LoginProvider>
  );
}

