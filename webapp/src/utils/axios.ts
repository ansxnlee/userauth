import axios from 'axios';
import { URL } from './constants';

export const login = async (username: string, password: string) => {
  try {
    const res = await axios.post(URL.domain + '/user/login', {
      username: username,
      password: password
    }, { 
      withCredentials: true 
    });
    return res;
  } catch (e) {
    console.error(e);
  }
}

export const logout = async () => {
  try {
    const res = await axios.post(URL.domain + '/user/logout', {},
    {
      withCredentials: true
    });
    return res;
  } catch (e) {
    console.error(e);
  }
}

export const connCheck = async () => {
  try {
    const res = await axios.get(URL.domain + '/user/conninfo', { 
      withCredentials: true 
    });
    return res.data;
  } catch (e) {
    console.error(e);
  }
}