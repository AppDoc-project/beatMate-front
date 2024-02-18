import { COLORS } from 'colors';
import { UserInfo } from 'context/UserInfoContext';
import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import styled from 'styled-components';

CurrentOffLineLesson.propTypes = {
  toggleModal: PropTypes.func.isRequired,
  onGoingLessonInfo: PropTypes.shape({
    tuteeName: PropTypes.string.isRequired,
    tutorName: PropTypes.string.isRequired,
  }).isRequired,
};

function CurrentOffLineLesson({ toggleModal, onGoingLessonInfo }) {
  const {
    loginUserInfo: [loginUser],
  } = useContext(UserInfo);

  const isTutor = loginUser.isTutor;

  return (
    <Container>
      <Box>
        <Info>
          <InfoItems>
            <InfoSub>
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
            </InfoSub>
            <InfoSub>
              <LabelText>레슨 방식 : </LabelText>
              <ValueText>대면 레슨</ValueText>
            </InfoSub>
          </InfoItems>
          <LessonInfoBtn onPress={toggleModal}>
            <LessonInfoBtnText>레슨 정보 확인하기</LessonInfoBtnText>
          </LessonInfoBtn>
        </Info>
        <Guide>
          <Txt>레슨 장소로 가주세요.</Txt>
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

const Txt = styled.Text`
  font-size: ${RFValue(14)}px;
  font-weight: 600;
  color: ${COLORS.main};

  text-decoration-line: underline;
`;

export default CurrentOffLineLesson;
