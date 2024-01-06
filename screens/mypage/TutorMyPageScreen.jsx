import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from 'colors';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import styled from 'styled-components/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MyBookmarkScreen from './mypagetabscreens/MyBookmarkScreen';
import MyCommentScreen from './mypagetabscreens/MyCommentScreen';
import MyPostScreen from './mypagetabscreens/MyPostScreen';

const Tab = createMaterialTopTabNavigator();

function TutorMyPageScreen(props) {

  const navigation = useNavigation();

  const TutorMyPageSet = () => {
    navigation.navigate('TutorMyPageSetScreen');
  };
  

  return (
    <Container>
      <Infosection>
        <Settingbtn onPress={TutorMyPageSet}>
          <SettingIcon
            name={'settings-outline'}
            size={RFValue(25)}
            color={'white'}
          />
        </Settingbtn>
        <Profileimage name={'user-circle'} size={RFValue(90)} color={'lightgray'} />
        <Userbox>
          <Usertypebox>
            <Usertype>강사</Usertype>
          </Usertypebox>
          <Username>김철수</Username>
          <Userintro>안녕하세요.</Userintro>
          <Userinfocount>게시글 2 | 댓글 16 | 북마크 1</Userinfocount>
        </Userbox>
      </Infosection>

      <Tab.Navigator
        tabBarOptions={{
          labelStyle: { fontSize: 16, fontWeight: 'bold' },
          indicatorStyle: { backgroundColor: 'black' },
        }}
      >
        <Tab.Screen
          name="나의 게시글"
          component={MyPostScreen}
          option={{
            headerShown: false,
            tabBarLabel: '나의 게시글',
          }}
        />
        <Tab.Screen
          name="나의 댓글"
          component={MyCommentScreen}
          option={{
            headerShown: false,
            tabBarLabel: '나의 댓글',
          }}
        />
        <Tab.Screen
          name="나의 북마크"
          component={MyBookmarkScreen}
          option={{
            headerShown: false,
            tabBarLabel: '나의 북마크',
          }}
        />
      </Tab.Navigator>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  background-color: ${COLORS.white};
`;

const Infosection = styled.View`
  flex: 0.5;
  background-color: ${COLORS.main};
`;

const Settingbtn = styled.TouchableOpacity`
`;

const SettingIcon = styled(Ionicons)`
  position: absolute;
  top: 50px;
  right: 20px;
`;

const Profileimage = styled(FontAwesome)`
  position: absolute;
  top: 125px;
  left: 35px;
`;

const Userbox = styled.View`
  position: absolute;
  top: 120px;
  right: 100px;
`;

const Usertypebox = styled.View`
  width: 60px;
  height: 25px;
  border-radius: 15px;
  background-color: ${COLORS.white};
  justify-content: center;
  align-items: center;
  margin: 5px 0px;
`;

const Usertype = styled.Text`
  font-size: ${RFValue(14)}px;
  font-weight: bold;
  color: ${COLORS.main};
`;

const Username = styled.Text`
  color: ${COLORS.white};
  font-size: ${RFValue(20)}px;
  font-weight: bold;
  margin: 5px 0px;
`;

const Userintro = styled.Text`
  color: ${COLORS.white};
  font-size: ${RFValue(14)}px;
  margin: 5px 0px;
`;

const Userinfocount = styled.Text`
  color: ${COLORS.white};
  font-size: ${RFValue(10.5)}px;
  margin: 5px 0px;
`;

export default TutorMyPageScreen;
