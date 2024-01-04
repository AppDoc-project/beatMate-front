import { ContinueBtn } from '@assets/SignUp/SelectUserScreen';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { styled } from 'styled-components/native';

function GetAuthEmail(props) {
  const navigation = useNavigation();

  const [changedPassword, setChangedPassword] = useState('');

  const onChangePassword = (text) => {
    setChangedPassword(text);
  };

  const onPressPreviousBtn = () => {
    navigation.navigate('getAuthCode');
  };

  const onPressContinueBtn = () => {
    navigation.navigate('homeScreen');
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <AntDesign name="left" size={32} marginLeft={5} onPress={onPressPreviousBtn} />
      <Container>
        <Logo>BeatMate</Logo>
        <Component>
          <Txt>변경하실 비밀번호를 입력해주세요.</Txt>
          <SubTxt>최소 8자, 최대 18자 가능 / 알파벳, 숫자, 특수문자 반드시 포함</SubTxt>
          <Input value={changedPassword} onChangeText={onChangePassword} />
        </Component>
        <BtnGroup>
          <ContinueBtn
            fontColor={changedPassword ? 'white' : 'navy'}
            backColor={changedPassword ? 'navy' : 'white'}
            width={wp(100)}
            justifyContent="center"
            onPress={onPressContinueBtn}
          />
        </BtnGroup>
      </Container>
    </SafeAreaView>
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

const SubTxt = styled.Text`
  color: lightgray;
  font-size: ${RFValue(13)}px;
  margin-top: ${hp(1)}px;
`;

const Component = styled.View`
  margin-left: ${wp(4.8)}px;
  margin-bottom: ${hp(4)}px;
`;

const Txt = styled.Text`
  font-weight: bold;
  font-size: ${RFValue(16)}px;
`;

export default GetAuthEmail;
