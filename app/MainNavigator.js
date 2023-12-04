import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useLogin } from './context/LoginProvider';
import UserProfile from './componenets/UserProfile';
import AppForm from './componenets/AppForm';
import Tasks from './componenets/Tasks';
import Cam from './componenets/Cam';

const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen component={AppForm} name='AppForm' />
      <Stack.Screen component={UserProfile} name='UserProfile' />
    </Stack.Navigator>
  );
};

const MainNavigator = () => {
  const { isLoggedIn } = useLogin();
  console.log(isLoggedIn);
  return !isLoggedIn ? <Cam/> : <StackNavigator />;
};

export default MainNavigator;