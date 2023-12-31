import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { UserInfo } from 'context/UserInfoContext';
import { React, useState } from 'react';
import AuthRoutes from 'routes/AuthRoutes';
import HomeTabRoutes from 'routes/HomeTabRoutes';

const Stack = createNativeStackNavigator();

export default function App() {
  const [userType, setUserType] = useState(''); //회원가입시 구분 위해. tutor, tutee

  // 나중에 initialRouteName 변경해야함.
  return (
    <UserInfo.Provider value={{ userType, setUserType }}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="auth">
          <Stack.Screen name="auth" component={AuthRoutes} options={{ headerShown: false }} />
          <Stack.Screen
            name={'home-tab'}
            component={HomeTabRoutes}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </UserInfo.Provider>
  );
}
