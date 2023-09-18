import { FinishBtn } from '@assets/Icons/Buttons';
import { PreviousBtn } from '@assets/SignUp/SelectUserScreen';
import SelectMedicalSpecialityTab from '@components/signup/SelectMedicalSpecialityTab';
import { useNavigation } from '@react-navigation/native';
import { Auth } from 'context/AuthContext';
import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { styled } from 'styled-components/native';

function HospitalGetInfoScreen(props) {
  const {
    doctor: [doctorSignUpRequest, setDoctorSignUpRequest],
  } = useContext(Auth);

  const navigation = useNavigation();
  const { certificateAddress, address, medicalSpeciality, selfDescription } = doctorSignUpRequest;

  const onChangeCertificateAddress = (text) =>
    setDoctorSignUpRequest((prev) => ({ ...prev, certificateAddress: text }));
  const onChangeAddress = (text) => setDoctorSignUpRequest((prev) => ({ ...prev, address: text }));
  const onChangeSelfDescription = (text) => setDoctorSignUpRequest((prev) => ({ ...prev, selfDescription: text }));

  const onPressPreviousBtn = () => {
    setDoctorSignUpRequest((prev) => ({
      ...prev,
      certificateAddress: '',
      address: '',
      medicalSpeciality: '',
      selfDescription: '',
    }));
    navigation.navigate('doctorGetInfoScreen');
  };

  const onPressContinueBtn = () => {
    if (certificateAddress && address && medicalSpeciality) {
      navigation.navigate('loginScreen');
    }
  };

  return (
    <Container>
      <MainInfoTxt1>사용자님,</MainInfoTxt1>
      <MainInfoTxt2>
        <Text style={{ color: 'navy' }}>병원 정보</Text>를 입력해주세요!
      </MainInfoTxt2>

      <Info>
        <Component>
          <Txt>
            자격증 번호를 입력해주세요.
            <Text style={{ color: 'lightgray', fontSize: RFValue(13), fontWeight: 'normal' }}> (필수)</Text>
          </Txt>
          <Input
            value={certificateAddress}
            onChangeText={onChangeCertificateAddress}
            placeholder="( 예시. 01-234-345 )"
            placeholderTextColor="lightgray"
          />
        </Component>

        <Component>
          <Txt>
            주소를 입력해주세요.{' '}
            <Text style={{ color: 'lightgray', fontSize: RFValue(13), fontWeight: 'normal' }}> (필수)</Text>
          </Txt>
          <Input
            value={address}
            onChangeText={onChangeAddress}
            placeholder="( 예시. 서울특별시 마포구 와우산로36 )"
            placeholderTextColor="lightgray"
          />
        </Component>

        <SelectMedicalSpecialityTab />

        <Component>
          <Txt>
            자기소개를 입력해주세요.{' '}
            <Text style={{ color: 'lightgray', fontSize: RFValue(13), fontWeight: 'normal' }}> (선택)</Text>
          </Txt>
          <Input
            value={selfDescription}
            onChangeText={onChangeSelfDescription}
            placeholder="( 예시. 안녕하세요~ 꿈나무의원 의사입니다. )"
            placeholderTextColor="lightgray"
          />
        </Component>
      </Info>

      <View style={{ marginBottom: hp(3) }}>
        <PreviousBtn marginBottom={hp(0)} marginLeft={wp(4.8)} onPress={onPressPreviousBtn} />
        <FinishBtn
          fontColor={certificateAddress && address && medicalSpeciality ? 'white' : 'navy'}
          backColor={certificateAddress && address && medicalSpeciality ? 'navy' : 'white'}
          width={wp(100)}
          justifyContent="center"
          onPress={onPressContinueBtn}
        />
      </View>
    </Container>
  );
}

const Container = styled.View`
  background-color: white;
  flex: 1;
`;

const MainInfoTxt1 = styled.Text`
  font-size: ${RFValue(22)}px;
  font-weight: bold;
  margin-left: ${wp(4.8)}px;
  margin-top: ${hp(10)}px;
`;

const MainInfoTxt2 = styled.Text`
  font-size: ${RFValue(22)}px;
  font-weight: bold;
  margin-left: ${wp(4.8)}px;
  margin-top: ${RFValue(5)}px;
`;

const Info = styled.View`
  margin-top: ${RFValue(20)}px;
  flex: 1;
`;

const Component = styled.View`
  margin-left: ${wp(4.8)}px;
  margin-bottom: ${hp(4)}px;
`;

const Txt = styled.Text`
  font-weight: bold;
  font-size: ${RFValue(16)}px;
`;

const Input = styled.TextInput`
  background-color: transparent;
  position: relative;

  top: ${hp(1.5)}px;
  width: ${wp(90.4)}px;
  height: ${hp(6.28)}px;
  border-radius: 8px;
  border-color: lightgray;
  border-width: 1px;

  padding-left: ${RFValue(4)}px;
  font-size: ${RFValue(16)}px;
  font-weight: bold;
  padding: ${RFValue(10)}px;
`;

export default HospitalGetInfoScreen;
