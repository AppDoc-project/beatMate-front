import { UserInfo } from 'context/UserInfoContext';
import React, { useContext, useState } from 'react';
import { FlatList } from 'react-native';

import MyMessage from './MyMessage';
import OthersMessage from './OthersMessage';
import DateInfo from '../DateInfo';

function MessageList(roomID) {
  const {
    loginUserInfo: [loginUser],
  } = useContext(UserInfo);

  const myUserId = loginUser.id; //현재 내 id

  const [messages] = useState([
    {
      messageId: 1,
      userId: 2,
      content: '안녕하세요. 바이올린 강사 김연주입니다.',
    },
    {
      messageId: 2,
      userId: 2,
      content: '대면 레슨 장소는 홍대입니다.',
    },
    {
      messageId: 3,
      userId: 1,
      content: '네! 잘 부탁드리겠습니다~~~~',
    },
    {
      messageId: 4,
      userId: 2,
      content: '네! 수강생님 그날 시간 맞춰서 해당 장소로 와주시면 됩니다! 모레 뵙도록 하겠습니다! 감사합니다.',
    },
  ]);

  return (
    <FlatList
      ref={(ref) => (this.flatList = ref)}
      onLayout={() => this.flatList.scrollToEnd({ animated: true })}
      data={messages}
      showsVerticalScrollIndicator={false}
      keyExtractor={(message) => message.messageId}
      ListHeaderComponent={() => <DateInfo />}
      renderItem={({ item, index }) =>
        item.userId === myUserId ? (
          <MyMessage
            item={item}
            isLast={index !== messages.length - 1 ? item.userId !== messages[index + 1].userId : true}
          />
        ) : (
          <OthersMessage
            item={item}
            isLast={index !== messages.length - 1 ? item.userId !== messages[index + 1].userId : true}
          />
        )
      }
    />
  );
}

export default MessageList;
