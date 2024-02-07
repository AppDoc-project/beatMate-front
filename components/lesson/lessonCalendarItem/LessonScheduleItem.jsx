import { useNavigation } from '@react-navigation/native';
import { COLORS } from 'colors';
import { UserInfo } from 'context/UserInfoContext';
import React, { useContext } from 'react';
import { Image } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import styled from 'styled-components';

function LessonScheduleItem(props) {
  const {
    loginUserInfo: [loginUser],
  } = useContext(UserInfo);
  const isTutor = loginUser.isTutor;

  const navigation = useNavigation();

  const onPressFeedback = () => {
    navigation.navigate('lessonFeedbackScreen');
  };

  const onPressEvaluation = () => {
    navigation.navigate('lessonEvaluationScreen');
  };

  return (
    <Container>
      <Header>
        <Time>10:00 ~ 12:00</Time>
        <LessonType>
          <LessonText>화상 레슨</LessonText>
        </LessonType>
      </Header>
      <LessonSchedule>
        <LessonScheduleBox>
          <Profile>
            <ProfileImg>
              <Image source={require('assets/profile.png')} style={{ width: 40, height: 40 }} />
            </ProfileImg>
            <Name>나나나 {isTutor ? '수강생' : '강사'}</Name>
          </Profile>
          <BtnS>
            <LessonBtn onPress={onPressFeedback}>
              <LessonText>피드백지</LessonText>
            </LessonBtn>
            <LessonBtn onPress={onPressEvaluation}>
              <LessonText>평가지</LessonText>
            </LessonBtn>
            <LessonBtn>
              <LessonText>녹화 영상</LessonText>
            </LessonBtn>
          </BtnS>
        </LessonScheduleBox>
      </LessonSchedule>
    </Container>
  );
}

const Container = styled.View`
  margin-bottom: ${RFValue(10)}px;
`;

const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin: 0 ${RFValue(20)}px;
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

  margin-top: ${RFValue(-3)}px;
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
  padding: ${RFValue(10)}px;
`;

const Profile = styled.View`
  flex-direction: row;
`;

const ProfileImg = styled.View`
  width: ${RFValue(20)}px;
  height: ${RFValue(20)}px;
  border-radius: 50%;
  margin: 0 ${RFValue(10)}px;
`;

const Name = styled.Text`
  font-size: ${RFValue(14)}px;
  font-weight: 600;
  margin: ${RFValue(8)}px ${RFValue(10)}px;
  align-self: center;
`;

const BtnS = styled.View`
  flex-direction: row;
  justify-content: space-evenly;
  margin-top: ${RFValue(14)}px;
`;

const LessonBtn = styled.TouchableOpacity`
  width: ${wp(18)}px;
  height: ${hp(3.5)}px;
  border-radius: ${RFValue(5)}px;
  background-color: ${COLORS.subLightblue};

  justify-content: center;
  align-items: center;
`;

export default LessonScheduleItem;
