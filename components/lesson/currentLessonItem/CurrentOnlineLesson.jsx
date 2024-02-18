import { useNavigation } from '@react-navigation/native';
import { COLORS } from 'colors';
import { UserInfo } from 'context/UserInfoContext';
import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import styled from 'styled-components';

CurrentOnlineLesson.propTypes = {
  toggleModal: PropTypes.func.isRequired,
  onGoingLessonInfo: PropTypes.shape({
    tuteeName: PropTypes.string.isRequired,
    tutorName: PropTypes.string.isRequired,
  }).isRequired,
};

function CurrentOnlineLesson({ toggleModal, onGoingLessonInfo }) {
  const navigation = useNavigation();
  const onPressOnlineLesson = () => {
    navigation.navigate('videoScreen');
  };

  const {
    loginUserInfo: [loginUser],
  } = useContext(UserInfo);

  const isTutor = loginUser.isTutor;

  console.log(onGoingLessonInfo);

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
  bakcground-color: ${COLORS.white};
  justify-content: center;
  align-items: center;
`;

const Box = styled.View`
  width: ${wp(90)}px;
  height: ${hp(16)}px;
  border-width: ${RFValue(3)}px;
  border-radius: ${RFValue(10)}px;
  border-color: ${COLORS.main};

  padding: ${RFValue(16)}px;
`;

const Info = styled.View`
  flex-direction: row;
`;

const InfoItems = styled.View``;

const InfoSub = styled.View`
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
  margin-top: ${RFValue(2.5)}px;
`;

const LessonInfoBtn = styled.TouchableOpacity`
  width: ${wp(30)}px;
  height: ${hp(4)}px;
  border-radius: ${RFValue(10)}px;
  background-color: ${COLORS.subMiddleblue};

  justify-content: center;
  align-items: center;

  margin: ${RFValue(5)}px 0 0 ${RFValue(60)}px;
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
  margin: ${RFValue(8)}px 0 ${RFValue(2)}px 0;
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
