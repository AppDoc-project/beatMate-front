import AsyncStorage from '@react-native-async-storage/async-storage';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { logout } from 'api/auth';
import { COLORS } from 'colors';
import { UserInfo } from 'context/UserInfoContext';
import React, { useContext } from 'react';
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
            routes: [{ name: 'LoginScreen' }],
          }),
        );
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const DeleteAccount = () => {
    navigation.navigate('DeleteAccountScreen');
  };

  return (
    <Container>
      <FirstList>
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
      </FirstList>
      <SecondList>
        <Header>커뮤니티</Header>
        <Btn onPress={NicknameSet}>
          <Txt>닉네임 변경</Txt>
        </Btn>
        <Btn onPress={ProfileImageSet}>
          <Txt>프로필 이미지 변경</Txt>
        </Btn>
      </SecondList>
      <ThirdList>
        <Header>기타</Header>
        <Btn onPress={Logout}>
          <Txt>로그아웃</Txt>
        </Btn>
        <Btn onPress={DeleteAccount}>
          <Txt>회원 탈퇴</Txt>
        </Btn>
      </ThirdList>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  background-color: white;
  align-items: center;
  justify-content: center;
`;

const FirstList = styled.View`
  padding: ${wp(0)}px ${hp(5)}px;

  width: ${wp(90)}px;
  border-width: 3px;
  border-radius: 15px;
  border-color: ${COLORS.main};
  margin-bottom: ${hp(3)}px;
`;

const SecondList = styled.View`
  padding: ${wp(0)}px ${hp(5)}px;

  width: ${wp(90)}px;
  border-width: 3px;
  border-radius: 15px;
  border-color: ${COLORS.main};
  margin-bottom: ${hp(3)}px;
`;

const ThirdList = styled.View`
  padding: ${wp(0)}px ${hp(5)}px;

  width: ${wp(90)}px;
  border-width: 3px;
  border-radius: 15px;
  border-color: ${COLORS.main};
  margin-bottom: ${hp(3)}px;
`;

const Header = styled.Text`
  font-size: ${RFValue(18)}px;
  font-weight: bold;
  margin: ${RFValue(15)}px 0px ${RFValue(11)}px 0px;
`;

const Btn = styled.TouchableOpacity``;

const Txt = styled.Text`
  font-size: ${RFValue(14)}px;
  font-weight: 600;
  margin: ${RFValue(6.5)}px 0px;
`;

export default MyPageSetScreen;