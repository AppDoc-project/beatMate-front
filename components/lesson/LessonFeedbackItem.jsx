import { useNavigation } from '@react-navigation/native';
import { COLORS } from 'colors';
import { UserInfo } from 'context/UserInfoContext';
import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import styled from 'styled-components';

LessonFeedbackItem.propTypes = {
  notWriteData: PropTypes.shape({
    lessonType: PropTypes.string.isRequired,
    tuteeName: PropTypes.string.isRequired,
    tutorName: PropTypes.string.isRequired,
    startTime: PropTypes.string.isRequired,
  }).isRequired,
};

function LessonFeedbackItem({ notWriteData }) {
  const navigation = useNavigation();

  const formattedDate = notWriteData.startTime.split(':').join('.').substring(0, 10);

  const {
    loginUserInfo: [loginUser],
  } = useContext(UserInfo);

  const isTutor = loginUser.isTutor;

  const onPressTuteeEvaluation = () => {
    navigation.navigate('tuteeEvaluationScreen');
  };

  const onPressTutorFeedback = () => {
    navigation.navigate('tutorFeedbackScreen');
  };

  return (
    <Container onPress={isTutor ? onPressTutorFeedback : onPressTuteeEvaluation}>
      <Feedback>
        {notWriteData.lessonType === 'FACETOFACE' ? (
          <LessonType>대면 레슨</LessonType>
        ) : (
          <LessonType>화상 레슨</LessonType>
        )}
        {isTutor ? <Name>{notWriteData.tuteeName} 수강생 </Name> : <Name>{notWriteData.tutorName} 강사 </Name>}
        <Date>{formattedDate}</Date>
        <AlertText>{isTutor ? '피드백지' : '평가지'} 미작성</AlertText>
      </Feedback>
    </Container>
  );
}

const Container = styled.TouchableOpacity`
  flex: 1;
  width: ${wp(86)}px;
`;

const Feedback = styled.View`
  flex-direction: row;
  height: auto;
  border-bottom-width: ${RFValue(1)}px;
  border-bottom-color: ${COLORS.lightgray};

  align-items: center;

  padding: ${wp(4)}px;
  justify-content: space-between;
`;

const LessonType = styled.Text`
  font-size: ${RFValue(12)}px;
  font-weight: bold;
  color: ${COLORS.main};
`;

const Name = styled.Text`
  font-size: ${RFValue(12)}px;
  font-weight: 500;
`;

const Date = styled.Text`
  font-size: ${RFValue(12)}px;
  font-weight: 500;
  color: ${COLORS.gray};
`;

const AlertText = styled.Text`
  font-size: ${RFValue(12)}px;
  font-weight: bold;
  color: red;
`;

export default LessonFeedbackItem;
