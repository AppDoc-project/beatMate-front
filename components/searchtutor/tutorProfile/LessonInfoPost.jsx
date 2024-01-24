import React from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import styled from 'styled-components';

function LessonInfoPost(props) {
  return (
    <Container>
      <Txt>안녕하세요~~ 어쩌구 저쩌꾸</Txt>
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
