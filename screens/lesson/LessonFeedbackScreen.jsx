import LessonInfoContent from '@components/lesson/currentLessonItem/LessonInfoContent';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from 'colors';
import { UserInfo } from 'context/UserInfoContext';
import React, { useContext } from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { SafeAreaView } from 'react-native-safe-area-context';
import AntDesign from 'react-native-vector-icons/AntDesign';
import styled from 'styled-components';

function LessonFeedbackScreen(props) {
  const {
    loginUserInfo: [loginUser],
  } = useContext(UserInfo);
  const isTutor = loginUser.isTutor;

  const navigation = useNavigation();

  const onPressPreviousBtn = () => {
    navigation.navigate('lessonScheduleScreen');
  };

  const onPressFeedbackModify = () => {
    navigation.navigate('tutorFeedbackScreen');
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <Container>
        <Header>
          <AntDesign name="left" size={32} marginLeft={5} onPress={onPressPreviousBtn} />
          <HeaderTitle>
            <HeaderText>OO님의 </HeaderText>
            <HeaderText color={COLORS.main}>레슨 피드백지</HeaderText>
          </HeaderTitle>
        </Header>
        <TuteeInfo>
          <SubText>수강생 정보</SubText>
          <TuteeInfoBox>
            <LessonInfoContent />
          </TuteeInfoBox>
        </TuteeInfo>
        <Feedback>
          <SubText>피드백 내용</SubText>
          <FeedbackBox>
            <FeedbackText>강사가 작성해 준 피드백 내용이 여기에 나옴</FeedbackText>
          </FeedbackBox>
        </Feedback>
        <LessonInfo>
          <LessonInfoBox>
            <LessonInfoItem>
              <LabelText>레슨일 : </LabelText>
              <ValueText>2023년 00월 00일</ValueText>
            </LessonInfoItem>
            <LessonInfoItem>
              <LabelText>강사 이름 : </LabelText>
              <ValueText>김철수</ValueText>
            </LessonInfoItem>
            <LessonInfoItem>
              <LabelText>음악분야 : </LabelText>
              <ValueText>현악기 바이올린</ValueText>
            </LessonInfoItem>
          </LessonInfoBox>
        </LessonInfo>
        {isTutor && (
          <Btn>
            <ModifyBtn onPress={onPressFeedbackModify}>
              <ModifyText>수정하기</ModifyText>
            </ModifyBtn>
          </Btn>
        )}
      </Container>
    </SafeAreaView>
  );
}

const Container = styled.View`
  flex: 1;
  background-color: ${COLORS.white};
`;

const Header = styled.View`
  flex-direction: row;
`;

const HeaderTitle = styled.View`
  flex-direction: row;
`;

const HeaderText = styled.Text`
  font-size: ${RFValue(20)}px;
  font-weight: 900;
  color: ${(props) => props.color || COLORS.black};
`;

const TuteeInfo = styled.View`
  margin: ${RFValue(20)}px 0 ${RFValue(10)}px ${RFValue(18)}px;
`;

const SubText = styled.Text`
  font-size: ${RFValue(18)}px;
  font-weight: 900;
  margin-bottom: ${RFValue(5)}px;
`;

const TuteeInfoBox = styled.View`
  height: ${hp(25)}px;
  width: ${wp(90)}px;
  border-width: ${RFValue(1)}px;
  border-radius: ${RFValue(10)}px;
  border-color: ${COLORS.lightgray};

  padding: ${RFValue(10)}px;
`;

const Feedback = styled.View`
  margin: ${RFValue(10)}px ${RFValue(18)}px;
`;

const FeedbackBox = styled.View`
  height: ${hp(25)}px;
  width: ${wp(90)}px;
  border-width: ${RFValue(1)}px;
  border-radius: ${RFValue(10)}px;
  border-color: ${COLORS.lightgray};

  padding: ${RFValue(10)}px;
`;

const FeedbackText = styled.Text`
  font-size: ${RFValue(12)}px;
`;

const LessonInfo = styled.View`
  margin: ${RFValue(10)}px ${RFValue(18)}px;
`;

const LessonInfoBox = styled.View`
  height: ${hp(11)}px;
  width: ${wp(90)}px;
  border-width: ${RFValue(1)}px;
  border-radius: ${RFValue(10)}px;
  border-color: ${COLORS.lightgray};

  padding: ${RFValue(10)}px;
`;

const LessonInfoItem = styled.View`
  flex-direction: row;
  margin-bottom: ${RFValue(5)}px;
`;

const LabelText = styled.Text`
  font-size: ${RFValue(14)}px;
  font-weight: 700;
`;

const ValueText = styled.Text`
  font-size: ${RFValue(12)}px;
  font-weight: 600;
  align-self: center;
`;

const Btn = styled.View`
  flex: 0.07;
`;

const ModifyBtn = styled.TouchableOpacity`
  width: ${wp(22)}px;
  height: ${hp(4)}px;
  border-radius: ${RFValue(5)}px;
  background-color: ${COLORS.subMiddleblue};
  margin-left: ${RFValue(250)}px;

  justify-content: center;
  align-items: center;
`;

const ModifyText = styled.Text`
  font-size: ${RFValue(12)}px;
  font-weight: 500;
  color: ${COLORS.white};
`;

export default LessonFeedbackScreen;
