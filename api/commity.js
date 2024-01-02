import { client } from './client';
import AsyncStorage from '@react-native-async-storage/async-storage';

const getCommunitySection = async () => {
  try {
    const token = await AsyncStorage.getItem('access_token'); // 비동기적으로 AsyncStorage에서 토큰 가져오기

    console.log(token); // 토큰 확인 (디버깅용)

    const response = await client.get('/community/list', {
      headers: {
        Authorization: `${token}`, // 백틱(`)을 사용하여 토큰을 삽입
      },
    });

    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};




export { getCommunitySection };

