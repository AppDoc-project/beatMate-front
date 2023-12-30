import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '@screens/login/LoginScreen';
import SelectTypeScreen from '@screens/signup/SelectTypeScreen';
import DoctorGetInfoScreen from '@screens/signup/tutor/DoctorGetInfoScreen';
import HospitalGetInfoScreen from '@screens/signup/tutor/HospitalGetInfoScreen';
import HospitalGetInfoScreen2 from '@screens/signup/tutor/HospitalGetInfoScreen2';
import GetAuthCodeScreen from '@screens/signup/tutee/GetAuthCodeScreen';
import TuteeGetInfoScreen from '@screens/signup/tutee/TuteeGetInfoScreen';
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
    authenticationAddress: [''],
    specialities: [''],
    selfDescription: '',
  });

  //수강생(tutee) 회원가입 API 전송 객체
  const [tuteeSignUpRequest, setTuteeSignUpRequest] = useState({
    email: '',
    name: '',
    password: '',
    contact: '',
  });

  //현재 접속자 정보 객체
  const [loginUser, setLoginUser] = useState({
    id: null,
    email: '',
    name: '',
    isTutor: false,
  });

  return (
    <Auth.Provider
      value={{
        tutor: [tutorSignUpRequest, setTutorSignUpRequest],
        tutee: [tuteeSignUpRequest, setTuteeSignUpRequest],
        loginUserInfo: [loginUser, setLoginUser],
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
          name={'doctorGetInfoScreen'}
          component={DoctorGetInfoScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={'hospitalGetInfoScreen'}
          component={HospitalGetInfoScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={'hospitalGetInfoScreen2'}
          component={HospitalGetInfoScreen2}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={'TuteeGetInfoScreen'}
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
      </Stack.Navigator>
    </Auth.Provider>
  );
}

export default AuthRoutes;
