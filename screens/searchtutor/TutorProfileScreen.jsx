import React from 'react';
import styled from 'styled-components';

function TutorProfileScreen(props) {
  return (
    <Container>
      <Txt>강사프로필</Txt>
    </Container>
  );
}
const Container = styled.View``;

const Txt = styled.Text`
  font-size: 10px;
`;
export default TutorProfileScreen;
