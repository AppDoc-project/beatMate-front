import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '@screens/login/LoginScreen';
import TuteeMyPageScreen from '@screens/mypage/TuteeMyPageScreen';
import TutorMyPageScreen from '@screens/mypage/TutorMyPageScreen';
import ChangeNicknameScreen from '@screens/mypageset/communityset/ChangeNicknameScreen';
import DeleteAccountScreen from '@screens/mypageset/etc/DeleteAccountScreen';
import PushAlarmSetScreen from '@screens/mypageset/etc/PushAlarmSetScreen';
import ChangeFieldScreen from '@screens/mypageset/lessoninfo/ChangeFieldScreen';
import ChangeLessonInfoScreen from '@screens/mypageset/lessoninfo/ChangeLessonInfoScreen';
import ChangeIntroScreen from '@screens/mypageset/myinfoset/ChangeIntroScreen';
import ChangePasswordScreen from '@screens/mypageset/myinfoset/ChangePasswordScreen';
import ChangePhoneNumberScreen from '@screens/mypageset/myinfoset/ChangePhoneNumberScreen';
import TuteeMyPageSetScreen from '@screens/mypageset/TuteeMyPageSetScreen';
import TutorMyPageSetScreen from '@screens/mypageset/TutorMyPageSetScreen';
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

      <Stack.Screen // tutor 목록
        name={'TutorMyPageSetScreen'}
        component={TutorMyPageSetScreen}
        options={{ title: '설정' }}
      />

      <Stack.Screen // tutee 목록
        name={'TuteeMyPageSetScreen'}
        component={TuteeMyPageSetScreen}
        options={{ title: '설정' }}
      />

      <Stack.Screen
        name={'ChangePasswordScreen'}
        component={ChangePasswordScreen}
        options={{ title: '비밀번호 변경' }}
      />

      <Stack.Screen
        name={'ChangePhoneNumberScreen'}
        component={ChangePhoneNumberScreen}
        options={{ title: '연락처 변경' }}
      />

      <Stack.Screen name={'ChangeIntroScreen'} component={ChangeIntroScreen} options={{ title: '자기소개 변경' }} />

      <Stack.Screen
        name={'ChangeLessonInfoScreen'}
        component={ChangeLessonInfoScreen}
        options={{ title: '레슨 정보 변경' }}
      />

      <Stack.Screen name={'ChangeFieldScreen'} component={ChangeFieldScreen} options={{ title: '분야 변경' }} />

      <Stack.Screen name={'ChangeNicknameScreen'} component={ChangeNicknameScreen} options={{ title: '닉네임 변경' }} />

      <Stack.Screen
        name={'PushAlarmSetScreen'}
        component={PushAlarmSetScreen}
        options={{ title: '푸쉬 알람 여부 설정' }}
      />

      <Stack.Screen
        name={'LoginScreen'}
        component={LoginScreen}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen name={'DeleteAccountScreen'} component={DeleteAccountScreen} options={{ title: '회원탈퇴' }} />
    </Stack.Navigator>
  );
}

export default MyPageScreenNavigator;
