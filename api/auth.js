import { client } from './client';

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

//튜티 회원가입

//튜티 & 튜터 중복 이메일 확인
const checkSingleEmail = (email) => {
  const data = { email }; // 객체 형태로 email 속성을 갖는 데이터 생성
  return client.post(`/auth/join/duplication`, data, {});
};

//튜티 & 튜터 이메일 인증

export { login, checkSingleEmail };
