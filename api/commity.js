import AsyncStorage from '@react-native-async-storage/async-storage';

import { client } from './client';

// 커뮤니티 리스트 가져오기
const getCommunitySection = async () => {
  try {
    const token = await AsyncStorage.getItem('access_token');
    console.log(token); // 토큰 확인 (디버깅용)

    const response = await client.get('/community/list', {
      headers: {
        Authorization: token, // 바로 토큰 값 넣기
      },
    });

    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export { getCommunitySection };
