import ChatSideInfo from '@components/chat/ChatSideInfo';
import MessageInput from '@components/chat/message/MessageInput';
import MessageList from '@components/chat/message/MessageList';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useHeaderHeight } from '@react-navigation/elements';
import { useRoute } from '@react-navigation/native';
import { readAllMessage } from 'api/chat';
import { COLORS } from 'colors';
import format from 'pretty-format';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Platform, Text, View } from 'react-native';
import { styled } from 'styled-components/native';

/**
 * 채팅 방 화면
 * 채팅 내역을 보여주고 상대방과 채팅이 가능합니다.
 * @param headerHeight : 현재 디자인 상 IOS에서 keyboardVerticalOffset을 구하기 위해서는 ChatScreen의 헤더 높이와 ChatRoomScreen의 헤더
 *                                 높이가 필요하다. 따라서 ChatScreen의 헤더 높이를 initialParams를 통해 받아옴
 */
function ChatRoomScreen({ route }) {
  /** 채팅탭을 눌렀을때 최상단에 위치하는 헤더의 높이를 의미 */
  const { headerHeight } = useRoute().params;
  /** 채팅방을 들어갔을 때 상대방의 정보를 나타내는 헤더 높이 */
  const chatRoomHeaderHeight = useHeaderHeight();
  /** 탭의 높이 */
  const _tabBartHeight = useBottomTabBarHeight();
  /** input의 focus 여부에 따라 세팅될 탭의 높이 */
  const [tabBarHeight, setTabBarHeight] = useState(0);

  /** IOS의 경우 해당
   * tabBarHideOnKeyboard: false로 설정해주었기 떄문에 TextInput이 focus될 경우 bottomTab이 사라짐
   * 따라서 keyboardVerticalOffset에 사라진 bottomTab의 Height 만큼  더해주어야 한다.
   * 반대로 Input이 OutFocus 될때는 bottmTab이 나타나므로 다시 0으로 세팅 해주어야 함
   */
  const onFocusInput = () => setTabBarHeight(_tabBartHeight);
  const onOutFocusInput = () => setTabBarHeight(0);

  const { room } = route.params; //채팅방 정보 api

  console.log(room.target.userId);

  // 채팅방 들어갈때 모든 메세지 확인 API
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    readAllMessage(room.id)
      .then((res) => {
        console.log(format(res.data));
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsError(true);
        setIsLoading(false);
      });
  }, [room.id]);

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
    <Container behavior={Platform.OS === 'ios' ? 'padding' : null} keyboardVerticalOffset={headerHeight}>
      <ChatSideInfo room={room} />
      <MessageList roomID={room.id} />
      <MessageInput onFocus={onFocusInput} onBlur={onOutFocusInput} targetId={room.target.userId} />
    </Container>
  );
}

ChatRoomScreen.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      room: PropTypes.shape({
        id: PropTypes.string,
        target: PropTypes.shape({
          name: PropTypes.string,
          userId: PropTypes.number,
          profile: PropTypes.string,
        }),
        notReadYet: PropTypes.number,
        lastMessage: PropTypes.string,
        lastTime: PropTypes.string,
      }),
      headerHeight: PropTypes.number,
    }),
  }),
};

const Container = styled(KeyboardAvoidingView)`
  flex: 1;
  background-color: ${COLORS.white};
`;

export default ChatRoomScreen;
