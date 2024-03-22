import AsyncStorage from '@react-native-async-storage/async-storage';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { logout } from 'api/auth';
import { COLORS } from 'colors';
import { UserInfo } from 'context/UserInfoContext';
import React, { useContext } from 'react';
import { Alert } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import styled from 'styled-components/native';

function MyPageSetScreen(props) {
  const navigation = useNavigation();

  const {
    loginUserInfo: [loginUser, setLoginUser],
  } = useContext(UserInfo);

  const isTutor = loginUser.isTutor;

  const PasswordSet = () => {
    navigation.navigate('ChangePasswordScreen');
  };

  const IntroductionSet = () => {
    navigation.navigate('ChangeIntroScreen');
  };

  const PhoneNumberSet = () => {
    navigation.navigate('ChangePhoneNumberScreen');
  };

  const NicknameSet = () => {
    navigation.navigate('ChangeNicknameScreen');
  };

  const ProfileImageSet = () => {
    navigation.navigate('ChangeProfileScreen');
  };

  const Logout = () => {
    logout()
      .then(async (res) => {
        await AsyncStorage.removeItem('access_token');

        setLoginUser(null);

        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: 'loginScreen' }],
          }),
        );
      })
      .catch((error) => {
        if (error.response && error.response.data.code === 408) {
          Alert.alert('알림', '로그인을 해주세요.');
          navigation.navigate('loginScreen');
        } else if (error.response && error.response.data.code === 500) {
          Alert.alert('알림', '서버에러가 발생했습니다. 잠시 후 다시 시도해 주세요.');
        } else {
          console.log('로그아웃 실패', error);
          Alert.alert('알림', '네트워크 연결을 확인해주세요.');
          navigation.navigate('homeScreen');
        }
      });
  };

  const DeleteAccount = () => {
    navigation.navigate('DeleteAccountScreen');
  };

  return (
    <Container>
      <List>
        <Header>내 정보</Header>
        <Btn onPress={PasswordSet}>
          <Txt>비밀번호 변경</Txt>
        </Btn>
        <Btn onPress={PhoneNumberSet}>
          <Txt>연락처 변경</Txt>
        </Btn>
        {isTutor && (
          <Btn onPress={IntroductionSet}>
            <Txt>자기소개 변경</Txt>
          </Btn>
        )}
      </List>
      <List>
        <Header>커뮤니티</Header>
        {!isTutor && (
          <Btn onPress={NicknameSet}>
            <Txt>닉네임 변경</Txt>
          </Btn>
        )}
        <Btn onPress={ProfileImageSet}>
          <Txt>프로필 이미지 변경</Txt>
        </Btn>
      </List>
      <List>
        <Header>기타</Header>
        <Btn onPress={Logout}>
          <Txt>로그아웃</Txt>
        </Btn>
        <Btn onPress={DeleteAccount}>
          <Txt>회원 탈퇴</Txt>
        </Btn>
      </List>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  background-color: white;
  align-items: center;
  justify-content: center;
`;

const List = styled.View`
  padding-left: ${hp(5)}px;
  padding-top: ${hp(2)}px;
  padding-bottom: ${hp(2)}px;

  width: ${wp(90)}px;
  border-width: 3px;
  border-radius: 15px;
  border-color: ${COLORS.main};
  margin-bottom: ${hp(3)}px;
`;

const Header = styled.Text`
  font-size: ${RFValue(18)}px;
  font-weight: bold;
  margin-bottom: ${hp(1)}px;
`;

const Btn = styled.TouchableOpacity``;

const Txt = styled.Text`
  font-size: ${RFValue(14)}px;
  font-weight: 600;
  margin-top: ${hp(1)}px;
`;

export default MyPageSetScreen;
