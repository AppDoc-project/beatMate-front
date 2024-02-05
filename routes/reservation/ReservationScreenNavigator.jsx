import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ReservationFormScreen from '@screens/reservation/ReservationFormScreen';
import React from 'react';

const Stack = createNativeStackNavigator();

function ReservationScreenNavigator(props) {
  return (
    <Stack.Navigator initialRouteName="reservationFormScreen">
      <Stack.Screen
        name={'reservationFormScreen'}
        component={ReservationFormScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

export default ReservationScreenNavigator;
