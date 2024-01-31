import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SearchTutorScreen from '@screens/searchtutor/SearchTutorScreen';
import TutorProfileScreen from '@screens/searchtutor/TutorProfileScreen';
import React from 'react';

const Stack = createNativeStackNavigator();

function SearchTutorScreenNavigators(props) {
  return (
    <Stack.Navigator initialRouteName="searchTutorScreen">
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
