import LessonFeedbackItem from '@components/lesson/LessonFeedbackItem';
import CurrentNoLesson from '@components/lesson/currentLessonItem/CurrentNoLesson';
import CurrentOffLineLesson from '@components/lesson/currentLessonItem/CurrentOfflineLesson';
import CurrentOnlineLesson from '@components/lesson/currentLessonItem/CurrentOnlineLesson';
import LessonInfoModal from '@components/lesson/currentLessonItem/LessonInfoModal';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { notWriteLesson, onGoingLesson } from 'api/lesson';
import { COLORS } from 'colors';
import { UserInfo } from 'context/UserInfoContext';
import format from 'pretty-format';
import React, { useContext, useState } from 'react';
import { Alert, Text, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import styled from 'styled-components';

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

  const reGetChatList = () => {
    setIsLoading(true);
    onGoingLesson()
      .then((res) => {
        console.log(format(res.data));
        setOnGoingLessonInfo(res.data.object);
        setIsLoading(false);
      })
      .catch((error) => {
        if (error.response && error.response.data.code === 408) {
          Alert.alert('알림', '로그인을 해주세요.');
          navigation.navigate('homeScreen');
        } else {
          console.log(format(error));
          setIsError(true);
        }
        setIsLoading(false);
      });
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

  //아직 입력하지 않은 정보들
  const [notWriteDatas, setNotWriteData] = useState(null);
  const [isWriteLoading, setIsWriteLoading] = useState(false);
  const [isWriteError, setWriteIsError] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      setIsWriteLoading(true);
      notWriteLesson()
        .then((res) => {
          console.log('안쓴 피드백지', format(res.data));
          setNotWriteData(res.data);
          setIsWriteLoading(false);
        })

        .catch((error) => {
          if (error.response && error.response.data.code === 408) {
            Alert.alert('알림', '로그인을 해주세요.');
            navigation.navigate('homeScreen');
          } else {
            console.log('안쓴 피드백지 가져오기 실패', error);
            setWriteIsError(true);
          }
          setIsWriteLoading(false);
        });
    }, []),
  );

  if (isLoading || isWriteLoading) {
    return (
      <View>
        <Text>로딩중...</Text>
      </View>
    );
  }

  if (isError || isWriteError) {
    return (
      <View>
        <Text>에러 발생</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <Container>
        <RedoWrapper onPress={reGetChatList}>
          <MaterialIcons name="refresh" size={35} marginTop={hp(2)} marginBottom={hp(2)} marginRight={wp(2)} />
        </RedoWrapper>
        <CurrentLessonText>현재 진행 중인 레슨</CurrentLessonText>
        <FirstSection>
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

        <MainTxt>
          <SubText>미작성</SubText>된 레슨 {isTutor ? '피드백지' : '평가지'}를 작성해 주세요!
        </MainTxt>
        <SecondSection>
          {notWriteDatas && notWriteDatas.data.length > 0 ? (
            <NotYetListScrollView>
              {notWriteDatas.data.map((notWriteData) => (
                <LessonFeedbackItem key={notWriteData.id} notWriteData={notWriteData} />
              ))}
            </NotYetListScrollView>
          ) : (
            <NotYetListView>
              <NotYetText>모든 {isTutor ? '피드백지' : '평가지'}를 작성하셨습니다.</NotYetText>
            </NotYetListView>
          )}
        </SecondSection>

        <ThirdSection>
          <MainTxt2>레슨 내역을 확인하세요!</MainTxt2>
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

const RedoWrapper = styled.TouchableOpacity`
  flex-direction: row-reverse;
  margin-left: ${wp(5)}px;
`;

const CurrentLessonText = styled.Text`
  font-size: ${RFValue(16)}px;
  font-weight: 900;
  align-self: flex-start;
  margin-left: ${wp(6)}px;
`;

const FirstSection = styled.View`
  justify-content: center;
  align-items: center;
  margin-top: ${hp(10)}px;
`;

const MainTxt = styled.Text`
  font-size: ${RFValue(16)}px;
  font-weight: 900;
  align-self: flex-start;
  margin-left: ${wp(6)}px;
  margin-top: ${hp(13)}px;
`;

const SubText = styled.Text`
  color: red;
`;

const SecondSection = styled.View`
  justify-content: center;
  align-items: center;
  margin-top: ${hp(1)}px;
  margin-left: ${wp(6)}px;

  width: ${wp(90)}px;
  height: ${hp(30)}px;
  border-width: ${RFValue(3)}px;
  border-radius: ${RFValue(10)}px;
  border-color: ${COLORS.main};

  justify-content: center;
  align-items: center;
`;

const NotYetListScrollView = styled.ScrollView`
  flex-grow: 1;
`;

const NotYetListView = styled.View`
  align-items: center;
  justify-content: center;
`;

const NotYetText = styled.Text`
  font-size: ${RFValue(14)}px;
  font-weight: 600;
  color: ${COLORS.main};

  text-decoration-line: underline;
`;

const ThirdSection = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: ${hp(5)}px;
  width: ${wp(90)}px;
  justify-content: space-between;
`;

const MainTxt2 = styled.Text`
  font-size: ${RFValue(16)}px;
  font-weight: 900;

  margin-left: ${wp(6)}px;
`;

const ScheduleBtn = styled.TouchableOpacity`
  border-radius: ${RFValue(10)}px;
  background-color: ${COLORS.subMiddleblue};

  align-items: center;
  padding: ${wp(2)}px;
`;

const Txt = styled.Text`
  font-size: ${RFValue(12)}px;
  font-weight: 500;
  color: ${COLORS.white};
`;

export default LessonMainScreen;
