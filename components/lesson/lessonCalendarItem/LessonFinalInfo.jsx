import { COLORS } from 'colors';
import { mapEnglishToKorean } from 'hook/TutorSpecialityKo';
import PropTypes from 'prop-types';
import React from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import styled from 'styled-components';

LessonFinalInfo.propTypes = {
  lessonData: PropTypes.shape({
    tuteeName: PropTypes.string.isRequired,
    tutorName: PropTypes.string.isRequired,
    lessonType: PropTypes.string.isRequired,
    memo: PropTypes.string,
    startTime: PropTypes.string.isRequired,
    endTime: PropTypes.string.isRequired,
    specialities: PropTypes.array.isRequired,
  }).isRequired,
};

function LessonFinalInfo({ lessonData }) {
  const formattedYear = lessonData.startTime.substring(0, 4);
  const formattedMonth = lessonData.startTime.substring(5, 7);
  const formattedDate = lessonData.startTime.substring(8, 10);
  const formattedStartTime = lessonData.startTime.substring(11, 16);
  const formattedEndTime = lessonData.endTime.substring(11, 16);
  return (
    <Container>
      <Info>
        <InfoItem>
          <LabelText>음악 분야 : </LabelText>

          <Wrapper>
            {lessonData.specialities &&
              lessonData.specialities.map((speciality, index) => (
                <ValueText key={index}>
                  {mapEnglishToKorean(speciality)}
                  {index < lessonData.specialities.length - 1 && <Gap />}
                </ValueText>
              ))}
          </Wrapper>
        </InfoItem>
        <Gap />
        <InfoItem>
          <LabelText>강사 이름 : </LabelText>
          <ValueText>{lessonData.tutorName}</ValueText>
        </InfoItem>
        <InfoItem>
          <LabelText>수강생 이름 : </LabelText>
          <ValueText>{lessonData.tuteeName}</ValueText>
        </InfoItem>
        <Gap />
        <InfoItem>
          <LabelText>레슨 방식 : </LabelText>
          {lessonData.lessonType === 'FACETOFACE' ? <ValueText>대면 레슨</ValueText> : <ValueText>화상 레슨</ValueText>}
        </InfoItem>
        <InfoItem>
          <LabelText>레슨 시간 : </LabelText>
          <ValueText>
            {formattedYear}년 {formattedMonth}월 {formattedDate}일 {formattedStartTime} - {formattedEndTime}
          </ValueText>
        </InfoItem>
        <InfoItem>
          <LabelText>특이 사항 : </LabelText>
          {lessonData.memo ? <ValueText>{lessonData.memo}</ValueText> : <ValueText>없음</ValueText>}
        </InfoItem>
      </Info>
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
  margin-bottom: ${hp(1)}px;
`;

const LabelText = styled.Text`
  font-size: ${RFValue(12)}px;
  font-weight: 700;
`;

const ValueText = styled.Text`
  font-size: ${RFValue(10)}px;
  font-weight: 600;
  align-self: center;
  overflow: hidden;
`;

const Gap = styled.View`
  height: ${hp(2)}px;
`;

const Wrapper = styled.View`
  flex-direction: row;
  align-items: center;
`;

export default LessonFinalInfo;
