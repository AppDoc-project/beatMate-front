import React, { useState, useContext } from 'react';
import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { COLORS } from 'colors';
import { useNavigation } from '@react-navigation/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ActionSheetIOS } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserInfo } from 'context/UserInfoContext';
import { logout } from 'api/auth';
import { CommonActions } from '@react-navigation/native';

function TuteeMyPageSetScreen(props) {
  const navigation = useNavigation();

  const {
    loginUserInfo: [loginUser, setLoginUser],
  } = useContext(UserInfo);

  const [result, setResult] = useState('');

  const PasswordSet = () => {
    navigation.navigate('ChangePasswordScreen');
  };

  const PhoneNumberSet = () => {
    navigation.navigate('ChangePhoneNumberScreen');
  };

  const NicknameSet = () => {
    navigation.navigate('ChangeNicknameScreen');
  };

  const ProfileImageSet = () =>
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ['Cancel', '프로필 이미지 변경', '프로필 이미지 삭제'],
        destructiveButtonIndex: 2,
        cancelButtonIndex: 0,
        userInterfaceStyle: 'dark',
      },
      (buttonIndex) => {
        if (buttonIndex === 0) {
          // cancel action
        } else if (buttonIndex === 1) {
          setResult(String(Math.floor(Math.random() * 100) + 1));
        } else if (buttonIndex === 2) {
          setResult(<FontAwesome name={'user-circle'} size={RFValue(90)} color={'lightgray'} />);
        }
      },
    );

  const PushAlarmSet = () => {
    navigation.navigate('PushAlarmSetScreen');
  };

  const Logout = () => {
    logout()
      .then(async (res) => {
        await AsyncStorage.removeItem('access_token');

        setLoginUser({});

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
        <Btn onPress={PushAlarmSet}>
          <Txt>푸쉬 알림 여부 설정</Txt>
        </Btn>
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
`;

const FirstList = styled.View`
  position: absolute;
  top: ${hp(13)}px;
  left: ${wp(5)}px;

  padding: ${wp(0)}px ${hp(3)}px;

  width: ${wp(90)}px;
  height: ${hp(16)}px;
  border-width: 3px;
  border-radius: 15px;
  border-color: ${COLORS.main};
`;

const SecondList = styled.View`
  position: absolute;
  top: ${hp(31)}px;
  left: ${wp(5)}px;

  padding: ${wp(0)}px ${hp(3)}px;

  width: ${wp(90)}px;
  height: ${hp(16)}px;
  border-width: 3px;
  border-radius: 15px;
  border-color: ${COLORS.main};
`;

const ThirdList = styled.View`
  position: absolute;
  top: ${hp(49)}px;
  left: ${wp(5)}px;

  padding: ${wp(0)}px ${hp(3)}px;

  width: ${wp(90)}px;
  height: ${hp(20)}px;
  border-width: 3px;
  border-radius: 15px;
  border-color: ${COLORS.main};
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

export default TuteeMyPageSetScreen;
