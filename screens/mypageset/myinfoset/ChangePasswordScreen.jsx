import { COLORS } from 'colors';
import React, { useState } from 'react';
import styled from 'styled-components';
import { RFValue } from 'react-native-responsive-fontsize';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Alert } from 'react-native';
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
    <Container>
      <Section>
        <Txt>변경하실 비밀번호를 입력해주세요.</Txt>
        <Subtxt>최소 8자, 최대 18자 가능 / 영어 대소문자, 숫자, 특수문자 중 하나 이상 반드시 포함</Subtxt>
        <Textinput
          placeholder="새 비밀번호를 입력해주세요."
          secureTextEntry
          value={changedPassword}
          onChangeText={setChangedPassword}
        />
      </Section>
      <Section>
        <Txt>변경하실 비밀번호를 재입력해주세요.</Txt>
        <Inputsection>
          <Textinput
            placeholder="새 비밀번호 재입력해주세요."
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
          {changedPassword !== '' && confirmPassword !== '' && (
            <Checkalert>
              {changedPassword === confirmPassword ? (
                <Octicons name="check" size={RFValue(20)} color={COLORS.main} />
              ) : null}
            </Checkalert>
          )}
        </Inputsection>
      </Section>
      <Section>
        <Text>※ 비밀번호를 변경하기 위해서는 현재 비밀번호를 입력해야 합니다.</Text>
        <Txt>현재 비밀번호를 입력해주세요.</Txt>
        <Textinput
          placeholder="현재 비밀번호를 입력해주세요."
          secureTextEntry
          value={currentPassword}
          onChangeText={setCurrentPassword}
        />
      </Section>
      <Changebtn onPress={ChangePasswordAlert}>
        <Btntext>변경하기</Btntext>
      </Changebtn>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  background-color: white;
`;

const Section = styled.View`
  margin-left: ${wp(4.8)}px;
  margin-right: ${wp(4.8)}px;
  margin-top: ${hp(2)}px;
  margin-bottom: ${hp(2)}px;
`;

const Txt = styled.Text`
  font-size: ${RFValue(16)}px;
  font-weight: bold;
`;

const Subtxt = styled.Text`
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

const Inputsection = styled.View`
  flex-direction: row;
`;

const Textinput = styled.TextInput`
  height: ${hp(5)}px;
  width: ${wp(90)}px;
  border-width: 1px;
  border-radius: 10px;
  border-color: ${COLORS.lightgray};
  margin-top: ${hp(1)}px;
  padding: 0 ${wp(2)}px;
`;

const Checkalert = styled.View`
  margin-top: ${hp(1)}px;
  position: absolute;
  top: ${hp(1)}px;
  right: ${wp(3)}px;
`;

const Changebtn = styled.TouchableOpacity`
  background-color: ${COLORS.primary};
  padding: ${hp(1)}px;
  margin: ${hp(2)}px ${wp(4.8)}px;
  border-radius: ${wp(1)}px;
`;

const Btntext = styled.Text`
  color: white;
  font-size: ${RFValue(16)}px;
  font-weight: bold;
`;

export default ChangePasswordScreen;
