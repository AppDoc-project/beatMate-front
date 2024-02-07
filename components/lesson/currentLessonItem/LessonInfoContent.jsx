import { COLORS } from 'colors';
import React from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components';

function LessonInfoContent(props) {
  return (
    <Container>
      <Info>
        <InfoItem>
          <LabelText>수강생 이름 : </LabelText>
          <ValueText>김철수</ValueText>
        </InfoItem>
        <InfoItem>
          <LabelText>생년월일 : </LabelText>
          <ValueText>20001112</ValueText>
        </InfoItem>
        <InfoItem>
          <LabelText>레슨 방식 : </LabelText>
          <ValueText>화상 레슨</ValueText>
        </InfoItem>
        <InfoItem>
          <LabelText>숙련도 : </LabelText>
          <ValueText>하</ValueText>
        </InfoItem>
        <InfoItem>
          <LabelText>상담 내용 : </LabelText>
          <ValueText>
            아직 많이 부족한 상태라서 기초부터 다지고 싶어요!
            어라아ㅓㄹ니ㅏㅇ아러니ㅏ더ㅣ아ㅓㄹ니ㅏㅓ러니ㅏ어린아ㅓ린dlkjfs;lkjfa;lskdjfl; dklfjskdfjda;kgk;lk
          </ValueText>
        </InfoItem>
      </Info>
      {/* <Photo>
          <PhotoEx></PhotoEx>
        </Photo> */}
    </Container>
  );
}

const Container = styled.ScrollView`
  flex: 1;
  background-color: ${COLORS.white};
`;

const Info = styled.View``;

const InfoItem = styled.View`
  flex-direction: row;
  margin-bottom: ${RFValue(5)}px;
`;

const LabelText = styled.Text`
  font-size: ${RFValue(14)}px;
  font-weight: 700;
`;

const ValueText = styled.Text`
  flex: 1;
  font-size: ${RFValue(12)}px;
  font-weight: 600;
  align-self: center;
  overflow: hidden;
`;

// const Photo = styled.View`
//   justify-content: center;
//   align-items: center;
//   margin: ${RFValue(5)}px;
// `;

// const PhotoEx = styled.View`
//   border-width: 2px;
//   border-color: ${COLORS.main};
//   height: 80px;
//   width: 200px;
// `;

export default LessonInfoContent;
