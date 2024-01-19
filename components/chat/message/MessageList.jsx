import { getMessage } from 'api/chat';
import { UserInfo } from 'context/UserInfoContext';
import format from 'pretty-format';
import PropTypes from 'prop-types';
import React, { useContext, useState, useEffect } from 'react';
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

  useEffect(() => {
    setIsLoading(true);
    getMessage(10, messages.length, roomID)
      .then((res) => {
        console.log(format(res.data));
        setIsLoading(false);
        setChatData(res.data);
        setMessages((prevMessages) => [...prevMessages, ...res.data.data]);
      })
      .catch((err) => {
        console.log(err);
        setIsError(true);
        setIsLoading(false);
      });
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
      keyExtractor={(message) => message.id} // messageId 대신 id 사용
      ListHeaderComponent={() => <DateInfo />}
      renderItem={({ item, index }) =>
        item.sender.userId === myUserId ? (
          <MyMessage
            item={item}
            isLast={index !== messages.length - 1 ? item.sender.userId !== messages[index + 1].sender.userId : true}
          />
        ) : (
          <OthersMessage
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
