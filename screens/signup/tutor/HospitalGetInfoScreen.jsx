import Postcode from '@actbase/react-daum-postcode';
import { ContinueBtn } from '@assets/SignUp/SelectUserScreen';
import { useNavigation } from '@react-navigation/native';
import { Auth } from 'context/AuthContext';
import * as ImagePicker from 'expo-image-picker';
import React, { useContext, useState } from 'react';
import { View, Text, Image, SafeAreaView, TouchableOpacity } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Modal from 'react-native-modal';
import { RFValue } from 'react-native-responsive-fontsize';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { styled } from 'styled-components/native';

function HospitalGetInfoScreen(props) {
  const [isModalVisible, setModalVisible] = useState(false);

  const {
    doctor: [doctorSignUpRequest, setDoctorSignUpRequest],
  } = useContext(Auth);

  const navigation = useNavigation();
  const { certificateAddress, address, hospitalName } = doctorSignUpRequest;
  const [extraAddress, setExtraAddress] = useState('');

  const onChangeAddress = (text) => setDoctorSignUpRequest((prev) => ({ ...prev, address: text }));
  const onChangeHospitalName = (text) => setDoctorSignUpRequest((prev) => ({ ...prev, hospitalName: text }));
  const onChangeExtraAddress = (text) => setExtraAddress(text);
  const getTogetherAddress = () => {
    onChangeAddress(address + ' ' + extraAddress);
  };

  //자격증 사진 업로드
  //사진 이미지 주소
  const [imgUrl, setImgUrl] = useState('');
  //권한 요청
  const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions();

  const uploadImage = async () => {
    //권한이 없다면 물어보고, 승인X하면 함수 종료
    if (!status?.granted) {
      const permission = await requestPermission();
      if (!permission.granted) {
        return null;
      }
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 1,
      aspect: [1, 1],
    });
    if (result.canceled) {
      return null; //이미지 업로드 취소한 경우
    }
    //이미지 업로드 결과 및 이미지 경로 업데이트
    console.log(result);
    setImgUrl(result.uri);
  };

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
    getTogetherAddress();
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
                해당 되는 사진들을 모두 업로드해주세요. (필수)
              </Text>
            </Txt>

            <ImageUp onPress={uploadImage}>
              <Text>📂 이미지 업로드하기</Text>
              {imgUrl !== '' && <Image source={{ uri: imgUrl }} />}
            </ImageUp>
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
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <Text>우편번호찾기</Text>
            </TouchableOpacity>
            <AddressSpace>
              <Text style={{ fontSize: RFValue(14), fontWeight: 'bold' }}>{address}</Text>
            </AddressSpace>
            <Modal isVisible={isModalVisible}>
              <Postcode
                style={{ width: 380, height: 600 }}
                jsOptions={{ animation: true, hideMapBtn: true }}
                onSelected={(data) => {
                  onChangeAddress(data.address); // 주소 선택 시 선택된 주소 업데이트
                  setModalVisible(false);
                }}
              />
            </Modal>
            <Input
              value={extraAddress} // 주소 입력 필드에 선택된 주소 또는 기존 주소 표시
              onChangeText={onChangeExtraAddress}
              placeholder="상세주소를 입력하세요."
              placeholderTextColor="lightgray"
              editable={address !== null}
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

const ImageUp = styled.TouchableOpacity`
  margin-top: ${hp(2)}px;
`;

const Component = styled.View`
  margin-left: ${wp(4.8)}px;
  margin-bottom: ${hp(4)}px;
`;

const Txt = styled.Text`
  font-weight: bold;
  font-size: ${RFValue(16)}px;
`;

const AddressSpace = styled.View`
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
  font-size: ${RFValue(14)}px;
  font-weight: bold;
  padding: ${RFValue(10)}px;
`;

export default HospitalGetInfoScreen;
