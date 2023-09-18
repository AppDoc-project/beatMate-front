import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '@screens/login/LoginScreen';
import SelectTypeScreen from '@screens/login/signup/SelectTypeScreen';
import { Auth } from 'context/AuthContext';
import React, { useState } from 'react';

const Stack = createNativeStackNavigator();

function AuthRoutes() {
  //의사 회원가입 API 전송
  const [doctorSignUpRequest, setDoctorSignUpRequest] = useState({
    email: '',
    name: '',
    password: '',
    contact: '',
    certificationAddress: '',
    address: '',
    merdicalSpeciality: '',
    selfDescription: '',
  });

  //환자 회원가입 API 전송
  const [patientSignUpRequest, setPatientSignUpRequest] = useState({
    email: '',
    name: '',
    password: '',
    contact: '',
  });

  return (
    <Auth.Provider
      value={{
        doctor: [doctorSignUpRequest, setDoctorSignUpRequest],
        patient: [patientSignUpRequest, setPatientSignUpRequest],
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
      </Stack.Navigator>
    </Auth.Provider>
  );
}

export default AuthRoutes;
