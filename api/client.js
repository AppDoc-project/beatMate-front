import axios from 'axios';

export const client = axios.create({
  baseURL: 'https://beatmate.zapto.org',
  withCredentials: true,
});
