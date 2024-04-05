import { useNavigation } from '@react-navigation/native';
import { COLORS } from 'colors';
import { UserInfo } from 'context/UserInfoContext';
import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { Image } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import styled from 'styled-components';

LessonScheduleItem.propTypes = {
  lessonData: PropTypes.shape({
    id: PropTypes.number.isRequired, // 레슨 아이디
    tutorName: PropTypes.string.isRequired, // 튜터닉네임
    tuteeName: PropTypes.string.isRequired, // 튜티닉네임
    startTime: PropTypes.string.isRequired, // YYYY:MM:DD:HH:mm
    endTime: PropTypes.string.isRequired, // YYYY:MM:DD:HH:mm
    specialities: PropTypes.array, // 튜터 분야
    lessonType: PropTypes.string, // FACETOFACE 또는 REMOTE
    tutorProfile: PropTypes.string, // 튜터 프로필 경로
    tuteeProfile: PropTypes.string, // 튜티 프로필 경로
    feebackYn: PropTypes.bool, // 현재 레슨에 대한 피드백 작성여부
    reviewYn: PropTypes.bool, // 현재 레슨에 대한 리뷰 작성여부
    feedback: PropTypes.string, // 현재 레슨에 대한 피드백(작성여부가 true일 경우)
    review: PropTypes.string, // 현재 레슨에 대한 리뷰(작성여부가 true일 경우)
    memo: PropTypes.string, // 예약에서 작성한 메모
    feedbackTime: PropTypes.string, // 피드백 작성 시간
    reviewTime: PropTypes.string, // 리뷰 작성 시간
  }).isRequired,
};

function LessonScheduleItem({ lessonData }) {
  const {
    loginUserInfo: [loginUser],
  } = useContext(UserInfo);
  const isTutor = loginUser.isTutor;

  const navigation = useNavigation();

  const onPressFeedback = () => {
    navigation.navigate('lessonFeedbackScreen', { lessonData });
  };

  const onPressEvaluation = () => {
    navigation.navigate('lessonEvaluationScreen', { lessonData });
  };

  const formattedStartTime = lessonData.startTime.substring(11, 16);
  const formattedEndTime = lessonData.endTime.substring(11, 16);

  return (
    <Container>
      <Header>
        <Time>
          {formattedStartTime} ~ {formattedEndTime}
        </Time>
        <LessonType>
          {lessonData.lessonType === 'FACETOFACE' ? (
            <LessonText>대면 레슨</LessonText>
          ) : (
            <LessonText>화상 레슨</LessonText>
          )}
        </LessonType>
      </Header>
      <LessonSchedule>
        <LessonScheduleBox>
          <Profile>
            {isTutor ? (
              lessonData.tuteeProfile ? (
                <Image
                  source={{
                    uri: lessonData.tuteeProfile,
                  }}
                  style={{
                    width: wp(10),
                    height: wp(10),
                    borderRadius: 50,
                    borderWidth: 3,
                    borderColor: COLORS.subMiddleblue,
                  }}
                />
              ) : (
                <FontAwesome name={'user-circle'} size={RFValue(25)} color={'lightgray'} />
              )
            ) : lessonData.tutorProfile ? (
              <Image
                source={{
                  uri: lessonData.tutorProfile,
                }}
                style={{
                  width: wp(10),
                  height: wp(10),
                  borderRadius: 50,
                  borderWidth: 3,
                  borderColor: COLORS.subMiddleblue,
                }}
              />
            ) : (
              <FontAwesome name={'user-circle'} size={RFValue(25)} color={'lightgray'} />
            )}

            <Name>{isTutor ? lessonData.tuteeName + ' 수강생' : lessonData.tutorName + ' 강사'}</Name>
          </Profile>
          <BtnS>
            <LessonBtn onPress={onPressFeedback}>
              <LessonText>피드백지</LessonText>
            </LessonBtn>
            <LessonBtn2 onPress={onPressEvaluation}>
              <LessonText>평가지</LessonText>
            </LessonBtn2>
          </BtnS>
        </LessonScheduleBox>
      </LessonSchedule>
    </Container>
  );
}

const Container = styled.View`
  margin-bottom: ${hp(2)}px;
  margin-top: ${hp(3)}px;
`;

const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-left: ${wp(5)}px;
  margin-right: ${wp(5)}px;
`;

const Time = styled.Text`
  font-size: ${RFValue(16)}px;
  font-weight: 600;
`;

const LessonType = styled.View`
  width: ${wp(20)}px;
  height: ${hp(3.5)}px;
  border-radius: ${RFValue(15)}px;
  background-color: ${COLORS.subMiddleblue};

  justify-content: center;
  align-items: center;
`;

const LessonText = styled.Text`
  color: ${COLORS.white};
`;

const LessonSchedule = styled.View`
  justify-content: center;
  align-items: center;
  margin: ${RFValue(10)}px;
`;

const LessonScheduleBox = styled.View`
  width: ${wp(90)}px;
  border-width: ${RFValue(1)}px;
  border-color: ${COLORS.lightgray};
  border-radius: ${RFValue(10)}px;
  padding: ${wp(2)}px;
`;

const Profile = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  margin-left: ${wp(2)}px;
  margin-top: ${hp(1)}px;
`;

const Name = styled.Text`
  font-size: ${RFValue(14)}px;
  font-weight: 600;
  align-self: center;
  flex-shrink: 1;
  margin-left: ${wp(2)}px;
`;

const BtnS = styled.View`
  flex-direction: row;
  margin-top: ${hp(2)}px;
  margin-bottom: ${hp(1)}px;
  margin-left: ${wp(11)}px;
`;

const LessonBtn = styled.TouchableOpacity`
  width: ${wp(18)}px;
  height: ${hp(3.5)}px;
  border-radius: ${RFValue(5)}px;
  background-color: ${COLORS.subLightblue};

  justify-content: center;
  align-items: center;
`;

const LessonBtn2 = styled.TouchableOpacity`
  width: ${wp(18)}px;
  height: ${hp(3.5)}px;
  border-radius: ${RFValue(5)}px;
  background-color: ${COLORS.subLightblue};

  justify-content: center;
  align-items: center;
  margin-left: ${wp(5)}px;
`;

export default LessonScheduleItem;
