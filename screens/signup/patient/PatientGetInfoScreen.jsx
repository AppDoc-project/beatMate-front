import { PreviousBtn, ContinueBtn } from '@assets/SignUp/SelectUserScreen';
import { useNavigation } from '@react-navigation/native';
import { Auth } from 'context/AuthContext';
import { format as prettyFormat } from 'pretty-format';
import React, { useContext, useEffect } from 'react';
import { Alert, Text } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { styled } from 'styled-components/native';

function PatientGetInfoScreen(props) {
  const {
    patient: [patientSignUpRequest, setPatientSignUpRequest],
  } = useContext(Auth);

  const navigation = useNavigation();
  const { name, contact, email, password } = patientSignUpRequest;

  const onChangeName = (text) => setPatientSignUpRequest((prev) => ({ ...prev, name: text }));
  const onChangeContact = (text) => setPatientSignUpRequest((prev) => ({ ...prev, contact: text }));
  const onChangeEmail = (text) => setPatientSignUpRequest((prev) => ({ ...prev, email: text }));
  const onChangePassword = (text) => setPatientSignUpRequest((prev) => ({ ...prev, password: text }));

  const onPressPreviousBtn = () => {
    setPatientSignUpRequest((prev) => ({
      ...prev,
      name: '',
      contact: '',
      email: '',
      password: '',
    }));
    navigation.navigate('loginScreen');
  };

  const onPressContinueBtn = () => {
    if (name.length < 2 || name.length > 10) {
      Alert.alert('알림', '이름은 2자 이상 10자 이하로 빈칸 없이 입력해주세요.');
    } else if (contact.length !== 11) {
      Alert.alert('알림', '연락처는 11자여야 합니다.');
    } else if (!email || email.length > 50 || !email.includes('@')) {
      Alert.alert('알림', '이메일은 최대 50자이며 이메일 형식이어야 합니다.');
    } else if (
      !password ||
      password.length < 8 ||
      password.length > 18 ||
      !/[a-z]/.test(password) ||
      !/\d/.test(password)
    ) {
      Alert.alert('알림', '비밀번호는 최소 8자, 최대 18자, 영문 소문자와 숫자를 반드시 포함해야 합니다.');
    } else {
      navigation.navigate('getAuthCodeScreen');
    }
  };

  useEffect(() => {
    console.log(prettyFormat(patientSignUpRequest));
  }, [patientSignUpRequest]);

  return (
    <Container>
      <MainInfoTxt1>사용자님,</MainInfoTxt1>
      <MainInfoTxt2>
        <Text style={{ color: 'navy' }}>정보</Text>를 입력해주세요!
      </MainInfoTxt2>
      <SubTitleTxt>모든 항목을 입력해주세요. (필수)</SubTitleTxt>

      <Info>
        <Component>
          <Txt>이름을 입력해주세요.</Txt>
          <SubTxt>한글로 빈칸없이 작성해주세요.</SubTxt>
          <Input value={name} onChangeText={onChangeName} />
        </Component>

        <Component>
          <Txt>연락처를 입력해주세요.</Txt>
          <SubTxt>예시와 같은 형식으로 작성해주세요.</SubTxt>
          <Input
            value={contact}
            onChangeText={onChangeContact}
            placeholder="( 예시. 01012345678 )"
            placeholderTextColor="lightgray"
          />
        </Component>

        <Component>
          <Txt>이메일을 입력해주세요.</Txt>
          <SubTxt>본 이메일을 사용해서 로그인을 하게 됩니다.</SubTxt>
          <Input
            value={email}
            onChangeText={onChangeEmail}
            placeholder="( 예시. kedighyfn345@gmail.com )"
            placeholderTextColor="lightgray"
          />
        </Component>

        <Component>
          <Txt>비밀번호</Txt>
          <SubTxt>최소 8자, 최대 18자 가능 / 영문소문자, 숫자 반드시 포함</SubTxt>
          <Input
            value={password}
            onChangeText={onChangePassword}
            placeholder="( 예시 : kejfhnwi375 )"
            placeholderTextColor="lightgray"
          />
        </Component>
      </Info>
      <PreviousBtn marginBottom={hp(2)} marginLeft={wp(4.8)} onPress={onPressPreviousBtn} />
      <ContinueBtn
        fontColor={name && contact && email && password ? 'white' : 'navy'}
        backColor={name && contact && email && password ? 'navy' : 'white'}
        width={wp(100)}
        marginBottom={hp(6.15)}
        justifyContent="center"
        onPress={onPressContinueBtn}
      />
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
  margin-top: ${hp(6)}px;
`;

const MainInfoTxt2 = styled.Text`
  font-size: ${RFValue(22)}px;
  font-weight: bold;
  margin-left: ${wp(4.8)}px;
  margin-top: ${RFValue(5)}px;
`;

const SubTitleTxt = styled.Text`
  color: lightgray;
  margin-left: ${wp(4.8)}px;
  margin-top: ${hp(1.23)}px;
  margin-bottom: ${hp(3)}px;
  font-size: ${RFValue(16)}px;
`;

const SubTxt = styled.Text`
  color: lightgray;
  font-size: ${RFValue(13)}px;
  margin-top: ${hp(1)}px;
`;

const Info = styled.View`
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

export default PatientGetInfoScreen;
