import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { getMessage } from 'api/chat';
import { UserInfo } from 'context/UserInfoContext';
import format from 'pretty-format';
import PropTypes from 'prop-types';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import socketio from 'socket.io-client';

import MyMessage from './MyMessage';
import OthersMessage from './OthersMessage';
import DateInfo from '../DateInfo';

function MessageList({ roomID }) {
  const {
    loginUserInfo: [loginUser],
  } = useContext(UserInfo);

  const myUserId = loginUser.id;

  const [messages, setMessages] = useState([]);
  const [ChatData, setChatData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const socketRef = useRef(null);

  const loadMoreMessages = () => {
    if (!isLoading && !isError) {
      setIsLoading(true);
      getMessage(10, messages.length, roomID)
        .then((res) => {
          setIsLoading(false);
          setChatData(res.data);
          setMessages((prevMessages) => [...prevMessages, ...res.data.data]);
        })
        .catch((err) => {
          console.log(err);
          setIsError(true);
          setIsLoading(false);
        });
    }
  };

  const initializeSocket = async () => {
    const token = await AsyncStorage.getItem('access_token');
    console.log('Trying to initialize socket...');
    console.log('Token:', token);

    // 이전 소켓 연결이 있으면 해제
    if (socketRef.current) {
      socketRef.current.disconnect();
    }

    // 소켓 연결 초기화
    socketRef.current = socketio(`http://192.168.1.157/room?roomId=${roomID}`, {
      path: '/socket.io',
      extraHeaders: {
        Authorization: `${token}`,
      },
    });

    // 소켓 이벤트 리스너 등록
    socketRef.current.on('message', (newMessage) => {
      console.log('newMessage', newMessage);
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    // 언마운트 시 소켓 연결 해제
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  };

  useFocusEffect(
    React.useCallback(() => {
      initializeSocket();
    }, [roomID]),
  );

  useEffect(() => {
    loadMoreMessages();
  }, [roomID]);

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
    <FlatList
      ref={(ref) => (this.flatList = ref)}
      onLayout={() => this.flatList.scrollToEnd({ animated: true })}
      data={messages}
      showsVerticalScrollIndicator={false}
      keyExtractor={(message) => `message_${message.id}`}
      ListHeaderComponent={() => <DateInfo />}
      onEndReached={loadMoreMessages}
      onEndReachedThreshold={0.1}
      inverted={true}
      renderItem={({ item, index }) =>
        item.sender.userId === myUserId ? (
          <MyMessage
            key={`message_${item.id}`}
            item={item}
            isLast={index !== messages.length - 1 ? item.sender.userId !== messages[index + 1].sender.userId : true}
          />
        ) : (
          <OthersMessage
            key={`message_${item.id}`}
            item={item}
            isLast={index !== messages.length - 1 ? item.sender.userId !== messages[index + 1].sender.userId : true}
          />
        )
      }
    />
  );
}

MessageList.propTypes = {
  roomID: PropTypes.string.isRequired,
};

export default MessageList;
