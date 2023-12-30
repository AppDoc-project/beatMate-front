import { TutorSelect, TuteeSelect, ContinueBtn } from '@assets/SignUp/SelectUserScreen';
import { useNavigation } from '@react-navigation/native';
import { UserInfo } from 'context/UserInfoContext';
import React, { useContext } from 'react';
import { Text } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { styled } from 'styled-components/native';

function SelectTypeScreen() {
  const navigation = useNavigation();
  const { userType, setUserType } = useContext(UserInfo);

  const onPressPreviousBtn = () => {
    setUserType('');
    navigation.navigate('loginScreen');
  };

  const onPressContinueBtn = () => {
    if (userType === 1) {
      navigation.navigate('doctorGetInfoScreen');
    } else if (userType === 2) {
      navigation.navigate('TuteeGetInfoScreen');
    }
  };

  const onPressLoginBtn = () => {
    navigation.navigate('loginScreen');
  };

  return (
    <Container>
      <AntDesign name="left" size={32} marginLeft={5} marginTop={50} onPress={onPressPreviousBtn} />
      <MainInfoTxt1>사용자님,</MainInfoTxt1>
      <MainInfoTxt2>
        <Text style={{ color: 'navy' }}>유형</Text>을 선택해주세요!
      </MainInfoTxt2>
      <SubTxt>한 가지 유형을 선택해주세요. (필수)</SubTxt>
      <SelectOption>
        <TutorSelect
          backColor={userType === 1 ? '#EBF5FF' : '#FFFFFF'}
          fontColor={userType === 1 ? 'black' : '#666666'}
          onPress={() => setUserType(1)}
        />
        <TuteeSelect
          backColor={userType === 2 ? '#EBF5FF' : '#FFFFFF'}
          fontColor={userType === 2 ? 'black' : '#666666'}
          onPress={() => setUserType(2)}
        />
      </SelectOption>

      <BottomWrapper>
        <Question>계정이 있나요?</Question>
        <SignUp onPress={onPressLoginBtn}>
          <SignUpTxt> 로그인하기</SignUpTxt>
        </SignUp>
      </BottomWrapper>

      <ContinueBtn
        fontColor={userType ? 'white' : 'navy'}
        backColor={userType ? 'navy' : 'white'}
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
  margin-top: ${hp(12)}px;
`;

const MainInfoTxt2 = styled.Text`
  font-size: ${RFValue(22)}px;
  font-weight: bold;
  margin-left: ${wp(4.8)}px;
  margin-top: ${RFValue(5)}px;
`;

const SubTxt = styled.Text`
  color: lightgray;
  margin-left: ${wp(4.8)}px;
  margin-top: ${hp(1.23)}px;
  margin-bottom: ${hp(5.41)}px;
  font-size: ${RFValue(16)}px;
`;

const SelectOption = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: space-evenly;
`;

const BottomWrapper = styled.View`
  display: flex;
  flex: 1;
  width: 100%;
  justify-content: center;
  margin-top: 60px;
  flex-direction: row;
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

export default SelectTypeScreen;
