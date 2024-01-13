import { COLORS } from 'colors';
import React from 'react';
import styled from 'styled-components';
import { RFValue } from 'react-native-responsive-fontsize';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

function ChangeIntroScreen(props) {
  return (
    <Container>
      <Section>
        <Txt>변경된 자기소개를 입력해주세요.</Txt>
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

export default ChangeIntroScreen;
