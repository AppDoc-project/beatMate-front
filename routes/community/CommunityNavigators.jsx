import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CommunityScreen from '@screens/community/CommunityScreen';
import CommunitySpecificScreen from '@screens/community/CommunitySpecificScreen';
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
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={'communitySpecificScreen'}
        component={CommunitySpecificScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

export default CommunityScreenNavigator;
