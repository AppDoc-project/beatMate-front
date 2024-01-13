import { COLORS } from 'colors';
import React from 'react';
import styled from 'styled-components';
import { RFValue } from 'react-native-responsive-fontsize';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

function ChangePhoneNumberScreen(props) {
  return (
    <Container>
      <Section>
        <Txt>변경하실 연락처를 입력해주세요.</Txt>
      </Section>

      <Section>
        <Text>연락처를 변경하기 위해서는 현재 비밀번호를 입력해야 합니다.</Text>
        <Txt>현재 비밀번호를 입력해주세요.</Txt>
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
  margin-bottom: ${hp(1)}px;
  color: ${COLORS.gray};
`;

export default ChangePhoneNumberScreen;
