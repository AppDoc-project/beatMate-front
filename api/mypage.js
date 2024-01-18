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

    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getMyPostSection = async (page, limit) => {
  try {
    const token = await AsyncStorage.getItem('access_token');
    const response = await client.get(`/community/profile/post`, {
      headers: {
        Authorization: token,
      },
      params: {
        page,
        limit,
      },
    });
    return response.data.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// 본인이 작성한 글 조회
const getUserWritePost = async () => {
  try {
    const token = await AsyncStorage.getItem('access_token');
    console.log(token); // 토큰 확인 (디버깅용)

    const response = await client.post('/community/profile/post', {
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

// 본인이 작성한 댓글 조회
const getUserCommentPost = async () => {
  try {
    const token = await AsyncStorage.getItem('access_token');
    console.log(token); // 토큰 확인 (디버깅용)

    const response = await client.post('/community/profile/thread', {
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

// 본인이 북마크한 글 조회
const getUserBookmarkPost = async () => {
  try {
    const token = await AsyncStorage.getItem('access_token');
    console.log(token); // 토큰 확인 (디버깅용)

    const response = await client.post('/community/profile/bookmark', {
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

export { getMyPageSection, getMyPostSection, getUserWritePost, getUserCommentPost, getUserBookmarkPost };
