import AsyncStorage from '@react-native-async-storage/async-storage';

import { client } from './client';

// 아직 피드백/리뷰를 작성하지 않은 레슨 불러오기
const notWriteLesson = async () => {
  try {
    const token = await AsyncStorage.getItem('access_token');

    const response = await client.get('/lesson/yet', {
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

// 년/월별레슨 정보
const getAllLessonInfo = async (year, month) => {
  try {
    const token = await AsyncStorage.getItem('access_token');
    console.log(token);

    const response = await client.get(`/lesson/detail?year=${year}&month=${month}`, {
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

// 현재 진행 중인 레슨 정보
const onGoingLesson = async () => {
  try {
    const token = await AsyncStorage.getItem('access_token');

    const response = await client.get('/lesson/ongoing', {
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

// 리뷰 작성하기
const writeReview = async (data) => {
  try {
    const token = await AsyncStorage.getItem('access_token');
    console.log(token);

    const response = await client.put('/lesson/review', data, {
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

// 피드백 작성하기
const writeFeedBack = async (data) => {
  try {
    const token = await AsyncStorage.getItem('access_token');
    console.log(token);

    const response = await client.put('/lesson/feedback', data, {
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

// 레슨 종료
const finishLesson = async (lessonId) => {
  try {
    const token = await AsyncStorage.getItem('access_token');
    console.log(token);

    const response = await client.get(`/lesson/end?lessonId=${lessonId}`, {
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

export { notWriteLesson, getAllLessonInfo, onGoingLesson, writeReview, writeFeedBack, finishLesson };
