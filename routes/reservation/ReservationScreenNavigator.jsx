import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ReserveMainScreen from '@screens/reservation/ReserveMainScreen';
import ReserveSpecificScreen from '@screens/reservation/ReserveSpecificScreen';
import React from 'react';

const Stack = createNativeStackNavigator();

function ReservationScreenNavigator(props) {
  return (
    <Stack.Navigator initialRouteName="reserveMainScreen">
      <Stack.Screen
        name={'reserveMainScreen'}
        component={ReserveMainScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={'reserveSpecificScreen'}
        component={ReserveSpecificScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

export default ReservationScreenNavigator;
