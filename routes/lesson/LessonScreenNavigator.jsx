import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LessonEvaluationScreen from '@screens/lesson/LessonEvaluationScreen';
import LessonFeedbackScreen from '@screens/lesson/LessonFeedbackScreen';
import LessonMainScreen from '@screens/lesson/LessonMainScreen';
import LessonScheduleScreen from '@screens/lesson/LessonScheduleScreen';
import TuteeEvaluationModifyScreen from '@screens/lesson/TuteeEvaluationModifyScreen';
import TuteeEvaluationScreen from '@screens/lesson/TuteeEvaluationScreen';
import TutorFeedbackModifyScreen from '@screens/lesson/TutorFeedbackModifyScreen';
import TutorFeedbackScreen from '@screens/lesson/TutorFeedbackScreen';
import VideoScreen from '@screens/lesson/VideoScreen';
import React from 'react';

const Stack = createNativeStackNavigator();

function LessonScreenNavigator(props) {
  return (
    <Stack.Navigator
      initialRouteName="lessonMainScreen"
      screenOptions={{
        gestureEnabled: false,
      }}
    >
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
      <Stack.Screen
        name={'tutorFeedbackScreen'}
        component={TutorFeedbackScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={'tuteeEvaluationScreen'}
        component={TuteeEvaluationScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={'lessonFeedbackScreen'}
        component={LessonFeedbackScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={'lessonEvaluationScreen'}
        component={LessonEvaluationScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={'tutorFeedbackModifyScreen'}
        component={TutorFeedbackModifyScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={'tuteeEvaluationModifyScreen'}
        component={TuteeEvaluationModifyScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

export default LessonScreenNavigator;
