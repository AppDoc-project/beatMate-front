import { COLORS } from 'colors';
import React from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import styled from 'styled-components';

function CurrentOffLineLesson(props) {
  return (
    <Container>
      <Box>
        <Txt>레슨 확인</Txt>
        <Txt>방 입장하기</Txt>
      </Box>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  bakcground-color: ${COLORS.white};
`;

const Box = styled.View`
  width: ${wp(80)}px;
  border-width: ${RFValue(2)}px;
  border-color: ${COLORS.main};
`;

const Txt = styled.Text`
  font-size: ${RFValue(10)}px;
  color: ${COLORS.black};
`;

export default CurrentOffLineLesson;
