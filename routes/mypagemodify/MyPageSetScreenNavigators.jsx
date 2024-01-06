import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TuteeMyPageSetScreen from '@screens/mypageset/TuteeMyPageSetScreen';
import TutorMyPageSetScreen from '@screens/mypageset/TutorMyPageSetScreen';
import { Auth } from 'context/AuthContext';
import React, { useContext } from 'react';

const Stack = createNativeStackNavigator();

function MyPageSetScreenNavigators(props) {
  const {
    loginUserInfo: [loginUser],
  } = useContext(Auth);

  const isTutor = loginUser?.isTutor || false;

  return (
    <Stack.Navigator initialRouteName="myPageSetScreen">
      {isTutor ? ( //isTutor가 True라면
        <Stack.Screen
          name={'TutorMyPageSetScreen'}
          component={TutorMyPageSetScreen}
          options={{
            headerShown: false,
          }}
        />
      ) : (
        //isTutor가 false라면
        <Stack.Screen
          name={'TuteeMyPageSetScreen'}
          component={TuteeMyPageSetScreen}
          options={{
            headerShown: false,
          }}
        />
      )}
    </Stack.Navigator>
  );
}

export default MyPageSetScreenNavigators;
