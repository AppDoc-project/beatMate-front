import ChatRoomList from '@components/chat/list/ChatRoomList';
import { useFocusEffect } from '@react-navigation/native';
import { getChatList } from 'api/chat';
import format from 'pretty-format';
import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { styled } from 'styled-components/native';

function ChatListScreen() {
  const [chatListInfo, setChatListInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const reGetChatList = () => {
    setIsLoading(true);
    getChatList()
      .then((res) => {
        console.log(format(res.data));
        setChatListInfo(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsError(true);
        setIsLoading(false);
      });
  };

  useFocusEffect(
    React.useCallback(() => {
      setIsLoading(true);
      getChatList()
        .then((res) => {
          console.log(format(res.data));
          setChatListInfo(res.data);
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setIsError(true);
          setIsLoading(false);
        });
    }, []),
  );

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
    <Container>
      <RedoWrapper onPress={reGetChatList}>
        <MaterialIcons name="refresh" size={35} marginTop={hp(2)} marginBottom={hp(2)} marginRight={wp(2)} />
      </RedoWrapper>
      {chatListInfo !== null && <ChatRoomList rooms={chatListInfo} />}
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  background-color: #fff;
`;

const RedoWrapper = styled.TouchableOpacity`
  flex-direction: row-reverse;
  margin-left: ${wp(5)}px;
`;

export default ChatListScreen;
