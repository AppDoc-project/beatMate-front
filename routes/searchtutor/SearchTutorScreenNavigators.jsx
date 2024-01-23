import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SearchTutorScreen from '@screens/searchtutor/SearchTutorScreen';
import TutorProfileScreen from '@screens/searchtutor/TutorProfileScreen';
import { COLORS } from 'colors';
import { UserInfo } from 'context/UserInfoContext';
import React, { useContext, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import AntDesign from 'react-native-vector-icons/AntDesign';

const Stack = createNativeStackNavigator();

function SearchTutorScreenNavigators(props) {
  const [isLikeList, setLikeList] = useState(false);

  const toggleLikeList = () => {
    setLikeList(!isLikeList);
    if (isLikeList) {
      console.log('Remove Tutor');
    } else {
      console.log('Added Tutor');
    }
  };

  return (
    <Stack.Navigator
      initialRouteName="searchTutorScreen"
      screenOptions={{
        headerTintColor: 'black',
        headerTransparent: true,
        headerTitleStyle: {
          color: COLORS.black,
        },
        headerBackTitleVisible: false,
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
          title: '',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: RFValue(16),
          },
          headerRight: () => (
            <TouchableOpacity onPress={toggleLikeList}>
              <AntDesign
                name={isLikeList ? 'heart' : 'hearto'}
                size={RFValue(20)}
                color={isLikeList ? COLORS.main : COLORS.lightgray}
              />
            </TouchableOpacity>
          ),
        }}
      />
    </Stack.Navigator>
  );
}

export default SearchTutorScreenNavigators;
