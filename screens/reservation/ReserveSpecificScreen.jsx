import { DeleteReserveBtn } from '@assets/Icons/Buttons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { deleteReserve } from 'api/reservation';
import { COLORS } from 'colors';
import { UserInfo } from 'context/UserInfoContext';
import { mapEnglishToKorean } from 'hook/TutorSpecialityKo';
import format from 'pretty-format';
import React, { useContext } from 'react';
import { Image } from 'react-native';
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
        console.log(format(data));
        navigation.navigate('reserveMainScreen');
      })
      .catch((error) => console.log(format(error)));
  };

  return (
    <Container>
      <Top>
        <AntDesign name="left" size={32} marginLeft={5} marginRight={5} onPress={() => onPressPreviousBtn()} />
        <MainTxt>예약 관리</MainTxt>
      </Top>
      <TutorProfileBox>
        <ProfileImg>
          {myReserveData.tutorProfile && (
            <Image
              source={{
                uri: myReserveData.tutorProfile,
              }}
              style={{ width: wp(20), height: wp(20), borderRadius: 50 }}
            />
          )}
          {!myReserveData.tutorProfile && <FontAwesome name={'user-circle'} size={RFValue(50)} color={'lightgray'} />}
        </ProfileImg>
        <Item>
          <TutorItem>
            <Name>{myReserveData.tutorName} 강사</Name>
            <FieldBox>
              {myReserveData.tutorSpecialities &&
                myReserveData.tutorSpecialities.map((speciality, index) => (
                  <Field key={index}>
                    {mapEnglishToKorean(speciality)}
                    {index < myReserveData.tutorSpecialities.length - 1 && <Gap />}
                  </Field>
                ))}
            </FieldBox>
          </TutorItem>
        </Item>
      </TutorProfileBox>
      <BottomWrapper>
        <Row>
          <NoticeTxt>수강생 이름</NoticeTxt>
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
      {isTutor && (
        <>
          <DeleteReserveBtn
            fontColor={'white'}
            backColor={'navy'}
            width={wp(100)}
            marginBottom={hp(6.15)}
            justifyContent="center"
            onPress={() => {
              onPressDeleteBtn();
            }}
          />
          <TxtWrapper>
            <DeleteInfoTxt>※ 예약 취소는 레슨 시작 10분 전까지 가능합니다.</DeleteInfoTxt>
            <DeleteInfoTxt>※ 10분 전부터는 레슨 상태로 전환됩니다.</DeleteInfoTxt>
          </TxtWrapper>
        </>
      )}
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  background-color: ${COLORS.white};
  align-items: center;
`;

const Top = styled.View`
  top: ${hp(5)};
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const MainTxt = styled.Text`
  font-size: ${RFValue(15)}px;
  font-weight: bold;
  flex: 1;
`;

const TutorProfileBox = styled.View`
  flex-direction: row;
  width: ${wp(100)}px;
  height: ${hp(15)}px;
  padding: ${wp(1)}px;

  border-bottom-width: ${RFValue(1)}px;
  border-bottom-color: ${COLORS.lightgray};
  align-items: center;
`;

const ProfileImg = styled.View`
  border-radius: 50%;
  margin-right: ${wp(2)}px;
`;

const Item = styled.View`
  flex-direction: column;
  justify-content: center;
`;

const TutorItem = styled.View`
  flex-direction: row;
  margin-bottom: ${hp(1)};
  align-items: center;
`;

const Name = styled.Text`
  font-size: ${RFValue(18)}px;
  font-weight: 900;
  margin-bottom: ${wp(1)}px;
`;

const FieldBox = styled.View`
  width: auto;
  height: auto;

  border-width: ${wp(0.4)}px;
  border-radius: ${RFValue(5)}px;
  border-color: ${COLORS.main};

  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-left: ${wp(2)}px;
  padding: ${wp(1)}px;
`;

const Field = styled.Text`
  font-size: ${RFValue(10)}px;
  font-weight: 600;
  color: ${COLORS.main};
`;

const Gap = styled.View`
  width: ${wp(1)}px;
`;

const BottomWrapper = styled.View``;

const Row = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const NoticeTxt = styled.Text``;

const ContentTxt = styled.Text``;

const TxtWrapper = styled.View``;

const DeleteInfoTxt = styled.Text``;

export default ReserveSpecificScreen;
