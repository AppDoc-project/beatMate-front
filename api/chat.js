import AsyncStorage from '@react-native-async-storage/async-storage';

import { client } from './client';

// 채팅방 목록 가져오기
const getChatList = async () => {
  try {
    const token = await AsyncStorage.getItem('access_token');
    console.log(token);

    const response = await client.get('/chat/room', {
      headers: {
        Authorization: token,
      },
    });

    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

//채팅방 들어갈때 모든 메세지를 확인하기
const readAllMessage = async (chatRoomId) => {
  try {
    const token = await AsyncStorage.getItem('access_token');
    console.log(token);

    const response = await client.get('/chat/check', {
      params: {
        id: chatRoomId,
      },
      headers: {
        Authorization: token,
      },
    });

    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export { getChatList, readAllMessage };
