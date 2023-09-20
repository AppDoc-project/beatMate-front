import React from 'react';
import { Text } from 'react-native';
import styled from 'styled-components/native';

function HomeScreen(props) {
  return (
    <Container>
      <Text>로그인이 완료되었습니다.</Text>
    </Container>
  );
}

const Container = styled.View``;

export default HomeScreen;
