import axios from 'axios';

export const client = axios.create({
  baseURL: 'http://192.168.123.105',
  withCredentials: true,
});
