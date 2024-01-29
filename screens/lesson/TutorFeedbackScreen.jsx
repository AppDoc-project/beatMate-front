import { COLORS } from 'colors';
import React from 'react';
import styled from 'styled-components';

function TutorFeedbackScreen(props) {
  return (
    <Container>
      <Txt>강사 피드백 화면</Txt>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  background-color: ${COLORS.white};

  justify-content: center;
  align-items: center;
`;

const Txt = styled.Text``;

export default TutorFeedbackScreen;
