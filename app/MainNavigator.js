import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useLogin } from './context/LoginProvider';
import AppForm from './componenets/AppForm';
import Tasks from './componenets/Tasks';

const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen component={AppForm} name='AppForm' />
    </Stack.Navigator>
  );
};

const MainNavigator = () => {
  const { isLoggedIn } = useLogin();
  console.log(isLoggedIn);
  return isLoggedIn ? <Tasks/> : <StackNavigator />;
};

export default MainNavigator;