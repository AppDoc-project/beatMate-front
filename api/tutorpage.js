import AsyncStorage from '@react-native-async-storage/async-storage';

import { client } from './client';

// 튜터 찜 토클
const postPickTutor = async (data) => {
  try {
    const token = await AsyncStorage.getItem('access_token');

    const response = await client.post('/tutor/pick', data, {
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

// 이름으로 강사 검색하기
const searchWithTutorName = async (name) => {
  try {
    const token = await AsyncStorage.getItem('access_token');
    console.log(token);

    const response = await client.get(`/tutor/name?name=${name}`, {
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

// 정렬 기준으로 강사 검색하기
const searchWithSortOption = async (type, speciality, page, limit) => {
  try {
    const token = await AsyncStorage.getItem('access_token');
    console.log(token);

    const response = await client.get(
      `/community/search?type=${type}&speciality=${speciality}&page=${page}&limit=${limit}`,
      {
        headers: {
          Authorization: token,
        },
      },
    );

    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// 특정 강사의 상세 정보 가져오기
const getDatailTutorInfo = async (tutorId) => {
  try {
    const token = await AsyncStorage.getItem('access_token');
    console.log(token);

    const response = await client.get(`/tutor/detail?tutorId=${tutorId}`, {
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

// 특정 강사의 리뷰 내용 처음 가져오기
const getFirstTutorReview = async (tutorId, limit) => {
  try {
    const token = await AsyncStorage.getItem('access_token');
    console.log(token);

    const response = await client.get(`/tutor/review?scroll=false&tutorId=${tutorId}&limit=${limit}`, {
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

// 특정 강사의 리뷰 내용 다음으로 가져오기
const getNextTutorReview = async (tutorId, limit, reviewId) => {
  try {
    const token = await AsyncStorage.getItem('access_token');
    console.log(token);

    const response = await client.get(
      `/tutor/review?scroll=true&tutorId=${tutorId}&limit=${limit}&reviewId=${reviewId}`,
      {
        headers: {
          Authorization: token,
        },
      },
    );

    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export {
  postPickTutor,
  searchWithTutorName,
  searchWithSortOption,
  getDatailTutorInfo,
  getFirstTutorReview,
  getNextTutorReview,
};
