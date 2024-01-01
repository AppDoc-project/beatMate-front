import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TuteeMyPageScreen from '@screens/mypage/TuteeMyPageScreen';
import TutorMyPageScreen from '@screens/mypage/TutorMyPageScreen';
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
  const isTutor = loginUser?.isTutor || true; // 기본값으로 false 설정

  return (
    <Stack.Navigator initialRouteName="myPageScreen">
      {isTutor ? ( //isTutor가 True라면
        <Stack.Screen
          name={'TutorMyPageScreen'}
          component={TutorMyPageScreen}
          options={{
            headerShown: false,
          }}
        />
      ) : (
        //isTutor가 false라면
        <Stack.Screen
          name={'TuteeMyPageScreen'}
          component={TuteeMyPageScreen}
          options={{
            headerShown: false,
          }}
        />
      )}
    </Stack.Navigator>
  );
}

export default MyPageScreenNavigator;
