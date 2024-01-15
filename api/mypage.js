import AsyncStorage from '@react-native-async-storage/async-storage';

import { client } from './client';

// 프로필 조회 가져오기
const getMyPageSection = async () => {
  try {
    const token = await AsyncStorage.getItem('access_token');
    console.log(token); // 토큰 확인 (디버깅용)

    const response = await client.get('/community/profile/info', {
      headers: {
        Authorization: token, // 바로 토큰 값 넣기
      },
    });
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export { getMyPageSection };
