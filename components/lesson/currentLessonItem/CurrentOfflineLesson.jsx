import { COLORS } from 'colors';
import React from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import styled from 'styled-components';

function CurrentOffLineLesson(props) {
  return (
    <Container>
      <Box>
        <Lesson>
          <Info>
            <InfoSub>
              <LabelText>수강생 이름 : </LabelText>
              <ValueText>김철수</ValueText>
            </InfoSub>
            <InfoSub>
              <LabelText>레슨 방식 : </LabelText>
              <ValueText>화상 레슨</ValueText>
            </InfoSub>
          </Info>
          <LessonInfoBtn>
            <LessonInfoBtnText>레슨 정보 확인하기</LessonInfoBtnText>
          </LessonInfoBtn>
        </Lesson>
        <Guide>
          <Txt>수강생에게 공지한 레슨 장소로 가주세요.</Txt>
        </Guide>
      </Box>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  bakcground-color: ${COLORS.white};
  justify-content: center;
  align-items: center;
`;

const Box = styled.View`
  width: ${wp(80)}px;
  height: ${hp(14)}px;
  border-width: ${RFValue(3)}px;
  border-radius: ${RFValue(10)}px;
  border-color: ${COLORS.main};

  padding: ${RFValue(12)}px;
`;
const Lesson = styled.View`
  flex-direction: row;
`;

const Info = styled.View``;

const InfoSub = styled.View`
  flex-direction: row;
  margin: 0 0 ${RFValue(5)}px 0;
`;

const LabelText = styled.Text`
  font-size: ${RFValue(14)}px;
  font-weight: 700;
`;

const ValueText = styled.Text`
  font-size: ${RFValue(12)}px;
  font-weight: 600;
  margin-top: ${RFValue(2.5)}px;
`;

const LessonInfoBtn = styled.TouchableOpacity`
  width: ${wp(25)}px;
  height: ${hp(3)}px;
  border-radius: ${RFValue(5)}px;
  background-color: ${COLORS.subMiddleblue};

  justify-content: center;
  align-items: center;

  margin: ${RFValue(10)}px 0 0 ${RFValue(50)}px;
`;

const LessonInfoBtnText = styled.Text`
  font-size: ${RFValue(10)}px;
  color: ${COLORS.white};
`;

const Guide = styled.View`
  justify-content: center;
  align-items: center;

  margin-top: ${RFValue(10)}px;
`;

const Txt = styled.Text`
  font-size: ${RFValue(14)}px;
  font-weight: 600;
  color: ${COLORS.main};

  text-decoration-line: underline;
`;

export default CurrentOffLineLesson;
