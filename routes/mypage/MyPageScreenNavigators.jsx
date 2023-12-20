import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MyPageScreen from '@screens/mypage/MyPageScreen';
import React from 'react';

const Stack = createNativeStackNavigator();

function MyPageScreenNavigator(props) {
  return (
    <Stack.Navigator initialRouteName="myPageScreen">
      <Stack.Screen
        name={'myPageScreen'}
        component={MyPageScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

export default MyPageScreenNavigator;
