import { COLORS } from 'colors';
import React, { useState } from 'react';
import styled from 'styled-components';
import { RFValue } from 'react-native-responsive-fontsize';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Alert, TouchableWithoutFeedback, Keyboard } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';

function ChangePhoneNumberScreen(props) {
  const navigation = useNavigation();

  const [currentPassword, setCurrentPassword] = useState('');
  const [inputPassword, setInputPassword] = useState('');
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

  const onPressChangeBtn = () => {};

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <AntDesign name="left" size={32} marginLeft={5} top={40} onPress={() => navigation.goBack()} />
        <FirstSection>
          <Txt>변경하실 연락처를 입력해주세요.</Txt>
          <TextInput placeholder="" keyboardType="numeric" value={contact} onChangeText={setContact} />
        </FirstSection>

        <SecondSection>
          <Text>※ 연락처를 변경하기 위해서는 현재 비밀번호를 입력해야 합니다.</Text>
          <Txt>현재 비밀번호를 입력해주세요.</Txt>
          <TextInput
            placeholder="현재 비밀번호를 입력해주세요."
            secureTextEntry
            value={currentPassword}
            onChangeText={setCurrentPassword}
          />
        </SecondSection>
        <ChangeBtn
          fontColor={ValidContact() && inputPassword === currentPassword ? 'white' : COLORS.main}
          backColor={ValidContact() && inputPassword === currentPassword ? COLORS.main : 'white'}
          width={wp(90.4)}
          marginBottom={hp(6.15)}
          marginTop={hp(8)}
          justifyContent="center"
          onPress={onPressChangeBtn}
        >
          <Btntext>변경하기</Btntext>
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
  top: ${hp(28)}px;

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

const ChangeBtn = styled.TouchableOpacity`
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

const Btntext = styled.Text`
  color: ${COLORS.main};
  font-size: ${RFValue(16)}px;
  font-weight: bold;
  text-align: center;
`;

export default ChangePhoneNumberScreen;
