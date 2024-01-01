import { ContinueBtn } from '@assets/SignUp/SelectUserScreen';
import ImageUpload from '@components/signup/ImageUpload';
import { useNavigation } from '@react-navigation/native';
import { Auth } from 'context/AuthContext';
import React, { useContext } from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { RFValue } from 'react-native-responsive-fontsize';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { styled } from 'styled-components/native';
import SelectSpecialityTab from '@components/signup/SelectSpecialityTab';

function TutorGetInfoScreen2(props) {
  const {
    tutor: [tutorSignUpRequest, setTutorSignUpRequest],
  } = useContext(Auth);

  const navigation = useNavigation();
  const { authenticationAddress, specialities, selfDescription } = tutorSignUpRequest;

  const onChangeSelfDescription = (text) => setTutorSignUpRequest((prev) => ({ ...prev, selfDescription: text }));

  const onPressPreviousBtn = () => {
    setTutorSignUpRequest((prev) => ({
      ...prev,
      authenticationAddress: [''],
      specialities: [''],
      selfDescription: '',
    }));
    navigation.navigate('tutorGetInfoScreen1');
  };

  const onPressContinueBtn = () => {};

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <Container>
        <AntDesign name="left" size={32} marginLeft={5} onPress={onPressPreviousBtn} />

        <MainInfoTxt1>강사님,</MainInfoTxt1>
        <MainInfoTxt2>
          <Text style={{ color: 'navy' }}>정보</Text>를 입력해주세요!
        </MainInfoTxt2>

        <Info>
          <Component>
            <SelectSpecialityTab />
          </Component>

          <Component>
            <Txt>
              강사 자격을 인증할 수 있는 이미지를 첨부해주세요.{'\n'}
              <Text style={{ color: 'lightgray', fontSize: RFValue(13), fontWeight: 'normal' }}>
                최소 1장 이상, 최대 5장까지 첨부가 가능합니다. (필수){'\n'}해당 이미지들로 강사 자격 심사가 진행될
                예정입니다.{'\n'}
              </Text>
            </Txt>
            <ImageUpload authenticationAddress={authenticationAddress} />
          </Component>

          <Component>
            <Txt>
              자기소개를 입력해주세요.{' '}
              <Text style={{ color: 'lightgray', fontSize: RFValue(13), fontWeight: 'normal' }}> (선택)</Text>
            </Txt>
            <Input
              value={selfDescription}
              onChangeText={onChangeSelfDescription}
              placeholder="( 예시: 안녕하세요~ 바이올리니스트 김땡땡입니다.)"
              placeholderTextColor="lightgray"
            />
          </Component>
        </Info>

        <View style={{ marginBottom: hp(3) }}>
          <ContinueBtn
            fontColor={authenticationAddress && specialities ? 'white' : 'navy'}
            backColor={authenticationAddress && specialities ? 'navy' : 'white'}
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
  font-size: ${RFValue(14)}px;
  font-weight: bold;
  padding: ${RFValue(10)}px;
`;

export default TutorGetInfoScreen2;
