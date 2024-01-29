import { COLORS } from 'colors';
import React from 'react';
import styled from 'styled-components';

function VideoScreen(props) {
  return (
    <Container>
      <Txt>영상 화면</Txt>
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

export default VideoScreen;
