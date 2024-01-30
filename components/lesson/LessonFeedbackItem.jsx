import { useNavigation } from '@react-navigation/native';
import { COLORS } from 'colors';
import { UserInfo } from 'context/UserInfoContext';
import React, { useContext } from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import styled from 'styled-components';

function LessonFeedbackItem(props) {
  const navigation = useNavigation();

  const {
    loginUserInfo: [loginUser],
  } = useContext(UserInfo);

  const isTutor = loginUser.isTutor;

  const tuteeFeedbackNavi = () => {
    navigation.navigate('tuteeFeedbackScreen');
  };
  const tutorFeedbackNavi = () => {
    navigation.navigate('tutorFeedbackScreen');
  };
  return (
    <Container>
      <FeedbackBtn onPress={isTutor ? tutorFeedbackNavi : tuteeFeedbackNavi}>
        <Feedback>
          <LessonType>화상 레슨</LessonType>
          <Name>이가나 {isTutor ? '수강생' : '강사'}</Name>
          <Date>2023-12-02</Date>
          <AlertText>{isTutor ? '피드백지' : '평가지'} 미작성</AlertText>
        </Feedback>
      </FeedbackBtn>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
`;

const FeedbackBtn = styled.TouchableOpacity``;

const Feedback = styled.View`
  flex-direction: row;
  width: ${wp(86)}px;
  height: ${hp(7.6)}px;
  border-bottom-width: ${RFValue(1)}px;
  border-bottom-color: ${COLORS.lightgray};

  justify-content: space-around;
  align-items: center;

  padding: ${RFValue(4)}px;
`;

const LessonType = styled.Text`
  font-size: ${RFValue(12)}px;
  font-weight: 500;
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
  font-weight: 500;
  color: red;
`;

export default LessonFeedbackItem;
