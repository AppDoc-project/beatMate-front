import { COLORS } from 'colors';
import PropTypes from 'prop-types';
import React from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import styled from 'styled-components';

LessonInfoContent.propTypes = {
  onGoingLessonInfo: PropTypes.shape({
    tuteeName: PropTypes.string.isRequired,
    tutorName: PropTypes.string.isRequired,
    lessonType: PropTypes.string.isRequired,
    memo: PropTypes.string.isRequired,
    startTime: PropTypes.string.isRequired,
    endTime: PropTypes.string.isRequired,
  }).isRequired,
};

function LessonInfoContent({ onGoingLessonInfo }) {
  const formattedStartTime = onGoingLessonInfo.startTime.substring(11, 16);
  const formattedEndTime = onGoingLessonInfo.endTime.substring(11, 16);
  return (
    <Container>
      <Info>
        <InfoItem>
          <LabelText>강사 이름 : </LabelText>
          <ValueText>{onGoingLessonInfo.tutorName}</ValueText>
        </InfoItem>
        <InfoItem>
          <LabelText>수강생 이름 : </LabelText>
          <ValueText>{onGoingLessonInfo.tuteeName}</ValueText>
        </InfoItem>
        <Gap />
        <InfoItem>
          <LabelText>레슨 방식 : </LabelText>
          {onGoingLessonInfo.lessonType === 'FACETOFACE' ? (
            <ValueText>대면 레슨</ValueText>
          ) : (
            <ValueText>화상 레슨</ValueText>
          )}
        </InfoItem>
        <InfoItem>
          <LabelText>레슨 시간 : </LabelText>
          <ValueText>
            {formattedStartTime} - {formattedEndTime}
          </ValueText>
        </InfoItem>
        <Gap />
        <InfoItem>
          <LabelText>특이 사항 : </LabelText>
          <ValueText>{onGoingLessonInfo.memo}</ValueText>
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

const Gap = styled.View`
  height: ${hp(2)}px;
`;

export default LessonInfoContent;
