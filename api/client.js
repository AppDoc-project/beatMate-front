import axios from 'axios';

export const client = axios.create({
  baseURL: 'http://192.168.45.233',
  withCredentials: true,
});
