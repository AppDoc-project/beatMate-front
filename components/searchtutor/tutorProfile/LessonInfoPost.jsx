import PropTypes from 'prop-types';
import React from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import styled from 'styled-components';

LessonInfoPost.propTypes = {
  description: PropTypes.string.isRequired,
};

function LessonInfoPost({ description }) {
  return (
    <Container>
      <Txt>{description}</Txt>
    </Container>
  );
}

const Container = styled.View`
  margin: ${hp(1.6)}px ${wp(3)}px;
`;

const Txt = styled.Text`
  font-size: ${RFValue(14)}px;
`;

export default LessonInfoPost;
