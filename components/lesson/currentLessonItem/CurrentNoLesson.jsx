import { COLORS } from 'colors';
import React from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import styled from 'styled-components';

function CurrentNoLesson(props) {
  return (
    <Container>
      <Box>
        <Txt>현재 진행 중인 레슨이 없습니다.</Txt>
      </Box>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  bakcground-color: ${COLORS.white};
  justify-content: center;
  align-items: center;
`;

const Box = styled.View`
  width: ${wp(80)}px;
  height: ${hp(14)}px;
  border-width: ${RFValue(3)}px;
  border-radius: ${RFValue(10)}px;
  border-color: ${COLORS.main};

  justify-content: center;
  align-items: center;
`;

const Txt = styled.Text`
  font-size: ${RFValue(14)}px;
  font-weight: 600;
  color: ${COLORS.main};

  text-decoration-line: underline;
`;

export default CurrentNoLesson;
