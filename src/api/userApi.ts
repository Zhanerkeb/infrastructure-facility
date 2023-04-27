import { User } from '../models/user';
import axiosClient from './axiosClient';

const userApi = {
  login(data: User): Promise<User> {
    const url = 'auth/login';
    return axiosClient.post(url, data);
  },

};

export default userApi;
