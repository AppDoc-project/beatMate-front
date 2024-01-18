import axios from 'axios';

export const client = axios.create({
  baseURL: 'http://192.168.123.121',
  withCredentials: true,
});
