import { createNativeStackNavigator } from '@react-navigation/native-stack';
import GetAuthCode from '@screens/login/ChangePassword/GetAuthCode';
import GetAuthEmail from '@screens/login/ChangePassword/GetAuthEmail';
import GetChangedPassword from '@screens/login/ChangePassword/GetChangedPassword';
import LoginScreen from '@screens/login/LoginScreen';
import GetAuthCodeScreen from '@screens/signup/GetAuthCodeScreen';
import SelectTypeScreen from '@screens/signup/SelectTypeScreen';
import TuteeGetInfoScreen from '@screens/signup/tutee/TuteeGetInfoScreen';
import TutorGetInfoScreen1 from '@screens/signup/tutor/TutorGetInfoScreen1';
import TutorGetInfoScreen2 from '@screens/signup/tutor/TutorGetInfoScreen2';
import { Auth } from 'context/AuthContext';
import React, { useState } from 'react';

const Stack = createNativeStackNavigator();

function AuthRoutes() {
  //강사(tutor) 회원가입 API 전송 객체
  const [tutorSignUpRequest, setTutorSignUpRequest] = useState({
    email: '',
    name: '',
    password: '',
    contact: '',
    authenticationAddress: [],
    specialities: [],
    selfDescription: '',
  });

  //수강생(tutee) 회원가입 API 전송 객체
  const [tuteeSignUpRequest, setTuteeSignUpRequest] = useState({
    email: '',
    name: '',
    password: '',
    contact: '',
  });

  return (
    <Auth.Provider
      value={{
        tutor: [tutorSignUpRequest, setTutorSignUpRequest],
        tutee: [tuteeSignUpRequest, setTuteeSignUpRequest],
      }}
    >
      <Stack.Navigator initialRouteName="loginScreen">
        <Stack.Screen
          name={'loginScreen'}
          component={LoginScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={'selectTypeScreen'}
          component={SelectTypeScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={'tutorGetInfoScreen1'}
          component={TutorGetInfoScreen1}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={'tutorGetInfoScreen2'}
          component={TutorGetInfoScreen2}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={'tuteeGetInfoScreen'}
          component={TuteeGetInfoScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={'getAuthCodeScreen'}
          component={GetAuthCodeScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={'getAuthEmail'}
          component={GetAuthEmail}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={'getAuthCode'}
          component={GetAuthCode}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={'getChangedPassword'}
          component={GetChangedPassword}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </Auth.Provider>
  );
}

export default AuthRoutes;
