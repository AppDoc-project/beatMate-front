import { LoginBtn } from '@assets/Icons/Buttons';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { format } from 'pretty-format';
import React, { useState } from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { styled } from 'styled-components/native';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';

function LoginScreen(props) {
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onChangeEmail = (text) => setEmail(text);
  const onChangePassword = (text) => setPassword(text);

  const { setItem } = useAsyncStorage('authorization');

  const onPressLoginBtn = () => {
    // 로그인
    const axiosConfig = {
      headers: {
        'Content-Type': 'application/json',
        email: email,
        password: password,
      },
    };

    axios
      .post(`${process.env.EXPO_PUBLIC_DEV_SERVER}/auth/login`, {}, axiosConfig)
      .then((response) => {
        console.log(format(response.data));
        const authorizationHeader = response.headers.authorization;

        if (authorizationHeader) {
          setItem(authorizationHeader) // AsyncStorage에 저장
            .then(() => {
              axios.defaults.headers.common['Authorization'] = authorizationHeader;
              navigation.navigate('homeScreen');
            })
            .catch((error) => console.log(format(error)));
        }
      })
      .catch((error) => console.log(format(error)));
  };

  const onPressSignUpBtn = () => {
    navigation.navigate('selectTypeScreen');
  };

  const onPressFindPasswordBtn = () => {
    navigation.navigate('selectTypeScreen');
  };

  return (
    <Container>
      <Logo>BeatMate</Logo>
      <Email>
        <MainText>이메일</MainText>
        <Input value={email} onChangeText={onChangeEmail} placeholderTextColor="gray" />
      </Email>
      <Password>
        <MainText>비밀번호</MainText>
        <Input value={password} onChangeText={onChangePassword} placeholderTextColor="gray" />
      </Password>
      <LoginBtn
        fontColor={email && password ? 'white' : 'navy'}
        backColor={email && password ? 'navy' : 'white'}
        width={wp(100)}
        marginBottom={hp(6.15)}
        marginTop={hp(8)}
        justifyContent="center"
        onPress={onPressLoginBtn}
      />

      <BottomWrapper>
        <First>
          <Question>계정이 없나요?</Question>
          <SignUp onPress={onPressSignUpBtn}>
            <SignUpTxt>회원가입하기</SignUpTxt>
          </SignUp>
        </First>
        <Second>
          <Question>비밀번호를 잊었나요?</Question>
          <SignUp onPress={onPressFindPasswordBtn}>
            <SignUpTxt>비밀번호찾기</SignUpTxt>
          </SignUp>
        </Second>
      </BottomWrapper>
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

const Email = styled.View`
  margin-left: ${wp(5)}px;
  margin-top: ${hp(5)}px;
`;

const Input = styled.TextInput`
  background-color: transparent;
  top: ${hp(1.5)}px;
  width: ${wp(90)}px;
  height: ${hp(6.28)}px;

  border-radius: 10px;
  border-color: lightgray;
  border-width: 2px;
  padding-left: ${RFValue(4)}px;

  font-size: ${RFValue(14)}px;
  font-weight: bold;
  padding: ${RFValue(10)}px;
`;

const MainText = styled.Text`
  font-weight: bold;
  font-size: ${RFValue(15)}px;
`;

const Password = styled.View`
  margin-left: ${wp(5)}px;
  margin-top: ${hp(5)}px;
`;

const BottomWrapper = styled.View`
  display: flex;
  width: 100%;
  justify-content: center;
  margin-top: 60px;
  align-items: center;
`;

const Question = styled.Text`
  color: #aeaeae;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
`;

const SignUp = styled.TouchableOpacity``;

const SignUpTxt = styled.Text`
  margin-left: 20px;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  text-decoration-line: underline;
`;

const First = styled.Text`
  flex-direction: row;
  margin-bottom: ${hp(1)}px;
`;

const Second = styled.Text`
  flex-direction: row;
`;

export default LoginScreen;
