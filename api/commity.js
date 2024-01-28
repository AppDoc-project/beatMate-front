import AsyncStorage from '@react-native-async-storage/async-storage';

import { client } from './client';

// 커뮤니티 리스트 가져오기
const getCommunitySection = async () => {
  try {
    const token = await AsyncStorage.getItem('access_token');

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

// 특정 게시판에 글 작성하기
const postNewPost = async (data) => {
  try {
    const token = await AsyncStorage.getItem('access_token');

    const response = await client.post('/community/post', data, {
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

// 이미지 첨부
const postImages = async (data) => {
  try {
    const token = await AsyncStorage.getItem('access_token');

    const response = await client.post('/community/images/211.253.26.21', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: token, // 바로 토큰 값 넣기
      },
      data: {
        files: data, // 여기서 data는 FormData 객체
      },
    });

    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// 특정 게시판에 글 첫번째로 불러오기
const getFirstPost = async (limit, communityId) => {
  try {
    const token = await AsyncStorage.getItem('access_token');
    console.log(token);

    const response = await client.get(`/community/post?scroll=false&limit=${limit}&communityId=${communityId}`, {
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

// 특정 게시판에 스크롤 시 글 불러오기
const getNextPost = async (postId, communityId, limit) => {
  try {
    const token = await AsyncStorage.getItem('access_token');

    const response = await client.get(
      `/community/post?scroll=true&postId=${postId}&communityId=${communityId}&limit=${limit}`,
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

// 선택된 게시물 불러오기
const getOnePost = async (postId) => {
  try {
    const token = await AsyncStorage.getItem('access_token');

    const response = await client.get(`/community/post/${postId}`, {
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

// 특정 게시물 댓글 불러오기
const getAllComments = async (postId) => {
  try {
    const token = await AsyncStorage.getItem('access_token');

    const response = await client.get(`/community/thread/${postId}`, {
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

// 댓글 작성하기
const writeComment = async (data) => {
  try {
    const token = await AsyncStorage.getItem('access_token');

    const response = await client.post(`/community/thread`, data, {
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

// 게시글 좋아요 누르기
const pressLike = async (data) => {
  try {
    const token = await AsyncStorage.getItem('access_token');

    const response = await client.post(`/community/like`, data, {
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

// 게시글 북마크 누르기
const pressBookmark = async (data) => {
  try {
    const token = await AsyncStorage.getItem('access_token');

    const response = await client.post(`/community/bookmark`, data, {
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

// 게시글 삭제
const deletePost = async (postId) => {
  try {
    const token = await AsyncStorage.getItem('access_token');

    const response = await client.delete(`/community/post?postId=${postId}`, {
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

export {
  getCommunitySection,
  postNewPost,
  postImages,
  getFirstPost,
  getNextPost,
  getOnePost,
  getAllComments,
  writeComment,
  pressLike,
  pressBookmark,
  deletePost
};
