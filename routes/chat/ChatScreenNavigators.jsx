import { useHeaderHeight } from '@react-navigation/elements';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ChatListScreen from '@screens/chat/ChatListScreen';
import ChatRoomScreen from '@screens/chat/ChatRoomScreen';
import React from 'react';

const Stack = createNativeStackNavigator();

/**
 * 채팅 탭 라우팅
 * ChatListScreen -> 채팅 탭 눌렀을 때 나오는 화면, 현재 참여한 채팅방 목록을 보여준다.
 * ChatRoomScreen -> 특정 채팅방 목록을 눌렀을때 나오는 채팅방 화면
 */
function ChatScreenNavigator() {
  const chatScreenHeaderHeight = useHeaderHeight();

  return (
    <Stack.Navigator initialRouteName={'chat-list'}>
      <Stack.Screen
        name={'chat-list'}
        component={ChatListScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={'chat-room'}
        component={ChatRoomScreen}
        initialParams={{ chatScreenHeaderHeight }}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

export default ChatScreenNavigator;
