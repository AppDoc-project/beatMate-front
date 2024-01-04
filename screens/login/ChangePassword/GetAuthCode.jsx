import { GetReAuthCodeBtn, JoinBtn } from '@assets/Icons/Buttons';
import { useNavigation } from '@react-navigation/native';
import { getNewEmail, getNewAuthCode } from 'api/auth';
import { COLORS } from 'colors';
import format from 'pretty-format';
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { Text, SafeAreaView } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { styled } from 'styled-components/native';

const GetAuthCodeScreen = ({ route }) => {
  const { email } = route.params;
  const [authCode, setAuthCode] = useState('');

  const navigation = useNavigation();

  const [timeLeft, setTimeLeft] = useState(180); // 초 단위로 남은 시간 저장
  const [timerRunning, setTimerRunning] = useState(false); // 타이머 동작 여부

  // 이 함수는 남은 시간을 받아서 '분:초' 형태로 변환해주는 함수입니다.
  const formatTime = (timeLeft) => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    return `${minutes}분 ${seconds < 10 ? `0${seconds}` : seconds}초`;
  };

  const startTimer = () => {
    if (!timerRunning) {
      setTimerRunning(true);
      setTimeLeft(180); // 타이머 초기화
    }
  };

  // 포커스 여부에 따라 타이머 상태 변경
  useEffect(() => {
    const onFocus = navigation.addListener('focus', () => {
      startTimer();
    });

    const onBlur = navigation.addListener('blur', () => {
      setTimerRunning(false); // 화면이 blur되면 타이머 중지
    });

    return () => {
      onFocus(); // 이벤트 리스너 정리
      onBlur(); // 이벤트 리스너 정리
    };
  }, [navigation]);

  // 타이머 로직
  useEffect(() => {
    let timer;
    if (timerRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
      }, 1000);
    } else if (timeLeft === 0) {
      // 시간이 종료되면 추가 작업 수행
      clearInterval(timer);
      // 여기에 alert를 띄우고 이전 페이지로 이동하는 코드를 넣어줄게요.
      alert('시간이 종료되었습니다. 다시 인증해주세요.');
      navigation.navigate('tuteeGetInfoScreen'); // 이전 페이지로 이동
    }

    return () => {
      clearInterval(timer);
    };
  }, [timerRunning, timeLeft]);

  const onChangeCode = (text) => {
    setAuthCode(text);
    startTimer(); // 코드 입력 시 타이머 시작
  };

  const onPressPreviousBtn = () => {
    setAuthCode('');
    navigation.navigate('tuteeGetInfoScreen');
  };

  //재발급 받기
  const onPressReCodeBtn = () => {
    getNewEmail(email)
      .then((res) => {
        const { data } = res;
        console.log(format(data));
      })
      .catch((error) => console.log(format(error)));

    // 타이머를 초기화하고 3분으로 재설정
    setTimeLeft(180);
    setTimerRunning(true);
  };

  //인증 (등록하기)
  const onPressJoinBtn = () => {
    const authEmail = {
      email: email,
      code: authCode,
    };

    getNewAuthCode(authEmail)
      .then((res) => {
        const token = res.headers.token; // 실제 응답 객체에서 헤더에서 토큰을 가져오는 부분
        console.log(token);
        const { data } = res;
        console.log(format(data));
        navigation.navigate('getChangedPassword', { email, token });
      })
      .catch((error) => console.log(format(error)));
  };

  GetAuthCodeScreen.propTypes = {
    route: PropTypes.shape({
      params: PropTypes.shape({
        email: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <AntDesign name="left" size={32} marginLeft={5} onPress={onPressPreviousBtn} />
      <Container>
        <Logo>BeatMate</Logo>
        <InfoText>{email}로 메일을 보냈습니다.</InfoText>
        <Component>
          <Txt>인증 코드를 입력해주세요.</Txt>
          <Txt>
            남은 시간: <Text style={{ color: COLORS.main }}>{formatTime(timeLeft)}</Text>
          </Txt>
          <Input value={authCode} onChangeText={onChangeCode} />
        </Component>
        <BtnGroup>
          <ReBtn onPress={onPressReCodeBtn}>
            <GetReAuthCodeBtn width={wp(100)} justifyContent="center" />
          </ReBtn>

          <JoinBtn
            fontColor={authCode ? 'white' : 'navy'}
            backColor={authCode ? 'navy' : 'white'}
            width={wp(100)}
            justifyContent="center"
            onPress={onPressJoinBtn}
          />
        </BtnGroup>
      </Container>
    </SafeAreaView>
  );
};

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
  margin-top: ${hp(12)}px;
  width: ${wp(100)}px;
  margin-bottom: ${hp(2)}px;
  margin-left: ${wp(15)}px;
`;

const Component = styled.View`
  margin-left: ${wp(4.8)}px;
  margin-bottom: ${hp(4)}px;
  flex: 1;
`;

const Txt = styled.Text`
  font-weight: bold;
  font-size: ${RFValue(16)}px;
  margin-bottom: 10px;
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

const ReBtn = styled.TouchableOpacity`
  margin-bottom: ${hp(-2)}px;
  margin-top: ${hp(-7)}px;
`;

export default GetAuthCodeScreen;
