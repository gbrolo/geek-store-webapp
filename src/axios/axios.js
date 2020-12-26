import axios from 'axios';
import consts from './constants';

const instance = axios.create({
  baseURL: consts.API_BASE_URL,
  timeout: 1000 * 30,  
  headers: {'Content-Type': 'application/json'},
});

export default instance;