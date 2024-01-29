import CurrentNoLesson from '@components/lesson/currentLessonItem/CurrentNoLesson';
import CurrentOffLineLesson from '@components/lesson/currentLessonItem/CurrentOfflineLesson';
import CurrentOnlineLesson from '@components/lesson/currentLessonItem/CurrentOnlineLesson';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from 'colors';
import React from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components';

function LessonMainScreen(props) {
  const navigation = useNavigation();
  const lessonScheduleNavi = () => {
    navigation.navigate('lessonScheduleScreen');
  };
  const feedbackNavi = () => {
    navigation.navigate('tutorFeedbackScreen');
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <Container>
        <FirstSection>
          <MainTxt>현재 진행 중인 레슨</MainTxt>
          {/* <CurrentNoLesson /> */}
          <CurrentOnlineLesson />
          {/* <CurrentOffLineLesson /> */}
        </FirstSection>
        <SecondSection>
          <MainTxt>레슨 피드백지/평가지를 작성해 주세요!</MainTxt>
          <Box>
            <FeedbackBtn onPress={feedbackNavi}>
              <FeedBackTxt>화상 레슨</FeedBackTxt>
            </FeedbackBtn>
          </Box>
        </SecondSection>
        <ThirdSection>
          <MainTxt>레슨 내역을 확인하세요!</MainTxt>
          <ScheduleBtn onPress={lessonScheduleNavi}>
            <Txt>레슨 내역 확인하기</Txt>
          </ScheduleBtn>
        </ThirdSection>
      </Container>
    </SafeAreaView>
  );
}

const Container = styled.View`
  flex: 1;
  bakcground-color: ${COLORS.white};
`;

const MainTxt = styled.Text`
  font-size: ${RFValue(16)}px;
  font-weight: 900;
  align-self: flex-start;
  margin: 0 0 ${RFValue(10)}px ${RFValue(34)}px;
`;

const FirstSection = styled.View`
  flex: 0.3;
  justify-content: center;
  align-items: center;
`;

const SecondSection = styled.View`
  flex: 0.4;
  justify-content: center;
  align-items: center;
`;

const Box = styled.View`
  width: ${wp(80)}px;
  height: ${hp(14)}px;
  border-width: ${RFValue(3)}px;
  border-radius: ${RFValue(10)}px;
  border-color: ${COLORS.main};

  justify-content: center;
  align-items: center;
`;

const FeedbackBtn = styled.TouchableOpacity``;

const FeedBackTxt = styled.Text`
  font-size: ${RFValue(10)}px;
`;

const ThirdSection = styled.View`
  flex: 0.3;
  flex-direction: row;
`;

const ScheduleBtn = styled.TouchableOpacity`
  width: ${wp(25)}px;
  height: ${hp(3)}px;
  border-radius: ${RFValue(5)}px;
  background-color: ${COLORS.subMiddleblue};

  justify-content: center;
  align-items: center;

  margin: ${RFValue(5)}px;
`;

const Txt = styled.Text`
  font-size: ${RFValue(10)}px;
  color: ${COLORS.white};
`;

export default LessonMainScreen;
