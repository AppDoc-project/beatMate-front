import { COLORS } from 'colors';
import React, { useState } from 'react';
import styled from 'styled-components';
import { RFValue } from 'react-native-responsive-fontsize';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Alert, TouchableWithoutFeedback, Keyboard } from 'react-native';
import Octicons from 'react-native-vector-icons/Octicons';

function DeleteAccountScreen(props) {
  const [email, setEmail] = useState('');
  const [inputEmail, setInputEmail] = useState('');
  const [password, setPassword] = useState('');
  const [inputPassword, setInputPassword] = useState('');
  const [booking, setBooking] = useState([]);

  const DeleteAccountAlert = () => {
    // 회원탈퇴 경고창
    if (setBooking.length === 0) {
      Alert.alert('경고', '현재 진행 중인 예약이 없어야 탈퇴할 수 있습니다.');
      return;
    }
  };

  const onPressDeleteAccountBtn = () => {
    DeleteAccountAlert();
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
          {email !== '' && inputEmail !== '' && (
            <CheckAlert>
              {email === inputEmail ? <Octicons name="check" size={RFValue(20)} color={COLORS.main} /> : null}
            </CheckAlert>
          )}
        </FirstSection>

        <SecondSection>
          <Txt>계정 비밀번호를 입력해주세요.</Txt>
          <TextInput
            placeholder="비밀번호를 입력해주세요."
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          {password !== '' && inputPassword !== '' && (
            <CheckAlert>
              {password === inputPassword ? <Octicons name="check" size={RFValue(20)} color={COLORS.main} /> : null}
            </CheckAlert>
          )}
        </SecondSection>

        <ThirdSection>
          <Text>※ 회원 탈퇴 후 기존 이메일과 비밀번호로 로그인이 불가능합니다.</Text>
          <Text>※ 현재 진행 중인 예약이 있는 경우 탈퇴가 불가능합니다. </Text>
        </ThirdSection>
        <DeleteBtn
          fontColor={DeleteAccountAlert() && email === inputEmail && password === inputPassword ? 'white' : COLORS.main}
          backColor={DeleteAccountAlert() && email === inputEmail && password === inputPassword ? COLORS.main : 'white'}
          width={wp(90.4)}
          marginBottom={hp(6.15)}
          marginTop={hp(8)}
          justifyContent="center"
          onPress={onPressDeleteAccountBtn}
        >
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

const CheckAlert = styled.View`
  margin-top: ${hp(1)}px;
  position: absolute;
  top: ${hp(1)}px;
  right: ${wp(3)}px;
`;

const DeleteBtn = styled.TouchableOpacity`
  width: ${wp(90.4)}px;
  height: ${hp(5)}px;
  border: 2px;
  border-radius: ${wp(3)}px;
  border-color: ${COLORS.main};
  border-style: solid;

  padding: ${hp(1)}px;
  margin: ${hp(2)}px ${wp(4.8)}px;

  position: absolute;
  bottom: ${hp(3)}px;
`;

const BtnText = styled.Text`
  color: ${COLORS.main};
  font-size: ${RFValue(16)}px;
  font-weight: bold;
  text-align: center;
`;
export default DeleteAccountScreen;
