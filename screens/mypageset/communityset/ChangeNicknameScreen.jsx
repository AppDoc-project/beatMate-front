import { ChangeBtn } from '@assets/Icons/Buttons';
import { useNavigation } from '@react-navigation/native';
import { changeNickname } from 'api/mypage';
import { COLORS } from 'colors';
import format from 'pretty-format';
import React, { useState } from 'react';
import { Alert, SafeAreaView, Text, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { RFValue } from 'react-native-responsive-fontsize';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AntDesign from 'react-native-vector-icons/AntDesign';
import styled from 'styled-components';

function ChangeNicknameScreen(props) {
  const navigation = useNavigation();

  const [nickName, setNickName] = useState('');
  const onChangeNickname = (text) => setNickName(text);

  const onPressPreviousBtn = () => {
    setNickName('');
    navigation.goBack();
  };

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const onPressChangeBtn = () => {
    if (!nickName || nickName.length > 10 || !/^[a-zA-Z0-9가-힣]/.test(nickName)) {
      Alert.alert('알림', '닉네임은 최대 10자, 한글, 영문자, 숫자만 가능합니다.');
    } else {
      //자기소개 변경 api
      setIsLoading(true);
      const data = {
        nickName: nickName,
      };

      changeNickname(data)
        .then((res) => {
          console.log('닉네임 변경', format(res.data));
          setIsLoading(false);
          navigation.goBack();
        })
        .catch((error) => {
          if (error.response && error.response.data.code === 408) {
            Alert.alert('알림', '로그인을 해주세요.');
            navigation.navigate('homeScreen');
          } else {
            console.log('닉네임 변경 실패', error);
            setIsError(true);
          }
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
          <Txt>변경하실 닉네임을 입력해주세요.</Txt>
          <StyledTextInput value={nickName} onChangeText={onChangeNickname} />
          <StyledText>※ 닉네임 변경후 30일 뒤에 재변경이 가능합니다.</StyledText>
        </FirstSection>

        <BottomContainer>
          <ChangeBtn
            fontColor={nickName ? COLORS.white : COLORS.main}
            backColor={nickName ? COLORS.main : COLORS.white}
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
  top: ${hp(10)}px;
  margin-left: ${wp(4.8)}px;
  margin-right: ${wp(4.8)}px;
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
  margin-bottom: ${hp(2)}px;
`;

const BottomContainer = styled.View`
  width: 100%;
  bottom: 0;
  margin-top: ${hp(20)}px;
`;

export default ChangeNicknameScreen;
