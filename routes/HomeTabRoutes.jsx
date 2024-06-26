import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import HomeScreen from '@screens/HomeScreen';
import { COLORS } from 'colors';
import { Auth } from 'context/AuthContext';
import React, { useState } from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Foundation from 'react-native-vector-icons/Foundation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import ChatScreenNavigator from './chat/ChatScreenNavigators';
import CommunityScreenNavigator from './community/CommunityNavigators';
import LessonScreenNavigator from './lesson/LessonScreenNavigator';
import MyPageScreenNavigator from './mypage/MyPageScreenNavigators';
import ReservationScreenNavigator from './reservation/ReservationScreenNavigator';
import SearchTutorScreenNavigators from './searchtutor/SearchTutorScreenNavigators';

const Tab = createBottomTabNavigator();

const HomeTabRoutes = () => {
  const navigation = useNavigation();

  // 현재 접속자 정보 객체
  const [loginUser, setLoginUser] = useState({
    id: null,
    email: '',
    name: '',
    isTutor: false,
  });

  return (
    <Auth.Provider
      value={{
        loginUserInfo: [loginUser, setLoginUser],
      }}
    >
      <Tab.Navigator
        initialRouteName="homeScreen"
        screenOptions={{
          gestureEnabled: false,
        }}
      >
        <Tab.Screen
          name="community"
          component={CommunityScreenNavigator}
          options={{
            unmountOnBlur: true,
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
          listeners={{
            tabPress: (e) => {
              e.preventDefault();
              navigation.navigate('community');
            },
          }}
        />
        <Tab.Screen
          name="chat"
          component={ChatScreenNavigator}
          options={{
            unmountOnBlur: true,
            headerShown: false,
            title: '채팅',
            tabBarActiveTintColor: COLORS.black,
            tabBarInactiveTintColor: COLORS.gray,
            tabBarIcon: ({ focused }) =>
              focused ? (
                <Ionicons name="chatbubble-ellipses-outline" size={RFValue(20)} color={COLORS.black} />
              ) : (
                <Ionicons name="chatbubble-ellipses-outline" size={RFValue(20)} color={COLORS.lightgray} />
              ),
          }}
          listeners={{
            tabPress: (e) => {
              e.preventDefault();
              navigation.navigate('chat');
            },
          }}
        />
        <Tab.Screen
          name="searchtutor"
          component={SearchTutorScreenNavigators}
          options={{
            unmountOnBlur: true,
            headerShown: false,
            tabBarLabel: '강사 찾기',
            tabBarActiveTintColor: COLORS.black,
            tabBarInactiveTintColor: COLORS.gray,
            tabBarIcon: ({ focused }) =>
              focused ? (
                <Ionicons name={'search-sharp'} size={RFValue(20)} color={COLORS.black} />
              ) : (
                <Ionicons name={'search-sharp'} size={RFValue(20)} color={COLORS.lightgray} />
              ),
          }}
          listeners={{
            tabPress: (e) => {
              e.preventDefault();
              navigation.navigate('searchtutor');
            },
          }}
        />
        <Tab.Screen
          name={'homeScreen'}
          component={HomeScreen}
          options={{
            unmountOnBlur: true,
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
          listeners={{
            tabPress: (e) => {
              e.preventDefault();
              navigation.navigate('homeScreen');
            },
          }}
        />
        <Tab.Screen
          name="reservation"
          component={ReservationScreenNavigator}
          options={{
            unmountOnBlur: true,
            headerShown: false,
            tabBarLabel: '예약',
            tabBarActiveTintColor: COLORS.black,
            tabBarInactiveTintColor: COLORS.gray,
            tabBarIcon: ({ focused }) =>
              focused ? (
                <AntDesign name={'form'} size={RFValue(20)} color={COLORS.black} />
              ) : (
                <AntDesign name={'form'} size={RFValue(20)} color={COLORS.lightgray} />
              ),
          }}
          listeners={{
            tabPress: (e) => {
              e.preventDefault();
              navigation.navigate('reservation');
            },
          }}
        />
        <Tab.Screen
          name="lesson"
          component={LessonScreenNavigator}
          options={{
            unmountOnBlur: true,
            headerShown: false,
            tabBarLabel: '레슨',
            tabBarActiveTintColor: COLORS.black,
            tabBarInactiveTintColor: COLORS.gray,
            tabBarIcon: ({ focused }) =>
              focused ? (
                <Foundation name={'telephone'} size={RFValue(20)} color={COLORS.black} />
              ) : (
                <Foundation name={'telephone'} size={RFValue(20)} color={COLORS.lightgray} />
              ),
          }}
          listeners={{
            tabPress: (e) => {
              e.preventDefault();
              navigation.navigate('lesson');
            },
          }}
        />
        <Tab.Screen
          name="mypage"
          component={MyPageScreenNavigator}
          options={{
            unmountOnBlur: true,
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
          listeners={{
            tabPress: (e) => {
              e.preventDefault();
              navigation.navigate('mypage');
            },
          }}
        />
      </Tab.Navigator>
    </Auth.Provider>
  );
};

export default HomeTabRoutes;
