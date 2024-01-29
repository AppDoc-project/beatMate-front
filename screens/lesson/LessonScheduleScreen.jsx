import { COLORS } from 'colors';
import React from 'react';
import styled from 'styled-components';

function LessonScheduleScreen(props) {
  return (
    <Container>
      <Txt>달력 화면</Txt>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  bakcground-color: ${COLORS.white};

  justify-content: center;
  align-items: center;
`;

const Txt = styled.Text``;

export default LessonScheduleScreen;
