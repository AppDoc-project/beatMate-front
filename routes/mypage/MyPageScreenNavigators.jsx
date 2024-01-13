import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TuteeMyPageScreen from '@screens/mypage/TuteeMyPageScreen';
import TutorMyPageScreen from '@screens/mypage/TutorMyPageScreen';
import ChangeNicknameScreen from '@screens/mypageset/communityset/ChangeNicknameScreen';
import ChangeProfileImageScreen from '@screens/mypageset/communityset/ChangeProfileImageScreen';
import DeleteAccountScreen from '@screens/mypageset/etc/DeleteAccountScreen';
import LogoutScreen from '@screens/mypageset/etc/LogoutScreen';
import PushAlarmSetScreen from '@screens/mypageset/etc/PushAlarmSetScreen';
import ChangeFieldScreen from '@screens/mypageset/lessoninfo/ChangeFieldScreen';
import ChangeLessonInfoScreen from '@screens/mypageset/lessoninfo/ChangeLessonInfoScreen';
import ChangeIntroScreen from '@screens/mypageset/myinfoset/ChangeIntroScreen';
import ChangePasswordScreen from '@screens/mypageset/myinfoset/ChangePasswordScreen';
import ChangePhoneNumberScreen from '@screens/mypageset/myinfoset/ChangePhoneNumberScreen';
import TuteeMyPageSetScreen from '@screens/mypageset/TuteeMyPageSetScreen';
import TutorMyPageSetScreen from '@screens/mypageset/TutorMyPageSetScreen';
import { Auth } from 'context/AuthContext';
import React, { useContext } from 'react';

const Stack = createNativeStackNavigator();

function MyPageScreenNavigator(props) {
  //useContext로 HomeTabRoutes.jsx에 정의해둔 객체에서 loginUserInfo 받아옴 (loginUserInfo의 값들은 로그인시 자동 저장되어있을것)
  const {
    loginUserInfo: [loginUser],
  } = useContext(Auth);

  // loginUserInfo에서 isTutor 값을 가져오기

  /*
    우선은 로그인 부분 merge 되기전까지 이렇게 진행하시고, 
    강사부분 보고 싶으면 true, 수강생 보고싶으면 false로만 바꿔주고 재실행 시켜주면됩니다.
  */
  const isTutor = loginUser?.isTutor || false; // 기본값으로 false 설정

  return (
    <Stack.Navigator initialRouteName="myPageScreen">
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
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen // tutee 목록
        name={'TuteeMyPageSetScreen'}
        component={TuteeMyPageSetScreen}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen name={'ChangePasswordScreen'} component={ChangePasswordScreen} />

      <Stack.Screen name={'ChangePhoneNumberScreen'} component={ChangePhoneNumberScreen} />

      <Stack.Screen name={'ChangeIntroScreen'} component={ChangeIntroScreen} /> 

      <Stack.Screen name={'ChangeLessonInfoScreen'} component={ChangeLessonInfoScreen} />

      <Stack.Screen name={'ChangeFieldScreen'} component={ChangeFieldScreen} />

      <Stack.Screen name={'ChangeNicknameScreen'} component={ChangeNicknameScreen} />

      <Stack.Screen name={'ChangeProfileImageScreen'} component={ChangeProfileImageScreen} />

      <Stack.Screen name={'PushAlarmSetScreen'} component={PushAlarmSetScreen} />

      <Stack.Screen name={'LogoutScreen'} component={LogoutScreen} />

      <Stack.Screen name={'DeleteAccountScreen'} component={DeleteAccountScreen} />
    </Stack.Navigator>
  );
}

export default MyPageScreenNavigator;
