import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '@screens/HomeScreen';
import React from 'react';

const Stack = createNativeStackNavigator();

function HomeScreenNavigator(props) {
  return (
    <Stack.Navigator initialRouteName="homeScreen">
      <Stack.Screen
        name={'homeScreen'}
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

export default HomeScreenNavigator;
