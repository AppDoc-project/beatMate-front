import LessonFeedbackItem from '@components/lesson/LessonFeedbackItem';
import CurrentNoLesson from '@components/lesson/currentLessonItem/CurrentNoLesson';
import CurrentOffLineLesson from '@components/lesson/currentLessonItem/CurrentOfflineLesson';
import CurrentOnlineLesson from '@components/lesson/currentLessonItem/CurrentOnlineLesson';
import LessonInfoModal from '@components/lesson/currentLessonItem/LessonInfoModal';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { COLORS } from 'colors';
import { UserInfo } from 'context/UserInfoContext';
import React, { useContext, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components';
import { onGoingLesson } from 'api/lesson';
import format from 'pretty-format';

function LessonMainScreen(props) {
  const navigation = useNavigation();

  const onPressLessonSchedule = () => {
    navigation.navigate('lessonScheduleScreen');
  };

  const {
    loginUserInfo: [loginUser],
  } = useContext(UserInfo);

  const isTutor = loginUser.isTutor;

  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const [onGoingLessonInfo, setOnGoingLessonInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        setIsLoading(true);
        try {
          const res = await onGoingLesson();
          console.log('현재 진행중인 레슨 정보', format(res.data));
          setOnGoingLessonInfo(res.data.object);
        } catch (err) {
          console.log(err);
          setIsError(true);
        } finally {
          setIsLoading(false);
        }
      };

      fetchData();
    }, []),
  );

  if (isLoading) {
    return (
      <View>
        <Text>로딩중...</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View>
        <Text>에러 발생</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <Container>
        <FirstSection>
          <CurrentLessonText>현재 진행 중인 레슨</CurrentLessonText>
          {onGoingLessonInfo ? (
            onGoingLessonInfo.lessonType === 'FACETOFACE' ? (
              <CurrentOffLineLesson toggleModal={toggleModal} onGoingLessonInfo={onGoingLessonInfo} />
            ) : (
              <CurrentOnlineLesson toggleModal={toggleModal} onGoingLessonInfo={onGoingLessonInfo} />
            )
          ) : (
            <CurrentNoLesson />
          )}
        </FirstSection>

        <SecondSection>
          <MainTxt>레슨 {isTutor ? '피드백지' : '평가지'}를 작성해 주세요!</MainTxt>
          <Box>
            <ScrollView>
              <LessonFeedbackItem />
              <LessonFeedbackItem />
              <LessonFeedbackItem />
            </ScrollView>
          </Box>
        </SecondSection>

        <ThirdSection>
          <MainTxt>레슨 내역을 확인하세요!</MainTxt>
          <ScheduleBtn onPress={onPressLessonSchedule}>
            <Txt>레슨 내역 확인하기</Txt>
          </ScheduleBtn>
        </ThirdSection>
      </Container>
      {isModalVisible && onGoingLessonInfo && (
        <LessonInfoModal closeModal={toggleModal} onGoingLessonInfo={onGoingLessonInfo} />
      )}
    </SafeAreaView>
  );
}

const Container = styled.View`
  flex: 1;
  background-color: ${COLORS.white};
`;

const MainTxt = styled.Text`
  font-size: ${RFValue(16)}px;
  font-weight: 900;
  align-self: flex-start;
  margin: 0 0 ${RFValue(10)}px ${RFValue(18)}px;
`;

const FirstSection = styled.View`
  flex: 0.3;
  justify-content: center;
  align-items: center;
`;
const CurrentLessonText = styled.Text`
  font-size: ${RFValue(16)}px;
  font-weight: 900;
  align-self: flex-start;
  margin: ${RFValue(40)}px 0 ${RFValue(10)}px ${RFValue(18)}px;
`;

const SecondSection = styled.View`
  flex: 0.4;
  justify-content: center;
  align-items: center;
`;

const Box = styled.View`
  width: ${wp(90)}px;
  height: ${hp(16)}px;
  border-width: ${RFValue(3)}px;
  border-radius: ${RFValue(10)}px;
  border-color: ${COLORS.main};

  justify-content: center;
  align-items: center;

  padding: ${RFValue(2)}px;
`;

const ThirdSection = styled.View`
  flex: 0.3;
  flex-direction: row;
`;

const ScheduleBtn = styled.TouchableOpacity`
  width: ${wp(30)}px;
  height: ${hp(4)}px;
  border-radius: ${RFValue(10)}px;
  background-color: ${COLORS.subMiddleblue};

  justify-content: center;
  align-items: center;

  margin-top: ${RFValue(-5)}px;
  margin-left: ${RFValue(20)}px;
`;

const Txt = styled.Text`
  font-size: ${RFValue(12)}px;
  font-weight: 500;
  color: ${COLORS.white};
`;

export default LessonMainScreen;
