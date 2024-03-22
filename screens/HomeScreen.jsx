import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { onGoingLesson } from 'api/lesson';
import { getUpcomingReserve } from 'api/reservation';
import { COLORS } from 'colors';
import React, { useState } from 'react';
import { Alert, Text } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import styled from 'styled-components/native';

function HomeScreen(props) {
  const navigation = useNavigation();

  const onPressLesson = () => {
    navigation.navigate('lesson');
  };

  const onPressCommunity = () => {
    navigation.navigate('community');
  };

  const onPressChat = () => {
    navigation.navigate('chat');
  };

  const onPressSearchtutor = () => {
    navigation.navigate('searchtutor');
  };

  const onPressReservation = () => {
    navigation.navigate('reservation');
  };

  const onPressMypage = () => {
    navigation.navigate('mypage');
  };

  // 현재 진행중인 레슨 정보
  const [onGoingLessonInfo, setOnGoingLessonInfo] = useState(null);

  useFocusEffect(
    React.useCallback(() => {
      onGoingLesson()
        .then((res) => {
          console.log('현재 진행중인 레슨 정보', res.data);
          setOnGoingLessonInfo(res.data.object);
        })
        .catch((error) => {
          if (error.response && error.response.data.code === 500) {
            Alert.alert('알림', '서버에러가 발생했습니다. 잠시 후 다시 시도해 주세요.');
          } else {
            console.log('현재 진행중인 레슨 정보', error);
            Alert.alert('알림', '네트워크 연결을 확인해주세요.');
            navigation.navigate('homeScreen');
          }
        });
    }, []),
  );

  // 다가오는 예약 정보
  const [upComingReserveInfo, setUpComingReserveInfo] = useState(null);

  useFocusEffect(
    React.useCallback(() => {
      getUpcomingReserve()
        .then((res) => {
          console.log('다가오는 예약 정보', res.data.object);
          setUpComingReserveInfo(res.data.object);
        })
        .catch((error) => {
          if (error.response && error.response.data.code === 408) {
            Alert.alert('알림', '로그인을 해주세요.');
            navigation.navigate('loginScreen');
          } else if (error.response && error.response.data.code === 500) {
            Alert.alert('알림', '서버에러가 발생했습니다. 잠시 후 다시 시도해 주세요.');
          } else {
            console.log('다가오는 예약 정보', error);
            Alert.alert('알림', '네트워크 연결을 확인해주세요.');
            navigation.navigate('homeScreen');
          }
        });
    }, []),
  );

  const onGoingFormattedDate =
    onGoingLessonInfo?.startTime.substring(0, 10).replace(/:/g, '.') +
    ' ' +
    onGoingLessonInfo?.startTime.substring(11, 16);

  const upComingFormattedDate =
    upComingReserveInfo?.lessonStartTime.substring(0, 10).replace(/:/g, '.') +
    ' ' +
    upComingReserveInfo?.lessonStartTime.substring(11, 16);

  return (
    <Container>
      <MainTxt>BeatMate</MainTxt>
      <Section>
        <ShowTime onPress={onPressLesson}>
          {upComingReserveInfo && !onGoingLessonInfo && (
            <TotalTxt>
              <TimeTxt style={{ marginBottom: 2 }}>다가오는 레슨</TimeTxt>
              <TimeTxt>
                <Text style={{ color: COLORS.subMiddleblue }}> {upComingFormattedDate}</Text>
              </TimeTxt>
            </TotalTxt>
          )}
          {onGoingLessonInfo && (
            <TotalTxt>
              <TimeTxt style={{ marginBottom: 2 }}>진행중인 레슨</TimeTxt>
              <TimeTxt>
                <Text style={{ color: COLORS.subMiddleblue }}>{onGoingFormattedDate}</Text>
              </TimeTxt>
            </TotalTxt>
          )}
          {!upComingReserveInfo && !onGoingLessonInfo && (
            <TotalTxt>
              <TimeTxt style={{ marginBottom: 2 }}>다가오는 레슨이</TimeTxt>
              <TimeTxt>없습니다.</TimeTxt>
            </TotalTxt>
          )}

          <MaterialCommunityIcons name={'timer-outline'} color={COLORS.main} size={RFValue(50)} />
        </ShowTime>
        <SecondRow>
          <ManageConsult onPress={onPressLesson}>
            <Txt>레슨 관리</Txt>
          </ManageConsult>
          <RightSection>
            <MidBox style={{ marginBottom: RFValue(10) }} onPress={onPressReservation}>
              <Txt>예약 관리</Txt>
            </MidBox>
            <MidBox onPress={onPressSearchtutor}>
              <Txt>강사 찾기</Txt>
            </MidBox>
          </RightSection>
        </SecondRow>
        <ThirdRow>
          <SmallBox onPress={onPressCommunity}>
            <Txt>커뮤니티</Txt>
          </SmallBox>
          <SmallBox onPress={onPressChat}>
            <Txt>채팅</Txt>
          </SmallBox>
          <SmallBox onPress={onPressMypage}>
            <Txt>내 정보</Txt>
          </SmallBox>
        </ThirdRow>
      </Section>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  background-color: ${COLORS.white};
  position: relative;
  align-items: center;
`;

const MainTxt = styled.Text`
  font-size: ${RFValue(35)}px;
  font-weight: bold;
  position: absolute;
  top: ${hp(15)}px;
`;

const Section = styled.View`
  justify-content: center;
  flex: 1;
  margin-top: ${hp(18)}px;
  align-items: center;
`;

const ShowTime = styled.TouchableOpacity`
  border-color: ${COLORS.main};
  border-style: solid;
  border-width: 3px;
  border-radius: 10px;

  width: ${wp(95)}px;
  height: ${hp(13)}px;

  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

const TimeTxt = styled.Text`
  font-weight: bold;
  color: ${COLORS.main};
  font-size: ${RFValue(16)}px;
`;

const TotalTxt = styled.View`
  flex-direction: column;
  align-items: center;
`;

const SecondRow = styled.View`
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  margin-top: ${hp(5)}px;
  width: ${wp(90)}px;
`;

const ManageConsult = styled.TouchableOpacity`
  border-color: ${COLORS.main};
  border-style: solid;
  border-width: 3px;
  border-radius: 10px;
  background-color: ${COLORS.subLightblue};

  width: ${wp(42)}px;
  height: ${wp(42)}px;

  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

const Txt = styled.Text`
  color: ${COLORS.white};
  font-size: ${RFValue(16)}px;
  font-weight: bold;
`;

const RightSection = styled.View``;

const MidBox = styled.TouchableOpacity`
  border-color: ${COLORS.subLightblue};
  border-style: solid;
  border-width: 3px;
  border-radius: 10px;
  background-color: ${COLORS.subMiddleblue};

  width: ${wp(42)}px;
  height: ${wp(18)}px;

  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

const ThirdRow = styled.View`
  margin-top: ${RFValue(40)}px;
  flex-direction: row;
  justify-content: space-between;
  width: ${wp(90)}px;
`;

const SmallBox = styled.TouchableOpacity`
  border-color: ${COLORS.main};
  border-style: solid;
  border-width: 3px;
  border-radius: 10px;
  background-color: ${COLORS.main};

  width: ${wp(27)}px;
  height: ${wp(27)}px;

  justify-content: space-around;
  align-items: center;
`;

export default HomeScreen;
