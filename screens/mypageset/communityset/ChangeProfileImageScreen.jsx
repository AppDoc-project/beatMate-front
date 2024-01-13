import React from 'react';
import styled from 'styled-components';

function ChangeProfileImageScreen(props) {
  return (
    <Container>
      <Txt>프로필 이미지 수정</Txt>
    </Container>
  );
}

const Container = styled.View``;

const Txt = styled.Text`
  font-size: 20px;
  font-weight: bold;
`;

export default ChangeProfileImageScreen;
