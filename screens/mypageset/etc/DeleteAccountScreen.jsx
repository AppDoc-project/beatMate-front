import { COLORS } from 'colors';
import React from 'react';
import styled from 'styled-components';
import { RFValue } from 'react-native-responsive-fontsize';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

function DeleteAccountScreen(props) {
  return (
    <Container>
      <Section>
        <Txt>계정 이메일을 입력해주세요.</Txt>
      </Section>

      <Section>
        <Txt>계정 비밀번호를 입력해주세요.</Txt>
      </Section>

      <Section>
        <Text>회원 탈퇴 후 기존 이메일과 비밀번호로 로그인이 불가능합니다.</Text>
        <Text>현재 진행 중인 예약이 있는 경우 탈퇴가 불가능합니다. </Text>
      </Section>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  background-color: white;
`;

const Section = styled.View`
  margin-left: ${wp(4.8)}px;
  margin-top: ${hp(2)}px;
`;

const Txt = styled.Text`
  font-size: ${RFValue(16)}px;
  font-weight: bold;
`;

const Text = styled.Text`
  font-size: ${RFValue(13)}px;
  font-weight: bold;
  margin-bottom: ${hp(0.3)}px;
  color: ${COLORS.gray};
`;

export default DeleteAccountScreen;
