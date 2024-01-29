import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import { getMessage, readCertainChat } from 'api/chat';
import { UserInfo } from 'context/UserInfoContext';
import format from 'pretty-format';
import PropTypes from 'prop-types';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { FlatList, RefreshControl } from 'react-native';
import socketio from 'socket.io-client';

import MyMessage from './MyMessage';
import OthersMessage from './OthersMessage';

function MessageList({ roomID }) {
  const {
    loginUserInfo: [loginUser],
  } = useContext(UserInfo);

  const myUserId = loginUser.id;

  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const socketRef = useRef(null);

  const loadMessages = async (count, offset) => {
    try {
      setIsLoading(true);
      const res = await getMessage(count, offset, roomID);
      console.log('Messages:', format(res.data));

      if (res.data.data) {
        const sortedMessages = res.data.data.sort((a, b) => {
          const timeA = new Date(a.createdAt).getTime();
          const timeB = new Date(b.createdAt).getTime();
          return timeA - timeB;
        });

        setMessages(sortedMessages);
      }
    } catch (error) {
      console.error(error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const loadMoreMessages = async () => {
    if (!isLoading && !isError) {
      try {
        setIsLoading(true);
        const res = await getMessage(7, messages.length, roomID);

        if (res.data.data) {
          const combinedMessages = [...messages, ...res.data.data];
          const sortedMessages = combinedMessages.sort((a, b) => {
            const timeA = new Date(a.createdAt).getTime();
            const timeB = new Date(b.createdAt).getTime();
            return timeA - timeB;
          });

          setMessages(sortedMessages);
        }
      } catch (error) {
        console.error(error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadMessages(7, 0); // 새로고침 시 초기 데이터를 불러옴
    setRefreshing(false);
  };

  const initializeSocket = async () => {
    const token = await AsyncStorage.getItem('access_token');
    console.log('Trying to initialize socket...');
    console.log('Token:', token);
    console.log(roomID);

    if (socketRef.current) {
      socketRef.current.disconnect();
    }

    socketRef.current = socketio(`http://211.253.26.21/chat/socket?roomId=${roomID}`, {
      transports: ['polling'],
      path: '/socket.io',
      extraHeaders: {
        Authorization: `${token}`,
      },
    });

    socketRef.current.on('connect', () => {
      console.log('Socket connected successfully');
    });

    socketRef.current.on('connect_error', (error) => {
      console.error('Socket connection failed:', error);
    });

    socketRef.current.on('message', (newMessage) => {
      console.log('newMessage', newMessage);
      setMessages((prevMessages) => [...prevMessages, newMessage]);

      if (myUserId !== newMessage.sender.userId) {
        // 특정 채팅 확인 관련 로직
        const data = {
          roomId: roomID,
          chatId: newMessage.id,
        };

        readCertainChat(data)
          .then((res) => {
            const { data } = res;
            console.log('특정 채팅 확인 완료', format(data));
          })
          .catch((error) => console.log('특정 채팅 확인 실패', format(error)));
      }
    });
  };

  useFocusEffect(
    React.useCallback(() => {
      initializeSocket();
      loadMessages(7, messages.length);
    }, [roomID]),
  );

  //화면에서 포커스가 사라질때
  const isFocused = useIsFocused();

  useEffect(() => {
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        console.log('소켓 없음');
      }
    };
  }, [isFocused]);

  return (
    <FlatList
      ref={(ref) => (this.flatList = ref)}
      data={messages}
      showsVerticalScrollIndicator={false}
      keyExtractor={(message) => `message_${message.id}`}
      onEndReached={() => {
        if (messages.length > 0 && messages[messages.length - 1].data) {
          loadMoreMessages();
        }
      }}
      onEndReachedThreshold={0.1}
      inverted={true}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      renderItem={({ item, index }) => {
        return item.sender.userId === myUserId ? (
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
        );
      }}
    />
  );
}

MessageList.propTypes = {
  roomID: PropTypes.string.isRequired,
};

export default MessageList;
