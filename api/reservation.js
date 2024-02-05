import AsyncStorage from '@react-native-async-storage/async-storage';

import { client } from './client';

// 예약 만들기
const makeReserve = async (data) => {
  try {
    const token = await AsyncStorage.getItem('access_token');

    const response = await client.post('/tutor/reservation', data, {
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

export { makeReserve };
