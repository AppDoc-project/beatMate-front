import React from 'react';
import styled from 'styled-components';
import { RFValue } from 'react-native-responsive-fontsize';
import { COLORS } from 'colors';
import { useNavigation } from '@react-navigation/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

function TutorMyPageSetScreen(props) {
  const navigation = useNavigation();

  const PasswordSet = () => {
    navigation.navigate('ChangePasswordScreen');
  };

  const PhoneNumberSet = () => {
    navigation.navigate('ChangePhoneNumberScreen');
  };

  const IntroSet = () => {
    navigation.navigate('ChangeIntroScreen');
  };

  const LessonInfoSet = () => {
    navigation.navigate('ChangeLessonInfoScreen');
  };

  const FieldSet = () => {
    navigation.navigate('ChangeFieldScreen');
  };

  const ProfileImageSet = () => {
    navigation.navigate('ChangeProfileImageScreen');
  };

  const PushAlarmSet = () => {
    navigation.navigate('PushAlarmSetScreen');
  };

  const Logout = () => {
    navigation.navigate('LogoutScreen');
  };
  
  const DeleteAccount = () => {
    navigation.navigate('DeleteAccountScreen');
  };

  return (
    <Container>
      <Firstlist>
        <Header>내 정보</Header>
        <Btn onPress={PasswordSet}>
          <Txt>비밀번호 변경</Txt>
        </Btn>
        <Btn onPress={PhoneNumberSet}>
          <Txt>연락처 변경</Txt>
        </Btn>
        <Btn onPress={IntroSet}>
          <Txt>자기소개 변경</Txt>
        </Btn>
      </Firstlist>
      <Secondlist>
        <Header>레슨 정보</Header>
        <Btn onPress={LessonInfoSet}>
          <Txt>레슨 정보 변경</Txt>
        </Btn>
        <Btn onPress={FieldSet}>
          <Txt>분야 변경</Txt>
        </Btn>
      </Secondlist>
      <Thirdlist>
        <Header>커뮤니티</Header>
        <Btn onPress={ProfileImageSet}>
          <Txt>프로필 이미지 변경</Txt>
        </Btn>
      </Thirdlist>
      <Fourthlist>
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
      </Fourthlist>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  background-color: white;
`;

const Firstlist = styled.View`
  position: absolute;
  top: ${hp(13)}px;
  left: ${wp(5)}px;

  padding: ${wp(0)}px ${hp(3)}px;

  width: ${wp(90)}px;
  height: ${hp(20)}px;
  border-width: 3px;
  border-radius: 15px;
  border-color: ${COLORS.main};
`;

const Secondlist = styled.View`
  position: absolute;
  top: ${hp(35)}px;
  left: ${wp(5)}px;

  padding: ${wp(0)}px ${hp(3)}px;

  width: ${wp(90)}px;
  height: ${hp(16)}px;
  border-width: 3px;
  border-radius: 15px;
  border-color: ${COLORS.main};
`;

const Thirdlist = styled.View`
  position: absolute;
  top: ${hp(53)}px;
  left: ${wp(5)}px;

  padding: ${wp(0)}px ${hp(3)}px;

  width: ${wp(90)}px;
  height: ${hp(12)}px;
  border-width: 3px;
  border-radius: 15px;
  border-color: ${COLORS.main};
`;

const Fourthlist = styled.View`
  position: absolute;
  top: ${hp(67)}px;
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

export default TutorMyPageSetScreen;
