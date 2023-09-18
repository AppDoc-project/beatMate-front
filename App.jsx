import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { UserInfo } from 'context/UserInfoContext';
import { React, useState } from 'react';
import AuthRoutes from 'routes/AuthRoutes';
const Stack = createNativeStackNavigator();

export default function App() {
  const [userType, setUserType] = useState(''); //1이면 doctor, 2면 patient

  return (
    <UserInfo.Provider value={{ userType, setUserType }}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="auth">
          <Stack.Screen name="auth" component={AuthRoutes} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </UserInfo.Provider>
  );
}
