import { useNavigation } from '@react-navigation/native';
import { COLORS } from 'colors';
import { UserInfo } from 'context/UserInfoContext';
import { mapEnglishToKorean } from 'hook/TutorSpecialityKo';
import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import styled from 'styled-components/native';

ReserveListItem.propTypes = {
  myReserveData: PropTypes.shape({
    id: PropTypes.number.isRequired, // 예약 id
    tuteeName: PropTypes.string.isRequired, // 예약한 튜티 이름
    tutorName: PropTypes.string.isRequired, //예약한 튜터 이름
    tutorSpecialities: PropTypes.array.isRequired, // 튜터 분야
    lessonStartTime: PropTypes.string.isRequired, //레슨 시작 시간
    lessonEndTime: PropTypes.string.isRequired, // 레슨 종료 시간
    tutorProfile: PropTypes.string.isRequired, //튜터 프로필 경로
    memo: PropTypes.string.isRequired, // 강사가 저장한 메모사항
  }).isRequired,
};

function ReserveListItem({ myReserveData }) {
  const navigation = useNavigation();

  const {
    loginUserInfo: [loginUser],
  } = useContext(UserInfo);

  const isTutor = loginUser.isTutor;

  const formattedLessonDate = myReserveData && myReserveData.lessonStartTime.substring(0, 10).replace(/:/g, '.');
  const formattedStartTime = myReserveData && myReserveData.lessonStartTime.substring(11, 16);
  const formattedEndTime = myReserveData && myReserveData.lessonEndTime.substring(11, 16);

  //예약 상세 페이지로 이동
  const onPressReserveItem = () => {
    navigation.navigate('reserveSpecificScreen', {
      myReserveData,
      formattedLessonDate,
      formattedStartTime,
      formattedEndTime,
    });
  };

  return (
    <MyReserve onPress={onPressReserveItem}>
      <LessonDate>{formattedLessonDate}</LessonDate>
      <LessonTime>
        <TimeWrapper>{formattedStartTime} - </TimeWrapper>
        <TimeWrapper>{formattedEndTime}</TimeWrapper>
        <FieldBox>
          {myReserveData.tutorSpecialities &&
            myReserveData.tutorSpecialities.map((speciality, index) => (
              <Field key={index}>
                {mapEnglishToKorean(speciality)}
                {index < myReserveData.tutorSpecialities.length - 1 && <Gap />}
              </Field>
            ))}
        </FieldBox>
      </LessonTime>
      <InfoTarget>
        {isTutor ? (
          <>
            <InfoTxt>수강생 이름 : </InfoTxt>
            <RealNameTxt>{myReserveData.tuteeName}</RealNameTxt>
          </>
        ) : (
          <>
            <InfoTxt>강사 이름 : </InfoTxt>
            <RealNameTxt>{myReserveData.tutorName}</RealNameTxt>
          </>
        )}
      </InfoTarget>
    </MyReserve>
  );
}

const MyReserve = styled.TouchableOpacity`
  height: auto;
  border-bottom-width: 1px;
  border-bottom-color: ${COLORS.lightgray01};
  padding: ${RFValue(8)}px;
  padding: ${hp(2)}px;
`;

const LessonDate = styled.Text`
  font-size: ${RFValue(12)}px;
  font-weight: bold;
  margin-bottom: ${hp(1)}px;
`;

const LessonTime = styled.View`
  flex-direction: row;
  margin-bottom: ${hp(1)}px;
`;

const TimeWrapper = styled.Text`
  font-size: ${RFValue(18)}px;
  font-weight: bold;
  color: ${COLORS.main};
`;

const FieldBox = styled.View`
  width: auto;
  height: auto;

  border-width: ${wp(0.4)}px;
  border-radius: ${RFValue(5)}px;
  border-color: ${COLORS.subMiddleblue};

  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-left: ${wp(3)}px;
  padding: ${wp(1)}px;
`;

const Field = styled.Text`
  font-size: ${RFValue(10)}px;
  font-weight: 600;
  color: ${COLORS.subMiddleblue};
`;

const Gap = styled.View`
  width: ${wp(1)}px;
`;

const InfoTarget = styled.View`
  flex-direction: row;
  align-items: center;
`;

const InfoTxt = styled.Text`
  font-size: ${RFValue(12)}px;
  font-weight: bold;
`;

const RealNameTxt = styled.Text`
  font-size: ${RFValue(11)}px;
  font-weight: normal;
`;

export default ReserveListItem;
