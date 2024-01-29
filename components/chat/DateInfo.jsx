import PropTypes from 'prop-types';
import React from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import { styled } from 'styled-components';

DateInfo.propTypes = {
  date: PropTypes.string.isRequired,
};

function DateInfo({ date }) {
  const formattedDate = date && date.substring(0, 10).replace(/:/g, '.');

  return (
    <Container>
      <Date>{formattedDate}</Date>
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
