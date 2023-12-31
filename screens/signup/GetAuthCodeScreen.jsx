import { GetReAuthCodeBtn, JoinBtn } from '@assets/Icons/Buttons';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { Auth } from 'context/AuthContext';
import format from 'pretty-format';
import React, { useContext, useState } from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { styled } from 'styled-components/native';
import { UserInfo } from 'context/UserInfoContext';
import AntDesign from 'react-native-vector-icons/AntDesign';

function GetAuthCodeScreen(props) {
  const { userType } = useContext(UserInfo);
  const {
    tutor: [tutorSignUpRequest],
    tutee: [tuteeSignUpRequest],
  } = useContext(Auth);

  const navigation = useNavigation();
  let email;

  //userType에 따라 email 가져옴
  if (userType === 'tutor') {
    email = tutorSignUpRequest.email;
  } else if (userType === 'tutee') {
    email = tuteeSignUpRequest.email;
  }

  const [code, setCode] = useState('');
  const onChangeCode = (text) => setCode(text);

  const onPressPreviousBtn = () => {
    setCode('');
    navigation.navigate('TuteeGetInfoScreen');
  };

  //재발급 받기
  const onPressReCodeBtn = () => {
    console.log('Button Clicked');

    console.log(patientSignUpRequest);
    axios
      .post(`${process.env.EXPO_PUBLIC_DEV_SERVER}/auth/join/patient`, patientSignUpRequest, axiosConfig)
      .then((data) => console.log(format(data)))
      .catch((error) => console.log(format(error)));
  };

  //인증 (등록하기)
  const onPressJoinBtn = () => {
    const authEmail = {
      email: email,
      code: code,
    };

    console.log(authEmail);
    axios
      .post(`${process.env.EXPO_PUBLIC_DEV_SERVER}/auth/validate/patient`, authEmail, axiosConfig)
      .then((data) => console.log(format(data.data)))
      .catch((error) => console.log(format(error)));

    if (code) {
      navigation.navigate('loginScreen');
    }
  };

  return (
    <Container>
      <AntDesign name="left" size={32} marginLeft={5} onPress={onPressPreviousBtn} />

      <Logo>AppDoc</Logo>
      <InfoText>{email}로 메일을 보냈습니다.</InfoText>
      <Component>
        <Txt>인증 코드를 입력해주세요.</Txt>
        <Input value={code} onChangeText={onChangeCode} />
      </Component>
      <BtnGroup>
        <ReBtn onPress={onPressReCodeBtn}>
          <GetReAuthCodeBtn width={wp(100)} justifyContent="center" />
        </ReBtn>

        <JoinBtn
          fontColor={code ? 'white' : 'navy'}
          backColor={code ? 'navy' : 'white'}
          width={wp(100)}
          justifyContent="center"
          onPress={onPressJoinBtn}
        />
      </BtnGroup>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  align-items: center;
`;

const Logo = styled.Text`
  font-size: ${RFValue(40)}px;
  font-weight: bold;
  margin-top: ${hp(18.7)}px;
`;

const InfoText = styled.Text`
  color: #aeaeae;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  margin-top: ${hp(12)}px;
  width: ${wp(100)}px;
  margin-bottom: ${hp(2)}px;
  margin-left: ${wp(15)}px;
`;

const Component = styled.View`
  margin-left: ${wp(4.8)}px;
  margin-bottom: ${hp(4)}px;
  flex: 1;
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

const BtnGroup = styled.View`
  flex: 1;
`;

const ReBtn = styled.TouchableOpacity`
  margin-bottom: ${hp(-2)}px;
  margin-top: ${hp(-7)}px;
`;

export default GetAuthCodeScreen;
