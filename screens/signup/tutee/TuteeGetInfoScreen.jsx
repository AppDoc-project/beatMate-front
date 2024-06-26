import { ContinueBtn } from '@assets/SignUp/SelectUserScreen';
import { useNavigation } from '@react-navigation/native';
import { checkSingleEmail, signupTutee } from 'api/auth';
import { Auth } from 'context/AuthContext';
import format from 'pretty-format';
import React, { useContext } from 'react';
import { Alert, Text, SafeAreaView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { RFValue } from 'react-native-responsive-fontsize';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { styled } from 'styled-components/native';

function TuteeGetInfoScreen(props) {
  const {
    tutee: [tuteeSignUpRequest, setTuteeSignUpRequest],
  } = useContext(Auth);

  const navigation = useNavigation();
  const { name, contact, email, password } = tuteeSignUpRequest;

  const onChangeName = (text) => setTuteeSignUpRequest((prev) => ({ ...prev, name: text }));
  const onChangeContact = (text) => setTuteeSignUpRequest((prev) => ({ ...prev, contact: text }));
  const onChangeEmail = (text) => setTuteeSignUpRequest((prev) => ({ ...prev, email: text }));
  const onChangePassword = (text) => setTuteeSignUpRequest((prev) => ({ ...prev, password: text }));

  const onPressCheckEmail = () => {
    const data = {
      email: email,
    };

    checkSingleEmail(data)
      .then((res) => {
        const { data } = res;
        console.log(format(data));
      })
      .catch((error) => {
        if (error.response && error.response.data.code === 404) {
          Alert.alert('알림', '이미 존재하는 이메일입니다. 다른 이메일을 작성해주세요.');
        } else if (error.response && error.response.data.code === 500) {
          Alert.alert('알림', '서버에러가 발생했습니다. 잠시 후 다시 시도해 주세요.');
        } else {
          console.log(format(error.response));
          Alert.alert('알림', '네트워크 연결을 확인해주세요.');
          navigation.navigate('loginScreen');
        }
      });
  };

  const onPressPreviousBtn = () => {
    setTuteeSignUpRequest((prev) => ({
      ...prev,
      name: '',
      contact: '',
      email: '',
      password: '',
    }));
    navigation.navigate('selectTypeScreen');
  };

  const onPressAlertBtn = () => {
    if (name.length < 2 || name.length > 10) {
      Alert.alert('알림', '이름은 2자 이상 10자 이하로 빈칸 없이 입력해주세요.');
    } else if (contact.length !== 11) {
      Alert.alert('알림', '연락처는 11자여야 합니다.');
    } else if (!email || email.length > 50 || !email.includes('@')) {
      Alert.alert('알림', '이메일은 최대 50자이며 이메일 형식이어야 합니다.');
    } else if (
      !password ||
      password.length < 8 ||
      password.length > 18 ||
      !/(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@~_])[a-zA-Z\d!@~_]+/.test(password)
    ) {
      Alert.alert(
        '알림',
        '비밀번호는 최소 8자, 최대 18자, 1개 이상의 알파벳, 숫자, 특수문자를 반드시 포함해야 합니다.',
      );
    }
  };

  const onPressContinueBtn = () => {
    console.log(tuteeSignUpRequest);

    signupTutee(tuteeSignUpRequest)
      .then((res) => {
        const { data } = res;
        console.log(format(data));
        navigation.navigate('getAuthCodeScreen');
      })
      .catch((error) => {
        if (error.response && error.response.data.code === 500) {
          Alert.alert('알림', '서버에러가 발생했습니다. 잠시 후 다시 시도해 주세요.');
        } else {
          console.log(error);
          Alert.alert('알림', '네트워크 연결을 확인해주세요.');
          navigation.navigate('loginScreen');
        }
      });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <Container>
        <AntDesign name="left" size={32} marginLeft={5} onPress={onPressPreviousBtn} />

        <MainInfoTxt1>수강생님,</MainInfoTxt1>
        <MainInfoTxt2>
          <Text style={{ color: 'navy' }}>정보</Text>를 입력해주세요!
        </MainInfoTxt2>
        <SubTitleTxt>모든 항목을 입력해주세요. (필수)</SubTitleTxt>

        <Info>
          <Component>
            <Txt>이름을 입력해주세요.</Txt>
            <SubTxt>한글로 빈칸없이 작성해주세요.</SubTxt>
            <Input value={name} onChangeText={onChangeName} />
          </Component>

          <Component>
            <Txt>연락처를 입력해주세요.</Txt>
            <SubTxt>예시와 같은 형식으로 작성해주세요.</SubTxt>
            <Input
              value={contact}
              onChangeText={onChangeContact}
              placeholder="( 예시. 01012345678 )"
              placeholderTextColor="lightgray"
            />
          </Component>

          <Component>
            <FirstLow>
              <Txt>이메일을 입력해주세요.</Txt>
              <Check onPress={onPressCheckEmail}>
                <Text style={{ color: 'navy' }}>이메일 중복 확인</Text>
              </Check>
            </FirstLow>
            <SubTxt>본 이메일을 사용해서 로그인을 하게 됩니다.</SubTxt>
            <Input
              value={email}
              onChangeText={onChangeEmail}
              placeholder="( 예시. kedighyfn345@gmail.com )"
              placeholderTextColor="lightgray"
            />
          </Component>

          <Component>
            <Txt>비밀번호</Txt>
            <SubTxt>최소 8자, 최대 18자 가능 / 알파벳, 숫자, 특수문자 반드시 포함</SubTxt>
            <Input
              value={password}
              secureTextEntry
              onChangeText={onChangePassword}
              placeholder="( 예시 : kejwi375@! )"
              placeholderTextColor="lightgray"
            />
          </Component>
        </Info>
        <ContinueBtn
          fontColor={name && contact && email && password ? 'white' : 'navy'}
          backColor={name && contact && email && password ? 'navy' : 'white'}
          width={wp(100)}
          marginBottom={hp(6.15)}
          justifyContent="center"
          onPress={() => {
            onPressAlertBtn();
            onPressContinueBtn();
          }}
        />
      </Container>
    </SafeAreaView>
  );
}

