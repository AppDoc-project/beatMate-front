import { client } from './client';

/* 인증 API 관련 사항들 */

// 튜터 회원가입
const signupTutor = (data) => client.post('/auth/join/tutor', data, {});

// 튜티 회원가입
const signupTutee = (data) => client.post('/auth/join/tutee', data, {});

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
  client.post('/auth/images/192.168.45.240', data, {
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

export {
  signupTutor,
  signupTutee,
  validTuteeEmail,
  validTutorEmail,
  login,
  checkSingleEmail,
  postImages,
  getNewEmail,
  getNewAuthCode,
  changeNewPassword,
};
