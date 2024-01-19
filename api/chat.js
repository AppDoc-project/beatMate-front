import AsyncStorage from '@react-native-async-storage/async-storage';

import { client } from './client';

// 채팅방 목록 가져오기
const getChatList = async () => {
  try {
    const token = await AsyncStorage.getItem('access_token');

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

export { getChatList };
