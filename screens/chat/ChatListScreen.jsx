import ChatRoomList from '@components/chat/list/ChatRoomList';
import { useFocusEffect } from '@react-navigation/native';
import { getChatList } from 'api/chat';
import format from 'pretty-format';
import React, { useState, useCallback } from 'react';
import { View, Text } from 'react-native';
import { styled } from 'styled-components/native';

function ChatListScreen() {
  const [chatListInfo, setChatListInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const loadChatList = useCallback(() => {
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
  }, []);

  useFocusEffect(loadChatList);

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

  return <Container>{chatListInfo !== null && <ChatRoomList rooms={chatListInfo} />}</Container>;
}

const Container = styled.View`
  flex: 1;
  background-color: #fff;
`;

export default ChatListScreen;
