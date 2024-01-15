import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CommunityScreen from '@screens/community/CommunityScreen';
import WriteNewPostScreen from '@screens/community/WriteNewPostScreen';
import React from 'react';

const Stack = createNativeStackNavigator();

function CommunityScreenNavigator(props) {
  return (
    <Stack.Navigator initialRouteName="communityScreen">
      <Stack.Screen
        name={'communityScreen'}
        component={CommunityScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={'writeNewPostScreen'}
        component={WriteNewPostScreen}
        options={{
          title: '게시물 작성하기',
          headerLeft: () => null, // 뒤로 가기 버튼 없애기
        }}
      />
    </Stack.Navigator>
  );
}

export default CommunityScreenNavigator;
