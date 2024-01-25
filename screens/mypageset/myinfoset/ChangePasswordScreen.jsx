import { ChangeBtn } from '@assets/Icons/Buttons';
import { useNavigation } from '@react-navigation/native';
import { changePassword } from 'api/mypage';
import { COLORS } from 'colors';
import format from 'pretty-format';
import React, { useState } from 'react';
import { Alert, SafeAreaView, Text, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { RFValue } from 'react-native-responsive-fontsize';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Octicons from 'react-native-vector-icons/Octicons';
import styled from 'styled-components';

function ChangePasswordScreen(props) {
  const navigation = useNavigation();

  const [changedPassword, setChangedPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');

  const onChangeChangedPassword = (text) => setChangedPassword(text);
  const onChangeConfirmPassword = (text) => setConfirmPassword(text);
  const onChangeCurrentPassword = (text) => setCurrentPassword(text);

  const onPressPreviousBtn = () => {
    setChangedPassword('');
    setConfirmPassword('');
    setCurrentPassword('');
    navigation.goBack();
  };

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const onPressChangeBtn = () => {
    if (
      !changedPassword ||
      !confirmPassword ||
      !currentPassword ||
      changedPassword.length < 8 ||
      changedPassword.length > 18 ||
      !/(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@~_])[a-zA-Z\d!@~_]+/.test(changedPassword)
    ) {
      Alert.alert(
        '알림',
        '비밀번호는 최소 8자, 최대 18자, 1개 이상의 알파벳, 숫자, 특수문자를 반드시 포함해야 합니다.',
      );
    } else {
      //비밀번호 변경 api
      setIsLoading(true);
      const data = {
        currentPassword: currentPassword,
        changedPassword: changedPassword,
      };

      changePassword(data)
        .then((res) => {
          console.log('비밀번호 변경', format(res.data));
          setIsLoading(false);
          navigation.goBack();
        })
        .catch((err) => {
          console.log('비밀번호 변경', err);
          setIsError(true);
          setIsLoading(false);
        });
    }
  };

  if (isLoading) {
    return (
      <View>
        <Text>로딩중...</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View>
        <Text>에러 발생</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <Container>
        <AntDesign name="left" size={32} marginLeft={5} top={40} onPress={onPressPreviousBtn} />

        <FirstSection>
          <MainTxt>변경하실 비밀번호를 입력해주세요.</MainTxt>
          <SubTxt>최소 8자, 최대 18자 가능 / 영어 대소문자, 숫자, 특수문자 중 하나 이상 반드시 포함</SubTxt>
          <StyledTextInput
            placeholder="새 비밀번호를 입력해주세요."
            secureTextEntry
            value={changedPassword}
            onChangeText={onChangeChangedPassword}
          />
        </FirstSection>
        <SecondSection>
          <MainTxt>변경하실 비밀번호를 재입력해주세요.</MainTxt>
          <InputSection>
            <StyledTextInput
              placeholder="새 비밀번호 재입력해주세요."
              secureTextEntry
              value={confirmPassword}
              onChangeText={onChangeConfirmPassword}
            />
            {changedPassword !== '' && confirmPassword !== '' && (
              <CheckAlert>
                {changedPassword === confirmPassword ? (
                  <Octicons name="check" size={RFValue(20)} color={COLORS.main} />
                ) : null}
              </CheckAlert>
            )}
          </InputSection>
        </SecondSection>
        <ThirdSection>
          <StyleText>※ 비밀번호를 변경하기 위해서는 현재 비밀번호를 입력해야 합니다.</StyleText>
          <MainTxt>현재 비밀번호를 입력해주세요.</MainTxt>
          <StyledTextInput
            placeholder="현재 비밀번호를 입력해주세요."
            secureTextEntry
            value={currentPassword}
            onChangeText={onChangeCurrentPassword}
          />
        </ThirdSection>
        <BottomContainer>
          <ChangeBtn
            fontColor={changedPassword && confirmPassword && currentPassword ? COLORS.white : COLORS.main}
            backColor={changedPassword && confirmPassword && currentPassword ? COLORS.main : COLORS.white}
            width={wp(100)}
            justifyContent="center"
            onPress={onPressChangeBtn}
          />
        </BottomContainer>
      </Container>
    </SafeAreaView>
  );
}

const Container = styled(KeyboardAwareScrollView)`
  flex: 1;
  background-color: white;
`;

const FirstSection = styled.View`
  margin-top: ${hp(10)}px;
  margin-left: ${wp(4.8)}px;
  margin-right: ${wp(4.8)}px;

`;

const SecondSection = styled.View`
  margin-left: ${wp(4.8)}px;
  margin-right: ${wp(4.8)}px;
  margin-top: ${hp(5)}px;
`;

const ThirdSection = styled.View`
  margin-left: ${wp(4.8)}px;
  margin-right: ${wp(4.8)}px;
  margin-top: ${hp(5)}px;
`;

const MainTxt = styled.Text`
  font-size: ${RFValue(16)}px;
  font-weight: bold;
`;

const SubTxt = styled.Text`
  font-size: ${RFValue(11.7)}px;
  margin-top: ${hp(1)}px;
  color: ${COLORS.lightgray};
`;

const StyleText = styled.Text`
  font-size: ${RFValue(11)}px;
  font-weight: 600;
  margin-bottom: ${hp(1)}px;
  color: ${COLORS.gray};
`;

const InputSection = styled.View`
  flex-direction: row;
`;

const StyledTextInput = styled.TextInput`
  height: ${hp(5)}px;
  width: ${wp(90)}px;
  border-width: 1px;
  border-radius: 10px;
  border-color: ${COLORS.lightgray};
  margin-top: ${hp(1)}px;
  padding: 0 ${wp(2)}px;
`;

const CheckAlert = styled.View`
  margin-top: ${hp(1)}px;
  top: ${hp(1)}px;
  right: ${wp(10)}px;
`;

const BottomContainer = styled.View`
  width: 100%;
  bottom: 0;
  margin-top: ${hp(5)}px;
  position: relative;
`;

export default ChangePasswordScreen;
