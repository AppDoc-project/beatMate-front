import EnterIcon from '@assets/chat/EnterIcon';
import { writeNewChat } from 'api/chat';
import { COLORS } from 'colors';
import { UserInfo } from 'context/UserInfoContext';
import format from 'pretty-format';
import PropTypes from 'prop-types';
import React, { useContext, useState } from 'react';
import { Text, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { styled } from 'styled-components/native';

MessageInput.propTypes = {
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  targetId: PropTypes.number,
};

// 메세지 입력 및 전송
function MessageInput({ onFocus, onBlur, targetId, onSendMessage }) {
  const {
    loginUserInfo: [loginUser],
  } = useContext(UserInfo);

  const [sendText, setsendText] = useState('');

  const myUserId = loginUser.id; // 현재 내 id

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const onPressSendBtn = () => {
    const data = {
      senderId: myUserId,
      receiverId: targetId,
      text: sendText,
    };

    onSendMessage(data);

    console.log(data);

    setIsLoading(true);
    writeNewChat(data)
      .then((res) => {
        setIsLoading(false);
        setsendText('');
        console.log(format(res.data));
      })
      .catch((err) => {
        console.log(err);
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
