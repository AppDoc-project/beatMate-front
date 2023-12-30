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

export { login };
