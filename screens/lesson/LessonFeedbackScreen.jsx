import LessonFinalInfo from '@components/lesson/lessonCalendarItem/LessonFinalInfo';
import { useNavigation, useRoute } from '@react-navigation/native';
import { COLORS } from 'colors';
import { UserInfo } from 'context/UserInfoContext';
import React, { useContext } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
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

  const route = useRoute();
  const { lessonData } = route.params;

  const navigation = useNavigation();

  const onPressPreviousBtn = () => {
    navigation.navigate('lessonScheduleScreen');
  };

  const onPressFeedbackModify = () => {
    navigation.navigate('tutorFeedbackModifyScreen', { lessonData });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <Container>
        <AntDesign name="left" size={32} marginLeft={5} onPress={onPressPreviousBtn} />

        <Header>
          <HeaderTitle>
            <HeaderText1>{lessonData.tuteeName}님의 </HeaderText1>
            <HeaderText2 color={COLORS.main}>레슨 피드백지</HeaderText2>
          </HeaderTitle>
        </Header>
        <Body>
          <TuteeInfo>
            <SubText>레슨 정보</SubText>
            <TuteeInfoBox>
              <LessonFinalInfo lessonData={lessonData} />
            </TuteeInfoBox>
          </TuteeInfo>
          <Feedback>
            <SubText>피드백 내용</SubText>
            <FeedbackBox>
              {lessonData.feedbackYn ? (
                <FeedbackText>{lessonData.feedBack}</FeedbackText>
              ) : (
                <FeedbackText>아직 강사님이 피드백지를 작성하지 않았습니다.</FeedbackText>
              )}
            </FeedbackBox>
          </Feedback>

          {isTutor && (
            <Btn>
              <ModifyBtn onPress={onPressFeedbackModify}>
                <ModifyText>수정하기</ModifyText>
              </ModifyBtn>
            </Btn>
          )}
        </Body>
      </Container>
    </SafeAreaView>
  );
}

const Container = styled(KeyboardAwareScrollView)`
  flex: 1;
  background-color: ${COLORS.white};
`;

const Header = styled.View`
  justify-items: center;
  align-items: center;
  margin-bottom: ${hp(3)}px;
`;

const HeaderTitle = styled.View`
  flex-direction: row;
`;

const HeaderText1 = styled.Text`
  font-size: ${RFValue(18)}px;
  font-weight: 600;
  color: ${(props) => props.color || COLORS.black};
`;

const HeaderText2 = styled.Text`
  font-size: ${RFValue(18)}px;
  font-weight: 900;
  color: ${(props) => props.color || COLORS.black};
`;

const Body = styled.View`
  justify-content: center;
  align-items: center;
`;

const TuteeInfo = styled.View``;

const SubText = styled.Text`
  font-size: ${RFValue(16)}px;
  font-weight: 900;
  margin-bottom: ${hp(1)}px;
`;

const TuteeInfoBox = styled.View`
  width: ${wp(90)}px;
  border-width: ${RFValue(1)}px;
  border-radius: ${RFValue(10)}px;
  border-color: ${COLORS.lightgray};

  padding: ${wp(4)}px;
`;

const Feedback = styled.View`
  margin-bottom: ${hp(5)}px;
  margin-top: ${hp(3)}px;
`;

const FeedbackBox = styled.View`
  width: ${wp(90)}px;
  border-width: ${RFValue(1)}px;
  border-radius: ${RFValue(10)}px;
  border-color: ${COLORS.lightgray};

  padding: ${wp(4)}px;
`;

const FeedbackText = styled.Text`
  font-size: ${RFValue(12)}px;
  flex-shrink: 1;
`;

const Btn = styled.View``;

const ModifyBtn = styled.TouchableOpacity`
  width: ${wp(22)}px;
  height: ${hp(4)}px;
  border-radius: ${RFValue(5)}px;
  background-color: ${COLORS.subMiddleblue};

  justify-content: center;
  align-items: center;
`;

const ModifyText = styled.Text`
  font-size: ${RFValue(12)}px;
  font-weight: 500;
  color: ${COLORS.white};
`;

export default LessonFeedbackScreen;
