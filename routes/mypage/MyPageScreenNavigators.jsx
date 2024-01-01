import { createNativeStackNavigator } from '@react-navigation/native-stack';
import StudentMyPageScreen from '@screens/mypage/StudentMyPageScreen';
import React from 'react';

const Stack = createNativeStackNavigator();

function MyPageScreenNavigator(props) {
  return (
    <Stack.Navigator initialRouteName="myPageScreen">
      <Stack.Screen
        name={'myPageScreen'}
        component={StudentMyPageScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

export default MyPageScreenNavigator;
