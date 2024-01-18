import { COLORS } from 'colors';
import React, { useState } from 'react';
import styled from 'styled-components';
import { RFValue } from 'react-native-responsive-fontsize';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Alert, TouchableWithoutFeedback, Keyboard } from 'react-native';

function ChangeNicknameScreen(props) {
  const [nickName, setNickName] = useState('');
  const [beforeNickName, setBeforeNickName] = useState('');

  const ValidNickname = () => {
    // 닉네임이 최대 10자, 한글, 영문자, 숫자만 포함하는지 검사
    const nicknameRegex = /^[a-zA-Z0-9가-힣]{1,10}$/;
    return nicknameRegex.test(nickName);
  };

  const ChangeNicknameAlert = () => {
    // 닉네임 경고창
    if (!ValidNickname()) {
      Alert.alert('경고', '닉네임은 최대 10자, 한글, 영문자, 숫자만 입력 가능합니다.');
    }
  };

  const onPressChangeBtn = () => {

    ChangeNicknameAlert();
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <FirstSection>
          <Txt>변경하실 닉네임을 입력해주세요.</Txt>
          <TextInput placeholder={beforeNickName} value={nickName} onChangeText={setNickName} />
        </FirstSection>

        <SecondSection>
          <Text>※ 닉네임 변경후 30일 뒤에 재변경이 가능합니다.</Text>
        </SecondSection>
        <ChangeBtn
          fontColor={nickName ? 'white' : COLORS.main}
          backColor={nickName ? COLORS.main : 'white'}
          width={wp(90.4)}
          marginBottom={hp(6.15)}
          marginTop={hp(8)}
          justifyContent="center"
          onPress={onPressChangeBtn}
        >
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
  top: ${hp(24)}px;

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

const BtnText = styled.Text`
  color: ${COLORS.main};
  font-size: ${RFValue(16)}px;
  font-weight: bold;
  text-align: center;
`;

export default ChangeNicknameScreen;
