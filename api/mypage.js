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

// 본인이 작성한 글 조회
const getUserWritePost = async () => {
  try {
    const token = await AsyncStorage.getItem('access_token');
    console.log(token);

    const response = await client.get('/community/profile/post', {
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

// 본인이 작성한 댓글 조회
const getUserCommentPost = async () => {
  try {
    const token = await AsyncStorage.getItem('access_token');
    console.log(token);

    const response = await client.get('/community/profile/thread', {
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

// 본인이 북마크한 글 조회
const getUserBookmarkPost = async () => {
  try {
    const token = await AsyncStorage.getItem('access_token');
    console.log(token);

    const response = await client.get('/community/profile/bookmark', {
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

// 비밀번호 변경
const changePassword = async (data) => {
  try {
    const token = await AsyncStorage.getItem('access_token');
    console.log(token);

    const response = await client.patch('/auth/setting/password', data, {
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

// 연락처 변경
const changeContact = async (data) => {
  try {
    const token = await AsyncStorage.getItem('access_token');
    console.log(token);

    const response = await client.patch('/auth/setting/contact', data, {
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

// 닉네임 변경
const changeNickname = async (data) => {
  try {
    const token = await AsyncStorage.getItem('access_token');
    console.log(token);

    const response = await client.patch('/auth/setting/nickname', data, {
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

// 자기소개 변경
const changeDescription = async (data) => {
  try {
    const token = await AsyncStorage.getItem('access_token');
    console.log(token);

    const response = await client.patch('/auth/setting/selfdescription', data, {
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

// 프로필 변경
const changeProfile = async (data) => {
  try {
    const token = await AsyncStorage.getItem('access_token');
    console.log(token);

    const response = await client.patch('/auth/setting/profile', data, {
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

// 프로필 사진 업로드
const postImages = async (data) => {
  try {
    const token = await AsyncStorage.getItem('access_token');

    const response = await client.post('/auth/setting/image', data, {
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

// 회원 탈퇴
const quitUser = async (data) => {
  try {
    const token = await AsyncStorage.getItem('access_token');
    console.log(token);

    const response = await client.post('/auth/setting/removal', data, {
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

// 본인이 찜한 강사 조회
const getLikedTutor = async () => {
  try {
    const token = await AsyncStorage.getItem('access_token');
    console.log(token);

    const response = await client.get('/community/profile/pick', {
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
  getMyPageSection,
  getUserWritePost,
  getUserCommentPost,
  getUserBookmarkPost,
  changePassword,
  changeContact,
  changeNickname,
  changeDescription,
  changeProfile,
  postImages,
  quitUser,
  getLikedTutor,
};
