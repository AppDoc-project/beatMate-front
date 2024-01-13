import { COLORS } from 'colors';
import React, { useState } from 'react';
import styled from 'styled-components';
import { RFValue } from 'react-native-responsive-fontsize';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Alert, TouchableWithoutFeedback, Keyboard } from 'react-native';
import Octicons from 'react-native-vector-icons/Octicons';

function ChangePasswordScreen(props) {
  const [currentPassword, setCurrentPassword] = useState('');
  const [changedPassword, setChangedPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const ValidPassword = () => {
    // 비밀번호가 최소 8자, 최대 18자, 영어 대소문자, 숫자, 특수문자 중 하나 이상을 포함하는지 검사
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,18}$/;
    return passwordRegex.test(changedPassword);
  };

  const ChangePasswordAlert = () => {
    // 비밀번호 경고창
    if (!ValidPassword()) {
      Alert.alert(
        '경고',
        '비밀번호는 최소 8자, 최대 18자, 영어 대소문자, 숫자, 특수문자 중 하나 이상을 포함해야 합니다.',
      );
    } else if (currentPassword !== '현재비밀번호') {
      Alert.alert('경고', '현재 비밀번호가 틀렸습니다.');
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <FirstSection>
          <Txt>변경하실 비밀번호를 입력해주세요.</Txt>
          <SubTxt>최소 8자, 최대 18자 가능 / 영어 대소문자, 숫자, 특수문자 중 하나 이상 반드시 포함</SubTxt>
          <TextInput
            placeholder="새 비밀번호를 입력해주세요."
            secureTextEntry
            value={changedPassword}
            onChangeText={setChangedPassword}
          />
        </FirstSection>
        <SecondSection>
          <Txt>변경하실 비밀번호를 재입력해주세요.</Txt>
          <InputSection>
            <TextInput
              placeholder="새 비밀번호 재입력해주세요."
              secureTextEntry
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
            {changedPassword !== '' && confirmPassword !== '' && (
              <CheckAlert>
                {changedPassword === confirmPassword ? (
                  <Octicons name="check" size={RFValue(20)} color={COLORS.main} />
                ) : null}
              </CheckAlert>
            )}
          </InputSection>
        </SecondSection>
        <ThirdSection>
          <Text>※ 비밀번호를 변경하기 위해서는 현재 비밀번호를 입력해야 합니다.</Text>
          <Txt>현재 비밀번호를 입력해주세요.</Txt>
          <TextInput
            placeholder="현재 비밀번호를 입력해주세요."
            secureTextEntry
            value={currentPassword}
            onChangeText={setCurrentPassword}
          />
        </ThirdSection>
        <ChangeBtn onPress={ChangePasswordAlert}>
          <BtnText>변경하기</BtnText>
        </ChangeBtn>
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
  top: ${hp(33)}px;

  margin-left: ${wp(4.8)}px;
  margin-right: ${wp(4.8)}px;
`;

const ThirdSection = styled.View`
  position: absolute;
  top: ${hp(48)}px;

  margin-left: ${wp(4.8)}px;
  margin-right: ${wp(4.8)}px;
`;

const Txt = styled.Text`
  font-size: ${RFValue(16)}px;
  font-weight: bold;
`;

const SubTxt = styled.Text`
  font-size: ${RFValue(11.7)}px;
  margin-top: ${hp(1)}px;
  color: ${COLORS.lightgray};
`;

const Text = styled.Text`
  font-size: ${RFValue(11)}px;
  font-weight: 600;
  margin-bottom: ${hp(1)}px;
  color: ${COLORS.gray};
`;

const InputSection = styled.View`
  flex-direction: row;
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

const ChangeBtn = styled.TouchableOpacity`
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

export default ChangePasswordScreen;