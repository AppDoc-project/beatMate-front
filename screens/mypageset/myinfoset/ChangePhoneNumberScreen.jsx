import { COLORS } from 'colors';
import React, { useState } from 'react';
import styled from 'styled-components';
import { RFValue } from 'react-native-responsive-fontsize';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Alert } from 'react-native';
import { TouchableWithoutFeedback, Keyboard } from 'react-native';

function ChangePhoneNumberScreen(props) {
  const [currentPassword, setCurrentPassword] = useState('');
  const [contact, setContact] = useState('');

  const ValidContact = () => {
    // 연락처 조건 검사
    return contact.length === 11;
  };

  const ChangePhoneNumberAlert = () => {
    if (!ValidContact()) {
      Alert.alert('경고', '올바른 연락처를 입력해주세요.');
    } else if (currentPassword !== '현재비밀번호') {
      Alert.alert('경고', '현재 비밀번호가 틀렸습니다.');
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <Section>
          <Txt>변경하실 연락처를 입력해주세요.</Txt>
          <Textinput placeholder="" keyboardType="numeric" value={contact} onChangeText={setContact} />
        </Section>

        <Section>
          <Text>※ 연락처를 변경하기 위해서는 현재 비밀번호를 입력해야 합니다.</Text>
          <Txt>현재 비밀번호를 입력해주세요.</Txt>
          <Textinput
            placeholder="현재 비밀번호를 입력해주세요."
            secureTextEntry
            value={currentPassword}
            onChangeText={setCurrentPassword}
          />
        </Section>
        <Changebtn onPress={ChangePhoneNumberAlert}>
          <Btntext>변경하기</Btntext>
        </Changebtn>
      </Container>
    </TouchableWithoutFeedback>
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

const Text = styled.Text`
  font-size: ${RFValue(11)}px;
  font-weight: 600;
  margin-bottom: ${hp(1)}px;
  color: ${COLORS.gray};
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

const Changebtn = styled.TouchableOpacity`
  background-color: ${COLORS.white};
  padding: ${hp(1)}px;
  margin: ${hp(2)}px ${wp(4.8)}px;
  border-radius: ${wp(1)}px;
  border-colors: ${COLORS.main};

  position: absolute;
  bottom: ${hp(5)}px;
  right: ${wp(40)}px;
`;

const Btntext = styled.Text`
  color: ${COLORS.main};
  font-size: ${RFValue(16)}px;
  font-weight: bold;
`;

export default ChangePhoneNumberScreen;
