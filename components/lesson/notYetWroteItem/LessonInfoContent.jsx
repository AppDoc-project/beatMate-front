import { COLORS } from 'colors';
import PropTypes from 'prop-types';
import React from 'react';
import { SafeAreaView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { RFValue } from 'react-native-responsive-fontsize';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import styled from 'styled-components';

LessonInfoContent.propTypes = {
  notWriteData: PropTypes.shape({
    tuteeName: PropTypes.string.isRequired,
    tutorName: PropTypes.string.isRequired,
    lessonType: PropTypes.string.isRequired,
    memo: PropTypes.string.isRequired,
    startTime: PropTypes.string.isRequired,
    endTime: PropTypes.string.isRequired,
  }).isRequired,
};

function LessonInfoContent({ notWriteData }) {
  const formattedYear = notWriteData.startTime.substring(0, 4);
  const formattedMonth = notWriteData.startTime.substring(5, 7);
  const formattedDate = notWriteData.startTime.substring(8, 10);
  const formattedStartTime = notWriteData.startTime.substring(11, 16);
  const formattedEndTime = notWriteData.endTime.substring(11, 16);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <Container>
        <Info>
          <InfoItem>
            <LabelText>수강생 이름 : </LabelText>
            <ValueText>{notWriteData.tuteeName}</ValueText>
          </InfoItem>
          <Gap />
          <InfoItem>
            <LabelText>레슨 방식 : </LabelText>
            {notWriteData.lessonType === 'FACETOFACE' ? (
              <ValueText>대면 레슨</ValueText>
            ) : (
              <ValueText>화상 레슨</ValueText>
            )}
          </InfoItem>
          <InfoItem>
            <LabelText>레슨 시간 : </LabelText>
            <ValueText>
              {formattedYear}년 {formattedMonth}월 {formattedDate}일 {formattedStartTime} - {formattedEndTime}
            </ValueText>
          </InfoItem>
          <Gap />
          <InfoItemEnd>
            <LabelText>특이 사항 : </LabelText>
            <ValueText>{notWriteData.memo ? notWriteData.memo : '없음'}</ValueText>
          </InfoItemEnd>
        </Info>
      </Container>
    </SafeAreaView>
  );
}

const Container = styled(KeyboardAwareScrollView)`
  flex: 1;
  background-color: ${COLORS.white};
`;

const Info = styled.View``;

const InfoItem = styled.View`
  flex-direction: row;
  margin-bottom: ${hp(1)}px;
`;

const InfoItemEnd = styled.View`
  flex-direction: row;
`;

const LabelText = styled.Text`
  font-size: ${RFValue(13)}px;
  font-weight: 700;
`;

const ValueText = styled.Text`
  flex: 1;
  font-size: ${RFValue(11)}px;
  font-weight: 600;
  align-self: center;
  overflow: hidden;
`;

const Gap = styled.View`
  height: ${hp(2)}px;
`;

export default LessonInfoContent;
