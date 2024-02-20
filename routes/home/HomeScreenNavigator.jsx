import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '@screens/HomeScreen';
import ChatListScreen from '@screens/chat/ChatListScreen';
import CommunityScreen from '@screens/community/CommunityScreen';
import LessonMainScreen from '@screens/lesson/LessonMainScreen';
import TuteeMyPageScreen from '@screens/mypage/TuteeMyPageScreen';
import TutorMyPageScreen from '@screens/mypage/TutorMyPageScreen';
import ReserveMainScreen from '@screens/reservation/ReserveMainScreen';
import TutorCommunityListScreen from '@screens/searchtutor/TutorCommunityListScreen';
import { UserInfo } from 'context/UserInfoContext';
import React, { useContext } from 'react';

const Stack = createNativeStackNavigator();

function HomeScreenNavigator(props) {
  const {
    loginUserInfo: [loginUser],
  } = useContext(UserInfo);

  const isTutor = loginUser.isTutor;
  return (
    <Stack.Navigator initialRouteName="homeScreen">
      <Stack.Screen
        name={'homeScreen'}
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={'chat-list'}
        component={ChatListScreen}
        options={{
          headerShown: true,
          headerTitle: '채팅방 리스트',
        }}
      />
      <Stack.Screen
        name={'communityScreen'}
        component={CommunityScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={'lessonMainScreen'}
        component={LessonMainScreen}
        options={{
          headerShown: false,
        }}
      />
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
        name={'reserveMainScreen'}
        component={ReserveMainScreen}
        options={{
          headerShown: true,
          headerTitle: '레슨 예약 현황',
        }}
      />
      <Stack.Screen
        name={'tutorCommunityListScreen'}
        component={TutorCommunityListScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

export default HomeScreenNavigator;
