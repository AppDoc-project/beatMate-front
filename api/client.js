import axios from 'axios';

export const client = axios.create({
  baseURL: 'http://211.253.26.21',
  withCredentials: true,
});
