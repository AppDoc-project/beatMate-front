import { FinishBtn } from '@assets/Icons/Buttons';
import SelectMedicalSpecialityTab from '@components/signup/SelectMedicalSpecialityTab';
import { useNavigation } from '@react-navigation/native';
import { Auth } from 'context/AuthContext';
import React, { useContext } from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { RFValue } from 'react-native-responsive-fontsize';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { styled } from 'styled-components/native';

function HospitalGetInfoScreen2(props) {
  const {
    doctor: [doctorSignUpRequest, setDoctorSignUpRequest],
  } = useContext(Auth);

  const navigation = useNavigation();
  const { medicalSpeciality, selfDescription } = doctorSignUpRequest;

  const onChangeSelfDescription = (text) => setDoctorSignUpRequest((prev) => ({ ...prev, selfDescription: text }));

  const onPressPreviousBtn = () => {
    setDoctorSignUpRequest((prev) => ({
      ...prev,
      medicalSpeciality: '',
      selfDescription: '',
    }));
    navigation.navigate('hospitalGetInfoScreen');
  };

  const onPressContinueBtn = () => {
    if (medicalSpeciality) {
      navigation.navigate('loginScreen');
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <Container>
        <AntDesign name="left" size={32} marginLeft={5} onPress={onPressPreviousBtn} />

        <MainInfoTxt1>사용자님,</MainInfoTxt1>
        <MainInfoTxt2>
          <Text style={{ color: 'navy' }}>병원 정보</Text>를 입력해주세요!
        </MainInfoTxt2>

        <Info>
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
          <FinishBtn
            fontColor={medicalSpeciality ? 'white' : 'navy'}
            backColor={medicalSpeciality ? 'navy' : 'white'}
            width={wp(100)}
            justifyContent="center"
            onPress={onPressContinueBtn}
          />
        </View>
      </Container>
    </SafeAreaView>
  );
}

const Container = styled(KeyboardAwareScrollView)`
  flex: 1;
  background-color: white;
`;

const MainInfoTxt1 = styled.Text`
  font-size: ${RFValue(22)}px;
  font-weight: bold;
  margin-left: ${wp(4.8)}px;
  margin-top: ${hp(2)}px;
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
  height: ${hp(5)}px;
  border-radius: 8px;
  border-color: lightgray;
  border-width: 1px;

  padding-left: ${RFValue(4)}px;
  font-size: ${RFValue(16)}px;
  font-weight: bold;
  padding: ${RFValue(10)}px;
`;

export default HospitalGetInfoScreen2;
