import { createNativeStackNavigator } from '@react-navigation/native-stack';
import GetSearchOptionScreen from '@screens/searchtutor/GetSearchOptionScreen';
import SearchTutorScreen from '@screens/searchtutor/SearchTutorScreen';
import TutorCommunityListScreen from '@screens/searchtutor/TutorCommunityListScreen';
import TutorProfileScreen from '@screens/searchtutor/TutorProfileScreen';
import React from 'react';

const Stack = createNativeStackNavigator();

function SearchTutorScreenNavigators(props) {
  return (
    <Stack.Navigator initialRouteName="tutorCommunityListScreen">
      <Stack.Screen
        name={'tutorCommunityListScreen'}
        component={TutorCommunityListScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={'getSearchOptionScreen'}
        component={GetSearchOptionScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={'searchTutorScreen'}
        component={SearchTutorScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={'tutorProfileScreen'}
        component={TutorProfileScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

export default SearchTutorScreenNavigators;
