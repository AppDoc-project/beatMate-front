import { ContinueBtn } from '@assets/SignUp/SelectUserScreen';
import { useNavigation } from '@react-navigation/native';
import { changeNewPassword } from 'api/auth';
import format from 'pretty-format';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Alert, SafeAreaView } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { styled } from 'styled-components/native';

function GetChangedPassword({ route }) {
  const { email, token } = route.params;
  const navigation = useNavigation();

  const [changedPassword, setChangedPassword] = useState('');

  const onChangePassword = (text) => {
    setChangedPassword(text);
  };

  const onPressPreviousBtn = () => {
    navigation.navigate('getAuthEmail');
  };

  const onPressContinueBtn = () => {
    const data = {
      code: token,
      password: changedPassword,
      email: email,
    };

    changeNewPassword(data)
      .then((res) => {
        const { data } = res;
        console.log(format(data));
        navigation.navigate('loginScreen');
      })
      .catch((error) => {
        if (error.response && error.response.data.code === 500) {
          Alert.alert('알림', '서버에러가 발생했습니다. 잠시 후 다시 시도해 주세요.');
        } else {
          console.log('비밀번호 변경 실패', format(error));
          Alert.alert('알림', '네트워크 연결을 확인해주세요.');
          navigation.navigate('loginScreen');
        }
      });
  };

  GetChangedPassword.propTypes = {
    route: PropTypes.shape({
      params: PropTypes.shape({
        email: PropTypes.string.isRequired,
        token: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
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
  margin-top: ${hp(10)}px;
`;

const SubTxt = styled.Text`
  color: lightgray;
  font-size: ${RFValue(12.5)}px;
  margin-top: ${hp(1)}px;
`;

const Component = styled.View`
  margin-left: ${wp(4.8)}px;
  margin-bottom: ${hp(4)}px;
  margin-top: ${hp(4)}px;
`;

const Txt = styled.Text`
  font-weight: bold;
  font-size: ${RFValue(16)}px;
`;

export default GetChangedPassword;
