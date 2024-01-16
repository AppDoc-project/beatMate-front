import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TuteeSearchTutorScreen from '@screens/searchtutor/TuteeSearchTutorScreen';
import TutorSearchTutorScreen from '@screens/searchtutor/TutorSearchTutorScreen';
import { COLORS } from 'colors';
import { UserInfo } from 'context/UserInfoContext';
import React, { useContext } from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

const Stack = createNativeStackNavigator();

function SearchTutorScreenNavigators(props) {
  const {
    loginUserInfo: [loginUser],
  } = useContext(UserInfo);

  const isTutor = loginUser.isTutor;

  return (
    <Stack.Navigator
      initialRouteName="searchTutorScreen"
      screenOptions={{
        headerTintColor: 'black',
        headerTransparent: true,
        heaerTitleStyle: {
          color: COLORS.black,
        },
      }}
    >
      {isTutor ? (
        <Stack.Screen
          name={'searchTutorScreen'}
          component={TutorSearchTutorScreen}
          options={{
            title: '강사 찾기',

            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: RFValue(16),
            },
          }}
        />
      ) : (
        <Stack.Screen
          name={'searchTutorScreen'}
          component={TuteeSearchTutorScreen}
          options={{
            title: '강사 찾기',

            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: RFValue(16),
            },
          }}
        />
      )}
    </Stack.Navigator>
  );
}

export default SearchTutorScreenNavigators;
