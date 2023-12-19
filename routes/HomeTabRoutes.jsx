import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { COLORS } from 'colors';
import React from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import CommunityScreenNavigator from './community/CommunityNavigators';
import HomeScreenNavigator from './home/HomeScreenNavigator';
import MyPageScreenNavigator from './mypage/MyPageScreenNavigators';

const Tab = createBottomTabNavigator();

function HomeTabRoutes(props) {
  return (
    <Tab.Navigator initialRouteName="home">
      <Tab.Screen
        name="home"
        component={HomeScreenNavigator}
        options={{
          headerShown: false,
          tabBarLabel: '홈',
          tabBarActiveTintColor: COLORS.black,
          tabBarInactiveTintColor: COLORS.gray,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Ionicons name={'home-sharp'} size={RFValue(20)} color={COLORS.black} />
            ) : (
              <Ionicons name={'home-outline'} size={RFValue(20)} color={COLORS.lightgray} />
            ),
        }}
      />
      <Tab.Screen
        name="community"
        component={CommunityScreenNavigator}
        options={{
          headerShown: false,
          tabBarLabel: '커뮤니티',
          tabBarActiveTintColor: COLORS.black,
          tabBarInactiveTintColor: COLORS.gray,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <MaterialCommunityIcons name={'comment-text-multiple'} size={RFValue(20)} color={COLORS.black} />
            ) : (
              <MaterialCommunityIcons name={'comment-text-multiple'} size={RFValue(20)} color={COLORS.lightgray} />
            ),
        }}
      />
      <Tab.Screen
        name="mypage"
        component={MyPageScreenNavigator}
        options={{
          headerShown: false,
          tabBarLabel: '내 정보',
          tabBarActiveTintColor: COLORS.black,
          tabBarInactiveTintColor: COLORS.gray,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Ionicons name={'person'} size={RFValue(20)} color={COLORS.black} />
            ) : (
              <Ionicons name={'person'} size={RFValue(20)} color={COLORS.lightgray} />
            ),
        }}
      />
    </Tab.Navigator>
  );
}

export default HomeTabRoutes;