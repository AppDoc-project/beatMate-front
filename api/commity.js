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

    const response = await client.post('/community/images', data, {
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

// 댓글 삭제
const deleteComment = async (threadId) => {
  try {
    const token = await AsyncStorage.getItem('access_token');

    const response = await client.delete(`/community/thread?threadId=${threadId}`, {
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

// 게시글 수정하기
const modifyPost = async (data) => {
  try {
    const token = await AsyncStorage.getItem('access_token');

    const response = await client.patch('/community/post', data, {
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

// 게시판 별 검색창에서 처음 검색하기
const getFirstSearchPost = async (communityId, limit, keyword, postSearchType) => {
  try {
    const token = await AsyncStorage.getItem('access_token');
    console.log(token);

    const response = await client.get(
      `/community/search/${communityId}?scroll=false&limit=${limit}&keyword=${keyword}&postSearchType=${postSearchType}`,
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

// 게시판 별 검색창에서 무한스크롤 다음 검색하기
const getNextSearchPost = async (communityId, limit, keyword, postSearchType, postId) => {
  try {
    const token = await AsyncStorage.getItem('access_token');
    console.log(token);

    const response = await client.get(
      `/community/search/${communityId}?scroll=true&limit=${limit}&postId=${postId}&keyword=${keyword}&postSearchType=${postSearchType}`,
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
  deletePost,
  deleteComment,
  modifyPost,
  getFirstSearchPost,
  getNextSearchPost,
};