const Container = styled(KeyboardAwareScrollView)`
  flex: 1;
  background-color: white;
`;

const MainInfoTxt1 = styled.Text`
  font-size: ${RFValue(22)}px;
  font-weight: bold;
  margin-left: ${wp(4.8)}px;
  margin-top: ${hp(2)}px;
`;

const MainInfoTxt2 = styled.Text`
  font-size: ${RFValue(22)}px;
  font-weight: bold;
  margin-left: ${wp(4.8)}px;
  margin-top: ${RFValue(5)}px;
`;

const SubTitleTxt = styled.Text`
  color: lightgray;
  margin-left: ${wp(4.8)}px;
  margin-top: ${hp(1.23)}px;
  margin-bottom: ${hp(3)}px;
  font-size: ${RFValue(16)}px;
`;

const SubTxt = styled.Text`
  color: lightgray;
  font-size: ${RFValue(13)}px;
  margin-top: ${hp(1)}px;
`;

const Info = styled.View`
  flex: 1;
`;

const Component = styled.View`
  margin-left: ${wp(4.8)}px;
  margin-bottom: ${hp(4)}px;
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
  height: ${hp(7)}px;
  border-radius: 8px;
  border-color: lightgray;
  border-width: 1px;

  padding-left: ${RFValue(4)}px;
  font-size: ${RFValue(16)}px;
  font-weight: bold;
  padding: ${RFValue(10)}px;
`;

const FirstLow = styled.View`
  flex-direction: row;
  align-items: center;
`;

const Check = styled.TouchableOpacity`
  margin-left: ${wp(4.8)}px;
  border-color: navy;
  border-width: 1px;
  padding: 3px;
  border-radius: 8px;
`;

export default TuteeGetInfoScreen;
