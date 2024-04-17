import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://mentalhealth-api-xa6u.onrender.com',
});

export default instance;