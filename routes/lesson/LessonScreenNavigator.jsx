import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LessonMainScreen from '@screens/lesson/LessonMainScreen';
import LessonScheduleScreen from '@screens/lesson/LessonScheduleScreen';
import TuteeFeedbackScreen from '@screens/lesson/TuteeFeedbackScreen';
import TutorFeedbackScreen from '@screens/lesson/TutorFeedbackScreen';
import VideoScreen from '@screens/lesson/VideoScreen';
import { UserInfo } from 'context/UserInfoContext';
import React, { useContext } from 'react';

const Stack = createNativeStackNavigator();

function LessonScreenNavigator(props) {
  const {
    loginUserInfo: [loginUser],
  } = useContext(UserInfo);

  const isTutor = loginUser.isTutor;

  return (
    <Stack.Navigator initialRouteName="lessonMainScreen">
      <Stack.Screen
        name={'lessonMainScreen'}
        component={LessonMainScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={'lessonScheduleScreen'}
        component={LessonScheduleScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={'videoScreen'}
        component={VideoScreen}
        options={{
          headerShown: false,
        }}
      />
      {isTutor ? (
        <Stack.Screen
          name={'tutorFeedbackScreen'}
          component={TutorFeedbackScreen}
          options={{
            headerShown: false,
          }}
        />
      ) : (
        <Stack.Screen
          name={'tuteeFeedbackScreen'}
          component={TuteeFeedbackScreen}
          options={{
            headerShown: false,
          }}
        />
      )}
    </Stack.Navigator>
  );
}

export default LessonScreenNavigator;
