import AsyncStorage from '@react-native-async-storage/async-storage';

import { client } from './client';

// 예약 만들기
const makeReserve = async (data) => {
  try {
    const token = await AsyncStorage.getItem('access_token');

    const response = await client.post(`/tutor/reservation`, data, {
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

// 예약 리스트 가져오기
const getReserveList = async () => {
  try {
    const token = await AsyncStorage.getItem('access_token');

    const response = await client.get(`/tutor/reservation/list`, {
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

// 예약 취소하기
const deleteReserve = async (reservationId) => {
  try {
    const token = await AsyncStorage.getItem('access_token');

    const response = await client.delete(`/tutor/reservation?reservationId=${reservationId}`, {
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

export { makeReserve, getReserveList, deleteReserve };
