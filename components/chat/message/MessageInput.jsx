import EnterIcon from '@assets/chat/EnterIcon';
import { useNavigation } from '@react-navigation/native';
import { writeNewChat } from 'api/chat';
import { COLORS } from 'colors';
import { UserInfo } from 'context/UserInfoContext';
import format from 'pretty-format';
import PropTypes from 'prop-types';
import React, { useContext, useState } from 'react';
import { Alert, Text, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { styled } from 'styled-components/native';

MessageInput.propTypes = {
  setMessages: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  targetId: PropTypes.number,
  messages: PropTypes.array,
};

// 메세지 입력 및 전송
function MessageInput({ onFocus, onBlur, targetId }) {
  const {
    loginUserInfo: [loginUser],
  } = useContext(UserInfo);
  const navigation = useNavigation();

  const myUserId = loginUser.id; // 현재 내 id

  const [sendText, setsendText] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const onPressSendBtn = () => {
    const data = {
      senderId: myUserId,
      receiverId: targetId,
      text: sendText,
    };

    console.log(data);

    setIsLoading(true);
    writeNewChat(data)
      .then((res) => {
        setIsLoading(false);
        setsendText('');
        console.log('채팅보내기 성공', format(res.data));
      })
      .catch((error) => {
        if (error.response && error.response.data.code === 408) {
          Alert.alert('알림', '로그인을 해주세요.');
          navigation.navigate('homeScreen');
        } else if (error.response && error.response.data.code === 500) {
          Alert.alert('알림', '서버에러가 발생했습니다. 잠시 후 다시 시도해 주세요.');
        } else {
          console.log('채팅보내기 실패', error);
          setIsError(true);
        }
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
    <Form>
      <Input
        value={sendText}
        onChangeText={setsendText}
        placeholder={'메세지 보내기'}
        onFocus={onFocus}
        onBlur={onBlur}
      />
      <EnterWrapper onPress={onPressSendBtn}>
        <EnterIcon fillColor={sendText ? COLORS.main : COLORS.lightgray01} />
      </EnterWrapper>
    </Form>
  );
}

const Form = styled.View`
  min-height: 10%;
  padding: ${RFValue(4)}px;
  margin-top: auto;

  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const Input = styled.TextInput`
  width: ${wp(80)}px;

  padding: ${RFValue(12)}px;
  background-color: ${COLORS.lightgray01};
  border-radius: ${RFValue(18)}px;
  margin-right: ${wp(1)}px;
`;

const EnterWrapper = styled.TouchableOpacity``;

export default MessageInput;
