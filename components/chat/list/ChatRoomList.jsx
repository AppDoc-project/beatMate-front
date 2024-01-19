import PropTypes from 'prop-types';
import React from 'react';
import { styled } from 'styled-components/native';

import ChatRoomListItem from './ChatRoomListItem.jsx';

ChatRoomList.propTypes = {
  rooms: PropTypes.shape({
    data: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired, // 채팅방 id
        target: PropTypes.shape({
          name: PropTypes.string.isRequired, // 채팅 상대방 이름
          userId: PropTypes.number.isRequired, // 채팅 상대방 userId
          profile: PropTypes.string, // 채팅 상대방 프로필 이미지 URL 또는 null
        }).isRequired,
        notReadYet: PropTypes.number.isRequired, // 내가 읽지 않은 메세지 수
        lastMessage: PropTypes.string.isRequired, // 채팅방 마지막 메세지
        lastTime: PropTypes.string.isRequired, // 마지막 채팅 시간
      }),
    ),
  }),
};

function ChatRoomList({ rooms }) {
  console.log('ChatRoomList 부분');
  console.log(rooms);
  return (
    <Container>
      <ChatRoomListScrollView>
        {rooms && rooms.data.map((room) => <ChatRoomListItem key={room.id} room={room} />)}
      </ChatRoomListScrollView>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
`;

const ChatRoomListScrollView = styled.ScrollView`
  flex-grow: 1;
`;

export default ChatRoomList;
