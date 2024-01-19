import { useFocusEffect } from '@react-navigation/native';
import { getMessage } from 'api/chat';
import { UserInfo } from 'context/UserInfoContext';
import format from 'pretty-format';
import PropTypes from 'prop-types';
import React, { useContext, useState } from 'react';
import { FlatList, Text, View } from 'react-native';

import MyMessage from './MyMessage';
import OthersMessage from './OthersMessage';
import DateInfo from '../DateInfo';

function MessageList({ roomID }) {
  const {
    loginUserInfo: [loginUser],
  } = useContext(UserInfo);

  const myUserId = loginUser.id; // 현재 내 id

  const [messages, setMessages] = useState([]);
  const [ChatData, setChatData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const loadMoreMessages = () => {
    if (!isLoading && !isError) {
      setIsLoading(true);
      getMessage(10, messages.length, roomID)
        .then((res) => {
          setIsLoading(false);
          setChatData(res.data);
          console.log(format(res.data));
          setMessages((prevMessages) => [...prevMessages, ...res.data.data]);
        })
        .catch((err) => {
          console.log(err);
          setIsError(true);
          setIsLoading(false);
        });
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      loadMoreMessages();
    }, [roomID]),
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
    <FlatList
      ref={(ref) => (this.flatList = ref)}
      onLayout={() => this.flatList.scrollToEnd({ animated: true })}
      data={messages}
      showsVerticalScrollIndicator={false}
      keyExtractor={(message) => `message_${message.id}`}
      ListHeaderComponent={() => <DateInfo />}
      onEndReached={loadMoreMessages}
      onEndReachedThreshold={0.1} // 조절이 필요하면 적절한 값으로 수정
      inverted={true} // 화면을 역순으로 보여주도록 설정
      renderItem={({ item, index }) =>
        item.sender.userId === myUserId ? (
          <MyMessage
            key={`message_${item.id}`} // 이 부분을 추가해보세요
            item={item}
            isLast={index !== messages.length - 1 ? item.sender.userId !== messages[index + 1].sender.userId : true}
          />
        ) : (
          <OthersMessage
            key={`message_${item.id}`} // 이 부분을 추가해보세요
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
