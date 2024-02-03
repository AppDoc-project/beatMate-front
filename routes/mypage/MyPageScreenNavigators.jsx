import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CommunityOnePostScreen from '@screens/community/CommunityOnePostScreen';
import LoginScreen from '@screens/login/LoginScreen';
import TuteeMyPageScreen from '@screens/mypage/TuteeMyPageScreen';
import TutorMyPageScreen from '@screens/mypage/TutorMyPageScreen';
import MyPageSetScreen from '@screens/mypageset/MyPageSetScreen';
import ChangeNicknameScreen from '@screens/mypageset/communityset/ChangeNicknameScreen';
import ChangeProfileScreen from '@screens/mypageset/communityset/ChangeProfileScreen';
import DeleteAccountScreen from '@screens/mypageset/etc/DeleteAccountScreen';
import ChangeIntroScreen from '@screens/mypageset/myinfoset/ChangeIntroScreen';
import ChangePasswordScreen from '@screens/mypageset/myinfoset/ChangePasswordScreen';
import ChangePhoneNumberScreen from '@screens/mypageset/myinfoset/ChangePhoneNumberScreen';
import { UserInfo } from 'context/UserInfoContext';
import React, { useContext } from 'react';

const Stack = createNativeStackNavigator();

function MyPageScreenNavigator(props) {
  //useContext로 HomeTabRoutes.jsx에 정의해둔 객체에서 loginUserInfo 받아옴 (loginUserInfo의 값들은 로그인시 자동 저장되어있을것)
  const {
    loginUserInfo: [loginUser],
  } = useContext(UserInfo);

  const isTutor = loginUser.isTutor;

  return (
    <Stack.Navigator
      initialRouteName="myPageScreen"
      screenOptions={{
        headerTintColor: 'black',
        headerTransparent: true,
        headerTitleStyle: {
          color: 'black',
        },
        headerBackTitleVisible: false,
      }}
    >
      {isTutor ? ( //isTutor가 True라면
        <Stack.Screen
          name={'myPageScreen'}
          component={TutorMyPageScreen}
          options={{
            headerShown: false,
          }}
        />
      ) : (
        //isTutor가 false라면
        <Stack.Screen
          name={'myPageScreen'}
          component={TuteeMyPageScreen}
          options={{
            headerShown: false,
          }}
        />
      )}

      <Stack.Screen
        name={'MyPageSetScreen'}
        component={MyPageSetScreen}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name={'ChangePasswordScreen'}
        component={ChangePasswordScreen}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name={'ChangePhoneNumberScreen'}
        component={ChangePhoneNumberScreen}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name={'ChangeIntroScreen'}
        component={ChangeIntroScreen}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name={'ChangeNicknameScreen'}
        component={ChangeNicknameScreen}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name={'ChangeProfileScreen'}
        component={ChangeProfileScreen}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name={'DeleteAccountScreen'}
        component={DeleteAccountScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

export default MyPageScreenNavigator;
