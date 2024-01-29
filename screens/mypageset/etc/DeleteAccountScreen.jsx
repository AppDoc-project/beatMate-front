import { DeleteBtn } from '@assets/Icons/Buttons';
import { useNavigation } from '@react-navigation/native';
import { quitUser } from 'api/mypage';
import { COLORS } from 'colors';
import format from 'pretty-format';
import React, { useState } from 'react';
import { Alert, SafeAreaView, Text, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { RFValue } from 'react-native-responsive-fontsize';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AntDesign from 'react-native-vector-icons/AntDesign';
import styled from 'styled-components';

function DeleteAccountScreen(props) {
  const navigation = useNavigation();

  const [password, setPassword] = useState('');
  const onChangePassword = (text) => setPassword(text);

  // const DeleteAccountAlert = () => {
  // 회원탈퇴 경고창
  //   if (setBooking.length === 0) {
  //     Alert.alert('경고', '현재 진행 중인 예약이 없어야 탈퇴할 수 있습니다.');
  //   }
  // };

  const onPressPreviousBtn = () => {
    setPassword('');
    navigation.goBack();
  };

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const onPressChangeBtn = () => {
    //회원탈퇴 api
    setIsLoading(true);
    const data = {
      password: password,
    };

    quitUser(data)
      .then((res) => {
        console.log('회원 탈퇴', format(res.data));
        setIsLoading(false);
        navigation.navigate('loginScreen');
      })
      .catch((err) => {
        console.log('회원 탈퇴', err);
        Alert.alert('경고', '회원 탈퇴에 실패하였습니다.');
        setIsError(true);
        setIsLoading(false);
      });
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

        <SecondSection>
          <Txt>계정 비밀번호를 입력해주세요.</Txt>
          <StyledTextInput
            placeholder="비밀번호를 입력해주세요."
            secureTextEntry
            value={password}
            onChangeText={onChangePassword}
          />
        </SecondSection>

        <ThirdSection>
          <StyledText>※ 회원 탈퇴 후 기존 이메일과 비밀번호로 로그인이 불가능합니다.</StyledText>
          <StyledText>※ 현재 진행 중인 예약이 있는 경우 탈퇴가 불가능합니다. </StyledText>
        </ThirdSection>
        <BottomContainer>
          <DeleteBtn
            fontColor={password ? COLORS.white : COLORS.main}
            backColor={password ? COLORS.main : COLORS.white}
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

const SecondSection = styled.View`
  margin-left: ${wp(4.8)}px;
  margin-right: ${wp(4.8)}px;
  margin-top: ${hp(10)}px;
`;

const ThirdSection = styled.View`
  margin-left: ${wp(4.8)}px;
  margin-right: ${wp(4.8)}px;
  margin-top: ${hp(5)}px;
`;

const Txt = styled.Text`
  font-size: ${RFValue(16)}px;
  font-weight: bold;
`;

const StyledText = styled.Text`
  font-size: ${RFValue(11)}px;
  font-weight: 600;
  margin-bottom: ${hp(1)}px;
  color: ${COLORS.gray};
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

const BottomContainer = styled.View`
  width: 100%;
  bottom: 0;
  margin-top: ${hp(20)}px;
`;

export default DeleteAccountScreen;
