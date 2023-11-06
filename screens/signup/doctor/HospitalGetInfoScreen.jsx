import { ContinueBtn } from '@assets/SignUp/SelectUserScreen';
import { useNavigation } from '@react-navigation/native';
import { Auth } from 'context/AuthContext';
import * as ImagePicker from 'expo-image-picker';
import React, { useContext, useState } from 'react';
import { View, Text, Image, SafeAreaView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { RFValue } from 'react-native-responsive-fontsize';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { styled } from 'styled-components/native';

function HospitalGetInfoScreen(props) {
  const {
    doctor: [doctorSignUpRequest, setDoctorSignUpRequest],
  } = useContext(Auth);

  const navigation = useNavigation();
  const { certificateAddress, address, hospitalName } = doctorSignUpRequest;

  const onChangeAddress = (text) => setDoctorSignUpRequest((prev) => ({ ...prev, address: text }));
  const onChangeHospitalName = (text) => setDoctorSignUpRequest((prev) => ({ ...prev, hospitalName: text }));

  const uploadPdf = () => {};

  const onPressPreviousBtn = () => {
    setDoctorSignUpRequest((prev) => ({
      ...prev,
      certificateAddress: '',
      address: '',
      hospitalName: '',
    }));
    navigation.navigate('doctorGetInfoScreen');
  };

  const onPressContinueBtn = () => {
    if (certificateAddress && address && hospitalName) {
      navigation.navigate('hospitalGetInfoScreen2');
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
          <Component>
            <Txt>
              자격증 사진 + 사업자 등록증 / 재직증명서를{'\n'}업로드해주세요.{'\n'}
              <Text style={{ color: 'lightgray', fontSize: RFValue(13), fontWeight: 'normal' }}>
                하나의 PDF 파일로 만들어서 업로드해주세요. (필수)
              </Text>
            </Txt>

            <PdfUp onPress={uploadPdf}>
              <Text>📂 파일 올리기</Text>
            </PdfUp>
          </Component>

          <Component>
            <Txt>
              병원 이름을 입력해주세요.{' '}
              <Text style={{ color: 'lightgray', fontSize: RFValue(13), fontWeight: 'normal' }}> (필수)</Text>
            </Txt>
            <Input value={hospitalName} onChangeText={onChangeHospitalName} />
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
        </Info>

        <View style={{ marginBottom: hp(3) }}>
          <ContinueBtn
            fontColor={certificateAddress && address ? 'white' : 'navy'}
            backColor={certificateAddress && address ? 'navy' : 'white'}
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

const PdfUp = styled.TouchableOpacity``;

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

export default HospitalGetInfoScreen;
