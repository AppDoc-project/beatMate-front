import React from 'react';
import styled from 'styled-components';

function ChangeLessonInfoScreen(props) {
  return (
    <Container>
      <Txt>레슨 정보 수정</Txt>
    </Container>
  );
}

const Container = styled.View``;

const Txt = styled.Text`
  font-size: 20px;
  font-weight: bold;
`;

export default ChangeLessonInfoScreen;
