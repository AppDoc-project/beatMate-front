import axios from 'axios';

export const client = axios.create({
  baseURL: 'http://192.168.240.164',
  withCredentials: true,
});
