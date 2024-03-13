import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { UserInfo } from 'context/UserInfoContext';
import { React, useState } from 'react';
import AuthRoutes from 'routes/AuthRoutes';
import HomeTabRoutes from 'routes/HomeTabRoutes';

const Stack = createNativeStackNavigator();

export default function App() {
  const [userType, setUserType] = useState(''); //회원가입시 구분 위해. tutor, tutee

  //현재 접속자 정보 객체
  const [loginUser, setLoginUser] = useState({
    id: 0,
    email: '',
    name: '',
    isTutor: true,
  });

  return (
    <UserInfo.Provider value={{ userType, setUserType, loginUserInfo: [loginUser, setLoginUser] }}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="auth"
          screenOptions={{
            gestureEnabled: false,
          }}
        >
          <Stack.Screen name="auth" component={AuthRoutes} options={{ headerShown: false }} />
          {loginUser && (
            <Stack.Screen
              name={'home-tab'}
              component={HomeTabRoutes}
              options={{
                headerShown: false,
              }}
            />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </UserInfo.Provider>
  );
}
