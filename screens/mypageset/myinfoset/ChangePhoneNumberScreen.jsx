import { ChangeBtn } from '@assets/Icons/Buttons';
import { useNavigation } from '@react-navigation/native';
import { changeContact } from 'api/mypage';
import { COLORS } from 'colors';
import format from 'pretty-format';
import React, { useState } from 'react';
import { Alert, SafeAreaView, Text, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { RFValue } from 'react-native-responsive-fontsize';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AntDesign from 'react-native-vector-icons/AntDesign';
import styled from 'styled-components';

function ChangePhoneNumberScreen(props) {
  const navigation = useNavigation();

  const [contact, setContact] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');

  const onChangeContact = (text) => setContact(text);
  const onChangeCurrentPassword = (text) => setCurrentPassword(text);

  const onPressPreviousBtn = () => {
    setContact('');
    setCurrentPassword('');
    navigation.goBack();
  };

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const onPressChangeBtn = () => {
    // 비밀번호 경고창
    if (contact.length !== 11) {
      Alert.alert('알림', '연락처는 11자여야 합니다.');
    } else {
      //자기소개 변경 api
      setIsLoading(true);
      const data = {
        currentPassword: currentPassword,
        contact: contact,
      };

      changeContact(data)
        .then((res) => {
          console.log('연락처 변경', format(res.data));
          setIsLoading(false);
          navigation.goBack();
        })
        .catch((err) => {
          console.log('연락처 변경', err);
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
          <StyledText>※ - 없이 총 11자로 작성해야 합니다.</StyledText>
          <Txt>변경하실 연락처를 입력해주세요.</Txt>
          <StyledTextInput
            placeholder="01012345678"
            keyboardType="numeric"
            value={contact}
            onChangeText={onChangeContact}
          />
        </FirstSection>

        <SecondSection>
          <StyledText>※ 연락처를 변경하기 위해서는 현재 비밀번호를 입력해야 합니다.</StyledText>
          <Txt>현재 비밀번호를 입력해주세요.</Txt>
          <StyledTextInput
            placeholder="현재 비밀번호를 입력해주세요."
            secureTextEntry
            value={currentPassword}
            onChangeText={onChangeCurrentPassword}
          />
        </SecondSection>
        <BottomContainer>
          <ChangeBtn
            fontColor={contact && currentPassword ? COLORS.white : COLORS.main}
            backColor={contact && currentPassword ? COLORS.main : COLORS.white}
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
  margin-top: ${hp(5)}px;
  position: relative;
`;

export default ChangePhoneNumberScreen;
