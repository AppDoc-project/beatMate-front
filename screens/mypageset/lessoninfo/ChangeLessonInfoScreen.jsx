import React from 'react';
import styled from 'styled-components';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


function ChangeLessonInfoScreen(props) {
  return (
    <Container>
      <FirstSection>
        <Txt>레슨 정보 수정</Txt>
      </FirstSection>
    </Container>
  );
}

const Container = styled.View``;

const FirstSection = styled.View`
  position: absolute;
  top: ${hp(13)}px;

  margin-left: ${wp(4.8)}px;
  margin-right: ${wp(4.8)}px;
`;

const Txt = styled.Text`
  font-size: 20px;
  font-weight: bold;
`;

export default ChangeLessonInfoScreen;
