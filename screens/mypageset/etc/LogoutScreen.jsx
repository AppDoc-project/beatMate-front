import React from 'react';
import styled from 'styled-components';

function LogoutScreen(props) {
    return (
        <Container>
      <Txt>로그아웃</Txt>
    </Container>
  );
}

const Container = styled.View``;

const Txt = styled.Text`
  font-size: 20px;
  font-weight: bold;
`;

export default LogoutScreen;