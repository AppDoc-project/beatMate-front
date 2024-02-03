import { useHeaderHeight } from '@react-navigation/elements';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import GetSearchOptionScreen from '@screens/searchtutor/GetSearchOptionScreen';
import SearchTutorScreen from '@screens/searchtutor/SearchTutorScreen';
import TutorCommunityListScreen from '@screens/searchtutor/TutorCommunityListScreen';
import TutorProfileScreen from '@screens/searchtutor/TutorProfileScreen';
import { TutorFindCategory } from 'context/TutorFindCategoryContext';
import React, { useState } from 'react';
import ChatScreenNavigator from 'routes/chat/ChatScreenNavigators';

const Stack = createNativeStackNavigator();

function SearchTutorScreenNavigators() {
  //강사 찾기 카테고리 설정 관련 객체
  const [findTutorCategory, setFindTutorCategory] = useState({
    koCategoryName: '',
    enCategoryName: '',
  });

  return (
    <TutorFindCategory.Provider
      value={{
        category: [findTutorCategory, setFindTutorCategory],
      }}
    >
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
    </TutorFindCategory.Provider>
  );
}

export default SearchTutorScreenNavigators;
