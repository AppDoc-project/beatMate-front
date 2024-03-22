import { useNavigation } from '@react-navigation/native';
import { getRemoteLessonInfo } from 'api/lesson';
import { COLORS } from 'colors';
import { UserInfo } from 'context/UserInfoContext';
import format from 'pretty-format';
import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { Alert } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import styled from 'styled-components';

CurrentOnlineLesson.propTypes = {
  toggleModal: PropTypes.func.isRequired,
  onGoingLessonInfo: PropTypes.shape({
    id: PropTypes.number.isRequired,
    tuteeName: PropTypes.string.isRequired,
    tutorName: PropTypes.string.isRequired,
  }).isRequired,
};

function CurrentOnlineLesson({ toggleModal, onGoingLessonInfo }) {
  const navigation = useNavigation();

  // 화상레슨 정보 불러오기
  const onPressOnlineLesson = () => {
    getRemoteLessonInfo(onGoingLessonInfo.id)
      .then((res) => {
        console.log('화상레슨 정보', format(res.data.object));
        navigation.navigate('videoScreen', { remoteLessonInfo: res.data.object });
      })
      .catch((error) => {
        if (error.response && error.response.data.code === 408) {
          Alert.alert('알림', '로그인을 해주세요.');
          navigation.navigate('loginScreen');
        } else if (error.response && error.response.data.code === 500) {
          Alert.alert('알림', '서버에러가 발생했습니다. 잠시 후 다시 시도해 주세요.');
        } else {
          console.log('화상레슨 정보 불러오기 실패', error);
          Alert.alert('알림', ' 연결을 확인해주세요.');
          navigation.navigate('homeScreen');
        }
      });
  };

  const {
    loginUserInfo: [loginUser],
  } = useContext(UserInfo);

  const isTutor = loginUser.isTutor;

  return (
    <Container>
      <Box>
        <Info>
          <InfoItems>
            {isTutor ? (
              <InfoSub>
                <LabelText>수강생 이름 : </LabelText>
                <ValueText>{onGoingLessonInfo.tuteeName}</ValueText>
              </InfoSub>
            ) : (
              <InfoSub>
                <LabelText>강사 이름 : </LabelText>
                <ValueText>{onGoingLessonInfo.tutorName}</ValueText>
              </InfoSub>
            )}
            <InfoSub>
              <LabelText>레슨 방식 : </LabelText>
              <ValueText>화상 레슨</ValueText>
            </InfoSub>
          </InfoItems>
          <LessonInfoBtn onPress={toggleModal}>
            <LessonInfoBtnText>레슨 정보 확인하기</LessonInfoBtnText>
          </LessonInfoBtn>
        </Info>
        <Guide>
          <OnlineBtn onPress={onPressOnlineLesson}>
            <OnlineBtnText>방 입장하기</OnlineBtnText>
          </OnlineBtn>
          <GuideText>(클릭 시 화상 채팅 방으로 입장됩니다.)</GuideText>
        </Guide>
      </Box>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  background-color: ${COLORS.white};
  justify-content: center;
  align-items: center;
`;

const Box = styled.View`
  width: ${wp(90)}px;
  height: ${hp(18)}px;
  border-width: ${wp(1)}px;
  border-radius: ${RFValue(10)}px;
  border-color: ${COLORS.main};
  padding: ${wp(3)}px;
`;

const Info = styled.View`
  flex-direction: row;
`;

const InfoItems = styled.View``;

const InfoSub = styled.View`
  flex-direction: row;
  margin-bottom: ${hp(1)}px;
  align-items: center;
`;

const LabelText = styled.Text`
  font-size: ${RFValue(14)}px;
  font-weight: 700;
`;

const ValueText = styled.Text`
  font-size: ${RFValue(12)}px;
  font-weight: 600;
`;

const LessonInfoBtn = styled.TouchableOpacity`
  width: auto;
  height: ${hp(4)}px;
  border-radius: ${RFValue(10)}px;
  background-color: ${COLORS.subMiddleblue};

  justify-content: center;
  align-items: center;

  margin-left: ${wp(12)}px;
  margin-top: ${hp(1)}px;
  padding: ${hp(1)}px;
`;

const LessonInfoBtnText = styled.Text`
  font-size: ${RFValue(12)}px;
  font-weight: 500;
  color: ${COLORS.white};
`;

const Guide = styled.View`
  justify-content: center;
  align-items: center;
`;

const OnlineBtn = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  margin: ${hp(1)}px 0 ${hp(1)}px 0;
`;

const OnlineBtnText = styled.Text`
  font-size: ${RFValue(14)}px;
  font-weight: 600;
  color: ${COLORS.main};

  text-decoration-line: underline;
`;

const GuideText = styled.Text`
  font-size: ${RFValue(10)}px;
  font-weight: 600;
  color: ${COLORS.lightgray};
`;

export default CurrentOnlineLesson;
