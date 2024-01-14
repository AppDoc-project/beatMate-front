import axios from 'axios';

export const client = axios.create({
  baseURL: 'http://192.168.160.8',
  withCredentials: true,
});
