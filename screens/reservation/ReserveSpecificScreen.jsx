import { DeleteReserveBtn } from '@assets/Icons/Buttons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { deleteReserve } from 'api/reservation';
import { COLORS } from 'colors';
import { UserInfo } from 'context/UserInfoContext';
import { mapEnglishToKorean } from 'hook/TutorSpecialityKo';
import format from 'pretty-format';
import React, { useContext } from 'react';
import { Alert, Image } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import styled from 'styled-components';

function ReserveSpecificScreen(props) {
  const {
    loginUserInfo: [loginUser],
  } = useContext(UserInfo);

  const isTutor = loginUser.isTutor;

  const navigation = useNavigation();
  const route = useRoute();
  const { myReserveData, formattedLessonDate, formattedStartTime, formattedEndTime } = route.params;

  const onPressPreviousBtn = () => {
    navigation.goBack();
  };

  const onPressDeleteBtn = () => {
    const reservationId = myReserveData.id;
    deleteReserve(reservationId)
      .then((res) => {
        const { data } = res;
        console.log('예약 삭제 성공', format(data));
        navigation.navigate('reserveMainScreen');
      })
      .catch((error) => {
        if (error.response && error.response.data.code === 408) {
          Alert.alert('알림', '로그인을 해주세요.');
          navigation.navigate('homeScreen');
        } else if (error.response && error.response.data.code === 500) {
          Alert.alert('알림', '서버에러가 발생했습니다. 잠시 후 다시 시도해 주세요.');
        } else {
          console.log('에약 삭제 실패', error);
        }
      });
  };

  console.log(myReserveData);

  return (
    <Container>
      <Top>
        <AntDesign name="left" size={32} marginLeft={5} marginRight={5} onPress={() => onPressPreviousBtn()} />
        <MainTxt>예약 관리</MainTxt>
      </Top>
      <AllWrapper>
        <TutorProfileBox>
          <ProfileImg>
            {myReserveData.tutorProfile && (
              <Image
                source={{
                  uri: myReserveData.tutorProfile,
                }}
                style={{ width: wp(30), height: wp(30), borderRadius: 50 }}
              />
            )}
            {!myReserveData.tutorProfile && <FontAwesome name={'user-circle'} size={wp(30)} color={'lightgray'} />}
          </ProfileImg>
          <TutorItem>
            <FieldBox>
              {myReserveData.tutorSpecialities &&
                myReserveData.tutorSpecialities.map((speciality, index) => (
                  <Field key={index}>
                    {mapEnglishToKorean(speciality)}
                    {index < myReserveData.tutorSpecialities.length - 1 && <Gap />}
                  </Field>
                ))}
            </FieldBox>
            <Name>{myReserveData.tutorName} 강사</Name>
          </TutorItem>
        </TutorProfileBox>
        <BottomWrapper>
          <Row>
            <NoticeTxt>튜티 이름</NoticeTxt>
            <ContentTxt>{myReserveData.tuteeName}</ContentTxt>
          </Row>
          <Row>
            <NoticeTxt>예약 날짜</NoticeTxt>
            <ContentTxt>{formattedLessonDate}</ContentTxt>
          </Row>
          <Row>
            <NoticeTxt>예약 시간</NoticeTxt>
            <ContentTxt>
              {formattedStartTime} - {formattedEndTime}
            </ContentTxt>
          </Row>
        </BottomWrapper>
      </AllWrapper>
      {isTutor && (
        <DeleteInfoTxtAllWrapper>
          <DeleteReserveBtn
            fontColor={'white'}
            backColor={'navy'}
            width={wp(100)}
            justifyContent="center"
            onPress={() => {
              onPressDeleteBtn();
            }}
          />
          <TxtWrapper>
            <DeleteInfoTxt>※ 예약 취소는 레슨 시작 10분 전까지 가능합니다.</DeleteInfoTxt>
            <DeleteInfoTxt>※ 예약 시간 10분 전부터는 레슨 상태로 전환됩니다.</DeleteInfoTxt>
          </TxtWrapper>
        </DeleteInfoTxtAllWrapper>
      )}
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  background-color: ${COLORS.white};
`;

const AllWrapper = styled.View`
  margin-right: ${wp(5)}px;
  margin-left: ${wp(5)}px;
  margin-top: ${hp(10)}px;
  margin-bottom: ${hp(5)}px;
`;

const Top = styled.View`
  top: ${hp(5)};
  flex-direction: row;
  align-items: center;
`;

const MainTxt = styled.Text`
  font-size: ${RFValue(15)}px;
  font-weight: bold;
`;

const TutorProfileBox = styled.View`
  flex-direction: row;
  width: ${wp(100)}px;
  height: ${hp(15)}px;
  padding: ${wp(1)}px;

  margin-bottom: ${hp(3)}px;
`;

const ProfileImg = styled.View`
  border-radius: 50%;
  margin-right: ${wp(8)}px;
`;

const TutorItem = styled.View``;

const Name = styled.Text`
  font-size: ${RFValue(18)}px;
  font-weight: 900;
  margin-bottom: ${wp(1)}px;
`;

const FieldBox = styled.View`
  border-width: ${wp(0.4)}px;
  border-radius: ${RFValue(5)}px;
  border-color: ${COLORS.main};

  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: ${wp(1)}px;
  margin-bottom: ${hp(1)}px;
  margin-top: ${hp(2)}px;
`;

const Field = styled.Text`
  font-size: ${RFValue(10)}px;
  font-weight: 600;
  color: ${COLORS.main};
`;

const Gap = styled.View`
  width: ${wp(1)}px;
`;

const BottomWrapper = styled.View`
  margin-left: ${wp(5)}px;
`;

const Row = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: ${wp(2)}px;
`;

const NoticeTxt = styled.Text`
  font-size: ${RFValue(13)}px;
  font-weight: bold;
`;

const ContentTxt = styled.Text`
  margin-left: ${wp(15)}px;
  font-size: ${RFValue(13)}px;
  font-weight: bold;
  color: ${COLORS.main};
`;

const DeleteInfoTxtAllWrapper = styled.View``;

const TxtWrapper = styled.View`
  align-items: center;
  justify-content: center;
`;

const DeleteInfoTxt = styled.Text`
  color: ${COLORS.gray};
  line-height: ${hp(3)}px;
  font-size: ${RFValue(10)}px;
`;

export default ReserveSpecificScreen;
