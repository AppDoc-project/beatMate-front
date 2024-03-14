import { ContinueBtn } from '@assets/SignUp/SelectUserScreen';
import { useNavigation } from '@react-navigation/native';
import { getNewEmail } from 'api/auth';
import format from 'pretty-format';
import React, { useState } from 'react';
import { Alert, SafeAreaView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { RFValue } from 'react-native-responsive-fontsize';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { styled } from 'styled-components/native';

function GetAuthEmail(props) {
  const navigation = useNavigation();

  const [email, setEmail] = useState('');

  const onChangeEmail = (text) => {
    setEmail(text);
  };

  const onPressPreviousBtn = () => {
    navigation.navigate('loginScreen');
    setEmail('');
  };

  const onPressContinueBtn = () => {
    getNewEmail(email)
      .then((res) => {
        const { data } = res;
        console.log(format(data));
        navigation.navigate('getAuthCode', { email });
      })
      .catch((error) => {
        if (error.response && error.response.data.code === 405) {
          Alert.alert('알림', '존재하지 않는 회원입니다.');
        } else if (error.response && error.response.data.code === 500) {
          Alert.alert('알림', '서버에러가 발생했습니다. 잠시 후 다시 시도해 주세요.');
        } else {
          console.log(format(error.response.data));
          Alert.alert('알림', '네트워크 연결을 확인해주세요.');
          navigation.navigate('homeScreen');
        }
      });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <WholeWrapper>
        <AntDesign name="left" size={32} marginLeft={5} onPress={onPressPreviousBtn} />
        <Container>
          <Logo>BeatMate</Logo>
          <InfoText>회원가입시 작성하신 이메일을 입력해주세요.{'\n \n'}인증 코드를 보내드립니다.</InfoText>
          <Component>
            <Input value={email} onChangeText={onChangeEmail} />
          </Component>
          <BtnGroup>
            <ContinueBtn
              fontColor={email ? 'white' : 'navy'}
              backColor={email ? 'navy' : 'white'}
              width={wp(100)}
              justifyContent="center"
              onPress={onPressContinueBtn}
            />
          </BtnGroup>
        </Container>
      </WholeWrapper>
    </SafeAreaView>
  );
}

const WholeWrapper = styled(KeyboardAwareScrollView)`
  flex: 1;
  background-color: white;
`;

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
  margin-top: ${hp(10)}px;
  width: ${wp(100)}px;
  margin-left: ${wp(15)}px;
`;

const Component = styled.View`
  margin-left: ${wp(4.8)}px;
  flex: 1;
`;

const Input = styled.TextInput`
  background-color: transparent;
  position: relative;

  top: ${hp(1.5)}px;
  width: ${wp(90.4)}px;
  height: auto;
  border-radius: 8px;
  border-color: lightgray;
  border-width: 1px;

  padding-left: ${RFValue(4)}px;
  font-size: ${RFValue(16)}px;
  font-weight: bold;
  padding: ${RFValue(10)}px;
`;

const BtnGroup = styled.View`
  margin-top: ${hp(10)}px;
`;

export default GetAuthEmail;
