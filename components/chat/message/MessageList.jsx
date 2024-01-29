import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import { getMessage, readCertainChat } from 'api/chat';
import { UserInfo } from 'context/UserInfoContext';
import format from 'pretty-format';
import PropTypes from 'prop-types';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { FlatList } from 'react-native';
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
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const socketRef = useRef(null);

  const loadMoreMessages = async () => {
    if (!isLoading && !isError) {
      try {
        setIsLoading(true);
        const res = await getMessage(10, messages.length, roomID);
        console.log('이후 메세지:', format(res.data));
        setMessages((prevMessages) => [...prevMessages, ...res.data.data]);
      } catch (error) {
        console.error(error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const [groupedMessages, setGroupedMessages] = useState([]);

  const groupMessagesByDate = (messageList) => {
    const grouped = messageList.reduce((acc, message) => {
      if (message.createdAt) {
        const date = message.createdAt.substring(0, 10);
        acc[date] = acc[date] || [];
        acc[date].push(message);
      }
      return acc;
    }, {});
    return Object.entries(grouped).map(([date, messages]) => ({
      date,
      messages,
    }));
  };

  useEffect(() => {
    setGroupedMessages(groupMessagesByDate(messages));
  }, [messages]);

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

  useEffect(() => {
    const fetchData = async () => {
      initializeSocket();
      try {
        setIsLoading(true);
        const res = await getMessage(10, messages.length, roomID);
        console.log('처음 메세지:', format(res.data));
        setMessages(res.data.data);
      } catch (error) {
        console.error(error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [roomID]);

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
      data={groupedMessages}
      showsVerticalScrollIndicator={false}
      keyExtractor={(group) => `group_${group.date}`}
      inverted={true}
      renderItem={({ item: group }) => (
        <>
          {group.messages.map((item, index) =>
            item.sender.userId === myUserId ? (
              <MyMessage key={`message_${item.id}`} item={item} />
            ) : (
              <OthersMessage key={`message_${item.id}`} item={item} />
            ),
          )}
          <DateInfo date={group.date} />
        </>
      )}
      onEndReached={() => {
        loadMoreMessages();
      }}
      onEndReachedThreshold={0.1}
    />
  );
}

MessageList.propTypes = {
  roomID: PropTypes.string.isRequired,
};

export default MessageList;
