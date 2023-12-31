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

// 튜티 이메일 인증
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
  client.post('/auth/image', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

export { signupTutor, signupTutee, logout, validTuteeEmail, validTutorEmail, login, checkSingleEmail, postImages };
