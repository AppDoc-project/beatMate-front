import AsyncStorage from '@react-native-async-storage/async-storage';

import { client } from './client';

/* 인증 API 관련 사항들 */

// 튜터 회원가입
const signupTutor = (data) => client.post('/auth/join/tutor', data, {});

// 튜티 회원가입
const signupTutee = (data) => client.post('/auth/join/tutee', data, {});

// 로그아웃
const logout = () => client.post(`/auth/logout`);

// 튜티 이메일 인증
const validTuteeEmail = (data) => client.post('/auth/validate/tutee', data, {});

// 튜터 이메일 인증
const validTutorEmail = (data) => client.post('/auth/validate/tutor', data, {});

// 로그인
const login = (email, password) =>
  client.post(
    '/auth/login',
    {},
    {
      headers: {
        email,
        password,
      },
    },
  );
// 튜티 & 튜터 중복 이메일 확인
const checkSingleEmail = (data) => client.post(`/auth/join/duplication`, data, {});

// 이미지 첨부
const postImages = (data) =>
  client.post('/auth/images/211.253.26.21', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: {
      files: data, // 여기서 data는 FormData 객체
    },
  });

// 비밀번호 찾기: 메일 입력
const getNewEmail = (email) => client.get('/auth/password/code?email=' + email);

// 비밀번호 찾기: 인증코드 입력
const getNewAuthCode = (data) => client.post('/auth/password/code', data, {});

// 비밀번호 찾기: 비밀번호 변경
const changeNewPassword = (data) => client.patch('/auth/password', data, {});

// 본인에 대한 정보 가져오기
const getUserInfo = async () => {
  try {
    const token = await AsyncStorage.getItem('access_token');

    const response = await client.get('/auth/server/user/my', {
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
  signupTutor,
  signupTutee,
  logout,
  validTuteeEmail,
  validTutorEmail,
  login,
  checkSingleEmail,
  postImages,
  getNewEmail,
  getNewAuthCode,
  changeNewPassword,
  getUserInfo,
};
