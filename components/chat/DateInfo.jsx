import React from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import { styled } from 'styled-components';

function DateInfo(props) {
  return (
    <Container>
      <Date>2023.08.18</Date>
    </Container>
  );
}

const Container = styled.View`
  justify-content: center;
  align-items: center;
`;

const Date = styled.Text`
  padding: ${RFValue(16)}px;
  font-size: ${RFValue(12)}px;
  font-weight: 500;
`;

export default DateInfo;
