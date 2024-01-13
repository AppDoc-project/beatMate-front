import { COLORS } from 'colors';
import React, { useState } from 'react';
import styled from 'styled-components';
import { RFValue } from 'react-native-responsive-fontsize';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Alert, TouchableWithoutFeedback, Keyboard } from 'react-native';

function DeleteAccountScreen(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  ValidBooking = () => {};

  const DeleteAccountAlert = () => {
    // 회원탈퇴 경고창
    if (!ValidBooking()) {
      Alert.alert('경고', '현재 진행 중인 예약이 없어야 탈퇴할 수 있습니다.');
      return;
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <FirstSection>
          <Txt>계정 이메일을 입력해주세요.</Txt>
          <TextInput
            placeholder="이메일을 입력해주세요."
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </FirstSection>

        <SecondSection>
          <Txt>계정 비밀번호를 입력해주세요.</Txt>
          <TextInput
            placeholder="비밀번호를 입력해주세요."
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </SecondSection>

        <ThirdSection>
          <Text>※ 회원 탈퇴 후 기존 이메일과 비밀번호로 로그인이 불가능합니다.</Text>
          <Text>※ 현재 진행 중인 예약이 있는 경우 탈퇴가 불가능합니다. </Text>
        </ThirdSection>
        <DeleteBtn onPress={DeleteAccountAlert}>
          <BtnText>회원탈퇴</BtnText>
        </DeleteBtn>
      </Container>
    </TouchableWithoutFeedback>
  );
}

const Container = styled.View`
  flex: 1;
  background-color: white;
`;

const FirstSection = styled.View`
  position: absolute;
  top: ${hp(13)}px;

  margin-left: ${wp(4.8)}px;
  margin-right: ${wp(4.8)}px;
`;

const SecondSection = styled.View`
  position: absolute;
  top: ${hp(30)}px;

  margin-left: ${wp(4.8)}px;
  margin-right: ${wp(4.8)}px;
`;

const ThirdSection = styled.View`
  position: absolute;
  top: ${hp(43)}px;

  margin-left: ${wp(4.8)}px;
  margin-right: ${wp(4.8)}px;
`;

const Txt = styled.Text`
  font-size: ${RFValue(16)}px;
  font-weight: bold;
`;

const Text = styled.Text`
  font-size: ${RFValue(11)}px;
  font-weight: 600;
  margin-bottom: ${hp(1)}px;
  color: ${COLORS.gray};
`;

const TextInput = styled.TextInput`
  height: ${hp(5)}px;
  width: ${wp(90)}px;
  border-width: 1px;
  border-radius: 10px;
  border-color: ${COLORS.lightgray};
  margin-top: ${hp(1)}px;
  padding: 0 ${wp(2)}px;
`;

const DeleteBtn = styled.TouchableOpacity`
  background-color: ${COLORS.white};
  padding: ${hp(1)}px;
  margin: ${hp(2)}px ${wp(4.8)}px;
  border-radius: ${wp(1)}px;
  border-colors: ${COLORS.main};

  position: absolute;
  bottom: ${hp(5)}px;
  right: ${wp(40)}px;
`;

const BtnText = styled.Text`
  color: ${COLORS.main};
  font-size: ${RFValue(16)}px;
  font-weight: bold;
`;

export default DeleteAccountScreen;
