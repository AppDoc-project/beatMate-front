import PropTypes from 'prop-types';
import React from 'react';
import { styled } from 'styled-components/native';

import ChatRoomListItem from './ChatRoomListItem.jsx';

ChatRoomList.propTypes = {
  rooms: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      profile: PropTypes.number,
      name: PropTypes.string,
      lastChat: PropTypes.string,
      lastUpdated: PropTypes.string,
    }),
  ),
};

function ChatRoomList({ rooms }) {
  return (
    <Container>
      <ChatRoomListScrollView>
        {rooms.map((room) => (
          <ChatRoomListItem key={room.id} room={room} />
        ))}
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
