import axios from 'axios';

export const client = axios.create({
  baseURL: '',
  withCredentials: true,
});
