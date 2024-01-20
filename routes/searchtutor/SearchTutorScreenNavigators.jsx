import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SearchTutorScreen from '@screens/searchtutor/SearchTutorScreen';
import TutorProfileScreen from '@screens/searchtutor/TutorProfileScreen';
import { COLORS } from 'colors';
import { UserInfo } from 'context/UserInfoContext';
import React, { useContext } from 'react';
import { RFValue } from 'react-native-responsive-fontsize';

const Stack = createNativeStackNavigator();

function SearchTutorScreenNavigators(props) {

  return (
    <Stack.Navigator
      initialRouteName="searchTutorScreen"
      screenOptions={{
        headerTintColor: 'black',
        headerTransparent: true,
        headerTitleStyle: {
          color: COLORS.black,
        },
      }}
    >
      <Stack.Screen
        name={'searchTutorScreen'}
        component={SearchTutorScreen}
        options={{
          title: '강사 찾기',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: RFValue(16),
          },
        }}
      />
      <Stack.Screen
        name={'tutorProfileScreen'}
        component={TutorProfileScreen}
        options={{
          title: '분야 넣을 예정',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: RFValue(16),
          },
        }}
      />
    </Stack.Navigator>
  );
}

export default SearchTutorScreenNavigators;
