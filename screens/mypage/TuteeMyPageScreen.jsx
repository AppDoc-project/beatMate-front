import { COLORS } from 'colors';
import React from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styled from 'styled-components/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useNavigation } from '@react-navigation/native';
import MyPostScreen from '@components/mypage/mypagetabscreens/MyPostScreen';
import MyCommentScreen from '@components/mypage/mypagetabscreens/MyCommentScreen';
import MyBookmarkScreen from '@components/mypage/mypagetabscreens/MyBookmarkScreen';
import MyTeacherScreen from '@components/mypage/mypagetabscreens/MyTeacherScreen';

const Tab = createMaterialTopTabNavigator();

function TuteeMyPageScreen(props) {
  const navigation = useNavigation();

  const TuteeMyPageSet = () => {
    navigation.navigate('TuteeMyPageSetScreen');
  };

  return (
    <Container>
      <Infosection>
        <Settingbtn onPress={TuteeMyPageSet}>
          <SettingIcon name={'settings-outline'} size={RFValue(25)} color={'white'} />
        </Settingbtn>
        <Profileimage name={'user-circle'} size={RFValue(90)} color={'lightgray'} />
        <Userbox>
          <Usertypebox>
            <Usertype>수강생</Usertype>
          </Usertypebox>
          <Username>김철수</Username>
          <Userinfocount>게시글 2 | 댓글 16 | 북마크 1 | 찜한 강사 3</Userinfocount>
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
        <Tab.Screen
          name="찜한 강사"
          component={MyTeacherScreen}
          option={{
            headerShown: false,
            tabBarLabel: '찜한 강사',
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

const Settingbtn = styled.TouchableOpacity``;

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
  right: 30px;
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

const Userinfocount = styled.Text`
  color: ${COLORS.white};
  font-size: ${RFValue(10.5)}px;
  margin: 5px 0px;
`;

export default TuteeMyPageScreen;
