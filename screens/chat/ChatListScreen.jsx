import ChatRoomList from '@components/chat/list/ChatRoomList';
import React from 'react';
import { styled } from 'styled-components/native';

/**
 *
 * @returns
 */
function ChatListScreen() {
  const chatRooms = [
    {
      id: 1,
      profile: require('@assets/profile.png'),
      name: '김연주',
      lastChat: '네~ 잘 부탁드리겠습니다 ^^',
      lastUpdated: '2023.08.18',
    },
    {
      id: 2,
      profile: require('@assets/profile.png'),
      name: '김연주',
      lastChat: '네~ 잘 부탁드리겠습니다 ^^',
      lastUpdated: '2023.08.18',
    },
    {
      id: 3,
      profile: require('@assets/profile.png'),
      name: '김연주',
      lastChat: '네~ 잘 부탁드리겠습니다 ^^',
      lastUpdated: '2023.08.18',
    },
  ];

  return (
    <Container>
      <ChatRoomList rooms={chatRooms} />
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  background-color: #fff;
`;

export default ChatListScreen;
